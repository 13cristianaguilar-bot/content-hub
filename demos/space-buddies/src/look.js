// Planet sky colors and the saved display preferences. No renderer here.

export const ACCESS_KEY = "space-buddies-access";

export const PLANET_SKY = [
  { top: 0x5cc8ff, mid: 0xb8f0ff, bot: 0x7fd88a, fog: 0xcff4ff, hemi: 0xc7f0ff, ground: 0x7dcc62, sun: 0xfff3c4 },
  { top: 0x7a8cff, mid: 0xffd6f2, bot: 0xc9d6ff, fog: 0xeadcff, hemi: 0xfff4ea, ground: 0xc9d6ff, sun: 0xfff3c4 },
  { top: 0x2b1b4d, mid: 0x8c6bff, bot: 0x4a3a7a, fog: 0x4a3a7a, hemi: 0x6a5a9a, ground: 0x363a6e, sun: 0xc8b6ff },
];

export function planetLook(n) {
  return PLANET_SKY[(Math.max(1, Math.min(3, n || 1)) - 1)];
}

export function nightRead(look) {
  const c = look && look.top || 0;
  const r = (c >> 16) & 255;
  const g = (c >> 8) & 255;
  const b = c & 255;
  const lum = (r + g + b) / 3;
  return lum >= 30 && lum < 90 && b >= g && r > 18;
}

export function defaultAccess() {
  return { detail: "auto", safeOutline: false, reduceShake: false };
}

export function normalizeAccess(raw) {
  const base = defaultAccess();
  if (!raw || typeof raw !== "object") return base;
  return {
    detail: raw.detail === "low" || raw.detail === "full" ? raw.detail : "auto",
    safeOutline: !!raw.safeOutline,
    reduceShake: !!raw.reduceShake,
  };
}

export function loadAccess(storage) {
  try {
    const raw = storage.getItem(ACCESS_KEY);
    if (!raw) {
      const base = defaultAccess();
      if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) base.reduceShake = true;
      return base;
    }
    return normalizeAccess(JSON.parse(raw));
  } catch (err) {
    return defaultAccess();
  }
}

export function saveAccess(storage, prefs) {
  const next = normalizeAccess(prefs);
  try { storage.setItem(ACCESS_KEY, JSON.stringify(next)); } catch (err) { /* private mode */ }
  return next;
}

export function detailOn(prefs, weakGpu) {
  const mode = normalizeAccess(prefs).detail;
  if (mode === "low") return true;
  if (mode === "full") return false;
  return !!weakGpu;
}

export function shakeMul(prefs) {
  return normalizeAccess(prefs).reduceShake ? 0.12 : 1;
}

export function outlineHex(prefs) {
  return normalizeAccess(prefs).safeOutline ? 0xffe14a : 0x1e2440;
}
