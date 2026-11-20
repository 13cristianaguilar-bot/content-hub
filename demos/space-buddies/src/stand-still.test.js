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
  race.finishZ = 82;
  race.qualifyN = 12;
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

console.log("stand-still tests passed");
