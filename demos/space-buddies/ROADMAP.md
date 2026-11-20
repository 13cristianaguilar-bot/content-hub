# Space Buddies roadmap

Each phase is its own pull request and stays playable if merged on its own. Later phases branch from the latest main after the previous phase is merged.

- [x] Phase 1. Playtest fixes: pads and glide, ground safety net, smoother controls, grab, physical hits, sound, and a round-to-planet cycle.
- [x] Phase 2. Visuals in every zone: CC0 models for sky, ice, and the climb. Warmer canyon, real mesas and arches, a closed cliff ring, and a cheap glow.
- [x] Phase 3. Hero characters: a richer Buddy with squash-and-stretch and grab/tumble poses, saved hats and colors, and a clearer escape ship. AI-generated GLBs can replace the hero later.
- [x] Phase 4. UI and juice: chunky UI, round splashes, qualify and eliminated banners, confetti, shake, title, and a planet map.
- [x] Art pass 2. Candy floors with a dark rim and stripes, toy trim along every route, animated lava, a cloud sea under the sky islands, a closer camera, and an outline on the player.
- [x] Phase 5. Content: a storm planet with a survival round and a crown round, on top of the meadow and sky planets. Tail and team rounds are still open.
- [x] Phase 6. Online and app: a service-worker cache of the shell, a local run list, and a Supabase post when `window.SPACE_BUDDIES_SUPABASE` is set. The pixel ratio stays capped and toy motion updates every other frame.
- [x] Phase 7 graphics. Toy-plastic shading, contact darkening, optional bloom, particles, liquid, and Buddy squash. Merged.
- [ ] Phase 7 UI. The kit in `ui/` drives the HUD, controls, locker, planet map, and podium. Thicker floor slabs are the next PR.
