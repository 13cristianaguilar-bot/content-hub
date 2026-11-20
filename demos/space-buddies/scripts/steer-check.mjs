import * as THREE from "../node_modules/three/build/three.module.js";
import { cameraWish, yawAfterDrag } from "../src/steer.js";
import { resolveConfig } from "../src/config.js";
import { createCourse, groundAt } from "../src/course.js";
import { createRace, step } from "../src/sim.js";

const cam = new THREE.PerspectiveCamera(64, 390 / 844, 0.15, 500);
const horiz = 7.6 * Math.cos(0.62);
const height = 7.6 * Math.sin(0.62);
let failed = 0;

function checkYaw(deg) {
  const yaw = deg * Math.PI / 180;
  cam.position.set(Math.sin(yaw) * horiz, height, -Math.cos(yaw) * horiz);
  cam.lookAt(0, 1.15, Math.cos(yaw) * 1.4);
  cam.updateMatrixWorld(true);
  const look = new THREE.Vector3();
  cam.getWorldDirection(look);
  const right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
  const up = cameraWish(yaw, 0, 1);
  const down = cameraWish(yaw, 0, -1);
  const screenRight = cameraWish(yaw, 1, 0);
  const screenLeft = cameraWish(yaw, -1, 0);
  const dot = (a, b) => {
    const am = Math.hypot(a.x, a.z) || 1;
    const bm = Math.hypot(b.x, b.z) || 1;
    return (a.x * b.x + a.z * b.z) / (am * bm);
  };
  const ok = (name, wish, dir) => {
    const d = dot(wish, dir);
    if (d < 0.98) {
      failed++;
      console.log("FAIL", deg, name, "wish", wish.x.toFixed(2), wish.z.toFixed(2), "dir", dir.x.toFixed(2), dir.z.toFixed(2), "dot", d.toFixed(2));
    }
  };
  ok("up", up, look);
  ok("down", down, { x: -look.x, z: -look.z });
  ok("right", screenRight, right);
  ok("left", screenLeft, { x: -right.x, z: -right.z });
  const turned = yawAfterDrag(yaw, 40, 0.0052);
  const delta = turned - yaw;
  if (delta <= 0) {
    failed++;
    console.log("FAIL drag right did not turn view right", deg);
  }
}

for (const deg of [0, 90, 180, 270]) checkYaw(deg);

const cfg = resolveConfig({ seed: 4 });
const course = createCourse(cfg);
const spawn = course.spawns[0];
const under = groundAt(course, spawn.x, spawn.z);
if (!under || Math.abs(under.y - spawn.y) > 0.2 || Math.abs(spawn.x - under.x) > 0.2) {
  failed++;
  console.log("FAIL spawn", spawn, under);
}
const race = createRace(course, cfg, 4);
race.player.useAI = false;
const dt = 1 / 60;
let falls = 0;
for (let i = 0; i < 180; i++) {
  step(race, dt, cameraWish(0, 0, 1));
  for (const e of race.events) if (e.t === "respawn" && e.id === 0) falls++;
  race.events.length = 0;
}
const p = race.player;
if (p.pos.z <= spawn.z + 8) {
  failed++;
  console.log("FAIL did not move forward", p.pos.z);
}
const stand = groundAt(course, p.pos.x, p.pos.z);
if (!stand || Math.abs(stand.y - p.pos.y) > 0.4) {
  failed++;
  console.log("FAIL off the plaza", p.pos.x, p.pos.z, stand && stand.y);
}
if (falls > 0 || p.pos.y < 0) {
  failed++;
  console.log("FAIL fell", falls, p.pos.y, p.pos.z);
}
console.log(failed ? "FAILED " + failed : "ok", "z", p.pos.z.toFixed(1), "y", p.pos.y.toFixed(2), "falls", falls);
process.exit(failed ? 1 : 0);
