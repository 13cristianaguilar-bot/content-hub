import { COLORS } from "./config.js";
import { floorsAt, groundAt } from "./course.js";
import { emptyFeel, isSnag, isUnfair, pushMark } from "./feel.js";

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function hypot(x, z) {
  return Math.hypot(x, z);
}

export function createRace(course, cfg, seed = 1) {
  const rand = mulberry32(seed || 1);
  const spots = course.spawns.slice();
  const playerSpot = spots.find((s) => s.col === 0 && s.row === spots[0].row + 3) || spots[Math.min(8, spots.length - 1)];
  const rest = spots.filter((s) => s !== playerSpot);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = rest[i];
    rest[i] = rest[j];
    rest[j] = tmp;
  }

  const racers = [];
  for (let i = 0; i < cfg.racers; i++) {
    const spot = i === 0 ? playerSpot : rest[i - 1] || playerSpot;
    const speed = i === 0 ? cfg.playerSpeed : cfg.botSpeeds[Math.min(i - 1, cfg.botSpeeds.length - 1)];
    racers.push({
      id: i,
      isPlayer: i === 0,
      useAI: i !== 0,
      color: COLORS[i % COLORS.length],
      pos: { x: spot.x, y: spot.y, z: spot.z },
      lastSafe: { x: spot.x, y: spot.y, z: spot.z },
      vel: { x: 0, y: 0, z: 0 },
      yaw: 0,
      grounded: true,
      platformId: null,
      coyote: cfg.coyoteTime,
      buffer: 0,
      ungroundT: 0,
      flail: 0,
      invuln: 0.4,
      controlLock: 0,
      sliding: 0,
      squash: 0,
      seated: false,
      seatIndex: -1,
      eliminated: false,
      cp: 0,
      padCd: 0,
      canGlide: 0,
      qualified: false,
      grabT: 0,
      boost: 0,
      bumpCd: 0,
      spinCd: 0,
      diveCd: 0,
      knockCd: 0,
      diving: false,
      wasDiving: false,
      dashX: 0,
      dashZ: 1,
      onIce: false,
      emote: "idle",
      attached: false,
      profile: {
        speed,
        skill: speed > 0.96 ? 0.94 : speed > 0.86 ? 0.78 : 0.5,
        mistake: i === 0 ? 0 : speed > 0.96 ? 0.012 : speed > 0.86 ? 0.035 : 0.07,
        phase: rand() * 6,
      },
      wait: i === 0 ? 0 : (spot.row || 0) * 0.42 + rand() * 0.55,
      stumble: 0,
      wp: 0,
      routeId: i % 3,
    });
  }

  const race = {
    cfg,
    course,
    racers,
    player: racers[0],
    seed,
    rand,
    phase: "countdown",
    countClock: 0,
    countCue: -1,
    time: 0,
    collapseZ: course.zones[0].z0 - 16,
    collapseSpeed: 1,
    seats: Array(cfg.seats).fill(null),
    seatsFilled: 0,
    lastSeatEvent: false,
    result: null,
    launchT: 0,
    launchV: 0,
    launchY: 0,
    shipY: course.ship.y,
    events: [],
    platforms: course.platforms.map((p) => ({ ...p })),
    spinners: course.spinners.map((s) => ({ ...s })),
    geysers: course.geysers.map((g) => ({ ...g })),
    rollers: course.rollers.map((r) => ({ ...r })),
    hoppers: course.hoppers.map((h) => ({ ...h })),
    flyers: course.flyers.map((f) => ({ ...f })),
    pendulums: course.pendulums.map((p) => ({ ...p, bobX: p.x, bobY: p.y - p.len, bobZ: p.z })),
    sweepers: course.sweepers.map((s) => ({ ...s })),
    lavaY: cfg.lavaStartY,
    coins: 0,
    crates: (course.crateSpawns || []).map((c) => ({ x: c.x, y: c.y, z: c.z, vx: 0, vz: 0 })),
    finishZ: null,
    shipRound: false,
    kind: "gate",
    crown: null,
    qualifyN: 0,
    qualCount: 0,
    shake: 0,
    activated: false,
    zoneId: "meadow",
    feel: cfg.feel ? emptyFeel() : null,
  };
  const span = Math.max(30, course.ship.z - course.zones[0].z0);
  race.collapseSpeed = span / Math.max(8, cfg.collapseArrive - cfg.collapseDelay);
  for (const chunk of course.chunks) {
    chunk.state = "solid";
    chunk.crackT = 0;
    chunk.fallT = 0;
    chunk.fallY = 0;
    chunk.dirty = true;
    chunk.tilt = 0;
    chunk.stepped = false;
    chunk.spawned = false;
  }
  return race;
}

export function resetRace(race, seed) {
  for (const chunk of race.course.chunks) {
    chunk.state = "solid";
    chunk.crackT = 0;
    chunk.fallT = 0;
    chunk.fallY = 0;
    chunk.dirty = true;
    chunk.tilt = 0;
    chunk.stepped = false;
  }
  const next = createRace(race.course, race.cfg, seed || ((race.seed + 17) >>> 0));
  Object.assign(race, next);
  return race;
}

function walkable(tile) {
  return tile && (tile.state === "solid" || tile.state === "cracking");
}

function canStep(y, nextY, top) {
  const climb = top - y;
  if (climb > 0.42) return false;
  if (y > top + 0.08 && nextY > top + 0.08) return false;
  return true;
}

export function cameraAboveFloor(camY, floorY) {
  const min = floorY + 1;
  return camY < min ? min : camY;
}

export function cameraFloor(sampled, last, playerY) {
  if (sampled != null && Number.isFinite(sampled)) return sampled;
  if (last != null && Number.isFinite(last)) return last;
  return playerY > 0 ? playerY : 0;
}

function platformSurface(p, x, z) {
  if (p.axis !== "seesaw") return p.y;
  const face = p.face || 0;
  const along = (x - p.x) * Math.cos(face) + (z - p.z) * Math.sin(face);
  return p.originY - along * Math.sin(p.tilt || 0);
}

function sampleGround(race, x, z, y, nextY) {
  let best = null;
  const plats = race.platforms;
  for (let i = 0; i < plats.length; i++) {
    const p = plats[i];
    const dx = x - p.x;
    const dz = z - p.z;
    if (dx * dx + dz * dz > p.radius * p.radius) continue;
    const top = platformSurface(p, x, z);
    if (!canStep(y, nextY, top)) continue;
    if (!best || top >= best.y) best = { y: top, platformId: i, tile: null };
  }
  const tiles = floorsAt(race.course, x, z);
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (tile && walkable(tile) && canStep(y, nextY, tile.y)) {
      if (!best || tile.y >= best.y - 0.02) best = { y: tile.y, platformId: null, tile };
    }
  }
  return best;
}

function supportNear(race, x, z, y) {
  const tiles = floorsAt(race.course, x, z);
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (tile && walkable(tile) && Math.abs(tile.y - y) < 1.4) return true;
  }
  for (const p of race.platforms) {
    const dx = x - p.x;
    const dz = z - p.z;
    if (dx * dx + dz * dz <= p.radius * p.radius && Math.abs(p.y - y) < 1.6) return true;
  }
  return false;
}

function inWind(race, r) {
  for (const w of race.course.winds) {
    if (r.pos.z >= w.z0 && r.pos.z <= w.z1 && r.pos.x >= w.x0 && r.pos.x <= w.x1 && r.pos.y >= w.y0 && r.pos.y <= w.y1) {
      return w;
    }
  }
  return null;
}

function knock(race, r, ix, iz, iy) {
  if (r.seated || r.eliminated || r.invuln > 0 || r.knockCd > 0 || r.lockImmune > 0) return;
  r.vel.x += ix;
  r.vel.z += iz;
  r.vel.y = Math.max(r.vel.y, iy);
  r.grounded = false;
  r.platformId = null;
  r.ungroundT = Math.max(r.ungroundT, 0.08);
  r.flail = Math.min(1.4, Math.max(r.flail, race.cfg.stunTime));
  r.controlLock = Math.min(1.4, Math.max(r.controlLock, race.cfg.stunTime));
  r.knockCd = race.cfg.knockCooldown;
  r.sliding = 0;
  race.events.push({ t: "bump", id: r.id, big: true, obstacle: true });
  if (r.isPlayer) race.shake = Math.max(race.shake, 0.72);
}

function ageLocks(r, dt) {
  if (r.lockImmune > 0) {
    r.lockImmune -= dt;
    r.controlLock = 0;
    r.grabT = 0;
    if (r.flail > 0.12) r.flail = 0.12;
    r.lockAge = 0;
    return;
  }
  const held = r.controlLock > 0.04 || r.flail > 0.25 || r.grabT > 0.25;
  if (!held) {
    r.lockAge = 0;
    return;
  }
  r.lockAge = (r.lockAge || 0) + dt;
  if (r.lockAge < 2) return;
  r.controlLock = 0;
  r.flail = 0;
  r.grabT = 0;
  r.sliding = 0;
  r.lockAge = 0;
  r.lockImmune = 1.2;
}

function spotOnFloor(race, x, z) {
  const floors = race.course.floors || [];
  let best = null;
  for (let i = 0; i < floors.length; i++) {
    const pad = floors[i];
    const chunk = race.course.chunks[pad.chunk];
    if (!chunk || (chunk.state !== "solid" && chunk.state !== "cracking")) continue;
    const nx = (x - pad.x) / pad.rx;
    const nz = (z - pad.z) / pad.rz;
    const guard = pad.zone === "meadow" ? 1.08 : 0.98;
    if (nx * nx + nz * nz > guard) continue;
    if (!best || pad.y >= best.y) best = { x, y: pad.y, z };
  }
  return best;
}

function findRespawnTile(race, r) {
  const safe = r.lastSafe;
  if (safe && safe.z > race.collapseZ + 2) {
    const on = spotOnFloor(race, safe.x, safe.z);
    if (on) return on;
  }
  const routes = race.course.routes || [race.course.waypoints];
  let best = null;
  let bestD = 1e9;
  const want = Math.max((safe && safe.z) || r.pos.z || 0, race.collapseZ + 8);
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    for (let w = 0; w < route.length; w++) {
      const wp = route[w];
      if (wp.z < race.collapseZ + 4) continue;
      const on = spotOnFloor(race, wp.x, wp.z);
      if (!on) continue;
      const d = Math.abs(wp.z - want) + (wp.z > want + 18 ? 40 : 0);
      if (d < bestD) {
        bestD = d;
        best = on;
      }
    }
  }
  if (best) return best;
  const floors = race.course.floors || [];
  for (let i = 0; i < floors.length; i++) {
    const pad = floors[i];
    const chunk = race.course.chunks[pad.chunk];
    if (!chunk || (chunk.state !== "solid" && chunk.state !== "cracking")) continue;
    if (pad.zone === "ship") continue;
    if (pad.z < race.collapseZ + 4) continue;
    return { x: pad.x, y: pad.y, z: pad.z };
  }
  return null;
}

function missFooting(race, r) {
  if (race.kind === "survival" && race.phase === "race" && !r.eliminated && !r.qualified && !r.seated) {
    r.eliminated = true;
    if (!race.fallers) race.fallers = [];
    race.fallers.push(r.isPlayer ? "YOU" : "BUDDY");
    r.vel.x = 0;
    r.vel.y = 0;
    r.vel.z = 0;
    r.grounded = false;
    race.events.push({ t: "fallout", id: r.id, name: r.isPlayer ? "YOU" : "BUDDY" });
    if (r.isPlayer && race.feel) {
      race.feel.dies++;
      pushMark(race.feel, r.pos.x, r.pos.z, "die");
    }
    return;
  }
  doRespawn(race, r);
}

function doRespawn(race, r) {
  const spot = findRespawnTile(race, r);
  if (!spot) return;
  r.pos.x = spot.x;
  r.pos.y = spot.y + 0.05;
  r.pos.z = spot.z;
  r.vel.x = 0;
  r.vel.y = 0;
  r.vel.z = 0;
  r.grounded = true;
  r.platformId = null;
  r.flail = 0;
  r.invuln = 0.85;
  r.controlLock = 0;
  r.lockAge = 0;
  r.airStuck = 0;
  r.stallT = 0;
  r.sliding = 0;
  r.diving = false;
  r.wasDiving = false;
  r.lastSafe = { x: spot.x, y: spot.y, z: spot.z };
  r.markX = spot.x;
  r.markZ = spot.z;
  race.events.push({ t: "respawn", id: r.id, fade: r.isPlayer });
  if (r.isPlayer) {
    race.shake = Math.max(race.shake, 0.3);
    if (race.feel) {
      race.feel.falls++;
      pushMark(race.feel, spot.x, spot.z, "fall");
      r.jumpArm = 0;
    }
  }
}

function pound(race, r) {
  const cfg = race.cfg;
  for (const o of race.racers) {
    if (o === r || o.seated || o.invuln > 0) continue;
    const dx = o.pos.x - r.pos.x;
    const dz = o.pos.z - r.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < cfg.poundRadius && Math.abs(o.pos.y - r.pos.y) < 1.5) {
      const nx = d > 0.05 ? dx / d : 1;
      const nz = d > 0.05 ? dz / d : 0;
      o.vel.x += nx * cfg.poundPush;
      o.vel.z += nz * cfg.poundPush;
      o.vel.y = Math.max(o.vel.y, cfg.poundUp);
      o.grounded = false;
      o.flail = 0.35;
      o.ungroundT = 0.06;
    }
  }
  race.events.push({ t: "bump", id: r.id, big: true });
}

function resolveSolids(race, r) {
  const list = race.course.blockers;
  if (!list) return;
  const ship = race.course.ship;
  for (let i = 0; i < list.length; i++) {
    const b = list[i];
    if (Math.abs(r.pos.y - b.y) > 2.2) continue;
    if (b.ship) {
      const door = r.pos.z - ship.z;
      const overlap = Math.hypot(r.pos.x - b.x, r.pos.z - b.z);
      if (door < -0.5 && door > -9 && overlap > b.r * 0.35) continue;
    }
    let dx = r.pos.x - b.x;
    let dz = r.pos.z - b.z;
    const dist = Math.hypot(dx, dz);
    if (dist >= b.r || dist < 0.0001) continue;
    const nx = dx / dist;
    const nz = dz / dist;
    const push = b.r - dist;
    r.pos.x += nx * push;
    r.pos.z += nz * push;
    const into = r.vel.x * nx + r.vel.z * nz;
    if (into < 0) {
      r.vel.x -= nx * into;
      r.vel.z -= nz * into;
    }
  }
}

function steer(r, wishX, wishZ, dt, rate, maxSp, windX) {
  const mag = hypot(wishX, wishZ);
  const speed = maxSp * Math.min(1, mag);
  let dx = 0;
  let dz = 0;
  if (mag > 0.001) {
    dx = wishX / mag;
    dz = wishZ / mag;
  }
  const tx = dx * speed + (windX || 0);
  const tz = dz * speed;
  const dvx = tx - r.vel.x;
  const dvz = tz - r.vel.z;
  const dv = Math.hypot(dvx, dvz);
  const step = Math.min(dv, rate * dt);
  if (dv > 0.0001) {
    r.vel.x += (dvx / dv) * step;
    r.vel.z += (dvz / dv) * step;
  }
}

function shoveFree(race, r) {
  const list = race.course.blockers;
  if (!list) return;
  const ship = race.course.ship;
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < list.length; i++) {
      const b = list[i];
      if (Math.abs(r.pos.y - b.y) > 2.4) continue;
      let dx = r.pos.x - b.x;
      let dz = r.pos.z - b.z;
      let dist = Math.hypot(dx, dz);
      if (dist >= b.r) continue;
      if (b.ship && ship) {
        const door = r.pos.z - ship.z;
        if (door < -0.2 && door > -9 && dist > b.r * 0.35) continue;
      }
      if (dist < 0.0001) {
        dx = 1;
        dz = 0.15;
        dist = Math.hypot(dx, dz);
      }
      const nx = dx / dist;
      const nz = dz / dist;
      const push = b.r - dist + 0.06;
      r.pos.x += nx * push;
      r.pos.z += nz * push;
      if (r.vel.x * nx + r.vel.z * nz < 0) {
        r.vel.x += nx * 2;
        r.vel.z += nz * 2;
      }
    }
  }
}

function integrate(race, r, wish, dt) {
  const cfg = race.cfg;
  r.prevZ = r.pos.z;
  r.prevX = r.pos.x;
  r.prevY = r.pos.y;
  if (r.seated || r.eliminated) return;
  if (r.qualified) {
    r.pos.z += 2.4 * dt;
    r.vel.x *= 0.8;
    r.vel.z = 2.4;
    return;
  }
  ageLocks(r, dt);
  if (r.controlLock > 0) {
    r.controlLock -= dt;
    wish = { x: 0, z: 0, jump: false, dive: false };
  }
  if (r.invuln > 0) r.invuln -= dt;
  if (r.padCd > 0) r.padCd -= dt;
  if (r.bumpCd > 0) r.bumpCd -= dt;
  if (r.spinCd > 0) r.spinCd -= dt;
  if (r.diveCd > 0) r.diveCd -= dt;
  if (r.knockCd > 0) r.knockCd -= dt;
  if (r.flail > 0) r.flail -= dt;
  if (r.squash > 0) r.squash = Math.max(0, r.squash - dt * 3.2);

  if (r.grounded && r.platformId != null) {
    const p = race.platforms[r.platformId];
    if (p) {
      r.pos.x += p.x - p.prevX;
      r.pos.z += p.z - p.prevZ;
      if (p.axis === "spin") {
        const dx = r.pos.x - p.x;
        const dz = r.pos.z - p.z;
        r.vel.x += -dz * p.speed * dt * 5.5;
        r.vel.z += dx * p.speed * dt * 5.5;
      } else if (p.axis === "seesaw") {
        const face = p.face || 0;
        const slide = Math.sin(p.tilt || 0) * 9 * dt;
        r.vel.x += Math.cos(face) * slide;
        r.vel.z += Math.sin(face) * slide;
      }
    }
  }

  if (r.grounded) r.coyote = cfg.coyoteTime;
  else r.coyote = Math.max(0, r.coyote - dt);
  if (wish.jump) r.buffer = cfg.jumpBuffer;
  else r.buffer = Math.max(0, r.buffer - dt);

  if (wish.dive && r.diveCd <= 0) {
    const mag = hypot(wish.x, wish.z);
    if (mag > 0.15) {
      r.dashX = wish.x / mag;
      r.dashZ = wish.z / mag;
    } else {
      r.dashX = Math.sin(r.yaw);
      r.dashZ = Math.cos(r.yaw);
    }
    if (r.grounded) {
      r.sliding = cfg.diveDashTime;
      r.diveCd = cfg.diveCooldown;
      if (wish.jump) r.buffer = Math.max(r.buffer, cfg.diveDashTime + 0.08);
      race.events.push({ t: "dive", id: r.id });
    } else {
      r.vel.y = -cfg.diveFall;
      r.diving = true;
      r.wasDiving = true;
      r.diveCd = cfg.diveCooldown;
      r.grounded = false;
      race.events.push({ t: "dive", id: r.id });
    }
  }

  const wind = inWind(race, r);
  const windX = wind ? wind.ax * cfg.windPush * (race.windMul || 1) : 0;
  const rate = r.controlLock > 0 ? 8 : r.onIce ? (hypot(wish.x, wish.z) > 0.1 ? cfg.iceAccel : cfg.iceFriction) : (hypot(wish.x, wish.z) > 0.08 ? cfg.accel : cfg.friction);
  const maxSp = cfg.maxSpeed * bandSpeed(race, r);

  if (r.sliding > 0) {
    r.sliding -= dt;
    r.vel.x = r.dashX * cfg.diveDashSpeed;
    r.vel.z = r.dashZ * cfg.diveDashSpeed;
    // A little steering so the slide is not a blind commit.
    r.vel.x += wish.x * 10 * dt;
    r.vel.z += wish.z * 10 * dt;
  } else if (r.grounded) {
    steer(r, wish.x, wish.z, dt, rate, maxSp, windX);
    if (r.groundTile && r.groundTile.conveyX) r.vel.x += r.groundTile.conveyX * dt;
  } else {
    r.vel.x += wish.x * cfg.airAccel * dt + windX * dt * 0.6;
    r.vel.z += wish.z * cfg.airAccel * dt;
    const cap = r.diving ? cfg.diveDashSpeed : r.boost > 0 ? cfg.padForward + maxSp : maxSp * 1.18;
    if (r.boost > 0) r.boost -= dt;
    const h = hypot(r.vel.x, r.vel.z);
    if (h > cap) {
      r.vel.x *= cap / h;
      r.vel.z *= cap / h;
    }
  }

  let jumped = false;
  if (r.buffer > 0 && r.ungroundT <= 0 && (r.grounded || r.coyote > 0) && r.sliding <= 0) {
    r.vel.y = cfg.jumpVel;
    r.grounded = false;
    r.platformId = null;
    r.coyote = 0;
    r.buffer = 0;
    r.ungroundT = cfg.ungroundTime;
    jumped = true;
    race.events.push({ t: "jump", id: r.id });
    if (r.isPlayer && race.feel) {
      r.jumpArm = race.time;
      race.feel.jumps++;
    }
  }

  let g = cfg.gravity;
  if (r.vel.y < 0) g *= cfg.fallGravityMul;
  r.vel.y -= g * dt;
  if (r.vel.y < -cfg.maxFallSpeed) r.vel.y = -cfg.maxFallSpeed;
  r.vel.x = clamp(r.vel.x, -24, 24);
  r.vel.z = clamp(r.vel.z, -24, 24);
  if (r.ungroundT > 0) r.ungroundT -= dt;

  if (r.canGlide > 0) {
    r.canGlide -= dt;
    if (!r.grounded && wish.holdJump && r.vel.y < 2) {
      r.vel.y = Math.max(r.vel.y, -3.2);
      r.vel.y += 11 * dt;
      if (!r.glided) {
        r.glided = true;
        race.events.push({ t: "glide", id: r.id });
      }
    }
  }
  if (r.grounded) r.glided = false;
  if (r.grabT > 0) r.grabT -= dt;
  if (wish.grab && r.grabT <= 0) {
    tryGrab(race, r);
    r.grabT = 0.4;
  }

  const wasGrounded = r.grounded;
  const prevX = r.pos.x;
  const prevZ = r.pos.z;
  const speedBefore = hypot(r.vel.x, r.vel.z);
  const intoX = r.vel.x;
  const intoZ = r.vel.z;
  const travel = Math.hypot(r.vel.x, r.vel.z) * dt;
  const slices = Math.max(1, Math.min(4, Math.ceil(travel / 0.42)));
  const hdt = dt / slices;
  for (let slice = 0; slice < slices; slice++) {
    r.pos.x += r.vel.x * hdt;
    r.pos.z += r.vel.z * hdt;
    resolveSolids(race, r);
  }
  const speedAfter = hypot(r.vel.x, r.vel.z);
  if (r.isPlayer && race.feel && r.grounded && r.sliding <= 0) {
    const wishMag = hypot(wish.x, wish.z);
    const along = wishMag > 0.2 && speedBefore > 0 ? (wish.x * intoX + wish.z * intoZ) / (wishMag * speedBefore) : 0;
    const hitRecently = r.hitAt != null && race.time - r.hitAt < 0.25;
    if (isSnag(speedBefore, speedAfter, along, hitRecently)) {
      race.feel.snags++;
      pushMark(race.feel, r.pos.x, r.pos.z, "snag");
    }
  }
  if (r.isPlayer && race.feel) {
    const ahead = hazardAhead(race, r);
    if (ahead != null && ahead < 7) {
      if (r.warnT == null) r.warnT = race.time;
    } else if (ahead == null || ahead > 10) r.warnT = null;
  }
  const nextY = r.pos.y + r.vel.y * dt;

  if (r.ungroundT > 0 || jumped) {
    r.pos.y = nextY;
    r.grounded = false;
    r.platformId = null;
  } else {
    const fromY = Math.max(r.pos.y, nextY);
    const toY = Math.min(r.pos.y, nextY);
    const gnd = sampleGround(race, r.pos.x, r.pos.z, fromY, toY);
    if (gnd && r.vel.y <= 0.85) {
      const impact = -r.vel.y;
      const wasAir = !r.grounded;
      r.pos.y = gnd.y;
      r.vel.y = 0;
      r.grounded = true;
      r.platformId = gnd.platformId;
      r.groundTile = gnd.tile;
      r.onIce = !!(gnd.tile && gnd.tile.ice);
      r.diving = false;
      if (wasAir && impact > 2.4) {
        r.squash = clamp(impact / 16, 0.12, 1);
        race.events.push({ t: "land", id: r.id, impact });
        if (r.wasDiving && impact > 8) pound(race, r);
      }
      r.wasDiving = false;
      if (r.isPlayer && race.feel && r.jumpArm) {
        race.feel.lands++;
        r.jumpArm = 0;
      }
      if (gnd.tile && !gnd.tile.fragile) r.lastSafe = { x: gnd.tile.x, y: gnd.y, z: r.pos.z };
      if (gnd.tile && gnd.tile.chunk && gnd.tile.state === "solid" && gnd.tile.fragile && !gnd.tile.chunk.stepped) {
        gnd.tile.chunk.stepped = true;
        gnd.tile.chunk.state = "cracking";
        gnd.tile.chunk.crackT = cfg.fragileCrack;
        gnd.tile.chunk.dirty = true;
        race.events.push({ t: "crack" });
      }
    } else if (wasGrounded && r.pos.z < 50 && r.vel.y <= 0.6 && spotOnFloor(race, r.pos.x, r.pos.z)) {
      const tile = spotOnFloor(race, r.pos.x, r.pos.z);
      r.pos.y = tile.y;
      r.vel.y = 0;
      r.grounded = true;
      r.groundTile = tile;
    } else {
      r.pos.y = nextY;
      r.grounded = false;
      r.platformId = null;
      r.groundTile = null;
      r.onIce = false;
      if (r.isPlayer && race.feel && r.jumpArm && race.time - r.jumpArm > 0.35 && r.vel.y < -1) {
        const lip = sampleGround(race, r.pos.x, r.pos.z, r.pos.y + 0.2, r.pos.y);
        const tile = lip && lip.tile;
        if (tile && tile.rx && r.pos.y < lip.y - 0.9 && r.pos.y > lip.y - 2.2) {
          const nx = (r.pos.x - tile.px) / tile.rx;
          const nz = (r.pos.z - tile.pz) / tile.rz;
          if (nx * nx + nz * nz < 0.35) {
            race.feel.missed++;
            pushMark(race.feel, r.pos.x, r.pos.z, "miss");
            r.jumpArm = 0;
          }
        }
      }
    }
  }

  const cps = race.course.checkpoints;
  while (r.grounded && r.cp < cps.length - 1 && r.pos.z > cps[r.cp + 1].z - 1.5) {
    r.cp++;
    if (r.isPlayer) race.events.push({ t: "checkpoint", name: cps[r.cp].name });
  }

  const under = groundAt(race.course, r.pos.x, r.pos.z);
  const courseY = under ? under.y : (r.lastSafe ? r.lastSafe.y : 0);
  if (r.pos.y < cfg.voidY || r.pos.y < courseY - 15) missFooting(race, r);
  const lava = race.course.lava;
  if (r.pos.z > lava.z0 && r.pos.z < lava.z1 && r.pos.x > lava.x0 && r.pos.x < lava.x1 && r.pos.y < race.lavaY + 0.2 && !r.seated) {
    missFooting(race, r);
  }

  const hsp = hypot(r.vel.x, r.vel.z);
  if (hsp > 0.7 && r.sliding <= 0) r.yaw = Math.atan2(r.vel.x, r.vel.z);
  else if (r.sliding > 0) r.yaw = Math.atan2(r.dashX, r.dashZ);
  if (wasGrounded && !r.grounded) r.fallFrom = r.pos.y;
  if (r.grounded && r.fallFrom != null) {
    const drop = r.fallFrom - r.pos.y;
    if (drop > 4.5 && !(r.lockImmune > 0)) {
      r.flail = 0.7;
      r.controlLock = Math.max(r.controlLock, 0.35);
    }
    r.fallFrom = null;
  }
  if (r.flailWas > 0 && r.flail <= 0) {
    const stand = groundAt(race.course, r.pos.x, r.pos.z);
    if (stand && Math.abs(r.pos.y - stand.y) < 1.4) {
      r.pos.y = stand.y;
      r.vel.y = 0;
      r.grounded = true;
    }
  }
  r.flailWas = r.flail;
  const supported = r.grounded || supportNear(race, r.pos.x, r.pos.z, r.pos.y);
  if (supported) r.airStuck = 0;
  else r.airStuck = (r.airStuck || 0) + dt;
  if (r.airStuck > 3) {
    r.airStuck = 0;
    missFooting(race, r);
  }
  shoveFree(race, r);
  noteTunnel(race, r);
}

function noteTunnel(race, r) {
  if (!r.isPlayer || r.prevY == null || r.tunneled) return;
  const hits = floorsAt(race.course, r.pos.x, r.pos.z);
  for (let i = 0; i < hits.length; i++) {
    const tile = hits[i];
    if (!tile.rx || !tile.rz) continue;
    const nx = (r.pos.x - tile.px) / tile.rx;
    const nz = (r.pos.z - tile.pz) / tile.rz;
    if (nx * nx + nz * nz > 0.35) continue;
    if (r.prevY >= tile.y - 0.05 && r.pos.y < tile.y - 0.75) {
      r.tunneled = tile.y;
      return;
    }
  }
}

export function bandSpeed(race, r) {
  const base = (r.profile && r.profile.speed) || 1;
  if (!race || r.isPlayer || !race.cfg) return base;
  const cap = race.cfg.botSpeeds ? race.cfg.botSpeeds[0] : base;
  const pack = race.racers.filter((o) => o && !o.eliminated && !o.seated && !o.qualified);
  if (pack.length < 3) return Math.min(cap, base);
  const zs = pack.map((o) => o.pos.z).sort((a, b) => a - b);
  const mid = zs[Math.floor(zs.length / 2)];
  const gap = r.pos.z - mid;
  let mul = 1;
  if (gap < -6) mul = 1.14;
  else if (gap < -2) mul = 1.07;
  else if (gap > 8) mul = 0.88;
  else if (gap > 3.5) mul = 0.94;
  return Math.min(cap, base * mul);
}

export function paceCollapse(startZ, endZ, seconds, delay, minSpeed) {
  const from = startZ - 8;
  const stop = endZ;
  const chase = Math.max(8, seconds - delay);
  const span = Math.max(0, stop - from);
  return {
    collapseZ: from,
    collapseStop: stop,
    collapseSpeed: Math.max(0.8, span / chase, minSpeed || 0),
  };
}

export function botWish(race, r, dt) {
  const empty = { x: 0, z: 0, jump: false, dive: false };
  if (r.wait > 0) {
    r.wait -= dt;
    return empty;
  }
  if (r.stumble > 0) {
    r.stumble -= dt;
    return empty;
  }
  const p = r.profile;
  if (race.rand() < p.mistake * dt) r.stumble = 0.18 + race.rand() * 0.28;

  const routes = race.course.routes;
  const wps = (routes && routes[r.routeId]) || race.course.waypoints;
  while (r.wp < wps.length - 1) {
    const w = wps[r.wp];
    const ddx = r.pos.x - w.x;
    const ddz = r.pos.z - w.z;
    if (ddx * ddx + ddz * ddz > 9) break;
    r.wp++;
  }
  let target = wps[Math.min(r.wp, wps.length - 1)];
  let heldCrown = false;
  if (race.kind === "crown" && race.crown) {
    const c = race.crown;
    heldCrown = (r.pos.x - c.x) ** 2 + (r.pos.z - c.z) ** 2 < (c.r * 0.72) ** 2;
    target = {
      x: c.x + (heldCrown ? Math.cos(r.id) * 0.45 : 0),
      z: c.z + (heldCrown ? Math.sin(r.id) * 0.45 : 0),
      y: c.y || target.y,
      gap: false,
    };
  } else if (race.shipRound && race.course.ship) {
    const ship = race.course.ship;
    target = { x: ship.x, z: ship.z - 4, y: ship.y, gap: false };
  } else if (race.kind === "gate" && race.gate && race.gate.z - r.pos.z < 22) {
    target = { x: race.gate.x || 0, z: race.gate.z, y: race.gate.y || target.y, gap: false };
  } else if (race.kind === "survival") {
    const wobble = Math.sin(race.time * 0.6 + r.id) * 1.1;
    target = { x: ((r.id % 4) - 1.5) * 2.1 + wobble, z: r.pos.z, y: r.pos.y, gap: false };
  }
  const spread = heldCrown ? 0 : ((r.id % 5) - 2) * (r.pos.y > 5.5 ? 0.4 : 0.85);
  let tx = target.x + spread;
  if (target.gap) tx = target.x;
  if (!heldCrown) for (const pad of race.course.pads) {
    const nearTarget = (pad.x - target.x) ** 2 + (pad.z - target.z) ** 2 < 36;
    const nearMe = (pad.x - r.pos.x) ** 2 + (pad.z - r.pos.z) ** 2 < 49;
    if (nearTarget && nearMe) tx = pad.x;
  }
  let tz = target.z;
  let ty = target.y;
  if (target.z - r.pos.z > 6) {
    let best = null;
    let bd = 1e9;
    for (const plat of race.platforms) {
      if (plat.kind !== "ferry") continue;
      if (plat.z < r.pos.z + 0.5 || plat.z > target.z + 1) continue;
      const d = plat.z - r.pos.z;
      if (d < bd) {
        bd = d;
        best = plat;
      }
    }
    if (best) {
      tx = best.x;
      tz = best.z;
      ty = best.y;
    }
  }

  // Stay near the path center when something shoves you.
  let dx = tx - r.pos.x;
  let dz = tz - r.pos.z;
  if (inWind(race, r)) dx -= 2.4 * p.skill;

  for (const s of race.spinners) {
    const dzs = s.z - r.pos.z;
    if (dzs > -0.2 && dzs < 7 && Math.abs(s.x - r.pos.x) < 2.2) {
      dx += (r.pos.x >= s.x ? 1 : -1) * 3.2 * p.skill;
    }
  }
  for (const sw of race.sweepers) {
    const dzs = sw.z - r.pos.z;
    if (dzs > 0.3 && dzs < 6 && Math.abs(sw.x - r.pos.x) < 1.6) {
      if (sw.full && p.skill > 0.4) {
        // Jump the low bar.
      } else {
        dx += (r.pos.x >= sw.x ? 1 : -1) * 3 * p.skill;
      }
    }
  }
  for (const g of race.geysers) {
    if (!g.warn && !g.hot) continue;
    const dzg = g.z - r.pos.z;
    if (dzg > -0.5 && dzg < 7 && Math.abs(g.x - r.pos.x) < 2.4) {
      dx += (r.pos.x >= g.x ? 1 : -1) * 4.2 * p.skill;
    }
  }
  for (const roller of race.rollers) {
    if (Math.abs(roller.z - r.pos.z) < 3 && Math.abs(roller.x - r.pos.x) < 3) {
      dz += 2.5;
      dx += (r.pos.x >= roller.x ? 1 : -1) * 2;
    }
  }
  for (const pdl of race.pendulums || []) {
    const dzp = pdl.z - r.pos.z;
    const bobX = pdl.bobX == null ? pdl.x : pdl.bobX;
    if (dzp > -1 && dzp < 8 && Math.abs(bobX - r.pos.x) < 2.6) {
      dx += (r.pos.x >= bobX ? 1 : -1) * 3.6 * p.skill;
    }
  }
  if (race.kind !== "survival" && r.pos.z < race.collapseZ + 7) dz += 4;

  const mag = Math.hypot(dx, dz) || 1;
  dx /= mag;
  dz /= mag;

  let jump = false;
  const ax = r.pos.x + dx * 1.05;
  const az = r.pos.z + dz * 1.05;
  const ahead = supportNear(race, ax, az, r.pos.y);
  if (r.grounded && !ahead) {
    const far = supportNear(race, r.pos.x + dx * 3.2, r.pos.z + dz * 4.2, r.pos.y) || ty > r.pos.y - 0.4;
    if (far) jump = true;
    else dz *= 0.15;
  }
  if (r.grounded && ty > r.pos.y + 0.65 && Math.hypot(tx - r.pos.x, tz - r.pos.z) < 3.2) jump = true;

  let padNear = false;
  for (const pad of race.course.pads) {
    const dzp = pad.z - r.pos.z;
    if (dzp > -0.4 && dzp < 8 && Math.abs(pad.x - r.pos.x) < 2.2) padNear = true;
  }
  if (padNear) jump = false;

  for (const sw of race.sweepers) {
    if (!sw.full) continue;
    const dzs = sw.z - r.pos.z;
    if (r.grounded && dzs > 0.6 && dzs < 2.8) jump = true;
  }

  let grab = false;
  if (!heldCrown && race.rand() < 0.45 * dt) {
    for (const o of race.racers) {
      if (o !== r && !o.seated && Math.hypot(o.pos.x - r.pos.x, o.pos.z - r.pos.z) < 1.6) grab = true;
    }
  }
  let dive = false;
  const flat = Math.abs((ty || r.pos.y) - r.pos.y) < 0.45;
  if (!heldCrown && r.grounded && flat && dz > 0.55 && r.diveCd <= 0 && race.rand() < 0.22 * dt * (p.skill || 0.5)) dive = true;
  return { x: dx, z: dz, jump, dive, grab };
}

function separate(race) {
  const cfg = race.cfg;
  const list = race.racers;
  const min = cfg.bodyRadius * 1.7;
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.seated || a.eliminated || a.qualified) continue;
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j];
      if (b.seated || b.eliminated || b.qualified) continue;
      let dx = b.pos.x - a.pos.x;
      let dz = b.pos.z - a.pos.z;
      const dy = Math.abs(a.pos.y - b.pos.y);
      if (dy > 1.3) continue;
      let d = Math.hypot(dx, dz);
      if (d < 0.0008) {
        dx = (i % 2 ? 1 : -1);
        dz = 0.35;
        d = Math.hypot(dx, dz);
      }
      if (d >= min) continue;
      if (race.kind === "crown" && race.crown) {
        const c = race.crown;
        const aIn = (a.pos.x - c.x) ** 2 + (a.pos.z - c.z) ** 2 <= c.r * c.r;
        const bIn = (b.pos.x - c.x) ** 2 + (b.pos.z - c.z) ** 2 <= c.r * c.r;
        if (aIn && bIn) continue;
      }
      const nx = dx / d;
      const nz = dz / d;
      const push = (min - d) * 0.35;
      const player = a.isPlayer ? a : b.isPlayer ? b : null;
      if (player) {
        const other = player === a ? b : a;
        const side = player === a ? 1 : -1;
        const driving = Math.hypot(player.vel.x, player.vel.z) > 1.2;
        other.pos.x += nx * side * push;
        other.pos.z += nz * side * push;
        if (driving) {
          player.pos.x -= nx * side * push * 0.08;
          player.pos.z -= nz * side * push * 0.08;
        }
        const slip = -nz * side;
        const slipZ = nx * side;
        other.vel.x += slip * 0.7;
        other.vel.z += slipZ * 0.7;
        continue;
      }
      if (a.invuln <= 0) {
        a.pos.x -= nx * push;
        a.pos.z -= nz * push;
      }
      if (b.invuln <= 0) {
        b.pos.x += nx * push;
        b.pos.z += nz * push;
      }
      const rel = (a.vel.x - b.vel.x) * nx + (a.vel.z - b.vel.z) * nz;
      if (rel > 6 && a.bumpCd <= 0 && b.bumpCd <= 0 && a.invuln <= 0 && b.invuln <= 0) {
        a.vel.x -= nx * cfg.bumpPush * 0.45;
        a.vel.z -= nz * cfg.bumpPush * 0.45;
        b.vel.x += nx * cfg.bumpPush * 0.45;
        b.vel.z += nz * cfg.bumpPush * 0.45;
        a.bumpCd = cfg.bumpCooldown;
        b.bumpCd = cfg.bumpCooldown;
        const who = a.isPlayer ? a.id : b.isPlayer ? b.id : a.id;
        race.events.push({ t: "bump", id: who });
      }
    }
  }
}

const TELEGRAPH = 0.55;

function armHazard(race, r, hazard) {
  if (hazard.armedAt == null) hazard.armedAt = race.time;
  const age = race.time - hazard.armedAt;
  hazard.glow = Math.max(hazard.glow || 0, Math.min(1, age / TELEGRAPH));
  if (r.isPlayer && (race.player.warnT == null || hazard.armedAt < race.player.warnT)) race.player.warnT = hazard.armedAt;
  return age >= TELEGRAPH;
}

function hazardShown(race, kind) {
  const planetN = race.planetN || 1;
  if (kind === "bumper" || kind === "sweeper") return planetN === 1;
  return true;
}

function hazards(race, dt) {
  const cfg = race.cfg;
  for (const s of race.spinners) s.angle += s.spin * dt;

  for (const b of race.course.bumpers) {
    if (!hazardShown(race, "bumper")) {
      b.glow = 0;
      b.armedAt = null;
      continue;
    }
    b.glow = 0;
    let crowded = false;
    for (const r of race.racers) {
      if (r.seated || r.eliminated) continue;
      const dx = r.pos.x - b.x;
      const dz = r.pos.z - b.z;
      if (Math.hypot(dx, dz) < cfg.bumperRadius + 4.2 && Math.abs(r.pos.y - b.y) < 2.2) crowded = true;
    }
    if (!crowded) b.armedAt = null;
    for (const r of race.racers) {
      if (r.seated || r.bumpCd > 0 || r.invuln > 0) continue;
      const dx = r.pos.x - b.x;
      const dz = r.pos.z - b.z;
      const d = Math.hypot(dx, dz);
      if (d < cfg.bumperRadius + 4.2 && Math.abs(r.pos.y - b.y) < 2.2) armHazard(race, r, b);
      if (d < cfg.bumperRadius + 0.2 && Math.abs(r.pos.y - b.y) < 1.4 && (b.armedAt == null || race.time - b.armedAt >= TELEGRAPH)) {
        const nx = d > 0.05 ? dx / d : 1;
        const nz = d > 0.05 ? dz / d : 0;
        r.vel.x = nx * cfg.bumperPush;
        r.vel.z = nz * cfg.bumperPush;
        r.vel.y = Math.max(r.vel.y, cfg.bumperUp);
        r.grounded = false;
        r.ungroundT = 0.08;
        r.flail = 0.4;
        r.bumpCd = cfg.bumperCooldown;
        r.controlLock = Math.max(r.controlLock, 0.12);
        race.events.push({ t: "bump", id: r.id, big: true, obstacle: true });
        if (r.isPlayer) race.shake = Math.max(race.shake, 0.28);
      }
    }
  }

  for (const s of race.spinners) {
    s.glow = 0;
    let close = false;
    for (const r of race.racers) {
      if (r.seated || r.eliminated) continue;
      if (Math.hypot(r.pos.x - s.x, r.pos.z - s.z) < (s.len || cfg.spinnerLength) + 2.4 && Math.abs(r.pos.y - s.y) < 2.2) {
        close = true;
        armHazard(race, r, s);
      }
    }
    if (!close) s.armedAt = null;
    const c = Math.cos(s.angle);
    const sn = Math.sin(s.angle);
    const arm = s.len || cfg.spinnerLength;
    const hx = c * arm;
    const hz = sn * arm;
    const ax = s.x - hx;
    const az = s.z - hz;
    const bx = s.x + hx;
    const bz = s.z + hz;
    const sx = bx - ax;
    const sz = bz - az;
    const sl = sx * sx + sz * sz || 1;
    for (const r of race.racers) {
      if (r.seated || r.spinCd > 0 || r.invuln > 0 || r.sliding > 0) continue;
      const feet = r.pos.y - s.y;
      if (feet < cfg.spinnerMinY || feet > cfg.spinnerMaxY) continue;
      let t = ((r.pos.x - ax) * sx + (r.pos.z - az) * sz) / sl;
      t = clamp(t, 0, 1);
      const px = ax + sx * t;
      const pz = az + sz * t;
      const dx = r.pos.x - px;
      const dz = r.pos.z - pz;
      if (dx * dx + dz * dz > cfg.spinnerHit * cfg.spinnerHit) continue;
      if (s.armedAt == null || race.time - s.armedAt < TELEGRAPH) {
        armHazard(race, r, s);
        continue;
      }
      const tx = -sn;
      const tz = c;
      const side = Math.sign((r.pos.x - s.x) * tx + (r.pos.z - s.z) * tz) || 1;
      knock(race, r, tx * side * cfg.spinnerPush, tz * side * cfg.spinnerPush, cfg.spinnerUp);
      r.spinCd = cfg.spinnerCooldown;
    }
  }

  for (const pad of race.course.pads) {
    for (const r of race.racers) {
      if (r.seated || r.padCd > 0) continue;
      const dx = r.pos.x - pad.x;
      const dz = r.pos.z - pad.z;
      if (dx * dx + dz * dz > cfg.padRadius * cfg.padRadius) continue;
      const dy = r.pos.y - pad.y;
      if (dy > 1.35 || dy < -3.4) continue;
      const face = pad.face != null ? pad.face : hypot(r.vel.x, r.vel.z) > 0.4 ? Math.atan2(r.vel.x, r.vel.z) : 0;
      r.vel.y = cfg.padUp;
      r.vel.x = Math.sin(face) * cfg.padForward;
      r.vel.z = Math.cos(face) * cfg.padForward;
      r.grounded = false;
      r.platformId = null;
      r.ungroundT = 0.12;
      r.padCd = cfg.padCooldown;
      r.boost = 1.15;
      r.canGlide = 2.4;
      r.glided = false;
      pad.pulse = 0.28;
      race.events.push({ t: "jump", id: r.id, pad: true });
    }
  }

  for (const g of race.geysers) {
    g.t += dt;
    const cycle = g.t % g.period;
    g.warn = cycle > g.period - 0.7 && cycle < g.period - 0.18;
    g.hot = cycle >= g.period - 0.18 || cycle < 0.28;
    if (g.hot && !g.wasHot) {
      for (const r of race.racers) {
        if (r.seated) continue;
        const d = Math.hypot(r.pos.x - g.x, r.pos.z - g.z);
        if (d < g.radius + 0.3 && Math.abs(r.pos.y - g.y) < 1.3) {
          r.vel.y = Math.max(r.vel.y, 13);
          r.grounded = false;
          r.ungroundT = 0.1;
          r.flail = 0.3;
          race.events.push({ t: "geyser", id: r.id });
          if (r.isPlayer) race.shake = Math.max(race.shake, 0.2);
        }
      }
    }
    g.wasHot = g.hot;
  }

  for (const sw of race.sweepers) {
    if (!hazardShown(race, "sweeper")) {
      sw.glow = 0;
      sw.armedAt = null;
      continue;
    }
    const nextX = sw.originX + Math.sin(race.time * sw.speed + sw.z) * sw.amp;
    let threaten = false;
    for (const r of race.racers) {
      if (r.seated || r.eliminated) continue;
      if (Math.abs(r.pos.z - sw.z) < 3.2 && Math.abs(r.pos.x - nextX) < sw.amp + 2) threaten = true;
    }
    if (threaten) {
      if (sw.armedAt == null) sw.armedAt = race.time;
      sw.glow = Math.min(1, (race.time - sw.armedAt) / TELEGRAPH);
      if (race.time - sw.armedAt < TELEGRAPH) {
        if (race.player && Math.abs(race.player.pos.z - sw.z) < 3.2) {
          if (race.player.warnT == null || sw.armedAt < race.player.warnT) race.player.warnT = sw.armedAt;
        }
      } else sw.x = nextX;
    } else {
      sw.armedAt = null;
      sw.glow = 0;
      sw.x = nextX;
    }
    for (const r of race.racers) {
      if (r.seated || r.invuln > 0 || r.knockCd > 0) continue;
      if (sw.armedAt != null && race.time - sw.armedAt < TELEGRAPH) continue;
      if (Math.abs(r.pos.z - sw.z) > 1.7) continue;
      if (Math.abs(r.pos.x - sw.x) > sw.radius + 0.85) continue;
      const feet = r.pos.y - (sw.y - sw.height);
      const top = r.sliding > 0 ? cfg.slideHeight : 1.35;
      if (feet > top || r.pos.y + 0.2 < sw.y - 0.35) continue;
      if (r.sliding > 0 && sw.height > 0.8) continue;
      const dir = Math.cos(race.time * sw.speed + sw.z) >= 0 ? 1 : -1;
      knock(race, r, dir * 8, 3.5, 3.2);
    }
  }

  for (const pdl of race.pendulums) {
    const cycle = (race.time * pdl.speed + pdl.phase) % (Math.PI * 2);
    const hold = 0.72;
    let swingN;
    if (cycle < hold) swingN = 1;
    else swingN = Math.cos(((cycle - hold) / (Math.PI * 2 - hold)) * Math.PI * 2);
    const ang = swingN * pdl.amp;
    pdl.bobX = pdl.x + Math.sin(ang) * pdl.len;
    pdl.bobY = pdl.y - Math.cos(ang) * pdl.len;
    pdl.bobZ = pdl.z;
    const swing = Math.cos(race.time * pdl.speed + pdl.phase);
    for (const r of race.racers) {
      if (r.seated || r.invuln > 0) continue;
      const d = Math.hypot(r.pos.x - pdl.bobX, r.pos.z - pdl.bobZ);
      if (d < pdl.radius + 2.4 && Math.abs(r.pos.y + 0.7 - pdl.bobY) < 2.2) armHazard(race, r, pdl);
      else if (pdl.armedAt != null && d > pdl.radius + 3) pdl.armedAt = null;
      if (d < pdl.radius + 0.35 && Math.abs(r.pos.y + 0.7 - pdl.bobY) < 1) {
        if (pdl.armedAt == null || race.time - pdl.armedAt < TELEGRAPH) continue;
        knock(race, r, swing * 9, 2, 3);
      }
    }
  }
}

function enemies(race, dt) {
  for (const roller of race.rollers) {
    roller.x += roller.dir * roller.speed * dt;
    roller.rot += dt * 2.4;
    if (roller.x > roller.x1) roller.dir = -1;
    if (roller.x < roller.x0) roller.dir = 1;
    for (const r of race.racers) {
      if (r.seated) continue;
      const d = Math.hypot(r.pos.x - roller.x, r.pos.z - roller.z);
      if (d < roller.radius + 3.2 && Math.abs(r.pos.y - roller.y) < 2) armHazard(race, r, roller);
      if (d < roller.radius + 0.35 && Math.abs(r.pos.y - roller.y) < 1.4) {
        if (roller.armedAt == null || race.time - roller.armedAt < TELEGRAPH) continue;
        const nx = d > 0.05 ? (r.pos.x - roller.x) / d : roller.dir;
        knock(race, r, nx * 10 + roller.dir * 4, 2, 4.5);
      }
    }
  }

  for (const h of race.hoppers) {
    h.t += dt;
    if (!h.hopping && h.t > h.period) {
      if (h.armedAt == null) h.armedAt = race.time;
      h.glow = Math.min(1, (race.time - h.armedAt) / TELEGRAPH);
      if (race.player && race.player.warnT == null) race.player.warnT = h.armedAt;
      if (race.time - h.armedAt < TELEGRAPH) {
        h.glow = (race.time - h.armedAt) / TELEGRAPH;
      } else {
      h.t = 0;
      h.hopping = true;
      h.armedAt = race.time - TELEGRAPH;
      h.vy = 8;
      let tx = h.homeX + Math.sin(race.time) * 2.5;
      let tz = h.homeZ;
      let best = 12;
      for (const r of race.racers) {
        if (r.seated) continue;
        const d = Math.hypot(r.pos.x - h.x, r.pos.z - h.z);
        if (d < best) {
          best = d;
          tx = r.pos.x;
          tz = r.pos.z;
        }
      }
      const dx = tx - h.x;
      const dz = tz - h.z;
      const mag = Math.hypot(dx, dz) || 1;
      h.dirx = dx / mag;
      h.dirz = dz / mag;
      }
    }
    if (h.hopping) {
      h.vy -= 18 * dt;
      h.y += h.vy * dt;
      h.x += h.dirx * 4.2 * dt;
      h.z += h.dirz * 4.2 * dt;
      if (h.y <= h.homeY) {
        h.y = h.homeY;
        h.hopping = false;
        for (const r of race.racers) {
          if (r.seated) continue;
          const d = Math.hypot(r.pos.x - h.x, r.pos.z - h.z);
          if (d < h.radius + 2.8) armHazard(race, r, h);
          if (d < h.radius + 0.55 && Math.abs(r.pos.y - h.y) < 1.3) {
            if (h.armedAt == null || race.time - h.armedAt < TELEGRAPH) continue;
            const nx = d > 0.05 ? (r.pos.x - h.x) / d : 1;
            knock(race, r, nx * 9, 3, 5);
          }
        }
      }
    }
  }

  for (const f of race.flyers) {
    f.ang += dt * 0.85;
    f.x = f.cx + Math.sin(f.ang) * f.span;
    f.z = f.cz + Math.cos(f.ang) * f.span * 0.45;
    f.y = f.cy + Math.sin(f.ang * 2) * 0.7;
    for (const r of race.racers) {
      if (r.seated) continue;
      const d = Math.hypot(r.pos.x - f.x, r.pos.z - f.z);
      if (d < f.radius + 0.4 && Math.abs(r.pos.y + 0.8 - f.y) < 1.1) {
        knock(race, r, Math.cos(f.ang) * 8, Math.sin(f.ang) * 6, 3.4);
      }
    }
  }
}

function movePlatforms(race, dt) {
  for (const p of race.platforms) {
    p.prevX = p.x;
    p.prevZ = p.z;
    p.phase += dt * p.speed;
    if (p.axis === "x") p.x = p.originX + Math.sin(p.phase) * p.amp;
    else if (p.axis === "bob" || p.axis === "tilt") p.y = p.originY + Math.sin(p.phase) * p.amp;
    else if (p.axis === "seesaw") {
      let torque = 0;
      let weight = 0;
      const face = p.face || 0;
      for (const r of race.racers) {
        if (r.seated || r.eliminated || !r.grounded) continue;
        const dx = r.pos.x - p.x;
        const dz = r.pos.z - p.z;
        if (dx * dx + dz * dz > p.radius * p.radius) continue;
        if (Math.abs(r.pos.y - p.originY) > 1.8) continue;
        const along = dx * Math.cos(face) + dz * Math.sin(face);
        torque += Math.max(-1, Math.min(1, along / (p.radius * 0.65)));
        weight++;
      }
      const target = weight ? (torque / weight) * 0.62 : 0;
      p.tilt = (p.tilt || 0) + (target - (p.tilt || 0)) * Math.min(1, dt * 3.2);
      p.tilt = Math.max(-0.5, Math.min(0.5, p.tilt));
      p.y = p.originY;
    }
  }
}

function updateCollapse(race, dt) {
  const cfg = race.cfg;
  if (race.time < cfg.collapseDelay) return;
  const stop = race.collapseStop != null ? race.collapseStop : race.course.ship.z - 18;
  const hurry = race.roundSeconds ? 1 : 1 + Math.min(2.4, (race.time || 0) / 45);
  race.collapseZ += race.collapseSpeed * hurry * dt;
  if (race.collapseZ > stop) race.collapseZ = stop;
  race.lavaY = cfg.lavaStartY + race.time * cfg.lavaRisePerSec;
  let cracked = false;
  for (const chunk of race.course.chunks) {
    if (chunk.zone === "ship" || chunk.gap) continue;
    if (chunk.state === "solid") {
      const passed = race.kind === "survival" ? race.collapseZ > chunk.z1 - 1 : race.collapseZ > chunk.z0;
      if (passed) {
        chunk.state = "cracking";
        chunk.crackT = (cfg.crackTime + chunk.jitter * 0.35) * (race.planetN === 3 ? 0.62 : 1);
        chunk.dirty = true;
        cracked = true;
      }
    } else if (chunk.state === "cracking") {
      chunk.crackT -= dt;
      chunk.dirty = true;
      if (chunk.crackT <= 0) {
        chunk.state = "falling";
        chunk.fallT = cfg.fallTime;
        const mid = (chunk.z0 + chunk.z1) * 0.5;
        const pz = race.player.pos.z - mid;
        if (pz * pz < 420) race.shake = Math.max(race.shake, 0.42);
      }
    } else if (chunk.state === "falling") {
      chunk.fallT -= dt;
      chunk.fallY -= (7 + chunk.jitter * 6) * hurry * dt;
      chunk.dirty = true;
      if (chunk.fallT <= 0) {
        chunk.state = "gone";
      }
    }
    if (chunk.ice) chunk.tilt = Math.sin(race.time * 1.35 + chunk.jitter * 8) * 0.22;
  }
  if (cracked) race.events.push({ t: "crack" });
}

function tryGrab(race, r) {
  let best = null;
  let bd = 2.1;
  for (const o of race.racers) {
    if (o === r || o.seated || o.eliminated || o.qualified) continue;
    const d = Math.hypot(o.pos.x - r.pos.x, o.pos.z - r.pos.z);
    if (d < bd && Math.abs(o.pos.y - r.pos.y) < 1.6) {
      bd = d;
      best = o;
    }
  }
  if (best) {
    let nearby = 0;
    for (const o of race.racers) {
      if (o !== r && Math.hypot(o.pos.x - r.pos.x, o.pos.z - r.pos.z) < 2.4) nearby++;
    }
    const crowd = nearby >= 4;
    best.vel.x *= crowd ? 0.85 : 0.35;
    best.vel.z *= crowd ? 0.85 : 0.35;
    if (!crowd && best.lockImmune <= 0 && !best.isPlayer) {
      best.controlLock = Math.min(0.6, Math.max(best.controlLock, 0.25));
      best.flail = Math.min(0.6, Math.max(best.flail, 0.3));
    }
    best.pos.x += (r.pos.x - best.pos.x) * 0.2;
    best.pos.z += (r.pos.z - best.pos.z) * 0.2;
    race.events.push({ t: "grab", id: r.id });
    return;
  }
  const ax = r.pos.x + Math.sin(r.yaw) * 1.2;
  const az = r.pos.z + Math.cos(r.yaw) * 1.2;
  const ahead = groundAt(race.course, ax, az);
  if (ahead && ahead.y > r.pos.y + 0.45 && ahead.y < r.pos.y + 1.9) {
    r.pos.x = ax;
    r.pos.z = az;
    r.pos.y = ahead.y;
    r.vel.y = 3.2;
    r.grounded = true;
    race.events.push({ t: "grab", id: r.id, ledge: true });
    return;
  }
  for (const c of race.crates || []) {
    if (Math.hypot(c.x - r.pos.x, c.z - r.pos.z) < 1.8 && Math.abs(c.y - r.pos.y) < 2) {
      c.x += Math.sin(r.yaw) * 1.1;
      c.z += Math.cos(r.yaw) * 1.1;
      c.vx += Math.sin(r.yaw) * 4;
      c.vz += Math.cos(r.yaw) * 4;
      race.events.push({ t: "grab", id: r.id, prop: true });
      return;
    }
  }
}

function shoveCrates(race) {
  for (const c of race.crates || []) {
    c.vx *= 0.9;
    c.vz *= 0.9;
    c.x += c.vx * 0.016;
    c.z += c.vz * 0.016;
    const g = groundAt(race.course, c.x, c.z);
    if (g) c.y = g.y + 0.45;
    for (const r of race.racers) {
      if (r.seated || r.eliminated) continue;
      const dx = c.x - r.pos.x;
      const dz = c.z - r.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 1.15 || d < 0.001 || Math.abs((c.y || 0) - r.pos.y) > 1.8) continue;
      const nx = dx / d;
      const nz = dz / d;
      c.vx += r.vel.x * 0.4 + nx * 1.5;
      c.vz += r.vel.z * 0.4 + nz * 1.5;
      c.x += nx * (1.15 - d);
      c.z += nz * (1.15 - d);
    }
  }
}

function hazardAhead(race, r) {
  let best = null;
  const groups = [race.course.bumpers, race.spinners, race.sweepers, race.pendulums, race.rollers, race.hoppers];
  for (let g = 0; g < groups.length; g++) {
    const list = groups[g];
    if (!list) continue;
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      const dz = (o.z || 0) - r.pos.z;
      if (dz < -1 || dz > 16) continue;
      const d = Math.hypot((o.x || 0) - r.pos.x, dz);
      if (best == null || d < best) best = d;
    }
  }
  return best;
}

function notePlayerHits(race, from) {
  if (!race.feel) return;
  for (let i = from; i < race.events.length; i++) {
    const e = race.events[i];
    if (e.t !== "bump" || e.id !== race.player.id || !e.obstacle) continue;
    race.player.hitAt = race.time;
    const age = race.player.warnT == null ? null : race.time - race.player.warnT;
    if (isUnfair(age)) {
      race.feel.unfair++;
      pushMark(race.feel, race.player.pos.x, race.player.pos.z, "unfair");
    }
  }
}

function eliminate(race) {
  race.phase = "results";
  race.result = "out";
  race.player.seated = false;
  race.events.push({ t: "eliminated" });
  if (race.feel) {
    race.feel.dies++;
    pushMark(race.feel, race.player.pos.x, race.player.pos.z, "die");
  }
}

function inFinishGate(race, r) {
  if (r.pos.y < -6) return false;
  const g = race.gate;
  if (!g) return false;
  const halfW = g.rx || 4.5;
  const halfD = g.rz || 1.4;
  if (Math.abs(r.pos.x - g.x) > halfW) return false;
  if (Math.abs(r.pos.y - (g.y == null ? 0 : g.y)) > 1.7) return false;
  const prev = r.prevZ == null ? r.pos.z : r.prevZ;
  const crossed = prev < g.z && r.pos.z >= g.z - 0.15;
  const inSlab = r.pos.z >= g.z - halfD && r.pos.z <= g.z + halfD && prev < g.z;
  return crossed || inSlab;
}

function finishRound(race) {
  race.phase = "results";
  race.result = race.player.qualified ? "qualified" : "out";
  if (!race.player.qualified) race.player.seated = false;
  race.events.push({ t: race.player.qualified ? "roundwin" : "eliminated" });
}

function checkSurvival(race) {
  if (race.kind !== "survival" || race.phase !== "race") return;
  for (const r of race.racers) {
    if (r.eliminated || r.qualified) continue;
    if (r.pos.z < race.collapseZ - 0.3) {
      r.eliminated = true;
      race.events.push({ t: "fall", id: r.id });
    }
  }
  const alive = race.racers.filter((r) => !r.eliminated && !r.qualified);
  if (alive.length > race.qualifyN) return;
  if (alive.length === 0) {
    finishRound(race);
    return;
  }
  for (const r of alive) {
    r.qualified = true;
    race.qualCount++;
    race.events.push({ t: "qualify", id: r.id });
  }
  finishRound(race);
}

function checkCrown(race, dt) {
  if (race.kind !== "crown" || race.phase !== "race" || !race.crown) return;
  const c = race.crown;
  let holder = null;
  let best = c.r * c.r;
  for (const r of race.racers) {
    if (r.eliminated || r.qualified) continue;
    const dx = r.pos.x - c.x;
    const dz = r.pos.z - c.z;
    const d = dx * dx + dz * dz;
    if (d <= best && Math.abs(r.pos.y - (c.y || 0)) < 3.2) {
      best = d;
      holder = r;
    }
  }
  race.crownHolder = holder ? holder.id : -1;
  const reach = c.r * c.r;
  for (const r of race.racers) {
    if (r.eliminated || r.qualified) continue;
    const inside = (r.pos.x - c.x) ** 2 + (r.pos.z - c.z) ** 2 <= reach && Math.abs(r.pos.y - (c.y || 0)) < 2.6;
    if (inside) {
      r.crownT = (r.crownT || 0) + dt;
      r.vel.x *= 0.55;
      r.vel.z *= 0.55;
    }
    else r.crownT = Math.max(0, (r.crownT || 0) - dt * 0.12);
    if ((r.crownT || 0) >= 5 && !r.qualified && !r.eliminated) {
      r.qualified = true;
      r.crownT = 0;
      race.qualCount++;
      race.events.push({ t: "qualify", id: r.id });
    }
  }
  if (race.qualifyN > 0 && race.qualCount >= race.qualifyN) finishRound(race);
}

function checkQualify(race) {
  if (race.shipRound || race.phase !== "race") return;
  if (race.kind === "survival" || race.kind === "crown") return;
  if (!race.gate && race.finishZ == null) return;
  for (const r of race.racers) {
    if (r.qualified || r.eliminated || r.seated) continue;
    if (!inFinishGate(race, r)) continue;
    r.qualified = true;
    race.qualCount++;
    race.events.push({ t: "qualify", id: r.id });
  }
  if (race.qualifyN > 0 && race.qualCount >= race.qualifyN) finishRound(race);
}

function board(race) {
  if (!race.shipRound || race.seatsFilled >= race.cfg.seats) return;
  const ship = race.course.ship;
  const cfg = race.cfg;
  const ready = [];
  for (const r of race.racers) {
    if (r.seated || r.eliminated || !r.grounded) continue;
    const dx = r.pos.x - ship.x;
    const dz = r.pos.z - ship.z;
    if (Math.abs(dx) < cfg.boardHalfX && dz < cfg.boardZMax && dz > cfg.boardZMin && Math.abs(r.pos.y - ship.y) < 1.8) {
      ready.push({ r, d: dx * dx + dz * dz });
    }
  }
  ready.sort((a, b) => a.d - b.d || (a.r.isPlayer ? -1 : 1) - (b.r.isPlayer ? -1 : 1));
  for (const item of ready) {
    if (race.seatsFilled >= cfg.seats) break;
    const r = item.r;
    const seat = race.seatsFilled;
    race.seats[seat] = r.id;
    race.seatsFilled++;
    r.seated = true;
    r.seatIndex = seat;
    r.vel.x = r.vel.y = r.vel.z = 0;
    r.emote = "cheer";
    if (r.isPlayer) race.seatCine = 1.85;
    race.events.push({ t: "seat", id: r.id, seat, pop: true });
    if (race.seatsFilled === cfg.seats - 1 && !race.lastSeatEvent) {
      race.lastSeatEvent = true;
      race.events.push({ t: "lastseat" });
    }
  }
}

function beginLaunch(race) {
  if (!race.player.seated) {
    eliminate(race);
    return;
  }
  race.phase = "launch";
  race.launchT = 0;
  race.launchV = 1.5;
  race.seatCine = 0;
  race.result = "escaped";
  race.events.push({ t: "launch" });
  race.events.push({ t: "escaped", time: race.time });
  race.shake = 0.65;
}

function noteProgress(race, r, dt) {
  if (!r.useAI || r.seated || r.eliminated || r.qualified) return;
  if (r.markZ == null) {
    r.markX = r.pos.x;
    r.markZ = r.pos.z;
    r.stallT = 0;
    return;
  }
  const moved = Math.hypot(r.pos.x - r.markX, r.pos.z - r.markZ);
  if (moved > 1.25 || r.pos.z > r.markZ + 0.9) {
    r.stallT = 0;
    r.stallTries = 0;
    r.markX = r.pos.x;
    r.markZ = r.pos.z;
    return;
  }
  r.stallT = (r.stallT || 0) + dt;
  if (r.stallT < 3) return;
  r.stallT = 0;
  r.routeId = ((r.routeId || 0) + 1) % 3;
  r.wp = 0;
  const wps = (race.course.routes && race.course.routes[r.routeId]) || race.course.waypoints;
  while (r.wp < wps.length - 1 && wps[r.wp].z < r.pos.z + 1) r.wp++;
  r.stallTries = (r.stallTries || 0) + 1;
  r.markX = r.pos.x;
  r.markZ = r.pos.z;
  if (r.stallTries >= 2) {
    r.stallTries = 0;
    doRespawn(race, r);
  }
}

export function step(race, dt, input) {
  const cfg = race.cfg;
  if (race.events.length > 80) race.events.splice(0, race.events.length - 80);

  if (race.phase === "countdown") {
    race.countClock += dt;
    const cue = race.countClock < 1 ? 3 : race.countClock < 2 ? 2 : race.countClock < 3 ? 1 : 0;
    if (cue !== race.countCue) {
      race.countCue = cue;
      race.events.push({ t: cue === 0 ? "go" : "tick", n: cue });
    }
    if (race.countClock >= cfg.countdownBeats + cfg.goHold) {
      race.phase = "race";
      race.activated = true;
      race.time = 0;
    }
    return;
  }

  if (race.phase === "race") {
    const ev0 = race.events.length;
    race.activated = true;
    race.time += dt;
    if (race.seatCine > 0) race.seatCine -= dt;
    movePlatforms(race, dt);
    updateCollapse(race, dt);
    for (const r of race.racers) {
      if (r.seated || r.eliminated) continue;
      try {
        const wish = r.isPlayer && !r.useAI ? (input || { x: 0, z: 0, jump: false, dive: false }) : botWish(race, r, dt);
        integrate(race, r, wish, dt);
        noteProgress(race, r, dt);
      } catch (err) {
        r.controlLock = 0;
        r.flail = 0;
        r.grabT = 0;
        if (!race.fault) {
          race.fault = (err && err.message) || String(err);
          race.events.push({ t: "error", message: race.fault });
        }
      }
    }
    separate(race);
    const coins = race.course.coins;
    if (coins) {
      const player = race.player;
      for (let i = 0; i < coins.length; i++) {
        const c = coins[i];
        if (c.got || player.seated) continue;
        const dx = player.pos.x - c.x;
        const dz = player.pos.z - c.z;
        if (dx * dx + dz * dz > 1.6) continue;
        if (Math.abs(player.pos.y + 0.8 - c.y) > 1.5) continue;
        c.got = true;
        race.coins++;
        race.events.push({ t: "coin", n: race.coins });
      }
    }
    hazards(race, dt);
    enemies(race, dt);
    board(race);
    shoveCrates(race);
    if (race.kind === "survival" && race.phase === "race") {
      const gust = Math.sin(race.time * 0.7) * 6;
      for (const r of race.racers) {
        if (!r.eliminated && !r.seated) r.vel.x += gust * dt;
      }
    }
    checkQualify(race);
    checkSurvival(race);
    checkCrown(race, dt);
    notePlayerHits(race, ev0);
    const playerZone = zoneAt(race, race.player.pos.z);
    if (playerZone && playerZone !== race.zoneId) {
      race.zoneId = playerZone;
      const zone = race.course.zones.find((z) => z.id === playerZone);
      if (zone) race.events.push({ t: "zone", name: zone.name });
    }
    if (race.phase === "race" && race.shipRound && race.forceLaunch && race.player.seated) {
      beginLaunch(race);
    } else if (race.phase === "race" && race.shipRound && (race.seatsFilled >= cfg.seats || race.time >= (race.roundSeconds || cfg.raceSeconds))) {
      if (race.player.seated) beginLaunch(race);
      else eliminate(race);
    } else if (race.phase === "race" && !race.shipRound && race.time >= (race.roundSeconds || cfg.raceSeconds)) {
      race.phase = "results";
      race.result = race.player.qualified ? "qualified" : "out";
      if (!race.player.qualified) race.player.seated = false;
      race.events.push({ t: race.player.qualified ? "roundwin" : "eliminated" });
    }
    if (race.shake > 0) race.shake = Math.max(0, race.shake - dt * 1.5);
    return;
  }

  if (race.phase === "launch" || (race.phase === "results" && race.result === "escaped")) {
    race.launchT += dt;
    race.launchV += 4.5 * dt;
    race.launchY += race.launchV * dt;
    race.shipY = race.course.ship.y + race.launchY;
    if (race.player.emote === "wave") {
      race.player.waveT = (race.player.waveT || 0) + dt;
      if (race.player.waveT > 0.7 && race.player.waveT < 2.2) race.player.emote = "cheer";
      if (race.player.waveT >= 2.2) race.player.emote = "idle";
    }
    const launchHold = race.holdLaunch > 0 ? race.holdLaunch : 1.25;
    if (race.phase === "launch" && race.launchT > launchHold) race.phase = "results";
    if (race.shake > 0) race.shake = Math.max(0, race.shake - dt * 0.7);
  }
}

function zoneAt(race, z) {
  let id = race.course.zones[0].id;
  for (const zone of race.course.zones) {
    if (z >= zone.z0) id = zone.id;
  }
  return id;
}
