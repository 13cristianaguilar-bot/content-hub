import { Howl, Howler } from "howler";
import { loadAudioPrefs, normalizePrefs, saveAudioPrefs } from "./audio-prefs.js";

const BASE = "assets/audio/";

function src(name, extra) {
  const files = [BASE + name + ".ogg", BASE + name + ".mp3"];
  if (extra) files.splice(1, 0, BASE + name + extra);
  return files;
}

const SFX = {
  jump: ["sfx_jump_v2", 0.75],
  land: ["sfx_land_v2", 0.7],
  dive: ["sfx_dive", 0.8],
  hit: ["sfx_hit", 0.8],
  collect: ["sfx_collect", 0.75],
  qualify: ["sfx_qualify", 0.85],
  count3: ["sfx_countdown_3", 0.8],
  count2: ["sfx_countdown_2", 0.8],
  count1: ["sfx_countdown_1", 0.8],
  go: ["sfx_countdown_go_v2", 0.88],
  launch: ["sfx_ship_launch_v2", 0.8],
  tap: ["ui_tap_v2", 0.55],
  back: ["ui_back", 0.55],
  confirm: ["ui_confirm_v2", 0.62],
  eliminated: ["sfx_eliminated", 0.8],
  crumble: ["sfx_tile_crumble", 0.72],
  seat: ["sfx_seat_filled", 0.75],
  last: ["sfx_last_seat_alert", 0.8],
  crack: ["sfx_ground_crack", 0.75],
  escaped: ["jingle_escaped", 0.85],
};

const DUCK = { qualify: true, go: true, launch: true, eliminated: true, escaped: true };
const MUSIC_VOL = 0.35;
const BED_VOL = 0.22;

export function createAudio() {
  const prefs = loadAudioPrefs(window.localStorage || { getItem() { return null; }, setItem() {} });
  const cues = {};
  Object.keys(SFX).forEach((key) => {
    const [name, volume] = SFX[key];
    cues[key] = new Howl({ src: src(name), volume, preload: true });
  });
  const music = new Howl({
    src: src("music_race_loop", ".m4a"),
    loop: true,
    volume: MUSIC_VOL,
    html5: false,
    preload: true,
  });
  const bed = new Howl({
    src: src("amb_planet_bed_loop"),
    loop: true,
    volume: BED_VOL,
    html5: false,
    preload: true,
  });
  const rumble = new Howl({
    src: src("amb_collapse_rumble_loop"),
    loop: true,
    volume: 0,
    html5: false,
    preload: true,
  });
  const last = {};
  let unlocked = false;
  let raceOn = false;
  let held = false;
  let duckTimer = 0;

  function apply() {
    const hearMusic = !prefs.muted && prefs.music;
    const hearSfx = !prefs.muted && prefs.sfx;
    music.mute(!hearMusic);
    bed.mute(!hearMusic);
    rumble.mute(!hearMusic);
    Object.keys(cues).forEach((key) => cues[key].mute(!hearSfx));
    if (window.SBUI) window.SBUI.setHapticsMuted(!prefs.haptics);
  }

  function persist(patch) {
    Object.assign(prefs, normalizePrefs(Object.assign({}, prefs, patch)));
    saveAudioPrefs(window.localStorage, prefs);
    apply();
  }

  function resumeCtx() {
    const ctx = Howler.ctx;
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  function unlock() {
    unlocked = true;
    if (!held) {
      if (raceOn) {
        if (!music.playing()) music.play();
      } else if (!bed.playing()) bed.play();
    }
    resumeCtx();
  }

  function startBeds() {
    if (raceOn || held) return;
    if (unlocked && !bed.playing()) bed.play();
    resumeCtx();
  }

  function syncPhase(phase) {
    const racing = phase === "race" || phase === "launch";
    if (racing === raceOn) return;
    raceOn = racing;
    if (held || !unlocked) return;
    if (racing) {
      if (bed.playing()) bed.pause();
      if (!music.playing()) music.play();
      music.volume(MUSIC_VOL);
    } else {
      if (music.playing()) music.pause();
      if (!bed.playing()) bed.play();
    }
  }

  function setHeld(on) {
    held = !!on;
    if (held) {
      if (music.playing()) music.pause();
      if (bed.playing()) bed.pause();
      if (rumble.playing()) rumble.pause();
      return;
    }
    if (!unlocked) return;
    if (raceOn) {
      if (!music.playing()) music.play();
    } else if (!bed.playing()) bed.play();
  }

  function setRumble(value) {
    const vol = Math.max(0, Math.min(0.3, value || 0));
    rumble.volume(vol);
    if (!unlocked || held || !raceOn) return;
    if (vol > 0.02 && !rumble.playing()) rumble.play();
    if (vol <= 0.02 && rumble.playing()) rumble.pause();
  }

  function play(name, gap = 0.05) {
    const cue = cues[name];
    if (!cue) return;
    const now = Howler.ctx ? Howler.ctx.currentTime : performance.now() / 1000;
    if (last[name] && now - last[name] < gap) return;
    last[name] = now;
    cue.play();
    if (DUCK[name] && prefs.music && !prefs.muted) {
      music.fade(music.volume() || MUSIC_VOL, 0.12, 120);
      clearTimeout(duckTimer);
      duckTimer = setTimeout(() => {
        if (!prefs.muted && prefs.music) music.fade(0.12, MUSIC_VOL, 280);
      }, 700);
    }
  }

  function load() {
    const all = [music, bed, rumble].concat(Object.keys(cues).map((key) => cues[key]));
    return Promise.all(all.map((howl) => new Promise((resolve) => {
      if (howl.state() === "loaded") resolve();
      else {
        howl.once("load", () => resolve());
        howl.once("loaderror", () => resolve());
      }
    })));
  }

  apply();

  return {
    load,
    unlock,
    startBeds,
    syncPhase,
    setHeld,
    setRumble,
    play,
    setMuted(on) { persist({ muted: !!on }); },
    setMusic(on) { persist({ music: !!on }); },
    setSfx(on) { persist({ sfx: !!on }); },
    setHaptics(on) { persist({ haptics: !!on }); },
    prefs() { return Object.assign({}, prefs); },
    setZone() {},
    get ctx() { return Howler.ctx || null; },
    get muted() { return prefs.muted; },
    get playing() { return music.playing() || bed.playing(); },
    get musicOn() { return music.playing(); },
  };
}
