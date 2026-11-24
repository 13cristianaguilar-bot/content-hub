import { resolveConfig } from "./config.js";
import { createCourse, floorsAt } from "./course.js";
import { bandSpeed, botWish as racerWish, cameraAboveFloor, cameraFloor, createRace, paceCollapse, step } from "./sim.js";
import { isSnag, isUnfair } from "./feel.js";
import { hideControls, hudStatus, placeLabel, showCoach } from "./place.js";
import { audioAudible, cueFor, muteIcon, muteLabel, normalizePrefs } from "./audio-prefs.js";
import { spectateFrame } from "./spectate.js";
import { backOffView, clearSpheres, pullOutOfSphere } from "./occlude.js";
import { BUDDY_CLIPS, lockRootPosition } from "./clips.js";

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
assert(hideControls("race", false, true, true) === true, "an eliminated racer should not see controls");
assert(cameraFloor(null, 0, -11) === 0, "a long fall must keep the last floor, not the body");
assert(cameraAboveFloor(-6, cameraFloor(null, 0, -11)) >= 1, "the fall camera dipped under the course");
assert(hudStatus({ shipRound: false, kind: "gate", qualCount: 3, qualifyN: 12 }) === "QUAL 3/12", "gate rounds should not say SEATS 0/8");
assert(hudStatus({ shipRound: true, seatsFilled: 2, cfg: { seats: 8 } }) === "SEATS 2/8", "ship rounds should count seats");
assert(showCoach("race", false, "meadow", 1, false, false) === true, "the meadow coach should show at the start");
assert(showCoach("race", false, "meadow", 1, false, true) === false, "the coach tip should hide while paused");
assert(audioAudible({ muted: false, music: true, sfx: true }) === true, "sound on should read as audible");
assert(audioAudible({ muted: true, music: true, sfx: true }) === false, "master mute should read as silent");
assert(muteIcon({ muted: false, music: true, sfx: true }).endsWith("icon_unmute.svg"), "an audible game should show a plain speaker");
assert(muteIcon({ muted: true, music: true, sfx: false }).endsWith("icon_mute.svg"), "a muted game should show a speaker with an X");
assert(muteLabel({ muted: false, music: true, sfx: true }) === "Mute", "the audible button offers mute");
assert(cueFor({ t: "tick", n: 3 }) === "count3", "countdown 3 should use the 3 beep");
assert(cueFor({ t: "tick", n: 1 }) === "count1", "countdown 1 should use the high beep");
assert(cueFor({ t: "go" }) === "go", "GO should use the v2 sting");
assert(cueFor({ t: "jump" }) === "jump" && cueFor({ t: "land" }) === "land" && cueFor({ t: "dive" }) === "dive", "jump land and dive should use the pack");
assert(cueFor({ t: "coin" }) === "collect" && cueFor({ t: "qualify" }) === "qualify", "collect and qualify should use the pack");
assert(normalizePrefs({ music: false }).sfx === true, "turning music off should leave sfx on");
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

const survival = createRace(course, resolveConfig({ quick: true, seed: 4 }), 4);
survival.phase = "race";
survival.kind = "survival";
survival.qualifyN = 8;
survival.player.pos.y = -40;
survival.player.vel.y = -8;
survival.player.grounded = false;
step(survival, 1 / 60, idle);
const alive = survival.racers.filter((r) => !r.eliminated).length;
assert(survival.player.eliminated === true, "a 20 m survival drop respawned the player");
assert(alive === 15, "survival still had " + alive + " racers after the drop");
let extra = 0;
for (const r of survival.racers) {
  if (!r.isPlayer && !r.eliminated && extra < 7) {
    r.eliminated = true;
    extra++;
  }
}
step(survival, 1 / 60, idle);
const left = survival.racers.filter((r) => !r.eliminated).length;
assert(left === 8, "survival did not shrink the field, alive " + left);
assert(survival.phase === "results", "survival did not end when 8 remained");
assert(survival.player.qualified === false, "the fallen player was marked qualified");

const slab = course.chunks[0];
let topY = -99;
let botY = 99;
for (let i = 1; i < slab.positions.length; i += 3) {
  topY = Math.max(topY, slab.positions[i]);
  botY = Math.min(botY, slab.positions[i]);
}
let topG = 0;
let topN = 0;
let cream = 0;
for (let i = 0; i < slab.positions.length; i += 3) {
  const y = slab.positions[i + 1];
  if (y > topY - 0.02) {
    topG += slab.colors[i + 1];
    topN++;
  }
  const dy = topY - y;
  if (dy > 0.12 && dy < 0.7 && slab.colors[i] > 0.9 && slab.colors[i + 1] > 0.9) cream++;
}
assert(botY < topY - 0.45, "the meadow slab lip is still too thin, " + topY + " " + botY);
assert(topN > 0 && topG / topN > 0.7, "the meadow top is still grey, g " + (topG / Math.max(1, topN)));
assert(cream > 10, "the cream lip is missing");
const inside = pullOutOfSphere({ x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 0 }, 2.2, { x: 0, y: 1.2, z: 8 });
assert(inside && inside.z > 2.2, "a camera inside a prop should come out on the buddy's side");
const clear = clearSpheres({ x: 1, y: 1, z: 1 }, [{ x: 0, y: 1, z: 0, r: 3 }], { x: 6, y: 1, z: 0 });
assert(clear.x > 2.5, "overlapping props should release the camera");
const backed = backOffView({ x: 0, y: 2, z: 0 }, { x: 0, y: 1, z: 6 }, [{ x: 0, y: 1.2, z: 1.4, r: 0.9 }]);
assert(backed.z < -0.5, "a prop against the lens should push the camera back");
assert(BUDDY_CLIPS.jump === "Jump" && BUDDY_CLIPS.dive === "Dive" && BUDDY_CLIPS.tumble === "Tumble", "buddy clips should map onto the sim names");
const locked = lockRootPosition([0, 0, 0, 0, 0.4, 1.2, 0.2, 0.1, -0.4]);
assert(locked[3] === 0 && locked[4] === 0 && locked[5] === 0 && locked[6] === 0, "jump root motion should stay at the first sample");
const paced = paceCollapse(20, 120, 50, 6);
assert(paced.collapseZ < 20, "collapse should start behind the round");
assert(paced.collapseSpeed * 15 > 12, "collapse should be chasing within 15 seconds");
const bandRace = createRace(course, resolveConfig({ quick: true, seed: 4 }), 4);
bandRace.racers.forEach((r, i) => { r.pos.z = 20 + i; });
const trailer = bandRace.racers[1];
trailer.pos.z = 0;
const leader = bandRace.racers[2];
leader.pos.z = 80;
const cap = bandRace.cfg.botSpeeds[0];
assert(bandSpeed(bandRace, trailer) >= trailer.profile.speed, "a trailing bot should speed up");
assert(bandSpeed(bandRace, trailer) <= cap + 0.001, "rubber banding stays under the top bot cap");
assert(bandSpeed(bandRace, leader) < leader.profile.speed, "a leading bot should ease off");
const crown = createRace(course, resolveConfig({ quick: true, seed: 4 }), 4);
crown.kind = "crown";
crown.phase = "race";
const crownBot = crown.racers.find((r) => !r.isPlayer);
crownBot.wait = 0;
crown.crown = { x: 0, z: crownBot.pos.z + 24, y: crownBot.pos.y, r: 3.4 };
let toward = 0;
for (let n = 0; n < 8; n++) if (racerWish(crown, crownBot, 0.05).z > 0.2) toward++;
assert(toward >= 4, "crown bots should steer toward the crown");
const chase = createRace(course, resolveConfig({ quick: true, seed: 4 }), 4);
chase.phase = "race";
chase.time = 8;
chase.roundSeconds = 45;
const opening = paceCollapse(chase.player.pos.z, chase.player.pos.z + 90, 45, 2.5);
chase.collapseZ = opening.collapseZ;
chase.collapseStop = opening.collapseStop;
chase.collapseSpeed = opening.collapseSpeed;
const front = chase.collapseZ;
for (let n = 0; n < 30; n++) step(chase, 1 / 30, { x: 0, z: 0, jump: false, dive: false });
assert(chase.collapseZ > front + 1.5, "the collapse front should move once the delay is over");
chase.planetN = 3;
const bumper = chase.course.bumpers[0];
chase.player.pos.x = bumper.x;
chase.player.pos.y = bumper.y;
chase.player.pos.z = bumper.z;
chase.player.vel.x = 0;
chase.player.vel.y = 0;
chase.player.vel.z = 0;
chase.player.flail = 0;
chase.player.bumpCd = 0;
chase.player.invuln = 0;
bumper.armedAt = 0;
step(chase, 1 / 60, { x: 0, z: 0, jump: false, dive: false });
assert(chase.player.flail < 0.15, "planet 3 should leave the meadow bumpers off");
chase.planetN = 1;
chase.player.flail = 0;
chase.player.bumpCd = 0;
bumper.armedAt = 0;
step(chase, 1 / 60, { x: 0, z: 0, jump: false, dive: false });
assert(chase.player.flail > 0.15, "planet 1 bumpers should still hit");
const stride = 29;
const ia = stride;
const ib = ia + 1;
const ic = ia + stride;
const ax = slab.positions[ib * 3] - slab.positions[ia * 3];
const az = slab.positions[ib * 3 + 2] - slab.positions[ia * 3 + 2];
const bx = slab.positions[ic * 3] - slab.positions[ia * 3];
const bz = slab.positions[ic * 3 + 2] - slab.positions[ia * 3 + 2];
const ny = az * bx - ax * bz;
assert(ny > 0, "the floor top faces down");

console.log("qa regression tests passed", "back", back.toFixed(2), "height", open.y.toFixed(2), "overlap y", overlap.player.pos.y.toFixed(2));
