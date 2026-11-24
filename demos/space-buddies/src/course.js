// Open kingdoms. Each zone is a wide plaza or a set of islands with
// three routes, not a single race ribbon.

const CREAM = [1, 0.995, 0.94];
const GROUND = {
  meadow: { top: [0.306, 0.788, 0.416], side: [0.220, 0.557, 0.286] },
  canyon: { top: [1, 0.604, 0.290], side: [0.780, 0.373, 0.196] },
  sky: { top: [0.890, 0.925, 1], side: [0.620, 0.710, 0.980] },
  ice: { top: [0.780, 0.925, 1], side: [0.420, 0.730, 0.920] },
  climb: { top: [0.640, 0.520, 0.820], side: [0.400, 0.310, 0.580] },
  ship: { top: [0.420, 0.440, 0.720], side: [0.240, 0.250, 0.460] },
};

function mix3(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function slabPaint(zone, key) {
  const g = GROUND[zone] || GROUND.meadow;
  if (key === "side") return g.side;
  if (key === "cream") return CREAM;
  if (key === "mix") return mix3(g.top, CREAM, 0.55);
  return g.top;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function zonesFor(len) {
  return [
    { id: "meadow", name: "MEADOW", z0: 0, z1: len * 0.16 },
    { id: "canyon", name: "LAVA CANYON", z0: len * 0.16, z1: len * 0.38 },
    { id: "sky", name: "SKY ISLANDS", z0: len * 0.38, z1: len * 0.58 },
    { id: "ice", name: "ICE SLIDE", z0: len * 0.58, z1: len * 0.74 },
    { id: "climb", name: "THE CLIMB", z0: len * 0.74, z1: len * 0.9 },
    { id: "ship", name: "ESCAPE SHIP", z0: len * 0.9, z1: len },
  ];
}

function zoneAt(zones, z) {
  let id = zones[0].id;
  for (const zone of zones) if (z >= zone.z0) id = zone.id;
  return id;
}

function discGeometry(cx, y, cz, rx, rz, zone) {
  const bevel = Math.min(0.22, Math.min(rx, rz) * 0.2);
  const lip = 0.28;
  const skirt = 0.22;
  const seg = rx < 3 ? 14 : 28;
  const rings = [
    { frac: 0, dy: 0, key: "top" },
    { frac: 0.34, dy: 0, key: "top" },
    { frac: 0.68, dy: 0, key: "top" },
    { inset: bevel + 0.16, dy: 0, key: "top" },
    { inset: bevel, dy: 0, key: "cream" },
    { inset: bevel * 0.45, dy: -bevel * 0.45, key: "cream" },
    { inset: 0, dy: -bevel, key: "cream" },
    { inset: 0, dy: -bevel - lip, key: "cream" },
    { inset: 0, dy: -bevel - lip - skirt, key: "side" },
  ];
  const positions = [];
  const colors = [];
  const indices = [];
  const stride = seg + 1;
  for (let r = 0; r < rings.length; r++) {
    const ring = rings[r];
    const radX = ring.frac != null ? ring.frac * (rx - bevel) : Math.max(0.15, rx - ring.inset);
    const radZ = ring.frac != null ? ring.frac * (rz - bevel) : Math.max(0.15, rz - ring.inset);
    for (let s = 0; s <= seg; s++) {
      const a = (s / seg) * Math.PI * 2;
      const wx = cx + Math.cos(a) * radX;
      const wz = cz + Math.sin(a) * radZ;
      positions.push(wx, y + ring.dy, wz);
      const paint = slabPaint(zone, ring.key);
      colors.push(paint[0], paint[1], paint[2]);
    }
  }
  for (let r = 0; r < rings.length - 1; r++) {
    for (let s = 0; s < seg; s++) {
      const a = r * stride + s;
      const b = a + stride;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const bottom = positions.length / 3;
  positions.push(cx, y - bevel - lip - skirt, cz);
  const paint = slabPaint(zone, "side");
  colors.push(paint[0] * 0.86, paint[1] * 0.86, paint[2] * 0.86);
  const base = (rings.length - 1) * stride;
  for (let s = 0; s < seg; s++) indices.push(bottom, base + s + 1, base + s);
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices),
  };
}

function bridgeGeometry(x0, z0, x1, z1, y0, y1, width, zone) {
  const bevel = Math.min(0.2, width * 0.16);
  const lip = 0.26;
  const skirt = 0.2;
  const steps = 8;
  const across = [
    { side: -1, inset: 0, dy: -(bevel + lip + skirt), key: "side" },
    { side: -1, inset: 0, dy: -(bevel + lip), key: "side" },
    { side: -1, inset: 0, dy: -bevel, key: "cream" },
    { side: -1, inset: bevel * 0.5, dy: -bevel * 0.5, key: "mix" },
    { side: -1, inset: bevel, dy: 0, key: "cream" },
    { side: 0, inset: 0, dy: 0, key: "top" },
    { side: 1, inset: bevel, dy: 0, key: "cream" },
    { side: 1, inset: bevel * 0.5, dy: -bevel * 0.5, key: "mix" },
    { side: 1, inset: 0, dy: -bevel, key: "cream" },
    { side: 1, inset: 0, dy: -(bevel + lip), key: "side" },
    { side: 1, inset: 0, dy: -(bevel + lip + skirt), key: "side" },
  ];
  const cols = across.length;
  const positions = [];
  const colors = [];
  const indices = [];
  const dx = x1 - x0;
  const dz = z1 - z0;
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len;
  const pz = dx / len;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = lerp(x0, x1, t);
    const z = lerp(z0, z1, t);
    const y = lerp(y0, y1, t);
    for (let c = 0; c < cols; c++) {
      const p = across[c];
      const o = p.side * (width * 0.5 - p.inset);
      const wx = x + px * o;
      const wz = z + pz * o;
      positions.push(wx, y + p.dy, wz);
      const paint = slabPaint(zone, p.key);
      colors.push(paint[0], paint[1], paint[2]);
    }
  }
  for (let i = 0; i < steps; i++) {
    for (let c = 0; c < cols - 1; c++) {
      const a = i * cols + c;
      const b = a + cols;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
    const a = i * cols;
    const b = a + cols;
    const r = a + cols - 1;
    indices.push(a, b, r, r, b, b + cols - 1);
  }
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices),
  };
}

function makeChunk(chunks, zone, z0, z1, geo) {
  const chunk = {
    index: chunks.length,
    z0,
    z1,
    zone,
    gap: !geo,
    state: "solid",
    crackT: 0,
    fallT: 0,
    fallY: 0,
    dirty: true,
    fragile: false,
    ice: zone === "ice",
    jitter: (chunks.length % 7) / 7,
    tilt: 0,
  };
  if (geo) Object.assign(chunk, geo);
  chunks.push(chunk);
  return chunk.index;
}

function padHit(pad, chunk, z) {
  return {
    y: pad.y,
    x: pad.x,
    z,
    px: pad.x,
    pz: pad.z,
    rx: pad.rx,
    rz: pad.rz,
    ice: pad.zone === "ice",
    conveyX: pad.conveyX || 0,
    zone: pad.zone,
    chunk,
    state: chunk.state,
    fragile: !!chunk.fragile,
  };
}

export function floorsAt(course, x, z) {
  const floors = course.floors || [];
  const hits = [];
  for (let i = 0; i < floors.length; i++) {
    const pad = floors[i];
    const chunk = course.chunks[pad.chunk];
    if (!chunk || chunk.state === "falling" || chunk.state === "gone") continue;
    const nx = (x - pad.x) / pad.rx;
    const nz = (z - pad.z) / pad.rz;
    const guard = pad.zone === "meadow" ? 1.08 : 1;
    if (nx * nx + nz * nz > guard) continue;
    hits.push(padHit(pad, chunk, z));
  }
  if (!hits.length && course.islands) {
    for (const isle of course.islands) {
      const dx = x - isle.x;
      const dz = z - isle.z;
      if (dx * dx + dz * dz > isle.r * isle.r) continue;
      hits.push({ y: isle.y, x: isle.x, z, ice: false, conveyX: 0, zone: isle.zone, chunk: null, state: "solid", fragile: false });
    }
  }
  return hits;
}

export function groundAt(course, x, z) {
  const hits = floorsAt(course, x, z);
  let best = null;
  for (let i = 0; i < hits.length; i++) {
    if (!best || hits[i].y >= best.y) best = hits[i];
  }
  return best;
}

export const COURSE_STRETCH = 1.65;

export function courseScale(quick) {
  return (quick ? 0.42 : 1) * COURSE_STRETCH;
}

const GRID_X = [-3.4, -1.7, 0, 1.7, 3.4];

export function solidStart(course, zWant, depth) {
  const span = depth || 3.6;
  function holds(z) {
    for (let dz = 0; dz <= span; dz += 1.2) {
      for (const x of GRID_X) {
        if (!groundAt(course, x, z + dz)) return false;
      }
    }
    return true;
  }
  if (holds(zWant)) return zWant;
  for (let dz = 1; dz <= 90; dz += 1) {
    if (holds(zWant + dz)) return zWant + dz;
    if (zWant - dz > 0 && holds(zWant - dz)) return zWant - dz;
  }
  return zWant;
}

export function createCourse(cfg) {
  const quick = !!cfg.quick;
  const S = courseScale(quick);
  const zz = (z) => z * S;
  const len = zz(400);
  const zones = zonesFor(len);
  const chunks = [];
  const floors = [];
  const seed = cfg.seed || 1;
  let rng = seed >>> 0;
  const rnd = () => {
    rng = (Math.imul(1664525, rng) + 1013904223) >>> 0;
    return rng / 4294967296;
  };
  const openDoor = Math.floor(rnd() * 3);

  function addDisc(x, y, z, rx, rz, zone, extra) {
    const idx = makeChunk(chunks, zone, z - rz, z + rz, discGeometry(x, y, z, rx, rz, zone));
    const pad = { x, y, z, rx, rz, zone, chunk: idx, conveyX: extra && extra.conveyX };
    floors.push(pad);
    if (extra && extra.fragile) chunks[idx].fragile = true;
    return pad;
  }

  function addBridge(x0, z0, x1, z1, y0, y1, width, zone, opts) {
    const gapT = opts && opts.gap;
    const idx = makeChunk(chunks, zone, Math.min(z0, z1), Math.max(z0, z1), bridgeGeometry(x0, z0, x1, z1, y0, y1, width, zone));
    const pads = [];
    const span = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(4, Math.ceil(span / Math.max(2.2, width * 0.5)));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      if (gapT && Math.abs(t - gapT) < 0.12) continue;
      const pad = {
        x: lerp(x0, x1, t),
        z: lerp(z0, z1, t),
        y: lerp(y0, y1, t),
        rx: width * 0.78,
        rz: width * 0.78,
        zone,
        chunk: idx,
        conveyX: opts && opts.conveyX,
      };
      floors.push(pad);
      pads.push(pad);
    }
    return pads;
  }

  // Meadow plaza. A giant mushroom sits in the middle so you walk around it.
  addDisc(0, 0, zz(40), 24, 24, "meadow");
  addDisc(0, 2.6, zz(40), 1.8, 1.8, "meadow");
  addDisc(-16, 0.2, zz(28), 7, 7, "meadow");
  addDisc(16, 0.8, zz(52), 6, 6, "meadow");

  // Canyon crater. Routes bend around the lava, they do not run as parallel lanes.
  addDisc(0, 0.2, zz(92), 16, 14, "canyon");
  addBridge(0, zz(78), -16, zz(100), 0.15, 0.3, 7, "canyon");
  addBridge(-16, zz(100), -18, zz(118), 0.3, 0.35, 6.5, "canyon");
  addBridge(-18, zz(118), -6, zz(136), 0.35, 0.3, 6.5, "canyon");
  addBridge(2, zz(86), 14, zz(108), 0.2, 1.6, 5.5, "canyon");
  addBridge(14, zz(108), 16, zz(126), 1.6, 2.6, 5.2, "canyon");
  addBridge(0, zz(96), 6, zz(112), 0.3, 0.45, 4.2, "canyon");
  addBridge(6, zz(114), -4, zz(128), 0.45, 0.35, 4.2, "canyon");
  addBridge(16, zz(126), 2, zz(140), 2.6, 0.4, 5.5, "canyon", { gap: 0.48 });
  addDisc(0, 0.25, zz(148), 16, 12, "canyon");

  // Sky cluster around a tower. Short bridges cross instead of three long lanes.
  addDisc(0, 4, zz(178), 12, 11, "sky");
  addDisc(-16, 4.4, zz(196), 7, 6, "sky");
  addDisc(14, 6.8, zz(194), 6, 6, "sky");
  addDisc(0, 5.6, zz(210), 6, 5, "sky");
  addBridge(0, zz(186), -14, zz(196), 4, 4.4, 5, "sky");
  addBridge(-14, zz(200), 0, zz(214), 4.4, 5.6, 4.6, "sky");
  addBridge(4, zz(184), 14, zz(194), 4.1, 6.8, 4.4, "sky");
  addBridge(12, zz(200), 2, zz(214), 6.8, 5.6, 4.2, "sky");
  addBridge(0, zz(214), 0, zz(226), 5.6, 5.2, 6.2, "sky");
  addDisc(0, 5.2, zz(232), 13, 11, "sky");
  addBridge(-2, zz(156), 6, zz(172), 0.35, 4, 6.6, "canyon");
  addBridge(0, zz(50), 2, zz(64), 0, 0.15, 7, "meadow");
  addBridge(2, zz(62), 10, zz(80), 0.05, 0.2, 7.2, "meadow");
  addBridge(0, zz(240), -10, zz(258), 5.2, 3.3, 6.2, "sky");
  addBridge(4, zz(236), 12, zz(264), 5.2, 3.3, 6, "sky");
  addDisc(0, 3.3, zz(264), 16, 10, "sky");
  addBridge(0, zz(336), -3, zz(352), 6.2, 8, 5.8, "climb");
  addBridge(0, zz(292), 6, zz(306), 3.1, 3, 6.2, "ice");
  addBridge(6, zz(304), 4, zz(318), 3, 3.4, 5.4, "climb");

  // Ice round. The middle is only falling hexes. The rim is the safe walk.
  addDisc(-14, 3.2, zz(268), 8, 8, "ice", { conveyX: 5 });
  addDisc(14, 3.3, zz(270), 8, 8, "ice", { conveyX: -5 });
  addDisc(0, 3.1, zz(286), 10, 8, "ice");
  addBridge(-14, zz(270), 0, zz(286), 3.2, 3.1, 5.5, "ice");
  addBridge(14, zz(270), 0, zz(286), 3.3, 3.1, 5.5, "ice");
  for (let row = -2; row <= 2; row++) {
    for (let col = -3; col <= 3; col++) {
      if ((col + row) % 2 === 0 && rnd() < 0.15) continue;
      addDisc(-7 + col * 2.5, 3.15, zz(268 + row * 2.4), 1.25, 1.25, "ice", { fragile: true, hex: true });
    }
  }

  // Climb spirals around a tower, then the ship deck.
  addDisc(0, 3, zz(312), 12, 10, "climb");
  addDisc(-14, 4.4, zz(326), 6, 6, "climb");
  addDisc(0, 6.2, zz(334), 6, 5, "climb");
  addDisc(14, 7.6, zz(324), 6, 6, "climb");
  addBridge(-2, zz(318), -14, zz(326), 3, 4.4, 5, "climb");
  addBridge(-12, zz(330), 0, zz(336), 4.4, 6.2, 4.6, "climb");
  addBridge(2, zz(316), 14, zz(324), 3.1, 7.6, 4.4, "climb");
  addBridge(12, zz(330), 0, zz(348), 7.6, 8, 5, "climb");
  addDisc(0, 8, zz(360), 14, 12, "ship");

  const shipPad = floors[floors.length - 1];
  const ship = { x: shipPad.x, y: shipPad.y, z: shipPad.z + zz(6) };

  function route(xs) {
    const pts = [];
    for (const [z, x, y, gap] of xs) pts.push({ x, y: y || 0, z: zz(z), gap: !!gap });
    pts.push({ x: ship.x, y: ship.y, z: ship.z - 4 });
    return pts;
  }
  const doorXs = [-8, -4, 0, 4, 8];
  const doorOrder = doorXs.map((_, i) => i);
  for (let i = doorOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const swap = doorOrder[i];
    doorOrder[i] = doorOrder[j];
    doorOrder[j] = swap;
  }
  const solidDoors = 2 + (seed % 2);
  const solidSet = new Set(doorOrder.slice(0, solidDoors));
  const doors = doorXs.map((x, i) => ({ x, y: 0.35, z: zz(146), solid: solidSet.has(i) }));
  const openXs = doors.filter((d) => !d.solid).map((d) => d.x);
  const doorX = (i) => openXs[i % openXs.length];
  const routes = [
    route([
      [24, -6, 0], [34, -16, 0.2], [50, -14, 0], [64, 2, 0], [82, 8, 0.2],
      [100, -14, 0.3], [118, -18, 0.35], [136, -8, 0.3], [146, doorX(0), 0.3, true], [156, -2, 0.25], [168, 4, 2.4],
      [186, -6, 4], [198, -14, 4.4], [214, -2, 5.6], [232, 0, 5.2], [258, -10, 3.3],
      [270, -14, 3.2], [286, -2, 3.1], [306, 4, 3], [318, -4, 3.2], [328, -12, 4.4], [334, 0, 6.2], [350, 0, 8], [360, 0, 8],
    ]),
    route([
      [26, 4, 0], [42, 10, 0.2], [58, 12, 0.6], [80, 6, 0.2], [96, 2, 0.3],
      [112, 4, 0.4], [128, -4, 0.35], [146, doorX(1), 0.3, true], [156, 2, 0.25], [168, 4, 2.4],
      [186, 2, 4.1], [196, -12, 4.4], [210, -2, 5.6], [232, 2, 5.2], [250, -6, 4.2], [262, -10, 3.3],
      [272, -12, 3.2], [286, -2, 3.1], [312, 0, 3], [326, -10, 4.4], [336, 0, 6.2], [348, -2, 7.6], [360, 0, 8],
    ]),
    route([
      [28, 6, 0], [44, 12, 0.4], [52, 14, 0.8], [70, 12, 0.2], [90, 8, 0.4],
      [108, 14, 1.6], [126, 16, 2.6], [141, 3, 0.5], [146, doorX(2), 0.3, true], [168, 5, 2.4],
      [184, 8, 4.6], [194, 14, 6.8], [208, 6, 6.2], [232, 2, 5.2], [248, 8, 4.4], [264, 13, 3.3],
      [274, 14, 3.3], [286, 4, 3.1], [304, 6, 3], [316, 8, 4.6], [324, 14, 7.6], [340, 6, 7.8], [352, 0, 8], [360, 0, 8],
    ]),
  ];

  const stations = [];
  for (let z = 0; z <= len; z += 8) {
    const zone = zoneAt(zones, z);
    stations.push({
      x: 0,
      y: 0,
      z,
      half: zone === "meadow" ? 16 : 12,
      zone,
      gap: false,
      chunk: 0,
      ice: zone === "ice",
      conveyX: 0,
      route: 0,
      shelf: 0,
      shelfH: 0,
      guard: zone === "meadow" && z < 50 * S,
    });
  }

  const tiles = [];
  for (const pad of floors) {
    if (pad.rx < 6) continue;
    for (let k = 0; k < 3; k++) {
      const a = rnd() * Math.PI * 2;
      const ox = Math.cos(a) * 0.9;
      const oz = Math.sin(a) * 0.82;
      if (ox * ox + oz * oz < 0.62) continue;
      tiles.push({
        x: pad.x + ox * pad.rx,
        y: pad.y,
        z: pad.z + oz * pad.rz,
        zone: pad.zone,
        col: Math.cos(a) > 0 ? 4 : -4,
        row: Math.floor(pad.z),
      });
    }
  }

  const coins = [];
  const coin = (z, x, y) => coins.push({ x, y: y + 1.15, z: zz(z), got: false });
  const high = routes[2];
  for (let i = 1; i < high.length - 1; i += 2) coin(high[i].z / S, high[i].x, high[i].y);
  coin(52, 14, 0.8);
  coin(108, 14, 1.6);
  coin(194, 14, 6.8);
  coin(324, 14, 7.6);
  coin(40, -10, 0.2);

  const blockers = [{ x: 0, y: 1.2, z: zz(40), r: 2.3 }];
  for (const door of doors) {
    if (!door.solid) continue;
    blockers.push({ x: door.x, y: door.y + 1.2, z: door.z, r: 1.35 });
  }
  blockers.push({ x: -13.2, y: 1.4, z: zz(146), r: 2.6 });
  blockers.push({ x: 13.2, y: 1.4, z: zz(146), r: 2.6 });
  blockers.push({ x: ship.x, y: ship.y, z: ship.z, r: 2.4, ship: true });

  const at = (z, x, y) => ({ x, y, z: zz(z), zone: zoneAt(zones, zz(z)) });
  const faceTo = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);

  const bumpers = [at(30, 12, 0), at(48, -8, 0), at(178, 6, 4), at(312, -6, 3)];
  const pads = [
    { ...at(32, 0, 0), face: faceTo(0, 32, 0, 40) },
    { ...at(40, 0, 2.6), face: faceTo(0, 40, 14, 52) },
    { ...at(100, 8, 0.6), face: faceTo(8, 100, 14, 108) },
    { ...at(126, 16, 2.6), face: faceTo(16, 126, 2, 140) },
    { ...at(316, 6, 3.4), face: faceTo(6, 316, 14, 324) },
  ];
  const platforms = [
    { id: 0, kind: "ferry", originX: 0, originZ: zz(204), x: 0, z: zz(204), prevX: 0, prevZ: zz(204), y: 6.4, originY: 6.4, amp: 8, speed: 0.7, phase: rnd() * 2, radius: 2.8, axis: "x" },
    { id: 1, kind: "spin", originX: -16, originZ: zz(196), x: -16, z: zz(196), prevX: -16, prevZ: zz(196), y: 4.7, originY: 4.7, amp: 0, speed: 1.3, phase: 0, radius: 3.1, axis: "spin" },
    { id: 2, kind: "seesaw", originX: 0, originZ: zz(278), x: 0, z: zz(278), prevX: 0, prevZ: zz(278), y: 3.7, originY: 3.7, amp: 0, speed: 0, phase: 0, radius: 3.6, axis: "seesaw", tilt: 0, face: Math.PI / 2 },
    { id: 3, kind: "seesaw", originX: 0, originZ: zz(338), x: 0, z: zz(338), prevX: 0, prevZ: zz(338), y: 6.8, originY: 6.8, amp: 0, speed: 0, phase: 0, radius: 3.4, axis: "seesaw", tilt: 0, face: Math.PI / 2 },
    { id: 4, kind: "seesaw", zone: "canyon", originX: 11, originZ: zz(156), x: 11, z: zz(156), prevX: 11, prevZ: zz(156), y: 0.85, originY: 0.85, amp: 0, speed: 0, phase: 0, radius: 3.3, axis: "seesaw", tilt: 0, face: 0 },
  ];
  const spinners = [
    { ...at(36, -8, 0.15), len: 3.6, angle: rnd() * 3, spin: 1.5 },
    { ...at(148, -8, 0.4), len: 3.2, angle: rnd() * 2, spin: -1.35 },
    { ...at(210, 0, 5.7), len: 2.8, angle: 0.4, spin: 1.6 },
    { ...at(312, 4, 3.1), len: 3.1, angle: 1, spin: -1.4 },
  ];
  const geysers = [at(104, 3, 0.4), at(118, -2, 0.2)].map((p, i) => ({ ...p, period: 2.6 + i * 0.35, t: rnd() * 2, hot: false, wasHot: false, warn: false, radius: 1.35 }));
  const sweepers = [
    { ...at(44, 0, 1.15), originX: 0, amp: 6, speed: 0.85, halfLen: 3.2, height: 1.05, full: false, radius: 1.15, scale: 1.7 },
    { ...at(108, -16, 1.15), originX: -16, amp: 4.5, speed: 1.05, halfLen: 2.6, height: 1.05, full: true, radius: 1.05, scale: 1.55 },
    { ...at(268, -14, 4.15), originX: -14, amp: 4, speed: 1.1, halfLen: 2.4, height: 1, full: false, radius: 1, scale: 1.45 },
  ];
  const pendulums = [
    { ...at(68, 8, 4.6), len: 3.2, amp: 1.05, speed: 1.15, phase: rnd(), radius: 0.95 },
    { ...at(207, -7, 9.2), len: 3.4, amp: 1.1, speed: 1.25, phase: rnd(), radius: 1 },
    { ...at(330, -6, 8.4), len: 3.1, amp: 1, speed: 1.2, phase: rnd() * 2, radius: 0.9 },
  ];
  const rollers = [
    { ...at(116, 14, 2.5), x0: 10, x1: 18, dir: 1, speed: 3.1, radius: 1.15, rot: 0 },
    { ...at(270, 14, 4.2), x0: 8, x1: 18, dir: -1, speed: 2.6, radius: 1.05, rot: 0, snow: true },
    { ...at(324, 14, 8.5), x0: 8, x1: 18, dir: 1, speed: 2.8, radius: 1.1, rot: 0 },
  ];
  const hoppers = [{ ...at(152, 6, 0.4), homeX: 6, homeZ: zz(152), homeY: 0.4, vy: 0, hopping: false, t: rnd(), period: 1.7, dirx: 1, dirz: 0, radius: 0.95 }];
  const flyers = [{ cx: 0, cz: zz(210), cy: 9.2, x: 0, y: 9.2, z: zz(210), ang: rnd() * 6, span: 7, radius: 0.95 }];
  const winds = [{ z0: zz(198), z1: zz(216), x0: -10, x1: 12, y0: 4, y1: 12, ax: 1 }];
  const lava = { z0: zz(108), z1: zz(128), x0: -7, x1: 7 };
  const crater = { x: 0, y: 0.08, z: zz(118), r: 7.5 };
  const hubs = [
    { x: 0, z: zz(40), zone: "meadow", r: 26 },
    { x: 0, z: zz(118), zone: "canyon", r: 24 },
    { x: 0, z: zz(204), zone: "sky", r: 22 },
    { x: 0, z: zz(274), zone: "ice", r: 20 },
    { x: 0, z: zz(332), zone: "climb", r: 20 },
  ];
  const landmarks = [
    { kind: "mushroom", x: 0, y: 0, z: zz(40) },
    { kind: "tower", x: 0, y: 5.6, z: zz(210) },
  ];
  const checkpoints = ["meadow", "canyon", "sky", "ice", "climb"].map((id) => {
    const zone = zones.find((z) => z.id === id);
    return { x: 0, y: 0, z: zone.z0 + 8, name: zone.name, row: 0 };
  });
  const spawns = [{ x: 0, y: 0, z: zz(22), row: 0, col: 0 }];
  for (let n = 1; n < 16; n++) {
    const row = Math.floor((n - 1) / 5);
    const col = (n - 1) % 5;
    spawns.push({ x: (col - 2) * 2.1, y: 0, z: zz(26 + row * 2.2), row: row + 1, col });
  }
  const islands = [];

  const built = {
    len,
    stations,
    chunks,
    floors,
    tiles,
    islands,
    blockers,
    coins,
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
    crater,
    hubs,
    landmarks,
    doors,
    checkpoints,
    waypoints: routes[0],
    routes,
    openDoor,
    spawns,
    crateSpawns: [
      { x: -6, y: 0.4, z: zz(34) },
      { x: 7, y: 0.4, z: zz(46) },
      { x: -12, y: 0.5, z: zz(108) },
    ],
    ship,
    endZ: ship.z,
  };
  for (const cp of checkpoints) {
    let hit = groundAt(built, cp.x, cp.z);
    if (!hit) {
      for (let dz = 1; dz <= 90 && !hit; dz++) {
        hit = groundAt(built, 0, cp.z + dz) || groundAt(built, 0, cp.z - dz);
        if (hit) {
          cp.x = 0;
          cp.z = hit.z;
        }
      }
    }
    if (hit) cp.y = hit.y;
  }
  for (const spawn of spawns) {
    let hit = groundAt(built, spawn.x, spawn.z);
    if (!hit) {
      for (let dz = 1; dz <= 90 && !hit; dz++) {
        hit = groundAt(built, spawn.x, spawn.z + dz) || groundAt(built, spawn.x, spawn.z - dz);
        if (hit) spawn.z = hit.z;
      }
    }
    if (hit) spawn.y = hit.y;
  }
  bakeContactAO(built);
  return built;
}

function bakeContactAO(course) {
  const blockers = course.blockers || [];
  for (const chunk of course.chunks) {
    const pos = chunk.positions;
    const col = chunk.colors;
    if (!pos || !col) continue;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i + 1];
      const z = pos[i + 2];
      let ao = 1;
      for (let b = 0; b < blockers.length; b++) {
        const block = blockers[b];
        const d = Math.hypot(x - block.x, z - block.z);
        const reach = (block.r || 1) + 1.4;
        if (d >= reach) continue;
        const shade = 0.62 + 0.38 * (d / reach);
        if (shade < ao) ao = shade;
      }
      let lower = 0;
      const n = Math.min(pos.length, i + 48);
      for (let k = Math.max(0, i - 45); k < n; k += 3) {
        if (pos[k + 1] > y + 0.12 && Math.hypot(pos[k] - x, pos[k + 2] - z) < 1.8) lower++;
      }
      if (lower > 2) ao *= 0.78;
      col[i] *= ao;
      col[i + 1] *= ao;
      col[i + 2] *= ao;
    }
  }
}
