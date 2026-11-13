function authHeaders(key) {
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
  };
}

async function read(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 300) };
  }
}

function dbError(res, json) {
  const error = new Error(json?.message || `db_${res.status}`);
  error.code = json?.code || String(res.status);
  error.status = res.status;
  return error;
}

export function createPgStore({ url, serviceRole, fetchImpl = fetch }) {
  const base = `${url.replace(/\/$/, "")}/rest/v1`;
  const headers = authHeaders(serviceRole);

  async function request(path, options = {}) {
    const res = await fetchImpl(`${base}${path}`, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
    });
    const json = await read(res);
    if (!res.ok) throw dbError(res, json);
    return json;
  }

  return {
    async sweep(nowIso) {
      await request(`/signal_bookings?status=eq.hold&hold_expires_at=lt.${encodeURIComponent(nowIso)}&google_event_id=is.null`, {
        method: "PATCH",
        headers: { prefer: "return=minimal" },
        body: JSON.stringify({ status: "expired", updated_at: nowIso }),
      });
      await request(`/signal_bookings?status=eq.hold&hold_expires_at=lt.${encodeURIComponent(nowIso)}&google_event_id=not.is.null`, {
        method: "PATCH",
        headers: { prefer: "return=minimal" },
        body: JSON.stringify({ status: "confirmed", updated_at: nowIso }),
      });
    },
    async insertHold(row) {
      const json = await request("/signal_bookings", {
        method: "POST",
        headers: { prefer: "return=representation" },
        body: JSON.stringify(row),
      });
      return Array.isArray(json) ? json[0] : json;
    },
    async findByIdempotency(key) {
      const json = await request(`/signal_bookings?idempotency_key=eq.${encodeURIComponent(key)}&select=*`, {
        headers: { accept: "application/json" },
      });
      return Array.isArray(json) ? json[0] || null : json;
    },
    async findByCancelHash(hash) {
      const json = await request(`/signal_bookings?cancel_token_hash=eq.${encodeURIComponent(hash)}&select=*`);
      return Array.isArray(json) ? json[0] || null : json;
    },
    async findById(id) {
      const json = await request(`/signal_bookings?id=eq.${encodeURIComponent(id)}&select=*`);
      return Array.isArray(json) ? json[0] || null : json;
    },
    async activeOverlaps(start, end) {
      const path = `/signal_bookings?status=in.(hold,confirmed)&starts_at=lt.${encodeURIComponent(end)}&ends_at=gt.${encodeURIComponent(start)}&select=id,starts_at,ends_at,status`;
      const json = await request(path);
      return Array.isArray(json) ? json : [];
    },
    async patch(id, fields) {
      const json = await request(`/signal_bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { prefer: "return=representation" },
        body: JSON.stringify(fields),
      });
      return Array.isArray(json) ? json[0] : json;
    },
    async delete(id) {
      await request(`/signal_bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { prefer: "return=minimal" },
      });
    },
    async logAttempt(entry) {
      await request("/signal_booking_attempts", {
        method: "POST",
        headers: { prefer: "return=minimal" },
        body: JSON.stringify(entry),
      });
    },
    async countAttempts(ipHash, sinceIso) {
      const path = `/signal_booking_attempts?ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(sinceIso)}&select=id`;
      const json = await request(path);
      return Array.isArray(json) ? json.length : 0;
    },
    async countUpcomingByEmail(email, nowIso) {
      const path = `/signal_bookings?guest_email=eq.${encodeURIComponent(email)}&status=eq.confirmed&starts_at=gte.${encodeURIComponent(nowIso)}&select=id`;
      const json = await request(path);
      return Array.isArray(json) ? json.length : 0;
    },
  };
}
