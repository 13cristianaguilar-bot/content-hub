// Pull a camera that has ended up inside a prop back to the buddy's side of that prop.

export function cameraBuried(cam, floors, buddies) {
  if (!cam) return "";
  for (const pad of floors || []) {
    if (!pad || !pad.rx || !pad.rz) continue;
    const nx = (cam.x - pad.x) / pad.rx;
    const nz = (cam.z - pad.z) / pad.rz;
    if (nx * nx + nz * nz < 0.72 && cam.y > pad.y - 0.3 && cam.y < pad.y + 0.7) return "terrain";
  }
  for (const buddy of buddies || []) {
    const dx = cam.x - buddy.x;
    const dy = cam.y - (buddy.y + 0.8);
    const dz = cam.z - buddy.z;
    if (dx * dx + dy * dy + dz * dz < 0.45 * 0.45) return "buddy";
  }
  return "";
}

export function pullOutOfSphere(cam, center, radius, head, pad = 0.5) {
  const dx = cam.x - center.x;
  const dy = cam.y - center.y;
  const dz = cam.z - center.z;
  const dist = Math.hypot(dx, dy, dz);
  if (!(radius > 0) || dist >= radius) return null;
  let ox = head.x - center.x;
  let oy = head.y - center.y;
  let oz = head.z - center.z;
  const reach = Math.hypot(ox, oy, oz);
  if (reach < radius + 0.08) {
    ox = dx || 0;
    oy = (dy || 0) + 1;
    oz = dz || 0;
  }
  const len = Math.hypot(ox, oy, oz) || 1;
  const out = radius + pad;
  return {
    x: center.x + (ox / len) * out,
    y: center.y + (oy / len) * out,
    z: center.z + (oz / len) * out,
  };
}

export function clearSpheres(cam, spheres, head) {
  let pos = { x: cam.x, y: cam.y, z: cam.z };
  const list = spheres || [];
  for (let pass = 0; pass < 4; pass++) {
    let moved = false;
    for (let i = 0; i < list.length; i++) {
      const sphere = list[i];
      const next = pullOutOfSphere(pos, sphere, sphere.r, head);
      if (!next) continue;
      pos = next;
      moved = true;
    }
    if (!moved) break;
  }
  return pos;
}

// Step the camera back when a prop sits against the lens, so it cannot fill the frame.
export function backOffView(cam, look, spheres, gap = 2.4) {
  let pos = { x: cam.x, y: cam.y, z: cam.z };
  const list = spheres || [];
  for (let pass = 0; pass < 3; pass++) {
    const dx = look.x - pos.x;
    const dy = look.y - pos.y;
    const dz = look.z - pos.z;
    const len = Math.hypot(dx, dy, dz) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const uz = dz / len;
    let moved = false;
    for (let i = 0; i < list.length; i++) {
      const sphere = list[i];
      const vx = sphere.x - pos.x;
      const vy = sphere.y - pos.y;
      const vz = sphere.z - pos.z;
      const along = vx * ux + vy * uy + vz * uz;
      if (along < 0.15 || along > 8) continue;
      const side = Math.hypot(vx - ux * along, vy - uy * along, vz - uz * along);
      if (side > sphere.r + 0.35) continue;
      const back = sphere.r + gap - along;
      if (back <= 0.05) continue;
      pos = { x: pos.x - ux * back, y: pos.y - uy * back, z: pos.z - uz * back };
      moved = true;
    }
    if (!moved) break;
  }
  return pos;
}
