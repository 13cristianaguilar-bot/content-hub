-- Add public.scripts.thumbnail_url
--
-- Each shot card shows a cover or first frame of the reference reel.
-- This column stores that image URL when one has been resolved (YouTube
-- oEmbed thumbnail, or the og:image of an Instagram or TikTok reference).
--
-- The column is nullable on purpose. The app does not require it:
--   1. use thumbnail_url when it is set and the image loads
--   2. otherwise YouTube oEmbed / i.ytimg.com from the reference URL
--   3. otherwise Instagram or TikTok oEmbed thumbnail_url
--   4. otherwise the og:image of the reference URL
--   5. otherwise the existing waveform poster, so a card never breaks
--
-- Instagram and TikTok cover URLs are often signed and expire. When a
-- stored image fails to load, the app tries steps 2–4 again.
-- Browser fetches of oEmbed and og:image are frequently blocked by CORS,
-- so a filled column is what actually puts a frame on the card. Re-resolve
-- from this environment (not the browser) when covers go stale.
--
-- Row-level policies already on public.scripts cover the new column.
-- No policy changes. Do not put a service-role key in index.html.
--
-- Applied to project udkbnlpnfyjuwlstfxhr.

alter table public.scripts
  add column if not exists thumbnail_url text;

comment on column public.scripts.thumbnail_url is
  'Optional cover or first-frame image for reference_clip. The app falls back to oEmbed or og:image when this is null or the image fails.';
