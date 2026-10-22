-- Auto-match posted videos — adds the columns the weekly matching job (scripts/match-posted-videos.mjs)
-- reads and writes, plus the admin confirm/dismiss UI in index.html.
-- Run this entire file in: Supabase → SQL Editor → New query → Paste → Run
--
-- matched_post_url            -- candidate IG permalink the job thinks matches this script, pending
--                                 admin confirmation. Null when there's no pending candidate.
-- matched_post_detected_at    -- when the candidate was found.
-- matched_post_dismissed_url  -- the last candidate URL an admin explicitly said "not a match" for,
--                                 so the job doesn't immediately re-propose the exact same post on the
--                                 next run. Simple, not bulletproof against every edge case (e.g. it
--                                 only remembers the single most recent dismissal, not a full history)
--                                 — that's an accepted tradeoff for v1.

alter table public.scripts
  add column if not exists matched_post_url           text,
  add column if not exists matched_post_detected_at    timestamptz,
  add column if not exists matched_post_dismissed_url  text;
