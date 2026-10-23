-- Client requests and feedback.
--
-- Adds a new table. It does not alter scripts or any existing row.
-- Clients can insert and read only their own rows. An admin
-- (app_metadata.role = admin, never user_metadata) can read every row
-- and update status. There is no delete policy.
--
-- Apply this file in the Supabase SQL editor for project
-- udkbnlpnfyjuwlstfxhr. Safe to run more than once.
--
-- After it succeeds, the Requests page in Content Hub can save.
-- Until then the page explains that this migration still needs to run.

create table if not exists public.client_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  client_slug text,
  kind text not null,
  body text not null default '',
  handles text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint client_requests_kind_check check (
    kind in ('feature', 'competitor', 'format', 'cadence', 'feedback', 'other')
  ),
  constraint client_requests_status_check check (
    status in ('new', 'in progress', 'done')
  )
);

comment on table public.client_requests is
  'Client feature requests, creators to study, formats, cadence changes, and feedback. Status is new, in progress, or done.';

create index if not exists client_requests_user_created_idx
  on public.client_requests (user_id, created_at desc);

create index if not exists client_requests_status_created_idx
  on public.client_requests (status, created_at desc);

alter table public.client_requests enable row level security;

revoke all on public.client_requests from anon;
grant select, insert, update on public.client_requests to authenticated;

drop policy if exists "client_requests_select_own_or_admin" on public.client_requests;
create policy "client_requests_select_own_or_admin"
  on public.client_requests
  for select
  to authenticated
  using (
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or user_id = (select auth.uid())
  );

drop policy if exists "client_requests_insert_own" on public.client_requests;
create policy "client_requests_insert_own"
  on public.client_requests
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'new'
    and (
      (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
      or client_slug = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
    )
  );

drop policy if exists "client_requests_admin_update" on public.client_requests;
create policy "client_requests_admin_update"
  on public.client_requests
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

notify pgrst, 'reload schema';
