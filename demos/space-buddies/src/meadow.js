import * as THREE from "three";

// Meadow-only CC0 dressing. Other zones keep their existing props.
// Files live in assets/meadow/ and are fetched on their own, not inside game.js.

export const MEADOW_MODELS = {
  tree: "assets/meadow/tree.glb",
  treeFat: "assets/meadow/tree_fat.glb",
  pine: "assets/meadow/tree_pine.glb",
  bush: "assets/meadow/bush.glb",
  bushLarge: "assets/meadow/bush_large.glb",
  bushSmall: "assets/meadow/bush_small.glb",
  flowerRed: "assets/meadow/flower_red.glb",
  flowerYellow: "assets/meadow/flower_yellow.glb",
  flowerPurple: "assets/meadow/flower_purple.glb",
  grass: "assets/meadow/grass.glb",
  grassLarge: "assets/meadow/grass_large.glb",
  rock: "assets/meadow/rock_small.glb",
  rockLarge: "assets/meadow/rock_large.glb",
  mushroom: "assets/meadow/mushroom.glb",
  mushroomTall: "assets/meadow/mushroom_tall.glb",
  fence: "assets/meadow/fence.glb",
  fenceBroken: "assets/meadow/fence_broken.glb",
  platform: "assets/meadow/platform.glb",
  log: "assets/meadow/log.glb",
  saw: "assets/meadow/saw.glb",
  button: "assets/meadow/button.glb",
  door: "assets/meadow/door.glb",
};

const TINT = {
  woodbark: 0xc9844a,
  woodinner: 0xf0d2a4,
  wooddark: 0x8d5a32,
  wood: 0xe0a45c,
  leafsgreen: 0x3dce55,
  grass: 0x4ed65f,
  dirt: 0xd7b072,
  colorred: 0xff445c,
  coloryellow: 0xffd23f,
  colorpurple: 0xc98bff,
  metal: 0xfff4d2,
  heart: 0xff5b8a,
  _defaultmat: 0xfff6e5,
};

function tintOf(name) {
  const key = String(name || "").toLowerCase().replace(/[^a-z]/g, "");
  if (TINT[key]) return TINT[key];
  if (key.includes("leaf") || key.includes("grass")) return 0x3dce55;
  if (key.includes("wood") || key.includes("bark")) return 0xc9844a;
  if (key.includes("red")) return 0xff445c;
  if (key.includes("yellow")) return 0xffd23f;
  if (key.includes("purple")) return 0xc98bff;
  if (key.includes("dirt") || key.includes("rock")) return 0xb7c0cc;
  return 0xfff6e5;
}

function toonMat(src, gradientMap) {
  const name = (src && src.name) || "";
  const mat = new THREE.MeshToonMaterial({
    color: tintOf(name),
    gradientMap,
    side: THREE.DoubleSide,
    name,
  });
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      "float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);\n\toutgoingLight += rim * vec3(1.0, 0.96, 0.82) * 0.22;\n\t#include <opaque_fragment>"
    );
  };
  return mat;
}

function recolor(root, gradientMap) {
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    obj.material = toonMat(src, gradientMap);
  });
}

function partsOf(gltf, gradientMap) {
  gltf.scene.updateWorldMatrix(true, true);
  const parts = [];
  gltf.scene.traverse((obj) => {
    if (!obj.isMesh) return;
    const geom = obj.geometry.clone();
    geom.applyMatrix4(obj.matrixWorld);
    const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    parts.push({ geom, mat: toonMat(src, gradientMap) });
  });
  const box = new THREE.Box3().setFromObject(gltf.scene);
  return { parts, lift: -box.min.y };
}

function scatter(scene, gltf, gradientMap, spots) {
  if (!gltf || !spots.length) return;
  const { parts, lift } = partsOf(gltf, gradientMap);
  const dummy = new THREE.Object3D();
  for (const part of parts) {
    const mesh = new THREE.InstancedMesh(part.geom, part.mat, spots.length);
    mesh.frustumCulled = false;
    spots.forEach((spot, i) => {
      const s = spot.s;
      dummy.position.set(spot.x, (spot.y || 0) + lift * s, spot.z);
      dummy.rotation.set(0, spot.rot || 0, 0);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  }
  const shadow = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 12),
    new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.22, depthWrite: false }),
    spots.length
  );
  const dummyS = new THREE.Object3D();
  spots.forEach((spot, i) => {
    dummyS.position.set(spot.x, (spot.y || 0) + 0.05, spot.z);
    dummyS.rotation.set(-Math.PI / 2, 0, 0);
    dummyS.scale.setScalar(Math.max(0.35, spot.s * 1.6));
    dummyS.updateMatrix();
    shadow.setMatrixAt(i, dummyS.matrix);
  });
  shadow.instanceMatrix.needsUpdate = true;
  shadow.frustumCulled = false;
  scene.add(shadow);
}

function openSouth(a) {
  const south = Math.abs(a + Math.PI / 2);
  const north = Math.abs(a - Math.PI / 2);
  return south < 0.62 || north < 0.42;
}

export function placeMeadowDressing(scene, course, gradientMap, gltfs) {
  const hub = (course.hubs || []).find((h) => h.zone === "meadow") || { x: 0, z: 40, r: 24 };
  const at = (a, r, s, y) => ({
    x: hub.x + Math.cos(a) * r,
    z: hub.z + Math.sin(a) * r,
    rot: a,
    s,
    y: y || 0,
  });

  const trees = [0.15, 0.7, 2.05, 2.45, 2.9, -2.9, -2.4, -1.85].map((a, i) => at(a, 12.5, i % 2 ? 0.32 : 0.36));
  const fats = [1.15, 2.25, -2.6, -0.45].map((a) => at(a, 14.8, 0.4));
  const pines = [0.95, 2.65, -2.05].map((a) => at(a, 16.4, 0.34));
  const bushes = [];
  for (let i = 0; i < 12; i++) {
    const a = -2.8 + i * 0.48;
    if (openSouth(a)) continue;
    bushes.push(at(a, 8.4 + (i % 3) * 1.1, i % 2 ? 0.55 : 0.46));
  }
  const flowers = [];
  for (let i = 0; i < 8; i++) {
    const a = -2.4 + i * 0.7;
    if (Math.abs(Math.cos(a)) < 0.45) continue;
    flowers.push(at(a, 9.5 + (i % 2), 0.42));
  }
  const tufts = [];
  for (let i = 0; i < 16; i++) {
    const a = i * 0.9;
    const r = 6.5 + (i % 4) * 2.1;
    const spot = at(a, r, i % 2 ? 0.2 : 0.28);
    if (Math.abs(spot.x - hub.x) < 4.2 && spot.z < hub.z + 1) continue;
    tufts.push(spot);
  }
  const rocks = [0.2, 2.2, -2.2, -0.5].map((a, i) => at(a, 17 + (i % 2), i % 2 ? 0.42 : 0.32));
  const shrooms = [1.2, 2.0, -2.1, -1.15].map((a) => at(a, 5.4, 0.7));
  const fences = [-1.15, -0.55, 0.15, 0.7].map((t) => ({
    x: hub.x - 19.2,
    z: hub.z + t * 6.2,
    rot: Math.PI / 2,
    s: 0.3,
    y: 0,
  }));
  const logs = [
    { x: hub.x - 16.5, z: hub.z - 6, rot: 0.4, s: 0.55, y: 0 },
    { x: hub.x + 15.5, z: hub.z + 4, rot: 1.2, s: 0.48, y: 0 },
  ];
  const mounds = (course.floors || []).filter((p) => p.zone === "meadow" && p.rx > 5 && p.rx < 9);
  const pads = mounds.map((p, i) => ({ x: p.x, z: p.z, y: p.y, rot: i, s: 0.62 }));

  scatter(scene, gltfs.tree, gradientMap, trees);
  scatter(scene, gltfs.treeFat, gradientMap, fats);
  scatter(scene, gltfs.pine, gradientMap, pines);
  scatter(scene, gltfs.bush, gradientMap, bushes.filter((_, i) => i % 3 === 0));
  scatter(scene, gltfs.bushLarge, gradientMap, bushes.filter((_, i) => i % 3 === 1));
  scatter(scene, gltfs.bushSmall, gradientMap, bushes.filter((_, i) => i % 3 === 2).map((s) => ({ ...s, s: s.s * 0.7 })));
  scatter(scene, gltfs.flowerRed, gradientMap, flowers.filter((_, i) => i % 3 === 0));
  scatter(scene, gltfs.flowerYellow, gradientMap, flowers.filter((_, i) => i % 3 === 1));
  scatter(scene, gltfs.flowerPurple, gradientMap, flowers.filter((_, i) => i % 3 === 2));
  scatter(scene, gltfs.grass, gradientMap, tufts.filter((_, i) => i % 2 === 0));
  scatter(scene, gltfs.grassLarge, gradientMap, tufts.filter((_, i) => i % 2 === 1));
  scatter(scene, gltfs.rock, gradientMap, rocks);
  scatter(scene, gltfs.rockLarge, gradientMap, rocks.filter((_, i) => i % 2 === 0).map((s) => ({ ...s, s: 0.38 })));
  scatter(scene, gltfs.mushroomTall, gradientMap, shrooms);
  scatter(scene, gltfs.fence, gradientMap, fences);
  scatter(scene, gltfs.fenceBroken, gradientMap, fences.slice(0, 2).map((s) => ({ ...s, x: s.x + 2.2, s: 0.26 })));
  scatter(scene, gltfs.log, gradientMap, logs);
  scatter(scene, gltfs.platform, gradientMap, pads);
  scatter(scene, gltfs.door, gradientMap, [{ x: hub.x + 17.5, z: hub.z - 2, rot: -0.6, s: 0.28, y: 0 }]);

  if (gltfs.mushroom) {
    const hero = gltfs.mushroom.scene.clone(true);
    recolor(hero, gradientMap);
    const box = new THREE.Box3().setFromObject(gltfs.mushroom.scene);
    const s = 4.15;
    hero.scale.setScalar(s);
    hero.position.set(hub.x, -box.min.y * s, hub.z);
    const shells = [];
    hero.traverse((obj) => {
      if (obj.isMesh) shells.push(obj);
    });
    for (const obj of shells) {
      const shell = new THREE.Mesh(obj.geometry, new THREE.MeshBasicMaterial({ color: 0x1e2440, side: THREE.BackSide }));
      shell.scale.setScalar(1.045);
      obj.add(shell);
    }
    scene.add(hero);
  }
}

export function meadowProp(gltf, gradientMap, scale, centered) {
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const group = gltf.scene.clone(true);
  recolor(group, gradientMap);
  group.scale.setScalar(scale);
  if (!centered) group.position.y = -box.min.y * scale;
  return group;
}
