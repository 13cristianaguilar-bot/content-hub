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

## Not used, on purpose

- Quaternius and KayKit packs are also CC0, but their downloads from this environment only resolved to a Google Drive folder or an account wall. Kenney's packs already covered trees, bushes, flowers, rocks, grass, fences, the mushroom, platforms, a saw, and a button.
- A photographic Poly Haven sky was skipped. A photo HDR fought the toon look, so the sky stays painted, with a soft sun disc in the shader.
- A full-screen bloom pass dropped the 390×844 view well below the previous frame rate, so coins use a small additive glow instead, plus a rim light on the meadow materials.
