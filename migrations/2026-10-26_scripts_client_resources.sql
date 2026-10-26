-- Optional per-script delivery reminders for the Full-screen Resources pane.
--
-- The Hub already builds that pane from existing fields (filming_direction
-- Format, editor_notes / tonality labels, pipeline_audit.offer + dna for
-- admins, CLIENTS[slug].resources if present). This column is only needed
-- when Ops wants a dedicated thesis / do-not-say / Format DNA blob that is
-- not already on those fields.
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.
-- The UI degrades gracefully if this column is missing (select * just
-- omits it; the pane still lists whatever the other fields already hold).
--
-- Shapes the Hub accepts:
--   text markdown
--   {"thesis":"...","formats":"...","do_not_say":"...","format_dna":"..."}
--   [{"label":"Do not say","text":"..."}]
--   [{"id":"thesis","title":"...","body_md":"...","image":"...","image_hub":"...","admin_only":true,"order":1}]
--
-- Jan / Rich Life Academy cards also ship as a static pack
-- (assets/client-resources/jan-rla/). Hub shows them for client_slug jan
-- without writing this column. Per-script JSON overrides or adds cards.
--
-- Example:
--
--   update public.scripts
--   set client_resources = jsonb_build_object(
--     'thesis', 'Content system for founders — research, scripts, publishing rhythm.',
--     'formats', 'Talking-head list. Keep the reference hook shape.',
--     'do_not_say', 'No invented revenue. No “I will change your life.”',
--     'format_dna', 'Hook lock: first line keeps the reference shape. Body shift: only the buyer changes.'
--   )
--   where id = '00000000-0000-0000-0000-000000000000';

alter table public.scripts
  add column if not exists client_resources jsonb;

comment on column public.scripts.client_resources is
  'Optional delivery reminders (thesis, locked formats, do-not-say, Format DNA). Shown on the Full-screen Resources pane. Null means use the other columns already on the row.';
