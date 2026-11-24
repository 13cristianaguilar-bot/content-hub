export const CINE_MAX = 4;

export const CINE_DUR = {
  flyover: 3.6,
  launch: 3.6,
  collapse: 3.2,
};

export function cineDuration(kind) {
  const full = CINE_DUR[kind];
  if (!(full > 0) || full > CINE_MAX) return CINE_MAX;
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return Math.min(0.8, full);
  return full;
}

export function skipCine(cine) {
  if (!cine) return cine;
  cine.t = cine.dur;
  cine.skipped = true;
  return cine;
}

function clamp01(k) {
  return Math.max(0, Math.min(1, k));
}

function lerp(a, b, k) {
  return a + (b - a) * k;
}

function smooth(k) {
  const t = clamp01(k);
  return t * t * (3 - 2 * t);
}

export function behindBuddy(player) {
  return {
    x: player.x,
    y: player.y + 5.1,
    z: player.z - 8.6,
    lx: player.x,
    ly: player.y + 1.1,
    lz: player.z + 6,
  };
}

export function flyoverShot(t, dur, far, player) {
  const ease = smooth(t / dur);
  const behind = behindBuddy(player);
  const from = {
    x: far.x + 4,
    y: (far.y || 0) + 16,
    z: far.z + 12,
    lx: far.x,
    ly: (far.y || 0) + 2,
    lz: far.z - 18,
  };
  return {
    x: lerp(from.x, behind.x, ease),
    y: lerp(from.y, behind.y, ease),
    z: lerp(from.z, behind.z, ease),
    lx: lerp(from.lx, behind.lx, ease),
    ly: lerp(from.ly, behind.ly, ease),
    lz: lerp(from.lz, behind.lz, ease),
  };
}

export function launchShot(t, dur, ship) {
  const k = clamp01(t / dur);
  const board = Math.min(1, k / 0.42);
  const lift = Math.max(0, (k - 0.42) / 0.58);
  const ease = smooth(lift);
  return {
    x: ship.x + lerp(7, 12, ease),
    y: ship.y + lerp(5.2, 14, ease),
    z: ship.z + lerp(-18, 20, ease),
    lx: ship.x,
    ly: ship.y + lerp(3.6, 8, ease),
    lz: ship.z - 1,
    boarding: board < 1,
  };
}

export function collapseShot(t, dur, player) {
  const k = clamp01(t / dur);
  const ease = Math.min(1, k * 1.35);
  return {
    x: player.x + 5,
    y: player.y + 6 + ease * 16,
    z: player.z - 8 - ease * 10,
    lx: player.x,
    ly: player.y + 1,
    lz: player.z + 22,
    drop: ease * 28,
  };
}
