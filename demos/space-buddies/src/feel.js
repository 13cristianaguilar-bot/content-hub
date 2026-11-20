// Feel signals for the playtest. A snag is a steered run that loses more than half
// its speed on a collider without a hit. An unfair hit arrives with under 0.5 s of warning.

export function isSnag(before, after, wishAlong, hitRecently) {
  return before > 3.5 && after < before * 0.5 && wishAlong > 0.45 && !hitRecently;
}

export function isUnfair(warnAge) {
  return warnAge == null || warnAge < 0.5;
}

export function emptyFeel() {
  return {
    snags: 0,
    unfair: 0,
    missed: 0,
    jumps: 0,
    lands: 0,
    falls: 0,
    dies: 0,
    marks: [],
  };
}

export function pushMark(feel, x, z, kind) {
  if (!feel || feel.marks.length > 500) return;
  feel.marks.push({ x: Math.round(x * 10) / 10, z: Math.round(z * 10) / 10, kind });
}
