# Integrating the UI kit into demos/space-buddies

## 1. Copy files
Copy `fonts/`, `svg/`, `ui.css` and `sb-ui.js` into `demos/space-buddies/assets/ui/`, then in
`index.html` `<head>`:

```html
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<link rel="preload" href="assets/ui/fonts/LilitaOne-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/ui/ui.css">
<script src="assets/ui/sb-ui.js" defer></script>
```
`viewport-fit=cover` is required, otherwise `env(safe-area-inset-*)` is 0 on iPhone.
Paths inside `ui.css` are relative to the CSS file (`svg/...`, `fonts/...`), so keep the folder intact.
Add `class="sb-ui"` to `#app`. Call `SBUI.bindPress()` once after load.

## 2. Map existing elements to kit classes

| Existing element | Add class / markup |
|---|---|
| `#hud` | `sb-hud`; wrap its top row in `<div class="sb-hud__top">` with `sb-hud__left` / `sb-hud__right` |
| `#timer.pill` | `sb-pill sb-pill--timer` + `<img src="assets/ui/svg/icon_clock.svg">` first child. Add `is-low` under 0:15 |
| `.track` / `#progress` | `sb-track`; set `style="--p:62%"` instead of width |
| `#place.pill` | replace with `<div class="sb-rank"><b id="place">1ST</b></div>` |
| `.seatbox` / `#seats` | `sb-panel sb-seats`; `#seats` gets `sb-seats__row`, children `<img src=".../seat_filled_<color>.svg">` or `seat_empty.svg`; add `is-new` to the seat just filled; `#seats-label` gets `sb-seats__label`; add `is-last` on the panel at 7/8 |
| `#coins.pill` | `sb-pill` + `icon_coin.svg`; update with `SBUI.countUp(el, n)` |
| `#mute`, `#pause` | `sb-btn sb-btn--secondary sb-btn--round` with `icon_mute.svg` / `icon_unmute.svg` / `icon_pause.svg` inside, wrapper `sb-hud__tools` |
| `#last-banner` | `<img class="sb-banner" src=".../banner_last_seat.svg">` and `SBUI.slam(el)` |
| `#controls` | `sb-controls`; `#stick` gets `sb-stick` (+ `is-active` while touched); `#knob` gets `sb-stick__knob` and set `--kx/--ky` in px instead of `transform` |
| `#jump`, `#dive`, `#grab` | `sb-action sb-action--jump` etc. Remove the text (keep `aria-label`). Add `data-haptic="medium"` to jump |
| `#countdown #count-num` | `sb-countdown`; re-add the class each second to replay |
| `#play`, `#start`, `#again`, `#next-planet`, `#land` | `sb-btn sb-btn--primary sb-btn--lg sb-btn--block` |
| `#menu`, `#pause-menu-btn`, `#restart` | `sb-btn sb-btn--secondary sb-btn--block` |
| `#resume` | `sb-btn sb-btn--success sb-btn--block` |
| `.card` | `sb-panel sb-card sb-stagger` (children get `style="--i:0..n"`) |
| `.kicker` | `sb-kicker` |
| `#round-title` banner | `banner_round_blank.svg` as background with live text in `.sb-outline-text`, or swap to `banner_round.svg`; `SBUI.slam()` |
| result titles | `banner_qualified.svg` (mint), `banner_eliminated.svg` (coral), `banner_escaped.svg` (gold) + `SBUI.confetti(50)` and `SBUI.haptic("success")` on qualify/escape, `"fail"` on eliminated |
| `.planet-map .planet-dot` | `<img src="map_node_cleared|current|locked.svg">` joined by `map_path_dots.svg`; container `sb-map` |
| screen transitions | `SBUI.wipe(() => { hide(a); show(b); })` |

## 3. Safe areas
`ui.css` defines `--sb-safe-t/b/l/r` as `max(12px, env(safe-area-inset-*))`. The HUD top row,
controls and screens already use them. For anything custom, position with those variables, never
with fixed px from the edge. Landscape is handled the same way through left/right insets.

## 4. Haptics
`SBUI.haptic(kind)` uses `navigator.vibrate` where it exists (Android Chrome). iOS Safari has no
vibrate API; on iOS 18 and newer the helper toggles a hidden `<input type="checkbox" switch>`,
which plays the system tick. That only works inside a user-gesture handler (tap / pointerdown),
so haptics on game events with no tap (getting hit by a hammer) will be silent on iPhone. Suggested
mapping: buttons `light`, jump `medium`, banner slam / big hit `heavy`, seat or qualify `success`,
eliminated `fail`. Offer a settings toggle via `SBUI.setHapticsMuted(true)`.

## 5. Performance notes
- SVGs total about 365 KB uncompressed (about 37 KB gzipped); for production, run them through `svgo` and
  optionally rasterize the HUD set to 2x PNG/WebP sprites if the DOM count matters.
- Avoid animating `box-shadow`; the kit animates `transform` and `opacity` only (button shadows switch instantly on press).
- Rebuild assets: `python3 src/build_svgs.py`; re-render previews: `bash src/render.sh`.
