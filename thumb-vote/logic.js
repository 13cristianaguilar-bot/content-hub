// Pure vote state for the Joe Stolte thumbnail deck.
// The page stores the returned log in localStorage and renders from it.

export const STORAGE_KEY = "thumb-vote:joe-stolte:v1";

const VOTES = new Set(["like", "skip", "super"]);

export function thumbUrls(id) {
  return {
    max: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    hq: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

export function formatLine(video, vote) {
  const label = vote === "super" ? "SUPER" : "LIKE";
  const mult = Number(video.multiplier).toFixed(1);
  return `${label}: #${video.rank} ${video.channel} — ${video.title} (${mult}x) ${video.url}`;
}

export function normalizeLog(deck, raw) {
  const ids = new Set(deck.map((video) => video.id));
  const history = raw && Array.isArray(raw.history) ? raw.history : [];
  const seen = new Set();
  const log = [];
  for (const item of history) {
    if (!item || !ids.has(item.id) || !VOTES.has(item.vote) || seen.has(item.id)) continue;
    seen.add(item.id);
    log.push({ id: item.id, vote: item.vote, at: Number(item.at) || 0 });
  }
  return log;
}

export function parseStored(deck, text) {
  if (!text) return [];
  try {
    return normalizeLog(deck, JSON.parse(text));
  } catch {
    return [];
  }
}

export function serialize(log) {
  return JSON.stringify({ v: 1, history: log });
}

export function remaining(deck, log) {
  const done = new Set(log.map((item) => item.id));
  return deck.filter((video) => !done.has(video.id));
}

export function pushVote(log, id, vote, at = Date.now()) {
  if (!VOTES.has(vote)) throw new Error("bad vote");
  const next = log.filter((item) => item.id !== id);
  next.push({ id, vote, at });
  return next;
}

export function popVote(log) {
  if (!log.length) return { log, removed: null };
  return { log: log.slice(0, -1), removed: log[log.length - 1] };
}

export function position(deck, log) {
  const total = deck.length;
  const seen = Math.min(log.length, total);
  return {
    seen,
    total,
    current: Math.min(seen + 1, total),
    done: seen >= total && total > 0,
  };
}

export function picksText(deck, log) {
  const byId = new Map(deck.map((video) => [video.id, video]));
  const lines = [];
  for (const vote of ["super", "like"]) {
    for (const item of log) {
      if (item.vote !== vote) continue;
      const video = byId.get(item.id);
      if (!video) continue;
      lines.push(formatLine(video, vote));
    }
  }
  return lines.join("\n");
}

export function picked(deck, log) {
  const byId = new Map(deck.map((video) => [video.id, video]));
  const supers = [];
  const likes = [];
  for (const item of log) {
    const video = byId.get(item.id);
    if (!video) continue;
    if (item.vote === "super") supers.push(video);
    else if (item.vote === "like") likes.push(video);
  }
  return { supers, likes };
}
