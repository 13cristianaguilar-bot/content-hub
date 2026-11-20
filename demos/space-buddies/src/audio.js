const FILES = {
  ui_tap: "assets/audio/ui_tap.mp3",
  ui_confirm: "assets/audio/ui_confirm.mp3",
  jump: "assets/audio/sfx_jump.mp3",
  land: "assets/audio/sfx_land.mp3",
  bump: "assets/audio/sfx_bump_boing.mp3",
  tick: "assets/audio/sfx_countdown_tick.mp3",
  go: "assets/audio/sfx_countdown_go.mp3",
  crack: "assets/audio/sfx_ground_crack.mp3",
  seat: "assets/audio/sfx_seat_filled.mp3",
  last: "assets/audio/sfx_last_seat_alert.mp3",
  launch: "assets/audio/sfx_ship_launch.mp3",
  escaped: "assets/audio/jingle_escaped.mp3",
  missed: "assets/audio/jingle_missed.mp3",
  bed: "assets/audio/amb_planet_bed_loop.mp3",
  rumble: "assets/audio/amb_collapse_rumble_loop.mp3",
};

export function createAudio() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = Ctx ? new Ctx({ latencyHint: "interactive" }) : null;
  const buffers = {};
  const last = {};
  let master;
  let bedGain;
  let rumbleGain;
  let bedSrc;
  let rumbleSrc;
  let wantBeds = false;
  let bedVol = 0;
  let muted = false;

  if (ctx) {
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    bedGain = ctx.createGain();
    bedGain.gain.value = 0;
    bedGain.connect(master);
    rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0;
    rumbleGain.connect(master);
  }

  async function load(onProgress) {
    if (!ctx) return;
    const keys = Object.keys(FILES);
    let done = 0;
    await Promise.all(keys.map(async (key) => {
      const res = await fetch(FILES[key]);
      const arr = await res.arrayBuffer();
      buffers[key] = await ctx.decodeAudioData(arr.slice(0));
      done++;
      if (onProgress) onProgress(done / keys.length);
    }));
    if (wantBeds) startBeds(bedVol);
  }

  function unlock() {
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    if (wantBeds) startBeds(bedVol);
  }

  function partyBuffer() {
    const rate = 44100;
    const seconds = 2;
    const count = rate * seconds;
    const buffer = ctx.createBuffer(1, count, rate);
    const data = buffer.getChannelData(0);
    const kick = [0, 0.5, 1, 1.5];
    const bass = [55, 55, 73, 65];
    for (let i = 0; i < count; i++) {
      const t = i / rate;
      const beat = Math.floor(t * 2);
      let sample = 0;
      for (const hit of kick) {
        const dt = t - hit;
        if (dt >= 0 && dt < 0.12) sample += Math.sin(dt * 180) * Math.exp(-dt * 28) * 0.7;
      }
      const note = bass[beat % bass.length];
      sample += Math.sin(t * note * Math.PI * 2) * 0.18 * (0.6 + 0.4 * Math.sin(t * 8));
      if ((beat % 2) === 0) {
        const hat = (t * 8) % 1;
        sample += (Math.random() * 2 - 1) * Math.exp(-hat * 40) * 0.08;
      }
      data[i] = Math.max(-1, Math.min(1, sample));
    }
    return buffer;
  }

  function startBeds(bedVolume) {
    if (!ctx) return false;
    wantBeds = true;
    bedVol = bedVolume;
    if (ctx.state === "suspended") ctx.resume();
    if (bedSrc) return true;
    bedSrc = ctx.createBufferSource();
    bedSrc.buffer = partyBuffer();
    bedSrc.loop = true;
    bedSrc.connect(bedGain);
    bedSrc.start(0);
    bedGain.gain.setTargetAtTime(bedVolume * 1.35, ctx.currentTime, 0.4);
    if (buffers.rumble && !rumbleSrc) {
      rumbleSrc = ctx.createBufferSource();
      rumbleSrc.buffer = buffers.rumble;
      rumbleSrc.loop = true;
      rumbleSrc.connect(rumbleGain);
      rumbleSrc.start(0);
    }
    return true;
  }

  function setRumble(value) {
    if (!rumbleGain || !ctx) return;
    rumbleGain.gain.setTargetAtTime(Math.max(0, Math.min(0.5, value)), ctx.currentTime, 0.2);
  }

  function flourish(kind) {
    if (!ctx || !master) return;
    const notes = kind === "win" ? [523, 659, 784, 1046] : [440, 349, 262];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === "win" ? "triangle" : "sawtooth";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.09;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(kind === "win" ? 0.07 : 0.05, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(start + 0.34);
    });
  }

  function setMuted(on) {
    muted = !!on;
    if (master) master.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.05);
  }

  function setZone(id) {
    if (!bedSrc) return;
    const rate = { meadow: 1, canyon: 0.9, sky: 1.08, ice: 0.84, climb: 1.02, ship: 1.12 }[id] || 1;
    bedSrc.playbackRate.value = rate;
  }

  function play(name, volume = 0.5, gap = 0.07) {
    if (bedGain && ctx && !muted) {
      bedGain.gain.cancelScheduledValues(ctx.currentTime);
      bedGain.gain.setTargetAtTime(bedVol * 0.28, ctx.currentTime, 0.02);
      bedGain.gain.setTargetAtTime(bedVol * 1.35, ctx.currentTime + 0.35, 0.18);
    }
    if (!ctx || !buffers[name] || muted) return;
    const now = ctx.currentTime;
    if (last[name] && now - last[name] < gap) return;
    last[name] = now;
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    src.buffer = buffers[name];
    src.connect(gain);
    gain.connect(master);
    src.start(0);
  }

  return {
    load, unlock, startBeds, setRumble, setMuted, setZone, play, flourish,
    get ctx() { return ctx; },
    get muted() { return muted; },
    get playing() { return !!bedSrc; },
  };
}
