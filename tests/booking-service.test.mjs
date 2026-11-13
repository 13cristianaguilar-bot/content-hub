import assert from "node:assert/strict";
import test from "node:test";
import { OFFERS } from "../supabase/functions/booking/calendars.mjs";
import { generateFromWindows } from "../supabase/functions/booking/engine.mjs";
import { createMemoryStore } from "../supabase/functions/booking/memory.mjs";
import { book, cancelBooking, listSlots } from "../supabase/functions/booking/service.mjs";
import { dateKey } from "../supabase/functions/booking/time.mjs";

const NOW = new Date("2026-11-16T15:00:00.000Z");

function harness(now = NOW) {
  const store = createMemoryStore();
  const events = [];
  const appointments = [];
  const contacts = [];
  let appointmentFails = 0;
  let appointmentError = null;
  let slotsError = null;
  const google = {
    async freeBusy(min, max) {
      const start = Date.parse(min);
      const end = Date.parse(max);
      return events
        .filter((event) => !event.deleted && Date.parse(event.start) < end && Date.parse(event.end) > start)
        .map((event) => ({ start: event.start, end: event.end }));
    },
    async createEvent(body) {
      const start = body.start.dateTime;
      const end = body.end.dateTime;
      if (events.some((event) => !event.deleted && Date.parse(event.start) < Date.parse(end) && Date.parse(event.end) > Date.parse(start))) {
        const error = new Error("busy");
        error.code = "google_create";
        throw error;
      }
      const id = `evt_${events.length + 1}`;
      events.push({ id, start, end, body, deleted: false });
      return { id, meetUrl: "https://meet.google.com/sig-nal-test" };
    },
    async deleteEvent(id) {
      const event = events.find((item) => item.id === id);
      if (!event) {
        const error = new Error("missing");
        error.code = "google_delete";
        throw error;
      }
      event.deleted = true;
    },
  };
  const ghl = {
    async freeSlots(offer, startMs) {
      if (slotsError) throw slotsError;
      const slots = generateFromWindows({
        ...offer,
        now: new Date(startMs),
        minNoticeMs: offer.minNoticeHours * 3600000,
        busy: [],
      });
      const grouped = {};
      for (const slot of slots) {
        const key = dateKey(slot.start, offer.timeZone);
        grouped[key] ||= { slots: [] };
        grouped[key].slots.push(slot.start);
      }
      return grouped;
    },
    async upsertContact(guest) {
      const contact = { id: `con_${contacts.length + 1}`, ...guest };
      contacts.push(contact);
      return contact;
    },
    async createAppointment(input) {
      if (appointmentFails > 0) {
        appointmentFails -= 1;
        throw appointmentError;
      }
      const row = { id: `appt_${appointments.length + 1}`, ...input };
      appointments.push(row);
      return row;
    },
    async cancelAppointment(id) {
      const row = appointments.find((item) => item.id === id);
      if (row) row.cancelled = true;
      return { id, appointmentStatus: "cancelled" };
    },
  };
  const deps = {
    offers: OFFERS,
    store,
    google,
    ghl,
    missingSecrets: () => [],
    now: () => now,
    pagesOrigin: "https://13cristianaguilar-bot.github.io/content-hub",
    ipSalt: "test",
  };
  return {
    deps,
    events,
    appointments,
    contacts,
    failAppointments(times, code) {
      appointmentFails = times;
      const error = new Error(code);
      error.code = code;
      appointmentError = error;
    },
    failSlots(code) {
      const error = new Error(code);
      error.code = code;
      slotsError = error;
    },
  };
}

function guest(over = {}) {
  return {
    slug: "audit",
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "(512) 555-0134",
    notes: "Website example.com",
    consent: true,
    visitorTimezone: "America/Los_Angeles",
    idempotencyKey: crypto.randomUUID(),
    ip: "203.0.113.8",
    company_website: "",
    ...over,
  };
}

async function firstSlot(box, slug = "audit") {
  const listed = await listSlots(box.deps, { slug, now: box.deps.now() });
  assert.equal(listed.status, 200, JSON.stringify(listed.body));
  assert.ok(listed.body.slots.length > 0);
  return listed.body.slots[0];
}

test("books a free slot once, invites the guest, and pushes the CRM", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 200);
  assert.equal(out.body.crmSynced, true);
  assert.equal(out.body.meetUrl, "https://meet.google.com/sig-nal-test");
  assert.equal(out.body.cancelToken.length, 64);
  assert.equal(box.events.length, 1);
  assert.equal(box.events[0].body.attendees[0].email, "ada@example.com");
  assert.match(box.events[0].body.description, /5125550134|Phone: \+15125550134/);
  assert.match(box.events[0].body.description, /example.com/);
  assert.equal(box.events[0].body.conferenceData.createRequest.conferenceSolutionKey.type, "hangoutsMeet");
  assert.equal(box.appointments[0].offer.ghlCalendarId, "azJSrIbLXh844Bhg13It");
  assert.equal(box.appointments[0].contactId, "con_1");
  assert.equal(box.contacts[0].phone, "+15125550134");
  assert.equal(box.appointments[0].slot.start, slot.start);
});

test("the same idempotency key does not create a second event", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const input = guest({ start: slot.start });
  const first = await book(box.deps, input);
  const second = await book(box.deps, input);
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(second.body.bookingId, first.body.bookingId);
  assert.equal(box.events.length, 1);
  assert.equal(box.appointments.length, 1);
});

test("two overlapping offers cannot both book, including a parallel race", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const ma = await listSlots(box.deps, { slug: "ma-30", now: box.deps.now() });
  const same = ma.body.slots.find((item) => item.start === slot.start);
  assert.ok(same);
  const [a, b] = await Promise.all([
    book(box.deps, guest({ start: slot.start, idempotencyKey: crypto.randomUUID() })),
    book(box.deps, guest({
      slug: "ma-30",
      start: same.start,
      email: "grace@example.com",
      name: "Grace Hopper",
      idempotencyKey: crypto.randomUUID(),
      ip: "203.0.113.9",
    })),
  ]);
  const statuses = [a.status, b.status].sort();
  assert.deepEqual(statuses, [200, 409]);
  assert.equal(box.events.filter((event) => !event.deleted).length, 1);
});

test("a meeting that ends when the next one starts is allowed", async () => {
  const box = harness();
  const listed = await listSlots(box.deps, { slug: "audit", now: box.deps.now() });
  const first = listed.body.slots[0];
  const next = listed.body.slots.find((slot) => slot.start === first.end);
  assert.ok(next);
  const a = await book(box.deps, guest({ start: first.start }));
  const b = await book(box.deps, guest({
    start: next.start,
    email: "grace@example.com",
    name: "Grace Hopper",
    idempotencyKey: crypto.randomUUID(),
    ip: "203.0.113.10",
  }));
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
  assert.equal(box.events.length, 2);
});

test("an expired hold frees the slot", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  await box.deps.store.insertHold({
    offer_slug: "audit",
    ghl_calendar_id: "azJSrIbLXh844Bhg13It",
    starts_at: slot.start,
    ends_at: slot.end,
    guest_name: "Old Hold",
    guest_email: "old@example.com",
    guest_phone: "+15125550111",
    status: "hold",
    hold_expires_at: new Date(NOW.getTime() - 60_000).toISOString(),
    idempotency_key: crypto.randomUUID(),
    cancel_token_hash: "abc",
    created_at: new Date(NOW.getTime() - 120_000).toISOString(),
    updated_at: NOW.toISOString(),
  });
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 200, JSON.stringify(out.body));
});

test("a fresh hold blocks the slot", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  await box.deps.store.insertHold({
    offer_slug: "connect",
    ghl_calendar_id: "M6UcFNTN03SHWNpYHFsn",
    starts_at: slot.start,
    ends_at: slot.end,
    guest_name: "Live Hold",
    guest_email: "live@example.com",
    guest_phone: "+15125550112",
    status: "hold",
    hold_expires_at: new Date(NOW.getTime() + 60_000).toISOString(),
    idempotency_key: crypto.randomUUID(),
    cancel_token_hash: "def",
    created_at: NOW.toISOString(),
    updated_at: NOW.toISOString(),
  });
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 409);
  assert.equal(out.body.error, "slot_unavailable");
  assert.equal(box.events.length, 0);
});

test("Google failure releases the hold", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const original = box.deps.google.createEvent.bind(box.deps.google);
  let fails = 1;
  box.deps.google.createEvent = async (body) => {
    if (fails > 0) {
      fails -= 1;
      const error = new Error("down");
      error.code = "google_create";
      throw error;
    }
    return original(body);
  };
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 502);
  assert.equal(out.body.error, "calendar_failed");
  const retry = await book(box.deps, guest({ start: slot.start, idempotencyKey: crypto.randomUUID(), ip: "203.0.113.20" }));
  assert.equal(retry.status, 200);
});

test("a CRM slot conflict rolls the calendar event back", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  box.failAppointments(2, "slot_taken");
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 409);
  assert.equal(box.events.every((event) => event.deleted), true);
  const again = await listSlots(box.deps, { slug: "audit", now: NOW });
  assert.ok(again.body.slots.some((item) => item.start === slot.start));
});

test("a transient CRM failure keeps the meeting when GoHighLevel supplied the slot", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  box.failAppointments(5, "ghl_unavailable");
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 200);
  assert.equal(out.body.crmSynced, false);
  assert.equal(box.events.filter((event) => !event.deleted).length, 1);
});

test("a CRM outage during weekly fallback does not keep a calendar event", async () => {
  const box = harness();
  box.failSlots("ghl_unavailable");
  box.failAppointments(5, "ghl_unavailable");
  const listed = await listSlots(box.deps, { slug: "audit", now: NOW });
  assert.equal(listed.body.rulesSource, "weekly");
  const out = await book(box.deps, guest({ start: listed.body.slots[0].start }));
  assert.equal(out.status, 502);
  assert.equal(box.events.every((event) => event.deleted), true);
});

test("one CRM blip is retried and the booking still syncs", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  box.failAppointments(1, "ghl_unavailable");
  const out = await book(box.deps, guest({ start: slot.start }));
  assert.equal(out.status, 200);
  assert.equal(out.body.crmSynced, true);
  assert.equal(box.appointments.length, 1);
});

test("cancel releases the time for someone else", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const booked = await book(box.deps, guest({ start: slot.start }));
  const cancelled = await cancelBooking(box.deps, { token: booked.body.cancelToken });
  assert.equal(cancelled.status, 200);
  assert.equal(box.events[0].deleted, true);
  assert.equal(box.appointments[0].cancelled, true);
  const again = await book(box.deps, guest({
    start: slot.start,
    email: "grace@example.com",
    name: "Grace Hopper",
    idempotencyKey: crypto.randomUUID(),
    ip: "203.0.113.30",
  }));
  assert.equal(again.status, 200);
});

test("validation, honeypot, and missing consent never touch the calendar", async () => {
  const box = harness();
  const slot = await firstSlot(box);
  const bad = await book(box.deps, guest({ start: slot.start, email: "nope", consent: false }));
  assert.equal(bad.status, 400);
  const bot = await book(box.deps, guest({ start: slot.start, company_website: "https://spam.test", idempotencyKey: crypto.randomUUID() }));
  assert.equal(bot.status, 400);
  assert.equal(box.events.length, 0);
});

test("rate limit trips before a second wave of bookings", async () => {
  const box = harness();
  const listed = await listSlots(box.deps, { slug: "ma-30", now: NOW });
  const names = ["Ann", "Bea", "Cam", "Dee", "Eve", "Fay", "Gia", "Hua", "Ivy", "Jan", "Kim", "Lou"];
  let blocked = 0;
  for (let i = 0; i < 12; i += 1) {
    const out = await book(box.deps, guest({
      slug: "ma-30",
      start: listed.body.slots[i].start,
      email: `person${i}@example.com`,
      name: `${names[i]} Stone`,
      idempotencyKey: crypto.randomUUID(),
      ip: "198.51.100.4",
    }));
    if (out.status === 429) blocked += 1;
  }
  assert.ok(blocked >= 1);
});
