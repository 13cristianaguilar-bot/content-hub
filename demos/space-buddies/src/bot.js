// Scripted player for the playtest harness. Wish is world-space, same as the sim steer.

function clampWish(x, z) {
  const mag = Math.hypot(x, z);
  if (mag > 1) {
    x /= mag;
    z /= mag;
  }
  return { x, z };
}

function nextPoint(race, p) {
  const routes = (race.course && race.course.routes) || [race.course.waypoints];
  const wps = routes[0] || [];
  let best = wps.length ? wps[wps.length - 1] : { x: p.pos.x, y: p.pos.y, z: p.pos.z + 6 };
  for (let i = 0; i < wps.length; i++) {
    if (wps[i].z > p.pos.z + 2) {
      best = wps[i];
      break;
    }
  }
  return best;
}

function obstacleAhead(race, p) {
  const lists = [
    ["bump", race.course.bumpers],
    ["bar", race.course.spinners],
    ["bar", race.course.sweepers],
    ["bump", race.course.pendulums],
    ["bump", race.course.rollers],
    ["bump", race.course.hoppers],
    ["bump", race.course.blockers],
  ];
  for (let i = 0; i < lists.length; i++) {
    const kind = lists[i][0];
    const list = lists[i][1];
    if (!list) continue;
    for (let j = 0; j < list.length; j++) {
      const o = list[j];
      if (!o || o.ship) continue;
      const dz = o.z - p.pos.z;
      const dx = (o.x || 0) - p.pos.x;
      if (dz > 0.3 && dz < 3.4 && Math.abs(dx) < 1.8) return { kind, z: o.z };
    }
  }
  return null;
}

export function botWish(race, mode) {
  const none = { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false };
  const p = race.player;
  if (!p || p.seated || p.eliminated) return none;
  if (mode === "still") return none;
  if (mode === "spam") {
    const t = race.time || 0;
    return { x: 0, z: 0, jump: Math.floor(t * 7) % 2 === 0, dive: Math.floor(t * 5) % 2 === 0, grab: false, holdJump: false };
  }
  if (mode === "reverse") return { x: 0, z: -1, jump: false, dive: false, grab: false, holdJump: false };
  if (mode === "edge") {
    return { x: p.pos.x >= 0 ? 1 : -1, z: 0.15, jump: ((race.time || 0) % 1.3) < 0.12, dive: false, grab: false, holdJump: false };
  }
  if (mode === "wall") return { x: 0.92, z: 0.4, jump: false, dive: false, grab: false, holdJump: false };

  const ship = race.course && race.course.ship;
  const point = nextPoint(race, p);
  let tx = point.x;
  let tz = point.z;
  if (race.shipRound && ship && p.pos.z > ship.z - 24) {
    tx = ship.x;
    tz = ship.z - 4.2;
  } else if (race.gate && p.pos.z > race.gate.z - 16) {
    tx = race.gate.x;
    tz = race.gate.z + 1.2;
  } else if (race.kind === "crown" && race.crown) {
    tx = race.crown.x;
    tz = race.crown.z;
  }
  let dx = tx - p.pos.x;
  let dz = tz - p.pos.z;
  if (p.botMarkZ == null) {
    p.botMarkZ = p.pos.z;
    p.botMarkT = race.time || 0;
  }
  if (p.pos.z > p.botMarkZ + 1.2) {
    p.botMarkZ = p.pos.z;
    p.botMarkT = race.time || 0;
  }
  const stalled = (race.time || 0) - (p.botMarkT || 0) > 1.6;
  if (stalled) dx += Math.sin((race.time || 0) * 6) * 4;
  const wish = clampWish(dx, dz);
  const obs = obstacleAhead(race, p);
  const rise = (point.y || 0) - p.pos.y;
  const boarding = race.shipRound && ship && Math.abs(p.pos.x - ship.x) < 5 && p.pos.z > ship.z - 10 && p.pos.z < ship.z + 1;
  const jump = !boarding && (!!(point.gap) || rise > 0.55 || !!(obs && obs.kind !== "bar") || stalled);
  return {
    x: wish.x,
    z: wish.z,
    jump,
    dive: !!(obs && obs.kind === "bar"),
    grab: false,
    holdJump: false,
  };
}
