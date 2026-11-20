// Tuning for Space Buddies. Feel, round length, camera, bots, and juice live here.

export const HEX_SIZE = 2;

export const COLORS = [
  "#5FE3B0",
  "#FFD23F",
  "#FF8FD1",
  "#8C6BFF",
  "#5CC8FF",
  "#7FD88A",
  "#C9B6E8",
  "#FFC38A",
  "#4C6FFF",
  "#2EC4B6",
  "#FF5FA2",
  "#C6E05A",
  "#9BB6FF",
  "#F0B429",
  "#FF8A7A",
  "#7AD0FF",
];

export const CONFIG = {
  raceSeconds: 180,
  countdownBeats: 3,
  goHold: 0.65,
  racers: 16,
  seats: 8,

  collapseDelay: 6,
  collapseArrive: 168,
  crackTime: 1.05,
  crackJitter: 0.7,
  fallTime: 1.2,
  skirtLead: 22,
  fragileCrack: 0.62,

  // Snappy, arcade movement. High accel, short stop, forgiving jump.
  accel: 78,
  airAccel: 46,
  maxSpeed: 8.4,
  playerSpeed: 1,
  friction: 36,
  iceAccel: 14,
  iceFriction: 5,
  gravity: 29,
  fallGravityMul: 1.48,
  jumpVel: 10.15,
  coyoteTime: 0.14,
  jumpBuffer: 0.15,
  ungroundTime: 0.1,
  maxFallSpeed: 28,
  bodyRadius: 0.44,
  stepUp: 0.55,
  voidY: -16,

  bumpPush: 7.4,
  bumpUp: 3.6,
  bumpCooldown: 0.32,

  diveDashSpeed: 12.4,
  diveDashTime: 0.28,
  diveFall: 26,
  diveCooldown: 0.55,
  slideHeight: 0.55,
  poundRadius: 2.15,
  poundPush: 7.5,
  poundUp: 4.6,

  padUp: 12.4,
  padForward: 6.5,
  padRadius: 1.65,
  padCooldown: 0.4,

  bumperPush: 11,
  bumperUp: 5.2,
  bumperRadius: 1.05,
  bumperCooldown: 0.36,

  spinnerLength: 1.62,
  spinnerPush: 9.5,
  spinnerUp: 4.2,
  spinnerHit: 0.58,
  spinnerMinY: 0.55,
  spinnerMaxY: 1.45,
  spinnerCooldown: 0.45,

  lavaRadius: 1.35,
  lavaHop: 6.5,
  lavaStartY: -3.4,
  lavaRisePerSec: 0.022,

  platformRadius: 2.15,
  platformTop: 0.28,

  stunTime: 0.48,
  knockCooldown: 0.55,

  windPush: 3.6,

  boardHalfX: 4.2,
  boardZMin: -8.5,
  boardZMax: -0.4,

  botSpeeds: [1.05, 1.02, 0.99, 0.97, 0.95, 0.93, 0.9, 0.88, 0.85, 0.82, 0.78, 0.74, 0.7, 0.66, 0.62],

  camDist: 8.4,
  camDistPortrait: 7.6,
  defaultPitch: 0.62,
  minPitch: 0.28,
  maxPitch: 1.12,
  lookSens: 0.0052,
  mouseSens: 0.0042,
  autoFollowDelay: 0.85,
  autoYaw: 2.6,
  autoPitch: 1.5,
  camLerp: 7.5,
  fovPortrait: 64,
  fovLandscape: 50,

  shipScale: 1.7,
  seatBuddyScale: 0.44,

  dprCap: 1.25,
  fogNear: 42,
  fogFar: 125,

  bedGain: 0.15,
  rumbleMax: 0.32,
};

export function resolveConfig(opts = {}) {
  const cfg = { ...CONFIG, quick: !!opts.quick, auto: !!opts.auto, seed: opts.seed || 1 };
  if (opts.quick) {
    cfg.raceSeconds = 46;
    cfg.collapseArrive = 42;
    cfg.collapseDelay = 2.5;
    cfg.playerSpeed = 1.12;
    cfg.botSpeeds = cfg.botSpeeds.map((s) => s * 0.9);
    cfg.lavaRisePerSec = 0.08;
  }
  return cfg;
}
