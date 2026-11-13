import { LIMITS, getOffer } from "./calendars.mjs";
import { filterByNotice, generateFromWindows, slotsFromGhl, subtractBusy, windowEnd } from "./engine.mjs";
import { calendarEventBody } from "./google.mjs";
import { withRetry } from "./ghl.mjs";
import { validateGuest } from "./validate.mjs";

const IDEMPOTENCY = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function result(status, body) {
  return { status, body };
}

function present(row, offer, cancelToken) {
  return {
    ok: true,
    bookingId: row.id,
    status: "confirmed",
    slug: row.offer_slug,
    start: row.starts_at,
    end: row.ends_at,
    meetUrl: row.google_meet_url,
    summary: offer.eventPrefix,
    crmSynced: Boolean(row.ghl_appointment_id),
    cancelToken: cancelToken || null,
    thanks: offer.thanks,
  };
}

async function candidateSlots(deps, offer, now) {
  let rulesSource = "ghl";
  let candidates;
  try {
    const payload = await deps.ghl.freeSlots(
      offer,
      now.getTime(),
      now.getTime() + offer.bookingWindowDays * 86400000,
    );
    candidates = slotsFromGhl(payload, offer.durationMin);
  } catch (error) {
    if (error.code === "ghl_auth") throw error;
    rulesSource = "weekly";
    candidates = generateFromWindows({
      ...offer,
      now,
      minNoticeMs: offer.minNoticeHours * 3600000,
      busy: [],
    });
  }
  const endMs = windowEnd(now, offer.bookingWindowDays, offer.timeZone);
  candidates = filterByNotice(candidates, now, offer.minNoticeHours * 3600000, endMs);
  const busy = await deps.google.freeBusy(now.toISOString(), new Date(endMs).toISOString());
  const holds = await deps.store.activeOverlaps(now.toISOString(), new Date(endMs).toISOString());
  const slots = subtractBusy(candidates, [
    ...busy.map((block) => ({ ...block, preBufferMin: offer.preBufferMin, postBufferMin: offer.postBufferMin })),
    ...holds.map((row) => ({ start: row.starts_at, end: row.ends_at })),
  ]);
  return { slots, rulesSource, endMs };
}

export async function listSlots(deps, { slug, now }) {
  const offer = getOffer(slug, deps.offers);
  if (!offer) return result(404, { ok: false, error: "unknown_offer" });
  const missing = deps.missingSecrets();
  if (missing.length) return result(503, { ok: false, error: "not_configured", missing });
  await deps.store.sweep(now.toISOString());
  try {
    const { slots, rulesSource } = await candidateSlots(deps, offer, now);
    return result(200, {
      ok: true,
      slug: offer.slug,
      timezone: offer.timeZone,
      durationMin: offer.durationMin,
      rulesSource,
      slots,
    });
  } catch (error) {
    if (error.code === "ghl_auth") return result(502, { ok: false, error: "crm_unauthorized" });
    return result(502, { ok: false, error: "calendar_unavailable" });
  }
}

async function pushGhl(deps, offer, guest, slot, meetUrl) {
  const contact = await withRetry(() => deps.ghl.upsertContact(guest));
  const appointment = await withRetry(() => deps.ghl.createAppointment({
    offer,
    guest,
    slot,
    contactId: contact.id,
    meetUrl,
  }));
  return { contactId: contact.id, appointmentId: appointment.id };
}

function keepDespiteCrm(error, rulesSource) {
  return error.code === "ghl_unavailable" && rulesSource === "ghl";
}

async function finishCrm(deps, row, offer, guest, rulesSource) {
  if (row.ghl_appointment_id) return row;
  try {
    const ghl = await pushGhl(deps, offer, guest, { start: row.starts_at, end: row.ends_at }, row.google_meet_url);
    return deps.store.patch(row.id, {
      ghl_contact_id: ghl.contactId,
      ghl_appointment_id: ghl.appointmentId,
      ghl_error: null,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    if (!keepDespiteCrm(error, rulesSource)) throw error;
    return deps.store.patch(row.id, { ghl_error: "crm_delayed", updated_at: new Date().toISOString() });
  }
}

export async function book(deps, input) {
  const now = deps.now();
  const offer = getOffer(input?.slug, deps.offers);
  if (!offer) return result(404, { ok: false, error: "unknown_offer" });
  if (String(input?.company_website || "").trim()) return result(400, { ok: false, error: "invalid" });
  const missing = deps.missingSecrets();
  if (missing.length) return result(503, { ok: false, error: "not_configured", missing });
  const parsed = validateGuest(input);
  if (!parsed.ok) return result(400, { ok: false, error: "invalid", fields: parsed.errors });
  const idem = String(input?.idempotencyKey || "");
  if (!IDEMPOTENCY.test(idem)) {
    return result(400, { ok: false, error: "invalid", fields: { idempotencyKey: "Missing booking key." } });
  }
  const guest = parsed.guest;
  const ipHash = await sha256Hex(`${deps.ipSalt}|${input?.ip || "unknown"}`);
  const since = new Date(now.getTime() - 3600000).toISOString();
  if (await deps.store.countAttempts(ipHash, since) >= LIMITS.bookAttemptsPerHour) {
    return result(429, { ok: false, error: "rate_limited" });
  }
  await deps.store.logAttempt({
    ip_hash: ipHash,
    email: guest.email,
    offer_slug: offer.slug,
    created_at: now.toISOString(),
  });

  await deps.store.sweep(now.toISOString());
  const existing = await deps.store.findByIdempotency(idem);
  if (existing) {
    const sameGuest = existing.guest_email === guest.email && Date.parse(existing.starts_at) === Date.parse(input.start);
    if (!sameGuest) return result(409, { ok: false, error: "idempotency_conflict" });
    if (existing.status === "cancelled") return result(409, { ok: false, error: "cancelled" });
    if (existing.status === "confirmed" || existing.google_event_id) {
      let row = existing;
      if (row.status !== "confirmed") {
        row = await deps.store.patch(row.id, { status: "confirmed", updated_at: now.toISOString() });
      }
      try {
        row = await finishCrm(deps, row, offer, guest, "ghl");
      } catch (error) {
        if (error.code === "slot_taken") return result(409, { ok: false, error: "slot_unavailable" });
        if (!keepDespiteCrm(error, "ghl")) return result(502, { ok: false, error: "crm_rejected" });
      }
      return result(200, present(row, offer, null));
    }
    if (existing.status === "hold" && Date.parse(existing.hold_expires_at) > now.getTime()) {
      return result(409, { ok: false, error: "in_progress" });
    }
    await deps.store.delete(existing.id);
  }

  if (await deps.store.countUpcomingByEmail(guest.email, now.toISOString()) >= LIMITS.confirmedPerEmail) {
    return result(429, { ok: false, error: "email_limited" });
  }

  let listed;
  try {
    await deps.store.sweep(now.toISOString());
    listed = await candidateSlots(deps, offer, now);
  } catch (error) {
    if (error.code === "ghl_auth") return result(502, { ok: false, error: "crm_unauthorized" });
    return result(502, { ok: false, error: "calendar_unavailable" });
  }
  const slot = listed.slots.find((item) => Date.parse(item.start) === Date.parse(input.start));
  if (!slot) return result(409, { ok: false, error: "slot_unavailable" });

  const token = randomToken();
  const cancelUrl = `${deps.pagesOrigin}/book/${offer.slug}/?cancel=${token}`;
  let hold;
  try {
    hold = await deps.store.insertHold({
      offer_slug: offer.slug,
      ghl_calendar_id: offer.ghlCalendarId,
      starts_at: slot.start,
      ends_at: slot.end,
      visitor_timezone: guest.visitorTimezone,
      guest_name: guest.name,
      guest_email: guest.email,
      guest_phone: guest.phone,
      notes: guest.notes || null,
      consent_at: now.toISOString(),
      status: "hold",
      hold_expires_at: new Date(now.getTime() + LIMITS.holdMs).toISOString(),
      idempotency_key: idem,
      cancel_token_hash: await sha256Hex(token),
      ip_hash: ipHash,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    });
  } catch (error) {
    if (error.code === "23P01") return result(409, { ok: false, error: "slot_unavailable" });
    if (error.code === "23505") return result(409, { ok: false, error: "in_progress" });
    throw error;
  }

  try {
    const busy = await deps.google.freeBusy(slot.start, slot.end);
    const taken = busy.some((block) => Date.parse(block.start) < Date.parse(slot.end) && Date.parse(block.end) > Date.parse(slot.start));
    if (taken) {
      await deps.store.patch(hold.id, { status: "failed", updated_at: now.toISOString() });
      return result(409, { ok: false, error: "slot_unavailable" });
    }
  } catch {
    await deps.store.patch(hold.id, { status: "failed", updated_at: now.toISOString() });
    return result(502, { ok: false, error: "calendar_unavailable" });
  }

  let event;
  try {
    event = await deps.google.createEvent(calendarEventBody({
      offer,
      guest,
      slot: { ...slot, requestId: token },
      cancelUrl,
    }));
  } catch {
    await deps.store.patch(hold.id, { status: "failed", updated_at: now.toISOString() });
    return result(502, { ok: false, error: "calendar_failed" });
  }

  hold = await deps.store.patch(hold.id, {
    status: "confirmed",
    google_event_id: event.id,
    google_meet_url: event.meetUrl,
    updated_at: new Date().toISOString(),
  });

  try {
    hold = await finishCrm(deps, hold, offer, guest, listed.rulesSource);
  } catch (error) {
    await deps.google.deleteEvent(event.id).catch(() => {});
    await deps.store.patch(hold.id, {
      status: "failed",
      google_event_id: null,
      google_meet_url: null,
      ghl_error: error.code || "ghl_rejected",
      updated_at: new Date().toISOString(),
    });
    if (error.code === "slot_taken") return result(409, { ok: false, error: "slot_unavailable" });
    if (error.code === "ghl_auth") return result(502, { ok: false, error: "crm_unauthorized" });
    return result(502, { ok: false, error: "crm_rejected" });
  }

  return result(200, present(hold, offer, token));
}

export async function cancelBooking(deps, { token }) {
  if (!/^[a-f0-9]{64}$/i.test(token || "")) return result(400, { ok: false, error: "invalid_token" });
  const missing = deps.missingSecrets();
  if (missing.length) return result(503, { ok: false, error: "not_configured", missing });
  const row = await deps.store.findByCancelHash(await sha256Hex(token.toLowerCase()));
  if (!row) return result(404, { ok: false, error: "not_found" });
  if (row.status === "cancelled") return result(200, { ok: true, already: true });
  if (row.status !== "confirmed" && !row.google_event_id) return result(409, { ok: false, error: "not_confirmed" });
  if (row.google_event_id) await deps.google.deleteEvent(row.google_event_id);
  let ghlError = null;
  if (row.ghl_appointment_id) {
    try {
      await withRetry(() => deps.ghl.cancelAppointment(row.ghl_appointment_id));
    } catch (error) {
      ghlError = error.code || "ghl_cancel_failed";
    }
  }
  await deps.store.patch(row.id, {
    status: "cancelled",
    ghl_error: ghlError,
    updated_at: new Date().toISOString(),
  });
  return result(200, { ok: true, crmSynced: !ghlError });
}
