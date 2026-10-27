-- Full-screen film Human QA + admin script edit history.
--
-- No new scripts column. Film start/end timestamps and a spoken-line
-- hash live on the existing pipeline_audit.humanQa object:
--
--   humanQa.scriptHash   -- hook + full_script + cta at last stamp
--   humanQa.filmStartAt  -- when Cristian signed the Full screen start check
--   humanQa.filmEndAt    -- when he signed the Full screen end check
--
-- The Hub re-requires the stamp when those spoken fields change.
-- Clients still cannot rewrite pipeline_audit.
--
-- Also lets an admin insert script_edits rows for any client they
-- can already update. Client insert rules stay the same.
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.

comment on column public.scripts.pipeline_audit is
  'Admin-only production audit plus humanQa (Cristian brain check: who, when, checklist, notes, scriptHash, filmStartAt, filmEndAt). The Hub shows the brain check on Admin Audit and on Full screen at start and end. Spoken-line edits stale the stamp. Clients never see it.';

drop policy if exists "script_edits_insert_admin" on public.script_edits;
create policy "script_edits_insert_admin"
  on public.script_edits
  for insert
  to authenticated
  with check (
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and exists (
      select 1 from public.scripts s
      where s.id = script_id
        and s.client_slug = client
    )
  );

notify pgrst, 'reload schema';
