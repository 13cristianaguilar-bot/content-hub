// Continuous kingdom terrain. The path is a curved ribbon with a grass lip
// and a rock cliff, split into chunks that can crack and fall.

const STEP = 2;
const ACROSS = 14;

const PALETTE = {
  meadow: { top: [0.32, 0.78, 0.38], lip: [0.18, 0.55, 0.28], rock: [0.48, 0.36, 0.28] },
  canyon: { top: [0.95, 0.36, 0.14], lip: [0.7, 0.18, 0.1], rock: [0.32, 0.14, 0.2] },
  sky: { top: [0.55, 0.88, 0.68], lip: [0.75, 0.92, 1], rock: [0.42, 0.36, 0.62] },
  ice: { top: [0.62, 0.92, 1], lip: [0.35, 0.78, 1], rock: [0.28, 0.48, 0.86] },
  climb: { top: [1, 0.68, 0.2], lip: [0.82, 0.38, 0.12], rock: [0.5, 0.24, 0.16] },
  ship: { top: [1, 0.9, 0.62], lip: [0.95, 0.7, 0.32], rock: [0.62, 0.4, 0.22] },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function smooth(t) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function zonesFor(len) {
  return [
    { id: "meadow", name: "MEADOW", z0: 0, z1: len * 0.16 },
    { id: "canyon", name: "LAVA CANYON", z0: len * 0.16, z1: len * 0.38 },
    { id: "sky", name: "SKY ISLANDS", z0: len * 0.38, z1: len * 0.6 },
    { id: "ice", name: "ICE SLIDE", z0: len * 0.6, z1: len * 0.76 },
    { id: "climb", name: "THE CLIMB", z0: len * 0.76, z1: len * 0.93 },
    { id: "ship", name: "ESCAPE SHIP", z0: len * 0.93, z1: len },
  ];
}

function zoneOf(zones, z) {
  let zoned = zones[0];
  for (const zone of zones) if (z >= zone.z0) zoned = zone;
  return zoned;
}

function meadowY(z) {
  return 0.7 + Math.sin(z * 0.055) * 1.35 + Math.sin(z * 0.018) * 0.65;
}

function centerX(z) {
  return Math.sin(z * 0.031) * 8.2 + Math.sin(z * 0.012) * 3.1;
}

function heightAt(z, zones) {
  const meadow = zones[0];
  const canyon = zones[1];
  const sky = zones[2];
  const ice = zones[3];
  const climb = zones[4];
  const meadowEnd = meadowY(meadow.z1);
  const canyonEnd = 6.15;
  const skyEnd = 7.7;
  const iceEnd = 1.85;
  const shipY = 11.2;
  if (z <= meadow.z1) return meadowY(z);
  if (z <= canyon.z1) {
    const u = (z - canyon.z0) / (canyon.z1 - canyon.z0);
    return lerp(meadowEnd, canyonEnd, smooth(u)) + Math.sin(z * 0.07) * 0.22 * Math.sin(u * Math.PI);
  }
  if (z <= sky.z1) {
    const u = (z - sky.z0) / (sky.z1 - sky.z0);
    return lerp(canyonEnd, skyEnd, u) + Math.sin(u * Math.PI * 2) * 0.85;
  }
  if (z <= ice.z1) {
    const u = (z - ice.z0) / (ice.z1 - ice.z0);
    return lerp(skyEnd, iceEnd, smooth(u));
  }
  if (z <= climb.z1) {
    const u = (z - climb.z0) / (climb.z1 - climb.z0);
    return lerp(iceEnd, shipY, smooth(u)) + Math.sin(z * 0.085) * 0.16 * Math.sin(u * Math.PI);
  }
  return shipY;
}

function routeAt(z, len, zones) {
  const zone = zoneOf(zones, z);
  const u = clamp((z - zone.z0) / Math.max(1, zone.z1 - zone.z0), 0, 1);
  let x = centerX(z);
  let half = 7.4;
  let gap = false;
  let ice = false;
  let conveyX = 0;
  if (zone.id === "meadow") half = 5.1;
  else if (zone.id === "canyon") {
    half = 4.7;
    const pits = [
      [zone.z0 + (zone.z1 - zone.z0) * 0.34, 5.4],
      [zone.z0 + (zone.z1 - zone.z0) * 0.62, 5.0],
    ];
    for (const [cz, w] of pits) if (Math.abs(z - cz) < w * 0.5) gap = true;
  } else if (zone.id === "sky") {
    half = 4.5;
    const gaps = [0.22, 0.48, 0.72];
    for (const g of gaps) {
      const cz = zone.z0 + (zone.z1 - zone.z0) * g;
      if (Math.abs(z - cz) < 3.15) gap = true;
    }
  } else if (zone.id === "ice") {
    half = 4.8;
    ice = true;
    conveyX = u > 0.28 && u < 0.4 ? 7 : u > 0.62 && u < 0.74 ? -7 : 0;
  } else if (zone.id === "climb") half = 4.6;
  else {
    half = 6.2;
    x *= 1 - smooth(u);
  }
  return { z, x, y: heightAt(z, zones), zone: zone.id, half, gap, ice, conveyX };
}

function buildChunkGeometry(stations) {
  const rows = stations.length;
  const positions = [];
  const colors = [];
  const indices = [];
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const st = stations[r];
    const next = stations[Math.min(rows - 1, r + 1)];
    const prev = stations[Math.max(0, r - 1)];
    const ledge = next.gap || prev.gap;
    const pal = PALETTE[st.zone] || PALETTE.meadow;
    const row = [];
    for (let c = 0; c < ACROSS; c++) {
      const latN = (c / (ACROSS - 1)) * 2 - 1;
      const visual = st.half + 2.6;
      const lat = latN * visual;
      const edge = Math.abs(lat) / st.half;
      let dy = 0;
      let col = pal.top;
      if (edge > 1) {
        const t = Math.min(1, (edge - 1) / 0.48);
        dy = -0.7 - t * t * 4.6;
        col = t > 0.45 ? [pal.rock[0] * 0.72, pal.rock[1] * 0.72, pal.rock[2] * 0.72] : pal.rock;
      } else if (edge > 0.68) {
        const t = (edge - 0.68) / 0.32;
        dy = -t * t * 0.85;
        col = t > 0.45 ? pal.rock : pal.lip;
      }
      if (ledge && (r === 0 || r === rows - 1)) dy -= 0.35;
      positions.push(st.x + lat, st.y + dy, st.z);
      colors.push(col[0], col[1], col[2]);
      row.push(positions.length / 3 - 1);
    }
    grid.push(row);
  }
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < ACROSS - 1; c++) {
      const a = grid[r][c];
      const b = grid[r][c + 1];
      const d = grid[r + 1][c];
      const e = grid[r + 1][c + 1];
      indices.push(a, d, b, b, d, e);
    }
  }
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices),
  };
}

function stationAt(course, z) {
  const list = course.stations;
  if (!list.length) return null;
  const i = clamp(Math.round((z - list[0].z) / STEP), 0, list.length - 1);
  return list[i];
}

export function groundAt(course, x, z) {
  const list = course.stations;
  if (!list.length || z < list[0].z - 3 || z > list[list.length - 1].z + 3) return null;
  const i = clamp(Math.round((z - list[0].z) / STEP), 0, list.length - 2);
  const a = list[i];
  const b = list[i + 1];
  const span = b.z - a.z || STEP;
  const t = clamp((z - a.z) / span, 0, 1);
  if (a.gap && b.gap) return null;
  if (a.gap && t < 0.35) return null;
  if (b.gap && t > 0.65) return null;
  const cx = lerp(a.x, b.x, t);
  const cy = lerp(a.y, b.y, t);
  const half = lerp(a.half, b.half, t);
  const lat = x - cx;
  if (Math.abs(lat) > half + 0.35) return null;
  const chunk = course.chunks[a.chunk];
  if (!chunk || chunk.state === "gone" || chunk.state === "falling") return null;
  let y = cy;
  const edge = Math.abs(lat) / half;
  if (edge > 0.86) y -= (edge - 0.86) * 1.1;
  if (chunk.tilt) y += chunk.tilt * lat * 0.08;
  return {
    y,
    x: cx,
    z,
    ice: a.ice,
    conveyX: a.conveyX || 0,
    zone: a.zone,
    chunk,
    state: chunk.state,
    fragile: !!chunk.fragile,
  };
}

export function createCourse(cfg) {
  const len = cfg.quick ? 230 : 760;
  const zones = zonesFor(len);
  const stations = [];
  for (let z = 0; z <= len; z += STEP) stations.push(routeAt(z, len, zones));

  const chunks = [];
  for (let i = 0; i < stations.length; i += 4) {
    const slice = stations.slice(i, Math.min(stations.length, i + 5));
    if (slice.length < 2) continue;
    const gap = slice.every((s) => s.gap);
    const chunk = {
      index: chunks.length,
      z0: slice[0].z,
      z1: slice[slice.length - 1].z,
      zone: slice[0].zone,
      gap,
      state: "solid",
      crackT: 0,
      fallT: 0,
      fallY: 0,
      dirty: true,
      fragile: slice[0].zone === "canyon" && (chunks.length % 11 === 4),
      ice: slice[0].ice,
      jitter: (i % 7) / 7,
      tilt: 0,
    };
    if (!gap) Object.assign(chunk, buildChunkGeometry(slice));
    slice.forEach((s) => {
      s.chunk = chunk.index;
    });
    chunks.push(chunk);
  }

  function atZone(id, frac) {
    const zone = zones.find((z) => z.id === id);
    const z = zone.z0 + (zone.z1 - zone.z0) * frac;
    const st = stations[clamp(Math.round(z / STEP), 0, stations.length - 1)];
    return { x: st.x, y: st.y, z: st.z, zone: st.zone };
  }

  const bumpers = [0.22, 0.48, 0.7].map((f, i) => {
    const p = atZone("meadow", f);
    p.x += i === 1 ? 0 : (i === 0 ? -2.2 : 2.2);
    return p;
  });
  bumpers.push({ ...atZone("ice", 0.35), x: atZone("ice", 0.35).x - 1.4 });
  bumpers.push({ ...atZone("climb", 0.3), x: atZone("climb", 0.3).x + 1.6 });

  const pads = [];
  for (const [zone, frac, side] of [
    ["canyon", 0.31, 0],
    ["canyon", 0.59, 0],
    ["sky", 0.19, 0],
    ["sky", 0.45, 0],
    ["sky", 0.69, 0],
    ["meadow", 0.62, -3.2],
  ]) {
    const p = atZone(zone, frac);
    p.x += side;
    pads.push(p);
  }

  const platforms = [];
  for (const [frac, phase] of [[0.22, 0.4], [0.48, 1.6]]) {
    const p = atZone("sky", frac);
    platforms.push({
      id: platforms.length,
      kind: "ferry",
      originX: p.x,
      originZ: p.z,
      x: p.x,
      z: p.z,
      prevX: p.x,
      prevZ: p.z,
      y: p.y + 0.35,
      amp: 1.6,
      speed: 0.8,
      phase,
      radius: 2.3,
      axis: "x",
    });
  }
  const spinSpot = atZone("sky", 0.55);
  platforms.push({
    id: platforms.length,
    kind: "spin",
    originX: spinSpot.x + 1.4,
    originZ: spinSpot.z,
    x: spinSpot.x + 1.4,
    z: spinSpot.z,
    prevX: spinSpot.x + 1.4,
    prevZ: spinSpot.z,
    y: spinSpot.y + 0.2,
    amp: 0,
    speed: 1.5,
    phase: 0,
    radius: 1.7,
    axis: "spin",
  });

  const spinners = [
    { ...atZone("sky", 0.34), angle: 0.4, spin: 1.6 },
    { ...atZone("climb", 0.28), x: atZone("climb", 0.28).x - 1.5, angle: 1, spin: -1.5 },
    { ...atZone("climb", 0.62), x: atZone("climb", 0.62).x + 1.5, angle: 0.2, spin: 1.8 },
  ];

  const geysers = [0.4, 0.72].map((f, i) => {
    const p = atZone("canyon", f);
    p.x += i === 0 ? -1.6 : 1.8;
    return { ...p, period: 2.5 + i * 0.5, t: i * 0.8, hot: false, wasHot: false, warn: false, radius: 1.2 };
  });

  const sweepers = [
    { ...atZone("canyon", 0.5), y: atZone("canyon", 0.5).y + 0.45, originX: atZone("canyon", 0.5).x, amp: 3.6, speed: 1.15, halfLen: 2.2, height: 0.45, full: true, radius: 0.7 },
    { ...atZone("climb", 0.46), y: atZone("climb", 0.46).y + 1.15, originX: atZone("climb", 0.46).x, amp: 3.2, speed: 1.35, halfLen: 2, height: 1.15, full: false, radius: 0.62 },
  ];

  const pend = atZone("sky", 0.5);
  const pendulums = [{
    x: pend.x, z: pend.z, y: pend.y + 3.2, len: 2.4, amp: 0.8, speed: 1.3, phase: 0.2, radius: 0.75,
  }];

  const roll = atZone("meadow", 0.32);
  const roll2 = atZone("climb", 0.5);
  const rollers = [
    { x: roll.x - 3, z: roll.z, y: roll.y + 0.9, x0: roll.x - 3.2, x1: roll.x + 3.2, dir: 1, speed: 3.2, radius: 1.15, rot: 0 },
    { x: roll2.x - 2, z: roll2.z, y: roll2.y + 0.9, x0: roll2.x - 2.4, x1: roll2.x + 2.4, dir: -1, speed: 2.6, radius: 1.05, rot: 1 },
  ];

  const hop = atZone("canyon", 0.46);
  const hoppers = [{
    x: hop.x, z: hop.z, y: hop.y, homeX: hop.x, homeZ: hop.z, homeY: hop.y,
    vy: 0, hopping: false, t: 0.3, period: 1.7, dirx: 1, dirz: 0, radius: 0.9,
  }];

  const fly = atZone("sky", 0.24);
  const flyers = [{
    cx: fly.x, cz: fly.z, cy: fly.y + 2.4, x: fly.x, y: fly.y + 2.4, z: fly.z, ang: 0, span: 6.2, radius: 0.95,
  }];

  const windZone = zones.find((z) => z.id === "sky");
  const winds = [{
    z0: windZone.z0 + (windZone.z1 - windZone.z0) * 0.78,
    z1: windZone.z1 - 4,
    x0: -12,
    x1: 12,
    y0: 3,
    y1: 16,
    ax: 1,
  }];
  const canyon = zones.find((z) => z.id === "canyon");
  const lava = { z0: canyon.z0, z1: canyon.z1, x0: -30, x1: 30 };

  const checkpoints = ["meadow", "canyon", "sky", "ice", "climb"].map((id) => {
    const p = atZone(id, 0.04);
    return { ...p, name: zones.find((z) => z.id === id).name, row: Math.round(p.z / STEP) };
  });

  const spawns = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const z = 8 + row * 3.4;
      const st = stations[Math.round(z / STEP)];
      const x = st.x + (col - 1.5) * 2.5;
      spawns.push({ x, y: st.y, z, row, col });
    }
  }

  const waypoints = [];
  for (let i = 0; i < stations.length; i += 2) {
    const st = stations[i];
    if (st.gap) {
      if (waypoints.length) waypoints[waypoints.length - 1].gap = true;
      continue;
    }
    if (st.zone === "ship" && st.z > len - 18) continue;
    waypoints.push({ x: st.x, y: st.y, z: st.z, row: i, gap: false });
  }
  const shipSt = stations[Math.round((len - 16) / STEP)];
  const ship = { x: shipSt.x, y: shipSt.y, z: shipSt.z - 6 };
  waypoints.push({ x: ship.x, y: ship.y, z: ship.z - 5, row: stations.length - 1, gap: false, ship: true });

  const tiles = [];
  for (let i = 0; i < stations.length; i += 3) {
    const st = stations[i];
    if (st.gap) continue;
    tiles.push({ x: st.x - st.half - 0.4, y: st.y, z: st.z, zone: st.zone, col: -3, row: i });
    tiles.push({ x: st.x + st.half + 0.4, y: st.y, z: st.z, zone: st.zone, col: 3, row: i });
  }

  return {
    len,
    stations,
    chunks,
    tiles,
    zones,
    bumpers,
    spinners,
    pads,
    platforms,
    pendulums,
    sweepers,
    geysers,
    rollers,
    hoppers,
    flyers,
    winds,
    lava,
    checkpoints,
    waypoints,
    spawns,
    ship,
    endZ: ship.z,
  };
}
