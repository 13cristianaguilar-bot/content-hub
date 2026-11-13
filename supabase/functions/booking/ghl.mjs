import { LOCATION_ID, USER_ID } from "./calendars.mjs";

const BASE = "https://services.leadconnectorhq.com";

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function read(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 300) };
  }
}

function fail(res, json) {
  const message = JSON.stringify(json).slice(0, 400);
  const error = new Error(message);
  error.status = res.status;
  if ((res.status === 400 || res.status === 409 || res.status === 422) && /slot|conflict|unavailable|booked|overlap/i.test(message)) {
    error.code = "slot_taken";
  } else if (res.status === 401 || res.status === 403) {
    error.code = "ghl_auth";
  } else if (res.status === 429 || res.status >= 500) {
    error.code = "ghl_unavailable";
  } else {
    error.code = "ghl_rejected";
  }
  return error;
}

export function createGhlClient(env, fetchImpl = fetch) {
  const token = env.GHL_PRIVATE_TOKEN;
  const locationId = env.GHL_LOCATION_ID || LOCATION_ID;
  const userId = env.GHL_USER_ID || USER_ID;

  return {
    async freeSlots(offer, startMs, endMs) {
      const url = new URL(`${BASE}/calendars/${offer.ghlCalendarId}/free-slots`);
      url.searchParams.set("startDate", String(startMs));
      url.searchParams.set("endDate", String(endMs));
      url.searchParams.set("timezone", offer.timeZone);
      url.searchParams.set("userId", userId);
      const res = await fetchImpl(url, { headers: headers(token) });
      const json = await read(res);
      if (!res.ok) throw fail(res, json);
      return json;
    },
    async upsertContact(guest) {
      const body = {
        locationId,
        firstName: guest.firstName,
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        source: "Signal booking",
        assignedTo: userId,
      };
      if (guest.lastName) body.lastName = guest.lastName;
      if (guest.visitorTimezone) body.timezone = guest.visitorTimezone;
      if (guest.phone.startsWith("+1")) body.country = "US";
      const res = await fetchImpl(`${BASE}/contacts/upsert`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(body),
      });
      const json = await read(res);
      if (!res.ok || !json.contact?.id) throw fail(res, json);
      return json.contact;
    },
    async createAppointment({ offer, guest, slot, contactId, meetUrl }) {
      const description = [
        guest.notes ? `Notes:\n${guest.notes}` : "",
        `Phone: ${guest.phone}`,
        meetUrl ? `Google Meet: ${meetUrl}` : "",
        offer.recorded ? "This call will be recorded." : "",
        offer.priceNote || "",
      ].filter(Boolean).join("\n\n");
      const res = await fetchImpl(`${BASE}/calendars/events/appointments`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify({
          calendarId: offer.ghlCalendarId,
          locationId,
          contactId,
          startTime: slot.start,
          endTime: slot.end,
          title: `${offer.eventPrefix}: ${guest.name}`,
          appointmentStatus: "confirmed",
          assignedUserId: userId,
          toNotify: true,
          ignoreFreeSlotValidation: false,
          meetingLocationType: "custom",
          overrideLocationConfig: true,
          address: meetUrl,
          description,
        }),
      });
      const json = await read(res);
      if (!res.ok || !json.id) throw fail(res, json);
      return json;
    },
    async cancelAppointment(eventId) {
      const res = await fetchImpl(`${BASE}/calendars/events/appointments/${encodeURIComponent(eventId)}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify({
          appointmentStatus: "cancelled",
          toNotify: true,
          ignoreFreeSlotValidation: true,
        }),
      });
      const json = await read(res);
      if (!res.ok) throw fail(res, json);
      return json;
    },
  };
}

export async function withRetry(fn) {
  try {
    return await fn();
  } catch (error) {
    if (error.code !== "ghl_unavailable") throw error;
    return fn();
  }
}
