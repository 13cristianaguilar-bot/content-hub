/* Space Buddies UI kit v1 - sb-ui.js (no dependencies, ~2 KB)
   SBUI.haptic(kind)      kind: "light" | "medium" | "heavy" | "success" | "fail"
   SBUI.countUp(el, to, ms)
   SBUI.slam(el)          banner slam + screen shake + heavy haptic
   SBUI.wipe(midFn)       iris close, run midFn (swap screens), iris open
   SBUI.confetti(n)       burst of sprite-sheet confetti
   SBUI.bindPress(root)   adds .is-pressed + haptic to [data-haptic] elements on pointerdown */
(function () {
  var patterns = { light: 8, medium: 16, heavy: [24, 30, 24], success: [12, 40, 12, 40, 30], fail: [40, 60, 40] };
  // iOS Safari has no navigator.vibrate. iOS 18+ plays a system tick when a <input switch> toggles
  // from a user gesture, so we keep a hidden one and click its label. Only works inside a tap handler.
  var iosLabel = null;
  function iosTick() {
    if (!iosLabel) {
      var id = "sb-haptic-switch";
      var input = document.createElement("input");
      input.type = "checkbox"; input.id = id; input.setAttribute("switch", "");
      iosLabel = document.createElement("label"); iosLabel.htmlFor = id;
      [input, iosLabel].forEach(function (n) { n.style.cssText = "position:fixed;left:-99px;top:0;width:1px;height:1px;opacity:0;pointer-events:none"; document.body.appendChild(n); });
    }
    iosLabel.click();
  }
  var muted = false;
  function haptic(kind) {
    if (muted) return;
    var p = patterns[kind] || patterns.light;
    if (navigator.vibrate) { navigator.vibrate(p); return; }
    try { iosTick(); if (kind === "heavy" || kind === "success" || kind === "fail") setTimeout(iosTick, 70); } catch (e) {}
  }
  function countUp(el, to, ms) {
    var from = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0, t0 = performance.now(), last = from;
    ms = ms || 800;
    (function step(t) {
      var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3), v = Math.round(from + (to - from) * e);
      if (v !== last) { el.textContent = v; el.classList.remove("is-tick"); void el.offsetWidth; el.classList.add("is-tick"); last = v; }
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  function slam(el) {
    el.hidden = false; el.classList.remove("is-in"); void el.offsetWidth; el.classList.add("is-in");
    setTimeout(function () { var r = document.getElementById("app") || document.body; r.classList.remove("sb-shake"); void r.offsetWidth; r.classList.add("sb-shake"); haptic("heavy"); }, 280);
  }
  function wipe(midFn) {
    var w = document.querySelector(".sb-wipe");
    if (!w) { w = document.createElement("div"); w.className = "sb-wipe"; document.body.appendChild(w); }
    w.className = "sb-wipe is-closing";
    setTimeout(function () { if (midFn) midFn(); setTimeout(function () { w.className = "sb-wipe is-opening"; }, 80); }, 380);
  }
  function confetti(n) {
    n = n || 40;
    for (var i = 0; i < n; i++) {
      var c = document.createElement("i");
      c.className = "sb-confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.setProperty("--row", (Math.random() * 8) | 0);
      c.style.setProperty("--dx", (Math.random() * 40 - 20) + "vw");
      c.style.setProperty("--rot", (Math.random() * 1080 - 540) + "deg");
      c.style.setProperty("--t", (1.8 + Math.random() * 1.4) + "s");
      c.style.animationDelay = (Math.random() * 0.35) + "s, 0s";
      var done = function (e) {
        if (e.animationName !== "sb-confetti-fall") return;
        c.removeEventListener("animationend", done);
        c.remove();
      };
      c.addEventListener("animationend", done);
      document.body.appendChild(c);
    }
  }
  function bindPress(root) {
    (root || document).addEventListener("pointerdown", function (e) {
      var b = e.target.closest("[data-haptic], .sb-btn, .sb-action");
      if (!b) return;
      b.classList.add("is-pressed");
      haptic(b.getAttribute("data-haptic") || "light");
      var up = function () { b.classList.remove("is-pressed"); };
      window.addEventListener("pointerup", up, { once: true });
      window.addEventListener("pointercancel", up, { once: true });
    }, { passive: true });
  }
  window.SBUI = { haptic: haptic, countUp: countUp, slam: slam, wipe: wipe, confetti: confetti, bindPress: bindPress, setHapticsMuted: function (m) { muted = !!m; } };
})();
