-- Close the client update gap on public.scripts.
--
-- admin_or_own_client_can_update let a signed-in client update every column
-- on their own rows: status, client_slug, pipeline_audit, proof_stats,
-- editor_notes, filming_setup, and the rest. The app only meant for a client
-- to change script text, mark a script opened, or mark an approved script
-- filmed.
--
-- After this file:
--   * authenticated admins still update scripts directly
--   * a client has no table UPDATE policy
--   * client_save_script_text writes title, hook, and full_script only, and
--     appends script_edits (before_text is the previous value, so Restore
--     original still works)
--   * client_mark_scripts_opened sets client_opened_at once
--   * client_mark_script_filmed moves status only between Approved and Filming
--
-- Authorization uses app_metadata, never user_metadata.
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. It does not change script rows.

drop policy if exists "admin_or_own_client_can_update" on public.scripts;

drop policy if exists "admin_can_update_scripts" on public.scripts;
create policy "admin_can_update_scripts"
  on public.scripts
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

alter table public.script_edits drop constraint if exists script_edits_field_check;
alter table public.script_edits add constraint script_edits_field_check
  check (field in ('hook', 'on_screen', 'body', 'cta', 'caption', 'notes', 'title'));

create or replace function public.client_save_script_text(
  p_id uuid,
  p_title text,
  p_hook text,
  p_full_script text,
  p_edited_by text,
  p_reason text
) returns setof public.script_edits
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_slug text;
  v_row public.scripts%rowtype;
  v_by text;
  v_reason text;
  v_title text;
  v_hook text;
  v_body text;
  v_edit public.script_edits%rowtype;
  v_changed boolean := false;
begin
  v_role := auth.jwt() -> 'app_metadata' ->> 'role';
  v_slug := coalesce(auth.jwt() -> 'app_metadata' ->> 'client_slug', '');
  if v_role = 'admin' or btrim(v_slug) = '' then
    raise exception 'not allowed';
  end if;

  select * into v_row
  from public.scripts
  where id = p_id
    and client_slug = v_slug;
  if not found then
    raise exception 'not allowed';
  end if;

  v_by := left(btrim(coalesce(p_edited_by, '')), 120);
  if v_by = '' then
    v_by := 'Client';
  end if;
  v_reason := nullif(left(btrim(coalesce(p_reason, '')), 500), '');
  v_title := coalesce(p_title, '');
  v_hook := coalesce(p_hook, '');
  v_body := coalesce(p_full_script, '');

  if coalesce(v_row.title, '') is distinct from v_title then
    insert into public.script_edits (script_id, client, field, before_text, after_text, edited_by, reason)
    values (v_row.id, v_row.client_slug, 'title', coalesce(v_row.title, ''), v_title, v_by, v_reason)
    returning * into v_edit;
    v_changed := true;
    return next v_edit;
  end if;

  if coalesce(v_row.hook, '') is distinct from v_hook then
    insert into public.script_edits (script_id, client, field, before_text, after_text, edited_by, reason)
    values (v_row.id, v_row.client_slug, 'hook', coalesce(v_row.hook, ''), v_hook, v_by, v_reason)
    returning * into v_edit;
    v_changed := true;
    return next v_edit;
  end if;

  if coalesce(v_row.full_script, '') is distinct from v_body then
    insert into public.script_edits (script_id, client, field, before_text, after_text, edited_by, reason)
    values (v_row.id, v_row.client_slug, 'body', coalesce(v_row.full_script, ''), v_body, v_by, v_reason)
    returning * into v_edit;
    v_changed := true;
    return next v_edit;
  end if;

  if v_changed then
    update public.scripts
      set title = v_title,
          hook = v_hook,
          full_script = v_body
    where id = v_row.id
      and client_slug = v_slug;
  end if;
end;
$$;

revoke all on function public.client_save_script_text(uuid, text, text, text, text, text) from public, anon;
grant execute on function public.client_save_script_text(uuid, text, text, text, text, text) to authenticated;

create or replace function public.client_mark_scripts_opened(p_ids uuid[])
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_slug text;
  v_count integer := 0;
begin
  v_role := auth.jwt() -> 'app_metadata' ->> 'role';
  v_slug := coalesce(auth.jwt() -> 'app_metadata' ->> 'client_slug', '');
  if v_role = 'admin' or btrim(v_slug) = '' then
    raise exception 'not allowed';
  end if;

  update public.scripts
    set client_opened_at = now()
  where id = any(coalesce(p_ids, array[]::uuid[]))
    and client_slug = v_slug
    and client_opened_at is null;
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.client_mark_scripts_opened(uuid[]) from public, anon;
grant execute on function public.client_mark_scripts_opened(uuid[]) to authenticated;

-- The only status a client can write: Approved -> Filming, or Filming -> Approved
-- when they undo "Done, I filmed it". Posted, Draft, Passed, and client_slug
-- stay admin-only.
create or replace function public.client_mark_script_filmed(p_id uuid, p_status text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_slug text;
  v_status text;
  v_id uuid;
begin
  v_role := auth.jwt() -> 'app_metadata' ->> 'role';
  v_slug := coalesce(auth.jwt() -> 'app_metadata' ->> 'client_slug', '');
  if v_role = 'admin' or btrim(v_slug) = '' then
    raise exception 'not allowed';
  end if;
  if p_status is distinct from 'Filming' and p_status is distinct from 'Approved' then
    raise exception 'not allowed';
  end if;

  select status into v_status
  from public.scripts
  where id = p_id
    and client_slug = v_slug;
  if not found then
    raise exception 'not allowed';
  end if;
  if p_status = 'Filming' and v_status is distinct from 'Approved' and v_status is distinct from 'Filming' then
    raise exception 'not allowed';
  end if;
  if p_status = 'Approved' and v_status is distinct from 'Filming' and v_status is distinct from 'Approved' then
    raise exception 'not allowed';
  end if;

  update public.scripts
    set status = p_status
  where id = p_id
    and client_slug = v_slug
    and status = v_status
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.client_mark_script_filmed(uuid, text) from public, anon;
grant execute on function public.client_mark_script_filmed(uuid, text) to authenticated;

notify pgrst, 'reload schema';
