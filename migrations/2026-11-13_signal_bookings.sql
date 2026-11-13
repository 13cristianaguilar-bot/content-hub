-- Signal booking. Guest details stay off the public Data API.
-- The edge function uses the service role. anon and authenticated have no grants.

create table if not exists public.signal_bookings (
  id uuid primary key default gen_random_uuid(),
  offer_slug text not null check (offer_slug in ('audit', 'connect', 'content-engine', 'ma', 'ma-30')),
  ghl_calendar_id text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  visitor_timezone text,
  guest_name text not null check (char_length(guest_name) between 2 and 80),
  guest_email text not null check (char_length(guest_email) between 6 and 254),
  guest_phone text not null check (char_length(guest_phone) between 8 and 16),
  notes text check (notes is null or char_length(notes) <= 2000),
  consent_at timestamptz,
  status text not null check (status in ('hold', 'confirmed', 'cancelled', 'expired', 'failed')),
  hold_expires_at timestamptz,
  idempotency_key text,
  cancel_token_hash text,
  google_event_id text,
  google_meet_url text,
  ghl_contact_id text,
  ghl_appointment_id text,
  ghl_error text,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint signal_bookings_time_order check (ends_at > starts_at)
);

create unique index if not exists signal_bookings_idempotency
  on public.signal_bookings (idempotency_key)
  where idempotency_key is not null;

create index if not exists signal_bookings_cancel
  on public.signal_bookings (cancel_token_hash);

create index if not exists signal_bookings_email
  on public.signal_bookings (guest_email, starts_at);

alter table public.signal_bookings
  drop constraint if exists signal_bookings_no_overlap;

alter table public.signal_bookings
  add constraint signal_bookings_no_overlap
  exclude using gist (tstzrange(starts_at, ends_at, '[)') with &&)
  where (status in ('hold', 'confirmed'));

create table if not exists public.signal_booking_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  email text,
  offer_slug text,
  created_at timestamptz not null default now()
);

create index if not exists signal_booking_attempts_ip
  on public.signal_booking_attempts (ip_hash, created_at);

alter table public.signal_bookings enable row level security;
alter table public.signal_booking_attempts enable row level security;
alter table public.signal_bookings force row level security;
alter table public.signal_booking_attempts force row level security;

revoke all on table public.signal_bookings from public, anon, authenticated;
revoke all on table public.signal_booking_attempts from public, anon, authenticated;
grant select, insert, update, delete on table public.signal_bookings to service_role;
grant select, insert, update, delete on table public.signal_booking_attempts to service_role;
grant usage, select on sequence public.signal_booking_attempts_id_seq to service_role;

comment on table public.signal_bookings is 'Signal Marketing bookings. Service role only. No anon policies.';
