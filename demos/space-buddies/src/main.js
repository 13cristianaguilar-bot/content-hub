import { COLORS, resolveConfig } from "./config.js";
import { createCourse, groundAt, courseScale, solidStart } from "./course.js";
import { recordRun } from "./board.js";
import { createRace, paceCollapse, resetRace, step } from "./sim.js";
import { createWorld } from "./world.js";
import { createAudio } from "./audio.js";
import { audioAudible, cueFor, muteIcon, muteLabel, playerOnlyCue } from "./audio-prefs.js";
import { createInput } from "./input.js";
import { cameraWish, yawFromCamera } from "./steer.js";
import { hideControls, hudStatus, placeLabel, resultBoard, resultReason, showCoach } from "./place.js";
import { detailOn, loadAccess, saveAccess } from "./look.js";
import { botWish } from "./bot.js";
import { cineDuration, skipCine } from "./cine.js";

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
const Z = (z) => z * courseScale(cfg.quick);
const gate = (z, y, rx) => ({ x: 0, z: Z(z), rx: rx || 5, rz: 1.5, y });
const PLANS = [
  [
    { name: "ROUND 1", sub: "12 QUALIFY", qualify: 12, seconds: 72, startZ: Z(22), finishZ: Z(158), gate: gate(158, 0.25, 5) },
    { name: "ROUND 2", sub: "ROLLER RAMP", qualify: 8, seconds: 52, startZ: Z(148), finishZ: Z(236), gate: gate(236, 5.2, 5), mix: "rollers" },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, seconds: 64, startZ: Z(170), ship: true },
  ],
  [
    { name: "SKY HEAT", sub: "12 QUALIFY", qualify: 12, seconds: 72, startZ: Z(176), finishZ: Z(264), gate: gate(264, 3.3, 12) },
    { name: "THE CLIMB", sub: "8 QUALIFY", qualify: 8, seconds: 42, startZ: Z(300), finishZ: Z(356), gate: gate(356, 8, 4.5) },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, seconds: 64, startZ: Z(250), ship: true },
  ],
  [
    { name: "SURVIVAL", sub: "LAST 8 STANDING", qualify: 8, seconds: 50, startZ: Z(22), kind: "survival" },
    { name: "CROWN", sub: "HOLD THE CROWN", qualify: 8, seconds: 56, startZ: Z(176), kind: "crown", crown: { x: 0, z: Z(210), y: 5.6, r: 4.4 } },
    { name: "FINAL", sub: "8 SEATS ON THE SHIP", qualify: 8, seconds: 64, startZ: Z(170), ship: true },
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
window.__sbAudio = () => {
  const prefs = audio.prefs();
  return {
    state: audio.ctx && audio.ctx.state,
    bed: audio.playing,
    music: audio.musicOn,
    muted: prefs.muted,
    musicOn: prefs.music,
    sfx: prefs.sfx,
    haptics: prefs.haptics,
    icon: muteIcon(prefs),
  };
};
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
let cine = null;
let afterCine = null;
let cineArm = 0;
const cineOn = !cfg.auto && !params.get("bot") && !params.get("qa");
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
  paintAccess();
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
  title.classList.add("hide");
  lobby.hidden = true;
  race.player.color = pickColor;
  saveLook();
  if (world.applyLook) world.applyLook(pickColor, pickGear);
  introLeft = cineOn ? 0 : 0.2;
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
    project: (x, y, z) => (world.project ? world.project(x, y, z) : null),
    flat: () => (world.frameFlat ? world.frameFlat() : 0),
    ground: (x, z) => groundAt(course, x, z),
    get dpr() { return world && world.dpr; },
    get post() { return world && world.post; },
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
  window.__sbAudio = () => {
  const prefs = audio.prefs();
  return {
    state: audio.ctx && audio.ctx.state,
    bed: audio.playing,
    music: audio.musicOn,
    bedOn: audio.bedOn,
    rumbleOn: audio.rumbleOn,
    beds: audio.bedInstances ? audio.bedInstances() : 0,
    muted: prefs.muted,
    musicOn: prefs.music,
    sfx: prefs.sfx,
    haptics: prefs.haptics,
    icon: muteIcon(prefs),
  };
};
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
  const fullSeconds = p.seconds || cfg.raceSeconds;
  race.roundSeconds = cfg.quick ? Math.max(18, Math.round(fullSeconds * 0.62)) : fullSeconds;
  const startZ = solidStart(course, p.startZ, p.kind === "survival" ? 26 : 3.6);
  p.startZ = startZ;
  const endZ = p.gate ? p.gate.z : (p.ship ? course.ship.z - 12 : startZ + (p.kind === "survival" ? 28 : 70));
  const span = Math.max(12, endZ - (startZ - 8));
  const tail = cfg.maxSpeed * (planet === 1 && race.kind === "gate" ? 0.72 : 0.7);
  const threat = !cfg.quick && race.kind === "gate" ? Math.max(span / (span / (cfg.maxSpeed * 0.92) + 6), tail) : 0;
  const pace = paceCollapse(startZ, endZ, race.roundSeconds, cfg.quick ? 2.5 : 2, threat);
  race.collapseZ = pace.collapseZ;
  race.collapseStop = pace.collapseStop;
  race.collapseSpeed = pace.collapseSpeed * (planet === 3 ? 1.12 : planet === 2 ? 1.04 : 1);
  race.cfg.collapseDelay = cfg.quick ? 2.5 : (race.kind === "gate" ? 1.2 : 4);
  race.windMul = planet === 2 ? 1.12 : planet === 3 ? 0.85 : 1;
  race.planetN = planet;
  if (planet === 2) {
    for (const roller of race.rollers) roller.speed *= roller.planetTuned ? 1 : 1.3;
    for (const plat of race.platforms) {
      if (plat.axis === "x" && !plat.planetTuned) plat.amp *= 1.18;
      plat.planetTuned = true;
    }
    for (const roller of race.rollers) roller.planetTuned = true;
  }
  if (planet === 3) {
    for (const pdl of race.pendulums) pdl.amp = Math.min(1.25, pdl.amp * (pdl.planetTuned ? 1 : 1.18));
    for (const pdl of race.pendulums) pdl.planetTuned = true;
  }
  if (world && world.showPlanetHazards) world.showPlanetHazards(planet, p.mix);
  const g = groundAt(course, 0, startZ);
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
    if (race.kind === "survival") {
      const count = race.racers.length;
      const radius = Math.max(7.2, (count * 2.4) / (2 * Math.PI));
      const ang = Math.PI + (i / count) * Math.PI * 2;
      r.pos.x = Math.sin(ang) * radius;
      r.pos.z = startZ + 8 + Math.cos(ang) * radius;
    } else {
      r.pos.x = ((i % 5) - 2) * 1.7;
      r.pos.z = startZ + Math.floor(i / 5) * 1.2;
    }
    const foot = groundAt(course, r.pos.x, r.pos.z);
    r.pos.y = foot ? foot.y : y;
    r.vel.x = 0;
    r.vel.y = 0;
    r.vel.z = 0;
    r.lastSafe = { x: r.pos.x, y: r.pos.y, z: r.pos.z };
    r.firmSafe = { x: r.pos.x, y: r.pos.y, z: r.pos.z };
    r.cp = 0;
    r.voidTries = 0;
    r.respawnAt = null;
    r.rescue = 0;
    r.wp = 0;
    const route = (course.routes && course.routes[r.routeId]) || course.waypoints || [];
    while (r.wp < route.length - 1 && route[r.wp].z < r.pos.z - 4) r.wp++;
  });
  race.seatsFilled = 0;
  race.fallers = [];
  race.finishOrder = [];
  if (race.kind === "survival") {
    race.survival = { x: 0, z: startZ + 8, y, angle: 0.4, len: 7.2, speed: 0.7, nextDrop: 8 };
  } else race.survival = null;
  if (race.seats) race.seats = race.seats.map(() => null);
  if (world.setTheme) world.setTheme(planet);
  race.holdLaunch = cineOn ? cineDuration("launch") : 0;
  race.opened = roundIndex === 0 && cineOn;
  if (audio.setZone) audio.setZone(p.ship ? "ship" : (p.startZ > 250 ? "ice" : p.startZ > 150 ? "sky" : p.startZ > 80 ? "canyon" : "meadow"));
  paintMap(planet);
  roundKicker.textContent = "PLANET " + planet;
  roundTitle.textContent = p.name;
  roundSub.textContent = p.sub;
  roundEl.hidden = false;
  const roundBanner = roundEl.querySelector(".sb-banner");
  if (window.SBUI && roundBanner) SBUI.slam(roundBanner);
  setTimeout(() => { roundEl.hidden = true; }, 1400);
  if (roundIndex === 0) playCine("flyover");
}

function roundFocus() {
  const p = currentPlan();
  if (p.gate) return { x: p.gate.x || 0, y: p.gate.y || 1, z: p.gate.z };
  if (p.crown) return { x: p.crown.x, y: p.crown.y || 1, z: p.crown.z };
  if (p.kind === "survival") return { x: 0, y: 1, z: p.startZ + 8 };
  if (p.ship && course.ship) return { x: course.ship.x, y: course.ship.y, z: course.ship.z };
  return { x: 0, y: 1, z: p.startZ + 70 };
}

function playCine(kind, then) {
  const watchFlyover = params.get("occlude") === "1" && kind === "flyover";
  if (!cineOn && !watchFlyover) {
    if (then) then();
    return;
  }
  const chip = document.getElementById("cine-skip");
  cine = { kind, t: 0, dur: cineDuration(kind), focus: roundFocus() };
  afterCine = then || null;
  cineArm = performance.now();
  if (chip) chip.hidden = false;
  controls.hidden = true;
  if (countdownEl) countdownEl.hidden = true;
}

function finishCine() {
  const next = afterCine;
  cine = null;
  afterCine = null;
  const chip = document.getElementById("cine-skip");
  if (chip) chip.hidden = true;
  if (next) next();
}

function advanceCine(dt) {
  if (!cine) return false;
  cine.t += dt;
  if (cine.t < cine.dur) return true;
  cine.t = cine.dur;
  return false;
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
app.addEventListener("pointerdown", (e) => {
  if (!cine) return;
  if (performance.now() - cineArm < 280) return;
  if (e.target.closest("#pause, #mute, #pause-menu, #settings")) return;
  skipCine(cine);
  if (cine.kind === "launch" && race) race.launchT = Math.max(race.launchT || 0, race.holdLaunch || cine.dur);
}, true);
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

function paintAudio() {
  const prefs = audio.prefs();
  const icon = muteBtn.querySelector("img");
  if (icon) icon.src = muteIcon(prefs);
  muteBtn.setAttribute("aria-label", muteLabel(prefs));
  muteBtn.setAttribute("aria-pressed", audioAudible(prefs) ? "false" : "true");
  const hapBtn = document.getElementById("set-haptics");
  const muteRow = document.getElementById("set-mute");
  for (const id of ["set-music", "pause-music"]) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.textContent = prefs.music ? "MUSIC ON" : "MUSIC OFF";
    btn.className = "sb-btn sb-btn--block " + (prefs.music ? "sb-btn--primary" : "sb-btn--secondary");
  }
  for (const id of ["set-sfx", "pause-sfx"]) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.textContent = prefs.sfx ? "SFX ON" : "SFX OFF";
    btn.className = "sb-btn sb-btn--block " + (prefs.sfx ? "sb-btn--primary" : "sb-btn--secondary");
  }
  if (hapBtn) {
    hapBtn.textContent = prefs.haptics ? "HAPTICS ON" : "HAPTICS OFF";
    hapBtn.className = "sb-btn sb-btn--block " + (prefs.haptics ? "sb-btn--primary" : "sb-btn--secondary");
  }
  if (muteRow) {
    muteRow.textContent = prefs.muted ? "UNMUTE" : "MUTE";
    muteRow.className = "sb-btn sb-btn--block " + (prefs.muted ? "sb-btn--secondary" : "sb-btn--danger");
  }
  if (window.SBUI) window.SBUI.setHapticsMuted(!prefs.haptics);
  paintAccess();
}

function paintAccess() {
  const prefs = loadAccess(localStorage);
  const weak = world ? world.weak : false;
  const low = detailOn(prefs, weak);
  const detailBtn = document.getElementById("set-detail");
  const outlineBtn = document.getElementById("set-outline");
  const shakeBtn = document.getElementById("set-shake");
  if (detailBtn) {
    detailBtn.textContent = low ? "LOW DETAIL ON" : "LOW DETAIL OFF";
    detailBtn.className = "sb-btn sb-btn--block " + (low ? "sb-btn--primary" : "sb-btn--secondary");
  }
  if (outlineBtn) {
    outlineBtn.textContent = prefs.safeOutline ? "SAFE OUTLINE ON" : "SAFE OUTLINE OFF";
    outlineBtn.className = "sb-btn sb-btn--block " + (prefs.safeOutline ? "sb-btn--primary" : "sb-btn--secondary");
  }
  if (shakeBtn) {
    shakeBtn.textContent = prefs.reduceShake ? "LESS SHAKE ON" : "LESS SHAKE OFF";
    shakeBtn.className = "sb-btn sb-btn--block " + (prefs.reduceShake ? "sb-btn--primary" : "sb-btn--secondary");
  }
  const motionBtn = document.getElementById("pause-motion");
  if (motionBtn) {
    motionBtn.textContent = prefs.reduceShake ? "REDUCE MOTION ON" : "REDUCE MOTION OFF";
    motionBtn.className = "sb-btn sb-btn--block " + (prefs.reduceShake ? "sb-btn--primary" : "sb-btn--secondary");
  }
  document.documentElement.classList.toggle("sb-reduce-motion", !!prefs.reduceShake);
  if (!world) return;
  if (world.setDetail) world.setDetail(low);
  if (world.setSafeOutline) world.setSafeOutline(prefs.safeOutline);
  if (world.setReduceShake) world.setReduceShake(prefs.reduceShake);
}

function openSettings(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  audio.unlock();
  const panel = document.getElementById("settings");
  if (panel) panel.hidden = false;
  paintAudio();
}

function togglePause() {
  if (!started || !race || race.phase === "results") return;
  paused = !paused;
  pauseMenu.hidden = !paused;
  if (paused) tutor.hidden = true;
  audio.play(paused ? "pauseOpen" : "pauseClose");
  audio.setHeld(paused);
}
pauseBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  togglePause();
});
muteBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  audio.setMuted(!audio.muted);
  paintAudio();
});
document.getElementById("title-sound").addEventListener("pointerdown", openSettings);
document.getElementById("lobby-sound").addEventListener("pointerdown", openSettings);
document.getElementById("pause-music").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  audio.setMusic(!audio.prefs().music);
  paintAudio();
});
document.getElementById("pause-sfx").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  audio.setSfx(!audio.prefs().sfx);
  paintAudio();
});
document.getElementById("pause-motion").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const prefs = loadAccess(localStorage);
  prefs.reduceShake = !prefs.reduceShake;
  saveAccess(localStorage, prefs);
  paintAccess();
});
document.getElementById("set-close").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("settings").hidden = true;
});
document.getElementById("set-music").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  const prefs = audio.prefs();
  audio.setMusic(!prefs.music);
  paintAudio();
});
document.getElementById("set-sfx").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  const prefs = audio.prefs();
  audio.setSfx(!prefs.sfx);
  paintAudio();
});
document.getElementById("set-haptics").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const prefs = audio.prefs();
  audio.setHaptics(!prefs.haptics);
  paintAudio();
});
document.getElementById("set-detail").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const prefs = loadAccess(localStorage);
  const low = detailOn(prefs, world ? world.weak : false);
  prefs.detail = low ? "full" : "low";
  saveAccess(localStorage, prefs);
  paintAccess();
});
document.getElementById("set-outline").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const prefs = loadAccess(localStorage);
  prefs.safeOutline = !prefs.safeOutline;
  saveAccess(localStorage, prefs);
  paintAccess();
});
document.getElementById("set-shake").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const prefs = loadAccess(localStorage);
  prefs.reduceShake = !prefs.reduceShake;
  saveAccess(localStorage, prefs);
  paintAccess();
});
document.getElementById("set-mute").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  audio.unlock();
  audio.setMuted(!audio.muted);
  paintAudio();
});
paintAudio();
document.getElementById("resume").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!paused) return;
  paused = false;
  pauseMenu.hidden = true;
  audio.play("pauseClose");
  audio.setHeld(false);
});
document.getElementById("restart").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  paused = false;
  pauseMenu.hidden = true;
  alive = null;
  roundIndex = 0;
  restart();
});
document.getElementById("pause-menu-btn").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  goMenu();
});
menuBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  goMenu();
});
function commitNextRound() {
  const ids = new Set(race.racers.filter((r) => r.qualified).map((r) => r.id));
  alive = ids;
  roundIndex += 1;
  resultEl.hidden = true;
  shownResult = false;
  resetRace(race, (race.seed + 11) >>> 0);
  if (cfg.auto) race.player.useAI = true;
  applyRound();
  controls.hidden = false;
}
nextRoundBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (cine) return;
  resultEl.hidden = true;
  playCine("collapse", commitNextRound);
});
nextPlanetBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  resultEl.hidden = true;
  planetSub.textContent = "Planet " + (planet + 1) + ". The sky changes. The ship is waiting.";
  paintMap(planet + 1);
  planetEl.hidden = false;
});
function commitLand() {
  planet += 1;
  roundIndex = 0;
  alive = null;
  planetEl.hidden = true;
  shownResult = false;
  resetRace(race, (race.seed + 21) >>> 0);
  if (cfg.auto) race.player.useAI = true;
  applyRound();
  controls.hidden = false;
}
document.getElementById("land").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (cine) return;
  planetEl.hidden = true;
  playCine("collapse", commitLand);
});
function goMenu() {
  paused = false;
  pauseMenu.hidden = true;
  document.getElementById("settings").hidden = true;
  planetEl.hidden = true;
  started = false;
  audio.syncPhase("menu");
  audio.setHeld(false);
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
  if (planet >= 3 && race && race.result === "escaped") {
    planet = 1;
    roundIndex = 0;
    alive = null;
  }
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
  applyRound();
  if (world.snapBehind) world.snapBehind();
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
  const escaped = race.result === "escaped" || (race.shipRound && race.racers.some((r) => r.seated));
  const rows = [];
  const seen = new Set();
  const pool = race.racers.filter((r) => (escaped ? r.seated && r.seatIndex >= 0 : race.result !== "out" || !r.isPlayer));
  pool.sort((a, b) => {
    if (escaped) return a.seatIndex - b.seatIndex;
    const score = (r) => (r.seated ? 4000 : 0) + (r.qualified ? 2000 : 0) + (r.eliminated ? -1000 : 0) + r.pos.z;
    return score(b) - score(a);
  });
  for (const r of pool) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    rows.push(r);
  }
  for (let i = 0; i < 3; i++) {
    const el = document.getElementById("pod-" + (i + 1));
    const r = rows[i];
    if (!el || !r) continue;
    el.textContent = r.isPlayer ? "YOU" : "BUDDY";
    el.style.color = "#1e2440";
  }
  if (world && world.showPodium) {
    world.showPodium(rows.slice(0, 3).map((r) => ({ id: r.id, you: !!r.isPlayer })));
  }
}

document.getElementById("app").addEventListener("pointerdown", (e) => {
  audio.unlock();
  const btn = e.target.closest("button");
  if (!btn || btn.disabled) return;
  const id = btn.id;
  if (id === "resume" || id === "pause" || id === "jump" || id === "dive" || id === "grab") return;
  if (id === "menu" || id === "pause-menu-btn" || id === "set-close") audio.play("back");
  else if (id === "play" || id === "start" || id === "again" || id === "land") audio.play("confirm");
  else audio.play("tap");
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
  const limit = race.roundSeconds || cfg.raceSeconds;
  let remain = race.phase === "countdown" ? limit : Math.max(0, limit - race.time);
  if (race.phase === "race") {
    if (race.shownRemain == null || remain <= race.shownRemain + 0.001) race.shownRemain = remain;
    else remain = race.shownRemain;
  } else race.shownRemain = null;
  const label = clock(remain);
  if (timerNum && timerNum.textContent !== label) timerNum.textContent = label;
  const lowTime = race.phase === "race" && remain <= 10;
  timerEl.classList.toggle("is-low", lowTime);
  if (lowTime) {
    const sec = Math.ceil(remain);
    if (sec !== race.warnSec && sec <= 10 && sec >= 1) {
      race.warnSec = sec;
      audio.play(sec <= 3 ? "tickFinal" : "tick");
    }
  } else race.warnSec = 0;

  const placeText = placeLabel(race.player, race.racers);
  if (placeText !== race.placeHold) {
    race.placeHold = placeText;
    race.placeHoldT = 0;
  } else race.placeHoldT = (race.placeHoldT || 0) + dt;
  if (!race.placeShown || race.placeHoldT > 0.4) race.placeShown = race.placeHold;
  if (placeEl.textContent !== race.placeShown) placeEl.textContent = race.placeShown;
  const coinN = race.coins || 0;
  if (coinNum && coinNum.dataset.n !== String(coinN)) {
    coinNum.dataset.n = String(coinN);
    if (window.SBUI) SBUI.countUp(coinNum, coinN, 700);
    else coinNum.textContent = String(coinN);
  }

  const seenHint = (window.__sbHints = window.__sbHints || {});
  if (race.phase === "race" && race.player && !race.player.seated) {
    const holes = (race.course && race.course.holes) || [];
    for (let i = 0; i < holes.length && !seenHint.dive; i++) {
      const h = holes[i];
      if (!h.dive) continue;
      const dzh = h.z - race.player.pos.z;
      if (dzh > 0.4 && dzh < 8 && Math.abs(h.x - race.player.pos.x) < h.rx + 2) {
        seenHint.dive = true;
        race.hint = "DIVE ACROSS THE GAP";
        race.hintT = 2.6;
      }
    }
    const shelf = groundAt(course, race.player.pos.x, race.player.pos.z + 1.3);
    if (!seenHint.grab && shelf && shelf.y > race.player.pos.y + 1.35 && shelf.y < race.player.pos.y + 2.15) {
      seenHint.grab = true;
      race.hint = "GRAB THE LEDGE";
      race.hintT = 2.6;
    }
  }
  if (race.hintT > 0) race.hintT -= dt;
  const showTutor = showCoach(race.phase, race.player.seated, race.zoneId, race.time, cfg.auto, paused) && coachLine();
  tutor.hidden = !(showTutor || race.hintT > 0);
  if (race.hintT > 0) tutor.textContent = race.hint;
  else if (showTutor) tutor.textContent = coachLine();

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
  const seatText = hudStatus(race);
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

  const showEnd = race.phase === "results" && !(cine && cine.kind === "collapse");
  const aboard = document.getElementById("aboard");
  const waiting = started && race.player.seated && race.phase === "race";
  controls.hidden = hideControls(race.phase, race.player.seated, started, race.player.eliminated);
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
    resultKicker.textContent = "PLANET " + planet + " · " + currentPlan().name;
    const finale = planet >= 3 && kind === "escaped";
    nextRoundBtn.hidden = kind !== "qualified";
    nextPlanetBtn.hidden = kind !== "escaped" || finale;
    againBtn.hidden = (kind === "qualified" || kind === "escaped") && !finale;
    const banner = document.getElementById("result-banner");
    if (kind === "qualified") {
      resultTitle.textContent = "YOU QUALIFIED!";
      resultSub.textContent = currentPlan().name + " CLEARED";
      if (banner) banner.src = "ui/svg/banner_qualified.svg";
      if (window.SBUI) SBUI.confetti(48);
    } else if (kind === "escaped") {
      resultTitle.textContent = planet >= 3 ? "SHOW COMPLETE!" : "YOU ESCAPED!";
      resultSub.textContent = planet >= 3 ? "YOU FINISHED ALL 3 PLANETS" : "SEAT " + (race.player.seatIndex + 1) + " OF 8";
      if (planet >= 3) againBtn.textContent = "PLAY AGAIN";
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
    const board = resultBoard(race);
    const placeLine = document.getElementById("result-place");
    if (placeLine) {
      const earned = kind === "qualified" || kind === "escaped";
      placeLine.hidden = !earned;
      if (kind === "escaped" && race.player && race.player.seatIndex >= 0) {
        placeLine.textContent = "YOU TOOK SEAT " + (race.player.seatIndex + 1);
      } else {
        placeLine.textContent = earned ? "YOU PLACED " + board.place : "";
      }
    }
    const names = document.getElementById("result-names");
    if (names) {
      names.replaceChildren();
      for (const name of board.names) {
        const li = document.createElement("li");
        li.textContent = name;
        if (name === "YOU") li.className = "you";
        names.appendChild(li);
      }
      if (board.extra) {
        const li = document.createElement("li");
        li.textContent = "+" + board.extra;
        names.appendChild(li);
      }
    }
    const ran = clock(race.time || 0);
    const left = clock(Math.max(0, (race.roundSeconds || cfg.raceSeconds) - (race.time || 0)));
    const fell = (race.fallers || []).join(", ");
    const coins = race.coins || 0;
    resultTime.textContent = "TIME " + ran + " · LEFT " + left + " · " + coins + (coins === 1 ? " COIN" : " COINS") + " · PLANET " + planet;
    if (fell && kind === "out") resultSub.textContent = fell + " FELL";
    const reason = document.getElementById("result-reason");
    if (reason) reason.textContent = resultReason(race);
  }
  if (!showEnd) shownResult = false;
  if (hud) hud.hidden = !started || !!showEnd;
  const arrow = document.getElementById("ship-arrow");
  if (arrow && world && course && course.ship && race && race.player) {
    const ship = course.ship;
    const yaw = world.yaw || 0;
    const dx = ship.x - race.player.pos.x;
    const dz = ship.z - race.player.pos.z;
    const seen = world.project ? world.project(ship.x, ship.y + 2, ship.z) : null;
    const onScreen = !!(seen && seen.w > 0 && Math.abs(seen.x) < 0.92 && Math.abs(seen.y) < 0.92);
    const show = started && race.shipRound && race.phase === "race" && !paused && !onScreen && dx * dx + dz * dz > 64;
    arrow.hidden = !show;
    if (show) {
      const fwd = dx * -Math.sin(yaw) + dz * Math.cos(yaw);
      const right = dx * -Math.cos(yaw) + dz * -Math.sin(yaw);
      const ang = Math.atan2(right, fwd);
      arrow.style.transform = "rotate(" + ang.toFixed(3) + "rad)";
    }
  }
}

const COACH_KEY = "space-buddies-coach";
const COACH_STEPS = [
  { id: "move", text: "DRAG THE LEFT SIDE TO RUN" },
  { id: "look", text: "DRAG THE RIGHT SIDE TO LOOK" },
  { id: "jump", text: "JUMP AND DIVE" },
];
const coachSave = (() => {
  try { return JSON.parse(localStorage.getItem(COACH_KEY) || "{}"); } catch (err) { return {}; }
})();
let coachIdle = 0;
let coachShown = "";

function coachLine() {
  if (coachSave.gaveUp || params.get("bot")) return "";
  const step = COACH_STEPS.find((s) => !coachSave[s.id]);
  if (!step) return "";
  if (coachShown !== step.id) {
    coachShown = step.id;
    coachIdle = 0;
    audio.play("tutorPrompt", 0.2);
  }
  return step.text;
}

function noteCoach(kind) {
  if (coachSave[kind] || coachSave.gaveUp || params.get("bot")) return;
  const step = COACH_STEPS.find((s) => !coachSave[s.id]);
  if (!step || step.id !== kind) return;
  coachSave[kind] = true;
  coachShown = "";
  coachIdle = 0;
  audio.play("tutorDone", 0.2);
  try { localStorage.setItem(COACH_KEY, JSON.stringify(coachSave)); } catch (err) { /* private mode */ }
}

function tickCoach(dt, raw) {
  if (!race || !race.player || !showCoach(race.phase, race.player.seated, race.zoneId, race.time, cfg.auto, paused)) return;
  if (!coachLine()) return;
  coachIdle += dt;
  if (coachIdle > 12) {
    coachSave.gaveUp = true;
    coachShown = "";
    return;
  }
  if (Math.hypot(raw.stickX || 0, raw.stickY || 0) > 0.22) noteCoach("move");
  if (Math.abs(raw.lookDx || 0) > 4 || Math.abs(raw.lookDy || 0) > 4) noteCoach("look");
  if (raw.jump) noteCoach("jump");
}

function hapticFeel(e) {
  if (!window.SBUI || !navigator.vibrate) return;
  if (e.t === "jump" && e.id === 0) window.SBUI.haptic("light");
  else if (e.t === "land" && e.id === 0 && e.impact > 3) window.SBUI.haptic("light");
  else if (e.t === "dive" && e.id === 0) window.SBUI.haptic("light");
  else if (e.t === "bump" && e.id === 0) window.SBUI.haptic("medium");
  else if (e.t === "coin") window.SBUI.haptic("light");
  else if (e.t === "qualify" && e.id === 0) window.SBUI.haptic("success");
  else if (e.t === "eliminated") window.SBUI.haptic("fail");
  else if (e.t === "go") window.SBUI.haptic("medium");
  else if (e.t === "fall" && e.id === 0) window.SBUI.haptic("medium");
}

function handleEvents() {
  let cracked = false;
  const launchNow = race.events.some((e) => e.t === "launch");
  for (const e of race.events) {
    const cue = cueFor(e);
    let gain = 1;
    let skip = e.t === "crack" || e.t === "drop" || (playerOnlyCue(e) && e.id !== 0) || (e.t === "land" && !(e.impact > 3));
    if (e.t === "bump" && e.id !== 0 && e.x != null && race.player) {
      const dist = Math.hypot(e.x - race.player.pos.x, e.z - race.player.pos.z);
      if (dist > 20) skip = true;
      else gain = Math.max(0.18, 1 - dist / 20);
    }
    if (e.t === "launch") {
      skip = true;
      audio.duckFor(2200);
      setTimeout(() => audio.play("launch"), 520);
    }
    if (e.t === "escaped" && launchNow) {
      skip = true;
      setTimeout(() => audio.play("escaped"), 1550);
    }
    if (cue && !skip) audio.play(cue, 0.05, gain);
    hapticFeel(e);
    if (e.t === "qualify" && e.id === 0) {
      race.slowMo = 0.45;
      race.popConfetti = (race.popConfetti || 0) + 1;
    }
    else if (e.t === "respawn" && e.fade && fadeEl) {
      fadeEl.classList.add("on");
      setTimeout(() => fadeEl.classList.remove("on"), 200);
    }
    else if (e.t === "bump") {
      if (e.id === 0 && e.big) hitStop = 0.08;
    } else if (e.t === "crack") {
      if (e.x == null || !race.player) continue;
      const dist = Math.hypot(e.x - race.player.pos.x, e.z - race.player.pos.z);
      if (dist < 18) cracked = true;
    } else if (e.t === "drop") {
      const dist = e.z == null || !race.player ? 0 : Math.abs(e.z - race.player.pos.z);
      if (dist < 20) audio.play("crack", 0.45);
    } else if (e.t === "seat") {
      const dot = seatsEl.children[e.seat];
      if (dot) {
        dot.classList.add("pop");
        setTimeout(() => dot.classList.remove("pop"), 400);
      }
      if (e.id === 0) {
        showToast("SEAT " + (e.seat + 1) + " LOCKED");
      }
    } else if (e.t === "checkpoint" && e.name && e.name !== "START") showToast("CHECKPOINT");
    else if (e.t === "heatfull") showToast("QUALIFICATION OVER");
    else if (e.t === "qualify") race.gateCheer = 0.5;
    else if (e.t === "respawn" && e.id === 0 && world.snapBehind) world.snapBehind();
    else if (e.t === "zone") showZone(e.name);
    else if (e.t === "error") reportError(e.message);
  }
  if (cracked && crackMute <= 0) {
    audio.play("crumble", 0.34);
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
  if (document.hidden) {
    if (!hiddenAt) hiddenAt = now;
    if (now - hiddenAt > 450) pauseForRealHide();
    if (paused && world) {
      try {
        world.update(race, 0, { stickX: 0, stickY: 0, lookDx: 0, lookDy: 0 });
        world.render();
      } catch (err) {
        reportError(err);
      }
    }
    return;
  }
  hiddenAt = 0;
  if (window.__sbBackground) return;
  frames++;
  if (!frame.lastWall) frame.lastWall = now;
  if (now - frame.lastWall >= 500) {
    fps = frames / ((now - frame.lastWall) / 1000);
    if (world && world.noteFps) world.noteFps(fps);
    frames = 0;
    frame.lastWall = now;
  }
  if (!world) return;
  if (!started) {
    if (!lobby.hidden && world.showBuddy) world.showBuddy(dt);
    world.render();
    return;
  }
  if (cine && cine.kind !== "launch") {
    const playing = advanceCine(dt);
    tutor.hidden = true;
    controls.hidden = true;
    try {
      world.update(race, dt, { cine, lookDx: 0, lookDy: 0, looking: false });
      world.render();
      updateHud(dt);
    } catch (err) {
      reportError(err);
    }
    if (countdownEl) countdownEl.hidden = true;
    tutor.hidden = true;
    controls.hidden = true;
    if (!playing) finishCine();
    if (cine && cine.kind !== "launch") return;
    if (playing) return;
  }
  if (cine && cine.kind === "launch") {
    if (!advanceCine(dt)) finishCine();
  } else if (cineOn && race.phase === "launch" && !cine) {
    playCine("launch");
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
    if (introLeft <= 0) {
      controls.hidden = false;
      if (world.snapBehind) world.snapBehind();
    }
    return;
  }
  const raw = input.read();
  if (race.phase === "race" && !paused) tickCoach(dt, raw);
  if (window.__sbStick) {
    raw.stickX = window.__sbStick.x;
    raw.stickY = window.__sbStick.y;
  }
  const view = world.view ? world.view() : null;
  const liveYaw = view ? yawFromCamera(view.cx, view.cz, race.player.pos.x, race.player.pos.z) : null;
  const aim = cameraWish(liveYaw == null ? world.yaw : liveYaw, raw.stickX, raw.stickY);
  const follow = 1 - Math.exp(-16 * dt);
  steer.x += (aim.x - steer.x) * follow;
  steer.z += (aim.z - steer.z) * follow;
  if (raw.pause && !escWas) togglePause();
  escWas = !!raw.pause;
  if (paused) {
    tutor.hidden = true;
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
  handleEvents();
  audio.syncPhase(race.phase);
  const dist = race.player.pos.z - race.collapseZ;
  const rumble = race.phase === "race" ? Math.max(0, Math.min(1, 1 - dist / 36)) : (race.phase === "launch" ? 0.4 : 0);
  audio.setRumble(rumble * cfg.rumbleMax);
  if (!cfg.low && !qualityDropped && !params.get("dpr") && fps > 0 && fps < 24 && race.time > 5 && world.setDpr) {
    qualityDropped = true;
    world.setDpr(1);
    if (world.setPost && params.get("post") !== "1") world.setPost(false);
  }
  if (window.__sbOverview) raw.overview = window.__sbOverview;
  if (cine) raw.cine = cine;
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
let hiddenAt = 0;
function pauseForRealHide() {
  if (!started || !race || paused) return;
  if (race.phase !== "race" && race.phase !== "countdown") return;
  if (!document.hidden) return;
  togglePause();
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    hiddenAt = performance.now();
    if (audio.ctx) audio.ctx.suspend();
    pauseForRealHide();
  } else if (audio.ctx) audio.ctx.resume();
});
window.addEventListener("pagehide", () => {
  hiddenAt = performance.now();
});
window.addEventListener("pageshow", () => {
  hiddenAt = 0;
});

requestAnimationFrame(frame);
