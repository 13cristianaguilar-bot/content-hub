import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { groundAt } from "./course.js";
import { cameraAboveFloor, cameraFloor } from "./sim.js";
import { backOffView, cameraBuried, clearSpheres } from "./occlude.js";
import { spectateFrame } from "./spectate.js";
import { buildDressing, makeToonTexture, zoneSky } from "./dress.js";
import { plasticShader } from "./plastic.js";
import { EXTRA_MODELS, MEADOW_MODELS, meadowProp, placeMeadowDressing, tickFoliage } from "./meadow.js";
import { BUDDY_CLIPS, ROOT_LOCK, isRootPositionTrack, lockRootPosition } from "./clips.js";
import { planetLook } from "./look.js";
import { collapseShot, flyoverShot, launchShot } from "./cine.js";

const MODELS = {
  buddy: "assets/space_buddy_lowpoly.glb",
  bumper: "assets/models/obstacle_bumper.glb",
  crumble: "assets/models/obstacle_crumble_tile.glb",
  spinner: "assets/models/obstacle_spinner.glb",
  pad: "assets/models/obstacle_jump_pad.glb",
  platform: "assets/models/obstacle_moving_platform.glb",
  lava: "assets/models/obstacle_lava_pool.glb",
  chunk: "assets/models/obstacle_falling_chunk.glb",
  debris: "assets/models/collapse_debris_set.glb",
  arch: "assets/models/finish_gate_arch.glb",
  meadowSet: "assets/models/prop_set_meadow.glb",
  canyonSet: "assets/models/prop_set_canyon.glb",
  iceSet: "assets/models/prop_set_ice.glb",
  skySet: "assets/models/prop_set_sky.glb",
  crystal: "assets/models/prop_crystal_cluster.glb",
  ship: "assets/escape_ship_rocket.glb",
  coin: "assets/models/collectible_star_coin.glb",
  roller: "assets/models/enemy_roller.glb",
  hopper: "assets/models/enemy_hopper.glb",
  flyer: "assets/models/enemy_flyer.glb",
  geyser: "assets/models/hazard_geyser.glb",
  sweeper: "assets/models/obstacle_sweeper.glb",
  pendulum: "assets/models/obstacle_pendulum_hammer.glb",
};

const TOON_MAP = makeToonTexture();

function candyHook(mat) {
  mat.onBeforeCompile = (shader) => plasticShader(shader, { stripes: !!mat.userData.stripes });
}

function lambert(src, candy) {
  const color = candy ? new THREE.Color(candy) : (src && src.color && src.color.isColor ? src.color.clone() : new THREE.Color(0xffffff));
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
  if (candy) mat.userData.stripes = true;
  if (/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(mat.name)) {
    mat.emissive.copy(color);
    mat.emissiveIntensity = Math.max(mat.emissiveIntensity, 0.35);
  }
  candyHook(mat);
  return mat;
}

function dropStackedTriangles(geometry) {
  const pos = geometry.getAttribute("position");
  const index = geometry.getIndex();
  if (!pos || !index) return;
  const src = index.array;
  const keep = [];
  const buckets = new Map();
  const cell = 0.012;
  for (let i = 0; i < src.length; i += 3) {
    const ia = src[i];
    const ib = src[i + 1];
    const ic = src[i + 2];
    const cx = (pos.getX(ia) + pos.getX(ib) + pos.getX(ic)) / 3;
    const cy = (pos.getY(ia) + pos.getY(ib) + pos.getY(ic)) / 3;
    const cz = (pos.getZ(ia) + pos.getZ(ib) + pos.getZ(ic)) / 3;
    const key = Math.round(cx / cell) + ":" + Math.round(cy / cell) + ":" + Math.round(cz / cell);
    const list = buckets.get(key) || [];
    let stacked = false;
    for (let n = 0; n < list.length; n++) {
      const prev = list[n];
      if (Math.abs(prev[0] - cx) + Math.abs(prev[1] - cy) + Math.abs(prev[2] - cz) < 0.008) {
        stacked = true;
        break;
      }
    }
    if (stacked) continue;
    list.push([cx, cy, cz]);
    buckets.set(key, list);
    keep.push(ia, ib, ic);
  }
  if (keep.length < src.length) geometry.setIndex(keep);
}

function dropSkinnyTriangles(geometry) {
  const pos = geometry.getAttribute("position");
  const index = geometry.getIndex();
  if (!pos || !index) return;
  const src = index.array;
  const keep = [];
  const ax = (i) => pos.getX(i);
  const ay = (i) => pos.getY(i);
  const az = (i) => pos.getZ(i);
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const y = ay(i);
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const height = Math.max(0.001, maxY - minY);
  for (let i = 0; i < src.length; i += 3) {
    const a = src[i];
    const b = src[i + 1];
    const c = src[i + 2];
    const ab = Math.hypot(ax(a) - ax(b), ay(a) - ay(b), az(a) - az(b));
    const bc = Math.hypot(ax(b) - ax(c), ay(b) - ay(c), az(b) - az(c));
    const ca = Math.hypot(ax(c) - ax(a), ay(c) - ay(a), az(c) - az(a));
    const longest = Math.max(ab, bc, ca);
    const shortest = Math.min(ab, bc, ca);
    if (shortest < 0.0008 || longest / Math.max(shortest, 1e-6) > 18) continue;
    if (longest > height * 0.42) continue;
    keep.push(a, b, c);
  }
  if (keep.length < src.length) geometry.setIndex(keep);
}

function bakeFit(root, targetHeight) {
  root.updateWorldMatrix(true, true);
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.geometry = obj.geometry.clone();
    obj.geometry.applyMatrix4(obj.matrixWorld);
    dropStackedTriangles(obj.geometry);
    dropSkinnyTriangles(obj.geometry);
    obj.position.set(0, 0, 0);
    obj.quaternion.identity();
    obj.scale.set(1, 1, 1);
  });
  root.position.set(0, 0, 0);
  root.quaternion.identity();
  root.scale.set(1, 1, 1);
  root.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(root);
  const height = Math.max(0.001, box.getSize(new THREE.Vector3()).y);
  root.scale.setScalar(targetHeight / height);
  root.updateWorldMatrix(true, true);
  const grounded = new THREE.Box3().setFromObject(root);
  root.position.y -= grounded.min.y;
}

let textureAniso = 4;

function prepColorMap(map) {
  if (!map) return null;
  map.colorSpace = THREE.SRGBColorSpace;
  map.generateMipmaps = true;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.magFilter = THREE.LinearFilter;
  map.anisotropy = textureAniso;
  map.needsUpdate = true;
  return map;
}

function buddyMat(src, hex) {
  const tint = new THREE.Color(hex);
  const map = prepColorMap(src && src.map);
  const mat = new THREE.MeshStandardMaterial({
    map,
    color: 0xffffff,
    vertexColors: true,
    roughness: 1,
    metalness: 0,
    emissive: 0x000000,
    emissiveIntensity: 0,
    name: "BuddyHue",
  });
  mat.customProgramCacheKey = () => "buddy-hue-" + hex;
  mat.transparent = false;
  mat.depthWrite = true;
  mat.opacity = 1;
  mat.alphaTest = 0;
  mat.side = THREE.FrontSide;
  mat.polygonOffset = true;
  mat.polygonOffsetFactor = 1;
  mat.polygonOffsetUnits = 1;
  mat.userData.tint = tint;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTint = { value: tint };
    mat.userData.shader = shader;
    shader.fragmentShader = "uniform vec3 uTint;\n" + shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      "vec3 albedo = diffuseColor.rgb;\nfloat luma = dot(albedo, vec3(0.299, 0.587, 0.114));\nfloat mx = max(albedo.r, max(albedo.g, albedo.b));\nfloat mn = min(albedo.r, min(albedo.g, albedo.b));\nfloat sat = mx - mn;\nfloat warm = smoothstep(0.02, 0.14, albedo.r - max(albedo.g, albedo.b));\nfloat suit = smoothstep(0.12, 0.26, sat) * (1.0 - warm);\nvec3 tinted = uTint * mix(0.82, 1.22, clamp(luma, 0.0, 1.0));\nvec3 color = mix(albedo, tinted, suit);\nfloat rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5);\ncolor += vec3(1.0) * rim * 0.5;\nvec3 L = normalize(vec3(-0.35, 0.86, 0.28));\nvec3 V = normalize(vViewPosition);\nfloat spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 72.0);\ncolor += vec3(1.0) * spec * 0.4;\noutgoingLight = color;\n#include <opaque_fragment>"
    );
  };
  return mat;
}

function shipMat(src) {
  const map = prepColorMap(src && src.map);
  const mat = new THREE.MeshBasicMaterial({
    map,
    color: 0xffffff,
    fog: false,
    toneMapped: false,
    name: "ShipPaint",
  });
  mat.transparent = false;
  mat.depthWrite = true;
  mat.opacity = 1;
  mat.side = THREE.FrontSide;
  return mat;
}

const AUTHORED = new Set(["bumper", "pad", "sweeper", "pendulum", "crumble"]);

function dressAuthored(root) {
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    const glow = /Crack|Glow|Core|Thruster|Flame/.test((obj.name || "") + ((src && src.name) || ""));
    const mat = new THREE.MeshToonMaterial({
      color: 0xffffff,
      vertexColors: true,
      gradientMap: TOON_MAP,
      emissive: glow ? new THREE.Color(0xff7a1a) : new THREE.Color(0x000000),
      emissiveIntensity: glow ? 0.65 : 0,
    });
    obj.material = mat;
    obj.castShadow = true;
    obj.receiveShadow = true;
  });
}

function playClip(root, gltf, name, loop) {
  const clip = (gltf.animations || []).find((item) => item.name === name);
  if (!clip) return null;
  const mixer = new THREE.AnimationMixer(root);
  const action = mixer.clipAction(clip);
  if (loop) action.setLoop(THREE.LoopRepeat, Infinity);
  else {
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
  }
  action.play();
  if (!loop) action.paused = true;
  root.userData.mixer = mixer;
  root.userData.action = action;
  return action;
}

function convert(root, candy) {
  const cache = new Map();
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const mapMat = (src) => {
      if (!src) return lambert(null, candy);
      if (!candy && cache.has(src.uuid)) return cache.get(src.uuid);
      const next = lambert(src, candy);
      if (!candy) cache.set(src.uuid, next);
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
    preserveDrawingBuffer: new URLSearchParams(location.search).has("occlude"),
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  textureAniso = Math.max(1, Math.min(8, renderer.capabilities.getMaxAnisotropy()));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  let dpr = Math.min(window.devicePixelRatio || 1, cfg.dprCap);
  const forced = new URLSearchParams(location.search).get("dpr");
  if (forced) dpr = Math.max(0.75, Math.min(2, Number(forced) || dpr));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x9fe8ff, cfg.fogNear, cfg.fogFar);
  const camera = new THREE.PerspectiveCamera(cfg.fovPortrait, 1, 0.15, 500);
  camera.layers.enable(1);
  const gl = renderer.getContext();
  const gpuInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const gpuName = gpuInfo ? String(gl.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL) || "") : "";
  const weakGpu = /SwiftShader|llvmpipe|Mali-4|PowerVR SGX|Adreno \(TM\) [34]/i.test(gpuName)
    || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  let postOn = !weakGpu && new URLSearchParams(location.search).get("nopost") !== "1";
  if (new URLSearchParams(location.search).get("post") === "1") postOn = true;
  const sceneTarget = new THREE.WebGLRenderTarget(4, 4);
  const bloomTarget = new THREE.WebGLRenderTarget(4, 4);
  const gradeScene = new THREE.Scene();
  const gradeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const gradeMat = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: { tScene: { value: sceneTarget.texture }, tBloom: { value: bloomTarget.texture } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
    fragmentShader: "varying vec2 vUv; uniform sampler2D tScene; uniform sampler2D tBloom; void main(){ vec3 c = texture2D(tScene, vUv).rgb; vec2 o = vec2(0.022, 0.0); vec3 b = texture2D(tBloom, vUv + o).rgb + texture2D(tBloom, vUv - o).rgb + texture2D(tBloom, vUv + o.yx).rgb + texture2D(tBloom, vUv - o.yx).rgb; b += texture2D(tBloom, vUv + o * 2.0).rgb + texture2D(tBloom, vUv - o * 2.0).rgb; c += b * 0.22; float l = dot(c, vec3(0.2126, 0.7152, 0.0722)); c = clamp(l + (c - l) * 1.08, 0.0, 1.35); gl_FragColor = vec4(c, 1.0); }",
  });
  gradeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), gradeMat));

  const params = new URLSearchParams(location.search);
  const phoneTier = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900 || params.has("low");
  const highTier = params.get("tier") === "high" || (!weakGpu && !phoneTier && params.get("tier") !== "mid");
  renderer.shadowMap.enabled = highTier;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const hemi = new THREE.HemisphereLight(0x9fd4ff, 0xffc48a, 0.6);
  const sun = new THREE.DirectionalLight(0xfff0c2, 1.15);
  sun.position.set(-14, 26, 8);
  sun.castShadow = highTier;
  const shadowSize = 1024;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 46;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -14;
  sun.shadow.camera.right = sun.shadow.camera.top = 14;
  sun.shadow.bias = -0.00035;
  sun.shadow.normalBias = 0.035;
  sun.shadow.radius = weakGpu ? 1 : 2.5;
  scene.add(hemi, sun, sun.target);
  let lightTier = highTier ? 2 : 0;
  let lowFps = 0;
  let lowDetail = !!weakGpu;
  const outlineMats = [];

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(380, 18, 12),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x5cc8ff) },
        mid: { value: new THREE.Color(0x9fe8ff) },
        bot: { value: new THREE.Color(0x8ed7b0) },
        sunGain: { value: 1 },
      },
      vertexShader: "varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; uniform float sunGain; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 c=mix(bot, mid, smoothstep(-0.15, 0.0, h)); c=mix(c, top, smoothstep(-0.02, 0.16, h)); float sun=smoothstep(0.14, 0.0, length(n.xz-vec2(-0.32,0.12))); c+=vec3(1.0,0.86,0.48)*sun*smoothstep(0.0,0.2,h)*sunGain; gl_FragColor=vec4(c,1.0); }",
    })
  );
  sky.userData.skipCam = true;
  scene.add(sky);
  const heavens = new THREE.Group();
  const starPositions = [];
  for (let i = 0; i < 520; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 0.65 + 0.15);
    const radius = 260;
    starPositions.push(
      Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * radius * 0.65 + 40,
      Math.sin(phi) * Math.sin(theta) * radius
    );
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xfff6e0, size: 2.2, sizeAttenuation: false, depthWrite: false }));
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(28, 18, 14),
    new THREE.ShaderMaterial({
      fog: false,
      vertexShader: "varying vec3 vN; void main(){ vN=normalize(normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "varying vec3 vN; void main(){ float b=sin(vN.y*9.0)*0.5+0.5; vec3 c=mix(vec3(1.0,0.42,0.62), vec3(0.28,0.62,1.0), b); c=mix(c, vec3(1.0,0.86,0.35), smoothstep(0.72,0.9,b)); gl_FragColor=vec4(c,1.0); }",
    })
  );
  planet.position.set(-90, 55, -160);
  const planetRing = new THREE.Mesh(
    new THREE.TorusGeometry(40, 3.2, 8, 28),
    new THREE.MeshBasicMaterial({ color: 0xffe1a8, fog: false })
  );
  planetRing.rotation.x = 1.1;
  planetRing.position.copy(planet.position);
  heavens.add(planetRing);
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(8, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0xfff1c9, fog: false })
  );
  moon.position.set(70, 42, -150);
  heavens.add(stars, planet, moon);
  stars.material.transparent = true;
  const cloudPuffs = [];
  const puffMat = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, transparent: true, opacity: 0.94 });
  for (let i = 0; i < 8; i++) {
    const puff = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const ball = new THREE.Mesh(new THREE.SphereGeometry(5.5, 8, 6), puffMat);
      ball.position.set((k - 1.5) * 4.6, Math.sin(k * 1.4) * 1.6, (k % 2) * 1.4);
      ball.scale.set(1, 0.55, 0.85);
      puff.add(ball);
    }
    const ang = (i / 8) * Math.PI * 2;
    puff.position.set(Math.cos(ang) * 110, 48 + (i % 3) * 14, Math.sin(ang) * 110);
    heavens.add(puff);
    cloudPuffs.push(puff);
  }
  const spectatorShips = [];
  for (let i = 0; i < 4; i++) {
    const shiplet = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 7, 6),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff8fd1 : 0xffd23f, fog: false })
    );
    shiplet.rotation.x = Math.PI / 2;
    shiplet.position.set(-40 + i * 28, 36 + (i % 2) * 8, -90 - i * 12);
    heavens.add(shiplet);
    spectatorShips.push(shiplet);
  }
  const flags = [];
  for (let i = 0; i < 6; i++) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 5), new THREE.MeshBasicMaterial({ color: 0xfff6e5 }));
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.55), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff6b6b : 0x5fe3b0, side: THREE.DoubleSide }));
    cloth.position.set(0.55, 0.85, 0);
    pole.add(cloth);
    pole.position.set(-10 + i * 4.5, 0.2, 16 + (i % 3));
    scene.add(pole);
    flags.push(cloth);
  }
  heavens.userData.skipCam = true;
  scene.add(heavens);
  const skyScratch = { top: new THREE.Color(), mid: new THREE.Color(), bot: new THREE.Color() };
  const palScratch = { top: new THREE.Color(), mid: new THREE.Color(), bot: new THREE.Color() };
  const distantGroups = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
  const scenic = new THREE.Group();
  scenic.userData.skipCam = true;
  const hillGeo = new THREE.SphereGeometry(1, 10, 8);
  const spireGeo = new THREE.ConeGeometry(1, 3.4, 6);
  const shipGeo = new THREE.ConeGeometry(1, 4.4, 7);
  function farMesh(geo, color, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, fog: false }));
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.userData.skipCam = true;
    return mesh;
  }
  function skyBeacon(color, x, y, z) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(shipGeo, new THREE.MeshBasicMaterial({ color, fog: false }));
    body.rotation.x = Math.PI / 2;
    const wing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.16, 0.9), new THREE.MeshBasicMaterial({ color: 0xfff6e5, fog: false }));
    group.add(body, wing);
    group.position.set(x, y, z);
    group.scale.setScalar(8);
    group.traverse((obj) => { obj.userData.skipCam = true; });
    return group;
  }
  const shipX = course.ship.x;
  const shipY = course.ship.y + 46;
  const shipZ = course.ship.z;
  distantGroups[0].add(
    farMesh(hillGeo, 0x3ecf6a, -86, 2, 28, 36, 16, 28),
    farMesh(hillGeo, 0x2f9a45, 90, 0, 64, 42, 18, 32),
    farMesh(hillGeo, 0x7fd88a, -24, 8, shipZ * 0.42, 28, 12, 22),
    farMesh(spireGeo, 0x3ecf6a, -78, 18, 36, 7, 10, 7),
    skyBeacon(0xff6b6b, shipX, shipY, shipZ)
  );
  distantGroups[1].add(
    farMesh(hillGeo, 0xd7d0ff, -64, 32, 18, 24, 7, 16),
    farMesh(hillGeo, 0xffd6f2, 74, 38, 52, 18, 5, 14),
    farMesh(hillGeo, 0x9aa6ff, 6, 44, shipZ * 0.36, 16, 4, 12),
    skyBeacon(0x8c6bff, shipX + 6, shipY + 6, shipZ)
  );
  distantGroups[2].add(
    farMesh(spireGeo, 0x3a2458, -58, 6, 24, 12, 16, 12),
    farMesh(spireGeo, 0x2b1b4d, 66, 4, 46, 9, 20, 9),
    farMesh(spireGeo, 0x6a4ec4, 4, 12, shipZ * 0.38, 8, 14, 8),
    skyBeacon(0xffd23f, shipX, shipY + 4, shipZ)
  );
  distantGroups.forEach((group, i) => {
    group.visible = i === 0;
    group.userData.skipCam = true;
    scenic.add(group);
  });
  scene.add(scenic);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const keys = Object.keys(MODELS);
  const gltfs = {};
  const meadow = {};
  let loaded = 0;
  const meadowKeys = Object.keys(MEADOW_MODELS).concat(Object.keys(EXTRA_MODELS));
  const totalLoads = keys.length + meadowKeys.length;
  await Promise.all([
    ...keys.map((key) => new Promise((resolve, reject) => {
      loader.load(MODELS[key], (gltf) => {
        if (key === "ship" || key === "coin") {
          dressAuthored(gltf.scene);
          gltf.scene.traverse((obj) => {
            if (obj.material) {
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((mat) => { if (mat) mat.fog = false; });
            }
          });
        } else if (AUTHORED.has(key)) {
          dressAuthored(gltf.scene);
        } else if (key !== "buddy") {
          const candy = {
            bumper: 0xff5fa2,
            spinner: 0xffd23f,
            pad: 0x5ce1ff,
            platform: 0xc98bff,
            lava: 0xff6a2a,
            chunk: 0xffb15a,
            roller: 0xff8a3a,
            hopper: 0x7ae0a0,
            flyer: 0x8cb6ff,
            geyser: 0xffd23f,
            sweeper: 0xff7ad1,
            pendulum: 0xc9b6ff,
          }[key];
          convert(gltf.scene, candy);
        }
        gltfs[key] = gltf;
        loaded++;
        if (onProgress) onProgress(loaded / totalLoads);
        resolve();
      }, undefined, reject);
    })),
    ...meadowKeys.map((key) => new Promise((resolve, reject) => {
      loader.load(MEADOW_MODELS[key] || EXTRA_MODELS[key], (gltf) => {
        meadow[key] = gltf;
        loaded++;
        if (onProgress) onProgress(loaded / totalLoads);
        resolve();
      }, undefined, reject);
    })),
  ]);
  placeMeadowDressing(scene, course, TOON_MAP, meadow);

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
  const propMixers = [];
  const zoneSets = [
    { key: "meadowSet", zone: "meadow", names: ["MushroomTall", "MushroomPair", "Flower", "CloverBush"], clip: "sway" },
    { key: "canyonSet", zone: "canyon", names: ["Boulder", "MesaStack", "MintSucculent", "Pebbles"], clip: "" },
    { key: "iceSet", zone: "ice", names: ["IceShards", "SnowMound", "IcePillar"], clip: "shimmer" },
    { key: "skySet", zone: "sky", names: ["CloudPuff", "StarLamp", "CloudPlatform"], clip: "bob" },
  ];
  function clearOfLine(x, z) {
    const routes = course.routes || [];
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      for (let k = 0; k < route.length; k++) {
        const dx = route[k].x - x;
        const dz = route[k].z - z;
        if (dx * dx + dz * dz < 20) return false;
      }
    }
    return true;
  }
  for (const set of zoneSets) {
    const gltf = gltfs[set.key];
    if (!gltf) continue;
    const pads = course.floors.filter((pad) => pad.zone === set.zone && !pad.bridge && pad.rx >= 6);
    let placed = 0;
    for (let p = 0; p < pads.length && placed < 8; p++) {
      const pad = pads[p];
      const angles = [1.25, -1.25, 2.2];
      for (let a = 0; a < angles.length && placed < 8; a++) {
        const name = set.names[placed % set.names.length];
        const src = gltf.scene.getObjectByName(name);
        if (!src) continue;
        const ang = angles[a] + p * 0.2;
        const rad = pad.rx * 0.74;
        const x = pad.x + Math.sin(ang) * rad;
        const z = pad.z + Math.cos(ang) * rad * 0.42;
        if (!clearOfLine(x, z)) continue;
        const obj = src.clone(true);
        obj.position.set(0, 0, 0);
        obj.rotation.y = ang;
        obj.traverse((node) => {
          if (!node.isMesh) return;
          node.frustumCulled = true;
          node.castShadow = false;
          if (node.material) {
            node.material = node.material.clone();
            node.material.vertexColors = true;
          }
        });
        const lift = name === "CloudPuff" ? 1.7 : name === "CloudPlatform" ? 0.15 : 0;
        obj.position.set(x, pad.y + lift, z);
        scene.add(obj);
        if (set.clip) {
          const clip = (gltf.animations || []).find((item) => item.name === set.clip);
          if (clip) {
            const mixer = new THREE.AnimationMixer(obj);
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
            propMixers.push(mixer);
          }
        }
        placed++;
      }
    }
  }
  if (gltfs.crystal) {
    const shimmer = (gltfs.crystal.animations || []).find((clip) => clip.name === "shimmer");
    for (const zone of ["sky", "ice"]) {
      const pads = course.floors.filter((pad) => pad.zone === zone && !pad.bridge && pad.rx >= 6);
      let placed = 0;
      for (let p = 0; p < pads.length && placed < 4; p++) {
        const pad = pads[p];
        const ang = p % 2 === 0 ? 1.4 : -1.4;
        const rad = pad.rx * 0.78;
        const x = pad.x + Math.sin(ang) * rad;
        const z = pad.z + Math.cos(ang) * rad * 0.35;
        if (!clearOfLine(x, z)) continue;
        const obj = gltfs.crystal.scene.clone(true);
        obj.position.set(x, pad.y, z);
        obj.rotation.y = ang;
        obj.traverse((node) => {
          if (!node.isMesh) return;
          node.frustumCulled = true;
          node.castShadow = false;
          if (node.material) {
            node.material = node.material.clone();
            node.material.vertexColors = true;
          }
        });
        scene.add(obj);
        if (shimmer) {
          const mixer = new THREE.AnimationMixer(obj);
          const action = mixer.clipAction(shimmer);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
          propMixers.push(mixer);
        }
        placed++;
      }
    }
  }
  const terrainMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: TOON_MAP, side: THREE.DoubleSide });
  terrainMat.customProgramCacheKey = () => "sb-crust";
  terrainMat.onBeforeCompile = (shader) => plasticShader(shader, {});
  const floorMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: TOON_MAP, side: THREE.DoubleSide });
  floorMat.customProgramCacheKey = () => "sb-floor";
  const nightFloor = { value: 0 };
  floorMat.onBeforeCompile = (shader) => {
    plasticShader(shader, { floors: true });
    shader.uniforms.uNight = nightFloor;
    shader.fragmentShader = "uniform float uNight;\n" + shader.fragmentShader.replace(
      "outgoingLight = lit;",
      "outgoingLight = mix(lit, vec3(0.32, 0.34, 0.58) * (0.72 + 0.4 * up), uNight);"
    );
  };
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
    const mesh = new THREE.Mesh(geo, floorMat);
    mesh.userData.floor = true;
    mesh.frustumCulled = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    chunk.mesh = mesh;
    chunkMeshes.push(mesh);
  }

  const crustColors = {
    meadow: [0.16, 0.62, 0.32],
    canyon: [0.72, 0.24, 0.16],
    sky: [0.72, 0.36, 0.7],
    ice: [0.16, 0.55, 0.95],
    climb: [0.9, 0.42, 0.1],
    ship: [0.9, 0.55, 0.18],
  };
  const crustPos = [];
  const crustCol = [];
  const crustIdx = [];
  const crustRows = [];
  const crustStep = 14;
  const crustAcross = 9;
  for (let z = 0; z <= course.len; z += crustStep) {
    const st = course.stations[Math.min(course.stations.length - 1, Math.round(z / 2))];
    const pal = crustColors[st.zone] || crustColors.meadow;
    const row = [];
    for (let c = 0; c < crustAcross; c++) {
      const lat = ((c / (crustAcross - 1)) * 2 - 1) * 32;
      const drop = (Math.abs(lat) / 12) ** 2;
      crustPos.push(st.x + lat, st.y - 8.2 - drop, st.z);
      const n = 0.86 + Math.sin(st.z * 0.04 + lat * 0.2) * 0.08;
      crustCol.push(pal[0] * n, pal[1] * n, pal[2] * n);
      row.push(crustPos.length / 3 - 1);
    }
    crustRows.push(row);
  }
  for (let r = 0; r < crustRows.length - 1; r++) {
    for (let c = 0; c < crustAcross - 1; c++) {
      const a = crustRows[r][c];
      const b = crustRows[r][c + 1];
      const d = crustRows[r + 1][c];
      const e = crustRows[r + 1][c + 1];
      crustIdx.push(a, d, b, b, d, e);
    }
  }
  const crustGeo = new THREE.BufferGeometry();
  crustGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(crustPos), 3));
  crustGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(crustCol), 3));
  crustGeo.setIndex(crustIdx);
  crustGeo.computeVertexNormals();
  scene.add(new THREE.Mesh(crustGeo, terrainMat));
  if (course.floors && course.floors.length) {
    const blob = new THREE.InstancedMesh(
      new THREE.CircleGeometry(1, 10),
      new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.16, depthWrite: false }),
      course.floors.length
    );
    const blobDummy = new THREE.Object3D();
    course.floors.forEach((pad, i) => {
      blobDummy.position.set(pad.x, pad.y + 0.05, pad.z);
      blobDummy.rotation.set(-Math.PI / 2, 0, 0);
      blobDummy.scale.set(Math.max(0.8, pad.rx * 0.55), Math.max(0.8, pad.rz * 0.55), 1);
      blobDummy.updateMatrix();
      blob.setMatrixAt(i, blobDummy.matrix);
    });
    blob.instanceMatrix.needsUpdate = true;
    blob.userData.blobShadow = true;
    scene.add(blob);
  }

  let coinMesh = null;
  let coinGlow = null;
  const coinDummy = new THREE.Object3D();
  const coinParts = [];
  if (course.coins && course.coins.length && gltfs.coin) {
    gltfs.coin.scene.updateWorldMatrix(true, true);
    gltfs.coin.scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const geo = obj.geometry.clone();
      geo.applyMatrix4(obj.matrixWorld);
      const mat = obj.material && obj.material.clone ? obj.material.clone() : new THREE.MeshToonMaterial({ color: 0xffd23f, vertexColors: true, gradientMap: TOON_MAP });
      mat.fog = false;
      const mesh = new THREE.InstancedMesh(geo, mat, course.coins.length);
      const ink = new THREE.MeshBasicMaterial({ color: 0x1e2440, side: THREE.BackSide, fog: false });
      const shell = new THREE.InstancedMesh(geo, ink, course.coins.length);
      mesh.frustumCulled = false;
      shell.frustumCulled = false;
      mesh.userData.bloom = true;
      scene.add(mesh, shell);
      coinParts.push({ mesh, shell });
    });
    coinMesh = coinParts[0] && coinParts[0].mesh;
  }

  const doorMeshes = [];
  for (const door of course.doors || []) {
    const src = door.solid ? meadow.door : meadow.doorOpen;
    if (!src) continue;
    const obj = meadowProp(src, TOON_MAP, 0.4, false);
    obj.position.x = door.x;
    obj.position.z = door.z;
    obj.position.y += door.y;
    if (door.solid) {
      obj.traverse((node) => {
        if (node.isMesh && node.material && node.material.color) node.material.color.set(0xc4453a);
      });
    }
    scene.add(obj);
    doorMeshes.push(obj);
  }
  const capMat = new THREE.MeshToonMaterial({ color: 0xe23b4a, gradientMap: TOON_MAP });
  const stemMat = new THREE.MeshToonMaterial({ color: 0xf4e2c4, gradientMap: TOON_MAP });
  const stoneMat = new THREE.MeshToonMaterial({ color: 0x6f7c9a, gradientMap: TOON_MAP });
  for (const mark of course.landmarks || []) {
    if (mark.kind === "mushroom") {
      // The meadow landmark is the CC0 mushroom placed with the other meadow props.
    } else if (mark.kind === "tower") {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 2.4, 11, 8), stoneMat);
      tower.position.set(mark.x, mark.y + 5.2, mark.z);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(2.6, 2.4, 8), capMat);
      roof.position.set(mark.x, mark.y + 11.6, mark.z);
      scene.add(tower, roof);
    }
  }

  for (const isle of course.islands || []) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(isle.r, isle.r * 0.7, 0.85, 10),
      new THREE.MeshToonMaterial({ color: isle.zone === "canyon" ? 0xd15a32 : 0x8fd08a, gradientMap: TOON_MAP })
    );
    mesh.position.set(isle.x, isle.y - 0.25, isle.z);
    scene.add(mesh);
  }

  const debrisNames = ["DebrisLarge", "DebrisMedium", "DebrisSmall", "DebrisPebbles"];
  const debrisAnims = gltfs.debris.animations || [];
  const shakeClip = debrisAnims.find((clip) => clip.name === "shake");
  const tumbleClip = debrisAnims.find((clip) => clip.name === "tumble");
  const debris = [];
  for (let i = 0; i < 24; i++) {
    const named = gltfs.debris.scene.getObjectByName(debrisNames[i % debrisNames.length]);
    const mesh = named ? named.clone(true) : gltfs.debris.scene.clone(true);
    mesh.position.set(0, 0, 0);
    mesh.visible = false;
    mesh.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      node.material = node.material.clone();
      node.material.fog = false;
      if (node.material.emissive) node.material.emissiveIntensity = Math.max(node.material.emissiveIntensity || 0, 0.6);
    });
    scene.add(mesh);
    const mixer = shakeClip || tumbleClip ? new THREE.AnimationMixer(mesh) : null;
    const shake = mixer && shakeClip ? mixer.clipAction(shakeClip) : null;
    const tumble = mixer && tumbleClip ? mixer.clipAction(tumbleClip) : null;
    debris.push({ mesh, mixer, shake, tumble, active: false, mode: "", vy: 0, life: 0, chunk: null });
  }
  function takeDebris() {
    return debris.find((bit) => !bit.active) || null;
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

  const bumperMeshes = course.bumpers.map((b) => {
    const obj = placeProp(gltfs.bumper, b.x, b.y, b.z, 0, 1.1);
    playClip(obj, gltfs.bumper, "pulse", false);
    return obj;
  });
  const telGeo = new THREE.RingGeometry(0.85, 1.15, 28);
  function telRing(x, y, z, scale) {
    const mesh = new THREE.Mesh(telGeo, new THREE.MeshBasicMaterial({
      color: 0xfff3a0,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y + 0.14, z);
    mesh.scale.setScalar(scale || 1);
    mesh.userData.decor = true;
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
  }
  const bumperRings = course.bumpers.map((b) => telRing(b.x, b.y, b.z, 1.35));
  const padMeshes = course.pads.map((p) => {
    const obj = placeProp(gltfs.pad, p.x, p.y, p.z, p.face || 0, 1);
    playClip(obj, gltfs.pad, "boing", false);
    return obj;
  });
  padMeshes.forEach((obj) => { obj.userData.base = obj.scale.x || 1; });
  const lavaDecals = [];
  if (course.crater) {
    lavaDecals.push(placeProp(gltfs.lava, course.crater.x, course.crater.y, course.crater.z, 0, course.crater.r / 3));
  }
  const spinnerObjs = course.spinners.map((s) => {
    if ((s.zone === "meadow" || s.zone === "canyon") && meadow.saw) {
      const obj = meadowProp(meadow.saw, TOON_MAP, 0.34, true);
      obj.position.set(s.x, s.y + 0.9, s.z);
      scene.add(obj);
      return { obj, bar: obj, meadow: true };
    }
    const obj = placeProp(gltfs.spinner, s.x, s.y, s.z);
    obj.scale.setScalar((s.len || 1.62) / 1.62);
    const bar = obj.getObjectByName("Spinner_Bar");
    return { obj, bar };
  });
  const platformObjs = [];
  course.platforms.forEach((p, i) => {
    let obj;
    if (p.zone === "canyon" && meadow.plank) {
      obj = meadowProp(meadow.plank, TOON_MAP, 0.24, true);
      obj.position.set(p.x, p.y, p.z);
      scene.add(obj);
    } else {
      obj = placeProp(gltfs.platform, p.x, p.y, p.z, 0, p.kind === "spin" ? 1.15 : 1.35);
    }
    platformObjs[i] = obj;
  });

  const ship = gltfs.ship.scene;
  ship.position.set(course.ship.x, course.ship.y, course.ship.z);
  ship.rotation.y = Math.PI;
  ship.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const mats = Array.isArray(node.material) ? node.material : [node.material];
    for (const mat of mats) {
      if (!mat) continue;
      mat.fog = false;
      if (mat.emissive) mat.emissiveIntensity = Math.max(mat.emissiveIntensity || 0, 0.15);
    }
  });
  outlineOf(ship, 0.05);
  scene.add(ship);
  const curbCream = new THREE.MeshToonMaterial({ color: 0xfff6e5, gradientMap: TOON_MAP });
  const curbCoral = new THREE.MeshToonMaterial({ color: 0xff6b6b, gradientMap: TOON_MAP });
  for (const pad of course.floors) {
    if (pad.rx < 10 || pad.rz < 8) continue;
    if (pad.zone !== "canyon" && pad.zone !== "sky" && pad.zone !== "meadow") continue;
    const posts = 6;
    for (const side of [-1, 1]) {
      for (let i = 0; i < posts; i++) {
        const along = (i / (posts - 1) - 0.5) * pad.rz * 1.4;
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.85, 0.38), side < 0 ? curbCream : curbCoral);
        post.position.set(pad.x + side * (pad.rx + 0.35), pad.y + 0.42, pad.z + along);
        post.castShadow = false;
        scene.add(post);
      }
    }
  }
  const bridgeSeen = new Set();
  for (const pad of course.floors) {
    if (pad.bridge) {
      if (bridgeSeen.has(pad.chunk)) continue;
      bridgeSeen.add(pad.chunk);
      const mates = course.floors.filter((other) => other.chunk === pad.chunk && other.bridge);
      const step = Math.max(1, Math.ceil(mates.length / 6));
      for (let i = 0; i < mates.length; i += step) {
        const bit = mates[i];
        const sideX = -bit.az;
        const sideZ = bit.ax;
        for (const side of [-1, 1]) {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.62, 0.32), side < 0 ? curbCream : curbCoral);
          post.position.set(bit.x + side * sideX * (bit.rx + 0.22), bit.y + 0.31, bit.z + side * sideZ * (bit.rx + 0.22));
          post.castShadow = false;
          scene.add(post);
        }
      }
      continue;
    }
    if (pad.rx < 4 || pad.rx >= 10 || pad.zone === "ship") continue;
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.62, 0.32), side < 0 ? curbCream : curbCoral);
      post.position.set(pad.x + side * (pad.rx + 0.28), pad.y + 0.31, pad.z);
      post.castShadow = false;
      scene.add(post);
    }
  }
  const archGates = [];
  if (gltfs.arch) {
    const idleClip = (gltfs.arch.animations || []).find((clip) => clip.name === "idle");
    const cheerClip = (gltfs.arch.animations || []).find((clip) => clip.name === "cheer");
    for (const gate of course.gates || []) {
      const root = gltfs.arch.scene.clone(true);
      const foot = groundAt(course, 0, gate.z);
      root.position.set(0, foot ? foot.y : gate.y, gate.z);
      root.scale.set((gate.rx * 2) / 10, 1, 1);
      root.traverse((node) => {
        if (node.isMesh && node.material) node.material = node.material.clone();
      });
      scene.add(root);
      const mixer = new THREE.AnimationMixer(root);
      const idle = idleClip ? mixer.clipAction(idleClip) : null;
      const cheer = cheerClip ? mixer.clipAction(cheerClip) : null;
      if (idle) idle.play();
      archGates.push({ mixer, idle, cheer, z: gate.z });
    }
  }
  const sockets = [];
  const seatMats = [];
  const shipBox = new THREE.Box3().setFromObject(ship);
  const shipSize = shipBox.getSize(new THREE.Vector3());
  const shipMid = shipBox.getCenter(new THREE.Vector3());
  for (let i = 1; i <= 8; i++) {
    let sock = ship.getObjectByName("SeatSocket_" + i);
    if (!sock) {
      sock = new THREE.Object3D();
      const col = (i - 1) % 4;
      const row = Math.floor((i - 1) / 4);
      sock.position.set((col - 1.5) * 0.55, shipSize.y * 0.46, (row - 0.5) * 0.42);
      ship.add(sock);
    }
    sockets.push(sock);
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
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false })
  );
  beacon.position.y = 20;
  ship.add(beacon);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(3.1, 3.7, 28),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(course.ship.x, course.ship.y + 0.08, course.ship.z - 4.2);
  ring.userData.bloom = true;
  scene.add(ring);
  const goalBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.9, 28, 10, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
  );
  goalBeam.userData.bloom = true;
  scene.add(goalBeam);
  const chevrons = new THREE.Group();
  const chevGeo = new THREE.ConeGeometry(0.7, 1.5, 4);
  const chevMat = new THREE.MeshBasicMaterial({ color: 0xfff1a8, transparent: true, opacity: 0.85, depthWrite: false });
  const guide = (course.routes && course.routes[0]) || course.waypoints || [];
  for (let i = 2; i < guide.length; i += 3) {
    const wp = guide[i];
    const next = guide[Math.min(guide.length - 1, i + 1)];
    const mark = new THREE.Mesh(chevGeo, chevMat);
    mark.position.set(wp.x, (wp.y || 0) + 1.3, wp.z);
    mark.rotation.x = Math.PI / 2;
    mark.rotation.z = Math.atan2(next.x - wp.x, next.z - wp.z);
    chevrons.add(mark);
  }
  scene.add(chevrons);
  for (const clip of gltfs.ship.animations || []) {
    clip.tracks = clip.tracks.filter((track) => !(track.name.startsWith("ShipBody") && track.name.endsWith("position")));
  }
  const shipMixer = new THREE.AnimationMixer(ship);
  const idleClip = (gltfs.ship.animations || []).find((clip) => clip.name === "idle");
  const launchClip = (gltfs.ship.animations || []).find((clip) => clip.name === "launch");
  const shipIdle = idleClip ? shipMixer.clipAction(idleClip) : null;
  const shipLaunch = launchClip ? shipMixer.clipAction(launchClip) : null;
  if (shipIdle) {
    shipIdle.setLoop(THREE.LoopRepeat, Infinity);
    shipIdle.play();
  }
  if (shipLaunch) {
    shipLaunch.setLoop(THREE.LoopOnce, 1);
    shipLaunch.clampWhenFinished = true;
    shipLaunch.play();
    shipLaunch.paused = true;
  }
  ship.userData.mixer = shipMixer;
  const thruster = ship.getObjectByName("ThrusterFlame");
  const plume = new THREE.Mesh(
    new THREE.ConeGeometry(0.42, 1.8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.92, depthWrite: false })
  );
  plume.rotation.x = Math.PI;
  plume.position.y = -0.2;
  plume.visible = false;
  const plumeCore = plume.clone();
  plumeCore.material = new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.85, depthWrite: false });
  plumeCore.scale.setScalar(0.55);
  plume.add(plumeCore);
  if (thruster) thruster.add(plume);
  else ship.add(plume);
  const smokeRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.16, 6, 18),
    new THREE.MeshBasicMaterial({ color: 0xfff6e8, transparent: true, opacity: 0, depthWrite: false })
  );
  smokeRing.rotation.x = Math.PI / 2;
  smokeRing.visible = false;
  scene.add(smokeRing);
  const launchTrail = [];
  for (let i = 0; i < 8; i++) {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 6, 5),
      new THREE.MeshBasicMaterial({ color: 0xfff6e8, transparent: true, opacity: 0, depthWrite: false })
    );
    puff.visible = false;
    scene.add(puff);
    launchTrail.push(puff);
  }

  const lava = new THREE.Mesh(
    new THREE.CircleGeometry(14, 40),
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader: "uniform float uTime; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.03,-uTime*0.02); float d=length(vUv-0.5)*2.0; float n=sin(uv.x*22.0+uTime)*sin(uv.y*19.0-uTime*0.8); n+=sin((uv.x*2.0+uv.y)*16.0+uTime*1.4)*0.65; float hotMask=smoothstep(0.15,0.72,n*0.5+0.5); vec3 crust=vec3(0.18,0.03,0.03); vec3 hot=vec3(1.0,0.82,0.18); vec3 c=mix(crust, hot, hotMask); c=mix(c, crust, smoothstep(0.48,0.9,d)); c+=vec3(1.0,0.35,0.05)*smoothstep(0.5,0.75,d)*(1.0-smoothstep(0.82,1.0,d)); gl_FragColor=vec4(c,1.0); }",
    })
  );
  lava.rotation.x = -Math.PI / 2;
  lava.position.set(0, cfg.lavaStartY, (course.lava.z0 + course.lava.z1) / 2);
  lava.userData.bloom = true;
  scene.add(lava);
  let trimTick = 0;
  const crownMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.36, 5),
    new THREE.MeshBasicMaterial({ color: 0xffd23f })
  );
  crownMesh.visible = false;
  scene.add(crownMesh);
  if (course.crater) {
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(course.crater.r * 1.35, 20),
      new THREE.MeshBasicMaterial({ color: 0xffb15a, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.scale.setScalar(0.72);
    glow.position.set(course.crater.x, course.crater.y + 0.2, course.crater.z);
    scene.add(glow);
  }
  const bubbleGeo = new THREE.SphereGeometry(0.28, 8, 6);
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.55, depthWrite: false });
  const bubbles = [];
  const lavaMidZ = (course.lava.z0 + course.lava.z1) / 2;
  for (let i = 0; i < 22; i++) {
    const mesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    const ang = (i / 22) * Math.PI * 2;
    const rad = 3 + (i % 5) * 2.2;
    mesh.position.set(Math.cos(ang) * rad, cfg.lavaStartY + 0.4, lavaMidZ + Math.sin(ang) * rad);
    mesh.userData.decor = true;
    mesh.userData.base = mesh.position.clone();
    mesh.userData.speed = 0.6 + (i % 4) * 0.25;
    mesh.userData.phase = i * 0.7;
    scene.add(mesh);
    bubbles.push(mesh);
  }
  const shimmerMat = new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const shimmers = [];
  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.4), shimmerMat);
    mesh.position.set(-10 + i * 3, cfg.lavaStartY + 1.1, lavaMidZ + ((i % 2) - 0.5) * 8);
    scene.add(mesh);
    shimmers.push(mesh);
  }
  const skyZone = (course.zones || []).find((z) => z.id === "sky");
  if (skyZone) {
    const puffMat = new THREE.MeshBasicMaterial({ color: 0xfff4fb, transparent: true, opacity: 0.9, depthWrite: false });
    for (let i = 0; i < 7; i++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(7 + (i % 3) * 2, 10, 8), puffMat);
      puff.scale.y = 0.28;
      puff.position.set(-16 + (i % 4) * 10, 1.1, skyZone.z0 + 12 + i * ((skyZone.z1 - skyZone.z0) / 8));
      scene.add(puff);
    }
  }
  const toyColors = {
    meadow: [0x9bb5a4, 0xb7c3b4, 0xaeb6c2],
    canyon: [0xc4a090, 0xb7a48c, 0xcbb3b0],
    sky: [0xc4b6d4, 0xb9c0d4, 0xc9c3d2],
    ice: [0xb7d0dc, 0xd5e4ea, 0xb9c6d8],
    climb: [0xd2c0a4, 0xc9b09a, 0xd4c2b4],
    ship: [0xd8d0b8, 0xd4c4cc, 0xc9d4c4],
  };
  const trimSpots = [];
  for (const pad of course.floors || []) {
    if (pad.rx < 2.2 || pad.zone === "ship") continue;
    const rings = [1.16];
    const count = Math.max(3, Math.round((pad.rx + pad.rz) / 5));
    for (const radius of rings) {
      for (let n = 0; n < count; n++) {
        const a = (n / count) * Math.PI * 2 + pad.z * 0.07 + radius;
        trimSpots.push({
          x: pad.x + Math.cos(a) * pad.rx * radius,
          y: pad.y,
          z: pad.z + Math.sin(a) * pad.rz * radius,
          zone: pad.zone,
          kind: (n + Math.floor(pad.z + radius * 10)) % 6,
          spin: n,
        });
      }
    }
  }
  function toyMesh(geo, spots, kinds) {
    const list = spots.filter((s) => kinds.includes(s.kind));
    if (!list.length) return null;
    const toyMat = new THREE.MeshToonMaterial({ vertexColors: false, gradientMap: TOON_MAP });
    toyMat.onBeforeCompile = (shader) => plasticShader(shader, {});
    const mesh = new THREE.InstancedMesh(geo, toyMat, list.length);
    mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(list.length * 3), 3);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    list.forEach((s, i) => {
      const palette = toyColors[s.zone] || toyColors.meadow;
      color.setHex(palette[i % palette.length]);
      mesh.setColorAt(i, color);
      dummy.position.set(s.x, s.y + 0.08, s.z);
      dummy.rotation.set(s.kind === 1 ? Math.PI / 2 : 0, s.spin, 0);
      const sc = 0.55;
      dummy.scale.set(sc, sc * 0.35, sc);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
    mesh.userData.spots = list;
    return mesh;
  }
  const pillarMesh = toyMesh(new THREE.CylinderGeometry(0.28, 0.34, 1.5, 8), trimSpots, [0]);
  const arrowMesh = toyMesh(new THREE.ConeGeometry(0.38, 0.9, 5), trimSpots, [1]);
  const bumperMesh = toyMesh(new THREE.SphereGeometry(0.42, 8, 6), trimSpots, [2]);
  const starMesh = toyMesh(new THREE.OctahedronGeometry(0.38, 0), trimSpots, [3]);
  if (starMesh) starMesh.userData.bloom = true;
  const balloonMesh = toyMesh(new THREE.SphereGeometry(0.36, 8, 6), trimSpots, [4]);
  const standMesh = toyMesh(new THREE.BoxGeometry(1.1, 0.7, 0.55), trimSpots, [5]);
  void pillarMesh; void arrowMesh; void bumperMesh; void standMesh;
  if (trimSpots.length) {
    const contacts = new THREE.InstancedMesh(
      new THREE.CircleGeometry(0.55, 8),
      new THREE.MeshBasicMaterial({ color: 0x1a1430, transparent: true, opacity: 0.28, depthWrite: false }),
      trimSpots.length
    );
    const contactDummy = new THREE.Object3D();
    trimSpots.forEach((s, i) => {
      contactDummy.position.set(s.x, s.y + 0.04, s.z);
      contactDummy.rotation.x = -Math.PI / 2;
      contactDummy.scale.setScalar(s.kind === 5 ? 1.4 : 0.8);
      contactDummy.updateMatrix();
      contacts.setMatrixAt(i, contactDummy.matrix);
    });
    contacts.instanceMatrix.needsUpdate = true;
    scene.add(contacts);
  }
  const liquids = [];
  function addLiquid(color, x, y, z, radius) {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
      vertexShader: "uniform float uTime; varying vec2 vUv; void main(){ vUv=uv; vec3 p=position; p.z += sin(position.x*0.55+uTime*1.4)*0.12; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }",
      fragmentShader: "uniform float uTime; uniform vec3 uColor; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.05,-uTime*0.03); float n=sin(uv.x*36.0+uTime)+sin(uv.y*30.0-uTime*0.8); float edge=smoothstep(0.02,0.16,min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y))); float foam=smoothstep(0.45,0.9,n*0.5+0.5)*(1.0-edge); vec3 c=mix(uColor, vec3(0.92,1.0,1.0), foam*0.7); gl_FragColor=vec4(c,0.78); }",
    });
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 24), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    scene.add(mesh);
    liquids.push(mat);
  }
  const iceZone = (course.zones || []).find((z) => z.id === "ice");
  if (iceZone) addLiquid(0x2ec8ff, 0, 2.55, (iceZone.z0 + iceZone.z1) * 0.5, 16);
  addLiquid(0x3dce55, 10, 0.08, course.zones ? course.zones[0].z0 + 36 : 40, 5);

  const geyserMeshes = course.geysers.map((g) => {
    const group = cloneDrawn(gltfs.geyser);
    group.position.set(g.x, g.y, g.z);
    group.userData.jet = group.getObjectByName("GeyserJet");
    group.userData.ring = group.getObjectByName("GeyserRing");
    scene.add(group);
    return group;
  });

  const pendMeshes = course.pendulums.map((p) => {
    const group = cloneDrawn(gltfs.pendulum);
    const scale = p.len / 4.3;
    group.scale.setScalar(scale);
    group.position.set(p.x, p.y - p.len, p.z);
    group.userData.arm = group.getObjectByName("HammerArm");
    scene.add(group);
    return { group, arm: group.userData.arm };
  });

  const sweepMeshes = course.sweepers.map((s) => {
    const group = cloneDrawn(gltfs.sweeper);
    const span = (s.halfLen || 3.2) * 2;
    const scale = span / 7.5;
    group.scale.setScalar(scale);
    group.position.set(s.x, s.y - 0.75 * scale, s.z);
    playClip(group, gltfs.sweeper, "spin", true);
    scene.add(group);
    return group;
  });
  for (const pad of course.floors) {
    const chunk = course.chunks[pad.chunk];
    if (!chunk || !chunk.fragile || !gltfs.crumble) continue;
    const tile = cloneDrawn(gltfs.crumble);
    tile.scale.setScalar((pad.rx * 2) / 2);
    tile.position.set(pad.x, pad.y, pad.z);
    tile.userData.baseY = pad.y;
    tile.userData.crack = tile.getObjectByName("CrackCore");
    scene.add(tile);
    chunk.tile = tile;
    if (chunk.mesh) chunk.mesh.visible = false;
  }
  const spinnerRings = course.spinners.map((s) => telRing(s.x, s.y, s.z, (s.len || 1.6) * 0.7));
  const sweepRings = course.sweepers.map((s) => telRing(s.x, s.y, s.z, 1.5));
  for (const mesh of bumperMeshes) outlineOf(mesh, 0.05);
  for (const mesh of sweepMeshes) outlineOf(mesh, 0.045);
  for (const vis of pendMeshes) if (vis.group) outlineOf(vis.group, 0.04);
  let hazardPlanet = 1;
  let hazardMix = "";
  function showPlanetHazards(n, mix) {
    hazardPlanet = n || 1;
    hazardMix = mix || "";
    const sweepOn = hazardPlanet === 1 && hazardMix !== "rollers";
    bumperMeshes.forEach((mesh) => { mesh.visible = sweepOn; });
    sweepMeshes.forEach((mesh) => { mesh.visible = sweepOn; });
    rollerMeshes.forEach((mesh) => { mesh.visible = hazardMix === "rollers" || hazardPlanet !== 1; });
  }
  const pendRings = course.pendulums.map((p) => telRing(p.x, p.y - p.len, p.z, 1.2));
  const rollerRings = course.rollers.map((r) => telRing(r.x, r.y, r.z, 1.3));

  function outlineOf(group, amount) {
    const width = (amount || 0.03) >= 0.045 ? 0.05 : 0.025;
    group.traverse((node) => {
      if (!node.isMesh || node.userData.hull) return;
      const label = (node.name || "") + ((node.material && node.material.name) || "");
      if (/Flame|Thruster|Glow|Glass|Star/i.test(label)) return;
      const mat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        skinning: !!node.isSkinnedMesh,
        uniforms: { uColor: { value: new THREE.Color(0x1e2440) }, uWidth: { value: width } },
        vertexShader: "#include <common>\n#include <skinning_pars_vertex>\nuniform float uWidth;\nvoid main(){\n#include <beginnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <begin_vertex>\n#include <skinning_vertex>\ntransformed += normalize(objectNormal) * uWidth;\n#include <project_vertex>\n}",
        fragmentShader: "uniform vec3 uColor;\nvoid main(){gl_FragColor=vec4(uColor,1.0);}",
      });
      outlineMats.push(mat);
      const shell = node.isSkinnedMesh ? new THREE.SkinnedMesh(node.geometry, mat) : new THREE.Mesh(node.geometry, mat);
      if (node.isSkinnedMesh && node.skeleton) shell.bind(node.skeleton, node.bindMatrix);
      shell.userData.hull = true;
      shell.castShadow = false;
      shell.frustumCulled = false;
      node.add(shell);
    });
  }
  const hatMat = new THREE.MeshToonMaterial({ color: 0xffd23f, gradientMap: TOON_MAP });
  const bowMat = new THREE.MeshToonMaterial({ color: 0xff6b6b, gradientMap: TOON_MAP });

  const rollerMeshes = course.rollers.map((r) => {
    const group = cloneDrawn(gltfs.roller);
    group.scale.setScalar(r.radius);
    if (r.snow) {
      group.traverse((node) => {
        if (!node.isMesh || !node.material || !node.material.color) return;
        if (node.name === "RollerEye" || node.name === "RollerMouth") return;
        node.material.color.set(0xf7fbff);
      });
    }
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.07, 6, 18),
      new THREE.MeshBasicMaterial({ color: r.snow ? 0xd7f4ff : 0xffd23f, transparent: true, opacity: 0.85 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.82;
    group.add(ring);
    group.userData.ring = ring;
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.42, 7), hatMat);
    cap.position.y = 1.05;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.06), new THREE.MeshToonMaterial({ color: 0xfff6e5, gradientMap: TOON_MAP }));
    tooth.position.set(-0.08, -0.08, 0.95);
    const tooth2 = tooth.clone();
    tooth2.position.x = 0.08;
    group.add(cap, tooth, tooth2);
    outlineOf(group);
    scene.add(group);
    return group;
  });

  const hopperMeshes = course.hoppers.map(() => {
    const g = cloneDrawn(gltfs.hopper);
    g.userData.body = g.getObjectByName("HopperBody");
    g.userData.eyes = g.getObjectByName("HopperEye");
    const bow = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.08), bowMat);
    bow.position.set(0, 0.15, 0.62);
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), bowMat);
    cheek.position.set(0.28, 0.02, 0.48);
    const cheek2 = cheek.clone();
    cheek2.position.x = -0.28;
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshToonMaterial({ color: 0xffe8c2, gradientMap: TOON_MAP }));
    belly.scale.set(1, 0.7, 0.45);
    belly.position.set(0, -0.12, 0.42);
    g.add(bow, cheek, cheek2, belly);
    outlineOf(g);
    scene.add(g);
    return g;
  });

  const flyerMeshes = course.flyers.map(() => {
    const g = cloneDrawn(gltfs.flyer);
    g.userData.wing = g.getObjectByName("FlyerWings");
    g.userData.eyes = g.getObjectByName("FlyerEye");
    const goggle = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 6, 10), hatMat);
    goggle.position.set(0.16, 0.12, 0.34);
    const goggle2 = goggle.clone();
    goggle2.position.x = -0.16;
    g.add(goggle, goggle2);
    outlineOf(g);
    scene.add(g);
    return g;
  });

  function slabGeometry(seed) {
    const n = 6;
    const positions = [];
    const colors = [];
    const indices = [];
    const top = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed;
      const r = 0.75 + ((i * 3 + seed * 5) % 3) * 0.28;
      top.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    positions.push(0, 0.18, 0);
    colors.push(0.28, 0.16, 0.12);
    top.forEach(([x, z]) => {
      positions.push(x, 0.18, z);
      colors.push(1, 0.45, 0.08);
    });
    positions.push(0, -0.18, 0);
    colors.push(0.35, 0.18, 0.1);
    top.forEach(([x, z]) => {
      positions.push(x * 0.92, -0.22, z * 0.92);
      colors.push(0.85, 0.22, 0.04);
    });
    for (let i = 0; i < n; i++) {
      const a = 1 + i;
      const b = 1 + ((i + 1) % n);
      indices.push(0, b, a);
      const c = 1 + n + 1 + i;
      const d = 1 + n + 1 + ((i + 1) % n);
      indices.push(1 + n, c, d);
      indices.push(a, b, d, a, d, c);
    }
    const drip = n * 2 + 2;
    positions.push(0.2, -0.85, 0.15);
    colors.push(1, 0.4, 0.05);
    positions.push(0.05, -0.2, 0.05);
    colors.push(1, 0.55, 0.08);
    positions.push(0.35, -0.2, 0.22);
    colors.push(1, 0.35, 0.04);
    indices.push(drip, drip + 1, drip + 2);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }
  const breakBits = [];
  const breakMat = new THREE.MeshToonMaterial({
    vertexColors: true,
    emissive: 0xff7a1a,
    emissiveIntensity: 0.35,
    gradientMap: TOON_MAP,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(slabGeometry(i * 0.7), breakMat);
    mesh.scale.setScalar(0.55 + (i % 3) * 0.18);
    mesh.visible = false;
    scene.add(mesh);
    breakBits.push({
      mesh,
      ox: ((i % 5) - 2) * 0.55,
      oy: 0.15,
      oz: -0.3 - (i % 4) * 0.4,
      spin: 0.7 + (i % 5) * 0.22,
      fall: 0.55 + (i % 3) * 0.2,
    });
  }
  const speedLines = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 1.6),
      new THREE.MeshBasicMaterial({ color: 0xfff6e5, transparent: true, opacity: 0.75 })
    );
    line.position.set((i % 5) - 2, 0.4 + (i % 3) * 0.35, -0.4 - (i % 4) * 0.35);
    speedLines.add(line);
  }
  speedLines.visible = false;
  scene.add(speedLines);

  const clouds = [];
  for (let i = 0; i < 7; i++) {
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(2.2 + (i % 3), 8, 6), new THREE.MeshLambertMaterial({ color: 0xfff6e5 }));
    cloud.position.set(-18 + i * 9, 16 + (i % 2) * 3, course.zones[2].z0 + 20 + i * 18);
    cloud.scale.y = 0.45;
    cloud.userData.ox = cloud.position.x;
    cloud.userData.oz = cloud.position.z;
    scene.add(cloud);
    clouds.push(cloud);
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
  buddyRoot.userData.buddy = true;
  scene.add(buddyRoot);
  const shadowGeo = new THREE.CircleGeometry(0.48, 14);
  const blobMat = new THREE.MeshBasicMaterial({ color: 0x1e2440, transparent: true, opacity: 0.3, depthWrite: false });
  const youTex = makeYouTexture();

  for (const racer of course.spawns.length ? Array.from({ length: cfg.racers }) : []) {
    /* filled below */
  }
  for (let i = 0; i < cfg.racers; i++) {
    const model = SkeletonUtils.clone(buddyGltf.scene);
    const colorHex = ["#7DFFC4", "#FFE56A", "#FF9FE0", "#A78BFF", "#7AD8FF", "#9AEE6A", "#E4C6FF", "#FFD09A", "#6C8CFF", "#4EE0C8", "#FF7AB8", "#D6F06A", "#B4C8FF", "#FFC44A", "#FFA090", "#9AE4FF"][i % 16];
    model.traverse((obj) => {
      if (!obj.isMesh || !obj.material) return;
      const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      obj.material = buddyMat(src, colorHex);
      obj.frustumCulled = false;
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
    outlineOf(model, 0.025);
    let headBone = null;
    let hasAntenna = false;
    model.traverse((obj) => {
      if (!obj.isBone) return;
      if (obj.name === "head") headBone = obj;
      if (obj.name === "antenna.L" || obj.name === "antenna.R") hasAntenna = true;
    });
    const antennas = [];
    const lids = [];
    if (headBone && !hasAntenna) {
      const antMat = new THREE.MeshToonMaterial({ color: colorHex, gradientMap: TOON_MAP });
      for (const side of [-1, 1]) {
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.26, 5), antMat);
        ant.position.set(side * 0.1, 0.18, 0.05);
        const tip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), new THREE.MeshToonMaterial({ color: 0xffd23f, gradientMap: TOON_MAP }));
        tip.position.y = 0.15;
        ant.add(tip);
        headBone.add(ant);
        antennas.push(ant);
        const lid = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), new THREE.MeshBasicMaterial({ color: 0x1c1430 }));
        lid.scale.set(1.1, 0.08, 0.45);
        lid.position.set(side * 0.045, 0.05, 0.11);
        headBone.add(lid);
        lids.push(lid);
      }
    }
    const mixer = new THREE.AnimationMixer(model);
    const actions = {};
    const clipNames = ["Idle", "Run", "Jump", "Fall", "Land", "Dive", "Grab", "Tumble", "Celebrate", "Eliminated", "Emote"];
    const looping = new Set(["Idle", "Run", "Fall", "Grab", "Tumble", "Celebrate"]);
    for (const clip of buddyGltf.animations) {
      const mapped = BUDDY_CLIPS[clip.name] || (clipNames.includes(clip.name) ? clip.name : "");
      if (!mapped || actions[mapped]) continue;
      const source = ROOT_LOCK.has(mapped) ? clip.clone() : clip;
      if (ROOT_LOCK.has(mapped)) {
        for (const track of source.tracks) {
          if (!isRootPositionTrack(track.name)) continue;
          const locked = lockRootPosition(track.values);
          for (let v = 0; v < track.values.length; v++) track.values[v] = locked[v];
        }
      }
      const action = mixer.clipAction(source);
      if (looping.has(mapped)) action.setLoop(THREE.LoopRepeat, Infinity);
      else {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      action.play();
      action.setEffectiveWeight(mapped === "Idle" ? 1 : 0);
      actions[mapped] = action;
    }
    if (actions.Jump && !actions.Fall) {
      const fall = mixer.clipAction(actions.Jump.getClip().clone());
      fall.setLoop(THREE.LoopOnce, 1);
      fall.clampWhenFinished = true;
      fall.play();
      fall.setEffectiveWeight(0);
      actions.Fall = fall;
    }
    const hasClips = clipNames.some((name) => actions[name]);
    const accessories = addBuddyGear(model);
    const gearNames = ["classic", "heli", "goggles", "stars", "flower", "scarf", "fish", "crown"];
    const pick = gearNames[i % gearNames.length];
    if (accessories[pick]) accessories[pick].visible = true;
    const group = new THREE.Group();
    group.add(model);
    const shadow = new THREE.Mesh(shadowGeo, blobMat);
    shadow.userData.blobShadow = true;
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
      tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: youTex, depthTest: false, transparent: true, opacity: 1 }));
      tag.scale.set(0.34, 0.14, 1);
      tag.position.set(0.22, 2.22, 0);
      tag.center.set(0.5, 0);
      group.add(tag);
    }
    buddyRoot.add(group);
    group.traverse((obj) => {
      if (!obj.isMesh || obj.userData.hull) return;
      obj.castShadow = lightTier > 0;
      obj.receiveShadow = true;
    });
    visuals.push({ group, model, mixer, actions, hasClips, shadow, tag, current: "Idle", docked: false, accessories, pick, dusted: false, starred: false, mixAcc: 0, wasAir: false, landUntil: 0, antennas, lids, splashed: false });
  }

  let podiumRenderer = null;
  let podiumScene = null;
  let podiumCam = null;
  const podiumMixers = [];
  const podiumSlots = [];
  const podiumCanvas = document.getElementById("podium-stage");
  const podiumColors = ["#7DFFC4", "#FFE56A", "#FF9FE0", "#A78BFF", "#7AD8FF", "#9AEE6A", "#E4C6FF", "#FFD09A", "#6C8CFF", "#4EE0C8", "#FF7AB8", "#D6F06A", "#B4C8FF", "#FFC44A", "#FFA090", "#9AE4FF"];
  if (podiumCanvas && buddyGltf) {
    podiumRenderer = new THREE.WebGLRenderer({ canvas: podiumCanvas, antialias: false, alpha: true });
    podiumRenderer.setPixelRatio(1);
    podiumRenderer.setSize(320, 150, false);
    podiumRenderer.outputColorSpace = THREE.SRGBColorSpace;
    podiumScene = new THREE.Scene();
    podiumCam = new THREE.PerspectiveCamera(30, 320 / 150, 0.1, 40);
    podiumCam.position.set(0, 2.15, 6.4);
    podiumCam.lookAt(0, 1.05, 0);
    podiumScene.add(new THREE.HemisphereLight(0x9fd4ff, 0xffc48a, 0.6));
    const podiumKey = new THREE.DirectionalLight(0xfff0c2, 1.1);
    podiumKey.position.set(-2.5, 5, 3);
    podiumScene.add(podiumKey);
    const steps = [
      { x: -1.45, h: 0.42, c: 0xc5cfe6 },
      { x: 0, h: 0.72, c: 0xffd23f },
      { x: 1.45, h: 0.28, c: 0xd4894a },
    ];
    for (let s = 0; s < steps.length; s++) {
      const step = steps[s];
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, step.h, 1.05),
        new THREE.MeshToonMaterial({ color: step.c, gradientMap: TOON_MAP })
      );
      box.position.set(step.x, step.h * 0.5, 0);
      podiumScene.add(box);
      const model = SkeletonUtils.clone(buddyGltf.scene);
      model.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
        obj.material = buddyMat(src, podiumColors[0]);
        obj.frustumCulled = true;
        obj.castShadow = false;
      });
      const mixer = new THREE.AnimationMixer(model);
      const clip = (buddyGltf.animations || []).find((item) => item.name === "celebrate");
      if (clip) {
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
      }
      const group = new THREE.Group();
      group.add(model);
      group.position.set(step.x, step.h, 0);
      group.visible = false;
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.42, 0.58, 16),
        new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide, depthWrite: false })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.04;
      ring.visible = false;
      group.add(ring);
      podiumScene.add(group);
      podiumMixers.push(mixer);
      podiumSlots.push({ group, model, ring });
    }
  }
  function showPodium(places) {
    const order = [1, 0, 2];
    for (let slot = 0; slot < podiumSlots.length; slot++) {
      const bit = podiumSlots[slot];
      const place = places && places[order[slot]];
      if (!place) {
        bit.group.visible = false;
        continue;
      }
      bit.group.visible = true;
      bit.ring.visible = !!place.you;
      const hex = podiumColors[(place.id || 0) % podiumColors.length];
      bit.model.traverse((obj) => {
        if (!obj.isMesh || !obj.material || !obj.material.userData) return;
        const tint = obj.material.userData.tint;
        if (tint && tint.set) tint.set(hex);
        const shader = obj.material.userData.shader;
        if (shader && shader.uniforms && shader.uniforms.uTint) shader.uniforms.uTint.value.set(hex);
      });
    }
    if (podiumRenderer && podiumScene && podiumCam) podiumRenderer.render(podiumScene, podiumCam);
  }

  const confetti = [];
  const puffGeo = new THREE.SphereGeometry(0.16, 6, 5);
  const sparkGeo = new THREE.OctahedronGeometry(0.14, 0);
  for (let i = 0; i < 56; i++) {
    const star = i >= 44;
    const mesh = new THREE.Mesh(
      star ? sparkGeo : puffGeo,
      new THREE.MeshBasicMaterial({ color: 0xfff6e8, transparent: true, opacity: 1, depthWrite: false })
    );
    mesh.visible = false;
    scene.add(mesh);
    confetti.push({ mesh, v: new THREE.Vector3(), alive: false, life: 0, max: 0.32, star });
  }

  const state = {
    yaw: 0,
    push: null,
    reduceShake: false,
    pitch: cfg.defaultPitch,
    autoWait: 0,
    portrait: true,
    shake: 0,
    planet: 1,
  };

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    state.portrait = h >= w;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    const pw = Math.max(2, Math.floor((w || 2) * dpr));
    const ph = Math.max(2, Math.floor((h || 2) * dpr));
    sceneTarget.setSize(pw, ph);
    bloomTarget.setSize(Math.max(2, pw >> 1), Math.max(2, ph >> 1));
    camera.aspect = w / Math.max(1, h);
    camera.fov = state.portrait ? cfg.fovPortrait : cfg.fovLandscape;
    camera.updateProjectionMatrix();
  }
  resize();

  const seatPop = Array(8).fill(0);
  function paintSeat(index, hex) {
    const saved = seatMats[index];
    if (hex) seatPop[index] = 1;
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

  function burst(x, y, z, color, gentle, star) {
    if (lowDetail) return;
    for (const bit of confetti) {
      if (bit.alive || bit.star !== !!star) continue;
      bit.alive = true;
      bit.life = bit.max = gentle ? 0.32 : 0.45;
      bit.mesh.visible = true;
      bit.mesh.position.set(x, y, z);
      bit.mesh.scale.set(1, star ? 1 : 0.4, star ? 1 : 1);
      if (color) bit.mesh.material.color.setHex(color);
      bit.mesh.material.opacity = 0.9;
      bit.v.set((Math.random() - 0.5) * (gentle ? 0.8 : 1.6), gentle ? 0.4 : 1.2, (Math.random() - 0.5) * (gentle ? 0.8 : 1.6));
      break;
    }
  }
  function puffRing(x, y, z, color) {
    if (lowDetail) return;
    for (let n = 0; n < 7; n++) {
      const a = (n / 7) * Math.PI * 2;
      burst(x + Math.cos(a) * 0.45, y, z + Math.sin(a) * 0.45, color || 0xfff3df, true, false);
    }
  }

  let confettiOn = false;

  function showRing(ring, glow, x, y, z) {
    if (!ring) return;
    ring.visible = glow > 0.04;
    ring.material.opacity = glow * 0.85;
    ring.scale.setScalar(1 + glow * 0.35);
    if (x != null) ring.position.set(x, y + 0.14, z);
  }

  function paintTelegraphs(race) {
    const bumps = race.course.bumpers || [];
    const meadowHazards = (race.planetN || hazardPlanet) === 1;
    for (let i = 0; i < bumperRings.length; i++) showRing(bumperRings[i], meadowHazards ? (bumps[i] && bumps[i].glow || 0) : 0);
    for (let i = 0; i < spinnerRings.length; i++) showRing(spinnerRings[i], race.spinners[i] && race.spinners[i].glow || 0);
    for (let i = 0; i < sweepRings.length; i++) {
      const s = race.sweepers[i];
      showRing(sweepRings[i], meadowHazards ? (s && s.glow || 0) : 0, s && s.x, s && s.y, s && s.z);
    }
    for (let i = 0; i < pendRings.length; i++) {
      const p = race.pendulums[i];
      showRing(pendRings[i], p && p.glow || 0, p && p.bobX, p && (p.bobY - 0.4), p && p.bobZ);
    }
    for (let i = 0; i < rollerRings.length; i++) {
      const r = race.rollers[i];
      showRing(rollerRings[i], r && r.glow || 0, r && r.x, r && r.y, r && r.z);
    }
  }

  let blobShadows = null;
  function applyLightTier(tier) {
    lightTier = tier;
    const on = tier > 0;
    sun.castShadow = on;
    renderer.shadowMap.enabled = on;
    if (on) {
      const size = tier >= 2 ? 1024 : 512;
      if (sun.shadow.mapSize.x !== size) {
        sun.shadow.mapSize.set(size, size);
        if (sun.shadow.map) {
          sun.shadow.map.dispose();
          sun.shadow.map = null;
        }
      }
      sun.shadow.radius = tier >= 2 ? 2.5 : 1;
    }
    if (!blobShadows) {
      blobShadows = [];
      scene.traverse((obj) => {
        if (obj.userData && obj.userData.blobShadow) blobShadows.push(obj);
      });
    }
    for (let i = 0; i < blobShadows.length; i++) blobShadows[i].visible = !on;
  }
  applyLightTier(lightTier);

  function update(race, dt, look) {
    if (race.crates && crateMeshes.length !== race.crates.length) {
      for (const mesh of crateMeshes) scene.remove(mesh);
      crateMeshes.length = 0;
      for (const c of race.crates) {
        const mesh = new THREE.Mesh(crateGeo, crateMat);
        mesh.position.set(c.x, c.y, c.z);
        scene.add(mesh);
        crateMeshes.push(mesh);
      }
    }
    for (let i = 0; i < crateMeshes.length; i++) {
      const c = race.crates[i];
      crateMeshes[i].position.set(c.x, c.y, c.z);
    }
    const collapsing = look && look.cine && look.cine.kind === "collapse";
    const collapseDrop = collapsing ? collapseShot(look.cine.t, look.cine.dur, race.player.pos).drop : 0;
    for (const chunk of course.chunks) {
      const mesh = chunk.mesh;
      if (!mesh) continue;
      if (collapsing) chunk.fallY = -collapseDrop * (chunk.z1 < race.player.pos.z - 6 ? 1 : 0.55);
      if (chunk.state === "gone") {
        mesh.visible = false;
        if (chunk.tile) chunk.tile.visible = false;
        chunk.dirty = false;
        continue;
      }
      mesh.visible = !chunk.tile;
      mesh.material = chunk.state === "cracking" ? crackMat : floorMat;
      if (chunk.tile) {
        const wobble = chunk.state === "cracking" ? Math.sin(race.time * 18 + chunk.jitter * 9) * 0.06 : 0;
        chunk.tile.visible = chunk.state !== "gone";
        chunk.tile.position.y = chunk.tile.userData.baseY + (chunk.fallY || 0) + wobble;
        const crack = chunk.tile.userData.crack;
        if (crack && crack.material) crack.material.emissiveIntensity = chunk.state === "cracking" ? 1 : 0.35;
      }
      const wobble = chunk.state === "cracking" ? Math.sin(race.time * 18 + chunk.jitter * 9) * 0.045 : 0;
      mesh.position.y = (chunk.fallY || 0) + wobble;
      if (chunk.state === "cracking" && crackMat.emissive) {
        crackMat.emissive.setHex(0xff7a1a);
        crackMat.emissiveIntensity = 0.6 + Math.abs(Math.sin(race.time * 8)) * 0.4;
      }
      const cz = (chunk.z0 + chunk.z1) * 0.5;
      const cy = (chunk.positions && chunk.positions[1]) || 3;
      if (chunk.state === "cracking" && !chunk.shaken) {
        chunk.shaken = true;
        for (let n = 0; n < 2; n++) {
          const bit = takeDebris();
          if (!bit) break;
          bit.active = true;
          bit.mode = "shake";
          bit.chunk = chunk;
          bit.life = 4;
          bit.vy = 0;
          bit.mesh.visible = true;
          bit.mesh.position.set((n - 0.5) * 1.4, cy + 0.2, cz);
          if (bit.shake) bit.shake.reset().play();
        }
      }
      if (chunk.state === "falling" && chunk.dirty && !chunk.spawned) {
        chunk.spawned = true;
        for (const bit of debris) {
          if (bit.chunk !== chunk || bit.mode !== "shake") continue;
          bit.mode = "tumble";
          bit.life = 1.6;
          bit.vy = 1.2 + Math.random();
          if (bit.shake) bit.shake.stop();
          if (bit.tumble) bit.tumble.reset().play();
        }
        const want = lowDetail ? 2 : 4;
        let spawned = 0;
        while (spawned < want) {
          const bit = takeDebris();
          if (!bit) break;
          bit.active = true;
          bit.mode = "tumble";
          bit.chunk = chunk;
          bit.life = 1.6;
          bit.vy = 1.2 + Math.random();
          bit.mesh.visible = true;
          bit.mesh.position.set((Math.random() - 0.5) * 5, cy + spawned * 0.3, cz + (Math.random() - 0.5) * 2);
          bit.mesh.rotation.set(Math.random(), Math.random(), Math.random());
          if (bit.tumble) bit.tumble.reset().play();
          spawned++;
        }
        burst(0, cy, cz, 0xfff6e5);
        burst(0.6, cy + 0.2, cz, 0xfff6e5);
      }
      chunk.dirty = false;
    }

    for (const bit of debris) {
      if (!bit.active) continue;
      if (bit.mode === "shake" && bit.chunk) {
        bit.mesh.position.y = ((bit.chunk.positions && bit.chunk.positions[1]) || 3) + 0.2 + Math.sin(race.time * 18) * 0.04;
        if (bit.mixer) bit.mixer.update(dt);
        continue;
      }
      if (bit.mixer) bit.mixer.update(dt);
      bit.mesh.rotation.x += dt * 2.4;
      bit.vy -= 12 * dt;
      bit.mesh.position.y += bit.vy * dt;
      bit.life -= dt;
      if (bit.life <= 0) {
        bit.active = false;
        bit.mode = "";
        bit.chunk = null;
        bit.mesh.visible = false;
      }
    }
    if (race.gateCheer > 0) race.gateCheer = Math.max(0, race.gateCheer - dt);
    for (const arch of archGates) {
      const show = !!(race.gate && Math.abs(race.gate.z - arch.z) < 3);
      arch.mixer.getRoot().visible = show;
      if (!show) continue;
      arch.mixer.update(dt);
      if (race.gateCheer > 0.35 && arch.cheer && !arch.cheer.isRunning()) arch.cheer.reset().play();
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
      else if (p.axis === "seesaw") {
        const face = p.face || 0;
        obj.rotation.set(Math.abs(face) > 1 ? p.tilt || 0 : 0, 0, Math.abs(face) > 1 ? 0 : -(p.tilt || 0));
      }
    }
    if (coinParts.length) {
      for (let i = 0; i < race.course.coins.length; i++) {
        const c = race.course.coins[i];
        let scale = 1;
        if (c.got) {
          if (c.pop == null) c.pop = 0.3;
          c.pop = Math.max(0, c.pop - dt);
          scale = c.pop > 0.18 ? 1.35 : (c.pop / 0.18);
        }
        coinDummy.position.set(c.x, c.y + Math.sin((race.time || 0) * 6.2 + i) * 0.08, c.z);
        coinDummy.rotation.set(0.6, (race.time || 0) * Math.PI * 2, 0);
        coinDummy.scale.setScalar(scale);
        coinDummy.updateMatrix();
        const shellDummy = coinDummy.clone();
        shellDummy.scale.multiplyScalar(1.08);
        shellDummy.updateMatrix();
        for (const part of coinParts) {
          part.mesh.setMatrixAt(i, coinDummy.matrix);
          part.shell.setMatrixAt(i, shellDummy.matrix);
        }
        if (!c.got && (i + Math.floor((race.time || 0) * 6)) % 11 === 0) {
          const dx = c.x - race.player.pos.x;
          const dz = c.z - race.player.pos.z;
          if (dx * dx + dz * dz < 80) burst(c.x, c.y, c.z, 0xfff1a8, true, true);
        }
      }
      for (const part of coinParts) {
        part.mesh.instanceMatrix.needsUpdate = true;
        part.shell.instanceMatrix.needsUpdate = true;
      }
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
      const ang = Math.atan2(p.bobX - p.x, p.y - p.bobY);
      if (vis.arm) vis.arm.rotation.z = ang;
    }
    for (let i = 0; i < race.sweepers.length; i++) {
      const s = race.sweepers[i];
      const scale = sweepMeshes[i].scale.x || 1;
      sweepMeshes[i].visible = (race.planetN || hazardPlanet) === 1;
      sweepMeshes[i].position.set(s.x, s.y - 0.75 * scale, s.z);
      if (sweepMeshes[i].userData.mixer) sweepMeshes[i].userData.mixer.update(dt);
    }
    for (let i = 0; i < bumperMeshes.length; i++) {
      const mesh = bumperMeshes[i];
      mesh.visible = (race.planetN || hazardPlanet) === 1;
      const bumper = course.bumpers[i];
      const action = mesh.userData.action;
      if (mesh.userData.mixer) mesh.userData.mixer.update(dt);
      if (!action || !bumper) continue;
      let hit = false;
      for (const racer of race.racers) {
        if (racer.flail < 0.15) continue;
        if (Math.hypot(racer.pos.x - bumper.x, racer.pos.z - bumper.z) < cfg.bumperRadius + 0.4) hit = true;
      }
      if (hit && !mesh.userData.pulsed) {
        action.reset();
        action.paused = false;
        action.play();
        mesh.userData.pulsed = true;
      }
      if (!hit) mesh.userData.pulsed = false;
    }
    for (let i = 0; i < padMeshes.length; i++) {
      const mesh = padMeshes[i];
      const pad = course.pads[i];
      if (mesh.userData.mixer) mesh.userData.mixer.update(dt);
      const action = mesh.userData.action;
      if (action && pad && pad.pulse > 0.2 && !mesh.userData.boing) {
        action.reset();
        action.paused = false;
        action.play();
        mesh.userData.boing = true;
      }
      if (pad && pad.pulse <= 0.05) mesh.userData.boing = false;
    }
    for (let i = 0; i < race.rollers.length; i++) {
      const r = race.rollers[i];
      rollerMeshes[i].position.set(r.x, r.y, r.z);
      rollerMeshes[i].rotation.z = r.rot;
      const ring = rollerMeshes[i].userData.ring;
      if (ring) ring.scale.setScalar(1 + Math.sin(race.time * 7 + i) * 0.14);
      let bumped = false;
      for (const racer of race.racers) {
        if (racer.flail < 0.2) continue;
        const dx = racer.pos.x - r.x;
        const dz = racer.pos.z - r.z;
        if (dx * dx + dz * dz < 5) bumped = true;
      }
      const squ = bumped ? 0.78 : 1;
      const idle = 1 + Math.sin(race.time * 2.2 + i) * 0.04;
      rollerMeshes[i].scale.set(r.radius * (bumped ? 1.15 : idle), r.radius * squ, r.radius);
    }
    for (let i = 0; i < race.hoppers.length; i++) {
      const h = race.hoppers[i];
      hopperMeshes[i].position.set(h.x, h.y + 0.55, h.z);
      const body = hopperMeshes[i].userData.body;
      if (body) {
        body.scale.y = h.hopping ? 1.18 : 0.62 + Math.sin(race.time * 3 + i) * 0.04;
        body.scale.x = h.hopping ? 0.86 : 1.12;
      }
      const eyes = hopperMeshes[i].userData.eyes;
      if (eyes) eyes.scale.y = Math.sin(race.time * 2.4 + i * 2) > 0.96 ? 0.12 : 1;
    }
    for (let i = 0; i < race.flyers.length; i++) {
      const f = race.flyers[i];
      flyerMeshes[i].position.set(f.x, f.y, f.z);
      flyerMeshes[i].rotation.y = -f.ang;
      const wing = flyerMeshes[i].userData.wing;
      if (wing) wing.rotation.z = Math.sin(race.time * 14 + i) * 0.55;
      flyerMeshes[i].scale.y = 1 + Math.sin(race.time * 14 + i) * 0.08;
      const flyerEyes = flyerMeshes[i].userData.eyes;
      if (flyerEyes) flyerEyes.scale.y = Math.sin(race.time * 3 + i) > 0.97 ? 0.15 : 1;
    }

    lava.position.y = race.lavaY;
    const goal = race.shipRound || !race.gate ? course.ship : race.gate;
    if (goal) {
      goalBeam.position.set(goal.x || 0, (goal.y || 0) + 16, goal.z || 0);
      goalBeam.scale.y = 1 + Math.sin((race.time || 0) * 3) * 0.04;
    }
    chevrons.visible = race.phase === "race" || race.phase === "countdown";
    if (lava.material.uniforms && lava.material.uniforms.uTime) lava.material.uniforms.uTime.value = race.time || 0;
    for (const mat of liquids) mat.uniforms.uTime.value = race.time || 0;
    if (Math.random() < 0.45) burst(lava.position.x + (Math.random() - 0.5) * 8, lava.position.y + 0.4, lava.position.z + (Math.random() - 0.5) * 8, 0xff8a2a, true);
    if (race.kind === "survival" && Math.random() < 0.5) burst(race.player.pos.x + (Math.random() - 0.5) * 6, race.player.pos.y + 1.2, race.player.pos.z + 2, 0xe7f6ff, true);
    if (race.kind === "crown" && race.crown && race.phase === "race") {
      crownMesh.visible = true;
      crownMesh.position.set(race.crown.x, (race.crown.y || 0) + 2.2 + Math.sin((race.time || 0) * 3) * 0.12, race.crown.z);
      crownMesh.rotation.y = race.time || 0;
    } else crownMesh.visible = false;
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      const rise = ((race.time * b.userData.speed + b.userData.phase) % 2.4);
      b.position.y = b.userData.base.y + rise;
      b.position.x = b.userData.base.x + Math.sin(race.time * 1.4 + b.userData.phase) * 0.25;
      b.scale.setScalar(0.45 + rise * 0.35);
    }
    for (let i = 0; i < shimmers.length; i++) {
      shimmers[i].position.y = cfg.lavaStartY + 1.05 + Math.sin(race.time * 2 + i) * 0.2;
      shimmers[i].rotation.z = Math.sin(race.time + i) * 0.15;
      shimmers[i].lookAt(camera.position);
    }
    trimTick = (trimTick + 1) % 2;
    if (starMesh && trimTick === 0) {
      const spots = starMesh.userData.spots || [];
      const dummy = new THREE.Object3D();
      for (let i = 0; i < spots.length; i++) {
        const s = spots[i];
        dummy.position.set(s.x, s.y + 1.15, s.z);
        dummy.rotation.set(0.5, race.time * 1.6 + s.spin, 0.2);
        dummy.updateMatrix();
        starMesh.setMatrixAt(i, dummy.matrix);
      }
      starMesh.instanceMatrix.needsUpdate = true;
    }
    if (balloonMesh && trimTick === 0) {
      const spots = balloonMesh.userData.spots || [];
      const dummy = new THREE.Object3D();
      for (let i = 0; i < spots.length; i++) {
        const s = spots[i];
        dummy.position.set(s.x, s.y + 2.1 + Math.sin(race.time * 1.6 + s.spin) * 0.18, s.z);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        balloonMesh.setMatrixAt(i, dummy.matrix);
      }
      balloonMesh.instanceMatrix.needsUpdate = true;
    }

    ship.position.y = race.shipY;
    if (ship.userData.mixer) ship.userData.mixer.update(dt);
    const launching = race.phase === "launch" || (race.phase === "results" && race.result === "escaped");
    if (launching && shipLaunch && !ship.userData.leftPad) {
      ship.userData.leftPad = true;
      if (shipIdle) shipIdle.fadeOut(0.1);
      shipLaunch.paused = false;
      shipLaunch.reset();
      shipLaunch.play();
    }
    if (!launching) ship.userData.leftPad = false;
    const active = race.phase !== "countdown";
    beacon.material.opacity = active ? 0.16 + Math.sin(race.time * 4) * 0.05 : 0.04;
    plume.visible = launching;
    if (plume.visible) {
      const s = 1 + Math.sin((race.launchT || 0) * 28) * 0.16;
      plume.scale.set(s, 1.3 + Math.min(1.6, (race.launchT || 0) * 0.7), s);
    }
    if (launching && race.launchT < 1.15) {
      smokeRing.visible = true;
      const k = race.launchT / 1.15;
      smokeRing.position.set(course.ship.x, course.ship.y + 0.15, course.ship.z);
      smokeRing.scale.setScalar(1 + k * 3.4);
      smokeRing.material.opacity = (1 - k) * 0.75;
    } else smokeRing.visible = false;
    for (let i = 0; i < launchTrail.length; i++) {
      const puff = launchTrail[i];
      puff.visible = launching && !lowDetail;
      if (!puff.visible) continue;
      const lag = (i + 1) * 0.55;
      puff.position.set(ship.position.x, ship.position.y - lag * 0.85, ship.position.z);
      puff.scale.setScalar(0.7 + i * 0.12);
      puff.material.opacity = Math.max(0.08, 0.55 - i * 0.05);
    }
    ring.material.opacity = race.phase === "race" ? 0.55 + Math.sin(race.time * 5) * 0.25 : 0.2;

    for (let i = 0; i < race.racers.length; i++) {
      const r = race.racers[i];
      const v = visuals[i];
      const dist = i === 0 ? 0 : Math.hypot(r.pos.x - race.player.pos.x, r.pos.z - race.player.pos.z);
      v.mixAcc += dt;
      const budget = dist < 16 ? 0 : dist < 36 ? 0.1 : 0.2;
      if (v.mixAcc >= budget) {
        v.mixer.update(v.mixAcc);
        v.mixAcc = 0;
      }
      const boarding = r.seated && race.phase === "launch" && race.holdLaunch > 1.3 && race.launchT < 1.5;
      if (boarding) {
        if (v.docked) {
          scene.add(v.group);
          v.docked = false;
          v.shadow.visible = false;
        }
        const k = Math.max(0, Math.min(1, race.launchT / 1.5));
        const lane = ((r.seatIndex || 0) % 4) - 1.5;
        v.group.scale.setScalar(1);
        v.group.position.set(course.ship.x + lane * 1.15, course.ship.y, course.ship.z - 9 + k * 7.2);
        v.group.rotation.set(0, 0, 0);
        setAnim(v, k > 0.08 ? "Run" : "Idle", 1);
        continue;
      }
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
        setAnim(v, "Celebrate", 1);
        continue;
      }
      const lead = race.interp || 0;
      v.group.position.set(r.pos.x + r.vel.x * lead, r.pos.y, r.pos.z + r.vel.z * lead);
      if (v.face == null) v.face = r.yaw;
      let turn = r.yaw - v.face;
      while (turn > Math.PI) turn -= Math.PI * 2;
      while (turn < -Math.PI) turn += Math.PI * 2;
      v.face += turn * Math.min(1, dt * 10);
      v.group.rotation.y = v.face;
      const squash = Math.min(1, r.squash || 0);
      let sx = 1 + squash * 0.1;
      let sy = 1 - squash * 0.18;
      if (!r.grounded && r.vel.y > 0.5) { sy = 1.14; sx = 0.9; }
      else if (!r.grounded && r.vel.y < -2) { sy = 0.92; sx = 1.06; }
      v.group.scale.set(sx, sy, sx);
      if (v.antennas) {
        for (let a = 0; a < v.antennas.length; a++) v.antennas[a].rotation.z = Math.sin((race.time || 0) * 3.2 + i + a) * 0.35;
      }
      if (v.lids) {
        const blink = Math.sin((race.time || 0) * 1.3 + i * 2.1) > 0.92;
        for (const lid of v.lids) lid.scale.y = blink ? 1 : 0.05;
      }
      if (r.squash > 0.32 && !v.dusted) {
        v.dusted = true;
        for (let n = 0; n < 3; n++) burst(r.pos.x + (n - 1) * 0.2, r.pos.y + 0.1, r.pos.z, 0xd7c4a4);
      }
      if (r.squash < 0.05) v.dusted = false;
      const hsp = Math.hypot(r.vel.x, r.vel.z);
      if (r.grounded && hsp > 0.8 && i === 0) {
        v.stepT = (v.stepT || 0) - dt;
        if (v.stepT <= 0) {
          v.stepT = 0.28;
          burst(r.pos.x, r.pos.y + 0.08, r.pos.z, 0xd7c4a4);
        }
      }
      if (r.flail > 0.4 && !v.starred) {
        v.starred = true;
        for (let n = 0; n < 4; n++) burst(r.pos.x, r.pos.y + 1.45, r.pos.z, 0xfff6c8, true, true);
      }
      if (r.flail < 0.05) v.starred = false;
      if (r.sliding > 0 && i === 0) burst(r.pos.x, r.pos.y + 0.15, r.pos.z);
      if (v.tag) {
        const show = race.phase === "countdown";
        const next = show ? 1 : Math.max(0, v.tag.material.opacity - dt * 1.6);
        v.tag.material.opacity = next;
        v.tag.visible = next > 0.04;
      }
      if (i === 0) {
        speedLines.visible = !!(r.diving || r.sliding > 0);
        if (speedLines.visible) {
          speedLines.position.set(r.pos.x, r.pos.y + 0.9, r.pos.z);
          speedLines.rotation.y = r.yaw;
        }
      }
      const blade = v.accessories && v.accessories.heli && v.accessories.heli.userData.blade;
      if (blade && v.accessories.heli.visible) blade.rotation.y += dt * 14;
      if (v.wasAir && r.grounded) {
        v.landUntil = (race.time || 0) + 0.2;
        puffRing(r.pos.x, r.pos.y + 0.08, r.pos.z, 0xfff3df);
      }
      if ((r.diving || r.sliding > 0) && i === 0 && Math.random() < 0.5) burst(r.pos.x, r.pos.y + 0.45, r.pos.z - 0.3, r.color || 0x7dffe0, true, false);
      v.wasAir = !r.grounded;
      let anim = "Idle";
      if (r.eliminated) anim = "Eliminated";
      else if (r.seated || r.qualified || r.emote === "cheer") anim = "Celebrate";
      else if (r.flail > 0.2) anim = "Tumble";
      else if (r.grabT > 0) anim = "Grab";
      else if (r.diving || r.sliding > 0) anim = "Dive";
      else if (r.grounded && (race.time || 0) < v.landUntil) anim = "Land";
      else if (!r.grounded && r.vel.y > 0.35) anim = "Jump";
      else if (!r.grounded) anim = "Fall";
      else if (race.phase === "countdown" && i !== 0) anim = "Emote";
      else if (hsp > 0.8) anim = "Run";
      setAnim(v, anim, hsp / 6.5);
      if (v.shadow) {
        v.shadow.visible = r.grounded && !sun.castShadow;
        v.shadow.position.y = 0.04;
      }
    }

    if (!lowDetail && (race.popConfetti || (race.phase === "results" && race.result === "escaped")) && !confettiOn) {
      confettiOn = true;
      race.popConfetti = 0;
      const p = visuals[0].group;
      const wp = new THREE.Vector3();
      p.getWorldPosition(wp);
      for (let n = 0; n < 8; n++) burst(ship.position.x + (Math.random() - 0.5) * 2, ship.position.y + 1.2, ship.position.z, 0xfff1a8, true, true);
    }
    for (const bit of confetti) {
      if (!bit.alive) continue;
      bit.life -= dt;
      bit.v.y -= (bit.star ? 1.5 : 0.4) * dt;
      bit.mesh.position.addScaledVector(bit.v, dt);
      bit.mesh.rotation.y += dt * (bit.star ? 6 : 1);
      const k = Math.max(0, bit.life / bit.max);
      bit.mesh.material.opacity = k;
      const grow = bit.star ? 0.6 + (1 - k) * 0.8 : 0.35 + (1 - k) * 1.3;
      bit.mesh.scale.setScalar(grow);
      if (bit.life <= 0) {
        bit.alive = false;
        bit.mesh.visible = false;
      }
    }

    const breaking = race.phase === "launch" || race.phase === "results";
    for (const bit of breakBits) {
      bit.mesh.visible = breaking;
      if (!breaking) continue;
      bit.mesh.position.set(
        ship.position.x + bit.ox,
        Math.max(course.ship.y + 0.15, ship.position.y - 0.6 - race.launchT * bit.fall),
        ship.position.z + bit.oz
      );
      bit.mesh.rotation.x = -0.7;
      bit.mesh.rotation.y = race.launchT * bit.spin;
    }
    beacon.visible = race.phase !== "launch" && race.phase !== "results" && race.seatCine <= 0;
    dressing.update(race, dt);
    for (let i = 0; i < propMixers.length; i++) propMixers[i].update(dt);
    if (podiumRenderer && race.phase === "results") {
      for (let i = 0; i < podiumMixers.length; i++) podiumMixers[i].update(dt);
      podiumRenderer.render(podiumScene, podiumCam);
    }
    tickFoliage(race.time || 0);
    for (let i = 0; i < clouds.length; i++) {
      const cloud = clouds[i];
      cloud.position.x = cloud.userData.ox + Math.sin(race.time * 0.15 + i) * 6;
      cloud.position.z = cloud.userData.oz + race.time * (1.2 + i * 0.15);
    }
    for (let i = 0; i < doorMeshes.length; i++) {
      const door = doorMeshes[i];
      const dz = door.position.z - race.player.pos.z;
      door.rotation.z = dz > 0 && dz < 9 ? Math.sin(race.time * 26) * 0.045 : 0;
    }
    for (let i = 0; i < padMeshes.length; i++) {
      const pad = course.pads[i];
      const pulse = pad && pad.pulse ? pad.pulse : 0;
      const base = padMeshes[i].userData.base || 1;
      padMeshes[i].scale.set(base * (1 + pulse * 0.28), base * (1 - pulse * 0.42), base * (1 + pulse * 0.28));
      if (pad && pad.pulse > 0) pad.pulse = Math.max(0, pad.pulse - dt * 1.5);
    }
    for (let i = 0; i < seatPop.length; i++) {
      if (seatPop[i] <= 0) continue;
      seatPop[i] = Math.max(0, seatPop[i] - dt * 1.4);
      const saved = seatMats[i];
      if (!saved) continue;
      for (const entry of saved) {
        if (entry.mat.emissive) entry.mat.emissiveIntensity = 0.35 + seatPop[i] * 1.4;
      }
    }
    const skyNow = zoneSky(race.zoneId || "meadow");
    const pal = planetLook(state.planet);
    const night = state.planet === 3;
    nightFloor.value = night ? 1 : 0;
    const mix = night ? 1 : 0.62;
    palScratch.top.setHex(pal.top);
    palScratch.mid.setHex(pal.mid);
    palScratch.bot.setHex(pal.bot);
    skyScratch.top.setHex(skyNow.top).lerp(palScratch.top, mix);
    skyScratch.mid.setHex(skyNow.mid).lerp(palScratch.mid, mix);
    skyScratch.bot.setHex(skyNow.bot || skyNow.mid).lerp(palScratch.bot, mix);
    sky.material.uniforms.top.value.copy(skyScratch.top);
    sky.material.uniforms.mid.value.copy(skyScratch.mid);
    sky.material.uniforms.bot.value.copy(skyScratch.bot);
    if (sky.material.uniforms.sunGain) sky.material.uniforms.sunGain.value = night ? 0 : 1;
    scene.fog.color.setHex(night ? pal.fog : skyNow.fog);
    scene.fog.near = Math.max(58, skyNow.near);
    scene.fog.far = skyNow.far;
    scenic.position.x = -camera.position.x * 0.05;
    scenic.position.z = -camera.position.z * 0.05;
    const focusX = race.player.pos.x;
    const focusY = race.player.pos.y;
    const focusZ = race.player.pos.z;
    sun.position.set(focusX - 12, focusY + 22, focusZ + 8);
    sun.target.position.set(focusX, focusY + 0.6, focusZ + 2);
    sun.target.updateMatrixWorld();
    if (sun.castShadow) {
      const span = lightTier >= 2 ? 14 : 10;
      sun.shadow.camera.left = sun.shadow.camera.bottom = -span;
      sun.shadow.camera.right = sun.shadow.camera.top = span;
      sun.shadow.camera.updateProjectionMatrix();
    }
    paintTelegraphs(race);
    for (let i = 0; i < race.racers.length; i++) {
      const near = Math.hypot(race.racers[i].pos.x - race.player.pos.x, race.racers[i].pos.z - race.player.pos.z) < 14;
      visuals[i].group.traverse((obj) => { if (obj.isMesh) obj.castShadow = near; });
    }
    updateCamera(race, dt, look);
    peelCamera(race);
    sky.position.copy(camera.position);
    heavens.position.copy(camera.position);
    planet.rotation.y = (race.time || 0) * 0.08;
    const starNight = state.planet === 3 || race.zoneId === "canyon" || race.zoneId === "climb";
    stars.material.opacity = state.planet === 3 ? 1 : starNight ? 0.4 : 0.14;
    stars.material.size = state.planet === 3 ? 3.4 : 2.2;
    planet.visible = state.planet !== 3 && !lowDetail;
    planetRing.visible = planet.visible;
    puffMat.color.setHex(state.planet === 3 ? 0x12182c : state.planet === 2 ? 0xffe4f6 : 0xffffff);
    puffMat.opacity = state.planet === 3 ? 0.0 : 0.92;
    for (const puff of cloudPuffs) puff.visible = state.planet !== 3 && !lowDetail;
    for (let i = 0; i < cloudPuffs.length; i++) cloudPuffs[i].position.x += Math.sin((race.time || 0) * 0.2 + i) * 0.03;
    for (let i = 0; i < flags.length; i++) flags[i].rotation.y = Math.sin((race.time || 0) * 2.2 + i) * 0.45;
    for (let i = 0; i < spectatorShips.length; i++) spectatorShips[i].position.x += Math.sin((race.time || 0) * 0.3 + i) * 0.02;
    for (const cp of cpRings) cp.rotation.z = race.time * 0.4;
    void bumperMeshes;
  }

  function setAnim(v, name, scale) {
    if (!v.hasClips) return;
    const clipName = v.actions[name] ? name : (v.actions.Idle ? "Idle" : "");
    const next = clipName && v.actions[clipName];
    if (!next) return;
    if (clipName === "Run") next.setEffectiveTimeScale(Math.max(0.65, Math.min(1.65, (scale || 1) * 1.15)));
    if (v.current === clipName) return;
    const prev = v.current && v.actions[v.current];
    if (prev && prev !== next) prev.fadeOut(0.16);
    next.reset().setEffectiveWeight(1).fadeIn(0.16).play();
    v.current = clipName;
  }

  function groundAtSafe(x, z) {
    const g = groundAt(course, x, z);
    return g ? g.y : null;
  }

  const crateMeshes = [];
  const crateGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  const crateMat = new THREE.MeshToonMaterial({ color: 0xe0a45c, gradientMap: TOON_MAP });

  const camRay = new THREE.Raycaster();
  const camHead = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  let camBlockers = null;
  function camSolids() {
    if (camBlockers) return camBlockers;
    scene.updateMatrixWorld(true);
    const list = [];
    const scale = new THREE.Vector3();
    scene.traverse((obj) => {
      if (!obj.isMesh || !obj.geometry || !obj.matrixWorld) return;
      let node = obj;
      while (node) {
        if (node.userData && (node.userData.decor || node.userData.buddy || node.userData.skipCam)) return;
        node = node.parent;
      }
      if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
      obj.getWorldScale(scale);
      if (obj.userData.floor) return;
      const reach = obj.geometry.boundingSphere.radius * Math.max(Math.abs(scale.x), Math.abs(scale.y), Math.abs(scale.z));
      if (reach < 0.4 || reach > 14) return;
      list.push(obj);
    });
    camBlockers = list;
    return list;
  }
  const fadedProps = [];
  let propSpheres = null;
  const propDummy = new THREE.Object3D();
  function propBounds() {
    if (propSpheres) return propSpheres;
    propSpheres = [];
    scene.updateMatrixWorld(true);
    scene.traverse((obj) => {
      if (!obj.isMesh || !obj.geometry) return;
      if (obj.userData.floor || obj.userData.skipCam || obj.userData.blobShadow) return;
      let node = obj;
      while (node) {
        if (node.userData && (node.userData.buddy || node.userData.skipCam)) return;
        node = node.parent;
      }
      if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
      const bs = obj.geometry.boundingSphere;
      if (obj.isInstancedMesh) {
        for (let i = 0; i < obj.count; i++) {
          obj.getMatrixAt(i, propDummy.matrix);
          propDummy.matrix.decompose(propDummy.position, propDummy.quaternion, propDummy.scale);
          const r = bs.radius * Math.max(propDummy.scale.x, propDummy.scale.y, propDummy.scale.z);
          if (r < 0.4 || r > 7) continue;
          propSpheres.push({ x: propDummy.position.x, y: propDummy.position.y, z: propDummy.position.z, r });
        }
        return;
      }
      obj.updateWorldMatrix(true, false);
      const center = bs.center.clone().applyMatrix4(obj.matrixWorld);
      obj.getWorldScale(propDummy.scale);
      const r = bs.radius * Math.max(propDummy.scale.x, propDummy.scale.y, propDummy.scale.z);
      if (r < 0.4 || r > 7) return;
      propSpheres.push({ x: center.x, y: center.y, z: center.z, r });
    });
    return propSpheres;
  }
  function coursePiece(obj) {
    let node = obj;
    while (node) {
      if (node.userData && (node.userData.floor || node.userData.course || node.userData.buddy || node.userData.skipCam)) return true;
      node = node.parent;
    }
    return false;
  }
  function fadeBlockers(head) {
    for (let i = 0; i < fadedProps.length; i++) {
      const entry = fadedProps[i];
      entry.obj.material = entry.base;
    }
    fadedProps.length = 0;
    camDir.copy(head).sub(camera.position);
    const dist = camDir.length();
    if (dist < 0.35) return;
    camDir.multiplyScalar(1 / dist);
    camRay.set(camera.position, camDir);
    camRay.far = Math.min(dist - 0.35, 4.5);
    let hits = [];
    try { hits = camRay.intersectObjects(camSolids(), false); } catch (err) { return; }
    const seen = new Set();
    for (const hit of hits) {
      if (hit.distance > 3.2) break;
      const obj = hit.object;
      if (!obj || obj.isInstancedMesh || seen.has(obj)) continue;
      if (obj.userData.floor || coursePiece(obj)) continue;
      if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
      obj.getWorldScale(propDummy.scale);
      const reach = obj.geometry.boundingSphere.radius * Math.max(propDummy.scale.x, propDummy.scale.y, propDummy.scale.z);
      if (reach > 2.4) continue;
      const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      if (!mat || mat === floorMat || mat === terrainMat || mat === crackMat) continue;
      seen.add(obj);
      const fadeMat = mat.clone();
      fadeMat.transparent = true;
      fadeMat.opacity = 0.18;
      fadeMat.depthWrite = false;
      fadedProps.push({ obj, base: obj.material });
      obj.material = fadeMat;
    }
  }
  function liftAboveCourse(pos) {
    let y = pos.y;
    const pads = course.floors || [];
    for (let i = 0; i < pads.length; i++) {
      const pad = pads[i];
      if (!pad || !pad.rx || !pad.rz) continue;
      const nx = (pos.x - pad.x) / pad.rx;
      const nz = (pos.z - pad.z) / pad.rz;
      if (nx * nx + nz * nz > 1) continue;
      if (y < pad.y + 1.25) y = pad.y + 1.25;
    }
    return y;
  }
  function solveCamera(head, want) {
    try {
    camDir.copy(want).sub(head);
    const dist = camDir.length();
    if (dist < 0.25) return want;
    camDir.multiplyScalar(1 / dist);
    camRay.set(head, camDir);
    camRay.far = dist;
    const hits = camRay.intersectObjects(camSolids(), false);
    let stop = dist;
    for (const hit of hits) {
      if (hit.distance > stop - 0.05) continue;
      let skip = false;
      let node = hit.object;
      while (node) {
        if (node.userData && (node.userData.decor || node.userData.buddy || node.userData.skipCam)) {
          skip = true;
          break;
        }
        node = node.parent;
      }
      if (skip) continue;
      const mat = hit.object.material;
      const seeThrough = mat && !Array.isArray(mat) && mat.transparent && mat.opacity < 0.4;
      if (seeThrough) continue;
      stop = hit.distance;
    }
    if (stop < dist - 1.5) state.camBlocked = true;
    if (stop > dist - 0.2) return want;
    camHead.copy(head).addScaledVector(camDir, Math.max(0.9, stop - 0.45));
    return camHead.clone();
    } catch (err) {
      if (typeof window !== "undefined") window.__sbCamErr = String(err && err.stack || err);
      return want;
    }
  }

  function updateCamera(race, dt, look) {
    const player = race.player;
    if (look && look.cine) {
      const cine = look.cine;
      const player = race.player;
      let shot = null;
      if (cine.kind === "flyover") shot = flyoverShot(cine.t, cine.dur, cine.focus || player.pos, player.pos);
      else if (cine.kind === "launch") shot = launchShot(cine.t, cine.dur, ship.position);
      else if (cine.kind === "collapse") shot = collapseShot(cine.t, cine.dur, player.pos);
      if (shot) {
        camera.position.set(shot.x, shot.y, shot.z);
        camera.lookAt(shot.lx, shot.ly, shot.lz);
        return;
      }
    }
    if (look && look.overview) {
      const o = look.overview;
      const head = new THREE.Vector3(o.lx, o.ly + 1.2, o.lz);
      const cleared = backOffView(clearSpheres({ x: o.x, y: o.y, z: o.z }, propBounds(), head), { x: o.lx, y: o.ly, z: o.lz }, propBounds());
      const spot = { x: cleared.x, y: liftAboveCourse(cleared), z: cleared.z };
      if (cameraBuried(spot, course.floors, []) === "terrain") camera.position.set(o.x, liftAboveCourse({ x: o.x, y: o.y, z: o.z }), o.z);
      else camera.position.set(spot.x, spot.y, spot.z);
      camera.lookAt(o.lx, o.ly, o.lz);
      fadeBlockers(head);
      return;
    }
    state.spectate = null;
    state.camBlocked = false;
    const dragging = !!(look && (look.looking || Math.abs(look.lookDx) + Math.abs(look.lookDy) > 0));
    const baseFov = state.portrait ? cfg.fovPortrait : cfg.fovLandscape;
    const kick = race.player && (race.player.diving || race.player.boost > 0) ? 7 : 0;
    const nextFov = baseFov + kick;
    if (Math.abs(camera.fov - nextFov) > 0.15) {
      camera.fov += (nextFov - camera.fov) * Math.min(1, dt * 7);
      camera.updateProjectionMatrix();
    }
    if (race.phase === "countdown" && !race.opened) {
      const span = cfg.countdownBeats + cfg.goHold;
      const k = Math.max(0, Math.min(1, (race.countClock || 0) / span));
      const ease = k * k * (3 - 2 * k);
      const ahead = race.finishZ ? Math.min(40, Math.max(10, (race.finishZ - player.pos.z) * 0.35)) : 28;
      camera.position.set(
        player.pos.x + 12 - ease * 8,
        player.pos.y + 16 - ease * 8,
        player.pos.z - 18 + ease * 10
      );
      camera.lookAt(player.pos.x, player.pos.y + 1.2, player.pos.z + 8 + ahead * ease);
      return;
    }
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
        const wide = state.portrait ? 2.8 : 1.35;
        tx = ship.position.x + 18 * wide;
        ty = ship.position.y + 3.2 * wide;
        tz = ship.position.z + 7 * wide;
        lx = ship.position.x;
        ly = ship.position.y + 1.2;
        lz = ship.position.z;
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
    if ((player.seated || player.eliminated) && race.phase === "race") {
      let lead = null;
      for (const r of race.racers) {
        if (r.seated || r.eliminated) continue;
        if (!lead || r.pos.z > lead.pos.z) lead = r;
      }
      const focus = lead || player;
      const floor = groundAtSafe(focus.pos.x, focus.pos.z);
      const crowd = [];
      for (let i = 0; i < race.racers.length; i++) {
        const r = race.racers[i];
        crowd.push({ x: r.pos.x, y: r.pos.y, z: r.pos.z, eliminated: r.eliminated });
      }
      const frame = spectateFrame(
        { x: focus.pos.x, y: focus.pos.y, z: focus.pos.z },
        race.time || 0,
        floor == null ? focus.pos.y : floor,
        crowd
      );
      let aimX = frame.x;
      let aimY = frame.y;
      let aimZ = frame.z;
      try {
        camDir.set(aimX - frame.look.x, aimY - frame.look.y, aimZ - frame.look.z);
        const span = camDir.length() || 1;
        camDir.multiplyScalar(1 / span);
        camRay.set(new THREE.Vector3(frame.look.x, frame.look.y, frame.look.z), camDir);
        camRay.far = span;
        const blocked = camRay.intersectObjects(camSolids(), false);
        if (blocked.length) aimY += 8;
      } catch (err) { /* keep the open frame */ }
      camera.position.x = damp(camera.position.x, aimX, 4.5, dt);
      camera.position.y = damp(camera.position.y, aimY, 4.5, dt);
      camera.position.z = damp(camera.position.z, aimZ, 4.5, dt);
      const watchers = [];
      for (const racer of race.racers) {
        if (racer.seated) continue;
        watchers.push({ x: racer.pos.x, y: racer.pos.y + 0.9, z: racer.pos.z, r: 1.15 });
      }
      const watchHead = new THREE.Vector3(focus.pos.x, focus.pos.y + 1.4, focus.pos.z + 3);
      const offBodies = clearSpheres(camera.position, watchers, watchHead);
      camera.position.set(offBodies.x, liftAboveCourse(offBodies), offBodies.z);
      camera.lookAt(frame.look.x, frame.look.y, frame.look.z);
      camera.updateMatrixWorld(true);
      const leadClip = new THREE.Vector4(focus.pos.x, focus.pos.y + 1.2, focus.pos.z, 1);
      leadClip.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
      const leadX = leadClip.x / (leadClip.w || 1);
      const leadY = leadClip.y / (leadClip.w || 1);
      if (!(leadClip.w > 0.5 && Math.abs(leadX) < 0.9 && Math.abs(leadY) < 0.92)) {
        camera.position.set(frame.x, liftAboveCourse({ x: frame.x, y: frame.y, z: frame.z }), frame.z);
        camera.lookAt(frame.look.x, frame.look.y, frame.look.z);
        camera.updateMatrixWorld(true);
      }
      const floorY = floor == null ? focus.pos.y : floor;
      state.spectate = {
        back: Math.hypot(frame.x - focus.pos.x, frame.z - focus.pos.z),
        height: frame.y - floorY,
        lookZ: frame.look.z,
        focusZ: focus.pos.z,
      };
      if (scene.fog) {
        scene.fog.near = frame.fogNear;
        scene.fog.far = frame.fogFar;
      }
      return;
    }
    if (state.snap && player) {
      state.yaw = 0;
      state.pitch = cfg.defaultPitch;
      const back = state.portrait ? 7.4 : 8.6;
      const spot = { x: player.pos.x, y: player.pos.y + 3.6, z: player.pos.z - back };
      camera.position.set(spot.x, liftAboveCourse(spot), spot.z);
      camera.lookAt(player.pos.x, player.pos.y + 1.05, player.pos.z + 2.2);
      camera.updateMatrixWorld(true);
      state.snap = 0;
      state.push = null;
      fadeBlockers(new THREE.Vector3(player.pos.x, player.pos.y + 1.2, player.pos.z));
      return;
    }
    if (dragging) {
      const mag = Math.hypot(look.lookDx || 0, look.lookDy || 0);
      const small = mag < 10 ? 0.12 : mag < 24 ? 0.4 : 1;
      const sens = (look.mouse ? cfg.mouseSens : cfg.lookSens) * small;
      const yawStep = Math.max(-0.42, Math.min(0.42, look.lookDx * sens));
      const pitchStep = Math.max(-0.28, Math.min(0.28, look.lookDy * sens));
      state.yaw += yawStep;
      state.pitch = Math.max(cfg.minPitch, Math.min(cfg.maxPitch, state.pitch + pitchStep));
      state.autoWait = Math.min(cfg.autoFollowDelay, 0.28);
    } else if (state.autoWait > 0) {
      state.autoWait -= dt;
    } else {
      const h = Math.hypot(player.vel.x, player.vel.z);
      if (h > 1.15) state.yaw = dampAngle(state.yaw, Math.atan2(player.vel.x, player.vel.z), cfg.autoYaw, dt);
      state.pitch = damp(state.pitch, cfg.defaultPitch, cfg.camLerp || cfg.autoPitch, dt);
    }
    const zoom = look && look.zoom ? look.zoom : 1;
    const behind = Math.max(cfg.camNear || 5, Math.min(cfg.camFar || 12, (state.portrait ? cfg.camDistPortrait : cfg.camDist) * zoom));
    const lifted = (state.portrait ? cfg.camHeight || 3.7 : cfg.camHeightLand || 3.9) * (behind / (state.portrait ? cfg.camDistPortrait : cfg.camDist));
    let horiz = behind;
    let height = lifted;
    if (dragging || Math.abs(state.pitch - cfg.defaultPitch) > 0.08) {
      const radius = Math.hypot(behind, lifted);
      horiz = Math.max(cfg.camNear || 5, radius * Math.cos(state.pitch));
      height = Math.max(2.8, radius * Math.sin(state.pitch));
    }
    let tx = player.pos.x + Math.sin(state.yaw) * horiz;
    let ty = player.pos.y + height;
    let tz = player.pos.z - Math.cos(state.yaw) * horiz;
    const under = groundAtSafe(tx, tz);
    if (under != null && ty < under + 1.2) ty = under + 1.6;
    const headX = player.pos.x;
    const headY = player.pos.y + 1.2;
    const headZ = player.pos.z;
    let cdx = tx - headX;
    let cdy = ty - headY;
    let cdz = tz - headZ;
    let clen = Math.hypot(cdx, cdy, cdz) || 1;
    if (clen < (cfg.camNear || 5)) {
      const s = (cfg.camNear || 5) / clen;
      tx = headX + cdx * s;
      ty = headY + cdy * s;
      tz = headZ + cdz * s;
    }
    const intro = race.phase === "countdown" ? 1 : 0;
    ty += intro * 2.2;
    tz -= intro * 2.4;
    const sampledFloor = groundAtSafe(player.pos.x, player.pos.z);
    state.lastFloor = cameraFloor(sampledFloor, state.lastFloor, player.pos.y);
    const floorBase = state.lastFloor;
    const fallingOff = player.vel.y < -1.5 && player.pos.y < floorBase - 0.6;
    if (fallingOff) {
      tx = player.pos.x + Math.sin(state.yaw) * 7;
      tz = player.pos.z - Math.cos(state.yaw) * 7;
      ty = Math.max(state.fallCamY || floorBase + 4, cameraAboveFloor(-1e9, floorBase));
      state.fallCamY = ty;
    } else {
      state.fallCamY = null;
      ty = cameraAboveFloor(ty, floorBase);
    }
    const solved = solveCamera(new THREE.Vector3(headX, headY, headZ), new THREE.Vector3(tx, ty, tz));
    tx = solved.x;
    ty = cameraAboveFloor(solved.y, floorBase);
    tz = solved.z;
    const sh = (race.shake || 0) * 0.18 * (state.reduceShake ? 0.12 : 1);
    if (sh > 0.01 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tx += (Math.random() - 0.5) * sh;
      ty += (Math.random() - 0.5) * sh * 0.5;
    }
    const spring = cfg.camLerp || 7.5;
    camera.position.x = damp(camera.position.x, tx, spring, dt);
    camera.position.y = damp(camera.position.y, ty, spring, dt);
    camera.position.z = damp(camera.position.z, tz, spring, dt);
    const camFloor = groundAtSafe(camera.position.x, camera.position.z);
    camera.position.y = cameraAboveFloor(camera.position.y, cameraFloor(camFloor, state.lastFloor, 0));
    const aim = { x: player.pos.x, y: player.pos.y + 1.7, z: player.pos.z + Math.cos(state.yaw) * 5 };
    const bodies = [];
    for (const racer of race.racers) {
      if (racer.seated) continue;
      bodies.push({ x: racer.pos.x, y: racer.pos.y + 0.9, z: racer.pos.z, r: 1.15 });
    }
    const crowd = bodies.concat(propBounds());
    const beforePush = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    let freed = backOffView(clearSpheres(camera.position, crowd, new THREE.Vector3(headX, headY, headZ)), aim, crowd);
    const push = { x: freed.x - beforePush.x, y: freed.y - beforePush.y, z: freed.z - beforePush.z };
    if (state.push) {
      const dot = push.x * state.push.x + push.y * state.push.y + push.z * state.push.z;
      if (dot < 0) {
        freed = {
          x: beforePush.x + state.push.x * 0.82,
          y: beforePush.y + state.push.y * 0.82,
          z: beforePush.z + state.push.z * 0.82,
        };
      } else {
        freed = {
          x: beforePush.x + state.push.x * 0.45 + push.x * 0.55,
          y: beforePush.y + state.push.y * 0.45 + push.y * 0.55,
          z: beforePush.z + state.push.z * 0.45 + push.z * 0.55,
        };
      }
    }
    state.push = {
      x: freed.x - beforePush.x,
      y: freed.y - beforePush.y,
      z: freed.z - beforePush.z,
    };
    const buried = cameraBuried(freed, course.floors, []);
    if (buried === "terrain") {
      camera.position.set(beforePush.x, liftAboveCourse(beforePush), beforePush.z);
    } else {
      camera.position.set(freed.x, freed.y, freed.z);
    }
    camera.position.y = liftAboveCourse(camera.position);
    camera.position.y = cameraAboveFloor(camera.position.y, cameraFloor(camFloor, state.lastFloor, 0));
    camera.lookAt(player.pos.x, player.pos.y + 1.7, player.pos.z + Math.cos(state.yaw) * 5);
    camera.updateMatrixWorld(true);
    const selfClip = new THREE.Vector4(player.pos.x, player.pos.y + 1.1, player.pos.z, 1);
    selfClip.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    const selfX = selfClip.x / (selfClip.w || 1);
    const selfY = selfClip.y / (selfClip.w || 1);
    if (!(selfClip.w > 0.5 && Math.abs(selfX) < 1.02 && Math.abs(selfY) < 1.02)) {
      const back = 8;
      const snap = {
        x: player.pos.x + Math.sin(state.yaw) * back,
        y: player.pos.y + 5.2,
        z: player.pos.z - Math.cos(state.yaw) * back,
      };
      camera.position.set(snap.x, liftAboveCourse(snap), snap.z);
      camera.lookAt(player.pos.x, player.pos.y + 1.3, player.pos.z + Math.cos(state.yaw) * 4);
      camera.updateMatrixWorld(true);
    }
    fadeBlockers(new THREE.Vector3(headX, headY, headZ));
    fadePlayer(Math.hypot(camera.position.x - player.pos.x, camera.position.y - (player.pos.y + 1.1), camera.position.z - player.pos.z));
  }

  function peelCamera(race) {
    try {
      const dirs = [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0]];
      const solids = camSolids();
      for (let n = 0; n < 3; n++) {
        let closest = null;
        for (let i = 0; i < dirs.length; i++) {
          camDir.set(dirs[i][0], dirs[i][1], dirs[i][2]);
          camRay.set(camera.position, camDir);
          camRay.far = 0.9;
          const hits = camRay.intersectObjects(solids, false);
          if (hits.length && (!closest || hits[0].distance < closest.distance)) closest = hits[0];
        }
        if (!closest || closest.distance >= 0.75 || !closest.face) break;
        camHead.copy(closest.face.normal).transformDirection(closest.object.matrixWorld);
        camera.position.copy(closest.point).addScaledVector(camHead, 1.05);
      }
      void race;
    } catch (err) { /* leave the solved camera */ }
    const floor = groundAtSafe(camera.position.x, camera.position.z);
    camera.position.y = cameraAboveFloor(camera.position.y, cameraFloor(floor, state.lastFloor, 0));
  }

  function fadePlayer(dist) {
    const v = visuals[0];
    if (!v) return;
    const opacity = dist >= 3.4 ? 1 : Math.max(0.15, (dist - 2.2) / 1.2);
    v.model.traverse((obj) => {
      if (!obj.isMesh || !obj.material || obj.material.name !== "BuddyHue") return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        m.opacity = opacity;
        m.transparent = opacity < 0.98;
        m.depthWrite = opacity > 0.45;
      }
    });
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
        chunk.mesh.material = floorMat;
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
        v.shadow.visible = !sun.castShadow;
        v.docked = false;
      }
    }
    for (let i = 0; i < seatMats.length; i++) paintSeat(i, null);
    ship.position.y = course.ship.y;
    plume.visible = false;
    smokeRing.visible = false;
    ship.userData.leftPad = false;
    state.yaw = 0;
    state.pitch = cfg.defaultPitch;
    state.snap = 1;
    state.push = null;
  }

  function snapBehind() {
    state.yaw = 0;
    state.pitch = cfg.defaultPitch;
    state.snap = 1;
    state.push = null;
  }

  const stage = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.5, 0.24, 24),
    new THREE.MeshToonMaterial({ color: 0xffd23f, gradientMap: TOON_MAP })
  );
  stage.position.y = 0.02;
  stage.visible = false;
  scene.add(stage);

  function showBuddy(dt) {
    heavens.visible = false;
    stage.visible = true;
    stage.position.set(80, 12, -40);
    for (let i = 1; i < visuals.length; i++) visuals[i].group.visible = false;
    const v = visuals[0];
    if (!v) return;
    v.group.visible = true;
    if (v.tag) v.tag.visible = false;
    v.group.position.set(80, 12.15, -40);
    v.group.rotation.x = 0;
    v.group.rotation.z = 0;
    v.group.scale.set(1, 1, 1);
    v.group.rotation.y += dt * 0.7;
    v.mixer.update(dt);
    setAnim(v, "Idle", 1);
    if (v.antennas) {
      for (let a = 0; a < v.antennas.length; a++) v.antennas[a].rotation.z = Math.sin(performance.now() * 0.003 + a) * 0.3;
    }
    if (v.lids) {
      const blink = Math.sin(performance.now() * 0.002) > 0.97 ? 1 : 0.08;
      for (const lid of v.lids) lid.scale.y = blink;
    }
    camera.fov = cfg.fovPortrait;
    camera.updateProjectionMatrix();
    camera.position.set(81.6, 13.05, -36.2);
    camera.lookAt(80, 12.15, -40);
  }

  function hideBuddy() {
    heavens.visible = true;
    stage.visible = false;
    for (const v of visuals) v.group.visible = true;
  }

  function render() {
    if (!postOn) {
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      return;
    }
    renderer.setRenderTarget(sceneTarget);
    renderer.render(scene, camera);
    const mask = camera.layers.mask;
    camera.layers.set(1);
    const shadows = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = false;
    renderer.setRenderTarget(bloomTarget);
    renderer.setClearColor(0x000000, 1);
    renderer.clear(true, true, true);
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = shadows;
    camera.layers.mask = mask;
    renderer.setRenderTarget(null);
    renderer.render(gradeScene, gradeCam);
  }

  scene.traverse((obj) => {
    if (obj.isMesh && obj.userData.bloom) obj.layers.enable(1);
  });
  for (const mat of liquids) mat.uniforms.uTime.value = 0;

  // Warm shaders once.
  camera.position.set(0, 8, -10);
  camera.lookAt(0, 1, 4);
  renderer.render(scene, camera);

  function applyLook(hex, name) {
    const v = visuals[0];
    if (!v) return;
    v.model.traverse((obj) => {
      if (!obj.isMesh || !obj.material) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (!m) continue;
        if (m.userData && m.userData.shader && m.userData.shader.uniforms.uTint) {
          m.userData.shader.uniforms.uTint.value.set(hex);
        }
        if (m.name === "Buddy_Mint" && m.color) m.color.set(hex);
      }
    });
    for (const key of Object.keys(v.accessories || {})) v.accessories[key].visible = key === name;
  }

  return {
    resize,
    update,
    reset,
    render,
    showBuddy,
    hideBuddy,
    view() {
      const p = visuals[0] && visuals[0].group.position;
      const floor = groundAtSafe(camera.position.x, camera.position.z);
      let minSolid = 99;
      let solidName = "";
      try {
        const dirs = [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, -1, 0]];
        for (let i = 0; i < dirs.length; i++) {
          camDir.set(dirs[i][0], dirs[i][1], dirs[i][2]);
          camRay.set(camera.position, camDir);
          camRay.far = 1.25;
          const hits = camRay.intersectObjects(camSolids(), false);
          if (hits.length && hits[0].distance < minSolid) {
            minSolid = hits[0].distance;
            const obj = hits[0].object;
            solidName = (obj && (obj.name || (obj.parent && obj.parent.name))) || "mesh";
          }
        }
      } catch (err) { /* probe only */ }
      const px = p ? p.x : 0;
      const py = p ? p.y : 0;
      const pz = p ? p.z : 0;
      return {
        dist: p ? Math.hypot(camera.position.x - px, camera.position.y - py, camera.position.z - pz) : 0,
        back: p ? Math.hypot(camera.position.x - px, camera.position.z - pz) : 0,
        fov: camera.fov,
        cx: camera.position.x,
        cy: camera.position.y,
        cz: camera.position.z,
        floor: floor == null ? null : floor,
        minSolid,
        solidName,
        fogNear: scene.fog ? scene.fog.near : 0,
        spectate: state.spectate,
        blocked: !!state.camBlocked,
      };
    },
    applyLook,
    snapBehind,
    showPlanetHazards,
    showPodium,
    setTheme(n) {
      state.planet = Math.max(1, Math.min(3, n || 1));
      distantGroups.forEach((group, i) => { group.visible = !lowDetail && i === state.planet - 1; });
      const look = planetLook(state.planet);
      const night = state.planet === 3;
      hemi.color.setHex(look.hemi);
      hemi.groundColor.setHex(look.ground);
      hemi.intensity = 0.6;
      sun.color.setHex(look.sun);
      sun.intensity = night ? 1.05 : 1.12;
      scenic.visible = !lowDetail;
      for (const shiplet of spectatorShips) shiplet.visible = !lowDetail;
    },
    get weak() { return weakGpu; },
    setDetail(on) {
      lowDetail = !!on;
      scenic.visible = !lowDetail;
      distantGroups.forEach((group, i) => { group.visible = !lowDetail && i === state.planet - 1; });
      for (const shiplet of spectatorShips) shiplet.visible = !lowDetail;
      for (const puff of cloudPuffs) puff.visible = state.planet !== 3 && !lowDetail;
    },
    setSafeOutline(on) {
      const color = on ? 0xffe14a : 0x1e2440;
      for (const mat of outlineMats) {
        if (mat.color) mat.color.setHex(color);
        if (mat.uniforms && mat.uniforms.uColor) mat.uniforms.uColor.value.setHex(color);
      }
    },
    setReduceShake(on) { state.reduceShake = !!on; },
    setPost(on) { postOn = !!on && !weakGpu; },
    setDpr(next) {
      dpr = next;
      resize();
    },
    setLow() {
      applyLightTier(0);
      postOn = false;
      dpr = 0.75;
      resize();
    },
    get dpr() { return dpr; },
    get post() { return postOn; },
    noteFps(fps) {
      if (!(fps > 0)) return window.__sbLight;
      if (fps < 55) lowFps++;
      else lowFps = Math.max(0, lowFps - 1);
      if (lowFps > 90 && lightTier > 0) {
        lowFps = 0;
        applyLightTier(lightTier - 1);
      }
      window.__sbLight = { tier: lightTier, shadows: sun.castShadow, map: sun.shadow.mapSize.x, fps };
      return window.__sbLight;
    },
    frameFlat() {
      try {
        const gl = renderer.getContext();
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        if (w < 8 || h < 8) return 0;
        const pix = new Uint8Array(4);
        const buckets = new Map();
        let n = 0;
        let max = 0;
        const sx = Math.max(8, Math.floor(w / 16));
        const sy = Math.max(8, Math.floor(h / 22));
        for (let y = sy; y < h - sy; y += sy) {
          for (let x = sx; x < w - sx; x += sx) {
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pix);
            const key = (pix[0] >> 4) + ":" + (pix[1] >> 4) + ":" + (pix[2] >> 4);
            const next = (buckets.get(key) || 0) + 1;
            buckets.set(key, next);
            if (next > max) max = next;
            n++;
          }
        }
        return n ? max / n : 0;
      } catch (err) {
        return 0;
      }
    },
    project(x, y, z) {
      try {
        const clip = new THREE.Vector4(x, y, z, 1);
        clip.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
        if (!clip.w) return null;
        return { x: clip.x / clip.w, y: clip.y / clip.w, z: clip.z / clip.w, w: clip.w };
      } catch (err) {
        return null;
      }
    },
    sees(x, y, z) {
      try {
        camHead.set(x, y, z);
        camHead.project(camera);
        return camHead.z < 1 && Math.abs(camHead.x) < 1.05 && Math.abs(camHead.y) < 1.05;
      } catch (err) {
        return true;
      }
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
