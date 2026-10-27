-- Human QA / Cristian brain check on the existing pipeline_audit jsonb.
--
-- No new column. The Hub writes pipeline_audit.humanQa when an admin
-- ticks the delivery checklist and saves "why this is good to send".
-- Clients still cannot rewrite pipeline_audit (scripts_keep_pipeline_audit).
--
-- Shape:
--
--   humanQa: {
--     version: 1,
--     complete: true,
--     checks: {
--       readFull: true,
--       notVerbatim: true,
--       thesisFilter: true,
--       shareable: true
--     },
--     notes: 'Why this is good to send',
--     by: 'Cristian Aguilar',
--     at: '2026-10-27T12:00:00.000Z'
--   }
--
-- The Hub blocks admin moves to Needs Review or Approved until complete
-- is true and the four checks plus notes are present.
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.

comment on column public.scripts.pipeline_audit is
  'Admin-only production audit (offer, keywords, refs, format DNA, spoken length, gates, ready) plus humanQa (Cristian brain check: who, when, checklist, notes). The Hub shows Audit before Film prep and blocks Needs Review / Approved until humanQa is complete. Clients never see that step. Null means the checks were not recorded.';

notify pgrst, 'reload schema';
