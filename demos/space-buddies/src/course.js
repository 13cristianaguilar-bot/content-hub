// Open kingdoms. Each zone is a wide plaza or a set of islands with
// three routes, not a single race ribbon.

const PALETTE = {
  meadow: [0.34, 0.78, 0.4],
  canyon: [0.18, 0.12, 0.13],
  sky: [0.62, 0.88, 0.74],
  ice: [0.55, 0.9, 1],
  climb: [0.95, 0.62, 0.22],
  ship: [0.95, 0.86, 0.62],
};

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
  const col = PALETTE[zone] || PALETTE.meadow;
  const rings = 3;
  const seg = 18;
  const positions = [];
  const colors = [];
  const indices = [];
  const stride = seg + 1;
  for (let r = 0; r <= rings; r++) {
    const t = r / rings;
    const drop = t > 0.78 ? (t - 0.78) * (t - 0.78) * 10 : 0;
    const shade = t > 0.78 ? 0.72 : 1 - t * 0.04;
    for (let s = 0; s <= seg; s++) {
      const a = (s / seg) * Math.PI * 2;
      const wob = 1 + Math.sin(a * 3 + cx * 0.2 + cz * 0.05) * 0.07;
      positions.push(cx + Math.cos(a) * rx * t * wob, y - drop, cz + Math.sin(a) * rz * t * wob);
      colors.push(col[0] * shade, col[1] * shade, col[2] * shade);
    }
  }
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < seg; s++) {
      const a = r * stride + s;
      const b = a + stride;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices),
  };
}

function bridgeGeometry(x0, z0, x1, z1, y0, y1, width, zone) {
  const col = PALETTE[zone] || PALETTE.meadow;
  const steps = 10;
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
    const wob = Math.sin(t * Math.PI) * 0.4;
    for (let side = -1; side <= 1; side += 2) {
      const o = (width * 0.5 + wob) * side;
      positions.push(x + px * o, lerp(y0, y1, t), z + pz * o);
      colors.push(col[0], col[1], col[2]);
    }
  }
  for (let i = 0; i < steps; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
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

export function groundAt(course, x, z) {
  const floors = course.floors || [];
  let best = null;
  for (let i = 0; i < floors.length; i++) {
    const pad = floors[i];
    const chunk = course.chunks[pad.chunk];
    if (!chunk || chunk.state === "falling" || chunk.state === "gone") continue;
    const nx = (x - pad.x) / pad.rx;
    const nz = (z - pad.z) / pad.rz;
    const guard = pad.zone === "meadow" ? 1.08 : 1;
    if (nx * nx + nz * nz > guard) continue;
    if (!best || pad.y >= best.y) {
      best = {
        y: pad.y,
        x: pad.x,
        z,
        ice: pad.zone === "ice",
        conveyX: pad.conveyX || 0,
        zone: pad.zone,
        chunk,
        state: chunk.state,
        fragile: !!chunk.fragile,
      };
    }
  }
  if (!best) {
    let nearest = null;
    let nd = 1e9;
    for (let i = 0; i < floors.length; i++) {
      const pad = floors[i];
      const chunk = course.chunks[pad.chunk];
      if (!chunk || chunk.state === "falling" || chunk.state === "gone") continue;
      const dx = x - pad.x;
      const dz = z - pad.z;
      const d = Math.hypot(dx, dz);
      const reach = Math.max(pad.rx, pad.rz) + (pad.zone === "meadow" ? 8 : 2.4);
      if (d < reach && d < nd) {
        nd = d;
        nearest = pad;
      }
    }
    if (nearest) {
      const chunk = course.chunks[nearest.chunk];
      best = {
        y: nearest.y,
        x: nearest.x,
        z,
        ice: nearest.zone === "ice",
        conveyX: nearest.conveyX || 0,
        zone: nearest.zone,
        chunk,
        state: chunk.state,
        fragile: !!chunk.fragile,
      };
    }
  }
  if (!best && course.islands) {
    for (const isle of course.islands) {
      const dx = x - isle.x;
      const dz = z - isle.z;
      if (dx * dx + dz * dz > isle.r * isle.r) continue;
      best = { y: isle.y, x: isle.x, z, ice: false, conveyX: 0, zone: isle.zone, chunk: null, state: "solid", fragile: false };
    }
  }
  return best;
}

export function createCourse(cfg) {
  const quick = !!cfg.quick;
  const S = quick ? 0.42 : 1;
  const zz = (z) => z * S;
  const len = zz(760);
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

  // Meadow: one wide safe plaza, plus a low mound and a pad ridge so three lines exist.
  addDisc(0, 0, zz(48), 20, zz(46), "meadow");
  addDisc(-14, 0.15, zz(70), 8, zz(10), "meadow");
  addDisc(12, 1.6, zz(62), 6, zz(8), "meadow");
  addDisc(12, 0.7, zz(50), 5, zz(6), "meadow");
  addDisc(0, 0.1, zz(118), 18, zz(28), "meadow");

  // Canyon plazas and three bridges over the lava.
  addDisc(0, 0.2, zz(150), 14, zz(16), "canyon");
  const gapAt = 0.45 + rnd() * 0.1;
  addBridge(-14, zz(166), -10, zz(262), 0.3, 0.3, 6.2, "canyon");
  addBridge(0, zz(166), 0, zz(262), 0.4, 0.4, 4.6, "canyon", { gap: gapAt });
  addBridge(14, zz(166), 10, zz(262), 0.4, 2.4, 4.6, "canyon");
  addDisc(14, 1.2, zz(190), 3.2, 3.2, "canyon");
  addDisc(14, 2.2, zz(210), 3.2, 3.2, "canyon");
  addDisc(0, 0.2, zz(268), 14, zz(14), "canyon");
  addDisc(0, 2.2, zz(305), 12, zz(24), "canyon");

  // Sky: entry plaza, three island chains, exit plaza.
  addDisc(0, 4, zz(330), 12, zz(12), "sky");
  addBridge(-12, zz(342), -8, zz(446), 4.2, 4.2, 5.2, "sky");
  addBridge(0, zz(342), 0, zz(446), 5.2, 5.2, 4.2, "sky", { gap: 0.55 });
  addBridge(12, zz(342), 8, zz(446), 4.4, 7.2, 4.4, "sky");
  addDisc(0, 5.4, zz(386), 3.4, 3.4, "sky");
  addDisc(0, 4.2, zz(448), 12, zz(12), "sky");
  addDisc(0, 3.6, zz(478), 12, zz(20), "sky");

  // Ice bowl, wide, with a raised side shelf.
  addDisc(0, 3.2, zz(510), 16, zz(28), "ice", { conveyX: 0 });
  addDisc(-12, 3.5, zz(500), 6, zz(10), "ice", { conveyX: 6 });
  addDisc(12, 4.6, zz(520), 5, zz(8), "ice", { conveyX: -6 });
  addDisc(0, 2.2, zz(555), 10, zz(10), "ice");
  addDisc(0, 2.2, zz(575), 12, zz(16), "ice");

  // Climb: low plaza, mid stairs, high tower line, then the ship deck.
  addDisc(0, 2.2, zz(590), 12, zz(12), "climb");
  addBridge(-10, zz(602), -6, zz(684), 2.3, 4.6, 5.4, "climb");
  addBridge(0, zz(602), 0, zz(684), 2.3, 6.4, 4.4, "climb");
  addBridge(10, zz(602), 6, zz(684), 2.3, 8.2, 4.2, "climb");
  addDisc(0, 6.5, zz(690), 14, zz(22), "ship");

  const shipPad = floors[floors.length - 1];
  const ship = { x: shipPad.x, y: shipPad.y, z: shipPad.z + zz(6) };

  function route(xs) {
    const pts = [];
    for (const [z, x, y] of xs) pts.push({ x, y: y || 0, z: zz(z) });
    pts.push({ x: ship.x, y: ship.y, z: ship.z - 4 });
    return pts;
  }
  const routes = [
    route([[20, -4, 0], [70, -10, 0.2], [150, -8, 0.2], [210, -12, 0.3], [268, -6, 0.2], [330, -10, 4], [400, -11, 4.2], [450, -4, 4.2], [510, -8, 3.4], [600, -6, 2.2], [650, -8, 3.4], [690, 0, 6.5]]),
    route([[30, 0, 0], [90, 0, 0], [170, 0, 0.4], [220, 0, 0.4], [268, 0, 0.2], [350, 0, 5.2], [410, 0, 5.2], [460, 0, 4.2], [520, 0, 3.2], [620, 0, 5.5], [670, 0, 5.5], [690, 0, 6.5]]),
    route([[45, 8, 0.7], [62, 12, 1.6], [180, 14, 2.4], [230, 14, 2.4], [262, 8, 2.4], [350, 12, 7.2], [420, 11, 7.2], [530, 10, 4.6], [640, 8, 8.2], [680, 2, 6.5], [690, 0, 6.5]]),
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
    for (let k = 0; k < 6; k++) {
      const a = rnd() * Math.PI * 2;
      tiles.push({
        x: pad.x + Math.cos(a) * pad.rx * 0.85,
        y: pad.y,
        z: pad.z + Math.sin(a) * pad.rz * 0.75,
        zone: pad.zone,
        col: Math.cos(a) > 0 ? 4 : -4,
        row: Math.floor(pad.z),
      });
    }
  }

  const coins = [];
  for (const path of routes) {
    for (let i = 2; i < path.length; i += 3) {
      const p = path[i];
      coins.push({ x: p.x + (rnd() - 0.5) * 3, y: p.y + 1.1, z: p.z });
    }
  }

  const blockers = [];
  for (let i = 0; i < tiles.length; i += 4) blockers.push({ x: tiles[i].x, y: tiles[i].y, z: tiles[i].z, r: 0.7 });
  for (let door = 0; door < 3; door++) {
    if (door === openDoor) continue;
    blockers.push({ x: 10 + door * 2.4, y: 2.4, z: zz(230), r: 1.05 });
  }
  blockers.push({ x: ship.x, y: ship.y, z: ship.z, r: 2.4, ship: true });

  const at = (z, x, y) => ({ x, y, z: zz(z), zone: zoneAt(zones, zz(z)) });

  const bumpers = [at(40, -8, 0), at(55, 6, 0.4), at(200, -14, 0.3), at(500, 4, 3.2), at(630, -8, 3.2)];
  const pads = [at(58, 0, 0), at(150, 0, 0.2), at(175, 0, 0.4), at(360, 0, 5.2), at(64, 12, 1.6), at(640, 0, 5.5)];
  const platforms = [
    { id: 0, kind: "ferry", originX: 0, originZ: zz(386), x: 0, z: zz(386), prevX: 0, prevZ: zz(386), y: 5.5, originY: 5.5, amp: 3.2, speed: 0.8, phase: rnd() * 3, radius: 2.4, axis: "x" },
    { id: 1, kind: "spin", originX: 12, originZ: zz(400), x: 12, z: zz(400), prevX: 12, prevZ: zz(400), y: 7.3, originY: 7.3, amp: 0, speed: 1.1, phase: 0, radius: 2.1, axis: "spin" },
    { id: 2, kind: "seesaw", originX: -6, originZ: zz(515), x: -6, z: zz(515), prevX: -6, prevZ: zz(515), y: 3.5, originY: 3.5, amp: 0.55, speed: 1.3, phase: rnd(), radius: 2.6, axis: "bob" },
    { id: 3, kind: "seesaw", originX: 6, originZ: zz(530), x: 6, z: zz(530), prevX: 6, prevZ: zz(530), y: 3.6, originY: 3.6, amp: 0.5, speed: 1.1, phase: rnd() * 2, radius: 2.4, axis: "tilt" },
  ];
  const spinners = [at(90, 4, 0), at(360, -12, 4.2), at(640, 8, 8.2)].map((p, i) => ({ ...p, angle: rnd() * 3, spin: i % 2 ? 1.4 : -1.5 }));
  const geysers = [at(190, 2, 0.4), at(220, -2, 0.4)].map((p, i) => ({ ...p, period: 2.4 + i * 0.4, t: rnd() * 2, hot: false, wasHot: false, warn: false, radius: 1.15 }));
  const sweepers = [
    { ...at(100, 0, 0.9), originX: 0, amp: 6, speed: 0.9, halfLen: 2.2, height: 0.9, full: true, radius: 0.7 },
    { ...at(400, -12, 5.1), originX: -12, amp: 3, speed: 1.2, halfLen: 1.8, height: 0.9, full: false, radius: 0.6 },
    { ...at(650, 0, 6.4), originX: 0, amp: 4, speed: 1.1, halfLen: 2, height: 0.9, full: false, radius: 0.62 },
  ];
  const pendulums = [
    { ...at(370, 6, 8.4), len: 2.6, amp: 0.9, speed: 1.2, phase: rnd(), radius: 0.75 },
    { ...at(660, -6, 6.4), len: 2.4, amp: 0.8, speed: 1.3, phase: rnd(), radius: 0.7 },
  ];
  const rollers = [
    { ...at(80, 8, 1.3), x0: 6, x1: 14, dir: 1, speed: 2.4, radius: 0.9, rot: 0 },
    { ...at(210, -14, 1.2), x0: -18, x1: -10, dir: -1, speed: 2.8, radius: 1, rot: 0 },
    { ...at(520, 0, 4), x0: -4, x1: 4, dir: 1, speed: 2.2, radius: 0.85, rot: 0, snow: true },
  ];
  const hoppers = [{ ...at(230, 4, 0.4), homeX: 4, homeZ: zz(230), homeY: 0.4, vy: 0, hopping: false, t: rnd(), period: 1.6, dirx: 1, dirz: 0, radius: 0.9 }];
  const flyers = [{ cx: 0, cz: zz(400), cy: 8, x: 0, y: 8, z: zz(400), ang: rnd() * 6, span: 8, radius: 0.9 }];
  const winds = [{ z0: zz(400), z1: zz(440), x0: -8, x1: 8, y0: 3, y1: 12, ax: 1 }];
  const lava = { z0: zz(160), z1: zz(255), x0: -30, x1: 30 };
  const checkpoints = ["meadow", "canyon", "sky", "ice", "climb"].map((id) => {
    const zone = zones.find((z) => z.id === id);
    return { x: 0, y: 0, z: zone.z0 + 8, name: zone.name, row: 0 };
  });
  const spawns = [{ x: 0, y: 0, z: zz(18), row: 0, col: 0 }];
  for (let n = 1; n < 16; n++) {
    const row = Math.floor((n - 1) / 5);
    const col = (n - 1) % 5;
    spawns.push({ x: (col - 2) * 2.2, y: 0, z: zz(24 + row * 3.2), row: row + 1, col });
  }
  const islands = [
    { x: 0, y: 0.5, z: zz(198), r: 2.4, zone: "canyon" },
    { x: 0, y: 0.5, z: zz(214), r: 2.4, zone: "canyon" },
    { x: 0, y: 5.4, z: zz(390), r: 2.6, zone: "sky" },
    { x: 0, y: 5.4, z: zz(406), r: 2.4, zone: "sky" },
  ];

  return {
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
    checkpoints,
    waypoints: routes[0],
    routes,
    openDoor,
    spawns,
    ship,
    endZ: ship.z,
  };
}
