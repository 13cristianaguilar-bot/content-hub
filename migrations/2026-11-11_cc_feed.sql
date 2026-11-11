-- Command Center private feed.
--
-- The live board reads one row, id = 'today', and treats payload as the
-- today.json shape in command-center/SCHEMA.md. The public repo does not
-- store that payload. today.json in the repo is a stub.
--
-- Only an owner login can read. That means app_metadata.role = admin.
-- Never user_metadata: a signed-in user can edit their own user_metadata.
-- anon has no grant. authenticated has select only.
-- There is no insert, update, or delete policy. The ingest routine writes
-- with the service role, which bypasses row level security.
--
-- Apply this file by hand in the Supabase SQL editor for project
-- udkbnlpnfyjuwlstfxhr. Do not assume it has already been applied.
-- Do not apply this file from a bot. Cristian runs it after he approves it.
-- Safe to run more than once.
--
-- Until it succeeds, a signed-in owner sees "Not set up yet".

create table if not exists public.cc_feed (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

comment on table public.cc_feed is
  'Owner-only Command Center feed. The board reads id today. payload matches the today.json shape. Ingest writes with the service role.';

comment on column public.cc_feed.id is
  'Feed key. The board reads today.';

comment on column public.cc_feed.payload is
  'The feed object. Do not put this document in the public repo.';

comment on column public.cc_feed.updated_at is
  'Set on write. The board uses it as asOf when the payload omits asOf.';

create or replace function public.cc_feed_touch()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cc_feed_touch on public.cc_feed;
create trigger cc_feed_touch
  before update on public.cc_feed
  for each row execute function public.cc_feed_touch();

revoke all on function public.cc_feed_touch() from public;
revoke all on function public.cc_feed_touch() from anon;
revoke all on function public.cc_feed_touch() from authenticated;

alter table public.cc_feed enable row level security;
alter table public.cc_feed force row level security;

revoke all on table public.cc_feed from public;
revoke all on table public.cc_feed from anon;
grant select on table public.cc_feed to authenticated;

drop policy if exists "cc_feed_admin_select" on public.cc_feed;
create policy "cc_feed_admin_select"
  on public.cc_feed
  for select
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

notify pgrst, 'reload schema';
