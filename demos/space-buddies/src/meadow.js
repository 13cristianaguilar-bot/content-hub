import * as THREE from "three";
import { plasticShader } from "./plastic.js";

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

export const EXTRA_MODELS = {
  cliff: "assets/kenney/cliff.glb",
  cliffLarge: "assets/kenney/cliff_large.glb",
  cliffTop: "assets/kenney/cliff_top.glb",
  formation: "assets/kenney/formation.glb",
  formationLarge: "assets/kenney/formation_large.glb",
  plank: "assets/kenney/plank.glb",
  block: "assets/kenney/block.glb",
  doorOpen: "assets/kenney/door_open.glb",
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

const windTime = { value: 0 };

export function tickFoliage(time) {
  windTime.value = time;
}

function toonMat(src, gradientMap, override, wind) {
  const name = (src && src.name) || "";
  const mat = new THREE.MeshToonMaterial({
    color: override ? override(name) : tintOf(name),
    gradientMap,
    side: THREE.DoubleSide,
    name,
  });
  mat.onBeforeCompile = (shader) => {
    plasticShader(shader, {});
    if (wind) {
      shader.uniforms.uWindTime = windTime;
      shader.vertexShader = "uniform float uWindTime;\n" + shader.vertexShader.replace(
        "vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;",
        "float sway = sin(uWindTime * 1.7 + position.x * 0.45 + position.z * 0.2) * 0.075 * smoothstep(0.3, 1.8, position.y);\ntransformed.x += sway;\ntransformed.z += sway * 0.35;\nvPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );
    }
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

function partsOf(gltf, gradientMap, override, wind) {
  gltf.scene.updateWorldMatrix(true, true);
  const parts = [];
  gltf.scene.traverse((obj) => {
    if (!obj.isMesh) return;
    const geom = obj.geometry.clone();
    geom.applyMatrix4(obj.matrixWorld);
    const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    parts.push({ geom, mat: toonMat(src, gradientMap, override, wind) });
  });
  const box = new THREE.Box3().setFromObject(gltf.scene);
  return { parts, lift: -box.min.y };
}

function scatter(scene, gltf, gradientMap, spots, override, wind) {
  if (!gltf || !spots.length) return;
  const { parts, lift } = partsOf(gltf, gradientMap, override, wind);
  const dummy = new THREE.Object3D();
  for (const part of parts) {
    const mesh = new THREE.InstancedMesh(part.geom, part.mat, spots.length);
    mesh.frustumCulled = true;
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
    new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.3, depthWrite: false }),
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
  shadow.userData.blobShadow = true;
  scene.add(shadow);
}

function cluster(cx, cz, n, spread, scale) {
  const spots = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2.4 + cx * 0.1;
    const rr = spread * (0.25 + (i % 4) * 0.22);
    spots.push({
      x: cx + Math.cos(a) * rr,
      z: cz + Math.sin(a) * rr,
      rot: a,
      s: scale * (0.82 + (i % 3) * 0.14),
      y: 0,
    });
  }
  return spots;
}

function ring(cx, cz, count, radius, scale, y, phase) {
  const spots = [];
  for (let i = 0; i < count; i++) {
    const a = phase + (i / count) * Math.PI * 2;
    spots.push({
      x: cx + Math.cos(a) * radius,
      z: cz + Math.sin(a) * radius,
      rot: a,
      s: scale * (0.85 + (i % 3) * 0.12),
      y,
    });
  }
  return spots;
}

const CANYON_TINT = (name) => {
  const key = String(name || "").toLowerCase();
  if (key.includes("sand") || key.includes("grass") || key.includes("leaf")) return 0xe07a32;
  if (key.includes("red")) return 0xc44838;
  if (key.includes("wood") || key.includes("dirt")) return 0x8a3a28;
  return 0x6e2e22;
};

function candyBlobs(scene, spots, color, gradientMap) {
  if (!spots.length) return;
  const geo = new THREE.SphereGeometry(0.85, 12, 9);
  const mat = new THREE.MeshToonMaterial({ color, gradientMap });
  const mesh = new THREE.InstancedMesh(geo, mat, spots.length);
  const dummy = new THREE.Object3D();
  const shadow = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 12),
    new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.3, depthWrite: false }),
    spots.length
  );
  const dummyS = new THREE.Object3D();
  spots.forEach((spot, i) => {
    dummy.position.set(spot.x, (spot.y || 0) + 0.7 * spot.s, spot.z);
    dummy.scale.set(spot.s, spot.s * 0.82, spot.s);
    dummy.rotation.set(0, spot.rot || 0, 0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    dummyS.position.set(spot.x, (spot.y || 0) + 0.06, spot.z);
    dummyS.rotation.set(-Math.PI / 2, 0, 0);
    dummyS.scale.setScalar(Math.max(0.5, spot.s * 1.4));
    dummyS.updateMatrix();
    shadow.setMatrixAt(i, dummyS.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  shadow.instanceMatrix.needsUpdate = true;
  shadow.userData.blobShadow = true;
  scene.add(mesh, shadow);
}
const SKY_TINT = (name) => {
  const key = String(name || "").toLowerCase();
  if (key.includes("leaf") || key.includes("grass") || key.includes("sand")) return 0x7ee0c8;
  return 0xd58bff;
};
const ICE_TINT = (name) => {
  const key = String(name || "").toLowerCase();
  if (key.includes("leaf") || key.includes("grass") || key.includes("sand")) return 0x7ee8ff;
  return 0x2f9dff;
};
const CLIMB_TINT = (name) => {
  const key = String(name || "").toLowerCase();
  if (key.includes("leaf") || key.includes("grass") || key.includes("sand")) return 0xffc23a;
  return 0xff7a1a;
};

const MEADOW_HILL = (name) => {
  const key = String(name || "").toLowerCase();
  if (key.includes("sand") || key.includes("grass") || key.includes("leaf")) return 0x3dce55;
  if (key.includes("wood") || key.includes("dirt")) return 0x8d6844;
  return 0x6d5840;
};

export function placeMeadowDressing(scene, course, gradientMap, gltfs) {
  const hub = (course.hubs || []).find((h) => h.zone === "meadow") || { x: 0, z: 40, r: 24 };
  const trees = cluster(hub.x - 10, hub.z - 1, 6, 3.2, 0.62);
  const fats = cluster(hub.x + 9, hub.z + 13, 4, 2.8, 0.72);
  const pines = cluster(hub.x - 8, hub.z + 12, 3, 2.2, 0.58);
  const bushes = cluster(hub.x - 11, hub.z + 6, 5, 2.4, 0.85);
  const flowersA = cluster(hub.x - 7, hub.z - 13, 8, 2.2, 0.78);
  const flowersB = cluster(hub.x + 8, hub.z - 9, 7, 2, 0.72);
  const tufts = cluster(hub.x + 6, hub.z - 14, 8, 2.6, 0.42).concat(cluster(hub.x - 6, hub.z + 8, 6, 2.2, 0.4));
  const rocks = cluster(hub.x + 16, hub.z + 2, 5, 2.6, 0.95);
  const shrooms = [
    { x: hub.x + 7.2, z: hub.z - 5.5, rot: 0.4, s: 2.15, y: 0 },
    { x: hub.x + 9.4, z: hub.z - 7.2, rot: 1.2, s: 1.55, y: 0 },
    { x: hub.x + 6.1, z: hub.z - 7.6, rot: 2.1, s: 1.25, y: 0 },
  ];
  const fences = [];
  for (let i = 0; i < 6; i++) {
    fences.push({ x: hub.x - 18.6, z: hub.z - 12 + i * 3.6, rot: Math.PI / 2, s: 0.52, y: 0 });
  }
  const mounds = (course.floors || []).filter((p) => p.zone === "meadow" && p.rx > 5 && p.rx < 9);
  const pads = mounds.map((p, i) => ({ x: p.x, z: p.z, y: p.y, rot: i, s: 0.85 }));

  scatter(scene, gltfs.tree, gradientMap, trees, null, true);
  scatter(scene, gltfs.treeFat, gradientMap, fats, null, true);
  scatter(scene, gltfs.pine, gradientMap, pines, null, true);
  scatter(scene, gltfs.bushLarge, gradientMap, bushes, null, true);
  scatter(scene, gltfs.bush, gradientMap, cluster(hub.x + 12, hub.z + 8, 4, 2, 0.7), null, true);
  scatter(scene, gltfs.flowerRed, gradientMap, flowersA.filter((_, i) => i % 2 === 0), null, true);
  scatter(scene, gltfs.flowerYellow, gradientMap, flowersA.filter((_, i) => i % 2 === 1), null, true);
  scatter(scene, gltfs.flowerPurple, gradientMap, flowersB, null, true);
  scatter(scene, gltfs.grass, gradientMap, tufts, null, true);
  scatter(scene, gltfs.grassLarge, gradientMap, cluster(hub.x - 9, hub.z - 8, 4, 1.8, 0.48), null, true);
  scatter(scene, gltfs.rockLarge, gradientMap, rocks);
  scatter(scene, gltfs.rock, gradientMap, cluster(hub.x + 15, hub.z - 1, 4, 1.6, 0.55));
  scatter(scene, gltfs.mushroomTall, gradientMap, shrooms);
  scatter(scene, gltfs.fence, gradientMap, fences);
  scatter(scene, gltfs.log, gradientMap, [{ x: hub.x - 15.5, z: hub.z - 8, rot: 0.5, s: 0.7, y: 0 }]);
  scatter(scene, gltfs.platform, gradientMap, pads);
  scatter(scene, gltfs.cliff, gradientMap, ring(hub.x, hub.z, 12, 21.2, 0.62, -1.2, 0.05), MEADOW_HILL);
  scatter(scene, gltfs.cliffLarge, gradientMap, ring(hub.x, hub.z, 12, 23.4, 0.55, -1.5, 0.2), MEADOW_HILL);
  scatter(scene, gltfs.cliffTop, gradientMap, ring(hub.x, hub.z, 8, 36, 1.15, -1.2, 0.4), MEADOW_HILL);

  if (gltfs.mushroom) {
    const hero = gltfs.mushroom.scene.clone(true);
    recolor(hero, gradientMap);
    const box = new THREE.Box3().setFromObject(gltfs.mushroom.scene);
    const s = 4.6;
    hero.scale.setScalar(s);
    hero.position.set(hub.x, -box.min.y * s, hub.z);
    const spots = [[0.22, 1.28, 0.05], [-0.18, 1.22, 0.2], [0.05, 1.32, -0.22], [0.28, 1.18, -0.12]];
    spots.forEach((p, i) => {
      const dot = gltfs.mushroomTall.scene.clone(true);
      recolor(dot, gradientMap);
      dot.scale.setScalar(0.16 + (i % 2) * 0.05);
      dot.position.set(p[0], p[1], p[2]);
      dot.rotation.y = i;
      hero.add(dot);
    });
    scene.add(hero);
  }

  const canyon = (course.hubs || []).find((h) => h.zone === "canyon");
  const crater = course.crater;
  if (canyon) {
    const cx = crater ? crater.x : canyon.x;
    const cz = crater ? crater.z : canyon.z;
    candyBlobs(scene, ring(cx, cz, 5, 24, 0.85, 0.15, 0.2), 0xc48a72, gradientMap);
    candyBlobs(scene, ring(cx, cz, 4, 28, 0.6, 0.1, 0.4), 0xd8c49a, gradientMap);
    scatter(scene, gltfs.cliffLarge, gradientMap, ring(canyon.x, canyon.z, 10, 21, 0.7, -1.4, 0.05), CANYON_TINT);
    scatter(scene, gltfs.cliff, gradientMap, ring(canyon.x, canyon.z, 10, 23.2, 0.62, -1.6, 0.18), CANYON_TINT);
    scatter(scene, gltfs.cliffTop, gradientMap, ring(canyon.x, canyon.z, 7, 36, 1.25, -0.8, 0.3), CANYON_TINT);
    const arch = [
      { x: canyon.x - 16, z: canyon.z + 8, rot: 0.4, s: 0.7, y: 0 },
      { x: canyon.x - 16, z: canyon.z + 14, rot: 0.4, s: 0.7, y: 0 },
      { x: canyon.x - 16, z: canyon.z + 11, rot: Math.PI / 2, s: 0.55, y: 4.2 },
    ];
    scatter(scene, gltfs.cliff, gradientMap, arch.slice(0, 2), CANYON_TINT);
    scatter(scene, gltfs.cliffTop, gradientMap, arch.slice(2), CANYON_TINT);
    const wallZ = course.doors && course.doors[0] ? course.doors[0].z : cz + 28;
    if (gltfs.block) {
      scatter(scene, gltfs.block, gradientMap, [
        { x: -12.6, z: wallZ, rot: 0, s: 0.28, y: 0.15 },
        { x: 12.6, z: wallZ, rot: 0, s: 0.28, y: 0.15 },
      ], CANYON_TINT);
    }
  }
  const sky = (course.hubs || []).find((h) => h.zone === "sky");
  const ice = (course.hubs || []).find((h) => h.zone === "ice");
  const climb = (course.hubs || []).find((h) => h.zone === "climb");
  if (sky) {
    scatter(scene, gltfs.pine, gradientMap, ring(sky.x, sky.z, 6, 14, 0.42, 4.2, 0.2), SKY_TINT, true);
    scatter(scene, gltfs.bush, gradientMap, ring(sky.x, sky.z, 5, 18, 0.45, 4.1, 0.6), SKY_TINT, true);
    scatter(scene, gltfs.cliffTop, gradientMap, ring(sky.x, sky.z, 6, 28, 1, 2, 0.4), SKY_TINT);
  }
  if (ice) {
    scatter(scene, gltfs.pine, gradientMap, ring(ice.x, ice.z, 7, 14, 0.4, 3.2, 0.3), ICE_TINT, true);
    candyBlobs(scene, ring(ice.x, ice.z, 6, 16, 0.7, 3.1, 0.8), 0x3ec8ff, gradientMap);
    scatter(scene, gltfs.cliff, gradientMap, ring(ice.x, ice.z, 12, 18, 0.5, 1.6, 0.1), ICE_TINT);
  }
  if (climb) {
    scatter(scene, gltfs.tree, gradientMap, ring(climb.x, climb.z, 6, 13, 0.4, 3.2, 0.5), CLIMB_TINT, true);
    candyBlobs(scene, ring(climb.x, climb.z, 5, 15, 0.75, 3, 1), 0xff9a2a, gradientMap);
    scatter(scene, gltfs.cliffLarge, gradientMap, ring(climb.x, climb.z, 10, 18, 0.55, 1.4, 0.2), CLIMB_TINT);
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
