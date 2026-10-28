-- Optional hosted file for the in-Hub reference player.
--
-- Adds public.scripts.reference_video_url (text). The Hub plays this in the
-- compact Read / Reference player when it is a direct audio or video URL.
-- Instagram watch links stay in reference_clip. They are not embedded.
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.
--
-- The player also reads a file that is already on the row:
--   pipeline_audit.media_lock.media_path  (https URL, or a storage path)
--   pipeline_audit.media_lock.bucket      (required only for a relative path)
--   pipeline_audit.media_lock.audio_path  (audio-only brain check)
--   thumbnail_url                         (poster, unless the value is itself a media file)
--
-- Example:
--
--   update public.scripts
--   set reference_video_url = 'https://EXAMPLE.supabase.co/storage/v1/object/public/reference-media/devin/reel.mp4'
--   where id = 'PASTE-SCRIPT-UUID';
--
-- Leave the column null when the only copy of the reel is on Instagram.
-- The stamp then keeps the poster and Open on Instagram. Nothing is sent.

alter table public.scripts
  add column if not exists reference_video_url text;

comment on column public.scripts.reference_video_url is
  'Optional hosted audio/video for the in-Hub reference player. Instagram watch URLs stay on reference_clip. Null means there is no file yet.';

notify pgrst, 'reload schema';
