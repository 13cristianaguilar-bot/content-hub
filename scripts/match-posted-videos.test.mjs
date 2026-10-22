// Local sanity check for the matching heuristic in match-posted-videos.mjs.
// No network calls, no env vars — exercises only the pure scoring functions
// against the 3 real "andrew" hooks from the scripts table plus a few made-up
// plausible/implausible captions, to confirm the 0.5 threshold produces
// reasonable separation between an obvious match and an unrelated caption.
//
// Run with: node scripts/match-posted-videos.test.mjs

import assert from 'node:assert/strict';
import { tokenize, scoreScript, pickBestMatch, MATCH_THRESHOLD } from './match-posted-videos.mjs';

const scripts = [
  {
    id: 'revenue-play',
    title: 'The Revenue Play',
    hook:
      "There's a GoHighLevel revenue stream that almost no one is building right now. I heard about it from three different people at the same mastermind — in separate conversations, without comparing notes.",
  },
  {
    id: 'the-panel',
    title: 'The Panel',
    hook: 'They asked me to be on the panel 24 hours before it was happening.',
  },
  {
    id: 'serving-vs-larping',
    title: 'Serving vs. Larping',
    hook:
      "It took me two years on GHL to realize most agencies aren't serving their clients. They're performing service.",
  },
];

function scoreAgainst(caption, script) {
  return scoreScript(new Set(tokenize(caption)), script.hook, script.title);
}

// ── Case 1: an obviously-matching caption (near-verbatim echo of the hook) ──
const matchingCaption =
  "Found a GoHighLevel revenue stream almost nobody's building right now. Heard about it from 3 different people at the same mastermind — in separate conversations, without comparing notes. Link in bio.";
const s1 = scoreAgainst(matchingCaption, scripts[0]);
console.log(`"The Revenue Play" vs matching caption -> ${s1.toFixed(2)}`);
assert.ok(s1 >= MATCH_THRESHOLD, `expected a near-verbatim caption to clear the threshold, got ${s1}`);

// ── Case 2: an unrelated caption against the same script ──
const unrelatedCaption1 = 'Beautiful sunset today at the beach with the family. So grateful for this moment. #blessed';
const s2 = scoreAgainst(unrelatedCaption1, scripts[0]);
console.log(`"The Revenue Play" vs unrelated caption -> ${s2.toFixed(2)}`);
assert.ok(s2 < MATCH_THRESHOLD, `expected an unrelated caption to score low, got ${s2}`);

// ── Case 3: "The Panel" — short hook, matching caption ──
const panelMatch = 'They asked me to be on the panel just 24 hours before it was happening. Wild week.';
const s3 = scoreAgainst(panelMatch, scripts[1]);
console.log(`"The Panel" vs matching caption -> ${s3.toFixed(2)}`);
assert.ok(s3 >= MATCH_THRESHOLD, `expected the panel caption to clear the threshold, got ${s3}`);

// ── Case 4: "The Panel" — unrelated caption ──
const panelUnrelated = 'New merch drop this week. Link in bio for the full collection.';
const s4 = scoreAgainst(panelUnrelated, scripts[1]);
console.log(`"The Panel" vs unrelated caption -> ${s4.toFixed(2)}`);
assert.ok(s4 < MATCH_THRESHOLD, `expected an unrelated caption to score low, got ${s4}`);

// ── Case 5: "Serving vs. Larping" — matching caption ──
const servingMatch =
  "Two years on GHL taught me most agencies aren't actually serving their clients — they're performing service. Big difference.";
const s5 = scoreAgainst(servingMatch, scripts[2]);
console.log(`"Serving vs. Larping" vs matching caption -> ${s5.toFixed(2)}`);
assert.ok(s5 >= MATCH_THRESHOLD, `expected the serving/larping caption to clear the threshold, got ${s5}`);

// ── Case 6: cross-check — a caption shouldn't accidentally score high against
// the WRONG script just because a couple of generic words overlap. ──
const s6 = scoreAgainst(servingMatch, scripts[0]); // serving caption vs revenue-play script
console.log(`"The Revenue Play" vs serving/larping caption (should be low) -> ${s6.toFixed(2)}`);
assert.ok(s6 < MATCH_THRESHOLD, `expected cross-script scoring to stay low, got ${s6}`);

// ── Case 7: pickBestMatch picks the right script out of the full pool ──
const best = pickBestMatch(new Set(tokenize(matchingCaption)), scripts);
console.log(`pickBestMatch on revenue-play caption -> ${best && best.script.id} (score ${best && best.score.toFixed(2)})`);
assert.equal(best && best.script.id, 'revenue-play', 'expected pickBestMatch to pick the revenue-play script');

// ── Case 8: pickBestMatch returns null when nothing clears the threshold ──
const none = pickBestMatch(new Set(tokenize(unrelatedCaption1)), scripts);
console.log(`pickBestMatch on unrelated caption -> ${none}`);
assert.equal(none, null, 'expected pickBestMatch to return null when no script clears the threshold');

console.log('\nAll scoring sanity checks passed.');
