export function createGoogleClient(env, fetchImpl = fetch) {
  let token = "";
  let exp = 0;
  const calendarId = env.GOOGLE_CALENDAR_ID || "primary";

  async function auth() {
    if (token && Date.now() < exp - 60_000) return token;
    const res = await fetchImpl("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        refresh_token: env.GOOGLE_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.access_token) {
      const error = new Error("google_auth");
      error.code = "google_auth";
      throw error;
    }
    token = json.access_token;
    exp = Date.now() + (Number(json.expires_in) || 3600) * 1000;
    return token;
  }

  async function call(url, options) {
    const access = await auth();
    const res = await fetchImpl(url, {
      ...options,
      headers: { ...(options.headers || {}), authorization: `Bearer ${access}` },
    });
    return res;
  }

  return {
    calendarId,
    async freeBusy(timeMin, timeMax) {
      const res = await call("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ timeMin, timeMax, items: [{ id: calendarId }] }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const error = new Error("google_freebusy");
        error.code = "google_freebusy";
        throw error;
      }
      const calendar = json.calendars?.[calendarId];
      if (!calendar || calendar.errors?.length) {
        const error = new Error("google_calendar");
        error.code = "google_calendar";
        throw error;
      }
      return (calendar.busy || []).map((block) => ({ start: block.start, end: block.end }));
    },
    async createEvent(event) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`;
      const res = await call(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(event),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.id) {
        const error = new Error("google_create");
        error.code = "google_create";
        error.status = res.status;
        throw error;
      }
      const meetUrl = json.hangoutLink
        || json.conferenceData?.entryPoints?.find((point) => point.entryPointType === "video")?.uri
        || "";
      if (!meetUrl.startsWith("https://meet.google.com/")) {
        await this.deleteEvent(json.id).catch(() => {});
        const error = new Error("meet_missing");
        error.code = "meet_missing";
        throw error;
      }
      return { id: json.id, meetUrl };
    },
    async deleteEvent(id) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(id)}?sendUpdates=all`;
      const res = await call(url, { method: "DELETE" });
      if (res.status === 204 || res.status === 200 || res.status === 404 || res.status === 410) return;
      const error = new Error("google_delete");
      error.code = "google_delete";
      error.status = res.status;
      throw error;
    },
  };
}

export function calendarEventBody({ offer, guest, slot, cancelUrl }) {
  const lines = [
    offer.description,
    "",
    `Guest: ${guest.name}`,
    `Email: ${guest.email}`,
    `Phone: ${guest.phone}`,
  ];
  if (guest.notes) lines.push("", "Notes:", guest.notes);
  if (offer.recorded) lines.push("", "This call will be recorded.");
  if (offer.priceNote) lines.push("", offer.priceNote);
  lines.push("", `Cancel or release this time: ${cancelUrl}`);
  return {
    summary: `${offer.eventPrefix}: ${guest.name}`,
    description: lines.join("\n"),
    start: { dateTime: slot.start, timeZone: offer.timeZone },
    end: { dateTime: slot.end, timeZone: offer.timeZone },
    attendees: [{ email: guest.email, displayName: guest.name }],
    transparency: "opaque",
    guestsCanModify: false,
    conferenceData: {
      createRequest: {
        requestId: slot.requestId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };
}
