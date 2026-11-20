import { resolveConfig } from "./config.js";
import { createCourse } from "./course.js";
import { createRace, step } from "./sim.js";

const quick = process.argv.includes("--quick");
const cfg = resolveConfig({ quick, seed: 4 });
const course = createCourse(cfg);
console.log(
  "tiles", course.tiles.length,
  "ship", course.ship.z.toFixed(0),
  "wps", course.waypoints.length,
  "pads", course.pads.length,
  "platforms", course.platforms.length,
  "zones", course.zones.map((z) => z.name + ":" + z.z0.toFixed(0)).join(" ")
);
console.log("gaps", course.waypoints.filter((w) => w.gap).length, "spawns", course.spawns.length);

function run(label, mode) {
  for (const t of course.tiles) {
    t.state = "solid";
    t.crackT = 0;
    t.fallT = 0;
    t.stepped = false;
  }
  const race = createRace(course, cfg, 4);
  if (mode !== "human") race.player.useAI = true;
  if (mode === "sloppy") {
    race.player.profile.mistake = 0.2;
    race.player.profile.skill = 0.35;
    race.player.profile.speed = 0.9;
  }
  if (mode === "idle") race.player.useAI = false;
  const dt = 1 / 60;
  let steps = 0;
  let falls = 0;
  let seatedAt = null;
  const max = (cfg.raceSeconds + 6) * 60;
  while ((race.phase === "countdown" || race.phase === "race") && steps < max) {
    step(race, dt, { x: 0, z: 0, jump: false, dive: false });
    for (const e of race.events) if (e.t === "respawn" && e.id === 0) falls++;
    if (race.player.seated && seatedAt == null) seatedAt = race.time;
    race.events.length = 0;
    steps++;
    if (steps % 900 === 0) {
      const p = race.player;
      console.log(label, "t", race.time.toFixed(0), "z", p.pos.z.toFixed(0), "y", p.pos.y.toFixed(1), "seats", race.seatsFilled, "zone", race.zoneId, "cp", p.cp);
    }
  }
  for (let i = 0; i < 90 && race.phase !== "results"; i++) step(race, dt, { x: 0, z: 0, jump: false, dive: false });
  console.log(label, race.result, "seat", race.player.seatIndex, "at", seatedAt && seatedAt.toFixed(0), "end", race.time.toFixed(0), "filled", race.seatsFilled, "falls", falls, "pz", race.player.pos.z.toFixed(0));
}

run("good", "good");
run("sloppy", "sloppy");
run("idle", "idle");
