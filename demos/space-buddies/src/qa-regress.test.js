import { resolveConfig } from "./config.js";
import { createCourse, floorsAt } from "./course.js";
import { createRace, step } from "./sim.js";
import { isSnag, isUnfair } from "./feel.js";
import { hideControls, placeLabel } from "./place.js";
import { spectateFrame } from "./spectate.js";

function assert(cond, message) {
  if (!cond) {
    console.error("FAIL", message);
    process.exitCode = 1;
    throw new Error(message);
  }
}

const racers = [];
for (let i = 0; i < 16; i++) {
  racers.push({ id: i, seated: false, seatIndex: -1, pos: { x: 0, y: 0, z: 20 + i * 3 } });
}
const player = racers[0];
player.pos.z = 4;
assert(placeLabel(player, racers) === "16TH", "a trailing racer should read 16TH, got " + placeLabel(player, racers));

player.seated = true;
player.seatIndex = 0;
assert(placeLabel(player, racers) === "SEAT 1", "seat 1 must not stay 16TH, got " + placeLabel(player, racers));
player.seatIndex = 7;
assert(placeLabel(player, racers) === "SEAT 8", "last boarder should read SEAT 8, got " + placeLabel(player, racers));
player.seated = false;
player.seatIndex = -1;
player.pos.z = 80;
assert(placeLabel(player, racers) === "1ST", "the leader should still read 1ST");
assert(hideControls("race", true, true) === true, "seated race should hide controls");
assert(hideControls("launch", true, true) === true, "launch should hide controls");
assert(hideControls("results", false, true) === true, "results should hide controls");
assert(hideControls("race", false, true) === false, "a racing player should see controls");
assert(isSnag(8, 3, 0.8, false) === true, "a steered speed cut with no hit is a snag");
assert(isSnag(8, 3, 0.8, true) === false, "a real hit is not a snag");
assert(isSnag(8, 6, 0.8, false) === false, "a small slowdown is not a snag");
assert(isUnfair(0.2) === true, "a hit with 0.2s of warning is unfair");
assert(isUnfair(null) === true, "a hit with no warning is unfair");
assert(isUnfair(0.8) === false, "a hit you could see coming is fair");

const focus = { x: 2, y: 1, z: 40 };
const open = spectateFrame(focus, 0, 0, []);
const back = Math.hypot(open.x - focus.x, open.z - focus.z);
assert(back >= 10 && back <= 14, "spectate orbit left the 10–14 m band: " + back.toFixed(2));
assert(open.y >= 11, "spectate camera stayed low: " + open.y.toFixed(2));
assert(open.look.z >= focus.z + 6, "spectate look did not frame the course ahead");
assert(open.fogNear >= 140, "spectate fog still washes the leaders");

const crowd = [{ x: open.x, y: 1, z: open.z, eliminated: false }];
const lifted = spectateFrame(focus, 0, 0, crowd);
assert(lifted.y >= crowd[0].y + 7, "a Buddy under the camera was not cleared");

const later = spectateFrame(focus, 8, 0, []);
assert(Math.abs(later.x - open.x) > 0.5 || Math.abs(later.z - open.z) > 0.5, "spectate orbit did not move");
const laterBack = Math.hypot(later.x - focus.x, later.z - focus.z);
assert(laterBack >= 10 && laterBack <= 14, "orbit radius drifted: " + laterBack.toFixed(2));

const course = createCourse(resolveConfig({ quick: true, seed: 4 }));
const diveJump = createRace(course, resolveConfig({ quick: true, seed: 4, feel: true }), 4);
diveJump.phase = "race";
diveJump.player.useAI = false;
diveJump.player.grounded = true;
diveJump.player.vel.y = 0;
step(diveJump, 1 / 60, { x: 0, z: 1, jump: true, dive: true, grab: false, holdJump: false });
let leftGround = false;
for (let i = 0; i < 40; i++) {
  step(diveJump, 1 / 60, { x: 0, z: 1, jump: false, dive: false, grab: false, holdJump: false });
  if (diveJump.player.vel.y > 4) leftGround = true;
}
assert(leftGround, "a jump pressed during a dive never left the ground");
const fastFall = createRace(course, resolveConfig({ quick: true, seed: 4, feel: true }), 4);
fastFall.phase = "race";
fastFall.player.useAI = false;
fastFall.player.grounded = false;
fastFall.player.pos.y = fastFall.player.pos.y + 1.2;
fastFall.player.vel.y = -24;
const floorY = fastFall.player.pos.y - 1.2;
step(fastFall, 1 / 60, { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false });
assert(fastFall.player.pos.y > floorY - 0.35, "a fast fall tunneled the floor, y " + fastFall.player.pos.y.toFixed(2));
assert(fastFall.feel.missed === 0, "a fast fall counted a missed landing");

let spot = null;
for (let z = 90; z < 140 && !spot; z += 1.2) {
  for (let x = -10; x <= 10 && !spot; x += 1.2) {
    const hits = floorsAt(course, x, z);
    if (hits.length < 2) continue;
    let low = hits[0].y;
    let high = hits[0].y;
    for (const hit of hits) {
      if (hit.y < low) low = hit.y;
      if (hit.y > high) high = hit.y;
    }
    if (high - low > 0.8) spot = { x, z, low, high };
  }
}
assert(spot, "expected a ramp to overlap a lower floor");
const overlap = createRace(course, resolveConfig({ quick: true, seed: 4 }), 4);
overlap.phase = "race";
overlap.player.useAI = false;
overlap.player.pos.x = spot.x;
overlap.player.pos.y = spot.low + 0.15;
overlap.player.pos.z = spot.z;
overlap.player.vel.x = 0;
overlap.player.vel.y = -10;
overlap.player.vel.z = 0;
overlap.player.grounded = false;
const idle = { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false };
for (let i = 0; i < 40; i++) step(overlap, 1 / 60, idle);
assert(overlap.player.pos.y > spot.low - 0.35, "fell through the lower pad under a higher overlap at y " + overlap.player.pos.y.toFixed(2));

const bump = course.bumpers[0];
const tel = createRace(course, resolveConfig({ quick: true, seed: 4, feel: true }), 4);
tel.phase = "race";
tel.player.useAI = false;
tel.player.pos.x = bump.x;
tel.player.pos.y = bump.y;
tel.player.pos.z = bump.z;
tel.player.grounded = true;
tel.player.vel.x = 0;
tel.player.vel.y = 0;
tel.player.vel.z = 0;
let earlyHit = false;
for (let i = 0; i < 20; i++) {
  step(tel, 1 / 60, idle);
  if (tel.events.some((e) => e.t === "bump" && e.id === tel.player.id)) earlyHit = true;
  tel.events.length = 0;
}
assert(!earlyHit, "a bumper hit before its telegraph");
for (let i = 0; i < 50; i++) {
  step(tel, 1 / 60, idle);
  tel.events.length = 0;
}
assert(tel.feel.unfair === 0, "a telegraphed hit still counted as unfair, " + tel.feel.unfair);

console.log("qa regression tests passed", "back", back.toFixed(2), "height", open.y.toFixed(2), "overlap y", overlap.player.pos.y.toFixed(2));
