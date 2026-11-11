# Signal Marketing Command Center

The board is `index.html`. It is a static page. Attract, Convert, and Transform stay the triangle. Goals, Projects, Tasks, and Winning are the spine. Tracks and Funnels hang off that spine.

## What is public

`targets.json` holds targets, the track list, and goal targets. It does not hold results.

`today.sample.json` is layout data. Open it with `?sample=1`. Every figure on that view is sample data. It is the only local file the page fetches for a feed.

`today.json` in this folder is a stub. It has no clients, no payments, and no calendar. The page does not read it.

## What is private

The live feed is one row in Supabase project `udkbnlpnfyjuwlstfxhr`:

| | |
|---|---|
| Table | `public.cc_feed` |
| Key | `id = today` |
| Body | `payload` jsonb, same shape as the feed in `SCHEMA.md` |
| Stamp | `updated_at` |

Row level security lets an owner select that row. Owner means `app_metadata.role = admin`, the same check as `cc_kpi_log`. anon has no grant. There is no client insert, update, or delete policy. The ingest job writes with the service role.

The migration is `migrations/2026-11-11_cc_feed.sql`. It is not applied until Cristian runs it in the SQL editor.

Signed out, the board is a lock and a sign-in button. `?sample=1` still opens the sample. Signed in, the page reads `cc_feed` and does not fall back to a file. A missing table says **Not set up yet**. An empty table says **No private feed yet**.

The floor log is still `public.cc_kpi_log`. The board is the only writer, and only for that log. Nothing on the page sends mail, stamps a script, or charges a card.

## Spine

Goals are rings. The target is in `targets.json`. The current value is in the feed under `spine.goals`. Projects sit under goals. Tasks sit under projects. Each one has a status, an owner (Cristian or a bot desk), a triangle side, and a track.

Winning is the streak, XP, and wins feed. Those are computed from the floor log and from cash in the feed. The page does not invent a streak.

Tracks are the `tracks` array in `targets.json`. Each card has a sparkline and an owner bot when `spine.trackPulse` has a reading. No reading says **Not connected**.

Funnels are `spine.funnels`: name, type, status, link, conversions. A missing conversion stays **Not connected**.

Seed tracks: Instagram, YouTube (@SignalRatio), X, Podcast (STNR), Events & Travel, Speaking on stages, Retainer clients, Lead magnets & funnels. Events & Travel is the bot that asks for flights, hotels, and events to be sponsored so Cristian can network and film. The page does not book them.
