# Space Buddies Style Guide v1 (locked)

One look for the 3D world and the UI: **glossy toy plastic**. Every object should read like a
candy-colored vinyl toy under a sunny sky: rounded, chunky, outlined in ink, with a bright gloss
on top and a soft shadow underneath. This guide extends `ART_BIBLE.md` (palette roles, shape
language, Buddy proportions stay as written there) and overrides it where they differ.

## 1. Core palette

| Token | Hex | Use |
|---|---|---|
| Visor Ink | `#1E2440` | All outlines, text on light, extrusions, eyes |
| Cream | `#FFF6E5` | Panels, pills, cards |
| Cream Dark | `#F2DDB8` | Panel side/extrusion |
| White | `#FFFFFF` | Gloss, button labels (with ink outline) |

Each candy color has 4 steps: **Light** (gloss-side gradient start), **Base** (face), **Dark**
(side extrusion, bottom of gradient), **Deep** (lip line, 3D shadow ramp step).

| Role | Name | Light | Base | Dark | Deep |
|---|---|---|---|---|---|
| Primary (PLAY, JUMP, gold, coins, timer) | Sunshine | `#FFEE99` | `#FFD23F` | `#F5A623` | `#C97A12` |
| Secondary (menus, HUD round buttons) | Sky | `#A6E4FF` | `#5CC8FF` | `#2E9BE0` | `#1F6FB0` |
| Success / Qualified / hero Buddy | Mint | `#A8F5D6` | `#5FE3B0` | `#2FB585` | `#1E8A64` |
| Danger / Eliminated / DIVE / CTA accent | Coral | `#FFA8A0` | `#FF6B6B` | `#E04848` | `#B03238` |
| Special (round splash, GRAB, locker) | Grape | `#C2B0FF` | `#8C6BFF` | `#6646E0` | `#46309E` |
| Accent | Bubblegum | `#FFC6E8` | `#FF8FD1` | `#E85FB0` | `#B83E86` |
| Dark UI, empty seats | Seat Navy | `#4A5894` | `#2E3A6B` | `#222B52` | `#161C38` |
| Locked / disabled | Rock Lilac | `#DCD0EE` | `#B9A3D9` | `#9781BD` | `#6F5C93` |
| 2nd place | Moon Silver | `#F4F7FF` | `#CFD8F0` | `#9AA6CC` | `#6E7AA3` |
| 3rd place | Bronze | `#FFC9A0` | `#FF9A5C` | `#E0703A` | `#B0502A` |
| Hazard only | Lava Orange | `#FFB070` | `#FF7A1A` | `#E05A00` | `#A83E00` |
| Hazard only | Void Grape | | `#2B1B4D` | | |

Rules: hazards always carry Lava Orange or Void Grape ("orange and purple hurt"). Safe things
(pads, ship, seats, checkpoints) lean Mint, Cream and Sunshine. No pure black, no pure grey:
neutrals are Ink, Navy, Lilac or Cream. Max 3 candy colors per screen region.

## 2. Zone palettes (3D world)

Each zone: ground top / ground side / path / accent prop / hazard / sky top / sky horizon / fog.

| Zone | Ground top | Ground side | Path | Accent prop | Hazard | Sky top | Horizon | Fog |
|---|---|---|---|---|---|---|---|---|
| Meadow | `#7FD88A` | `#4FAE62` | `#FFE8C2` | `#FF8FD1` | `#FF7A1A` | `#5CC8FF` | `#B8F0FF` | `#CFF4FF` |
| Canyon | `#FFB877` | `#E07A4A` | `#FFE0B0` | `#5FE3B0` | `#FF5A1F` | `#FF9EC4` | `#FFE3B8` | `#FFD9C0` |
| Sky | `#FFFFFF` | `#C9D6FF` | `#FFD23F` | `#8C6BFF` | `#2B1B4D` | `#7A8CFF` | `#FFD6F2` | `#EADCFF` |
| Ice | `#E6F8FF` | `#8FD3F5` | `#FFFFFF` | `#C2B0FF` | `#3D6BFF` (cracked ice glow) | `#6FD0FF` | `#E8FBFF` | `#F2FCFF` |
| Climb | `#B9A3D9` | `#7E66A8` | `#FFD23F` | `#5FE3B0` | `#FF7A1A` | `#3A3F8F` | `#FF9ECF` | `#5A4C9E` |
| Storm (finale) | `#5B5F9E` | `#363A6E` | `#FFD23F` | `#5CC8FF` | `#FF7A1A` + `#2B1B4D` | `#2B1B4D` | `#8C6BFF` | `#4A3A7A` |

The escape ship (cream hull `#FFF6E5`, coral nose/fins `#FF6B6B`, sunshine band `#FFD23F`) is
the brightest object in every zone. Never tint it with zone fog (exclude from fog or give it
emissive 0.15).

## 3. Shape, outline, corners, shadow (UI)

- **Outline:** Visor Ink, 4 px at 1x CSS (5 px in the SVG source art, 6 px on banners and big
  panels). Icons: 4.5 px in a 64 px box. Text: ink stroke = 20% of font size. Never a lighter outline.
- **Extrusion (depth):** every interactive or framed element has a solid side below the face:
  buttons 8 to 10 px, pills 6 to 8 px, big panels 10 to 12 px. Side = color **Dark** with an ink
  rim. Pressed state sinks the face to 25% depth.
- **Gloss:** white band over the top 38 to 42% of the face, inset 9 to 12 px, gradient white
  75% to 5%. Plus one specular dot (white ellipse) near the top-left. Every glossy thing has both.
- **Face gradient:** Light at 0% to Base at 48%, Base until 86%, Dark at 100%.
- **Corner radii:** small 14 px (slots, chips), medium 22 px (tabs, cards inside cards), large 32 px
  (buttons, panels), pill 999 px (HUD pills), circles for round/action buttons. Inner radius =
  outer radius minus inset.
- **Shadow:** soft ink shadow below everything: offset y = depth + 6 to 10 px, blur 12 to 16 px,
  Ink at 28 to 32% opacity. Pressed: offset halves, opacity 22%.
- **Type:** display = **Lilita One** (all caps, +2% tracking, white fill with ink outline and a
  4 to 6 px ink drop). Body = **Fredoka** 500 to 700. Numbers use tabular figures. Minimum 14 px.
- **Touch:** min target 64 px (48 px only for the HUD mute/pause pair). JUMP 128 px, DIVE/GRAB 92 px.
- **Iconography:** filled white glyphs with ink outline for actions (pause, play, retry);
  colored object icons (coin, crown, trophy, star = Sunshine; hat = Coral; palette = Cream).

## 4. Motion rules

| Motion | Spec |
|---|---|
| Press squish | 90 ms ease-out to `translateY(depth-6) scale(0.96, 0.94)`; release 220 ms `cubic-bezier(.34,1.56,.64,1)` back to rest |
| Bounce-in | 420 ms, `cubic-bezier(.34,1.56,.64,1)`: 0.6 scale +24 px, to 1.08 at 60%, 0.97 at 80%, 1.0 |
| Stagger | 60 ms between siblings, max 6 items (cap total at 360 ms) |
| Banner slam | 520 ms `cubic-bezier(.17,.89,.32,1.28)`: scale 2.4 rot -6deg, to 0.9, 1.06, 1.0; screen shake 260 ms on land; haptic "heavy" |
| Count-up | numbers tick over 600 to 900 ms, ease-out; each tick scales 1.18 for 160 ms; last tick plays coin sound |
| Screen wipe | grape circle iris: close 380 ms ease-in, hold 80 ms, open 460 ms ease-out |
| Seat filled | seat icon pops 0 to 1.35 to 1 over 420 ms; LAST SEAT pulses 1.0 to 1.07 every 800 ms |
| Idle life | current map node floats 6 px over 2.4 s sine; glints sweep across PLAY every 4 s |
| Easing tokens | out `cubic-bezier(.22,1,.36,1)`, back `(.34,1.56,.64,1)`, slam `(.17,.89,.32,1.28)`, in `(.55,0,.75,.2)` |

Never linear except shakes. Nothing over 600 ms blocks input. Respect `prefers-reduced-motion`.

## 5. 3D materials (three.js)

The world must match the UI: chunky, rounded, ink-edged, glossy.

1. **Toon ramp, 3 steps.** `MeshToonMaterial` with a 3-texel `gradientMap`
   (`NearestFilter`): shadow 0.55, mid 0.82, lit 1.0. Shadow step is tinted, not grey: multiply
   shadow by the color's **Deep** step (or `#6F5C93` lilac for neutrals). Keep one hemisphere light
   (sky color / ground color of the zone) at 0.6 and one warm key directional at 1.0 to 1.2.
2. **Rim light.** Fresnel rim in `onBeforeCompile`: `rim = pow(1.0 - max(dot(N, V), 0.0), 2.5)`,
   color white at 0.35 strength (0.5 on Buddies, 0.2 on ground). It sells "plastic" more than
   anything else.
3. **Vertex gradient top to bottom.** Every prop and platform gets vertex colors: top = Light step,
   bottom = Dark step, lerped on local Y (bake in Blender or at load). Ground tiles: top face Ground
   top color, sides Ground side color. Multiply with the toon result.
4. **Bevel rims on platforms.** Every platform edge has a 0.06 to 0.1 m bevel (2 segments) and a
   lighter rim band: top 8 cm of the side in Light color or a Cream lip. No razor edges anywhere
   except hazard cracks.
5. **Gloss.** Specular via `MeshPhysicalMaterial` is too heavy for phones; fake it: a matcap
   highlight or a tight Blinn lobe (shininess 60 to 90) added on top of the toon ramp, white at 0.4.
   Hero objects (Buddies, ship, coins) get the strongest gloss.
6. **Ink outline.** Inverted-hull outline on Buddies, ship, obstacles and coins: backface
   mesh scaled along normals by 0.025 m (Buddy) to 0.05 m (big props), Ink `#1E2440`. Terrain gets no
   hull (too many triangles); use a post edge pass only if FPS allows.
7. **Shadows.** One blob shadow (soft radial ink at 30%) under every Buddy and moving prop. Static
   level shadows baked into vertex colors or a lightmap (Blender bake). Realtime shadow map only on
   desktop / high tier.
8. **Hazards emit.** Lava, cracks and void edges: emissive Lava Orange 0.6 to 1.0 with a scrolling
   noise; ignore fog.
9. **Fog and sky.** Fog = zone Fog color, start 40 m, end 140 m. Sky = vertical gradient Sky top to
   Horizon plus 2 to 3 stylized cloud cards and the ringed planet.
10. **Post.** Mild bloom only on emissives and gloss (threshold 0.85), ACES or AgX tone mapping with
   exposure 1.05, saturation +8%. Skip on low tier.

## 6. Do / do not

- Do keep every frame high-key and bright. Do outline everything interactive.
- Do not mix free-pack styles: re-material all Kenney models with the toon setup above.
- Do not use thin strokes, small text, gradients without an outline, or flat untextured grey.
- Do not use pure Lava Orange on players or friendly props.
