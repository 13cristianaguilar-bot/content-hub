-- Fix: scripts table currently has NO real client isolation.
--
-- Today's policies (signed_in_can_read / signed_in_can_update / signed_in_can_insert) all use
-- `using (true)` -- meaning ANY signed-in user, client or admin, can read, update, or insert
-- ANY row regardless of client_slug. Andrew could see and edit Jan's scripts, and vice versa.
-- The only thing that currently prevents this in practice is the app's own client-side
-- `.eq('client_slug', mySlug)` filter -- which is not a security boundary, since anyone signed
-- in can call the Supabase REST API directly and skip the app entirely.
--
-- This migration locks it down using app_metadata (NOT user_metadata) for the role/client_slug
-- check. That distinction matters: user_metadata is something a signed-in user can edit on
-- themselves via supabase.auth.updateUser({data: {...}}) -- checking it in a policy would let a
-- client grant themselves admin, or claim another client's slug, from the browser console.
-- app_metadata can only be set by an admin/service-role, so it's safe to trust inside a policy.
--
-- PREREQUISITE (already done for the 3 existing users as of 2026-10-22): role/client_slug must
-- exist in each user's app_metadata, not just user_metadata. For any NEW client/admin account
-- created after this point, set it via the Supabase Admin API or SQL, e.g.:
--
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'client', 'client_slug', 'newclient')
--   where email = 'newclient@example.com';
--
-- Run this entire file in: Supabase -> SQL Editor -> New query -> Paste -> Run

drop policy if exists "signed_in_can_read" on public.scripts;
drop policy if exists "signed_in_can_update" on public.scripts;
drop policy if exists "signed_in_can_insert" on public.scripts;

create policy "admin_or_own_client_can_read" on public.scripts
  for select to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or client_slug = (auth.jwt() -> 'app_metadata' ->> 'client_slug')
  );

create policy "admin_or_own_client_can_update" on public.scripts
  for update to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or client_slug = (auth.jwt() -> 'app_metadata' ->> 'client_slug')
  )
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or client_slug = (auth.jwt() -> 'app_metadata' ->> 'client_slug')
  );

create policy "admin_only_insert" on public.scripts
  for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- No delete policy -- stays default-deny, same as before this migration.

-- ─────────────────────────────────────────────
-- VERIFY (run after the above, should show the 3 new policy names, nothing from before)
-- ─────────────────────────────────────────────
-- select policyname, cmd, roles from pg_policies where tablename = 'scripts';
