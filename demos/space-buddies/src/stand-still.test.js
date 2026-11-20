import { resolveConfig } from "./config.js";
import { createCourse } from "./course.js";
import { createRace, step } from "./sim.js";

const cfg = resolveConfig({ quick: true, seed: 2 });
const course = createCourse(cfg);
const dt = 1 / 60;
const idle = { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false };

function fresh() {
  const race = createRace(course, cfg, 2);
  race.player.useAI = false;
  return race;
}

function playUntilEnd(race, wish, capSteps) {
  let steps = 0;
  const max = capSteps || (cfg.raceSeconds + 8) * 60;
  while ((race.phase === "countdown" || race.phase === "race" || race.phase === "launch") && steps < max) {
    step(race, dt, wish || idle);
    if (race.events.length > 40) race.events.length = 0;
    steps++;
  }
  return steps;
}

function assert(cond, message) {
  if (!cond) {
    console.error("FAIL", message);
    process.exitCode = 1;
    throw new Error(message);
  }
}

function standStill(label, setup) {
  const race = fresh();
  setup(race);
  playUntilEnd(race);
  console.log(label, race.result, "seated", race.player.seated, "qual", race.player.qualified, "z", race.player.pos.z.toFixed(1));
  assert(race.result !== "escaped", label + " marked the standing player escaped");
  assert(race.result === "out", label + " result was " + race.result + ", expected eliminated");
  assert(race.player.seated === false, label + " seated the standing player");
  assert(race.player.qualified === false, label + " qualified the standing player");
}

standStill("qualify-idle", (race) => {
  race.shipRound = false;
  race.finishZ = 148;
  race.qualifyN = 12;
  race.gate = { x: 0, z: 148, rx: 12, rz: 8, y: 0.25 };
});

standStill("ship-idle", (race) => {
  race.shipRound = true;
  race.finishZ = null;
  race.qualifyN = 0;
});

const finisher = fresh();
finisher.shipRound = false;
finisher.finishZ = 400;
finisher.qualifyN = 12;
finisher.phase = "race";
finisher.qualCount = 11;
finisher.player.pos.z = 401;
finisher.player.pos.y = 1;
finisher.player.grounded = true;
step(finisher, dt, idle);
console.log("finish-cross", finisher.result, "qual", finisher.player.qualified);
assert(finisher.player.qualified === true, "crossing the finish did not qualify the player");
assert(finisher.result === "qualified", "crossing the finish with a full quota should qualify, got " + finisher.result);
assert(finisher.result !== "escaped", "a finish line must not count as an escape");

const boarder = fresh();
const ship = course.ship;
boarder.shipRound = true;
boarder.finishZ = null;
boarder.phase = "race";
boarder.time = cfg.raceSeconds - dt;
boarder.player.pos.x = ship.x;
boarder.player.pos.y = ship.y;
boarder.player.pos.z = ship.z + (cfg.boardZMin + cfg.boardZMax) / 2;
boarder.player.grounded = true;
step(boarder, dt, idle);
console.log("seat-cross", boarder.result, "seated", boarder.player.seated, "seat", boarder.player.seatIndex);
assert(boarder.player.seated === true, "standing in the seat trigger did not board");
assert(boarder.result === "escaped", "boarding the ship should escape, got " + boarder.result);

const missed = fresh();
missed.shipRound = true;
missed.finishZ = null;
missed.phase = "race";
missed.time = cfg.raceSeconds - dt;
missed.player.pos.x = ship.x;
missed.player.pos.y = ship.y;
missed.player.pos.z = ship.z + 3;
missed.player.grounded = true;
step(missed, dt, idle);
console.log("seat-miss", missed.result, "seated", missed.player.seated);
assert(missed.player.seated === false, "a miss beside the ship seated the player");
assert(missed.result === "out", "missing the seat trigger should eliminate, got " + missed.result);

const touchForward = { x: 0, z: 1, jump: false, dive: false, grab: false, holdJump: false };
const fullCfg = resolveConfig({ seed: 2 });
const fullCourse = createCourse(fullCfg);

function clumpOnCanyonRamp() {
  const race = createRace(fullCourse, fullCfg, 2);
  race.player.useAI = false;
  race.phase = "race";
  race.time = 0;
  race.shipRound = false;
  race.finishZ = 148;
  race.qualifyN = 12;
  race.qualCount = 0;
  race.gate = { x: 0, z: 148, rx: 12, rz: 8, y: 0.25 };
  race.racers.forEach((r, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    r.qualified = false;
    r.eliminated = false;
    r.seated = false;
    r.useAI = !r.isPlayer;
    r.controlLock = 0;
    r.flail = 0;
    r.grabT = 0;
    r.pos.x = 8 + (col - 1.5) * 0.55;
    r.pos.z = 97 + row * 0.55;
    r.pos.y = 0.9;
    r.vel.x = r.vel.y = r.vel.z = 0;
    r.grounded = true;
    r.lastSafe = { x: r.pos.x, y: 0.9, z: r.pos.z };
  });
  return race;
}

const canyonStuck = clumpOnCanyonRamp();
canyonStuck.racers.forEach((r) => { r.useAI = false; });
const beforeZ = canyonStuck.player.pos.z;
for (let i = 0; i < 8 * 60; i++) step(canyonStuck, dt, idle);
console.log("canyon-stuck", canyonStuck.result, "qual", canyonStuck.player.qualified, "z", canyonStuck.player.pos.z.toFixed(1));
assert(canyonStuck.player.qualified === false, "a player jammed on the canyon ramp was marked qualified");
assert(canyonStuck.result !== "qualified", "the canyon jam ended the round as a qualify");

const rampPush = clumpOnCanyonRamp();
const start = { x: rampPush.player.pos.x, z: rampPush.player.pos.z };
for (let i = 0; i < 5 * 60; i++) step(rampPush, dt, touchForward);
const moved = Math.hypot(rampPush.player.pos.x - start.x, rampPush.player.pos.z - start.z);
console.log("ramp-push", "moved", moved.toFixed(2), "z", rampPush.player.pos.z.toFixed(1), "qual", rampPush.player.qualified);
assert(moved >= 8, "holding forward for 5s on the crowded ramp only moved " + moved.toFixed(2) + "m");
assert(rampPush.player.qualified === false, "pushing through the ramp crowd counted as the finish");
void beforeZ;

const survival = fresh();
survival.phase = "race";
survival.kind = "survival";
survival.qualifyN = 8;
survival.gate = null;
survival.finishZ = null;
let marked = 0;
for (const r of survival.racers) {
  if (!r.isPlayer && marked < 8) {
    r.eliminated = true;
    marked++;
  }
}
step(survival, dt, idle);
console.log("survival", survival.result, "qual", survival.player.qualified, "count", survival.qualCount);
assert(survival.player.qualified === true, "a survivor was not qualified when eight remained");
assert(survival.phase === "results", "survival did not end when the quota was the field");

const crown = fresh();
crown.phase = "race";
crown.kind = "crown";
crown.qualifyN = 1;
crown.gate = null;
crown.finishZ = null;
crown.crown = { x: crown.player.pos.x, y: crown.player.pos.y, z: crown.player.pos.z, r: 2.5 };
for (const r of crown.racers) {
  if (!r.isPlayer) {
    r.pos.x = 90;
    r.pos.z = -40;
  }
}
for (let i = 0; i < 6 * 60; i++) step(crown, dt, idle);
console.log("crown", crown.result, "qual", crown.player.qualified, "hold", (crown.player.crownT || 0).toFixed(2));
assert(crown.player.qualified === true, "holding the crown for 5s did not qualify");

console.log("stand-still tests passed");
