import assert from "node:assert/strict";
import test from "node:test";
import { generateFromWindows, slotsFromGhl, subtractBusy } from "../supabase/functions/booking/engine.mjs";
import { formatClock, zonedTimeToUtc } from "../supabase/functions/booking/time.mjs";
import { normalizeEmail, normalizeName, normalizePhone, validateGuest } from "../supabase/functions/booking/validate.mjs";

const CHICAGO = "America/Chicago";

test("Chicago offsets around the 2026 DST edges", () => {
  const gap = zonedTimeToUtc(2026, 3, 8, 2, 30, CHICAGO);
  assert.equal(gap.exists, false);

  const afterJump = zonedTimeToUtc(2026, 3, 8, 3, 30, CHICAGO);
  assert.equal(afterJump.exists, true);
  assert.equal(afterJump.date.toISOString(), "2026-03-08T08:30:00.000Z");

  assert.equal(zonedTimeToUtc(2026, 3, 7, 7, 0, CHICAGO).date.toISOString(), "2026-03-07T13:00:00.000Z");
  assert.equal(zonedTimeToUtc(2026, 3, 9, 7, 0, CHICAGO).date.toISOString(), "2026-03-09T12:00:00.000Z");
  assert.equal(zonedTimeToUtc(2026, 10, 31, 7, 0, CHICAGO).date.toISOString(), "2026-10-31T12:00:00.000Z");
  assert.equal(zonedTimeToUtc(2026, 11, 2, 7, 0, CHICAGO).date.toISOString(), "2026-11-02T13:00:00.000Z");

  const fold = zonedTimeToUtc(2026, 11, 1, 1, 30, CHICAGO);
  assert.equal(fold.exists, true);
  assert.ok(["2026-11-01T06:30:00.000Z", "2026-11-01T07:30:00.000Z"].includes(fold.date.toISOString()));
});

test("spring-forward gap does not produce a slot", () => {
  const slots = generateFromWindows({
    timeZone: CHICAGO,
    now: new Date("2026-03-08T06:00:00.000Z"),
    durationMin: 30,
    intervalMin: 30,
    weeklyHours: [],
    dateHours: { "2026-03-08": [{ openMin: 60, closeMin: 5 * 60 }] },
    bookingWindowDays: 1,
    minNoticeMs: 0,
  });
  const clocks = slots.map((slot) => formatClock(slot.start, CHICAGO));
  assert.deepEqual(clocks, ["1:00 AM", "1:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM"]);
  assert.equal(slots.some((slot) => formatClock(slot.start, CHICAGO).startsWith("2:")), false);
});

test("audit windows from the live GoHighLevel calendar match its free slots", () => {
  const slots = generateFromWindows({
    timeZone: CHICAGO,
    now: new Date("2026-11-14T06:00:00.000Z"),
    durationMin: 60,
    intervalMin: 60,
    weeklyHours: [],
    dateHours: {
      "2026-11-14": [
        { openMin: 7 * 60, closeMin: 10 * 60 },
        { openMin: 10 * 60 + 30, closeMin: 15 * 60 + 30 },
        { openMin: 16 * 60, closeMin: 22 * 60 },
      ],
    },
    bookingWindowDays: 1,
    minNoticeMs: 0,
  });
  assert.deepEqual(slots.map((slot) => formatClock(slot.start, CHICAGO)), [
    "7:00 AM", "8:00 AM", "9:00 AM",
    "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
  ]);
});

test("30 minute windows stop exactly at the close", () => {
  const slots = generateFromWindows({
    timeZone: CHICAGO,
    now: new Date("2026-11-17T06:00:00.000Z"),
    durationMin: 30,
    intervalMin: 30,
    weeklyHours: [],
    dateHours: {
      "2026-11-17": [
        { openMin: 7 * 60, closeMin: 9 * 60 },
        { openMin: 9 * 60 + 30, closeMin: 10 * 60 },
        { openMin: 10 * 60 + 30, closeMin: 11 * 60 },
        { openMin: 13 * 60, closeMin: 14 * 60 },
        { openMin: 15 * 60, closeMin: 16 * 60 },
        { openMin: 17 * 60, closeMin: 22 * 60 },
      ],
    },
    bookingWindowDays: 1,
    minNoticeMs: 0,
  });
  const clocks = slots.map((slot) => formatClock(slot.start, CHICAGO));
  assert.ok(clocks.includes("7:00 AM"));
  assert.ok(clocks.includes("8:30 AM"));
  assert.ok(clocks.includes("9:30 AM"));
  assert.equal(clocks.includes("10:00 AM"), false);
  assert.ok(clocks.includes("10:30 AM"));
  assert.equal(clocks.includes("11:00 AM"), false);
  assert.ok(clocks.includes("1:00 PM"));
  assert.ok(clocks.includes("1:30 PM"));
  assert.equal(clocks.includes("2:00 PM"), false);
  assert.ok(clocks.includes("9:30 PM"));
  assert.equal(clocks.includes("10:00 PM"), false);
});

test("minimum notice and busy ranges, including a slot that only touches the boundary", () => {
  const now = new Date("2026-11-16T15:00:00.000Z");
  const slots = generateFromWindows({
    timeZone: CHICAGO,
    now,
    durationMin: 60,
    intervalMin: 60,
    weeklyHours: [{ days: [0, 1, 2, 3, 4, 5, 6], openMin: 7 * 60, closeMin: 22 * 60 }],
    bookingWindowDays: 1,
    minNoticeMs: 2 * 3600000,
    busy: [{ start: "2026-11-16T18:00:00.000Z", end: "2026-11-16T19:00:00.000Z" }],
  });
  const clocks = slots.map((slot) => formatClock(slot.start, CHICAGO));
  assert.equal(clocks.includes("10:00 AM"), false);
  assert.equal(clocks[0], "11:00 AM");
  assert.equal(clocks.includes("12:00 PM"), false);
  assert.ok(clocks.includes("1:00 PM"));
});

test("a busy block expanded by a buffer removes the neighboring slot, not the one that starts when it ends", () => {
  const slots = [
    { start: "2026-11-16T17:00:00.000Z", end: "2026-11-16T18:00:00.000Z" },
    { start: "2026-11-16T18:00:00.000Z", end: "2026-11-16T19:00:00.000Z" },
    { start: "2026-11-16T19:00:00.000Z", end: "2026-11-16T20:00:00.000Z" },
  ];
  const open = subtractBusy(slots, [{ start: "2026-11-16T18:00:00.000Z", end: "2026-11-16T19:00:00.000Z", postBufferMin: 0 }]);
  assert.deepEqual(open.map((slot) => slot.start), [slots[0].start, slots[2].start]);
  const buffered = subtractBusy(slots, [{ start: "2026-11-16T18:00:00.000Z", end: "2026-11-16T19:00:00.000Z", postBufferMin: 15 }]);
  assert.deepEqual(buffered.map((slot) => slot.start), [slots[0].start]);
});

test("GoHighLevel free-slot payload parses and ignores the trace id", () => {
  const slots = slotsFromGhl({
    "2026-11-14": { slots: ["2026-11-14T10:30:00-06:00", "2026-11-14T16:00:00-06:00"] },
    traceId: "abc",
  }, 60);
  assert.equal(slots.length, 2);
  assert.equal(slots[0].start, "2026-11-14T16:30:00.000Z");
  assert.equal(slots[0].end, "2026-11-14T17:30:00.000Z");
  assert.equal(formatClock(slots[0].start, CHICAGO), "10:30 AM");
});

test("guest validation accepts a US number and an international number, and rejects junk", () => {
  assert.equal(normalizePhone("(512) 555-0134"), "+15125550134");
  assert.equal(normalizePhone("+44 20 7946 0958"), "+442079460958");
  assert.equal(normalizePhone("555-0134"), null);
  assert.equal(normalizePhone("+1 111 111 1111"), null);
  assert.equal(normalizePhone("0000000000"), null);
  assert.equal(normalizeEmail(" Ada@Example.com "), "ada@example.com");
  assert.equal(normalizeEmail("ada@example"), null);
  assert.equal(normalizeName("  Ada   Lovelace "), "Ada Lovelace");
  assert.equal(normalizeName("A"), null);
  assert.equal(normalizeName("Ada — Lovelace"), null);
  const good = validateGuest({
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "5125550134",
    notes: "",
    consent: true,
    visitorTimezone: "America/Los_Angeles",
  });
  assert.equal(good.ok, true);
  assert.equal(good.guest.firstName, "Ada");
  assert.equal(good.guest.lastName, "Lovelace");
  const bad = validateGuest({ name: "A", email: "nope", phone: "1", consent: false });
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.name && bad.errors.email && bad.errors.phone && bad.errors.consent);
});
