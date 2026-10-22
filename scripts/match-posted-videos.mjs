#!/usr/bin/env node
// Auto-match posted videos — weekly job.
//
// Checks a client's Instagram account for recent Reels and flags likely matches
// against that client's in-flight scripts (status Approved or Filming — the ones
// that are realistically "about to actually post"), so the admin (Cristian) can
// confirm with one tap in the Content Hub app instead of manually cross-checking
// Instagram against the scripts table.
//
// Run by .github/workflows/match-posted-videos.yml (weekly cron + manual
// workflow_dispatch). Zero npm dependencies on purpose, matching this repo's
// zero-build-step philosophy elsewhere: uses Node's built-in global `fetch`
// (stable since Node 18, present on GitHub's ubuntu-latest runners) and the
// standard library only. No package.json, no node_modules.
//
// Writes to the `scripts` table through the Supabase REST API using the
// service-role key — this is a trusted backend job that intentionally bypasses
// RLS (correct for a cron job with no signed-in user), not a change to RLS
// itself.
//
// Required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, COMPOSIO_API_KEY.
// Optional: COMPOSIO_INSTAGRAM_ACCOUNT_ID (defaults to Andrew's connected
// account below) so this is reusable for a future client without a code change
// to the Composio call itself.

// ───────────────────────────────────────────────────────────────
// CONFIG
// ───────────────────────────────────────────────────────────────

// Secrets / infra — sourced from GitHub Actions secrets in production.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;
const COMPOSIO_INSTAGRAM_ACCOUNT_ID =
  process.env.COMPOSIO_INSTAGRAM_ACCOUNT_ID || 'instagram_fiesta-ahir';

// Business config — which client this run matches posts for. v1 is single-client
// (Andrew). When a second client is wired up, this becomes a small loop over a
// list of { clientSlug, igUserId, composioAccountEnvVar } configs instead of one
// constant — not attempted here since there's only one real client today.
const CLIENT_SLUG = 'andrew';
const IG_USER_ID = '27972324445769771'; // Andrew's numeric IG user id (@andrewpreneurship)

const LOOKBACK_DAYS = 14; // how far back to look for new posts each run
export const MATCH_THRESHOLD = 0.5; // see scoreScript() below for reasoning
const MAX_PAGES = 10; // pagination safety valve — 14 days of one account's posts
                       // should never come close to needing this many pages; this
                       // just guarantees the job can't spin forever on a bad cursor.

const COMPOSIO_BASE_URL = 'https://backend.composio.dev/api/v3.1';

// ───────────────────────────────────────────────────────────────
// COMPOSIO — the one HTTP call to a third party in this file.
// ───────────────────────────────────────────────────────────────
//
// VERIFIED 2026-10-22 against Composio's own published API reference:
//   - https://docs.composio.dev/reference/v3/api-reference/tools/postToolsExecuteProxy
//     confirms the `/api/v3.*/tools/execute/...` endpoint family, the
//     `connected_account_id` request field, and ApiKeyAuth via the `x-api-key`
//     header.
//   - Composio's per-tool "Execute tool" reference page (reached via the
//     `tools/execute/{tool_slug}` path pattern) confirms the exact shape used
//     below:
//       POST https://backend.composio.dev/api/v3.1/tools/execute/{tool_slug}
//       headers: { "x-api-key": COMPOSIO_API_KEY, "Content-Type": "application/json" }
//       body:    { "connected_account_id": "...", "arguments": { ... } }
//       response: { data, error, successful, log_id } — the tool's actual
//                 output lives in the `data` field.
//   - Composio's docs note the un-suffixed `v3` execute path is being retired
//     in favor of `v3.1` for new code, which is why this targets `v3.1`.
//
// This is the single piece of this feature that needs a live test run (via
// workflow_dispatch) before the weekly schedule can be trusted — Composio's
// REST surface could have shifted since the above was checked, and this is
// the only function that would need to change if so. Everything else in this
// file (scoring, Supabase reads/writes) is independently testable without it.
async function callComposioTool(toolSlug, { connectedAccountId, arguments: toolArgs }) {
  const res = await fetch(`${COMPOSIO_BASE_URL}/tools/execute/${toolSlug}`, {
    method: 'POST',
    headers: {
      'x-api-key': COMPOSIO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      connected_account_id: connectedAccountId,
      arguments: toolArgs,
    }),
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body || body.successful === false) {
    const detail = body && body.error ? JSON.stringify(body.error) : `HTTP ${res.status}`;
    throw new Error(`Composio tool ${toolSlug} failed: ${detail}`);
  }
  return body.data;
}

// Fetches Andrew's media from the last LOOKBACK_DAYS, following cursor
// pagination, and returns the raw items (unfiltered — isRecentReel() below
// does the Reels/caption filtering).
async function fetchRecentMedia() {
  const sinceTs = Math.floor(Date.now() / 1000) - LOOKBACK_DAYS * 24 * 60 * 60;
  const fields = 'id,caption,media_type,media_product_type,permalink,timestamp';
  const all = [];
  let cursor = null;
  let page = 0;

  while (page < MAX_PAGES) {
    page += 1;
    const args = { ig_user_id: IG_USER_ID, since: sinceTs, fields };
    if (cursor) args.after = cursor;

    const data = await callComposioTool('INSTAGRAM_GET_IG_USER_MEDIA', {
      connectedAccountId: COMPOSIO_INSTAGRAM_ACCOUNT_ID,
      arguments: args,
    });

    // Composio typically passes the underlying platform response straight
    // through inside `data` — for the IG Graph API that's normally
    // { data: [...items], paging: { cursors: { after } } }. Handled
    // defensively in case Composio instead flattens it to { items, paging }.
    const items = (data && (data.data || data.items)) || [];
    all.push(...items);

    cursor = (data && data.paging && data.paging.cursors && data.paging.cursors.after) || null;
    if (!cursor || items.length === 0) break;
  }

  if (page >= MAX_PAGES && cursor) {
    console.warn(`Stopped paginating after ${MAX_PAGES} pages (safety valve) — there may be more media than fetched this run.`);
  }

  return all;
}

function isRecentReel(item) {
  return (
    (item.media_product_type === 'REELS' || item.media_type === 'VIDEO') &&
    !!(item.caption && item.caption.trim())
  );
}

// ───────────────────────────────────────────────────────────────
// SUPABASE — candidate scripts (read) + match writes (PATCH).
// ───────────────────────────────────────────────────────────────

async function fetchCandidateScripts() {
  const params = new URLSearchParams({
    client_slug: `eq.${CLIENT_SLUG}`,
    status: 'in.(Approved,Filming)',
    select: 'id,title,hook,matched_post_url,matched_post_dismissed_url',
  });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/scripts?${params.toString()}`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase scripts fetch failed: HTTP ${res.status} — ${await res.text()}`);
  }
  return res.json();
}

async function patchScript(id, payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/scripts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Supabase PATCH failed for script ${id}: HTTP ${res.status} — ${await res.text()}`);
  }
}

// ───────────────────────────────────────────────────────────────
// SCORING — simple, dependency-free, explainable text similarity.
// This is a "likely match for a human to confirm" heuristic, not a precision
// ML system, by design: a false positive just shows the admin a suggestion
// they dismiss in one tap; a false negative just means they confirm manually
// like today. Both are cheap, so the bar is "clearly better than nothing,"
// not "never wrong."
// ───────────────────────────────────────────────────────────────

// A small, standard set of common English stopwords (NLTK-style core list),
// plus the handful of contracted forms ("don't" -> "dont" after apostrophe
// stripping) that would otherwise slip through as false "distinctive" words.
const STOPWORDS = new Set([
  'a','an','the','and','or','but','if','because','as','until','while','of','at','by','for','with',
  'about','against','between','into','through','during','before','after','above','below','to','from',
  'up','down','in','out','on','off','over','under','again','further','then','once','here','there',
  'when','where','why','how','all','any','both','each','few','more','most','other','some','such','no',
  'nor','not','only','own','same','so','than','too','very','s','t','can','will','just','should','now',
  'd','ll','m','o','re','ve','y','am','is','are','was','were','be','been','being','have','has','had',
  'having','do','does','did','doing','i','me','my','myself','we','our','ours','ourselves','you','your',
  'yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its',
  'itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these',
  'those',
  'dont','isnt','wasnt','werent','cant','wont','didnt','doesnt','hasnt','havent','hadnt','shouldnt',
  'wouldnt','couldnt','im','ive','youre','youve','theyre','theres','thats','whats','lets','arent',
]);

// Lowercase, strip apostrophes (so "don't" -> "dont" instead of splitting into
// two words), strip all remaining punctuation, split on whitespace.
export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export function distinctiveWords(text) {
  return [...new Set(tokenize(text).filter((w) => w.length > 1 && !STOPWORDS.has(w)))];
}

/**
 * Scores how well a script's hook + title match a caption, as the fraction of
 * the script's distinctive (non-stopword) words that also appear in the
 * caption.
 *
 * Hook is weighted as the primary signal (0.75) because a filmed script's
 * hook is usually spoken on camera near-verbatim — a real posted match tends
 * to echo most of the hook's distinctive words in the caption. Title is a
 * secondary signal (0.25): it's descriptive shorthand Cristian wrote for his
 * own tracking, not something spoken on camera, so it correlates more loosely
 * with the actual caption text. Falls back to whichever signal is available
 * if the other field is empty.
 *
 * `captionWords` is a Set of tokenize(caption) — passed in rather than
 * recomputed per script so one reel's caption is only tokenized once no
 * matter how many candidate scripts it's compared against.
 */
export function scoreScript(captionWords, hook, title) {
  const hookWords = distinctiveWords(hook);
  const titleWords = distinctiveWords(title).filter((w) => !hookWords.includes(w));

  const hookScore = hookWords.length
    ? hookWords.filter((w) => captionWords.has(w)).length / hookWords.length
    : null;
  const titleScore = titleWords.length
    ? titleWords.filter((w) => captionWords.has(w)).length / titleWords.length
    : null;

  if (hookScore === null && titleScore === null) return 0;
  if (hookScore === null) return titleScore;
  if (titleScore === null) return hookScore;
  return hookScore * 0.75 + titleScore * 0.25;
}

// Picks the single best-scoring script (above MATCH_THRESHOLD) for a reel's
// caption out of a pool of candidate scripts. Returns null if nothing clears
// the threshold.
export function pickBestMatch(captionWords, scripts) {
  let best = null;
  for (const script of scripts) {
    const score = scoreScript(captionWords, script.hook, script.title);
    if (score >= MATCH_THRESHOLD && (!best || score > best.score)) {
      best = { script, score };
    }
  }
  return best;
}

// ───────────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────────

async function run() {
  console.log(`Auto-match posted videos — client "${CLIENT_SLUG}" — ${new Date().toISOString()}`);

  const [rawMedia, candidateScripts] = await Promise.all([
    fetchRecentMedia(),
    fetchCandidateScripts(),
  ]);

  const reels = rawMedia.filter(isRecentReel);
  console.log(`Checked ${rawMedia.length} recent media item(s) from Instagram — ${reels.length} are Reels/videos with a non-empty caption.`);

  const alreadyPending = candidateScripts.filter((s) => s.matched_post_url);
  const availableScripts = candidateScripts.filter((s) => !s.matched_post_url);
  console.log(
    `${candidateScripts.length} candidate script(s) in Approved/Filming` +
    (alreadyPending.length ? ` (${alreadyPending.length} already have a pending match and were left untouched this run).` : '.')
  );

  const claimedThisRun = new Set(); // script ids already matched to a reel this run
  const writes = [];
  let skippedNoMatch = 0;
  let skippedDismissed = 0;

  for (const reel of reels) {
    const pool = availableScripts.filter((s) => !claimedThisRun.has(s.id));
    const captionWords = new Set(tokenize(reel.caption));
    const best = pickBestMatch(captionWords, pool);

    if (!best) {
      skippedNoMatch++;
      continue;
    }
    if (reel.permalink === best.script.matched_post_dismissed_url) {
      // Admin already said "not a match" for this exact (script, post) pairing.
      skippedDismissed++;
      continue;
    }

    claimedThisRun.add(best.script.id);
    writes.push({
      scriptId: best.script.id,
      scriptTitle: best.script.title,
      permalink: reel.permalink,
      score: best.score,
    });
  }

  console.log(
    `${writes.length} match(es) found. ` +
    `${skippedNoMatch} reel(s) had no script clear the ${MATCH_THRESHOLD} threshold; ` +
    `${skippedDismissed} reel(s) matched a pairing an admin already dismissed and were skipped.`
  );

  for (const w of writes) {
    await patchScript(w.scriptId, {
      matched_post_url: w.permalink,
      matched_post_detected_at: new Date().toISOString(),
    });
    console.log(`  wrote: "${w.scriptTitle}" -> ${w.permalink} (score ${w.score.toFixed(2)})`);
  }

  console.log(`Done. ${writes.length} script(s) updated with a pending match for admin review.`);
}

function assertEnv() {
  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'COMPOSIO_API_KEY'].filter(
    (k) => !process.env[k]
  );
  if (missing.length) {
    throw new Error(`Missing required env var(s): ${missing.join(', ')}`);
  }
}

// Only run main() when this file is executed directly (`node match-posted-videos.mjs`),
// not when its pure functions are imported by the test file below.
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  assertEnv();
  run().catch((err) => {
    console.error('FATAL:', (err && err.stack) || (err && err.message) || err);
    process.exit(1);
  });
}
