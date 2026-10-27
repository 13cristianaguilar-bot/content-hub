-- Optional locked-format picks on the existing pipeline_audit.humanQa object.
--
-- No new column. The Hub writes humanQa.formats as a list of format ids
-- from the admin brain check (Jan and Devin locked formats). The list is
-- a soft guide. Needs Review and Approved stay blocked on the four checks
-- and the why-send note, not on whether a format was picked.
--
--   humanQa.formats: ['reaction', 'lists']
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.

comment on column public.scripts.pipeline_audit is
  'Admin-only production audit plus humanQa (Cristian brain check: who, when, checklist, notes, scriptHash, filmStartAt, filmEndAt, formats). formats is an optional list of locked-format ids. The Hub blocks Needs Review / Approved until the checklist and note are current. Clients never see this. Null means the checks were not recorded.';

notify pgrst, 'reload schema';
