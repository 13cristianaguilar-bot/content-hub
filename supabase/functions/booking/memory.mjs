// In-memory store used by tests and the local review server.
// Overlap matches the Postgres exclusion constraint: a row counts while
// its status is hold or confirmed, even if the hold is past its expiry,
// until sweep() flips it.

function overlaps(row, start, end) {
  return Date.parse(row.starts_at) < Date.parse(end) && Date.parse(row.ends_at) > Date.parse(start);
}

function blocking(row) {
  return row.status === "hold" || row.status === "confirmed";
}

export function createMemoryStore() {
  const rows = [];
  const attempts = [];
  let seq = 0;

  function sweep(nowIso) {
    const now = Date.parse(nowIso);
    for (const row of rows) {
      if (row.status !== "hold") continue;
      if (Date.parse(row.hold_expires_at) > now) continue;
      if (row.google_event_id) row.status = "confirmed";
      else row.status = "expired";
      row.updated_at = nowIso;
    }
  }

  return {
    rows,
    attempts,
    async sweep(nowIso) {
      sweep(nowIso);
    },
    async insertHold(row) {
      sweep(row.created_at);
      if (row.idempotency_key && rows.some((item) => item.idempotency_key === row.idempotency_key)) {
        const error = new Error("duplicate");
        error.code = "23505";
        throw error;
      }
      if (rows.some((item) => blocking(item) && overlaps(item, row.starts_at, row.ends_at))) {
        const error = new Error("overlap");
        error.code = "23P01";
        throw error;
      }
      const saved = { ...row, id: row.id || `bk_${++seq}` };
      rows.push(saved);
      return saved;
    },
    async findByIdempotency(key) {
      return rows.find((row) => row.idempotency_key === key) || null;
    },
    async findByCancelHash(hash) {
      return rows.find((row) => row.cancel_token_hash === hash) || null;
    },
    async findById(id) {
      return rows.find((row) => row.id === id) || null;
    },
    async activeOverlaps(start, end) {
      return rows.filter((row) => blocking(row) && overlaps(row, start, end));
    },
    async patch(id, fields) {
      const row = rows.find((item) => item.id === id);
      if (!row) return null;
      Object.assign(row, fields);
      return row;
    },
    async delete(id) {
      const index = rows.findIndex((row) => row.id === id);
      if (index >= 0) rows.splice(index, 1);
    },
    async logAttempt(entry) {
      attempts.push(entry);
    },
    async countAttempts(ipHash, sinceIso) {
      const since = Date.parse(sinceIso);
      return attempts.filter((item) => item.ip_hash === ipHash && Date.parse(item.created_at) >= since).length;
    },
    async countUpcomingByEmail(email, nowIso) {
      const now = Date.parse(nowIso);
      return rows.filter((row) => row.status === "confirmed" && row.guest_email === email && Date.parse(row.starts_at) >= now).length;
    },
  };
}
