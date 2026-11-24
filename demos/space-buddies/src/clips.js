// Clip names from space_buddy_lowpoly.glb, and root-motion lock for the moving ones.

export const BUDDY_CLIPS = {
  idle: "Idle",
  run: "Run",
  jump: "Jump",
  dive: "Dive",
  tumble: "Tumble",
  celebrate: "Celebrate",
};

export const ROOT_LOCK = new Set(["Jump", "Dive", "Tumble"]);

export function lockRootPosition(values) {
  const out = values.slice();
  const x = out[0];
  const y = out[1];
  const z = out[2];
  for (let i = 3; i < out.length; i += 3) {
    out[i] = x;
    out[i + 1] = y;
    out[i + 2] = z;
  }
  return out;
}

export function isRootPositionTrack(name) {
  return typeof name === "string" && (name === "root.position" || name.endsWith("/root.position") || name.endsWith(".root.position"));
}
