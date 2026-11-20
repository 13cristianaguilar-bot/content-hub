import * as THREE from "three";

const ZONE_SKY = {
  meadow: { top: 0x5cc8ff, mid: 0xc8f4ff, fog: 0xb7ecff, near: 36, far: 118 },
  canyon: { top: 0xff9a62, mid: 0xffd0a4, fog: 0xffc194, near: 26, far: 88 },
  sky: { top: 0x7ecbff, mid: 0xeaf8ff, fog: 0xd4f2ff, near: 34, far: 120 },
  ice: { top: 0xd9f3ff, mid: 0xf7fbff, fog: 0xd7eefe, near: 28, far: 100 },
  climb: { top: 0xffc56a, mid: 0xffe6b0, fog: 0xffdf9e, near: 30, far: 96 },
  ship: { top: 0x8fd4ff, mid: 0xfff3d4, fog: 0xd5eeff, near: 40, far: 140 },
};

export function zoneSky(id) {
  return ZONE_SKY[id] || ZONE_SKY.meadow;
}

function hash(n) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function makeToonTexture() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 1;
  const g = c.getContext("2d");
  g.fillStyle = "#b7c3dc";
  g.fillRect(0, 0, 1, 1);
  g.fillStyle = "#e7eef8";
  g.fillRect(1, 0, 1, 1);
  g.fillStyle = "#ffffff";
  g.fillRect(2, 0, 2, 1);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.NoColorSpace || THREE.LinearSRGBColorSpace;
  return tex;
}

export function makeToon(color, gradientMap) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap,
    side: THREE.DoubleSide,
  });
}

export function buildDressing(scene, course, gradientMap) {
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const groups = [];

  function inst(geo, mat, items, place) {
    if (!items.length) return null;
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    items.forEach((item, i) => {
      place(dummy, item, i);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (item.color) {
        color.set(item.color);
        mesh.setColorAt(i, color);
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
    groups.push(mesh);
    return mesh;
  }

  const picks = { meadow: [], canyon: [], sky: [], ice: [], climb: [], ship: [] };
  for (const t of course.tiles) {
    if (!picks[t.zone]) continue;
    if (Math.abs(t.col) < 2) continue;
    if ((Math.abs(t.col * 5 + t.row * 3) % 8) !== 0) continue;
    picks[t.zone].push(t);
  }

  const mushStem = new THREE.CylinderGeometry(0.12, 0.16, 0.45, 7);
  const mushCap = new THREE.SphereGeometry(0.38, 10, 8);
  const crystal = new THREE.ConeGeometry(0.28, 1.15, 5);
  const rock = new THREE.IcosahedronGeometry(0.55, 0);
  const puff = new THREE.SphereGeometry(0.32, 8, 6);
  const pipe = new THREE.CylinderGeometry(0.18, 0.18, 1.4, 8);
  const chunk = new THREE.IcosahedronGeometry(0.9, 0);

  const meadow = picks.meadow;
  inst(mushStem, makeToon(0xfff6e5, gradientMap), meadow, (d, t) => {
    d.position.set(t.x + (t.col > 0 ? 0.4 : -0.4), t.y + 0.22, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });
  inst(mushCap, makeToon(0xff5fa2, gradientMap), meadow, (d, t, i) => {
    d.position.set(t.x + (t.col > 0 ? 0.4 : -0.4), t.y + 0.55, t.z);
    d.rotation.set(0, i, 0);
    d.scale.set(1, 0.62, 1);
  });
  inst(puff, makeToon(0x7fd88a, gradientMap), meadow.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.28, t.z + 0.6);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 0.7, 1);
  });

  inst(rock, makeToon(0xc47a55, gradientMap), picks.canyon, (d, t, i) => {
    d.position.set(t.x, t.y + 0.35, t.z);
    d.rotation.set(i, i * 0.5, 0);
    d.scale.set(1, 0.75, 1.1);
  });
  inst(pipe, makeToon(0x2e3a6b, gradientMap), picks.canyon.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.35, t.z);
    d.rotation.set(0, 0, Math.PI / 2);
    d.scale.set(1, 1, 1);
  });

  inst(crystal, makeToon(0xb7e4ff, gradientMap), picks.sky, (d, t, i) => {
    d.position.set(t.x, t.y + 0.55, t.z);
    d.rotation.set(0.1, i, 0.2);
    d.scale.setScalar(0.8 + (i % 3) * 0.15);
  });

  inst(crystal, makeToon(0xc9b6ff, gradientMap), picks.ice, (d, t, i) => {
    d.position.set(t.x, t.y + 0.7, t.z);
    d.rotation.set(0, i, 0.15);
    d.scale.setScalar(1 + (i % 3) * 0.2);
  });
  inst(puff, makeToon(0xf4fbff, gradientMap), picks.ice.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.28, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1.15, 0.7, 1.15);
  });

  inst(rock, makeToon(0xe0a15a, gradientMap), picks.climb, (d, t, i) => {
    d.position.set(t.x, t.y + 0.4, t.z);
    d.rotation.set(0.2, i, 0);
    d.scale.setScalar(0.7);
  });

  const floats = [];
  const floatTint = { meadow: 0x7fd88a, canyon: 0xff7a1a, sky: 0xb7e4ff, ice: 0xd7f3ff, climb: 0xffc56a, ship: 0xfff6e5 };
  for (let i = 0; i < 36; i++) {
    const z = (course.ship.z * (i + 0.5)) / 36;
    const side = i % 2 === 0 ? -1 : 1;
    let zone = course.zones[0].id;
    for (const item of course.zones) if (z >= item.z0) zone = item.id;
    floats.push({
      x: side * (14 + hash(i) * 8),
      y: 6 + hash(i + 3) * 8,
      z,
      s: 0.6 + hash(i + 9) * 0.9,
      phase: hash(i + 2) * 6,
      color: floatTint[zone] || 0xfff6e5,
    });
  }
  const floatMesh = inst(chunk, makeToon(0xffffff, gradientMap), floats, (d, item) => {
    d.position.set(item.x, item.y, item.z);
    d.rotation.set(item.phase, item.phase * 0.3, 0);
    d.scale.setScalar(item.s);
  });

  const N = 160;
  const positions = new Float32Array(N * 3);
  const seeds = [];
  for (let i = 0; i < N; i++) {
    seeds.push({
      ox: (hash(i) - 0.5) * 18,
      oy: hash(i + 1) * 6,
      oz: (hash(i + 2) - 0.4) * 22,
      sp: 0.4 + hash(i + 4) * 1.6,
    });
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: 0xfff6e5,
      size: 0.16,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(points);

  return {
    update(race, dt) {
      const time = race.time || 0;
      if (floatMesh) {
        floats.forEach((item, i) => {
          dummy.position.set(item.x, item.y + Math.sin(time * 0.7 + item.phase) * 0.45, item.z);
          dummy.rotation.set(item.phase, time * 0.15 + item.phase, 0);
          dummy.scale.setScalar(item.s);
          dummy.updateMatrix();
          floatMesh.setMatrixAt(i, dummy.matrix);
        });
        floatMesh.instanceMatrix.needsUpdate = true;
      }
      const p = race.player;
      const zone = race.zoneId || "meadow";
      const tint = zone === "canyon" ? 0xff7a1a : zone === "ice" ? 0xf4fbff : zone === "sky" ? 0xffffff : zone === "climb" ? 0xffd23f : 0xfff6c8;
      points.material.color.setHex(tint);
      const wind = zone === "sky" ? 4 : zone === "canyon" ? 0.4 : 0.8;
      for (let i = 0; i < N; i++) {
        const s = seeds[i];
        const bob = ((time * s.sp * wind) + s.oy) % 7;
        positions[i * 3] = p.pos.x + s.ox + (zone === "sky" ? Math.sin(time + i) * 0.4 : 0);
        positions[i * 3 + 1] = p.pos.y + 0.4 + bob;
        positions[i * 3 + 2] = p.pos.z + s.oz;
      }
      geo.attributes.position.needsUpdate = true;
      void dt;
    },
  };
}

export { makeToonTexture };
