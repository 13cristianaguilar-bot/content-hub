import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { buildDressing, makeToonTexture, zoneSky } from "./dress.js";

const MODELS = {
  buddy: "assets/models/space_buddy.glb",
  bumper: "assets/models/obstacle_bumper.glb",
  spinner: "assets/models/obstacle_spinner.glb",
  pad: "assets/models/obstacle_jump_pad.glb",
  platform: "assets/models/obstacle_moving_platform.glb",
  lava: "assets/models/obstacle_lava_pool.glb",
  chunk: "assets/models/obstacle_falling_chunk.glb",
  ship: "assets/models/escape_ship.glb",
  roller: "assets/models/enemy_roller.glb",
  hopper: "assets/models/enemy_hopper.glb",
  flyer: "assets/models/enemy_flyer.glb",
  geyser: "assets/models/hazard_geyser.glb",
  sweeper: "assets/models/hazard_sweeper.glb",
  pendulum: "assets/models/hazard_pendulum.glb",
};

const TOON_MAP = makeToonTexture();

function lambert(src) {
  const color = src && src.color && src.color.isColor ? src.color.clone() : new THREE.Color(0xffffff);
  const emissive = src && src.emissive && src.emissive.isColor ? src.emissive.clone() : new THREE.Color(0);
  const mat = new THREE.MeshToonMaterial({
    color,
    emissive,
    emissiveIntensity: (src && src.emissiveIntensity) || 0,
    gradientMap: TOON_MAP,
    transparent: !!(src && src.transparent),
    opacity: src && src.opacity != null ? src.opacity : 1,
    side: THREE.DoubleSide,
    name: (src && src.name) || "",
  });
  if (/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(mat.name)) {
    mat.emissive.copy(color);
    mat.emissiveIntensity = Math.max(mat.emissiveIntensity, 0.55);
  }
  return mat;
}

function convert(root) {
  const cache = new Map();
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const mapMat = (src) => {
      if (!src) return new THREE.MeshLambertMaterial({ color: 0xffffff });
      if (cache.has(src.uuid)) return cache.get(src.uuid);
      const next = lambert(src);
      cache.set(src.uuid, next);
      return next;
    };
    if (Array.isArray(obj.material)) obj.material = obj.material.map(mapMat);
    else obj.material = mapMat(obj.material);
  });
}

function partsOf(root) {
  root.updateWorldMatrix(true, true);
  const parts = [];
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const geom = obj.geometry.clone();
    geom.applyMatrix4(obj.matrixWorld);
    geom.computeBoundingBox();
    const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    parts.push({ geom, mat, name: (mat && mat.name) || obj.name || "", maxY: geom.boundingBox.max.y });
  });
  return parts;
}

function damp(a, b, lambda, dt) {
  return b + (a - b) * Math.exp(-lambda * dt);
}

function dampAngle(a, b, lambda, dt) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * (1 - Math.exp(-lambda * dt));
}

export async function createWorld(canvas, course, cfg, onProgress) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  let dpr = Math.min(window.devicePixelRatio || 1, cfg.dprCap);
  const forced = new URLSearchParams(location.search).get("dpr");
  if (forced) dpr = Math.max(0.75, Math.min(2, Number(forced) || dpr));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x9fe8ff, cfg.fogNear, cfg.fogFar);
  const camera = new THREE.PerspectiveCamera(cfg.fovPortrait, 1, 0.15, 500);

  const hemi = new THREE.HemisphereLight(0xeaf8ff, 0xf6c98a, 0.95);
  const sun = new THREE.DirectionalLight(0xfff6e8, 1.2);
  sun.position.set(-18, 42, 14);
  scene.add(hemi, sun);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(380, 18, 12),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x5cc8ff) },
        mid: { value: new THREE.Color(0x9fe8ff) },
        bot: { value: new THREE.Color(0x2b1b4d) },
      },
      vertexShader: "varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ float h=normalize(vP).y; vec3 c=mix(mid, top, smoothstep(0.0, 0.55, h)); c=mix(bot, c, smoothstep(-0.35, 0.08, h)); gl_FragColor=vec4(c,1.0); }",
    })
  );
  scene.add(sky);

  const loader = new GLTFLoader();
  const keys = Object.keys(MODELS);
  const gltfs = {};
  let loaded = 0;
  await Promise.all(keys.map((key) => new Promise((resolve, reject) => {
    loader.load(MODELS[key], (gltf) => {
      convert(gltf.scene);
      gltfs[key] = gltf;
      loaded++;
      if (onProgress) onProgress(loaded / keys.length);
      resolve();
    }, undefined, reject);
  })));

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  function tileMeshes(gltf, tiles, which) {
    const parts = partsOf(gltf.scene);
    let shift = 0;
    for (const p of parts) shift = Math.max(shift, p.maxY);
    const meshes = [];
    for (const part of parts) {
      part.geom.translate(0, -shift, 0);
      const glow = /Crack|Glow/.test(part.name);
      const mat = glow
        ? new THREE.MeshToonMaterial({ color: 0xff7a1a, emissive: 0xff7a1a, emissiveIntensity: 0.85, gradientMap: TOON_MAP })
        : new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: TOON_MAP });
      const mesh = new THREE.InstancedMesh(part.geom, mat, tiles.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        dummy.position.set(tile.x, tile.y, tile.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        if (!glow) {
          const hex = part.maxY > shift - 0.25 ? tile.topColor : tile.sideColor;
          color.set(which === "crack" && part.maxY > shift - 0.25 ? tile.topColor : hex);
          mesh.setColorAt(i, color);
        } else {
          color.set(0xff7a1a);
          mesh.setColorAt(i, color);
        }
      }
      if (which === "crack") hideAll(mesh, tiles.length);
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
      scene.add(mesh);
      meshes.push(mesh);
    }
    return meshes;
  }

  function hideAll(mesh, count) {
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, -80, 0);
      dummy.scale.set(0, 0, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
  }

  const dressing = buildDressing(scene, course, TOON_MAP);
  const terrainMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: TOON_MAP, side: THREE.DoubleSide });
  const crackMat = new THREE.MeshToonMaterial({
    vertexColors: true,
    color: 0xffd0b0,
    emissive: 0xff7a1a,
    emissiveIntensity: 0.28,
    gradientMap: TOON_MAP,
    side: THREE.DoubleSide,
  });
  const chunkMeshes = [];
  for (const chunk of course.chunks) {
    if (chunk.gap || !chunk.positions) {
      chunkMeshes.push(null);
      continue;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(chunk.positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(chunk.colors, 3));
    geo.setIndex(new THREE.BufferAttribute(chunk.indices, 1));
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, terrainMat);
    mesh.frustumCulled = true;
    scene.add(mesh);
    chunk.mesh = mesh;
    chunkMeshes.push(mesh);
  }

  const debrisGeo = partsOf(gltfs.chunk.scene)[0].geom;
  const debrisMat = new THREE.MeshLambertMaterial({ color: 0xb9a3d9 });
  const debris = [];
  for (let i = 0; i < 24; i++) {
    const mesh = new THREE.Mesh(debrisGeo, debrisMat);
    mesh.visible = false;
    mesh.scale.setScalar(0.85);
    scene.add(mesh);
    debris.push({ mesh, active: false, vy: 0, life: 0 });
  }

  function cloneDrawn(gltf) {
    const obj = gltf.scene.clone(true);
    obj.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      node.material = Array.isArray(node.material) ? node.material.map((m) => m.clone()) : node.material.clone();
    });
    return obj;
  }

  function placeProp(gltf, x, y, z, rotY = 0, scl = 1) {
    const obj = gltf.scene.clone(true);
    obj.position.set(x, y, z);
    obj.rotation.y = rotY;
    obj.scale.setScalar(scl);
    scene.add(obj);
    return obj;
  }

  const bumperMeshes = course.bumpers.map((b) => placeProp(gltfs.bumper, b.x, b.y, b.z));
  const padMeshes = course.pads.map((p) => placeProp(gltfs.pad, p.x, p.y, p.z));
  const lavaDecals = [];
  for (let i = 0; i < 8; i++) {
    const z = course.lava.z0 + ((course.lava.z1 - course.lava.z0) * (i + 0.5)) / 8;
    lavaDecals.push(placeProp(gltfs.lava, 0, 0.2, z, 0, 1.8));
  }
  const spinnerObjs = course.spinners.map((s) => {
    const obj = placeProp(gltfs.spinner, s.x, s.y, s.z);
    const bar = obj.getObjectByName("Spinner_Bar");
    return { obj, bar };
  });
  const platformObjs = [];
  course.platforms.forEach((p, i) => {
    const obj = placeProp(gltfs.platform, p.x, p.y, p.z, 0, p.kind === "spin" ? 1.15 : 1.35);
    platformObjs[i] = obj;
  });

  const ship = gltfs.ship.scene;
  ship.scale.setScalar(cfg.shipScale);
  ship.position.set(course.ship.x, course.ship.y, course.ship.z);
  ship.rotation.y = Math.PI;
  scene.add(ship);
  const sockets = [];
  const seatMats = [];
  for (let i = 1; i <= 8; i++) {
    sockets.push(ship.getObjectByName("SeatSocket_" + i));
    const seat = ship.getObjectByName("Seat_" + i);
    const saved = [];
    if (seat) {
      seat.traverse((obj) => {
        if (!obj.isMesh) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        const clones = mats.filter(Boolean).map((m) => {
          const c = m.clone();
          saved.push({
            mat: c,
            color: c.color ? c.color.clone() : new THREE.Color(0xffffff),
            emissive: c.emissive ? c.emissive.clone() : new THREE.Color(0x000000),
            intensity: c.emissiveIntensity || 0,
          });
          return c;
        });
        obj.material = Array.isArray(obj.material) ? clones : clones[0];
      });
    }
    seatMats.push(saved);
  }

  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 1.3, 34, 10, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
  );
  beacon.position.y = 20;
  ship.add(beacon);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(3.1, 3.7, 28),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(course.ship.x, course.ship.y + 0.08, course.ship.z - 4.2);
  scene.add(ring);
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.85, 2.2, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd23f })
  );
  flame.rotation.x = Math.PI;
  flame.position.y = 0.15;
  flame.visible = false;
  const flame2 = flame.clone();
  flame2.material = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
  flame2.scale.setScalar(0.55);
  flame.add(flame2);
  ship.add(flame);

  const lava = new THREE.Mesh(
    new THREE.CircleGeometry(26, 28),
    new THREE.MeshBasicMaterial({ color: 0xff7a1a })
  );
  lava.rotation.x = -Math.PI / 2;
  lava.position.set(0, cfg.lavaStartY, (course.lava.z0 + course.lava.z1) / 2);
  scene.add(lava);

  const geyserMeshes = course.geysers.map((g) => {
    const group = cloneDrawn(gltfs.geyser);
    group.position.set(g.x, g.y, g.z);
    group.userData.jet = group.getObjectByName("GeyserJet");
    group.userData.ring = group.getObjectByName("GeyserRing");
    scene.add(group);
    return group;
  });

  const pendMeshes = course.pendulums.map(() => {
    const bob = cloneDrawn(gltfs.pendulum);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1, 6), new THREE.MeshToonMaterial({ color: 0x1e2440, gradientMap: TOON_MAP }));
    scene.add(bob, rope);
    return { bob, rope };
  });

  const sweepMeshes = course.sweepers.map((s) => {
    const group = cloneDrawn(gltfs.sweeper);
    group.scale.set(s.full ? 1.15 : 1, 1, 1);
    const bar = group.getObjectByName("SweeperBar");
    if (bar && bar.material && bar.material.color) bar.material.color.set(s.full ? 0xff7a1a : 0xff6b6b);
    scene.add(group);
    return group;
  });

  const rollerMeshes = course.rollers.map((r) => {
    const group = cloneDrawn(gltfs.roller);
    group.scale.setScalar(r.radius);
    scene.add(group);
    return group;
  });

  const hopperMeshes = course.hoppers.map(() => {
    const g = cloneDrawn(gltfs.hopper);
    g.userData.body = g.getObjectByName("HopperBody");
    scene.add(g);
    return g;
  });

  const flyerMeshes = course.flyers.map(() => {
    const g = cloneDrawn(gltfs.flyer);
    g.userData.wing = g.getObjectByName("FlyerWings");
    scene.add(g);
    return g;
  });

  for (let i = 0; i < 7; i++) {
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(2.2 + (i % 3), 8, 6), new THREE.MeshLambertMaterial({ color: 0xfff6e5 }));
    cloud.position.set(-18 + i * 9, 16 + (i % 2) * 3, course.zones[2].z0 + 20 + i * 18);
    cloud.scale.y = 0.45;
    scene.add(cloud);
  }

  const cpRings = course.checkpoints.map((cp) => {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.7, 0.95, 18),
      new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(cp.x, cp.y + 0.08, cp.z);
    scene.add(mesh);
    return mesh;
  });

  function gearMat(hex) {
    return new THREE.MeshToonMaterial({ color: hex, gradientMap: TOON_MAP });
  }
  function addBuddyGear(parent) {
    const kinds = {};
    const heli = new THREE.Group();
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.28, 5), gearMat(0xff6b6b));
    mast.position.y = 1.62;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.045, 0.1), gearMat(0xffd23f));
    blade.position.y = 1.76;
    heli.add(mast, blade);
    heli.userData.blade = blade;
    kinds.heli = heli;

    const goggles = new THREE.Group();
    for (const x of [-0.18, 0.18]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.04, 6, 10), gearMat(0x5c3b2e));
      ring.position.set(x, 1.18, 0.36);
      goggles.add(ring);
    }
    kinds.goggles = goggles;

    const stars = new THREE.Group();
    for (const x of [-0.18, 0.18]) {
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), gearMat(0x1e2440));
      star.position.set(x, 1.18, 0.4);
      star.scale.z = 0.35;
      stars.add(star);
    }
    kinds.stars = stars;

    const flower = new THREE.Group();
    const petals = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), gearMat(0xff8fd1));
    petals.position.y = 1.7;
    petals.scale.y = 0.45;
    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), gearMat(0xffd23f));
    heart.position.y = 1.72;
    flower.add(petals, heart);
    kinds.flower = flower;

    const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 6, 12), gearMat(0x5cc8ff));
    scarf.position.y = 0.78;
    scarf.rotation.x = Math.PI / 2;
    kinds.scarf = scarf;

    const fish = new THREE.Group();
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), new THREE.MeshToonMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.75, gradientMap: TOON_MAP }));
    bowl.position.y = 1.72;
    const fishBody = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), gearMat(0xff8a7a));
    fishBody.position.y = 1.72;
    fish.add(bowl, fishBody);
    kinds.fish = fish;

    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 5), gearMat(0xffd23f));
    crown.position.y = 1.72;
    kinds.crown = crown;

    for (const obj of Object.values(kinds)) {
      obj.visible = false;
      parent.add(obj);
    }
    return kinds;
  }

  const buddyGltf = gltfs.buddy;
  const visuals = [];
  const buddyRoot = new THREE.Group();
  scene.add(buddyRoot);
  const shadowGeo = new THREE.CircleGeometry(0.48, 14);
  const youTex = makeYouTexture();

  for (const racer of course.spawns.length ? Array.from({ length: cfg.racers }) : []) {
    /* filled below */
  }
  for (let i = 0; i < cfg.racers; i++) {
    const model = SkeletonUtils.clone(buddyGltf.scene);
    const colorHex = ["#5FE3B0", "#FFD23F", "#FF8FD1", "#8C6BFF", "#5CC8FF", "#7FD88A", "#C9B6E8", "#FFC38A", "#4C6FFF", "#2EC4B6", "#FF5FA2", "#C6E05A", "#9BB6FF", "#F0B429", "#FF8A7A", "#7AD0FF"][i % 16];
    model.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const next = mats.map((m) => {
        if (m.name === "Buddy_Mint") {
          const c = m.clone();
          c.color.set(colorHex);
          return c;
        }
        return m;
      });
      obj.material = Array.isArray(obj.material) ? next : next[0];
    });
    const mixer = new THREE.AnimationMixer(model);
    const actions = {};
    for (const clip of buddyGltf.animations) {
      const action = mixer.clipAction(clip);
      action.play();
      action.setEffectiveWeight(clip.name === "Idle" ? 1 : 0);
      actions[clip.name] = action;
    }
    if (i === 0) {
      model.traverse((obj) => {
        if (!obj.isSkinnedMesh) return;
        const outline = new THREE.SkinnedMesh(
          obj.geometry,
          new THREE.MeshBasicMaterial({ color: 0x1e2440, side: THREE.BackSide, transparent: true, opacity: 0.9 })
        );
        outline.bind(obj.skeleton, obj.bindMatrix);
        outline.scale.setScalar(1.05);
        obj.parent.add(outline);
      });
    }
    const accessories = addBuddyGear(model);
    const gearNames = ["classic", "heli", "goggles", "stars", "flower", "scarf", "fish", "crown"];
    const pick = gearNames[i % gearNames.length];
    if (accessories[pick]) accessories[pick].visible = true;
    const group = new THREE.Group();
    group.add(model);
    const shadow = new THREE.Mesh(shadowGeo, new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.28, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    group.add(shadow);
    let tag = null;
    if (i === 0) {
      const ringM = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.68, 18),
        new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide, depthWrite: false })
      );
      ringM.rotation.x = -Math.PI / 2;
      ringM.position.y = 0.05;
      group.add(ringM);
      tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: youTex, depthTest: true }));
      tag.scale.set(0.95, 0.42, 1);
      tag.position.y = 2.05;
      group.add(tag);
    }
    buddyRoot.add(group);
    visuals.push({ group, model, mixer, actions, shadow, current: "Idle", docked: false, accessories, pick, dusted: false, starred: false });
  }

  const confetti = [];
  const confColors = [0xffd23f, 0xff6b6b, 0x5fe3b0, 0xff8fd1, 0x5cc8ff];
  for (let i = 0; i < 70; i++) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.16, 0.22),
      new THREE.MeshBasicMaterial({ color: confColors[i % confColors.length], side: THREE.DoubleSide })
    );
    mesh.visible = false;
    scene.add(mesh);
    confetti.push({ mesh, v: new THREE.Vector3(), alive: false });
  }

  const state = {
    yaw: 0,
    pitch: cfg.defaultPitch,
    autoWait: 0,
    portrait: true,
    shake: 0,
  };

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    state.portrait = h >= w;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.fov = state.portrait ? cfg.fovPortrait : cfg.fovLandscape;
    camera.updateProjectionMatrix();
  }
  resize();

  function paintSeat(index, hex) {
    const saved = seatMats[index];
    if (!saved) return;
    for (const entry of saved) {
      if (!entry.mat.color) return;
      if (hex) {
        entry.mat.color.set(hex);
        if (entry.mat.emissive) {
          entry.mat.emissive.set(hex);
          entry.mat.emissiveIntensity = 0.35;
        }
      } else {
        entry.mat.color.copy(entry.color);
        if (entry.mat.emissive) {
          entry.mat.emissive.copy(entry.emissive);
          entry.mat.emissiveIntensity = entry.intensity;
        }
      }
    }
  }

  function burst(x, y, z) {
    for (const bit of confetti) {
      if (bit.alive) continue;
      bit.alive = true;
      bit.mesh.visible = true;
      bit.mesh.position.set(x, y, z);
      bit.v.set((Math.random() - 0.5) * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 4);
      break;
    }
  }

  let confettiOn = false;

  function update(race, dt, look) {
    for (const chunk of course.chunks) {
      const mesh = chunk.mesh;
      if (!mesh) continue;
      if (chunk.state === "gone") {
        mesh.visible = false;
        chunk.dirty = false;
        continue;
      }
      mesh.visible = true;
      mesh.material = chunk.state === "cracking" ? crackMat : terrainMat;
      const wobble = chunk.state === "cracking" ? Math.sin(race.time * 18 + chunk.jitter * 9) * 0.045 : 0;
      mesh.position.y = (chunk.fallY || 0) + wobble;
      if (chunk.state === "falling" && chunk.dirty && !chunk.spawned) {
        chunk.spawned = true;
        const bit = debris.find((d) => !d.active);
        if (bit) {
          bit.active = true;
          bit.life = 1.4;
          bit.vy = 0.6;
          bit.mesh.visible = true;
          bit.mesh.position.set(0, chunk.positions[1] || 0, (chunk.z0 + chunk.z1) * 0.5);
          bit.mesh.rotation.set(0, Math.random(), 0);
        }
      }
      chunk.dirty = false;
    }

    for (const bit of debris) {
      if (!bit.active) continue;
      bit.vy -= 12 * dt;
      bit.mesh.position.y += bit.vy * dt;
      bit.mesh.rotation.x += dt;
      bit.life -= dt;
      if (bit.life <= 0) {
        bit.active = false;
        bit.mesh.visible = false;
      }
    }

    for (let i = 0; i < race.spinners.length; i++) {
      const bar = spinnerObjs[i].bar;
      if (bar) bar.rotation.y = race.spinners[i].angle;
    }
    for (let i = 0; i < race.platforms.length; i++) {
      const p = race.platforms[i];
      const obj = platformObjs[i];
      obj.position.set(p.x, p.y, p.z);
      if (p.axis === "spin") obj.rotation.y += dt * p.speed;
    }
    for (let i = 0; i < race.geysers.length; i++) {
      const g = race.geysers[i];
      const group = geyserMeshes[i];
      const hot = g.hot ? 3.1 : g.warn ? 0.85 : 0.12;
      const jet = group.userData.jet;
      jet.scale.set(g.hot ? 1.3 : 1, hot, g.hot ? 1.3 : 1);
      jet.position.y = hot * 0.5;
      jet.material.color.set(g.hot ? 0xff7a1a : 0xffd23f);
      group.userData.ring.material.color.set(g.warn || g.hot ? 0xffd23f : 0xff7a1a);
      group.userData.ring.scale.setScalar(g.warn ? 1.25 : 1);
    }
    for (let i = 0; i < race.pendulums.length; i++) {
      const p = race.pendulums[i];
      const vis = pendMeshes[i];
      vis.bob.position.set(p.bobX, p.bobY, p.bobZ);
      vis.rope.position.set((p.x + p.bobX) / 2, (p.y + p.bobY) / 2, p.z);
      vis.rope.scale.y = p.len;
      vis.rope.lookAt(p.bobX, p.bobY, p.bobZ);
    }
    for (let i = 0; i < race.sweepers.length; i++) {
      const s = race.sweepers[i];
      sweepMeshes[i].position.set(s.x, s.y, s.z);
    }
    for (let i = 0; i < race.rollers.length; i++) {
      const r = race.rollers[i];
      rollerMeshes[i].position.set(r.x, r.y, r.z);
      rollerMeshes[i].rotation.z = r.rot;
    }
    for (let i = 0; i < race.hoppers.length; i++) {
      const h = race.hoppers[i];
      hopperMeshes[i].position.set(h.x, h.y + 0.55, h.z);
      const body = hopperMeshes[i].userData.body;
      if (body) body.scale.y = h.hopping ? 1.05 : 0.7;
    }
    for (let i = 0; i < race.flyers.length; i++) {
      const f = race.flyers[i];
      flyerMeshes[i].position.set(f.x, f.y, f.z);
      flyerMeshes[i].rotation.y = -f.ang;
      const wing = flyerMeshes[i].userData.wing;
      if (wing) wing.rotation.z = Math.sin(race.time * 14 + i) * 0.45;
    }

    lava.position.y = race.lavaY;
    const pulse = 0.85 + Math.sin(race.time * 3) * 0.15;
    lava.material.color.setRGB(1 * pulse, 0.35 * pulse, 0.08);

    ship.position.y = race.shipY;
    const active = race.phase !== "countdown";
    beacon.material.opacity = active ? 0.16 + Math.sin(race.time * 4) * 0.05 : 0.04;
    flame.visible = race.phase === "launch" || race.phase === "results";
    if (flame.visible) {
      const s = 0.85 + Math.sin(race.launchT * 30) * 0.12;
      flame.scale.set(s, s, s);
    }
    ring.material.opacity = race.phase === "race" ? 0.55 + Math.sin(race.time * 5) * 0.25 : 0.2;

    for (let i = 0; i < race.racers.length; i++) {
      const r = race.racers[i];
      const v = visuals[i];
      v.mixer.update(dt);
      if (r.seated) {
        if (!v.docked && sockets[r.seatIndex]) {
          sockets[r.seatIndex].add(v.group);
          v.group.position.set(0, 0.05, 0);
          v.group.rotation.set(0, Math.PI, 0);
          v.group.scale.setScalar(cfg.seatBuddyScale);
          v.shadow.visible = false;
          v.docked = true;
          paintSeat(r.seatIndex, r.color);
        }
        setAnim(v, "Cheer", 1);
        continue;
      }
      v.group.position.set(r.pos.x, r.pos.y, r.pos.z);
      v.group.rotation.y = r.yaw;
      const squash = r.squash || 0;
      const slide = r.sliding > 0 ? 0.38 : 0;
      const air = !r.grounded && r.vel.y > 1.4 ? 0.16 : 0;
      v.model.position.y = slide * -0.15;
      v.model.scale.set(1 + squash * 0.16 + slide * 0.2 - air * 0.4, 1 - squash * 0.26 - slide + air, 1 + squash * 0.12);
      if (r.squash > 0.32 && !v.dusted) {
        v.dusted = true;
        for (let n = 0; n < 3; n++) burst(r.pos.x + (n - 1) * 0.2, r.pos.y + 0.1, r.pos.z);
      }
      if (r.squash < 0.05) v.dusted = false;
      if (r.flail > 0.4 && !v.starred) {
        v.starred = true;
        for (let n = 0; n < 5; n++) burst(r.pos.x, r.pos.y + 1.55, r.pos.z);
      }
      if (r.flail < 0.05) v.starred = false;
      if (r.sliding > 0 && i === 0) burst(r.pos.x, r.pos.y + 0.15, r.pos.z);
      const blade = v.accessories && v.accessories.heli && v.accessories.heli.userData.blade;
      if (blade && v.accessories.heli.visible) blade.rotation.y += dt * 14;
      const hsp = Math.hypot(r.vel.x, r.vel.z);
      let anim = "Idle";
      if (r.emote === "cheer" || r.emote === "wave" && r.flail <= 0) anim = "Cheer";
      else if (r.flail > 0.05 || (!r.grounded && r.vel.y < -2)) anim = "Flail";
      else if (hsp > 0.8 || r.sliding > 0) anim = "Run";
      setAnim(v, anim, hsp / 7);
      if (v.shadow) {
        v.shadow.visible = r.grounded;
        v.shadow.position.y = 0.04;
      }
    }

    if (race.phase === "results" && race.result === "escaped" && !confettiOn) {
      confettiOn = true;
      const p = visuals[0].group;
      const wp = new THREE.Vector3();
      p.getWorldPosition(wp);
      for (let n = 0; n < 48; n++) burst(ship.position.x + (Math.random() - 0.5) * 3, ship.position.y + 2 + Math.random() * 3, ship.position.z - 2);
    }
    for (const bit of confetti) {
      if (!bit.alive) continue;
      bit.v.y -= 6 * dt;
      bit.mesh.position.addScaledVector(bit.v, dt);
      bit.mesh.rotation.z += dt * 4;
      if (bit.mesh.position.y < course.ship.y - 1) {
        bit.alive = false;
        bit.mesh.visible = false;
      }
    }

    beacon.visible = race.phase !== "launch" && race.phase !== "results" && race.seatCine <= 0;
    dressing.update(race, dt);
    const skyNow = zoneSky(race.zoneId || "meadow");
    sky.material.uniforms.top.value.setHex(skyNow.top);
    sky.material.uniforms.mid.value.setHex(skyNow.mid);
    scene.fog.color.setHex(skyNow.fog);
    scene.fog.near = skyNow.near;
    scene.fog.far = skyNow.far;
    updateCamera(race, dt, look);
    sky.position.copy(camera.position);
    for (const cp of cpRings) cp.rotation.z = race.time * 0.4;
    void bumperMeshes;
  }

  function setAnim(v, name, scale) {
    if (v.current === name) {
      if (v.actions.Run && name === "Run") v.actions.Run.setEffectiveTimeScale(Math.max(0.65, Math.min(1.45, scale || 1)));
      return;
    }
    for (const key of Object.keys(v.actions)) {
      const on = key === name;
      v.actions[key].enabled = true;
      v.actions[key].setEffectiveWeight(on ? 1 : 0);
    }
    if (!v.actions[name] && v.actions.Idle) v.actions.Idle.setEffectiveWeight(1);
    v.current = name;
  }

  function updateCamera(race, dt, look) {
    const player = race.player;
    const dragging = !!(look && (look.looking || Math.abs(look.lookDx) + Math.abs(look.lookDy) > 0));
    if (look && look.intro > 0) {
      const k = 1 - Math.max(0, Math.min(1, look.intro / 3.3));
      const ease = k * k * (3 - 2 * k);
      const dist = state.portrait ? cfg.camDistPortrait : cfg.camDist;
      const horiz = dist * Math.cos(cfg.defaultPitch);
      const height = dist * Math.sin(cfg.defaultPitch);
      const tx = (1 - ease) * (player.pos.x + 8) + ease * (player.pos.x + Math.sin(state.yaw) * horiz);
      const ty = (1 - ease) * (player.pos.y + 22) + ease * (player.pos.y + height + 0.4);
      const tz = (1 - ease) * (player.pos.z - 26) + ease * (player.pos.z - horiz);
      camera.position.set(tx, ty, tz);
      camera.lookAt(player.pos.x, player.pos.y + 1, player.pos.z + 18 * (1 - ease));
      return;
    }
    if (race.seatCine > 0 && race.player.seated) {
      const wp = new THREE.Vector3();
      visuals[0].group.getWorldPosition(wp);
      camera.position.x = damp(camera.position.x, ship.position.x + 6.5, 4.2, dt);
      camera.position.y = damp(camera.position.y, ship.position.y + 4.2, 4.2, dt);
      camera.position.z = damp(camera.position.z, ship.position.z - 22, 4.2, dt);
      camera.lookAt(wp.x, wp.y + 0.45, wp.z);
      return;
    }
    if (race.phase === "results" || race.phase === "launch") {
      let tx;
      let ty;
      let tz;
      let lx;
      let ly;
      let lz;
      if (race.result === "escaped") {
        tx = ship.position.x + 2;
        ty = ship.position.y + 8;
        tz = ship.position.z + 22;
        lx = ship.position.x;
        ly = ship.position.y + 1.5;
        lz = ship.position.z - 18;
      } else {
        tx = player.pos.x - 6;
        ty = player.pos.y + 4.2;
        tz = player.pos.z - 8;
        const ahead = Math.max(0, ship.position.z - player.pos.z);
        lx = ship.position.x;
        ly = ship.position.y + 3 + Math.min(8, ahead * 0.02);
        lz = ship.position.z - 6;
      }
      camera.position.x = damp(camera.position.x, tx, 3.2, dt);
      camera.position.y = damp(camera.position.y, ty, 3.2, dt);
      camera.position.z = damp(camera.position.z, tz, 3.2, dt);
      camera.lookAt(lx, ly, lz);
      return;
    }
    if (player.seated) {
      const tx = course.ship.x + 2;
      const ty = race.shipY + 8;
      const tz = course.ship.z + 22;
      camera.position.x = damp(camera.position.x, tx, 3, dt);
      camera.position.y = damp(camera.position.y, ty, 3, dt);
      camera.position.z = damp(camera.position.z, tz, 3, dt);
      camera.lookAt(course.ship.x, race.shipY + 2.2, course.ship.z - 36);
      return;
    }
    if (dragging) {
      const sens = look.mouse ? cfg.mouseSens : cfg.lookSens;
      state.yaw -= look.lookDx * sens;
      state.pitch = Math.max(cfg.minPitch, Math.min(cfg.maxPitch, state.pitch - look.lookDy * sens));
      state.autoWait = cfg.autoFollowDelay;
    } else if (state.autoWait > 0) {
      state.autoWait -= dt;
    } else {
      const h = Math.hypot(player.vel.x, player.vel.z);
      if (h > 1.15) state.yaw = dampAngle(state.yaw, Math.atan2(player.vel.x, player.vel.z), cfg.autoYaw, dt);
      state.pitch = damp(state.pitch, cfg.defaultPitch, cfg.autoPitch, dt);
    }
    const dist = state.portrait ? cfg.camDistPortrait : cfg.camDist;
    const horiz = dist * Math.cos(state.pitch);
    const height = dist * Math.sin(state.pitch);
    let tx = player.pos.x + Math.sin(state.yaw) * horiz;
    let ty = player.pos.y + height + 0.35;
    let tz = player.pos.z - Math.cos(state.yaw) * horiz;
    const intro = race.phase === "countdown" ? 1 : 0;
    ty += intro * 2.2;
    tz -= intro * 2.4;
    const sh = (race.shake || 0) * 0.18;
    if (sh > 0.01 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tx += (Math.random() - 0.5) * sh;
      ty += (Math.random() - 0.5) * sh * 0.5;
    }
    camera.position.x = damp(camera.position.x, tx, cfg.camLerp, dt);
    camera.position.y = damp(camera.position.y, ty, cfg.camLerp, dt);
    camera.position.z = damp(camera.position.z, tz, cfg.camLerp, dt);
    camera.lookAt(player.pos.x, player.pos.y + 1.15, player.pos.z + Math.cos(state.yaw) * 1.4);
  }

  function reset() {
    confettiOn = false;
    for (const chunk of course.chunks) {
      chunk.spawned = false;
      chunk.dirty = true;
      chunk.fallY = 0;
      if (chunk.mesh) {
        chunk.mesh.visible = !chunk.gap;
        chunk.mesh.position.y = 0;
        chunk.mesh.material = terrainMat;
      }
    }
    for (const bit of debris) {
      bit.active = false;
      bit.mesh.visible = false;
    }
    for (const bit of confetti) {
      bit.alive = false;
      bit.mesh.visible = false;
    }
    for (let i = 0; i < visuals.length; i++) {
      const v = visuals[i];
      if (v.docked) {
        buddyRoot.add(v.group);
        v.group.scale.setScalar(1);
        v.group.rotation.set(0, 0, 0);
        v.shadow.visible = true;
        v.docked = false;
      }
    }
    for (let i = 0; i < seatMats.length; i++) paintSeat(i, null);
    ship.position.y = course.ship.y;
    flame.visible = false;
    state.yaw = 0;
    state.pitch = cfg.defaultPitch;
  }

  function render() {
    renderer.render(scene, camera);
  }

  // Warm shaders once.
  camera.position.set(0, 8, -10);
  camera.lookAt(0, 1, 4);
  renderer.render(scene, camera);

  function applyLook(hex, name) {
    const v = visuals[0];
    if (!v) return;
    v.model.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (m && m.name === "Buddy_Mint" && m.color) m.color.set(hex);
      }
    });
    for (const key of Object.keys(v.accessories || {})) v.accessories[key].visible = key === name;
  }

  return {
    resize,
    update,
    reset,
    render,
    applyLook,
    setDpr(next) {
      dpr = next;
      resize();
    },
    get yaw() { return state.yaw; },
    get canvas() { return canvas; },
  };
}

function makeYouTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = "#FFF6E5";
  roundRect(g, 4, 8, 120, 48, 16);
  g.fill();
  g.fillStyle = "#1E2440";
  g.font = "700 32px Fredoka, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("YOU", 64, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
