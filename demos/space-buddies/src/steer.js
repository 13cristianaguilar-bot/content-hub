// Camera-relative stick. Yaw 0 puts the camera on -Z looking toward +Z.
// Screen-up follows the camera look. Screen-right follows the camera's right,
// which is the opposite of (cos yaw, sin yaw).

export function yawFromCamera(camX, camZ, px, pz) {
  const dx = camX - px;
  const dz = pz - camZ;
  if (dx * dx + dz * dz < 0.36) return null;
  return Math.atan2(dx, dz);
}

export function cameraWish(yaw, stickX, stickY) {
  const forwardX = -Math.sin(yaw);
  const forwardZ = Math.cos(yaw);
  const rightX = -Math.cos(yaw);
  const rightZ = -Math.sin(yaw);
  return {
    x: rightX * stickX + forwardX * stickY,
    z: rightZ * stickX + forwardZ * stickY,
  };
}

export function yawAfterDrag(yaw, dragX, sens) {
  return yaw + dragX * sens;
}
