-- Admin production audit on a script.
--
-- Adds public.scripts.pipeline_audit (jsonb). The Hub reads it only when
-- the signed-in role is admin, and only as the first Film-prep step
-- ("Audit" / "How we built this"). A client login never gets that step.
-- Existing Film prep for clients is unchanged: Reference, Notes, Film.
--
-- Apply in the Supabase SQL editor for project udkbnlpnfyjuwlstfxhr.
-- Safe to run more than once. Does not rewrite any existing row.
--
-- Ops populate (one script):
--
--   update public.scripts
--   set pipeline_audit = jsonb_build_object(
--     'offer', 'Content system for founders — research, scripts, publishing rhythm.',
--     'icp', 'Founders who already have the stories and need the format.',
--     'angle', 'Most founders do not need more ideas. They need a system.',
--     'angleWhy', 'The buyer already posts tips. The angle names the real gap.',
--     'keywords', jsonb_build_array('founder talking head', 'content system', 'outlier formats'),
--     'searchPath', 'Apify keyword search on founder talking-head → ranks ≥3× median → picked the format reference.',
--     'toolRestricted', false,
--     'toolNote', '',
--     'refs', jsonb_build_array(
--       jsonb_build_object(
--         'url', 'https://www.instagram.com/reel/DUIafE1DJqb/',
--         'views', 109468,
--         'outlier', '6.6x',
--         'source', 'apify',
--         'creator', '@frazerbrookesonline'
--       )
--     ),
--     'dna', jsonb_build_object(
--       'hook', jsonb_build_object('status', 'pass', 'why', 'First line keeps the reference hook shape.'),
--       'components', jsonb_build_object('status', 'pass', 'why', 'Talking-head, one idea, then the ask.'),
--       'rehook', jsonb_build_object('status', 'pass', 'why', 'The turn lands mid-script, same as the reference.'),
--       'cadence', jsonb_build_object('status', 'pass', 'why', 'One beat per line. No extra story.'),
--       'length', jsonb_build_object('status', 'pass', 'why', 'Spoken length sits in the reference band.'),
--       'idea', jsonb_build_object('status', 'pass', 'why', 'Same idea as the reference. Only the buyer changed.'),
--       'reward', jsonb_build_object('status', 'pass', 'why', 'Viewer leaves with one usable distinction.'),
--       'emotionalNext', jsonb_build_object('status', 'pass', 'why', 'Soft next step matches the reference.')
--     ),
--     'spoken', jsonb_build_object(
--       'scriptSeconds', 46,
--       'refBand', '40-55s',
--       'ffprobeSeconds', 48,
--       'status', 'pass',
--       'why', 'Spoken 46s sits inside the 40–55s ffprobe band (reference is 48s).'
--     ),
--     'gates', jsonb_build_array(),
--     'ready', true
--   )
--   where id = 'PASTE-SCRIPT-UUID';
--
-- Status values are pass, soft_pass, fail, gap, or hold.
-- SOFT and SOFT PASS map to soft_pass (an intentional accept, with the reason).
-- HOLD is a Cristian gate. It is not a DNA failure and it is not a pass.
-- A soft_pass does not flip Ready to yes by itself, and it is never shown as PASS.
-- ready true still cannot hide an open hard gate, a fail, or a gap.
-- DNA keys are hook, components, rehook, cadence, length, idea, reward,
-- emotionalNext (emotional is accepted too).
--
-- The v1 keys above still work. Ops can also write the richer shape the
-- Devin pack already produces. It is the same jsonb column. Old keys stay.
--
--   update public.scripts
--   set pipeline_audit = jsonb_build_object(
--     'offer_icp_angle', jsonb_build_object(
--       'offer', 'ID3A Jam buy-in',
--       'icp', 'Nonprofit EDs who pitch mission decks and stall',
--       'angle', 'Funders want proof of community buy-in',
--       'verdict', 'PASS (soft audience)',
--       'why', 'Offer fit is strong. The reference audience is a format transplant, labeled soft on purpose.'
--     ),
--     'keywords', jsonb_build_object(
--       'documented', 'GAP — the keyword list was not logged',
--       'inferred_path', 'Fundraising outliers with a comment CTA. Inferred, not documented.',
--       'verdict', 'GAP',
--       'why', 'Search path not logged.'
--     ),
--     'searchPath', '',
--     'toolRestricted', true,
--     'toolNote', 'Apify Instagram monthly limit. Shown from Sandcastles.',
--     'ref', jsonb_build_object(
--       'url', 'https://www.instagram.com/reel/DdovX4Utsqj/',
--       'views', '199,209',
--       'likes', '11,930',
--       'comments', '2,315',
--       'outlier', '67.6x',
--       'source', 'sandcastles',
--       'creator', '@susan_ho',
--       'why_ref', 'Comment-CTA plus fundraise pain. The structure transplants.',
--       'audience', 'SOFT PASS — fundraising creators, not an exact ICP match',
--       'tool_restriction', 'Y — Sandcastles only. No Apify cross-check.'
--     ),
--     'dna', jsonb_build_object(
--       'hook', jsonb_build_array('PASS', 'First line keeps the reference hook.'),
--       'length', jsonb_build_array('SOFT', 'Top of the band. Left long on purpose.'),
--       'emotional', jsonb_build_array('PASS', 'Next step matches the reference.')
--     ),
--     'spoken', jsonb_build_object(
--       'est', '~90s',
--       'band', '80-90s',
--       'ref_ffprobe', '84.6s',
--       'verdict', 'PASS (top of band)',
--       'why', 'Inside the band. Do not shorten.'
--     ),
--     'film_prep', jsonb_build_object(
--       'fpf', 'PASS — Format, pacing, and framing are filled.',
--       'metrics', 'PASS — views and outlier are above the fold.',
--       'tele', 'PASS — teleprompter is clean.'
--     ),
--     'gates', jsonb_build_array(
--       jsonb_build_object('item', 'ManyChat keyword is still a placeholder', 'severity', 'hard', 'owner', 'Cristian', 'open', true)
--     ),
--     'confirms', jsonb_build_array('ManyChat keyword BUYIN is not live. Cristian must lock it before send.'),
--     'blockers', jsonb_build_array('ManyChat keyword not locked'),
--     'gaps', jsonb_build_array('Keywords/search path not logged'),
--     'ready', false,
--     'readyWhy', 'Do not send until the keyword is live and Cristian says so.'
--   )
--   where id = 'PASTE-SCRIPT-UUID';
--
-- Leave documented as a GAP string when the keyword list was not logged.
-- Do not copy inferred_path into documented. Do not invent a reel URL or a score.
-- If pipeline_audit is null, the Hub will read a structured Admin Audit block
-- from filming_direction or the legacy admin_audit text. That parse only
-- keeps links and scores that are actually written there.
--
-- toolRestricted true (or a toolNote that says Apify hit a hard limit /
-- quota and Ops fell back) flags the reference section. Use source
-- "apify", "sandcastles", "vault", or "other" on each reel.
--
-- Leave pipeline_audit null when the check has not been done. The Audit
-- step then lists every missing check as GAP. Do not invent refs.
--
-- A client update cannot clear this column. The SQL editor (no user JWT)
-- and an admin session can. Film prep columns are untouched.

alter table public.scripts
  add column if not exists pipeline_audit jsonb;

comment on column public.scripts.pipeline_audit is
  'Admin-only production audit (offer, keywords, refs, format DNA, spoken length, gates, ready). The Hub shows it as the Audit step before Film prep. Clients never see that step. Null means the checks were not recorded.';

create or replace function public.scripts_keep_pipeline_audit()
returns trigger
language plpgsql
as $$
begin
  -- SQL editor and service role have no user JWT, so Ops can populate.
  -- A signed-in client must not wipe or rewrite the audit on save.
  if auth.jwt() is not null
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') is distinct from 'admin'
  then
    new.pipeline_audit := old.pipeline_audit;
  end if;
  return new;
end;
$$;

drop trigger if exists scripts_keep_pipeline_audit on public.scripts;
create trigger scripts_keep_pipeline_audit
  before update on public.scripts
  for each row
  execute function public.scripts_keep_pipeline_audit();

notify pgrst, 'reload schema';
