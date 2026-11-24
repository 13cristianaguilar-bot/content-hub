# Asset credits

Course contact shading is baked in the game from the floor vertices and nearby blockers. It is not a downloaded lightmap. The sun is one real-time shadow-mapped directional light plus a hemisphere fill. No extra art file was added for that pass.


Space Buddy and escape ship models generated with Tencent HY 3D (AI-generated). The sweeper, bumper, pendulum hammer, crumble tile, and jump pad are original models in `assets/models/`, with vertex colors and baked clips. Gameplay still uses the existing hit volumes and telegraph rings. The playable Buddy is `assets/space_buddy_lowpoly.glb`: one skinned mesh, 2,924 triangles, 10 bones, and clips idle, run, jump, dive, tumble, and celebrate. Root translation on jump, dive, and tumble is zeroed so the sim owns the motion. Suit colors still come from the player tint. The escape ship is `assets/escape_ship_rocket.glb`, an original candy rocket (cream hull, coral nose, Sunshine band) with idle and launch clips. The star coin is `assets/models/collectible_star_coin.glb`. Both were modeled for this project, with vertex colors and no third-party textures.

Race music, menu bed, and sound effects in `assets/audio/` are procedural cues dedicated to the public domain under CC0 1.0. `sfx_checkpoint` is the checkpoint chime. `sfx_timer_warning`, `sfx_timer_warning_final`, `ui_pause_open`, and `ui_pause_close` are original procedural cues in the same public-domain set. Where a `_v2` file exists, the game plays that one. `music_race_loop` is the race loop (OGG, MP3, and M4A). Playback uses Howler.js 2.2.4 (MIT). The older placeholder names that were already in the folder were left in place.

UI display type is Lilita One by Juan Montoreano, and body type is Fredoka by the Indian Type Foundry. Both are used under the SIL Open Font License 1.1. The license texts are `ui/fonts/LilitaOne-OFL.txt` and `ui/fonts/Fredoka-OFL.txt`.

# Meadow asset credits

Every file added for the meadow pass is CC0 1.0 Universal. No account and no paid pack was used. Other zones still use the project's existing models.

License text: https://creativecommons.org/publicdomain/zero/1.0/

The GLBs in `assets/meadow/` were converted from the authors' FBX exports with assimp, then run through glTF Transform 4.1.1 `optimize` (prune, dedupe, weld, quantize). There were no textures to resize. Meshopt and Draco were skipped so the game does not need an extra decoder. Materials are recolored at runtime to one saturated toon palette.

## Kenney — Nature Kit

- Source: https://kenney.nl/assets/nature-kit
- License: CC0 1.0
- Author: Kenney (www.kenney.nl)
- Used models: `tree_default`, `tree_fat`, `tree_cone`, `plant_bush`, `plant_bushLarge`, `plant_bushSmall`, `flower_redA`, `flower_yellowA`, `flower_purpleA`, `grass`, `grass_large`, `rock_smallA`, `rock_largeA`, `mushroom_red`, `mushroom_redTall`, `fence_simple`, `platform_grass`, `log`
- Shipped as: `tree.glb`, `tree_fat.glb`, `tree_pine.glb`, `bush.glb`, `bush_large.glb`, `bush_small.glb`, `flower_red.glb`, `flower_yellow.glb`, `flower_purple.glb`, `grass.glb`, `grass_large.glb`, `rock_small.glb`, `rock_large.glb`, `mushroom.glb`, `mushroom_tall.glb`, `fence.glb`, `platform.glb`, `log.glb`

## Kenney — Platformer Kit

- Source: https://kenney.nl/assets/platformer-kit
- License: CC0 1.0
- Author: Kenney (www.kenney.nl)
- Used models: `saw` (meadow sweeper and spinner), `buttonRound` (meadow bounce pads), `doorClosed` (a decorative ruin on the plaza rim, not a gameplay door), `fenceBroken`
- Shipped as: `saw.glb`, `button.glb`, `door.glb`, `fence_broken.glb`

## Kenney — Nature Kit cliffs, and Pirate Kit rock formations

- Sources: https://kenney.nl/assets/nature-kit and https://kenney.nl/assets/pirate-kit
- License: CC0 1.0
- Author: Kenney (www.kenney.nl)
- Used for meadow and canyon rims and the far hills: `cliff_rock`, `cliff_large_rock`, `cliff_top_rock`, `formation_rock`, `formationLarge_rock`
- Shipped as: `assets/kenney/cliff.glb`, `cliff_large.glb`, `cliff_top.glb`, `formation.glb`, `formation_large.glb`

## Kenney — Platformer Kit, canyon pieces

- Source: https://kenney.nl/assets/platformer-kit
- License: CC0 1.0
- Used for the canyon door wall, the side blocks, and the canyon see-saw plank: `doorOpen`, `block`, `blockLong`
- Shipped as: `assets/kenney/door_open.glb`, `block.glb`, `plank.glb`
- The canyon hammer is built from the Nature Kit log and large rock already credited above. Kenney's packs here do not include a hammer or a see-saw as a single model.

## Not used, on purpose

- Quaternius and KayKit packs are also CC0, but their downloads from this environment only resolved to a Google Drive folder or an account wall. Kenney's packs already covered trees, bushes, flowers, rocks, grass, fences, the mushroom, platforms, a saw, and a button.
- A photographic Poly Haven sky was skipped. A photo HDR fought the toon look, so the sky stays painted, with a soft sun disc in the shader.
- A full-screen bloom pass dropped the 390×844 view well below the previous frame rate, so coins use a small additive glow instead, plus a rim light on the meadow materials.
