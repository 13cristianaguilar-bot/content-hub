import * as THREE from "three";

const ZONE_SKY = {
  meadow: { top: 0x5cc8ff, mid: 0x9fe0ff, fog: 0x8fd4f2, bot: 0x6fbf8a, near: 72, far: 230 },
  canyon: { top: 0x3d7cf0, mid: 0x8ec4ff, fog: 0xf2c8aa, bot: 0xff7a3c, near: 180, far: 380 },
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
  g.fillStyle = "#c5d0e4";
  g.fillRect(0, 0, 1, 1);
  g.fillStyle = "#ffe7c8";
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

  const crystal = new THREE.ConeGeometry(0.28, 1.15, 5);
  const rock = new THREE.IcosahedronGeometry(0.55, 0);
  const puff = new THREE.SphereGeometry(0.32, 8, 6);
  const pipe = new THREE.CylinderGeometry(0.18, 0.18, 1.4, 8);
  const chunk = new THREE.IcosahedronGeometry(0.9, 0);

  // Meadow props are real CC0 models placed in meadow.js.

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

  const column = new THREE.CylinderGeometry(0.28, 0.34, 2.4, 6);
  const lavaBlob = new THREE.SphereGeometry(0.45, 8, 6);
  const balloon = new THREE.SphereGeometry(0.42, 10, 8);
  const floe = new THREE.CylinderGeometry(0.7, 0.7, 0.12, 7);
  const scaffold = new THREE.BoxGeometry(0.16, 1.6, 0.16);
  const light = new THREE.SphereGeometry(0.12, 6, 6);

  const basalt = picks.canyon.filter((_, i) => hash(i + 4) > 0.62);
  inst(new THREE.IcosahedronGeometry(0.7, 1), makeToon(0x2a1c22, gradientMap), basalt, (d, t, i) => {
    const j = hash(i + t.z);
    d.position.set(t.x + (j - 0.5) * 1.8, t.y + 0.15 + j * 0.4, t.z + (hash(i + 2) - 0.5) * 1.6);
    d.rotation.set(j * 2, hash(i) * 4, hash(i + 9));
    d.scale.set(0.45 + j * 1.3, 0.55 + hash(i + 3) * 1.6, 0.5 + hash(i + 6) * 1.1);
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

  function organicBlob() {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const n = 1 + Math.sin(x * 2.8 + y * 1.7) * 0.22 + Math.sin(z * 2.4 + 0.6) * 0.16;
      const cap = y > 0.15 ? 0.62 : 1.05;
      pos.setXYZ(i, x * n, (y * n * cap) + 0.2, z * n);
    }
    geo.computeVertexNormals();
    return geo;
  }
  function terraceGeo() {
    const geo = new THREE.CylinderGeometry(1, 1.25, 1.1, 7, 3);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const grass = y > 0.25;
      colors[i * 3] = grass ? 0.35 : 0.45;
      colors[i * 3 + 1] = grass ? 0.72 : 0.32;
      colors[i * 3 + 2] = grass ? 0.32 : 0.24;
      if (y > 0.35) pos.setY(i, y * 0.45 + 0.35);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }
  const hillTint = { meadow: 0x3c9a48, canyon: 0x4a2420, sky: 0x7ea6d0, ice: 0x3d8fd4, climb: 0xb86a28, ship: 0xe2b878 };
  const hillItems = [];
  const stations = course.stations || [];
  if (course.hubs && course.hubs.length) {
    course.hubs.forEach((hub, hi) => {
      if (hub) return;
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2 + hi * 0.4;
        const dist = hub.r + 6 + hash(hi * 19 + k) * 12;
        const mound = 4.2 + hash(k + hi * 5) * 5.5;
        hillItems.push({
          x: hub.x + Math.cos(a) * dist,
          y: -0.4,
          z: hub.z + Math.sin(a) * dist,
          s: mound,
          ry: a,
          rx: (hash(k + 2) - 0.5) * 0.25,
          color: hillTint[hub.zone] || 0x7fd88a,
          zone: hub.zone,
          side: Math.cos(a) > 0 ? 1 : -1,
        });
      }
    });
  }
  for (let i = 0; i < stations.length && !(course.hubs && course.hubs.length); i += 14) {
    const st = stations[i];
    if (!st || st.gap) continue;
    for (let layer = 0; layer < 2; layer++) {
      for (const side of [-1, 1]) {
        const hsh = hash(i + layer * 17 + side * 3);
        const dist = (layer === 0 ? 16 : 30) + hsh * 8;
        const mound = 3.2 + hash(i + 4 + layer) * 4.2;
        hillItems.push({
          x: st.x + side * dist,
          y: st.y - 0.8,
          z: st.z + (hash(i + layer + 6) - 0.5) * 12,
          s: mound * (layer === 0 ? 1 : 1.35),
          ry: hsh * 6.2,
          rx: (hash(i + 2) - 0.5) * 0.4,
          color: hillTint[st.zone] || 0x7fd88a,
          zone: st.zone,
          side,
        });
      }
    }
  }
  const hillMesh = inst(organicBlob(), makeToon(0xffffff, gradientMap), hillItems, (d, item) => {
    d.position.set(item.x, item.y + item.s * 0.35, item.z);
    d.rotation.set(item.rx, item.ry, item.rx * 0.5);
    d.scale.set(item.s, item.s * 0.72, item.s * 0.9);
  });
  const mesaMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
  const mesas = hillItems.filter((_, i) => i % 3 === 0).map((item) => ({ ...item, color: 0 }));
  inst(terraceGeo(), mesaMat, mesas, (d, item) => {
    d.position.set(item.x, item.y + 0.4, item.z);
    d.rotation.set(0, item.ry, 0);
    d.scale.set(item.s * 0.85, item.s * 0.55, item.s * 0.8);
  });

  const lavaMats = [];
  function lavaChannel(side) {
    const pts = stations.filter((st) => st && st.zone === "canyon" && !st.gap);
    if (pts.length < 4) return;
    const step = 2;
    const used = [];
    for (let i = 0; i < pts.length; i += step) used.push(pts[i]);
    const positions = [];
    const uvs = [];
    const indices = [];
    used.forEach((st, i) => {
      const wobble = Math.sin(st.z * 0.09) * 0.9 + Math.sin(st.z * 0.027) * 0.55;
      const width = 1.15 + Math.sin(st.z * 0.06 + side) * 0.4;
      const cx = st.x + side * (st.half + 1.15 + wobble * 0.35);
      positions.push(cx - width * 0.65, st.y - 0.55, st.z, cx + width * 0.65, st.y - 0.42, st.z);
      const v = i / Math.max(1, used.length - 1);
      uvs.push(0, v * 8, 1, v * 8);
    });
    for (let i = 0; i < used.length - 1; i++) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }",
    });
    scene.add(new THREE.Mesh(geo, mat));
    lavaMats.push(mat);
  }
  if (course.crater) {
    const crater = course.crater;
    const geo = new THREE.CircleGeometry(crater.r, 36);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p); float flow=fract(r*4.0-uTime*0.32); float ang=sin(atan(p.y,p.x)*5.0+uTime*0.8); float body=smoothstep(0.48,0.08,r); float streak=smoothstep(0.05,0.95,flow); vec3 col=mix(vec3(0.45,0.08,0.02), vec3(1.0,0.42,0.05), streak*0.65); col+=vec3(1.0,0.28,0.02)*ang*0.08*body; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }",
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(crater.x, crater.y, crater.z);
    scene.add(mesh);
    lavaMats.push(mat);
  } else {
    lavaChannel(1);
    lavaChannel(-1);
  }

  const falls = hillItems.filter((item, i) => (item.zone === "meadow" || item.zone === "sky") && i % 7 === 0).slice(0, 10);
  const fallMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: "uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }",
  });
  lavaMats.push(fallMat);
  for (const item of falls) {
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 4.2), fallMat);
    sheet.position.set(item.x + item.side * 1.5, item.y + item.s * 0.2, item.z);
    scene.add(sheet);
  }

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
      for (const mat of lavaMats) mat.uniforms.uTime.value = time;
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
