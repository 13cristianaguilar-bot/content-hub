-- Client-facing film/post dates and a seen marker once the client opens a script.
-- film_by and post_by are set by admin. client_opened_at is set when the client
-- opens a script; admin "See what they see" does not write it.

alter table public.scripts
  add column if not exists film_by date,
  add column if not exists post_by date,
  add column if not exists client_opened_at timestamptz;

comment on column public.scripts.film_by is 'Date the client should film by. Shown as Film by <date> in the client view.';
comment on column public.scripts.post_by is 'Date the client should post by. Shown as Post by <date> in the client view.';
comment on column public.scripts.client_opened_at is 'When the client first opened this script. Null means New.';
