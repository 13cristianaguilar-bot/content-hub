-- Command Center floor log.
--
-- Videos filmed, lead magnets, contacts, booked calls, showed calls,
-- closed deals, and client wins are entered on the Command Center board
-- and stored here. client_wins rows must name the client.
-- This file does not alter scripts or any other table.
--
-- Only an owner login can read or write. That means
-- app_metadata.role = admin. Never user_metadata: a signed-in user can
-- edit their own user_metadata and would be able to grant themselves access.
-- Clients have no policy on this table. anon has no grant.
-- There is no update grant. A wrong entry is removed and logged again.
--
-- Apply this file by hand in the Supabase SQL editor for project
-- udkbnlpnfyjuwlstfxhr. Do not assume it has already been applied.
-- Safe to run more than once.
--
-- Until it succeeds, Command Center says "Not set up yet" and shows no count.

create table if not exists public.cc_kpi_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  metric text not null,
  count integer not null,
  logged_on date not null,
  note text not null default '',
  client_name text,
  created_at timestamptz not null default now(),
  constraint cc_kpi_log_metric_check check (
    metric in (
      'videos', 'lead_magnets', 'contacts', 'booked_calls',
      'showed_calls', 'closed_deals', 'client_wins'
    )
  ),
  constraint cc_kpi_log_count_check check (count >= 1 and count <= 500),
  constraint cc_kpi_log_note_len check (char_length(note) <= 240),
  constraint cc_kpi_log_client_check check (
    (
      metric = 'client_wins'
      and client_name is not null
      and char_length(btrim(client_name)) between 1 and 80
    )
    or (metric <> 'client_wins' and client_name is null)
  )
);

comment on table public.cc_kpi_log is
  'Owner-only Command Center floor log. count is how many were logged on logged_on, not a running total. The board sums count. Do not apply this file from a bot. Cristian runs it in the Supabase SQL editor.';

comment on column public.cc_kpi_log.metric is
  'videos, lead_magnets, contacts, booked_calls, showed_calls, closed_deals, or client_wins.';

comment on column public.cc_kpi_log.client_name is
  'Required for client_wins. Null for every other metric.';

comment on column public.cc_kpi_log.logged_on is
  'The Chicago calendar day the work counts for. Chosen on the board.';

create index if not exists cc_kpi_log_metric_day_idx
  on public.cc_kpi_log (metric, logged_on desc);

create index if not exists cc_kpi_log_user_id_idx
  on public.cc_kpi_log (user_id);

alter table public.cc_kpi_log enable row level security;
alter table public.cc_kpi_log force row level security;

revoke all on table public.cc_kpi_log from public;
revoke all on table public.cc_kpi_log from anon;
grant select, insert, delete on table public.cc_kpi_log to authenticated;

drop policy if exists "cc_kpi_log_admin_select" on public.cc_kpi_log;
create policy "cc_kpi_log_admin_select"
  on public.cc_kpi_log
  for select
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "cc_kpi_log_admin_insert" on public.cc_kpi_log;
create policy "cc_kpi_log_admin_insert"
  on public.cc_kpi_log
  for insert
  to authenticated
  with check (
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and user_id = (select auth.uid())
  );

drop policy if exists "cc_kpi_log_admin_delete" on public.cc_kpi_log;
create policy "cc_kpi_log_admin_delete"
  on public.cc_kpi_log
  for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

notify pgrst, 'reload schema';
