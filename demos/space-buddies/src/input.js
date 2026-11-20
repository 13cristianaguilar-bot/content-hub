export function createInput(root) {
  const stick = document.getElementById("stick");
  const knob = document.getElementById("knob");
  const keys = new Set();
  const pointers = new Map();
  let lookDx = 0;
  let lookDy = 0;
  let jumpEdge = false;
  let diveEdge = false;
  let grabEdge = false;
  let jumpHeld = false;
  let stickX = 0;
  let stickY = 0;
  let looking = false;
  const radius = 54;
  const ZOOM_KEY = "space-buddies-zoom";
  let zoom = 1;
  try { zoom = Math.min(12 / 8.6, Math.max(5 / 8.6, Number(localStorage.getItem(ZOOM_KEY)) || 1)); } catch (err) { /* private mode */ }
  let pinchDist = 0;

  function zone(e) {
    const t = e.target;
    if (t.closest && t.closest("#jump")) return "jump";
    if (t.closest && t.closest("#dive")) return "dive";
    if (t.closest && t.closest("#grab")) return "grab";
    if (t.closest && t.closest("#pause, #mute")) return "ui";
    if (t.closest && t.closest("button, a")) return "ui";
    const w = window.innerWidth || 1;
    if (e.pointerType === "mouse") return "look";
    if (e.clientX < w * 0.46) return "move";
    return "look";
  }

  function onDown(e) {
    if (e.target.closest && e.target.closest("#title, #result")) return;
    const kind = zone(e);
    if (kind === "ui") return;
    e.preventDefault();
    try { root.setPointerCapture?.(e.pointerId); } catch (err) { /* synthetic pointers have no capture */ }
    pointers.set(e.pointerId, { kind, x: e.clientX, y: e.clientY, ox: e.clientX, oy: e.clientY });
    if (kind === "jump") {
      jumpEdge = true;
      jumpHeld = true;
    }
    if (kind === "dive") diveEdge = true;
    if (kind === "grab") grabEdge = true;
    if (kind === "move") {
      stick.style.left = e.clientX + "px";
      stick.style.top = e.clientY + "px";
      stick.style.bottom = "auto";
      stick.classList.add("float");
      placeStick(e.clientX, e.clientY, e.clientX, e.clientY);
    }
  }

  function onMove(e) {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    e.preventDefault();
    if (p.kind === "look") {
      lookDx += e.clientX - p.x;
      lookDy += e.clientY - p.y;
      looking = true;
    }
    if (p.kind === "move") placeStick(p.ox, p.oy, e.clientX, e.clientY);
    p.x = e.clientX;
    p.y = e.clientY;
    const hands = [...pointers.values()];
    if (hands.length >= 2) {
      const d = Math.hypot(hands[0].x - hands[1].x, hands[0].y - hands[1].y);
      if (pinchDist > 8) {
        zoom = Math.min(12 / 8.6, Math.max(5 / 8.6, zoom * (d / pinchDist)));
        try { localStorage.setItem(ZOOM_KEY, String(zoom)); } catch (err) { /* ignore */ }
      }
      pinchDist = d;
      lookDx = 0;
      lookDy = 0;
    } else pinchDist = 0;
  }

  function onUp(e) {
    const p = pointers.get(e.pointerId);
    pointers.delete(e.pointerId);
    if (p && p.kind === "move") {
      const still = [...pointers.values()].some((q) => q.kind === "move");
      if (!still) {
        stickX = 0;
        stickY = 0;
        knob.style.setProperty("--kx", "0px");
        knob.style.setProperty("--ky", "0px");
        stick.classList.remove("float");
      }
    }
    if (p && p.kind === "look" && ![...pointers.values()].some((q) => q.kind === "look")) looking = false;
    if (p && p.kind === "jump" && ![...pointers.values()].some((q) => q.kind === "jump")) jumpHeld = false;
  }

  function placeStick(ox, oy, x, y) {
    let dx = x - ox;
    let dy = y - oy;
    const mag = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(mag, radius);
    dx = (dx / mag) * clamped;
    dy = (dy / mag) * clamped;
    stickX = dx / radius;
    stickY = -dy / radius;
    knob.style.setProperty("--kx", dx + "px");
    knob.style.setProperty("--ky", dy + "px");
  }

  root.addEventListener("pointerdown", onDown);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerup", onUp);
  root.addEventListener("pointercancel", onUp);

  window.addEventListener("keydown", (e) => {
    const map = { KeyW: 1, KeyA: 1, KeyS: 1, KeyD: 1, ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, Space: 1, ShiftLeft: 1, ShiftRight: 1, KeyE: 1, Escape: 1 };
    if (map[e.code]) e.preventDefault();
    if (e.repeat) return;
    keys.add(e.code);
    if (e.code === "Space") {
      jumpEdge = true;
      jumpHeld = true;
    }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") diveEdge = true;
    if (e.code === "KeyE") grabEdge = true;
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.code);
    if (e.code === "Space") jumpHeld = false;
  });
  window.addEventListener("blur", () => keys.clear());

  function read() {
    let kx = 0;
    let ky = 0;
    if (keys.has("KeyA") || keys.has("ArrowLeft")) kx -= 1;
    if (keys.has("KeyD") || keys.has("ArrowRight")) kx += 1;
    if (keys.has("KeyW") || keys.has("ArrowUp")) ky += 1;
    if (keys.has("KeyS") || keys.has("ArrowDown")) ky -= 1;
    let x = stickX + kx;
    let y = stickY + ky;
    const mag = Math.hypot(x, y);
    if (mag > 1) {
      x /= mag;
      y /= mag;
    }
    const sens = pointers.size && [...pointers.values()].some((p) => p.kind === "look" && pointers.values()) ? 1 : 1;
    const out = {
      stickX: x,
      stickY: y,
      lookDx: lookDx * (keys.size ? 1 : sens),
      lookDy: lookDy,
      looking,
      mouse: [...pointers.values()].some((p) => p.kind === "look"),
      jump: jumpEdge,
      holdJump: jumpHeld || keys.has("Space"),
      dive: diveEdge,
      grab: grabEdge,
      pause: keys.has("Escape"),
      zoom,
    };
    lookDx = 0;
    lookDy = 0;
    jumpEdge = false;
    diveEdge = false;
    grabEdge = false;
    return out;
  }

  return { read };
}
