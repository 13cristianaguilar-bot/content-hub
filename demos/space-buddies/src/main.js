import { COLORS, resolveConfig } from "./config.js";
import { createCourse, groundAt, courseScale } from "./course.js";
import { recordRun } from "./board.js";
import { createRace, resetRace, step } from "./sim.js";
import { createWorld } from "./world.js";
import { createAudio } from "./audio.js";
import { createInput } from "./input.js";
import { cameraWish } from "./steer.js";
import { hideControls, placeLabel } from "./place.js";
import { botWish } from "./bot.js";

const params = new URLSearchParams(location.search);
const cfg = resolveConfig({
  quick: params.has("quick"),
  auto: params.has("auto"),
  seed: Number(params.get("seed")) || (Date.now() % 100000),
  feel: params.has("feel"),
  low: params.has("low"),
});

const app = document.getElementById("app");
const canvas = document.getElementById("view");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const lobby = document.getElementById("lobby");
const startBtn = document.getElementById("start");
const colorBox = document.getElementById("colors");
const gearBox = document.getElementById("gear");
const tutor = document.getElementById("tutor");
const placeEl = document.getElementById("place");
const coinsEl = document.getElementById("coins");
const hud = document.getElementById("hud");
const controls = document.getElementById("controls");
const countdownEl = document.getElementById("countdown");
const countNum = document.getElementById("count-num");
const countLabel = document.getElementById("count-label");
const timerEl = document.getElementById("timer");
const timerNum = document.getElementById("timer-num");
const coinNum = document.getElementById("coin-num");
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
const menuBtn = document.getElementById("menu");
const nextRoundBtn = document.getElementById("next-round");
const nextPlanetBtn = document.getElementById("next-planet");
const pauseBtn = document.getElementById("pause");
const muteBtn = document.getElementById("mute");
const pauseMenu = document.getElementById("pause-menu");
const roundEl = document.getElementById("round-name");
const roundKicker = document.getElementById("round-kicker");
const roundTitle = document.getElementById("round-title");
const roundSub = document.getElementById("round-sub");
const planetEl = document.getElementById("planet");
const planetSub = document.getElementById("planet-sub");
const fadeEl = document.getElementById("fade");
const CAREER_KEY = "space-buddies-career";
let career = { planets: 0, coins: 0, best: "" };
try { career = Object.assign(career, JSON.parse(localStorage.getItem(CAREER_KEY) || "{}")); } catch (err) { /* private mode */ }
function saveCareer() {
  try { localStorage.setItem(CAREER_KEY, JSON.stringify(career)); } catch (err) { /* ignore */ }
}
let planet = Math.max(1, Math.min(3, Number(params.get("planet")) || 1));
let roundIndex = Math.max(0, Math.min(2, Number(params.get("round")) || 0));
let alive = null;
let paused = false;
let escWas = false;
let stepMute = 0;
const Z = (z) => z * courseScale(cfg.quick);
const gate = (z, y, rx) => ({ x: 0, z: Z(z), rx: rx || 5, rz: 1.5, y });
const PLANS = [
  [
    { name: "ROUND 1", sub: "12 QUALIFY", qualify: 12, startZ: Z(22), finishZ: Z(158), gate: gate(158, 0.25, 5) },
    { name: "ROUND 2", sub: "8 QUALIFY", qualify: 8, startZ: Z(168), finishZ: Z(236), gate: gate(236, 5.2, 5) },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, startZ: Z(22), ship: true },
  ],
  [
    { name: "SKY HEAT", sub: "12 QUALIFY", qualify: 12, startZ: Z(176), finishZ: Z(258), gate: gate(258, 3.3, 5.5) },
    { name: "THE CLIMB", sub: "8 QUALIFY", qualify: 8, startZ: Z(300), finishZ: Z(356), gate: gate(356, 8, 4.5) },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, startZ: Z(250), ship: true },
  ],
  [
    { name: "SURVIVAL", sub: "LAST 8 STANDING", qualify: 8, startZ: Z(22), kind: "survival" },
    { name: "CROWN", sub: "HOLD THE CROWN", qualify: 8, startZ: Z(176), kind: "crown", crown: { x: 0, z: Z(210), y: 5.6, r: 3.4 } },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, startZ: Z(22), ship: true },
  ],
];
function currentPlan() {
  return PLANS[(planet - 1) % PLANS.length][roundIndex];
}
const dangerEl = document.getElementById("danger");

const audio = createAudio();
const debugOn = params.get("debug") === "1";
function reportError(err) {
  const message = (err && err.stack) || (err && err.message) || String(err);
  console.error(err);
  if (!debugOn) return;
  const box = document.getElementById("debug-error");
  if (!box) return;
  box.hidden = false;
  box.textContent = String(message).slice(0, 700);
}
window.addEventListener("error", (event) => reportError(event.error || event.message));
window.addEventListener("unhandledrejection", (event) => reportError(event.reason));
window.__sbAudio = () => ({ state: audio.ctx && audio.ctx.state, bed: audio.playing });
const input = createInput(app);
const BEST_KEY = "space-buddies-best";

let course;
let race;
let world;
let ready = false;
let started = false;
let pending = false;
let toastTimer = 0;
let introLeft = 0;
let hitStop = 0;
const steer = { x: 0, z: 0 };
let qualityDropped = false;
const GEAR = ["classic", "heli", "goggles", "stars", "flower", "scarf", "fish", "crown"];
const GEAR_LABEL = ["Classic", "Sunny", "Goggles", "Stars", "Flower", "Scarf", "Fish", "Crown"];
let pickColor = COLORS[0];
let pickGear = "classic";
const LOOK_KEY = "space-buddies-look";
try {
  const savedLook = JSON.parse(localStorage.getItem(LOOK_KEY) || "{}");
  if (savedLook.color) pickColor = savedLook.color;
  if (savedLook.gear && GEAR.includes(savedLook.gear)) pickGear = savedLook.gear;
} catch (err) { /* private mode */ }
function saveLook() {
  try { localStorage.setItem(LOOK_KEY, JSON.stringify({ color: pickColor, gear: pickGear })); } catch (err) { /* ignore */ }
}
let zoneTimer = 0;
let crackMute = 0;
let frames = 0;
let fpsAccum = 0;
let fps = 0;
const STEP = 1 / 60;
let acc = 0;
let lastT = 0;

const SEAT_ART = ["mint", "sun", "coral", "sky", "grape", "cream", "bubble", "lava"];
for (let i = 0; i < 8; i++) {
  const dot = document.createElement("img");
  dot.className = "seat";
  dot.alt = "";
  dot.src = "ui/svg/seat_empty.svg";
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
  if (world.hideBuddy) world.hideBuddy();
  audio.unlock();
  audio.startBeds(cfg.bedGain);
  audio.play("ui_confirm", 0.55, 0);
  title.classList.add("hide");
  lobby.hidden = true;
  race.player.color = pickColor;
  saveLook();
  if (world.applyLook) world.applyLook(pickColor, pickGear);
  introLeft = cfg.auto || params.get("bot") ? 0.2 : 3.3;
  hud.hidden = false;
  controls.hidden = true;
  tutor.hidden = true;
  window.__sb = {
    race,
    cfg,
    get fps() { return fps; },
    get feel() { return race.feel; },
    view: () => (world.view ? world.view() : null),
    sees: (x, y, z) => (world.sees ? world.sees(x, y, z) : true),
    ground: (x, z) => groundAt(course, x, z),
    supports: (x, y, z) => {
      let under = null;
      let through = null;
      for (const pad of course.floors) {
        const chunk = course.chunks[pad.chunk];
        if (!chunk || chunk.state === "falling" || chunk.state === "gone") continue;
        const nx = (x - pad.x) / pad.rx;
        const nz = (z - pad.z) / pad.rz;
        if (nx * nx + nz * nz > 1) continue;
        const core = nx * nx + nz * nz < 0.45;
        if (pad.y <= y + 0.45 && (!under || pad.y > under.y)) under = { y: pad.y, core };
        if (core && pad.y > y + 0.8 && (!through || pad.y < through.y)) through = { y: pad.y };
      }
      return { under: under && under.y, through: !under && through ? through.y : null };
    },
    campaign: () => ({ planet, roundIndex, plan: currentPlan(), paused }),
  };
  window.__sbAudio = () => ({ state: audio.ctx && audio.ctx.state, bed: audio.playing });
  if (cfg.low && world.setLow) world.setLow();
  applyRound();
  pauseBtn.hidden = false;
  muteBtn.hidden = false;
}

function applyRound() {
  const p = currentPlan();
  race.shipRound = !!p.ship;
  race.kind = p.kind || (p.ship ? "ship" : "gate");
  race.crown = p.crown ? { ...p.crown } : null;
  race.finishZ = p.ship || p.kind === "survival" || p.kind === "crown" ? null : p.finishZ;
  race.gate = p.ship || p.kind === "survival" || p.kind === "crown" ? null : (p.gate || null);
  race.qualifyN = p.ship ? 0 : p.qualify;
  race.qualCount = 0;
  race.phase = "countdown";
  race.countClock = 0;
  race.countCue = -1;
  race.result = null;
  race.time = 0;
  const g = groundAt(course, 0, p.startZ);
  const y = g ? g.y : 0;
  race.racers.forEach((r, i) => {
    const keep = !alive || alive.has(r.id);
    r.qualified = false;
    r.seated = false;
    r.seatIndex = -1;
    if (!keep) {
      r.eliminated = true;
      return;
    }
    r.eliminated = false;
    r.pos.x = ((i % 5) - 2) * 1.7;
    r.pos.z = p.startZ + Math.floor(i / 5) * 1.2;
    r.pos.y = y;
    r.vel.x = 0;
    r.vel.y = 0;
    r.vel.z = 0;
    r.lastSafe = { x: r.pos.x, y, z: r.pos.z };
    r.wp = 0;
  });
  race.seatsFilled = 0;
  if (race.seats) race.seats = race.seats.map(() => null);
  if (world.setTheme) world.setTheme(planet);
  if (audio.setZone) audio.setZone(p.ship ? "ship" : (p.startZ > 250 ? "ice" : p.startZ > 150 ? "sky" : p.startZ > 80 ? "canyon" : "meadow"));
  paintMap(planet);
  roundKicker.textContent = "PLANET " + planet;
  roundTitle.textContent = p.name;
  roundSub.textContent = p.sub;
  roundEl.hidden = false;
  const roundBanner = roundEl.querySelector(".sb-banner");
  if (window.SBUI && roundBanner) SBUI.slam(roundBanner);
  setTimeout(() => { roundEl.hidden = true; }, 1400);
}

function armAudio() {
  audio.unlock();
  audio.startBeds(cfg.bedGain);
}

function openLobby() {
  armAudio();
  if (!ready) {
    pending = true;
    playBtn.textContent = "LOADING";
    return;
  }
  if (cfg.auto) {
    begin();
    return;
  }
  title.classList.add("hide");
  lobby.hidden = false;
  lobby.classList.add("ui-screen");
  if (world.applyLook) world.applyLook(pickColor, pickGear);
}

title.addEventListener("pointerdown", armAudio);
title.addEventListener("touchstart", armAudio, { passive: true });
playBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  openLobby();
});
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  audio.unlock();
  if (pending && ready) begin();
});
document.getElementById("aboard-skip").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (race && race.player.seated && race.phase === "race") race.forceLaunch = true;
});
startBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  audio.unlock();
  begin();
});

COLORS.forEach((hex, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "swatch" + (hex === pickColor ? " on" : "");
  b.style.background = hex;
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    pickColor = hex;
    saveLook();
    colorBox.querySelectorAll("button").forEach((n) => n.classList.remove("on"));
    b.classList.add("on");
    if (world && world.applyLook) world.applyLook(pickColor, pickGear);
  });
  colorBox.appendChild(b);
});
GEAR.forEach((name, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "gear" + (name === pickGear ? " on" : "");
  b.textContent = GEAR_LABEL[i];
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    pickGear = name;
    saveLook();
    gearBox.querySelectorAll("button").forEach((n) => n.classList.remove("on"));
    b.classList.add("on");
    if (world && world.applyLook) world.applyLook(pickColor, pickGear);
  });
  gearBox.appendChild(b);
});

function togglePause() {
  if (!started || !race || race.phase === "results") return;
  paused = !paused;
  pauseMenu.hidden = !paused;
}
pauseBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  togglePause();
});
muteBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const on = !audio.muted;
  audio.setMuted(on);
  const icon = muteBtn.querySelector("img");
  if (icon) icon.src = on ? "ui/svg/icon_unmute.svg" : "ui/svg/icon_mute.svg";
  muteBtn.setAttribute("aria-label", on ? "Unmute" : "Mute");
});
document.getElementById("resume").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  paused = false;
  pauseMenu.hidden = true;
});
document.getElementById("restart").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  paused = false;
  pauseMenu.hidden = true;
  alive = null;
  roundIndex = 0;
  restart();
  applyRound();
});
document.getElementById("pause-menu-btn").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  goMenu();
});
menuBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  goMenu();
});
nextRoundBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const ids = new Set(race.racers.filter((r) => r.qualified).map((r) => r.id));
  alive = ids;
  roundIndex += 1;
  resultEl.hidden = true;
  shownResult = false;
  resetRace(race, (race.seed + 11) >>> 0);
  if (cfg.auto) race.player.useAI = true;
  applyRound();
  controls.hidden = false;
});
nextPlanetBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  resultEl.hidden = true;
  planetSub.textContent = "Planet " + (planet + 1) + ". The sky changes. The ship is waiting.";
  paintMap(planet + 1);
  planetEl.hidden = false;
});
document.getElementById("land").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  planet += 1;
  roundIndex = 0;
  alive = null;
  planetEl.hidden = true;
  shownResult = false;
  resetRace(race, (race.seed + 21) >>> 0);
  if (cfg.auto) race.player.useAI = true;
  applyRound();
  controls.hidden = false;
});
function goMenu() {
  paused = false;
  pauseMenu.hidden = true;
  planetEl.hidden = true;
  started = false;
  resultEl.hidden = true;
  resultEl.classList.remove("show");
  title.classList.remove("hide");
  hud.hidden = true;
  controls.hidden = true;
  pauseBtn.hidden = true;
  muteBtn.hidden = true;
  roundIndex = 0;
  alive = null;
}

againBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  audio.unlock();
  audio.play("ui_confirm", 0.5, 0);
  restart();
});

function restart() {
  const seed = (race.seed + 1 + Math.floor(Math.random() * 50)) >>> 0;
  resetRace(race, seed);
  steer.x = 0;
  steer.z = 0;
  if (cfg.auto) race.player.useAI = true;
  race.player.color = pickColor;
  if (world.applyLook) world.applyLook(pickColor, pickGear);
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

function fillPodium(race) {
  const rows = race.racers.slice().sort((a, b) => {
    const score = (r) => (r.seated ? 4000 : 0) + (r.qualified ? 2000 : 0) + (r.eliminated ? -1000 : 0) + r.pos.z;
    return score(b) - score(a);
  });
  for (let i = 0; i < 3; i++) {
    const el = document.getElementById("pod-" + (i + 1));
    const r = rows[i];
    if (!el || !r) continue;
    el.textContent = r.isPlayer ? "YOU" : "BUDDY";
    el.style.color = "#1e2440";
  }
}

document.getElementById("app").addEventListener("pointerdown", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.disabled) return;
  audio.play("ui_tap", 0.3, 0.01);
}, true);
if (window.SBUI) SBUI.bindPress(document.getElementById("app"));

window.SPACE_BUDDIES_UI = {
  stylesheet: "ui.css",
  font: "Fredoka",
  tokens: ["--ui-font", "--ui-bg", "--ui-ink", "--ui-coral", "--ui-sun", "--ui-mint", "--ui-sky"],
  buttons: "ui-btn",
  banners: "ui-banner",
};

function paintMap(current) {
  document.querySelectorAll(".planet-dot").forEach((el) => {
    const n = Number(el.dataset.planet);
    el.classList.toggle("on", n === current);
    el.classList.toggle("done", n < current);
    const img = el.querySelector("img");
    if (img) img.src = "ui/svg/" + (n < current ? "map_node_cleared" : n === current ? "map_node_current" : "map_node_locked") + ".svg";
    if (img) img.classList.toggle("is-current", n === current);
    if (n === current && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  });
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
  if (timerNum && timerNum.textContent !== label) timerNum.textContent = label;
  timerEl.classList.toggle("is-low", race.phase === "race" && remain <= 15);

  const placeText = placeLabel(race.player, race.racers);
  if (placeEl.textContent !== placeText) placeEl.textContent = placeText;
  const coinN = race.coins || 0;
  if (coinNum && coinNum.dataset.n !== String(coinN)) {
    coinNum.dataset.n = String(coinN);
    if (window.SBUI) SBUI.countUp(coinNum, coinN, 700);
    else coinNum.textContent = String(coinN);
  }

  const showTutor = !race.player.seated && race.phase === "race" && race.zoneId === "meadow" && race.time < 8 && !cfg.auto;
  tutor.hidden = !showTutor;
  if (showTutor) {
    tutor.textContent = race.time < 2.6 ? "DRAG THE LEFT SIDE TO RUN" : race.time < 5.2 ? "DRAG THE RIGHT SIDE TO LOOK" : "JUMP AND DIVE";
  }

  const prog = Math.max(0, Math.min(1, race.player.pos.z / course.ship.z));
  progressEl.parentElement.style.setProperty("--p", Math.round(prog * 100) + "%");

  const dots = seatsEl.children;
  for (let i = 0; i < 8; i++) {
    const id = race.seats[i];
    const dot = dots[i];
    const next = id == null ? "ui/svg/seat_empty.svg" : "ui/svg/seat_filled_" + SEAT_ART[i] + ".svg";
    if (dot.getAttribute("src") !== next) {
      dot.src = next;
      if (id != null) dot.classList.add("is-new");
    }
  }
  const seatText = "SEATS " + race.seatsFilled + "/8";
  if (seatsLabel.textContent !== seatText) seatsLabel.textContent = seatText;
  const last = race.seatsFilled === 7 && race.phase === "race";
  if (last && lastBanner.hidden && window.SBUI) SBUI.slam(lastBanner);
  else lastBanner.hidden = !last;
  hud.classList.toggle("last", last);
  seatsEl.parentElement.classList.toggle("is-last", last);

  const showCount = race.phase === "countdown" || (race.phase === "race" && race.time < 0.45);
  countdownEl.hidden = !showCount;
  if (showCount) {
    const n = race.phase === "race" ? 0 : race.countCue;
    const text = n > 0 ? String(n) : "GO";
    if (countNum.textContent !== text) {
      countNum.textContent = text;
      countNum.classList.remove("sb-countdown");
      void countNum.offsetWidth;
      countNum.classList.add("sb-countdown");
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
  const aboard = document.getElementById("aboard");
  const waiting = started && race.player.seated && race.phase === "race";
  controls.hidden = hideControls(race.phase, race.player.seated, started);
  if (aboard) {
    aboard.hidden = !waiting;
    const left = Math.max(0, cfg.seats - race.seatsFilled);
    const copy = document.getElementById("aboard-copy");
    if (copy) copy.textContent = left > 0 ? "You're on board, waiting for " + left + " more" : "You're on board";
  }
  if (showEnd && !shownResult) {
    shownResult = true;
    const kind = race.result;
    resultEl.hidden = false;
    resultEl.classList.add("show");
    resultEl.classList.toggle("miss", kind === "missed" || kind === "out");
    resultEl.classList.toggle("win", kind === "qualified" || kind === "escaped");
    resultKicker.textContent = "PLANET " + planet;
    nextRoundBtn.hidden = kind !== "qualified";
    nextPlanetBtn.hidden = kind !== "escaped";
    againBtn.hidden = kind === "qualified" || kind === "escaped";
    const banner = document.getElementById("result-banner");
    if (kind === "qualified") {
      resultTitle.textContent = "YOU QUALIFIED!";
      resultSub.textContent = currentPlan().name + " CLEARED";
      if (banner) banner.src = "ui/svg/banner_qualified.svg";
      if (window.SBUI) SBUI.confetti(48);
    } else if (kind === "escaped") {
      resultTitle.textContent = "YOU ESCAPED!";
      resultSub.textContent = "SEAT " + (race.player.seatIndex + 1) + " OF 8";
      if (banner) banner.src = "ui/svg/banner_escaped.svg";
      if (window.SBUI) SBUI.confetti(60);
      career.planets = Math.max(career.planets, planet);
      career.coins += race.coins || 0;
      career.best = "PLANET " + planet;
      saveCareer();
    } else if (kind === "out") {
      resultTitle.textContent = "ELIMINATED";
      resultSub.textContent = "YOU DIDN'T QUALIFY";
      againBtn.textContent = "TRY AGAIN";
      if (banner) banner.src = "ui/svg/banner_eliminated.svg";
    } else {
      resultTitle.textContent = "MISSED THE SHIP!";
      resultSub.textContent = "SO CLOSE";
      againBtn.textContent = "TRY AGAIN";
    }
    recordRun({
      planet,
      result: kind,
      time: Math.round((race.time || 0) * 10) / 10,
      coins: race.coins || 0,
      at: new Date().toISOString(),
    });
    fillPodium(race);
    const clockTarget = race.time || 0;
    let clockShown = 0;
    const clockStep = Math.max(0.08, clockTarget / 18);
    const countClock = () => {
      if (!shownResult) return;
      clockShown = Math.min(clockTarget, clockShown + clockStep);
      resultTime.textContent = "TIME " + clock(clockShown) + " · " + (race.coins || 0) + " COINS · PLANETS " + career.planets;
      if (clockShown < clockTarget) requestAnimationFrame(countClock);
    };
    countClock();
  }
  if (!showEnd) shownResult = false;
}

function handleEvents() {
  let cracked = false;
  for (const e of race.events) {
    if (e.t === "tick") audio.play("tick", 0.55, 0.05);
    else if (e.t === "go") audio.play("go", 0.6, 0.05);
    else if (e.t === "jump" && e.id === 0) audio.play("jump", 0.4, 0.05);
    else if (e.t === "coin") audio.play("ui_tap", 0.45, 0.03);
    else if (e.t === "glide" && e.id === 0) audio.play("jump", 0.22, 0.08);
    else if (e.t === "grab" && e.id === 0) audio.play("bump", 0.35, 0.05);
    else if (e.t === "qualify" && e.id === 0) {
      audio.play("seat", 0.45, 0.05);
      race.slowMo = 0.45;
      race.popConfetti = (race.popConfetti || 0) + 1;
    }
    else if (e.t === "roundwin") audio.play("escaped", 0.55, 0.1);
    else if (e.t === "eliminated") audio.play("missed", 0.6, 0.1);
    else if (e.t === "respawn" && e.fade && fadeEl) {
      fadeEl.classList.add("on");
      setTimeout(() => fadeEl.classList.remove("on"), 200);
    }
    else if (e.t === "land" && e.id === 0 && e.impact > 3) audio.play("land", 0.35, 0.08);
    else if (e.t === "bump") {
      audio.play("bump", e.id === 0 ? 0.5 : 0.22, 0.06);
      if (e.id === 0 && e.big) hitStop = 0.08;
    } else if (e.t === "dive" && e.id === 0) audio.play("jump", 0.28, 0.04);
    else if (e.t === "crack") cracked = true;
    else if (e.t === "seat") {
      audio.play("seat", 0.5, 0.02);
      const dot = seatsEl.children[e.seat];
      if (dot) {
        dot.classList.add("pop");
        setTimeout(() => dot.classList.remove("pop"), 400);
      }
      if (e.id === 0) {
        showToast("SEAT " + (e.seat + 1) + " LOCKED");
      }
    } else if (e.t === "lastseat") audio.play("last", 0.7, 0.2);
    else if (e.t === "launch") audio.play("launch", 0.65, 0.2);
    else if (e.t === "escaped") {
      audio.play("escaped", 0.7, 0.2);
      if (audio.flourish) audio.flourish("win");
    } else if (e.t === "missed") {
      audio.play("missed", 0.65, 0.2);
      if (audio.flourish) audio.flourish("miss");
    }
    else if (e.t === "checkpoint" && e.name && e.name !== "START") showToast("CHECKPOINT");
    else if (e.t === "zone") showZone(e.name);
    else if (e.t === "geyser") audio.play("bump", e.id === 0 ? 0.4 : 0.18, 0.08);
    else if (e.t === "error") reportError(e.message);
  }
  if (cracked && crackMute <= 0) {
    audio.play("crack", 0.32, 0.12);
    crackMute = 0.34;
  }
  race.events.length = 0;
}

function frame(now) {
  requestAnimationFrame(frame);
  const wall = lastT ? (now - lastT) / 1000 : STEP;
  const dt = Math.min(0.1, wall);
  const clock = window.__sbClock || (window.__sbClock = { maxWall: 0, big: 0, stepsMax: 0 });
  if (wall > clock.maxWall) clock.maxWall = wall;
  if (wall > 0.12) clock.big++;
  lastT = now;
  if (document.hidden || window.__sbBackground) return;
  frames++;
  if (!frame.lastWall) frame.lastWall = now;
  if (now - frame.lastWall >= 500) {
    fps = frames / ((now - frame.lastWall) / 1000);
    frames = 0;
    frame.lastWall = now;
  }
  if (!world) return;
  if (!started) {
    if (!lobby.hidden && world.showBuddy) world.showBuddy(dt);
    world.render();
    return;
  }
  if (introLeft > 0) {
    introLeft -= dt;
    try {
      world.update(race, dt, { intro: introLeft, lookDx: 0, lookDy: 0, looking: false });
      world.render();
    } catch (err) {
      reportError(err);
    }
    tutor.hidden = true;
    controls.hidden = true;
    if (introLeft <= 0) controls.hidden = false;
    return;
  }
  const raw = input.read();
  const aim = cameraWish(world.yaw, raw.stickX, raw.stickY);
  const follow = 1 - Math.exp(-16 * dt);
  steer.x += (aim.x - steer.x) * follow;
  steer.z += (aim.z - steer.z) * follow;
  if (raw.pause && !escWas) togglePause();
  escWas = !!raw.pause;
  if (paused) {
    try {
      world.update(race, 0, raw);
      world.render();
    } catch (err) {
      reportError(err);
    }
    return;
  }
  if (race.slowMo > 0) race.slowMo = Math.max(0, race.slowMo - dt);
  const simScale = race.slowMo > 0 ? 0.35 : 1;
  let wish = {
    x: steer.x,
    z: steer.z,
    jump: raw.jump,
    dive: raw.dive,
    grab: raw.grab,
    holdJump: raw.holdJump,
  };
  if (race.phase !== "race") wish = { x: 0, z: 0, jump: false, dive: false, grab: false, holdJump: false };
  const botMode = params.get("bot");
  if (botMode && race.phase === "race" && !race.player.seated && !race.player.eliminated) wish = botWish(race, botMode);
  const qaRate = Math.max(1, Math.min(8, Number(params.get("qa")) || 1));
  if (hitStop > 0) {
    hitStop -= dt;
  } else {
  acc += dt * simScale * qaRate;
  }
  let steps = 0;
  while (hitStop <= 0 && acc >= STEP && steps < Math.min(48, 8 * qaRate)) {
    try {
      step(race, STEP, steps === 0 ? wish : { x: wish.x, z: wish.z, jump: false, dive: false, grab: false, holdJump: wish.holdJump });
    } catch (err) {
      reportError(err);
      acc = 0;
      break;
    }
    acc -= STEP;
    steps++;
  }
  if (steps > clock.stepsMax) clock.stepsMax = steps;
  crackMute = Math.max(0, crackMute - dt);
  if (race.phase === "race" && race.player.grounded && Math.hypot(race.player.vel.x, race.player.vel.z) > 2.2) {
    stepMute -= dt;
    if (stepMute <= 0) {
      audio.play("land", 0.1, 0.02);
      stepMute = 0.32;
    }
  }
  handleEvents();
  const dist = race.player.pos.z - race.collapseZ;
  const rumble = race.phase === "race" ? Math.max(0, Math.min(1, 1 - dist / 36)) : (race.phase === "launch" ? 0.4 : 0);
  audio.setRumble(rumble * cfg.rumbleMax);
  if (!qualityDropped && !params.get("dpr") && fps > 0 && fps < 24 && race.time > 5 && world.setDpr) {
    qualityDropped = true;
    world.setDpr(1);
    if (world.setPost && params.get("post") !== "1") world.setPost(false);
  }
  if (window.__sbOverview) raw.overview = window.__sbOverview;
  race.interp = acc;
  try {
    world.update(race, dt, raw);
    world.render();
    updateHud(dt);
  } catch (err) {
    reportError(err);
  }
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
window.addEventListener("resize", () => world && world.resize());
document.addEventListener("visibilitychange", () => {
  if (document.hidden && audio.ctx) audio.ctx.suspend();
  else if (audio.ctx) audio.ctx.resume();
});

requestAnimationFrame(frame);
