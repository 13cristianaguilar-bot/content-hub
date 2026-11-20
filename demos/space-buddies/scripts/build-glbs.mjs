// Headless stand-in for Blender. bpy and blender are not installed here,
// so this writes the same stylized meshes as glTF binary files.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../assets/models");

function sphere(r, w, h) {
  const pos = [];
  const nor = [];
  const idx = [];
  for (let y = 0; y <= h; y++) {
    const phi = (y / h) * Math.PI;
    for (let x = 0; x <= w; x++) {
      const theta = (x / w) * Math.PI * 2;
      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(theta);
      pos.push(nx * r, ny * r, nz * r);
      nor.push(nx, ny, nz);
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = y * (w + 1) + x;
      const b = a + w + 1;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  return { pos, nor, idx };
}

function box(w, h, d) {
  const x = w / 2;
  const y = h / 2;
  const z = d / 2;
  const faces = [
    [[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z], [0, 0, 1]],
    [[x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z], [0, 0, -1]],
    [[x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z], [1, 0, 0]],
    [[-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z], [-1, 0, 0]],
    [[-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z], [0, 1, 0]],
    [[-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z], [0, -1, 0]],
  ];
  const pos = [];
  const nor = [];
  const idx = [];
  faces.forEach((face, f) => {
    const n = face[4];
    for (let i = 0; i < 4; i++) {
      pos.push(face[i][0], face[i][1], face[i][2]);
      nor.push(n[0], n[1], n[2]);
    }
    const a = f * 4;
    idx.push(a, a + 1, a + 2, a, a + 2, a + 3);
  });
  return { pos, nor, idx };
}

function cylinder(rt, rb, h, seg) {
  const pos = [];
  const nor = [];
  const idx = [];
  const y0 = -h / 2;
  const y1 = h / 2;
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pos.push(c * rt, y1, s * rt, c * rb, y0, s * rb);
    nor.push(c, 0, s, c, 0, s);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const top = pos.length / 3;
  pos.push(0, y1, 0);
  nor.push(0, 1, 0);
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    pos.push(Math.cos(a) * rt, y1, Math.sin(a) * rt);
    nor.push(0, 1, 0);
  }
  for (let i = 0; i < seg; i++) idx.push(top, top + 1 + i, top + 2 + i);
  const bot = pos.length / 3;
  pos.push(0, y0, 0);
  nor.push(0, -1, 0);
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    pos.push(Math.cos(a) * rb, y0, Math.sin(a) * rb);
    nor.push(0, -1, 0);
  }
  for (let i = 0; i < seg; i++) idx.push(bot, bot + 2 + i, bot + 1 + i);
  return { pos, nor, idx };
}

function move(geo, x, y, z, sx = 1, sy = 1, sz = 1) {
  const pos = [];
  const nor = [];
  for (let i = 0; i < geo.pos.length; i += 3) {
    pos.push(geo.pos[i] * sx + x, geo.pos[i + 1] * sy + y, geo.pos[i + 2] * sz + z);
    const nx = geo.nor[i] / sx;
    const ny = geo.nor[i + 1] / sy;
    const nz = geo.nor[i + 2] / sz;
    const len = Math.hypot(nx, ny, nz) || 1;
    nor.push(nx / len, ny / len, nz / len);
  }
  return { pos, nor, idx: geo.idx.slice() };
}

function merge(parts) {
  const pos = [];
  const nor = [];
  const idx = [];
  for (const part of parts) {
    const base = pos.length / 3;
    pos.push(...part.pos);
    nor.push(...part.nor);
    for (const i of part.idx) idx.push(i + base);
  }
  return { pos, nor, idx };
}

function pad4(n) {
  return (n + 3) & ~3;
}

function glbFrom(nodes) {
  const binParts = [];
  const bufferViews = [];
  const accessors = [];
  const meshes = [];
  const materials = [];
  const glNodes = nodes.map((node) => {
    const pos = new Float32Array(node.geo.pos);
    const nor = new Float32Array(node.geo.nor);
    const idx = new Uint16Array(node.geo.idx);
    const chunks = [
      Buffer.from(pos.buffer),
      Buffer.from(nor.buffer),
      Buffer.from(idx.buffer),
    ];
    const viewIds = chunks.map((buf) => {
      const start = binParts.reduce((n, b) => n + b.length, 0);
      const pad = Buffer.alloc(pad4(start) - start);
      binParts.push(pad, buf);
      const offset = start + pad.length;
      bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: buf.length });
      return bufferViews.length - 1;
    });
    const base = accessors.length;
    accessors.push(
      { bufferView: viewIds[0], componentType: 5126, count: pos.length / 3, type: "VEC3", min: min3(pos), max: max3(pos) },
      { bufferView: viewIds[1], componentType: 5126, count: nor.length / 3, type: "VEC3" },
      { bufferView: viewIds[2], componentType: 5123, count: idx.length, type: "SCALAR" }
    );
    const mat = materials.length;
    const c = node.color;
    materials.push({
      name: node.name,
      pbrMetallicRoughness: { baseColorFactor: [c[0], c[1], c[2], 1], metallicFactor: 0, roughnessFactor: 0.62 },
      emissiveFactor: node.emissive || [0, 0, 0],
    });
    meshes.push({ primitives: [{ attributes: { POSITION: base, NORMAL: base + 1 }, indices: base + 2, material: mat }] });
    return { name: node.name, mesh: meshes.length - 1 };
  });
  const bin = Buffer.concat(binParts);
  const json = {
    asset: { version: "2.0", generator: "space-buddies-build-glbs" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: "Root", children: glNodes.map((_, i) => i + 1) }, ...glNodes],
    meshes,
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: bin.length }],
  };
  const jsonBuf = Buffer.from(JSON.stringify(json));
  const jsonPad = Buffer.alloc(pad4(jsonBuf.length) - jsonBuf.length, 0x20);
  const binPad = Buffer.alloc(pad4(bin.length) - bin.length);
  const jsonChunk = Buffer.concat([jsonBuf, jsonPad]);
  const binChunk = Buffer.concat([bin, binPad]);
  const total = 12 + 8 + jsonChunk.length + 8 + binChunk.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(total, 8);
  const jh = Buffer.alloc(8);
  jh.writeUInt32LE(jsonChunk.length, 0);
  jh.writeUInt32LE(0x4e4f534a, 4);
  const bh = Buffer.alloc(8);
  bh.writeUInt32LE(binChunk.length, 0);
  bh.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([header, jh, jsonChunk, bh, binChunk]);
}

function min3(arr) {
  let x = Infinity;
  let y = Infinity;
  let z = Infinity;
  for (let i = 0; i < arr.length; i += 3) {
    x = Math.min(x, arr[i]);
    y = Math.min(y, arr[i + 1]);
    z = Math.min(z, arr[i + 2]);
  }
  return [x, y, z];
}

function max3(arr) {
  let x = -Infinity;
  let y = -Infinity;
  let z = -Infinity;
  for (let i = 0; i < arr.length; i += 3) {
    x = Math.max(x, arr[i]);
    y = Math.max(y, arr[i + 1]);
    z = Math.max(z, arr[i + 2]);
  }
  return [x, y, z];
}

function save(name, nodes) {
  const file = join(outDir, name);
  writeFileSync(file, glbFrom(nodes));
  console.log(name, nodes.length, "parts");
}

const INK = [0.12, 0.14, 0.25];
const CREAM = [1, 0.965, 0.9];
const SUN = [1, 0.824, 0.247];
const CORAL = [1, 0.42, 0.42];
const GRAPE = [0.55, 0.42, 1];
const ROCK = [0.73, 0.64, 0.85];
const NAVY = [0.18, 0.23, 0.42];

const eye = move(sphere(0.16, 8, 6), 0, 0, 0);
const shine = move(sphere(0.05, 6, 4), 0, 0, 0);

save("enemy_roller.glb", [
  { name: "RollerBody", color: ROCK, geo: merge([
    move(sphere(1, 8, 6), 0, 0, 0),
    move(sphere(0.28, 6, 4), 0.55, 0.35, 0.55),
    move(sphere(0.22, 6, 4), -0.62, 0.1, 0.4),
    move(sphere(0.18, 5, 4), 0.2, -0.45, 0.7),
  ]) },
  { name: "RollerEye", color: INK, geo: merge([move(eye, 0.28, 0.18, 0.78), move(eye, -0.28, 0.18, 0.78)]) },
  { name: "RollerMouth", color: CORAL, geo: move(box(0.34, 0.08, 0.08), 0, -0.12, 0.92) },
]);

save("enemy_hopper.glb", [
  { name: "HopperBody", color: GRAPE, geo: merge([
    move(sphere(0.68, 14, 10), 0, 0, 0, 1.05, 0.82, 0.95),
    move(sphere(0.22, 8, 6), -0.28, -0.42, 0.1, 1, 0.45, 1.2),
    move(sphere(0.22, 8, 6), 0.28, -0.42, 0.1, 1, 0.45, 1.2),
  ]) },
  { name: "HopperEye", color: INK, geo: merge([move(eye, 0.2, 0.16, 0.5), move(eye, -0.2, 0.16, 0.5)]) },
  { name: "HopperShine", color: [1, 1, 1], geo: merge([move(shine, 0.24, 0.22, 0.6), move(shine, -0.16, 0.22, 0.6)]) },
  { name: "HopperAntenna", color: CREAM, geo: merge([
    move(cylinder(0.035, 0.035, 0.42, 6), -0.18, 0.72, 0),
    move(cylinder(0.035, 0.035, 0.42, 6), 0.18, 0.72, 0),
  ]) },
  { name: "HopperBulb", color: SUN, emissive: [0.4, 0.3, 0.05], geo: merge([
    move(sphere(0.09, 8, 6), -0.18, 0.96, 0),
    move(sphere(0.09, 8, 6), 0.18, 0.96, 0),
  ]) },
]);

save("enemy_flyer.glb", [
  { name: "FlyerBody", color: CORAL, geo: merge([
    move(sphere(0.46, 12, 8), 0, 0, 0, 1.35, 0.55, 0.85),
    move(sphere(0.16, 8, 6), 0, -0.02, 0.42, 0.7, 0.45, 0.8),
    move(sphere(0.18, 8, 6), 0, 0.08, -0.48, 0.5, 0.35, 0.7),
  ]) },
  { name: "FlyerWings", color: SUN, geo: merge([
    move(box(0.85, 0.06, 0.42), 0.7, 0.02, 0),
    move(box(0.85, 0.06, 0.42), -0.7, 0.02, 0),
  ]) },
  { name: "FlyerEye", color: INK, geo: merge([move(sphere(0.09, 8, 6), 0.16, 0.12, 0.36), move(sphere(0.09, 8, 6), -0.16, 0.12, 0.36)]) },
]);

save("hazard_geyser.glb", [
  { name: "GeyserBase", color: NAVY, geo: move(cylinder(1.05, 1.2, 0.28, 12), 0, 0.14, 0) },
  { name: "GeyserJet", color: SUN, emissive: [0.6, 0.4, 0.05], geo: move(cylinder(0.28, 0.55, 1, 10), 0, 0, 0) },
  { name: "GeyserRing", color: CORAL, geo: move(cylinder(0.95, 0.95, 0.08, 16), 0, 0.22, 0, 1, 0.35, 1) },
]);

save("hazard_sweeper.glb", [
  { name: "SweeperBar", color: CORAL, geo: move(box(0.42, 0.32, 2.3), 0, 0, 0) },
  { name: "SweeperCap", color: SUN, geo: merge([
    move(sphere(0.34, 8, 6), 0, 0, 1.15),
    move(sphere(0.34, 8, 6), 0, 0, -1.15),
  ]) },
]);

save("hazard_pendulum.glb", [
  { name: "PendulumBob", color: CORAL, geo: move(box(1.15, 0.7, 0.7), 0, 0, 0) },
  { name: "PendulumCap", color: SUN, geo: move(cylinder(0.28, 0.42, 0.35, 8), 0, 0.48, 0) },
]);

mkdirSync(outDir, { recursive: true });
console.log("wrote", outDir);
