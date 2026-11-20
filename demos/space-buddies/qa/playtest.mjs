// Headless playtest. Phone 390x844 touch DPR 3, plus 1280x800 landscape.
// A bot follows the course. Adversarial jobs hug walls, leave the pads, stand still,
// spam jump/dive, reverse, pinch, pause, background, and rotate.

import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "qa");
const shotDir = path.join(outDir, "shots");
const base = process.env.SB_URL || "http://127.0.0.1:8765/index.html";
const workers = Math.max(1, Number(process.env.SB_WORKERS) || 3);
const shotOnly = process.argv.includes("--shot");

const PHONE = { name: "phone", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const LAND = { name: "land", viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false };

function contextOptions(spec) {
  return {
    viewport: spec.viewport,
    deviceScaleFactor: spec.deviceScaleFactor,
    isMobile: spec.isMobile,
    hasTouch: spec.hasTouch,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jobUrl(job) {
  const q = new URLSearchParams();
  q.set("seed", String(job.seed));
  q.set("quick", "1");
  q.set("nopost", "1");
  q.set("planet", String(job.planet || 1));
  q.set("round", String(job.round || 0));
  if (job.bot) q.set("bot", job.bot);
  if (job.qa) q.set("qa", String(job.qa));
  return base + "?" + q.toString();
}

async function sample(page) {
  return page.evaluate(() => {
    const sb = window.__sb;
    const visible = (id) => {
      const el = document.getElementById(id);
      if (!el || el.hidden) return null;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return null;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return null;
      return { id, x: r.x, y: r.y, w: r.width, h: r.height };
    };
    const ids = ["timer", "place", "seats", "pause", "mute", "coins", "jump", "dive", "grab", "aboard", "tutor", "controls"];
    const boxes = {};
    for (const id of ids) boxes[id] = visible(id);
    const audio = window.__sbAudio ? window.__sbAudio() : null;
    if (!sb || !sb.race) {
      return {
        ready: false,
        title: !document.getElementById("title").classList.contains("hide"),
        lobby: !document.getElementById("lobby").hidden,
        play: document.getElementById("play").textContent,
        boxes,
        audio,
      };
    }
    const r = sb.race;
    const p = r.player;
    const view = sb.view ? sb.view() : null;
    const g = sb.ground ? sb.ground(p.pos.x, p.pos.z) : null;
    let renderer = "";
    try {
      const gl = document.getElementById("view").getContext("webgl2") || document.getElementById("view").getContext("webgl");
      if (gl) {
        const info = gl.getExtension("WEBGL_debug_renderer_info");
        renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : "";
      }
    } catch (err) { /* ignore */ }
    return {
      ready: true,
      phase: r.phase,
      time: r.time,
      result: r.result,
      kind: r.kind,
      x: p.pos.x,
      y: p.pos.y,
      z: p.pos.z,
      vx: p.vel.x,
      vy: p.vel.y,
      vz: p.vel.z,
      qual: !!p.qualified,
      seated: !!p.seated,
      seat: p.seatIndex,
      seatCine: r.seatCine || 0,
      eliminated: !!p.eliminated,
      fps: sb.fps,
      place: document.getElementById("place").textContent,
      controlsHidden: document.getElementById("controls").hidden,
      tutorHidden: document.getElementById("tutor").hidden,
      title: !document.getElementById("title").classList.contains("hide"),
      lobby: !document.getElementById("lobby").hidden,
      resultHidden: document.getElementById("result").hidden,
      againHidden: document.getElementById("again").hidden,
      nextHidden: document.getElementById("next-round").hidden,
      planetHidden: document.getElementById("next-planet").hidden,
      pauseHidden: document.getElementById("pause-menu").hidden,
      planetScreen: !document.getElementById("planet").hidden,
      gate: r.gate ? { x: r.gate.x, z: r.gate.z, rx: r.gate.rx || 4.5, rz: r.gate.rz || 1.4 } : null,
      ground: g ? g.y : null,
      support: sb.supports ? sb.supports(p.pos.x, p.pos.y, p.pos.z) : null,
      grounded: !!p.grounded,
      tunneled: p.tunneled || null,
      seconds: r.cfg.raceSeconds,
      view,
      boxes,
      audio,
      camErr: window.__sbCamErr || "",
      renderer,
      heap: performance.memory ? performance.memory.usedJSHeapSize : null,
      zoom: localStorage.getItem("space-buddies-zoom"),
    };
  });
}

function overlap(a, b) {
  if (!a || !b) return false;
  const x = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const y = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return x > 8 && y > 8;
}

function offscreen(box, width, height) {
  if (!box) return false;
  return box.x < -6 || box.y < -6 || box.x + box.w > width + 6 || box.y + box.h > height + 6;
}

function consider(issues, seen, issue) {
  if (seen.has(issue.code)) return;
  seen.add(issue.code);
  issues.push(issue);
}

async function shot(page, name) {
  const file = path.join(shotDir, name + ".png");
  await page.screenshot({ path: file });
  return file;
}

async function openJob(context, job, errors) {
  const page = await context.newPage();
  page.on("pageerror", (err) => errors.push(String(err && err.stack || err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto(jobUrl(job), { waitUntil: "domcontentloaded" });
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    const play = await page.locator("#play").textContent();
    if (play && play.includes("PLAY")) break;
    await sleep(200);
  }
  await page.locator("#play").click({ force: true });
  await sleep(200);
  if (job.skipLobby) {
    await page.locator("#start").click({ force: true });
  }
  return page;
}

async function waitRace(page) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const snap = await sample(page);
    if (snap.ready && snap.phase === "race" && snap.time > 0.4) return snap;
    await sleep(150);
  }
  return sample(page);
}

function classifyConsole(text) {
  const lower = text.toLowerCase();
  if (lower.includes("favicon")) return null;
  if (lower.includes("audiocontext") || lower.includes("autoplay") || lower.includes("notallowederror")) return { code: "audio", severity: "P3", detail: text.slice(0, 180) };
  if (lower.includes("decode") || lower.includes("failed to load") && lower.includes("audio")) return { code: "audio", severity: "P2", detail: text.slice(0, 180) };
  return { code: "console", severity: "P0", detail: text.slice(0, 220) };
}

async function playRound(context, job) {
  const errors = [];
  const issues = [];
  const seen = new Set();
  const page = await openJob(context, job, errors);
  if (!job.skipLobby) await page.locator("#start").click({ force: true });
  let snap = await waitRace(page);
  const width = job.viewport.viewport.width;
  const height = job.viewport.viewport.height;
  let progressZ = snap.z || 0;
  let progressAt = snap.time || 0;
  let lowSince = null;
  let gateNear = false;
  let fpsLow = 0;
  let fpsSamples = 0;
  const wallDeadline = Date.now() + (job.wallMs || 90000);
  let heap0 = snap.heap;
  while (Date.now() < wallDeadline) {
    snap = await sample(page);
    if (!snap.ready) {
      consider(issues, seen, { code: "softlock", severity: "P0", detail: "race handle disappeared" });
      break;
    }
    const finite = [snap.x, snap.y, snap.z, snap.vx, snap.vy, snap.vz].every(Number.isFinite);
    if (!finite) consider(issues, seen, { code: "nan", severity: "P0", detail: "position or velocity is NaN" });
    if (snap.camErr) consider(issues, seen, { code: "console", severity: "P0", detail: snap.camErr.slice(0, 180) });
    if (snap.phase === "race" && snap.tunneled) {
      consider(issues, seen, { code: "fall", severity: "P1", detail: "passed through floor " + Number(snap.tunneled).toFixed(2) + " at " + snap.x.toFixed(1) + "," + snap.z.toFixed(1) });
    }
    if (snap.phase === "race" && snap.y < -8) {
      if (lowSince == null) lowSince = snap.time;
      if (snap.time - lowSince > 3) consider(issues, seen, { code: "oob", severity: "P1", detail: "stayed below the course at y " + snap.y.toFixed(2) });
    } else lowSince = null;
    if (snap.gate && Math.abs(snap.z - snap.gate.z) < snap.gate.rz + 1.2 && Math.abs(snap.x - snap.gate.x) <= snap.gate.rx + 0.8) gateNear = true;
    if (snap.qual && snap.kind === "gate" && snap.gate && !gateNear) {
      consider(issues, seen, { code: "false-qualify", severity: "P1", detail: "qualified at z " + snap.z.toFixed(1) + " gate " + snap.gate.z.toFixed(1) });
    }
    const holdRound = snap.kind === "survival" || snap.kind === "crown";
    if (job.bot === "follow" && snap.phase === "race" && !snap.seated && !snap.eliminated && !holdRound) {
      if (snap.z > progressZ + 1.5) {
        progressZ = snap.z;
        progressAt = snap.time;
      } else if (snap.time - progressAt > 8) {
        consider(issues, seen, { code: "stuck", severity: "P1", detail: "no progress for 8s at z " + snap.z.toFixed(1) });
        progressAt = snap.time;
      }
    }
    if (snap.view && snap.phase === "race") {
      if (snap.view.minSolid < 0.12) {
        if (job._camInside) consider(issues, seen, { code: "cam-inside", severity: "P1", detail: (snap.view.solidName || "mesh") + " " + snap.view.minSolid.toFixed(2) + "m from the camera at y " + snap.view.cy.toFixed(2) });
        job._camInside = true;
      } else job._camInside = false;
      if (snap.view.floor != null && snap.view.cy < snap.view.floor + 0.15) {
        consider(issues, seen, { code: "cam-floor", severity: "P1", detail: "camera y " + snap.view.cy.toFixed(2) + " floor " + Number(snap.view.floor).toFixed(2) });
      }
    }
    if (snap.phase === "race" && snap.time > 3 && job.qa === 1 && snap.fps > 0 && snap.fps < 45) fpsLow++;
    if (snap.fps > 0) fpsSamples++;
    if (snap.seated && snap.seat >= 0 && !String(snap.place).startsWith("SEAT ")) {
      consider(issues, seen, { code: "place", severity: "P2", detail: "seated seat " + (snap.seat + 1) + " badge " + snap.place });
    }
    if (snap.seated && !snap.controlsHidden) consider(issues, seen, { code: "controls", severity: "P1", detail: "controls visible while seated" });
    if (snap.seated && !snap.tutorHidden) consider(issues, seen, { code: "controls", severity: "P2", detail: "tutorial visible while seated" });
    if ((snap.phase === "results" || snap.title) && !snap.controlsHidden) consider(issues, seen, { code: "controls", severity: "P1", detail: "controls visible on " + snap.phase });
    const live = ["timer", "place", "pause", "seats"];
    if (!snap.controlsHidden) live.push("jump", "dive");
    for (const id of live) {
      if (offscreen(snap.boxes[id], width, height)) consider(issues, seen, { code: "ui-offscreen", severity: "P2", detail: id + " outside the " + width + "x" + height + " viewport" });
    }
    if (overlap(snap.boxes.timer, snap.boxes.place)) consider(issues, seen, { code: "ui-overlap", severity: "P2", detail: "timer overlaps the place badge" });
    if (overlap(snap.boxes.seats, snap.boxes.pause)) consider(issues, seen, { code: "ui-overlap", severity: "P2", detail: "seats overlap pause" });
    if (overlap(snap.boxes.jump, snap.boxes.dive)) consider(issues, seen, { code: "ui-overlap", severity: "P2", detail: "jump overlaps dive" });
    if (snap.phase === "race" && snap.time > (snap.seconds || 46) + 3) {
      consider(issues, seen, { code: "softlock", severity: "P0", detail: "round kept going after the timer" });
      break;
    }
    if (snap.phase === "results" || snap.phase === "launch") break;
    if (job.simCap && snap.time >= job.simCap) break;
    await sleep(job.poll || 200);
  }
  snap = await sample(page);
  if (snap.ready && snap.phase === "results") {
    const canContinue = !snap.againHidden || !snap.nextHidden || !snap.planetHidden;
    if (!canContinue) consider(issues, seen, { code: "softlock", severity: "P0", detail: "results screen has no continue button" });
  }
  if (job.expect === "out") {
    if (snap.qual || snap.seated || snap.result === "qualified" || snap.result === "escaped") {
      consider(issues, seen, { code: "false-qualify", severity: "P1", detail: job.bot + " ended " + snap.result + " qual " + snap.qual });
    }
  }
  for (const text of errors) {
    const issue = classifyConsole(text);
    if (issue) consider(issues, seen, issue);
  }
  const hard = issues.some((issue) => issue.severity === "P0" || issue.severity === "P1" || issue.severity === "P2");
  let file = null;
  if (hard || job.capture) file = await shot(page, job.name);
  const renderer = snap.renderer || "";
  const swift = /swiftshader|llvmpipe|softpipe/i.test(renderer);
  if (fpsLow > 3) {
    consider(issues, seen, {
      code: "fps",
      severity: swift || job.qa !== 1 ? "P3" : "P2",
      detail: fpsLow + " samples under 45 (" + renderer.slice(0, 80) + ")",
    });
  }
  const report = {
    name: job.name,
    planet: job.planet,
    round: job.round,
    seed: job.seed,
    bot: job.bot,
    viewport: job.viewport.name,
    phase: snap.phase,
    result: snap.result,
    time: snap.time,
    z: snap.z,
    qual: snap.qual,
    seated: snap.seated,
    place: snap.place,
    fpsLow,
    fpsSamples,
    renderer,
    heap0,
    heap1: snap.heap,
    issues,
    shot: file,
  };
  await page.close();
  return report;
}

async function flow(context, viewport) {
  const errors = [];
  const issues = [];
  const seen = new Set();
  const job = { name: "flow-" + viewport.name, planet: 1, round: 2, seed: 4, bot: "follow", qa: 4, viewport, wallMs: 90000, skipLobby: false };
  const page = await openJob(context, job, errors);
  let snap = await sample(page);
  if (snap.title !== true && snap.lobby !== true) consider(issues, seen, { code: "softlock", severity: "P0", detail: "title did not open the lobby" });
  if (snap.lobby) {
    const colors = page.locator("#colors button");
    const gear = page.locator("#gear button");
    if (await colors.count()) await colors.nth(2).click({ force: true });
    if (await gear.count()) await gear.nth(1).click({ force: true });
  } else consider(issues, seen, { code: "softlock", severity: "P1", detail: "locker did not open" });
  await page.locator("#start").click({ force: true });
  snap = await waitRace(page);
  if (!snap.ready || snap.phase !== "race") consider(issues, seen, { code: "softlock", severity: "P0", detail: "start did not enter a round" });
  const deadline = Date.now() + 80000;
  while (Date.now() < deadline) {
    snap = await sample(page);
    if (snap.seated || snap.phase === "results" || snap.phase === "launch") break;
    await sleep(250);
  }
  if (snap.phase === "race" && !snap.seated) {
    await page.evaluate(() => {
      const r = window.__sb.race;
      r.player.seated = true;
      r.player.seatIndex = 0;
      r.seatsFilled = Math.max(1, r.seatsFilled);
      r.phase = "race";
      r.seatCine = 0;
    });
  }
  const cineDeadline = Date.now() + 6000;
  while (Date.now() < cineDeadline) {
    snap = await sample(page);
    if (!snap.seated || (snap.seatCine || 0) <= 0) break;
    await sleep(150);
  }
  await sleep(1600);
  snap = await sample(page);
  if (snap.seated && !String(snap.place).startsWith("SEAT ")) {
    consider(issues, seen, { code: "place", severity: "P2", detail: "flow badge " + snap.place });
  }
  if (snap.seated && snap.view && snap.view.spectate) {
    const spec = snap.view.spectate;
    if (spec.back < 10 || spec.back > 14) consider(issues, seen, { code: "cam-close", severity: "P2", detail: "spectate back " + spec.back.toFixed(2) });
    if (spec.height < 9) consider(issues, seen, { code: "cam-close", severity: "P2", detail: "spectate height " + spec.height.toFixed(2) });
    if (spec.lookZ < spec.focusZ + 4) consider(issues, seen, { code: "cam-close", severity: "P2", detail: "spectate is not looking along the course" });
  }
  if (snap.view && snap.view.spectate && snap.view.fogNear && snap.view.fogNear < 120 && snap.seated) {
    consider(issues, seen, { code: "fog", severity: "P2", detail: "spectate fog near " + snap.view.fogNear });
  }
  if (!snap.controlsHidden && snap.seated) consider(issues, seen, { code: "controls", severity: "P1", detail: "controls up while seated in the flow" });
  const spectateShot = await shot(page, "flow-spectate-" + viewport.name);
  if (snap.seated) await page.locator("#aboard-skip").click({ force: true });
  await sleep(1200);
  snap = await sample(page);
  if (snap.phase !== "launch" && snap.phase !== "results" && snap.result !== "escaped") {
    consider(issues, seen, { code: "softlock", severity: "P1", detail: "end round did not finish, phase " + snap.phase });
  }
  const podiumWait = Date.now() + 8000;
  while (Date.now() < podiumWait) {
    snap = await sample(page);
    if (!snap.resultHidden) break;
    await sleep(200);
  }
  if (snap.resultHidden) consider(issues, seen, { code: "softlock", severity: "P1", detail: "podium did not show" });
  else await shot(page, "flow-podium-" + viewport.name);
  if (!snap.planetHidden) {
    await page.locator("#next-planet").click({ force: true });
    await sleep(400);
    snap = await sample(page);
    if (!snap.planetScreen) consider(issues, seen, { code: "softlock", severity: "P1", detail: "map did not open" });
    else await shot(page, "flow-map-" + viewport.name);
  }
  for (const text of errors) {
    const issue = classifyConsole(text);
    if (issue && issue.severity !== "P3") consider(issues, seen, issue);
  }
  await page.close();
  return { name: job.name, planet: 1, round: 2, seed: 4, bot: "flow", viewport: viewport.name, issues, shot: spectateShot, phase: snap.phase, result: snap.result };
}

async function adversarial(context, viewport, planet) {
  const reports = [];
  const modes = [
    { bot: "wall", simCap: 12, wallMs: 25000 },
    { bot: "edge", simCap: 12, wallMs: 25000 },
    { bot: "still", expect: "out", wallMs: 40000 },
    { bot: "spam", expect: "out", simCap: 14, wallMs: 25000 },
    { bot: "reverse", expect: "out", simCap: 12, wallMs: 25000 },
  ];
  for (const mode of modes) {
    reports.push(await playRound(context, {
      name: mode.bot + "-p" + planet + "-" + viewport.name,
      planet,
      round: 0,
      seed: 40 + planet,
      bot: mode.bot,
      qa: 4,
      viewport,
      simCap: mode.simCap,
      wallMs: mode.wallMs,
      expect: mode.expect,
      skipLobby: true,
    }));
  }
  const errors = [];
  const page = await openJob(context, { planet, round: 0, seed: 77, bot: "still", qa: 1, viewport, skipLobby: true }, errors);
  await waitRace(page);
  await page.evaluate(() => localStorage.setItem("space-buddies-zoom", "1"));
  await page.reload({ waitUntil: "domcontentloaded" });
  const reloaded = Date.now() + 20000;
  while (Date.now() < reloaded) {
    const play = await page.locator("#play").textContent();
    if (play && play.includes("PLAY")) break;
    await sleep(200);
  }
  await page.locator("#play").click({ force: true });
  await page.locator("#start").click({ force: true });
  await waitRace(page);
  const before = await sample(page);
  await page.evaluate(() => {
    const app = document.getElementById("app");
    const fire = (type, id, x, y) => app.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: id, clientX: x, clientY: y, pointerType: "touch", isPrimary: id === 1 }));
    fire("pointerdown", 1, 70, 420);
    fire("pointerdown", 2, 200, 420);
    fire("pointermove", 1, 40, 420);
    fire("pointermove", 2, 280, 420);
    fire("pointerup", 1, 40, 420);
    fire("pointerup", 2, 280, 420);
  });
  await sleep(300);
  const afterPinch = await sample(page);
  const issues = [];
  if (before.zoom === afterPinch.zoom) issues.push({ code: "pinch", severity: "P2", detail: "pinch left zoom at " + afterPinch.zoom });
  await page.locator("#pause").click({ force: true });
  const held = await sample(page);
  const t0 = held.time;
  await sleep(700);
  const paused = await sample(page);
  if (paused.pauseHidden) issues.push({ code: "softlock", severity: "P1", detail: "pause did not open" });
  if (paused.time > t0 + 0.2) issues.push({ code: "pause", severity: "P1", detail: "sim advanced while paused" });
  await page.locator("#resume").click({ force: true });
  await sleep(400);
  const resumed = await sample(page);
  if (!resumed.pauseHidden) issues.push({ code: "softlock", severity: "P1", detail: "resume left the pause menu up" });
  const bg0 = (await sample(page)).time;
  await page.evaluate(() => {
    window.__sbBackground = true;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await sleep(600);
  const bg = await sample(page);
  if (bg.time > bg0 + 0.35) issues.push({ code: "background", severity: "P2", detail: "sim kept running while backgrounded" });
  await page.evaluate(() => { window.__sbBackground = false; });
  await sleep(500);
  const back = await sample(page);
  if (!(back.time > bg.time)) issues.push({ code: "background", severity: "P1", detail: "sim did not resume after foreground" });
  if (viewport.name === "phone") {
    await page.setViewportSize({ width: 844, height: 390 });
    await sleep(400);
    const turned = await sample(page);
    if (![turned.x, turned.y, turned.z].every(Number.isFinite)) issues.push({ code: "nan", severity: "P0", detail: "NaN after rotate" });
    await page.setViewportSize({ width: 390, height: 844 });
    await sleep(300);
  }
  for (const text of errors) {
    const issue = classifyConsole(text);
    if (issue && issue.severity === "P0") issues.push(issue);
  }
  if (issues.length) await shot(page, "adversarial-p" + planet + "-" + viewport.name);
  await page.close();
  reports.push({ name: "input-p" + planet + "-" + viewport.name, planet, round: 0, seed: 77, bot: "input", viewport: viewport.name, issues, phase: back.phase, result: back.result });
  return reports;
}

function buildQueue() {
  const jobs = [];
  for (let planet = 1; planet <= 3; planet++) {
    for (let n = 0; n < 20; n++) {
      const round = n % 3;
      const land = n >= 17;
      jobs.push({
        name: "p" + planet + "-r" + round + "-s" + (100 + n),
        planet,
        round,
        seed: 100 + planet * 100 + n * 13,
        bot: "follow",
        qa: 4,
        viewport: land ? LAND : PHONE,
        wallMs: 70000,
        skipLobby: true,
      });
    }
  }
  return jobs;
}

async function spectateShot(context) {
  const page = await openJob(context, { planet: 1, round: 0, seed: 4, bot: "follow", qa: 4, viewport: PHONE, skipLobby: true }, []);
  await waitRace(page);
  await page.evaluate(() => {
    const r = window.__sb.race;
    r.time = Math.max(r.time, 6);
    r.player.seated = true;
    r.player.seatIndex = 0;
    r.seatsFilled = Math.max(1, r.seatsFilled);
    r.seatCine = 0;
    for (const o of r.racers) {
      if (o === r.player || o.eliminated) continue;
      o.pos.z += 16;
    }
  });
  await sleep(1800);
  const snap = await sample(page);
  const file = await shot(page, "sb-spectate-after");
  await page.close();
  return { place: snap.place, spectate: snap.view && snap.view.spectate, fog: snap.view && snap.view.fogNear, cy: snap.view && snap.view.cy, controlsHidden: snap.controlsHidden, tutorHidden: snap.tutorHidden, file };
}

async function memoryRun(context) {
  const errors = [];
  const page = await openJob(context, { planet: 1, round: 0, seed: 9, bot: "follow", qa: 4, viewport: PHONE, skipLobby: true }, errors);
  const heaps = [];
  for (let round = 0; round < 5; round++) {
    await waitRace(page);
    const start = Date.now();
    let snap = await sample(page);
    while (Date.now() - start < 18000) {
      snap = await sample(page);
      if (snap.phase === "results" || snap.phase === "launch" || (snap.time || 0) > 18) break;
      await sleep(250);
    }
    heaps.push(snap.heap);
    if (round < 4) {
      await page.evaluate(() => {
        const again = document.getElementById("again");
        const next = document.getElementById("next-round");
        const btn = again && !again.hidden ? again : next;
        if (btn) btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      });
      await sleep(600);
    }
  }
  await page.close();
  const first = heaps.find((n) => n != null);
  const last = heaps[heaps.length - 1];
  const growth = first != null && last != null ? last - first : null;
  const issues = [];
  if (growth != null && growth > 80 * 1024 * 1024) {
    issues.push({ code: "memory", severity: "P2", detail: "heap grew " + Math.round(growth / (1024 * 1024)) + "MB across 5 rounds" });
  }
  for (const text of errors) {
    const issue = classifyConsole(text);
    if (issue && issue.severity === "P0") issues.push(issue);
  }
  return { name: "memory-5", planet: 1, round: 0, seed: 9, bot: "memory", viewport: "phone", issues, heaps, phase: "memory", result: growth };
}

async function main() {
  await mkdir(shotDir, { recursive: true });
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--enable-precise-memory-info", "--disable-dev-shm-usage"],
  });
  if (shotOnly) {
    const context = await browser.newContext(contextOptions(PHONE));
    const report = await spectateShot(context);
    console.log(JSON.stringify(report, null, 2));
    await browser.close();
    return;
  }
  const queue = buildQueue();
  const limit = Number(process.env.SB_LIMIT) || 0;
  if (process.env.SB_EXTRA === "1") queue.splice(0, queue.length);
  else if (limit > 0) queue.splice(limit);
  const reports = [];
  let cursor = 0;
  async function worker() {
    while (cursor < queue.length) {
      const job = queue[cursor++];
      const context = await browser.newContext(contextOptions(job.viewport));
      try {
        const report = await playRound(context, job);
        reports.push(report);
        const bad = report.issues.filter((issue) => issue.severity === "P0" || issue.severity === "P1" || issue.severity === "P2").length;
        console.log(report.name, report.result || report.phase, "z", report.z && report.z.toFixed ? report.z.toFixed(1) : report.z, "issues", bad, report.issues.map((issue) => issue.severity + ":" + issue.code + " " + issue.detail).join(" | "));
      } catch (err) {
        reports.push({ name: job.name, planet: job.planet, seed: job.seed, issues: [{ code: "crash", severity: "P0", detail: String(err && err.stack || err).slice(0, 300) }] });
        console.log(job.name, "CRASH", err.message);
      } finally {
        await context.close();
      }
    }
  }
  await Promise.all([worker(0), worker(1), worker(2)]);
  if (limit > 0) {
    await browser.close();
    const counted = reports.filter((report) => report.issues);
    const failed = counted.filter((report) => report.issues.some((issue) => issue.severity === "P0" || issue.severity === "P1" || issue.severity === "P2"));
    console.log(JSON.stringify({ runs: counted.length, failed: failed.length }, null, 2));
    if (failed.length) process.exitCode = 1;
    return;
  }
  const phone = await browser.newContext(contextOptions(PHONE));
  const land = await browser.newContext(contextOptions(LAND));
  reports.push(await flow(phone, PHONE));
  reports.push(await flow(land, LAND));
  reports.push(...await adversarial(phone, PHONE, 1));
  reports.push(...await adversarial(phone, PHONE, 2));
  reports.push(...await adversarial(land, LAND, 3));
  reports.push(await memoryRun(phone));
  await phone.close();
  await land.close();
  await browser.close();

  const counted = reports.filter((report) => report.issues);
  const failed = counted.filter((report) => report.issues.some((issue) => issue.severity === "P0" || issue.severity === "P1" || issue.severity === "P2"));
  const summary = {
    runs: counted.length,
    passed: counted.length - failed.length,
    failed: failed.length,
    passRate: counted.length ? (counted.length - failed.length) / counted.length : 0,
    byPlanet: {},
    open: {},
  };
  for (const report of counted) {
    const key = "planet " + (report.planet || "?");
    if (!summary.byPlanet[key]) summary.byPlanet[key] = { runs: 0, passed: 0 };
    summary.byPlanet[key].runs++;
    const bad = report.issues.some((issue) => issue.severity === "P0" || issue.severity === "P1" || issue.severity === "P2");
    if (!bad) summary.byPlanet[key].passed++;
    for (const issue of report.issues) {
      if (issue.severity === "P3") continue;
      const id = issue.severity + " " + issue.code;
      summary.open[id] = (summary.open[id] || 0) + 1;
    }
  }
  const payload = { summary, reports };
  await writeFile(path.join(outDir, "last-report.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
