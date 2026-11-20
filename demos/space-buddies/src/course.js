import { HEX_SIZE } from "./config.js";

export const HEX_DX = HEX_SIZE * Math.sqrt(3);
export const HEX_DZ = HEX_SIZE * 1.5;

const EVEN = [[1, 0], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]];
const ODD = [[1, 0], [1, -1], [0, -1], [-1, 0], [0, 1], [1, 1]];

export function offsetToWorld(col, row) {
  return {
    x: HEX_DX * (col + 0.5 * (row & 1)),
    z: HEX_DZ * row,
  };
}

export function tileAt(course, x, z) {
  const row = Math.round(z / HEX_DZ);
  const col = Math.round(x / HEX_DX - 0.5 * (row & 1));
  let best = null;
  let bestD = 2.25 * 2.25;
  const cells = [[col, row]];
  const neigh = (row & 1) ? ODD : EVEN;
  for (let i = 0; i < neigh.length; i++) cells.push([col + neigh[i][0], row + neigh[i][1]]);
  for (let i = 0; i < cells.length; i++) {
    const t = course.map.get(cells[i][0] + "," + cells[i][1]);
    if (!t) continue;
    const d = (t.x - x) * (t.x - x) + (t.z - z) * (t.z - z);
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }
  return best;
}

const ZONE_COLORS = {
  meadow: { top: "#7FD88A", side: "#E7B56A" },
  canyon: { top: "#D4835A", side: "#8A4B3C" },
  sky: { top: "#B7E4FF", side: "#8ECAE6" },
  ice: { top: "#F4FBFF", side: "#B9DFF2" },
  climb: { top: "#F6C98A", side: "#E0A15A" },
  ship: { top: "#FFE8C2", side: "#F0C98A" },
};

function zonesFor(quick) {
  if (quick) {
    return {
      meadow: [0, 12],
      canyon: [14, 28],
      sky: [30, 46],
      ice: [48, 58],
      climb: [60, 72],
      ship: [74, 82],
    };
  }
  return {
    meadow: [0, 42],
    canyon: [44, 96],
    sky: [98, 156],
    ice: [158, 198],
    climb: [200, 238],
    ship: [240, 252],
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function createCourse(cfg) {
  const bands = zonesFor(!!cfg.quick);
  const tiles = [];
  const map = new Map();
  const bumpers = [];
  const spinners = [];
  const pads = [];
  const platforms = [];
  const pendulums = [];
  const sweepers = [];
  const geysers = [];
  const rollers = [];
  const hoppers = [];
  const flyers = [];
  const checkpoints = [];

  function add(col, row, y, props) {
    const key = col + "," + row;
    if (map.has(key)) return map.get(key);
    const p = offsetToWorld(col, row);
    const tile = {
      col, row, x: p.x, z: p.z, y,
      index: tiles.length,
      state: "solid",
      crackT: 0,
      fallT: 0,
      jitter: ((col * 13 + row * 7) % 10) / 10,
      stepped: false,
      dirty: true,
      skirt: false,
      ice: false,
      fragile: false,
      conveyX: 0,
      tiltAmp: 0,
      tiltPhase: (col + row) * 0.7,
      tiltAxis: "z",
      zone: props.zone,
      topColor: props.topColor,
      sideColor: props.sideColor,
      ...props,
    };
    tiles.push(tile);
    map.set(key, tile);
    return tile;
  }

  function fill(row0, row1, col0, col1, yFn, zone) {
    const colors = ZONE_COLORS[zone];
    for (let row = row0; row <= row1; row++) {
      for (let col = col0; col <= col1; col++) {
        const y = typeof yFn === "function" ? yFn(col, row) : yFn;
        add(col, row, y, { zone, topColor: colors.top, sideColor: colors.side });
      }
    }
  }

  function carve(row0, row1, col0, col1) {
    for (let row = row0; row <= row1; row++) {
      for (let col = col0; col <= col1; col++) {
        const key = col + "," + row;
        const t = map.get(key);
        if (!t) continue;
        map.delete(key);
        t.removed = true;
      }
    }
  }

  function at(zone, t) {
    const [a, b] = bands[zone];
    return Math.round(a + (b - a) * t);
  }

  function tileY(col, row) {
    const t = map.get(col + "," + row);
    return t ? t.y : 0;
  }

  // Meadow: wide grass, a stepped hill, crumbling edges.
  const [m0, m1] = bands.meadow;
  fill(m0, m1, -4, 4, 0, "meadow");
  for (let row = m0; row <= m1; row++) {
    for (const col of [-4, 4]) {
      const t = map.get(col + "," + row);
      if (t) t.skirt = true;
    }
  }
  const hillRows = [at("meadow", 0.32), at("meadow", 0.38), at("meadow", 0.44)];
  for (const col of [-1, 0, 1]) {
    const a = map.get(col + "," + hillRows[0]);
    const b = map.get(col + "," + hillRows[1]);
    const c = map.get(col + "," + hillRows[2]);
    if (a) a.y = 0.48;
    if (b) b.y = 0.95;
    if (c) c.y = 0.48;
  }
  // Side path, a little hidden behind the hill. Faster if you take the pads.
  fill(at("meadow", 0.22), at("meadow", 0.62), -6, -5, 0.4, "meadow");

  bumpers.push(marker("meadow", 0.18, -2, 0));
  bumpers.push(marker("meadow", 0.2, 2, 0));
  bumpers.push(marker("meadow", 0.55, 0, 0));
  bumpers.push(marker("meadow", 0.72, -2, 0));
  bumpers.push(marker("meadow", 0.74, 2, 0));
  pads.push(marker("meadow", 0.28, -5, 0.4));
  pads.push(marker("meadow", 0.4, -5, 0.4));
  pads.push(marker("meadow", 0.52, -5, 0.4));

  const rollerRow = at("meadow", 0.84);
  const rollerZ = offsetToWorld(0, rollerRow).z;
  rollers.push({
    x: offsetToWorld(-3, rollerRow).x,
    z: rollerZ,
    y: 0.7,
    x0: offsetToWorld(-3, rollerRow).x,
    x1: offsetToWorld(3, rollerRow).x,
    dir: 1,
    speed: 3.4,
    radius: 1.15,
    rot: 0,
  });

  checkpoints.push(point(m0 + 2, 0, 0, "START"));
  checkpoints.push(point(m1, 0, 0, "MEADOW"));

  // Lava canyon: the path climbs onto rock shelves. Pits drop into rising lava.
  const [c0, c1] = bands.canyon;
  const canyonY = (col, row) => {
    const t = (row - c0) / Math.max(1, c1 - c0);
    if (t < 0.18) return lerp(0, 2.5, t / 0.18);
    return 2.7;
  };
  fill(c0, c1, -3, 3, canyonY, "canyon");
  // A low shortcut that the lava swallows if you linger.
  fill(at("canyon", 0.22), at("canyon", 0.48), 4, 5, 0.35, "canyon");
  const lowJoin = at("canyon", 0.5);
  fill(lowJoin, lowJoin + 1, 3, 4, 1.4, "canyon");

  const gapA = at("canyon", 0.36);
  const gapB = at("canyon", 0.62);
  carve(gapA, gapA + 1, -3, 3);
  carve(gapB, gapB + 1, -1, 1);
  // Keep side shelves beside the second gap so you can go around or jump the middle.
  pads.push(marker("canyon", 0.33, -1, 2.7));
  pads.push(marker("canyon", 0.33, 0, 2.7));
  pads.push(marker("canyon", 0.33, 1, 2.7));

  for (const frac of [0.28, 0.46, 0.74]) {
    const row = at("canyon", frac);
    for (const col of [-3, 3]) {
      const t = map.get(col + "," + row);
      if (t) t.fragile = true;
    }
  }
  geysers.push(geyser(at("canyon", 0.44), 0, 2.7, 2.6));
  geysers.push(geyser(at("canyon", 0.7), -2, 2.7, 3.1));
  geysers.push(geyser(at("canyon", 0.78), 2, 2.7, 2.4));

  const hopRow = at("canyon", 0.88);
  hoppers.push({
    x: offsetToWorld(0, hopRow).x,
    z: offsetToWorld(0, hopRow).z,
    y: 2.7,
    homeX: offsetToWorld(0, hopRow).x,
    homeZ: offsetToWorld(0, hopRow).z,
    homeY: 2.7,
    vy: 0,
    hopping: false,
    t: 0.4,
    period: 1.7,
    dirx: 1,
    dirz: 0,
    radius: 0.85,
  });

  sweepers.push({
    x: offsetToWorld(0, at("canyon", 0.56)).x,
    z: offsetToWorld(0, at("canyon", 0.56)).z,
    y: 2.7 + 0.42,
    originX: offsetToWorld(0, at("canyon", 0.56)).x,
    amp: 4.2,
    speed: 1.15,
    halfLen: 2.4,
    height: 0.42,
    full: true,
    radius: 0.7,
  });

  checkpoints.push(point(c0 + 2, 0, 1.2, "CANYON"));

  // Sky islands. Gaps, ferries, a spinner, a pendulum, wind.
  const [s0, s1] = bands.sky;
  // Islands are close enough that a short hop or a ferry covers the gap.
  const skyIslands = [
    [0.0, 0.15, 4.6],
    [0.19, 0.34, 5.7],
    [0.38, 0.53, 6.9],
    [0.57, 0.74, 6.4],
    [0.78, 1, 6.3],
  ];
  for (const [a, b, y] of skyIslands) {
    fill(at("sky", a), at("sky", b), -2, 2, y, "sky");
  }
  const lip = s0 - 1;
  fill(c1, lip, -1, 1, (col, row) => lerp(2.7, 4.3, (row - c1) / Math.max(1, lip - c1)), "canyon");

  function ferryAt(frac, y, phase) {
    const row = at("sky", frac);
    const p = offsetToWorld(0, row);
    platforms.push({
      id: platforms.length,
      kind: "ferry",
      originX: p.x,
      originZ: p.z,
      x: p.x,
      z: p.z,
      prevX: p.x,
      prevZ: p.z,
      y,
      amp: 1.55,
      speed: 0.8,
      phase,
      radius: 2.25,
      axis: "x",
    });
  }
  ferryAt(0.17, 5.1, 0.4);
  ferryAt(0.36, 6.25, 1.5);

  // Side pads: a readable shortcut that skips the ferry if you spot it.
  pads.push(marker("sky", 0.14, -2, 4.6));
  pads.push(marker("sky", 0.36, 2, 5.9));
  pads.push(marker("sky", 0.58, 0, 7.1));

  const spinRow = at("sky", 0.28);
  const spin = offsetToWorld(0, spinRow);
  spinners.push({ x: spin.x, z: spin.z, y: 5.9, angle: 0.4, spin: 1.7 });

  const pendRow = at("sky", 0.5);
  const pend = offsetToWorld(0, pendRow);
  pendulums.push({
    x: pend.x,
    z: pend.z,
    y: 7.1 + 3.3,
    len: 2.5,
    amp: 0.8,
    speed: 1.35,
    phase: 0.2,
    radius: 0.72,
  });

  const spinPlatRow = at("sky", 0.52);
  const spinPlat = offsetToWorld(1, spinPlatRow);
  platforms.push({
    id: platforms.length,
    kind: "spin",
    originX: spinPlat.x,
    originZ: spinPlat.z,
    x: spinPlat.x,
    z: spinPlat.z,
    prevX: spinPlat.x,
    prevZ: spinPlat.z,
    y: 7.28,
    amp: 0,
    speed: 1.6,
    phase: 0,
    radius: 1.65,
    axis: "spin",
  });

  const wind0 = at("sky", 0.84);
  const wind1 = at("sky", 0.98);
  fill(wind0, wind1, -3, 3, 6.45, "sky");

  const flyRow = at("sky", 0.86);
  const fly = offsetToWorld(0, flyRow);
  flyers.push({
    cx: fly.x,
    cz: fly.z,
    cy: 8.4,
    x: fly.x,
    y: 8.4,
    z: fly.z,
    ang: 0,
    span: 6.5,
    radius: 0.9,
  });

  checkpoints.push(point(s0 + 1, 0, 4.6, "SKY"));

  // Ice slide. Slippery, a few tilting tiles, conveyors that shove you sideways.
  const [i0, i1] = bands.ice;
  const iceY = (col, row) => {
    const t = (row - i0) / Math.max(1, i1 - i0);
    return lerp(6.4, 1.6, t);
  };
  fill(i0, i1, -2, 2, iceY, "ice");
  // Short ramp from the last sky island.
  fill(s1, i0, -1, 1, (col, row) => lerp(6.6, 6.4, (row - s1) / Math.max(1, i0 - s1)), "sky");
  for (let row = i0; row <= i1; row++) {
    for (let col = -2; col <= 2; col++) {
      const t = map.get(col + "," + row);
      if (t) t.ice = true;
    }
  }
  for (const frac of [0.3, 0.48, 0.7]) {
    const row = at("ice", frac);
    for (const col of [-1, 0, 1]) {
      const t = map.get(col + "," + row);
      if (!t) continue;
      t.tiltAmp = 0.22;
      t.tiltAxis = col === 0 ? "z" : "x";
    }
  }
  for (const frac of [0.38, 0.6]) {
    const row = at("ice", frac);
    for (const col of [-2, -1, 0, 1, 2]) {
      const t = map.get(col + "," + row);
      if (t) t.conveyX = frac < 0.5 ? 9 : -9;
    }
  }
  bumpers.push(marker("ice", 0.22, -1, null));
  bumpers.push(marker("ice", 0.8, 1, null));
  checkpoints.push(point(i0 + 1, 0, null, "ICE"));

  // Final climb to the ship. Steep walkable steps, spinners, one high sweeper.
  const [k0, k1] = bands.climb;
  const climbY = (col, row) => {
    const t = (row - k0) / Math.max(1, k1 - k0);
    return lerp(1.6, 10.2, t);
  };
  fill(k0, k1, -2, 2, climbY, "climb");
  fill(i1, k0, -1, 1, (col, row) => lerp(1.6, 1.7, (row - i1) / Math.max(1, k0 - i1)), "ice");

  const climbSpinA = at("climb", 0.28);
  const climbSpinB = at("climb", 0.62);
  spinners.push({
    x: offsetToWorld(-1, climbSpinA).x,
    z: offsetToWorld(-1, climbSpinA).z,
    y: climbY(0, climbSpinA),
    angle: 1,
    spin: -1.5,
  });
  spinners.push({
    x: offsetToWorld(1, climbSpinB).x,
    z: offsetToWorld(1, climbSpinB).z,
    y: climbY(0, climbSpinB),
    angle: 0.2,
    spin: 1.9,
  });
  const swY = climbY(0, at("climb", 0.45));
  sweepers.push({
    x: offsetToWorld(0, at("climb", 0.45)).x,
    z: offsetToWorld(0, at("climb", 0.45)).z,
    y: swY + 1.15,
    originX: offsetToWorld(0, at("climb", 0.45)).x,
    amp: 3.6,
    speed: 1.4,
    halfLen: 2.2,
    height: 1.15,
    full: false,
    radius: 0.62,
  });

  // A side stair that skips the second spinner. Easy to miss, shorter if you find it.
  const side0 = at("climb", 0.34);
  const side1 = at("climb", 0.7);
  for (let row = side0; row <= side1; row++) {
    const t = (row - side0) / Math.max(1, side1 - side0);
    const y = lerp(climbY(0, side0) + 0.4, climbY(0, side1) + 0.2, t);
    add(3, row, y, { zone: "climb", topColor: ZONE_COLORS.climb.top, sideColor: ZONE_COLORS.climb.side });
    add(4, row, y, { zone: "climb", topColor: ZONE_COLORS.climb.top, sideColor: ZONE_COLORS.climb.side });
  }
  pads.push({
    x: offsetToWorld(2, side0).x,
    z: offsetToWorld(2, side0).z,
    y: climbY(0, side0),
  });

  const [h0, h1] = bands.ship;
  const deck = climbY(0, k1);
  fill(k1, h1, -3, 3, deck, "ship");
  checkpoints.push(point(k0 + 1, 0, null, "CLIMB"));

  // Drop removed tiles and rebuild indices.
  const kept = tiles.filter((t) => !t.removed);
  kept.forEach((t, i) => {
    t.index = i;
  });
  const finalMap = new Map();
  for (const t of kept) finalMap.set(t.col + "," + t.row, t);

  function resolveY(row, col, fallback) {
    const t = finalMap.get(col + "," + row) || finalMap.get("0," + row);
    return t ? t.y : fallback;
  }

  // Fix markers that used null height.
  for (const b of bumpers) if (b.y == null) b.y = resolveY(b.row, b.col, 0);
  for (const list of [bumpers, spinners, pads]) {
    for (const item of list) {
      if (item.y == null) item.y = resolveY(item.row, item.col, 0);
    }
  }
  for (const cp of checkpoints) {
    if (cp.y == null) cp.y = resolveY(cp.row, 0, 0);
    const t = finalMap.get("0," + cp.row) || finalMap.get("-1," + cp.row);
    if (t) {
      cp.x = t.x;
      cp.z = t.z;
      cp.y = t.y;
    }
  }

  const shipRow = h0 + Math.floor((h1 - h0) * 0.62);
  const shipTile = finalMap.get("0," + shipRow) || kept[kept.length - 1];
  const ship = { x: shipTile.x, y: shipTile.y, z: shipTile.z, row: shipRow };

  const spawns = [];
  for (let row = m0 + 3; row <= m0 + 6; row++) {
    for (let col = -2; col <= 1; col++) {
      const t = finalMap.get(col + "," + row);
      if (t) spawns.push({ col, row, x: t.x, y: t.y, z: t.z });
    }
  }

  const waypoints = [];
  let maxRow = 0;
  for (const t of kept) if (t.row > maxRow) maxRow = t.row;
  for (let row = 0; row <= maxRow; row++) {
    let t = null;
    for (const col of [0, -1, 1, -2, 2, -3, 3, 4]) {
      const hit = finalMap.get(col + "," + row);
      if (!hit || hit.col <= -5) continue;
      if (hit.zone === "canyon" && hit.y < 1) continue;
      t = hit;
      break;
    }
    if (!t || (t.zone === "ship" && row > shipRow)) {
      if (waypoints.length) waypoints[waypoints.length - 1].gap = true;
      continue;
    }
    waypoints.push({ x: t.x, y: t.y, z: t.z, row, gap: false });
  }
  // Ship is the last goal, a little in front of the hull.
  waypoints.push({ x: ship.x, y: ship.y, z: ship.z - 4.5, row: shipRow, gap: false, ship: true });

  const winds = [{
    z0: offsetToWorld(0, wind0).z,
    z1: offsetToWorld(0, wind1).z + 2,
    x0: -12,
    x1: 12,
    y0: 4,
    y1: 14,
    ax: 1,
  }];

  const lava = {
    z0: offsetToWorld(0, c0).z - 2,
    z1: offsetToWorld(0, c1).z + 4,
    x0: -18,
    x1: 20,
  };

  return {
    tiles: kept,
    map: finalMap,
    bumpers: placeOnTiles(bumpers, finalMap),
    spinners: placeOnTiles(spinners, finalMap),
    pads: placeOnTiles(pads, finalMap),
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
    zones: [
      { id: "meadow", name: "MEADOW", z0: offsetToWorld(0, m0).z, z1: offsetToWorld(0, m1).z },
      { id: "canyon", name: "LAVA CANYON", z0: offsetToWorld(0, c0).z, z1: offsetToWorld(0, c1).z },
      { id: "sky", name: "SKY ISLANDS", z0: offsetToWorld(0, s0).z, z1: offsetToWorld(0, s1).z },
      { id: "ice", name: "ICE SLIDE", z0: offsetToWorld(0, i0).z, z1: offsetToWorld(0, i1).z },
      { id: "climb", name: "THE CLIMB", z0: offsetToWorld(0, k0).z, z1: offsetToWorld(0, k1).z },
      { id: "ship", name: "ESCAPE SHIP", z0: offsetToWorld(0, h0).z, z1: offsetToWorld(0, h1).z },
    ],
    endZ: ship.z,
  };

  function marker(zone, frac, col, y) {
    const row = at(zone, frac);
    const p = offsetToWorld(col, row);
    return { row, col, x: p.x, z: p.z, y };
  }

  function geyser(row, col, y, period) {
    const p = offsetToWorld(col, row);
    return { x: p.x, z: p.z, y, period, t: (row * 0.37) % period, hot: false, wasHot: false, warn: false, radius: 1.15 };
  }

  function point(row, col, y, name) {
    const p = offsetToWorld(col, row);
    return { row, col, x: p.x, z: p.z, y, name };
  }
}

function placeOnTiles(list, map) {
  return list.map((item) => {
    const t = map.get(item.col + "," + item.row);
    if (!t) return item;
    return { ...item, x: t.x, z: t.z, y: item.y == null ? t.y : item.y };
  });
}
