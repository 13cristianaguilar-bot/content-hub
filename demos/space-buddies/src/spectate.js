// Seated spectate frame. Horizontal orbit stays inside 10–14 m.
// The camera sits high enough to look along the course, and lifts clear of any Buddy under it.

export function spectateFrame(focus, time, floorY, racers) {
  const ang = (time || 0) * 0.1;
  const radius = 13;
  const base = floorY == null || !Number.isFinite(floorY) ? focus.y : floorY;
  let y = Math.max(base + 11, focus.y + 9.5);
  const sway = Math.sin(ang) * 4;
  const x = focus.x + sway;
  const z = focus.z - Math.sqrt(radius * radius - sway * sway);
  const crowd = racers || [];
  for (let i = 0; i < crowd.length; i++) {
    const r = crowd[i];
    if (!r || r.eliminated) continue;
    const dx = x - r.x;
    const dz = z - r.z;
    if (dx * dx + dz * dz < 25) y = Math.max(y, r.y + 7);
  }
  return {
    x,
    y,
    z,
    look: {
      x: focus.x,
      y: Math.max(base + 1.4, focus.y + 1.2),
      z: focus.z + 9,
    },
    fogNear: 150,
    fogFar: 340,
  };
}
