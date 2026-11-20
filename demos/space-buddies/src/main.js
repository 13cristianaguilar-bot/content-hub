import { resolveConfig } from "./config.js";
import { createCourse } from "./course.js";
import { createRace, resetRace, step } from "./sim.js";
import { createWorld } from "./world.js";
import { createAudio } from "./audio.js";
import { createInput } from "./input.js";

const params = new URLSearchParams(location.search);
const cfg = resolveConfig({
  quick: params.has("quick"),
  auto: params.has("auto"),
  seed: Number(params.get("seed")) || (Date.now() % 100000),
});

const app = document.getElementById("app");
const canvas = document.getElementById("view");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const hud = document.getElementById("hud");
const controls = document.getElementById("controls");
const countdownEl = document.getElementById("countdown");
const countNum = document.getElementById("count-num");
const countLabel = document.getElementById("count-label");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const seatsEl = document.getElementById("seats");
const seatsLabel = document.getElementById("seats-label");
const lastBanner = document.getElementById("last-banner");
const zoneEl = document.getElementById("zone");
const toastEl = document.getElementById("toast");
const resultEl = document.getElementById("result");
const resultKicker = document.getElementById("result-kicker");
const resultTitle = document.getElementById("result-title");
const resultSub = document.getElementById("result-sub");
const resultTime = document.getElementById("result-time");
const againBtn = document.getElementById("again");
const dangerEl = document.getElementById("danger");

const audio = createAudio();
const input = createInput(app);
const BEST_KEY = "space-buddies-best";

let course;
let race;
let world;
let ready = false;
let started = false;
let pending = false;
let toastTimer = 0;
let zoneTimer = 0;
let crackMute = 0;
let frames = 0;
let fpsAccum = 0;
let fps = 0;
const STEP = 1 / 60;
let acc = 0;
let lastT = 0;

for (let i = 0; i < 8; i++) {
  const dot = document.createElement("i");
  dot.className = "seat";
  seatsEl.appendChild(dot);
}

function boot() {
  course = createCourse(cfg);
  race = createRace(course, cfg, cfg.seed);
  if (cfg.auto) race.player.useAI = true;
  return createWorld(canvas, course, cfg, () => {});
}

const modelPromise = boot().then((w) => {
  world = w;
  world.resize();
});
const audioPromise = audio.load();

Promise.all([modelPromise, audioPromise]).then(() => {
  ready = true;
  playBtn.textContent = "TAP TO PLAY";
  playBtn.disabled = false;
  if (pending) begin();
}).catch((err) => {
  console.error(err);
  playBtn.textContent = "COULD NOT LOAD";
});

function begin() {
  if (started) return;
  if (!ready) {
    pending = true;
    playBtn.textContent = "LOADING";
    return;
  }
  started = true;
  audio.startBeds(cfg.bedGain);
  audio.play("ui_confirm", 0.55, 0);
  title.classList.add("hide");
  hud.hidden = false;
  controls.hidden = false;
  window.__sb = { race, cfg, get fps() { return fps; } };
}

playBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  audio.unlock();
  begin();
});
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  audio.unlock();
  begin();
});

againBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  audio.unlock();
  audio.play("ui_confirm", 0.5, 0);
  restart();
});

function restart() {
  const seed = (race.seed + 1 + Math.floor(Math.random() * 50)) >>> 0;
  resetRace(race, seed);
  if (cfg.auto) race.player.useAI = true;
  world.reset();
  resultEl.hidden = true;
  resultEl.classList.remove("show");
  countdownEl.hidden = false;
  controls.hidden = false;
  lastBanner.hidden = true;
  hud.classList.remove("last");
}

function clock(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ":" + String(r).padStart(2, "0");
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.hidden = false;
  toastTimer = 1.5;
}

function showZone(name) {
  zoneEl.textContent = name;
  zoneEl.hidden = false;
  zoneTimer = 1.7;
}

let shownResult = false;

function updateHud(dt) {
  const remain = race.phase === "countdown" ? cfg.raceSeconds : Math.max(0, cfg.raceSeconds - race.time);
  const label = clock(remain);
  if (timerEl.textContent !== label) timerEl.textContent = label;
  timerEl.classList.toggle("low", race.phase === "race" && remain <= 15);

  const prog = Math.max(0, Math.min(1, race.player.pos.z / course.ship.z));
  progressEl.style.transform = "scaleX(" + prog.toFixed(3) + ")";

  const dots = seatsEl.children;
  for (let i = 0; i < 8; i++) {
    const id = race.seats[i];
    const dot = dots[i];
    if (id == null) {
      dot.style.background = "#FFF6E5";
      dot.classList.toggle("open", race.seatsFilled === 7);
    } else {
      dot.style.background = race.racers[id].color;
      dot.classList.remove("open");
    }
  }
  const seatText = "SEATS " + race.seatsFilled + "/8";
  if (seatsLabel.textContent !== seatText) seatsLabel.textContent = seatText;
  const last = race.seatsFilled === 7 && race.phase === "race";
  lastBanner.hidden = !last;
  hud.classList.toggle("last", last);

  const showCount = race.phase === "countdown" || (race.phase === "race" && race.time < 0.45);
  countdownEl.hidden = !showCount;
  if (showCount) {
    const n = race.phase === "race" ? 0 : race.countCue;
    const text = n > 0 ? String(n) : "GO";
    if (countNum.textContent !== text) {
      countNum.textContent = text;
      countNum.classList.remove("pop");
      void countNum.offsetWidth;
      countNum.classList.add("pop");
    }
    countLabel.textContent = n > 0 ? "GET READY" : "GO";
    countNum.style.color = n > 0 ? "#FF6B6B" : "#FFD23F";
  }

  const near = race.player.pos.z - race.collapseZ;
  const danger = race.phase === "race" ? Math.max(0, Math.min(1, 1 - near / 22)) : 0;
  dangerEl.style.opacity = String(danger);

  if (toastTimer > 0) {
    toastTimer -= dt;
    if (toastTimer <= 0) toastEl.hidden = true;
  }
  if (zoneTimer > 0) {
    zoneTimer -= dt;
    if (zoneTimer <= 0) zoneEl.hidden = true;
  }

  const showEnd = race.phase === "results";
  controls.hidden = showEnd || !started;
  if (showEnd && !shownResult) {
    shownResult = true;
    const escaped = race.result === "escaped";
    resultEl.hidden = false;
    resultEl.classList.add("show");
    resultEl.classList.toggle("miss", !escaped);
    resultKicker.textContent = "SPACE BUDDIES";
    resultTitle.textContent = escaped ? "YOU ESCAPED!" : "MISSED THE SHIP!";
    if (escaped) {
      resultSub.textContent = "SEAT " + (race.player.seatIndex + 1) + " OF 8";
      againBtn.textContent = "PLAY AGAIN";
      const ms = race.time * 1000;
      let best = false;
      try {
        const prev = Number(localStorage.getItem(BEST_KEY) || 0);
        if (!prev || ms < prev) {
          localStorage.setItem(BEST_KEY, String(Math.round(ms)));
          best = true;
        }
        const stored = Number(localStorage.getItem(BEST_KEY) || ms);
        resultTime.textContent = "TIME " + clock(race.time) + (best ? ". NEW BEST." : ". BEST " + clock(stored / 1000) + ".");
      } catch (err) {
        resultTime.textContent = "TIME " + clock(race.time);
      }
    } else {
      resultSub.textContent = "SO CLOSE";
      againBtn.textContent = "TRY AGAIN";
      resultTime.textContent = "TIME " + clock(race.time);
    }
  }
  if (!showEnd) shownResult = false;
}

function handleEvents() {
  let cracked = false;
  for (const e of race.events) {
    if (e.t === "tick") audio.play("tick", 0.55, 0.05);
    else if (e.t === "go") audio.play("go", 0.6, 0.05);
    else if (e.t === "jump" && e.id === 0) audio.play("jump", 0.4, 0.05);
    else if (e.t === "land" && e.id === 0 && e.impact > 3) audio.play("land", 0.35, 0.08);
    else if (e.t === "bump" && (e.id === 0 || e.big)) audio.play("bump", e.id === 0 ? 0.5 : 0.28, 0.09);
    else if (e.t === "dive" && e.id === 0) audio.play("ui_tap", 0.35, 0.05);
    else if (e.t === "crack") cracked = true;
    else if (e.t === "seat") {
      audio.play("seat", 0.5, 0.02);
      if (e.id === 0) showToast("SEAT LOCKED");
    } else if (e.t === "lastseat") audio.play("last", 0.7, 0.2);
    else if (e.t === "launch") audio.play("launch", 0.65, 0.2);
    else if (e.t === "escaped") audio.play("escaped", 0.6, 0.2);
    else if (e.t === "missed") audio.play("missed", 0.55, 0.2);
    else if (e.t === "checkpoint" && e.name && e.name !== "START") showToast("CHECKPOINT");
    else if (e.t === "zone") showZone(e.name);
    else if (e.t === "geyser" && e.id === 0) audio.play("bump", 0.35, 0.1);
  }
  if (cracked && crackMute <= 0) {
    audio.play("crack", 0.32, 0.12);
    crackMute = 0.34;
  }
  race.events.length = 0;
}

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.1, lastT ? (now - lastT) / 1000 : STEP);
  lastT = now;
  if (document.hidden) return;
  frames++;
  if (!frame.lastWall) frame.lastWall = now;
  if (now - frame.lastWall >= 500) {
    fps = frames / ((now - frame.lastWall) / 1000);
    frames = 0;
    frame.lastWall = now;
  }
  if (!world) return;
  if (!started) {
    world.render();
    return;
  }
  const raw = input.read();
  const yaw = world.yaw;
  const fx = -Math.sin(yaw);
  const fz = Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = Math.sin(yaw);
  let wish = {
    x: rx * raw.stickX + fx * raw.stickY,
    z: rz * raw.stickX + fz * raw.stickY,
    jump: raw.jump,
    dive: raw.dive,
  };
  if (race.phase !== "race") wish = { x: 0, z: 0, jump: false, dive: false };
  acc += dt;
  let steps = 0;
  while (acc >= STEP && steps < 8) {
    try {
      step(race, STEP, steps === 0 ? wish : { x: wish.x, z: wish.z, jump: false, dive: false });
    } catch (err) {
      console.error(err);
      acc = 0;
      break;
    }
    acc -= STEP;
    steps++;
  }
  crackMute = Math.max(0, crackMute - dt);
  handleEvents();
  const dist = race.player.pos.z - race.collapseZ;
  const rumble = race.phase === "race" ? Math.max(0, Math.min(1, 1 - dist / 36)) : (race.phase === "launch" ? 0.4 : 0);
  audio.setRumble(rumble * cfg.rumbleMax);
  world.update(race, dt, raw);
  world.render();
  updateHud(dt);
}

window.addEventListener("resize", () => world && world.resize());
document.addEventListener("visibilitychange", () => {
  if (document.hidden && audio.ctx) audio.ctx.suspend();
  else if (audio.ctx) audio.ctx.resume();
});

requestAnimationFrame(frame);
