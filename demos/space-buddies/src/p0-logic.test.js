import { createCourse, groundAt, courseScale, solidStart } from "./course.js";
import { resolveConfig } from "./config.js";
import { createRace, step } from "./sim.js";
import { cameraWish, yawFromCamera } from "./steer.js";

const cfg = resolveConfig({ seed: 4 });
const course = createCourse(cfg);
const dt = 1 / 60;
const idle = { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false };

function assert(cond, message) {
  if (!cond) {
    console.error("FAIL", message);
    process.exitCode = 1;
    throw new Error(message);
  }
}

function raceAt(x, y, z) {
  const race = createRace(course, cfg, 4);
  race.phase = "race";
  race.planetN = 1;
  race.player.useAI = false;
  race.player.pos.x = x;
  race.player.pos.y = y;
  race.player.pos.z = z;
  race.player.prevX = x;
  race.player.prevY = y;
  race.player.prevZ = z;
  race.player.vel.x = 0;
  race.player.vel.y = 0;
  race.player.vel.z = 0;
  race.player.grounded = true;
  race.player.invuln = 0;
  race.player.rescue = 0;
  return race;
}

for (const yaw of [0, Math.PI / 2, Math.PI, -Math.PI / 3]) {
  const px = 2;
  const pz = 10;
  const camX = px + Math.sin(yaw) * 8;
  const camZ = pz - Math.cos(yaw) * 8;
  const live = yawFromCamera(camX, camZ, px, pz);
  const wish = cameraWish(live, 0, 1);
  const awayX = px - camX;
  const awayZ = pz - camZ;
  const dot = wish.x * awayX + wish.z * awayZ;
  const mag = Math.hypot(wish.x, wish.z) * Math.hypot(awayX, awayZ);
  assert(dot / mag > 0.7, "stick forward was not away from the camera at yaw " + yaw.toFixed(2));
}

const floors = [];
const seen = new Set();
for (const pad of course.floors) {
  const key = (pad.zone || "pad") + (course.chunks[pad.chunk] && course.chunks[pad.chunk].fragile ? "-crumble" : "");
  if (seen.has(key)) continue;
  const g = groundAt(course, pad.x, pad.z);
  if (!g) continue;
  seen.add(key);
  floors.push([key, g]);
}
const ferry = course.platforms[0];
floors.push(["platform", { x: ferry.x, y: ferry.y, z: ferry.z, platform: true }]);
let landed = 0;
for (const [name, g] of floors) {
  const race = raceAt(g.x, g.y + 6, g.z);
  race.player.grounded = false;
  race.player.vel.y = -cfg.maxFallSpeed;
  step(race, 1 / 30, idle);
  const supported = race.player.grounded || race.player.pos.y > g.y - 0.4;
  assert(supported && race.player.pos.y > g.y - 1, name + " tunneled, y " + race.player.pos.y.toFixed(2));
  landed++;
}

let hazards = 0;
function hit(label, setup, pred) {
  const race = setup();
  for (let i = 0; i < 50 && !pred(race); i++) step(race, dt, idle);
  assert(pred(race), label + " did not hit, launch, or crumble");
  hazards++;
  console.log("hazard", label, "ok");
}

const bumper = course.bumpers[0];
hit("bumper", () => raceAt(bumper.x, bumper.y, bumper.z), (race) => race.player.flail > 0.1 || Math.hypot(race.player.vel.x, race.player.vel.z) > 4);

const sweeper = course.sweepers[0];
hit("sweeper", () => {
  const race = raceAt(sweeper.originX, sweeper.y, sweeper.z);
  const bar = race.sweepers[0];
  bar.originX = sweeper.originX;
  bar.amp = 0;
  bar.x = sweeper.originX;
  bar.armedAt = -1;
  return race;
}, (race) => race.player.flail > 0.1 || Math.hypot(race.player.vel.x, race.player.vel.z) > 4);

const pend = course.pendulums[0];
hit("pendulum", () => {
  const race = raceAt(pend.x, pend.y - pend.len + 0.2, pend.z);
  const bob = race.pendulums[0];
  bob.phase = Math.PI;
  bob.armedAt = -1;
  race.time = 0;
  step(race, dt, idle);
  race.player.pos.x = bob.bobX;
  race.player.pos.y = bob.bobY - 0.4;
  race.player.pos.z = bob.bobZ;
  race.player.vel.y = 0;
  race.player.grounded = false;
  bob.armedAt = -1;
  return race;
}, (race) => race.player.flail > 0.1 || Math.abs(race.player.vel.x) > 2 || race.player.vel.y > 1);

const pad = course.pads[0];
hit("jump-pad", () => raceAt(pad.x, pad.y, pad.z), (race) => race.player.vel.y > 8);

const roller = course.rollers[0];
hit("roller", () => {
  const race = raceAt(roller.x, roller.y, roller.z);
  race.rollers[0].armedAt = -1;
  race.rollers[0].x = roller.x;
  return race;
}, (race) => race.player.flail > 0.1 || Math.hypot(race.player.vel.x, race.player.vel.z) > 4);

let crumble = null;
for (const floor of course.floors) {
  const chunk = course.chunks[floor.chunk];
  if (!chunk || !chunk.fragile) continue;
  const g = groundAt(course, floor.x, floor.z);
  if (g && g.fragile && Math.abs(g.y - floor.y) < 0.05) {
    crumble = floor;
    break;
  }
}
assert(crumble, "no crumble tile");
hit("crumble", () => raceAt(crumble.x, crumble.y, crumble.z), (race) => {
  const chunk = race.course.chunks[crumble.chunk];
  return chunk.state === "cracking" || chunk.state === "falling" || chunk.stepped;
});

let respawns = 0;
for (const cp of course.checkpoints) {
  const g = groundAt(course, cp.x, cp.z);
  assert(g, "checkpoint " + cp.name + " is not on a floor");
  const race = raceAt(cp.x, cp.y + 8, cp.z);
  race.player.grounded = false;
  race.player.vel.y = -cfg.maxFallSpeed;
  race.player.firmSafe = { x: cp.x, y: cp.y, z: cp.z };
  let grounded = false;
  for (let i = 0; i < 60; i++) {
    step(race, dt, idle);
    if (race.player.grounded && race.player.pos.y > -2) {
      grounded = true;
      break;
    }
  }
  assert(grounded, "checkpoint " + cp.name + " did not ground the player within 1s");
  respawns++;
}

const gate = raceAt(0, 0, 40);
gate.kind = "gate";
gate.qualifyN = 12;
gate.gate = { x: 0, z: 400, rx: 6, rz: 2, y: 0 };
gate.finishZ = 400;
gate.roundSeconds = 4;
gate.player.pos.z = 40;
for (let i = 0; i < 5 * 60; i++) {
  gate.player.pos.x = 0;
  gate.player.pos.z = 40;
  gate.player.vel.x = 0;
  gate.player.vel.z = 0;
  step(gate, dt, idle);
}
assert(gate.player.qualified === false, "a still player was qualified");
assert(gate.result !== "qualified" && gate.result !== "escaped", "a still player was shown as a success");

const pads = course.floors.filter((p) => course.chunks[p.chunk] && !course.chunks[p.chunk].fragile);
const shipPad = { x: 0, y: course.ship.y, z: course.ship.z - 4, rx: 5 };
const nodes = pads.concat([shipPad]);
const meadow = pads.find((p) => p.rx > 20 && p.zone === "meadow");
const prev = new Map([[meadow, null]]);
const queue = [meadow];
while (queue.length) {
  const n = queue.shift();
  if (n === shipPad) break;
  for (const m of nodes) {
    if (prev.has(m)) continue;
    const d = Math.hypot(m.x - n.x, m.z - n.z);
    if (d <= (n.rx || 2) + (m.rx || 2) + 3.2 && m.y - n.y < 2.8 && m.z >= n.z - 4) {
      prev.set(m, n);
      queue.push(m);
    }
  }
}
assert(prev.has(shipPad), "the normal course has no connected path to the ship");
const path = [];
for (let n = shipPad; n; n = prev.get(n)) path.push(n);
path.reverse();
const route = raceAt(0, 0, solidStart(course, 22 * courseScale(false), 3.6));
route.qualifyN = 99;
route.roundSeconds = 240;
route.collapseZ = -80;
route.collapseSpeed = 0;
route.cfg.collapseDelay = 999;
route.racers.forEach((r, i) => { r.eliminated = i !== 0; r.useAI = false; });
const home = groundAt(course, 0, route.player.pos.z);
route.player.pos.y = home.y;
route.player.grounded = true;
let pathI = 0;
let arrived = false;
for (let i = 0; i < 240 * 60; i++) {
  const p = route.player;
  while (pathI < path.length - 1 && p.pos.z > path[pathI].z - 1 && Math.hypot(p.pos.x - path[pathI].x, p.pos.z - path[pathI].z) < (path[pathI].rx || 3)) pathI++;
  const target = path[Math.min(pathI, path.length - 1)];
  const dx = target.x - p.pos.x;
  const dz = target.z - p.pos.z;
  const mag = Math.hypot(dx, dz) || 1;
  let gateDive = false;
  for (const sw of route.sweepers || []) {
    if (!sw.gateBar) continue;
    const dzb = sw.z - p.pos.z;
    if (dzb > 0.8 && dzb < 6) gateDive = true;
  }
  let diveGap = false;
  for (const h of route.course.holes || []) {
    if (!h.dive) continue;
    const dzh = h.z - p.pos.z;
    if (dzh > 0.4 && dzh < 8) diveGap = true;
  }
  const shelf = groundAt(route.course, p.pos.x, p.pos.z + 1.15);
  const grab = !!(shelf && shelf.y > p.pos.y + 1.35 && shelf.y < p.pos.y + 2.15);
  step(route, dt, {
    x: dx / mag,
    z: Math.max(0.15, dz) / mag,
    jump: diveGap || (!gateDive && p.grounded && target.y > p.pos.y + 0.55 && mag < 8),
    dive: gateDive || diveGap,
    grab,
    holdJump: false,
  });
  if (Math.hypot(p.pos.x - course.ship.x, p.pos.z - course.ship.z) < 6) {
    arrived = true;
    break;
  }
}
assert(arrived, "a scripted run did not reach the ship");

const heat = raceAt(0, 1, 400);
heat.kind = "gate";
heat.qualifyN = 8;
heat.gate = { x: 0, z: 20, rx: 30, rz: 4, y: 1 };
heat.finishZ = 20;
heat.player.pos.z = 0;
heat.player.qualified = false;
for (const r of heat.racers) {
  if (r.isPlayer) continue;
  r.pos.z = 19.2;
  r.pos.y = 1;
  r.vel.z = 80;
  r.grounded = true;
  r.rescue = 0;
  r.invuln = 0;
}
step(heat, dt, idle);
assert(heat.qualCount === 8, "a full heat qualified " + heat.qualCount);
assert(heat.phase === "results", "a full heat kept running");
assert(heat.player.qualified === false, "a player behind the pack was qualified after the heat closed");

console.log("p0 logic ok", "floors", landed, "hazards", hazards, "respawns", respawns, "path", path.length);
