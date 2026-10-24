-- Admin workspace.
--
-- Cristian's admin account had no app_metadata.client_slug. The app then
-- treated a missing slug as Andrew. This links that admin account to the
-- cristian scripts he already has, and lets an admin log edits only for
-- their own slug. They still cannot write another client's script_edits.
-- Clients are unchanged: they insert only their own slug.
-- Safe to run more than once.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('client_slug', 'cristian')
where email = '13cristianaguilar@gmail.com'
  and coalesce(raw_app_meta_data->>'role', '') = 'admin'
  and coalesce(raw_app_meta_data->>'client_slug', '') = '';

drop policy if exists "script_edits_insert_own" on public.script_edits;
create policy "script_edits_insert_own"
  on public.script_edits
  for insert
  to authenticated
  with check (
    client = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
    and coalesce((select auth.jwt() -> 'app_metadata' ->> 'client_slug'), '') <> ''
    and exists (
      select 1 from public.scripts s
      where s.id = script_id
        and s.client_slug = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
    )
  );

notify pgrst, 'reload schema';
