const KEY = "space-buddies-board";

function read() {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    return [];
  }
}

export function localBoard() {
  return read();
}

export function recordRun(entry) {
  const rows = [entry, ...read()].slice(0, 12);
  try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch (err) { /* private mode */ }
  const cfg = typeof window !== "undefined" ? window.SPACE_BUDDIES_SUPABASE : null;
  if (cfg && cfg.url && cfg.key) {
    const url = String(cfg.url).replace(/\/$/, "") + "/rest/v1/runs";
    fetch(url, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: "Bearer " + cfg.key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(entry),
    }).catch(() => {});
  }
  return rows;
}
