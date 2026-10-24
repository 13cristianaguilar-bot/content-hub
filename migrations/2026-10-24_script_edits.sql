-- Client script edits.
--
-- Adds a new table. It does not alter scripts or any existing row.
-- A client (app_metadata.client_slug, never user_metadata) can insert
-- and read only rows for their own client. An admin
-- (app_metadata.role = admin) can read every row. There is no update
-- or delete policy: history is append-only. Restoring the original
-- writes a new row.
--
-- Apply this file in the Supabase SQL editor for project
-- udkbnlpnfyjuwlstfxhr. Safe to run more than once.
--
-- edited_by is the name captured from the signed-in user when they
-- save. Authorization uses client, not that name.

create table if not exists public.script_edits (
  id uuid primary key default gen_random_uuid(),
  script_id uuid not null references public.scripts(id) on delete cascade,
  client text not null,
  field text not null,
  before_text text not null default '',
  after_text text not null default '',
  edited_by text not null,
  edited_at timestamptz not null default now(),
  reason text,
  constraint script_edits_field_check check (
    field in ('hook', 'on_screen', 'body', 'cta', 'caption', 'notes')
  ),
  constraint script_edits_edited_by_check check (char_length(edited_by) between 1 and 120)
);

comment on table public.script_edits is
  'One row per field a client changes on a script. before_text is the previous value. The earliest before_text for a field is the original.';

create index if not exists script_edits_script_edited_idx
  on public.script_edits (script_id, edited_at desc);

create index if not exists script_edits_client_edited_idx
  on public.script_edits (client, edited_at desc);

alter table public.script_edits enable row level security;

revoke all on table public.script_edits from public, anon, authenticated;
grant select, insert on table public.script_edits to authenticated;

drop policy if exists "script_edits_select_own_or_admin" on public.script_edits;
create policy "script_edits_select_own_or_admin"
  on public.script_edits
  for select
  to authenticated
  using (
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or client = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
  );

drop policy if exists "script_edits_insert_own" on public.script_edits;
create policy "script_edits_insert_own"
  on public.script_edits
  for insert
  to authenticated
  with check (
    (select auth.jwt() -> 'app_metadata' ->> 'role') is distinct from 'admin'
    and client = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
    and exists (
      select 1 from public.scripts s
      where s.id = script_id
        and s.client_slug = (select auth.jwt() -> 'app_metadata' ->> 'client_slug')
    )
  );

notify pgrst, 'reload schema';
