import * as THREE from "three";

const ZONE_SKY = {
  meadow: { top: 0x5cc8ff, mid: 0x9fe0ff, fog: 0x8fd4f2, bot: 0x6fbf8a, near: 72, far: 230 },
  canyon: { top: 0xff7a3a, mid: 0xffb07a, fog: 0xff9a62, bot: 0xc44820, near: 64, far: 200 },
  sky: { top: 0x7ecbff, mid: 0xc8eeff, fog: 0xb7e4ff, bot: 0x8ec8f0, near: 78, far: 250 },
  ice: { top: 0xc5ecff, mid: 0xe7f6ff, fog: 0xb7ddf8, bot: 0x6eb6ef, near: 70, far: 230 },
  climb: { top: 0xffc56a, mid: 0xffe0a0, fog: 0xffcf86, bot: 0xe09030, near: 68, far: 210 },
  ship: { top: 0x8fd4ff, mid: 0xffe7b0, fog: 0xc8e4ff, bot: 0x8ec0f0, near: 80, far: 240 },
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
    if ((Math.abs(t.col * 5 + t.row * 3) % 3) !== 0) continue;
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

  const grass = new THREE.ConeGeometry(0.22, 0.7, 5);
  const trunk = new THREE.CylinderGeometry(0.12, 0.16, 1.3, 6);
  const crown = new THREE.SphereGeometry(0.55, 8, 6);
  const post = new THREE.BoxGeometry(0.12, 0.7, 0.12);
  const column = new THREE.CylinderGeometry(0.28, 0.34, 2.4, 6);
  const lavaBlob = new THREE.SphereGeometry(0.45, 8, 6);
  const balloon = new THREE.SphereGeometry(0.42, 10, 8);
  const floe = new THREE.CylinderGeometry(0.7, 0.7, 0.12, 7);
  const scaffold = new THREE.BoxGeometry(0.16, 1.6, 0.16);
  const light = new THREE.SphereGeometry(0.12, 6, 6);
  const meadowExtra = meadow.filter((_, i) => i % 2 === 0);
  inst(grass, makeToon(0x3ea84a, gradientMap), meadowExtra, (d, t, i) => {
    d.position.set(t.x + (t.col > 0 ? 0.3 : -0.3), t.y + 0.35, t.z);
    d.rotation.set(0.1, i, 0);
    d.scale.set(1, 1, 1);
  });
  inst(puff, makeToon(0xff8fd1, gradientMap), meadow.filter((_, i) => i % 3 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.16, t.z + 0.4);
    d.rotation.set(0, 0, 0);
    d.scale.set(0.45, 0.35, 0.45);
  });
  inst(trunk, makeToon(0xc47a55, gradientMap), meadow.filter((_, i) => i % 4 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.7, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });
  inst(crown, makeToon(0x7fd88a, gradientMap), meadow.filter((_, i) => i % 4 === 0), (d, t, i) => {
    d.position.set(t.x, t.y + 1.55, t.z);
    d.rotation.set(0, i, 0);
    d.scale.set(1.1, 0.8, 1.1);
  });
  inst(post, makeToon(0xfff6e5, gradientMap), meadow.filter((_, i) => i % 5 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.35, t.z + 0.8);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });

  const lavaMat = new THREE.MeshToonMaterial({ color: 0xff7a1a, emissive: 0xff7a1a, emissiveIntensity: 0.45, gradientMap });
  inst(column, makeToon(0x3a2438, gradientMap), picks.canyon.filter((_, i) => i % 2 === 0), (d, t, i) => {
    d.position.set(t.x, t.y - 0.2, t.z);
    d.rotation.set(0, i, 0);
    d.scale.set(1, 0.8 + (i % 3) * 0.25, 1);
  });
  inst(lavaBlob, lavaMat, picks.canyon, (d, t, i) => {
    d.position.set(t.x + (t.col > 0 ? 0.8 : -0.8), t.y - 0.2, t.z);
    d.rotation.set(0, i, 0);
    d.scale.set(1.1, 0.55, 0.9);
  });

  inst(balloon, makeToon(0xff8fd1, gradientMap), picks.sky.filter((_, i) => i % 3 === 0), (d, t, i) => {
    d.position.set(t.x, t.y + 3.2 + (i % 3), t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1.15, 1);
  });
  inst(puff, makeToon(0xffffff, gradientMap), picks.sky, (d, t, i) => {
    d.position.set(t.x + (t.col > 0 ? 2 : -2), t.y + 2.4, t.z);
    d.rotation.set(0, i, 0);
    d.scale.set(1.6, 0.7, 1.2);
  });

  inst(floe, makeToon(0xf4fbff, gradientMap), picks.ice.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.08, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });
  inst(crystal, makeToon(0x9b7bff, gradientMap), picks.ice.filter((_, i) => i % 2 === 1), (d, t, i) => {
    d.position.set(t.x, t.y + 1.1, t.z + 0.4);
    d.rotation.set(0.2, i, 0);
    d.scale.setScalar(1.35);
  });

  inst(scaffold, makeToon(0xfff6e5, gradientMap), picks.climb.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 0.8, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });
  inst(rock, makeToon(0x8a5a3a, gradientMap), picks.climb.filter((_, i) => i % 3 === 0), (d, t, i) => {
    d.position.set(t.x, t.y + 0.3, t.z + 0.6);
    d.rotation.set(0.4, i, 0.2);
    d.scale.setScalar(0.55);
  });
  const warnMat = new THREE.MeshToonMaterial({ color: 0xff6b6b, emissive: 0xff6b6b, emissiveIntensity: 0.7, gradientMap });
  inst(light, warnMat, picks.climb.filter((_, i) => i % 2 === 0), (d, t) => {
    d.position.set(t.x, t.y + 1.7, t.z);
    d.rotation.set(0, 0, 0);
    d.scale.set(1, 1, 1);
  });

  const hillTint = { meadow: 0x3c9a48, canyon: 0x5c2a24, sky: 0x7ea6d0, ice: 0x3d8fd4, climb: 0xb86a28, ship: 0xe2b878 };
  const hillItems = [];
  const stations = course.stations || [];
  for (let i = 0; i < stations.length; i += 12) {
    const st = stations[i];
    if (!st || st.gap) continue;
    for (let layer = 0; layer < 2; layer++) {
      for (const side of [-1, 1]) {
        const dist = (layer === 0 ? 15 : 28) + hash(i + layer * 11 + side) * 7;
        const h = (layer === 0 ? 5 : 10) + hash(i + 4 + layer) * 7;
        hillItems.push({
          x: st.x + side * dist,
          y: st.y - 1.5,
          z: st.z + (hash(i + layer + 6) - 0.5) * 10,
          sx: 3.4 + hash(i + layer) * 4.5,
          sy: h,
          sz: 3.2 + hash(i + 8) * 3.5,
          color: hillTint[st.zone] || 0x7fd88a,
        });
      }
    }
  }
  const hillMesh = inst(new THREE.ConeGeometry(1, 1.7, 6), makeToon(0xffffff, gradientMap), hillItems, (d, item) => {
    d.position.set(item.x, item.y + item.sy * 0.55, item.z);
    d.rotation.set(0, item.sx, 0);
    d.scale.set(item.sx, item.sy, item.sz);
  });
  const mesas = hillItems.filter((_, i) => i % 3 === 0);
  inst(new THREE.CylinderGeometry(1, 1.2, 0.55, 6), makeToon(0xffffff, gradientMap), mesas, (d, item) => {
    d.position.set(item.x, item.y + item.sy * 0.35, item.z);
    d.rotation.set(0, item.sx, 0);
    d.scale.set(item.sx * 1.25, 1.4, item.sz * 1.15);
  });

  const river = [];
  for (let i = 0; i < stations.length; i += 3) {
    const st = stations[i];
    if (!st || st.zone !== "canyon" || st.gap) continue;
    river.push({ x: st.x + st.half - 0.2, y: st.y - 0.05, z: st.z });
    river.push({ x: st.x - st.half + 0.2, y: st.y - 0.05, z: st.z });
  }
  const riverMesh = inst(
    new THREE.BoxGeometry(2.1, 0.35, 2.4),
    new THREE.MeshBasicMaterial({ color: 0xff6a12 }),
    river,
    (d, item) => {
      d.position.set(item.x, item.y, item.z);
      d.rotation.set(0, 0, 0);
      d.scale.set(1, 1, 1);
    }
  );

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
      if (riverMesh) {
        river.forEach((item, i) => {
          const bub = 1 + Math.sin(time * 4.5 + item.z * 0.35) * 0.18;
          dummy.position.set(item.x, item.y + Math.sin(time * 3 + i) * 0.06, item.z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(bub, 0.7 + bub * 0.4, bub);
          dummy.updateMatrix();
          riverMesh.setMatrixAt(i, dummy.matrix);
        });
        riverMesh.instanceMatrix.needsUpdate = true;
      }
      void hillMesh;
      const p = race.player;
      const zone = race.zoneId || "meadow";
      const tint = zone === "canyon" ? 0xff7a1a : zone === "ice" ? 0xf4fbff : zone === "sky" ? 0xffffff : zone === "climb" ? 0xffd23f : 0xfff6c8;
      points.material.color.setHex(tint);
      points.material.size = zone === "ice" ? 0.28 : zone === "canyon" ? 0.22 : 0.16;
      points.material.opacity = zone === "ice" ? 0.55 + Math.abs(Math.sin(time * 7)) * 0.4 : 0.85;
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
