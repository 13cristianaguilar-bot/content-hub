import fs from 'fs';
import assert from 'assert';
import vm from 'vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));

function extract(name) {
  const start = script.indexOf('function ' + name + '(');
  if (start < 0) throw new Error('missing ' + name);
  let i = script.indexOf('{', start);
  let depth = 0;
  for (; i < script.length; i++) {
    const c = script[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return script.slice(start, i + 1);
    }
  }
  throw new Error('unclosed ' + name);
}

const names = [
  'escHtml', 'ymd', 'groupStatus', 'parseBatchDate', 'groupBatchName', 'groupBatchDate',
  'isFilmedStatus', 'isUnfilmedGroup', 'isConferenceBatch', 'isFloorFilmBatch', 'groupIsConference', 'segmentOfGroup', 'partitionSegments',
  'weekStartMonday', 'freshPartition', 'scriptType',
  'renderStatusRail', 'renderVideoSlot',
  'asText', 'clipText', 'wordCount', 'readLabel', 'parseHookPair', 'normSpoken', 'spokenHook', 'parseBeats', 'peelHook', 'beatName', 'scriptFlow',
  'parseSetup', 'parseShots', 'parseOnScreen', 'videoInfo', 'extractVideoLink', 'fdObject', 'pullLabeled', 'referencePack',
  'extractProofStats', 'parseReadWays', 'labeledChunks', 'prepShownNote',
  'clipKey', 'sameClip', 'formatPrinciples', 'tightCopy',
  'reactClipKey', 'hasReactClipKey', 'isReactionScript', 'reactionClipInfo', 'reactionClipUrl', 'showsReactClip',
  'fdPick', 'referenceMetrics', 'derivePrepPacing', 'derivePrepFraming', 'prepModel',
  'prepText', 'prepMetricsHtml', 'prepFact', 'prepParagraphs', 'prepFrame', 'prepOpenLink',
  'prepPlayer', 'prepTightFact', 'prepReferenceHtml', 'prepStepHtml',
  'prepShowsAudit', 'prepPlan', 'prepContentIndex', 'prepStepBody',
  'auditStatus', 'auditCount', 'auditNumLabel', 'auditScoreLabel', 'auditList', 'auditToolLabel',
  'auditSource', 'auditCheck', 'auditFact', 'parseSecondBand', 'parseClockBand',
  'spokenReadSeconds', 'spokenInBand', 'auditBlob', 'auditRestricted',
  'collectConfirmGates', 'teleprompterIssues', 'auditHref', 'auditPick',
  'pacingWritten', 'framingWritten', 'buildAudit',
  'auditBadge', 'auditSection', 'auditRowHtml', 'prepAuditHtml',
  'dossierBlock', 'linkOrText', 'copyScriptButton', 'renderDossierBody',
  'setLabeledBlock', 'scriptEditValue', 'scriptEditDiff', 'editOriginalMap', 'restoreEditValues',
  'csvCell', 'editsToCsv', 'editsToJson', 'editFieldLabel', 'editorLabel',
  'homeSlug', 'sessionLanding',
];
const src = [
  "const STATUS_ORDER = ['Draft','Needs Review','Approved','Filming','Posted','Passed'];",
  "const APP_VERSION = '2026.10.23';",
  "const WALKTHROUGH_VIDEO_URL = '';",
  "const CLIENTS = { jan: { name: 'Jan Zands', label: 'Jan' } };",
  'let prepState = null;',
  "var role = 'client';",
  ...names.map(extract),
].join('\n');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src, ctx);

const cases = {
  'A · Story': 'interview',
  'Format A': 'interview',
  'G · Overlay': 'broll',
  'J': 'broll',
  'F14': 'other',
  'J1': 'other',
  'J11': 'other',
  'K · Question': 'other',
  'Reaction': 'interview',
  'Talking Head': 'interview',
  'talking-head': 'interview',
  'Silent text-on-screen': 'broll',
  'Text on screen': 'broll',
  'was B-Roll': 'other',
  'B-roll': 'broll',
  'Personal Story': 'other',
  'F2 List': 'other',
  '': 'other',
};
for (const [label, want] of Object.entries(cases)) {
  assert.strictEqual(ctx.scriptType(label), want, label);
}

assert.strictEqual(ctx.parseBatchDate('Jan FINAL · 10.23.2026'), '2026-10-23');
assert.strictEqual(ctx.parseBatchDate('Jan Batch-01 · 7.11.2026'), '2026-07-11');
assert.strictEqual(ctx.parseBatchDate('no date'), '');
assert.strictEqual(ctx.weekStartMonday('2026-10-23'), '2026-10-19');

function group(batch, status, id) {
  return [{ id, batch, status, format: 'Reaction', created_at: '2026-07-01T00:00:00Z' }];
}
const newest = 'Jan FINAL · 10.23.2026';
const olderBatch = 'Jan Batch-01 · 7.11.2026';
const groups = [];
for (let i = 0; i < 6; i++) groups.push(group(newest, 'Filming', 'new-' + i));
groups.push(group(newest, 'Posted', 'posted-new'));
for (let i = 0; i < 30; i++) groups.push(group(olderBatch, i % 2 ? 'Posted' : 'Filming', 'old-' + i));
const part = ctx.freshPartition(groups, '2026-10-23');
assert.strictEqual(part.fresh.length, 6);
assert.strictEqual(part.previous.length, 31);
assert.strictEqual(part.thisWeek, true);
assert.strictEqual(part.batchNames.length, 1);
assert.strictEqual(part.batchNames[0], newest);
const older = ctx.freshPartition(groups, '2026-11-20');
assert.strictEqual(older.thisWeek, false);
assert.strictEqual(older.fresh.length, 6);

const rail = ctx.renderStatusRail('Filming');
const steps = [...rail.matchAll(/rail-step[^>]*>([^<]+)/g)].map(m => m[1]);
assert.deepStrictEqual(steps, ['Draft', 'Filming', 'Posted']);
assert.ok(!steps.includes('Filmed'));
assert.ok(rail.includes('is-on'));

assert.strictEqual(ctx.renderVideoSlot(''), '');
assert.strictEqual(ctx.renderVideoSlot('   '), '');
const yt = ctx.renderVideoSlot('https://www.youtube.com/watch?v=abcdefghijk');
assert.ok(yt.includes('youtube.com/embed/abcdefghijk'));
assert.ok(ctx.renderVideoSlot('https://cdn.example.com/walk.mp4').includes('<video'));

const reaction = {
  client_slug: 'jan',
  hook: 'Les Brown said something I think every single person building a business needs to hear.',
  full_script: [
    '[0:00–0:05] Les Brown said something I think every single person building a business needs to hear.',
    '',
    '[CLIP 0:05–0:10] "Someone\'s opinion of you does not have to become your reality."',
    '',
    '[0:10–0:14] Someone\'s opinion of you does not have to become your reality.',
    '',
    '[0:14–0:27] The reason this is so powerful is because most of us carry opinions.',
  ].join('\n'),
  cta: 'App Download',
  camera: 'Camera A — Talking Head',
  reference_clip: 'https://www.youtube.com/watch?v=abcdefghijk',
  filming_setup: 'LOCATION: Home office.\nSHOT LIST: 1) Say the hook 2) Hold for the clip\nMIC: Lav.',
  editor_notes: 'ON-SCREEN TEXT: 0:00 Their opinion is not your reality\nCaption: Full lesson in the app.\nAudio: No music under the hook.',
  tonality_delivery: 'Warm, then lean in.',
};
const flow = ctx.scriptFlow(reaction);
assert.strictEqual(flow.map(s => s.kind).join(','), 'hook,clip,beat,beat,cta');
assert.strictEqual(flow[0].label, 'Hook');
assert.strictEqual(flow[0].text.includes('Les Brown'), true);
assert.strictEqual(flow.filter(s => s.kind === 'hook').length, 1);
assert.strictEqual(flow[1].label, 'Clip 0:05');
assert.strictEqual(flow[flow.length - 1].label, 'CTA');
assert.strictEqual(flow[flow.length - 1].text, 'App Download');

const separate = ctx.scriptFlow({
  hook: 'Keep this first line exactly as written.',
  full_script: 'The body starts here and does not repeat the hook.\n\nSecond beat of the body.',
  cta: 'None — End Clean',
});
assert.strictEqual(separate.map(s => s.label).join('|'), 'Hook|Beat 1|Beat 2|CTA');
assert.strictEqual(separate[0].text, 'Keep this first line exactly as written.');
assert.strictEqual(separate[3].text, 'No spoken CTA. End on the last line.');

const numbered = ctx.scriptFlow({
  hook: 'Twenty years of coaching in 60 seconds.',
  full_script: 'One. That voice is not your enemy.\nTwo. A thought is not a verdict.',
  cta: '',
});
assert.strictEqual(numbered.map(s => s.label).join('|'), 'Hook|Beat One|Beat Two');

const pack = ctx.referencePack(reaction);
assert.strictEqual(pack.person, 'Jan Zands');
assert.ok(pack.camera.includes('Talking Head'));
assert.strictEqual(pack.shots.length, 2);
assert.ok(pack.onScreen.some(it => it.text.includes('Their opinion')));
assert.ok(pack.audio.some(a => /no music/i.test(a)));
assert.ok(pack.caption.includes('Full lesson'));
assert.strictEqual(pack.refs[0].kind, 'yt');
assert.ok(pack.notes.some(n => /Warm/.test(n)));

const ways = ctx.parseReadWays([
  'Calm conviction, 3/10. Offer, don\'t instruct.',
  '3 WAYS TO READ IT (Monica, Oct 15 call): A) Quiet conviction, like a fact you settled years ago. B) Like advising a friend over coffee. Warm, low. C) Slightly wry, then serious.',
  'MONICA VERSION: Yes, as written.',
].join('\n'));
assert.strictEqual(ways.ways.map(w => w.letter).join(''), 'ABC');
assert.ok(ways.ways[0].text.startsWith('Quiet conviction'));
assert.ok(ways.ways[2].text.includes('Slightly wry'));
assert.strictEqual(ways.note, 'Monica, Oct 15 call');
assert.ok(ways.before.startsWith('Calm conviction'));
assert.ok(ways.after.startsWith('MONICA VERSION'));
assert.strictEqual(ctx.parseReadWays('Warm, then lean in.').ways.length, 0);

const prepped = ctx.prepModel(Object.assign({}, reaction, {
  format: 'J1 · Blunt Declarative Stance',
  camera: 'Phone vertical 9:16, handheld selfie at eye level.',
  filming_direction: { Pacing: 'Steady, one take.', Tonality: 'Calm conviction, 3/10.', 'Visual Hook': 'Jan in the car.' },
  tonality_delivery: ways.before + '\n3 WAYS TO READ IT (Monica, Oct 15 call): A) Quiet. B) Warm. C) Wry.\nMONICA VERSION: Yes.',
  proof_stats: '7,499,192 views',
  reel_number: 1,
}));
assert.strictEqual(prepped.format, 'J1 · Blunt Declarative Stance');
assert.strictEqual(prepped.pacing, 'Steady, one take.');
assert.ok(/eye level/i.test(prepped.framing));
assert.strictEqual(prepped.waysKind, 'row');
assert.strictEqual(prepped.ways.length, 3);
assert.ok(prepped.ref && prepped.ref.kind === 'yt');
assert.ok(prepped.extras.some(ex => ex.label === 'MONICA VERSION' && ex.text === 'Yes.'));
assert.ok(prepped.extras.some(ex => ex.label === 'Visual Hook'));
assert.ok(!prepped.extras.some(ex => ex.label === 'Pacing'));
assert.ok(prepped.onScreen.some(it => /Their opinion/.test(it.text)));
assert.ok(prepped.caption.includes('Full lesson'));
assert.ok(prepped.audio.some(a => /no music/i.test(a)));
assert.strictEqual(prepped.metrics.views, '7,499,192');
assert.strictEqual(prepped.showMetrics, true);
assert.ok(!prepped.extras.some(ex => ex.label === 'Proof'));
assert.ok(!prepped.extras.some(ex => ex.label === 'Reference Metrics'));

const plain = ctx.prepModel(reaction);
assert.strictEqual(plain.react, null);
assert.strictEqual(plain.principles, '');
assert.strictEqual(plain.showMetrics, true);
assert.strictEqual(plain.metrics.views, '');
const plainHtml = ctx.prepReferenceHtml(plain);
assert.ok(plainHtml.includes('Watch the reference'));
assert.ok(plainHtml.includes('Open reference reel'));
assert.ok(plainHtml.includes('youtube.com/embed/abcdefghijk'));
assert.ok(!plainHtml.includes('Clip to react to'));
assert.ok(!plainHtml.includes('Format to match'));

const mel = {
  title: 'Reaction: Mel Robbins — Your Self-Doubt Is Lying to You',
  format: 'Reaction · David Reads Fast stack (C96PhruO6BC) · Mel react-to',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  clip_directions: 'REACT TO / SOURCE CLIP (Mel Robbins): https://www.youtube.com/shorts/wFbr2UUZ2Xo',
  camera: 'Phone vertical 9:16, eye level. Face lower half while Mel card is up.',
  filming_setup: 'LOCATION: Plain light wall.\nFRAMING: Phone handheld selfie.',
  proof_stats: [
    'FORMAT ref (@davidreadsfast C96PhruO6BC): 420,531 views · 12,957 likes · 495 comments · 536.4x',
    'REACT-TO (Mel Short wFbr2UUZ2Xo): 952,832 views · ~953K · 10.3x PASS',
  ].join('\n'),
  filming_direction: {
    Format: 'David Reads Fast REACTION STACK = FORMAT DNA only — hook → authority clip plays → react/apply → CTA. Keep same hook, rehook/apply length, cadence (~100–105s), idea, reward, emotional reward/next step (RICH).',
    Pacing: 'Spoken ~100–105s. 0–4s Monica hook to camera, then 4–40s the Mel clip plays while Monica stays silent and does not talk over the scar reveal, then 40–90s she resumes the full react and apply at the format length, then 90–105s the soft close. Do not shrink the apply to a one-liner or rush the last line.',
    Framing: 'Mel card on top. Face in the lower half. Then full frame.',
    'Reaction Clip': 'https://www.youtube.com/shorts/wFbr2UUZ2Xo',
    'React To': 'https://www.youtube.com/watch?v=wFbr2UUZ2Xo',
    'Reference Metrics': 'FORMAT C96PhruO6BC: 420,531v · 12,957L · 495c · REACT-TO Mel: ~953K',
  },
};
assert.strictEqual(ctx.reactionClipUrl(mel), 'https://www.youtube.com/shorts/wFbr2UUZ2Xo');
assert.strictEqual(ctx.reactionClipUrl(Object.assign({}, mel, {
  filming_direction: { 'Reaction Clip': 'https://www.instagram.com/reel/C96PhruO6BC/' },
  clip_directions: '',
})), '');
assert.strictEqual(ctx.reactionClipUrl({
  reference_clip: 'https://www.youtube.com/watch?v=abcdefghijk',
  proof_stats: 'see https://www.youtube.com/watch?v=zzzzzzzzzzz',
  clip_directions: 'General filming notes, no react link.',
}), '');
assert.strictEqual(ctx.reactionClipUrl({
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  clip_directions: 'SOURCE CLIP: https://www.youtube.com/shorts/wFbr2UUZ2Xo',
}), 'https://www.youtube.com/shorts/wFbr2UUZ2Xo');
const melPrep = ctx.prepModel(mel);
assert.strictEqual(melPrep.ref.kind, 'ig');
assert.strictEqual(melPrep.react.kind, 'yt');
assert.ok(melPrep.react.watch.includes('/shorts/wFbr2UUZ2Xo'));
assert.ok(melPrep.principles.includes('hook'));
assert.ok(melPrep.principles.includes('rehook/apply length'));
assert.ok(melPrep.principles.includes('cadence (~100–105s)'));
assert.ok(melPrep.principles.includes('idea'));
assert.ok(melPrep.principles.includes('reward'));
assert.ok(melPrep.principles.includes('emotional reward/next step (RICH)'));
assert.strictEqual(melPrep.showMetrics, true);
assert.strictEqual(melPrep.metrics.views, '420,531');
assert.strictEqual(melPrep.metrics.likes, '12,957');
assert.strictEqual(melPrep.metrics.comments, '495');
assert.ok(melPrep.pacing.length > 80);
assert.ok(ctx.tightCopy(melPrep.pacing).length < melPrep.pacing.length);
const melHtml = ctx.prepReferenceHtml(melPrep);
assert.ok(melHtml.indexOf('Clip to react to') < melHtml.indexOf('Format to match'));
assert.ok(melHtml.includes('Scroll if needed — this is what you react to.'));
assert.ok(melHtml.includes('youtube.com/embed/wFbr2UUZ2Xo'));
assert.ok(melHtml.includes('instagram.com/reel/C96PhruO6BC/embed/'));
assert.ok(melHtml.includes('Keep the same'));
assert.ok(melHtml.includes('Mel card on top'));
assert.ok(melHtml.includes('Full pacing note'));
assert.ok(melHtml.includes('Outlier metrics'));
assert.ok(melHtml.includes('420,531'));
assert.ok(melHtml.includes('id="react-clip"'));
assert.ok(!melHtml.includes('prep-react'));
assert.ok(!melHtml.includes('Open reference reel'));

assert.strictEqual(plain.waysKind, 'script');
assert.strictEqual(plain.ways.map(w => w.letter).join(''), 'ABC');
assert.ok(plain.ways[0].text.includes('Les Brown'));
assert.ok(plain.extras.some(ex => ex.label === 'Tonality'));
assert.strictEqual(plain.clientNotes, '');
assert.strictEqual(plain.pacing, 'Talking head. One take, conversational pace.');
assert.strictEqual(plain.framing, 'Talking head, vertical 9:16, eye level.');
assert.strictEqual(plain.pacingPrompt, false);

const s6Proof = [
  'REFERENCE METRICS (Step 1):',
  '109,468 views · 5,120 likes · 199 comments',
  'Outlier / x-median: 6.6x Apify median (16,592)',
  'Audience: PASS — NM (@frazerbrookesonline)',
  'Viral score / verdict: PASS',
  'Ref: https://www.instagram.com/reel/DUIafE1DJqb/',
  '',
  'Source: Apify Oct 23. REPLACED — old DenkBZACTmp was 264,624 views / 21 comments',
].join('\n');
const s6 = ctx.prepModel({
  title: '5 Questions to Ask Before You Join Any Opportunity',
  client_slug: 'jan',
  format: 'Numbered List Talking Head (@frazerbrookesonline · DUIafE1DJqb)',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  camera: 'Jan',
  filming_direction: {
    Format: 'Numbered-list talking-head / breakdown explainer.',
    Pacing: 'Punchy numbered list ~46s. One beat per question.',
    Framing: 'Mid talking-head at desk/mic. Phone on tripod, eye level, vertical 9:16.',
    'Reference Metrics': '109,468 views · 5,120 likes · 199 comments · 6.6x Apify median (16,592) · Audience: PASS — NM (@frazerbrookesonline) · Verdict: PASS',
    Tonality: 'Calm, plain.',
    framing: 'lowercase must not win',
  },
  proof_stats: s6Proof,
});
assert.strictEqual(s6.format, 'Numbered-list talking-head / breakdown explainer.');
assert.strictEqual(s6.pacing, 'Punchy numbered list ~46s. One beat per question.');
assert.ok(s6.framing.startsWith('Mid talking-head at desk/mic.'));
assert.strictEqual(s6.pacingPrompt, false);
assert.strictEqual(s6.framingPrompt, false);
assert.strictEqual(s6.metrics.views, '109,468');
assert.strictEqual(s6.metrics.likes, '5,120');
assert.strictEqual(s6.metrics.comments, '199');
assert.ok(s6.metrics.xMedian.includes('6.6x'));
assert.ok(!s6.metrics.xMedian.includes('264,624'));
assert.ok(s6.metrics.audience.includes('@frazerbrookesonline'));
assert.strictEqual(s6.metrics.viral, 'PASS');
assert.strictEqual(s6.showMetrics, true);
assert.ok(!s6.extras.some(ex => /^(format|pacing|framing|reference metrics|proof)$/i.test(ex.label)));
assert.ok(s6.extras.some(ex => ex.label === 'Tonality'));
const s6Html = ctx.prepMetricsHtml(s6.metrics);
assert.ok(s6Html.includes('Outlier metrics'));
assert.ok(s6Html.includes('109,468'));
assert.ok(s6Html.includes('x-median'));
assert.ok(!s6Html.includes('Not on this script'));

const s4 = ctx.referenceMetrics([
  'REFERENCE METRICS (Step 1):',
  '118,823 views · 8,343 likes · 1,602 comments',
  'Outlier / x-median: 41.3x Apify median (2,876) · Sandcastles 43.9x',
  'Audience: PASS — NM women (@rachaelbodie)',
  'Viral score / verdict: PASS',
  '',
  'Source: Apify. REPLACED — old was 188,678 views / 25 comments',
].join('\n'), {});
assert.strictEqual(s4.views, '118,823');
assert.strictEqual(s4.likes, '8,343');
assert.strictEqual(s4.comments, '1,602');
assert.ok(s4.xMedian.startsWith('41.3x'));
assert.ok(!s4.views.includes('188,678'));

const counts = ctx.extractProofStats('12,936 likes and 5.4M views');
assert.strictEqual(counts.find(row => row.label === 'Views').num, '5.4M');
assert.strictEqual(counts.find(row => row.label === 'Likes').num, '12,936');

const lower = ctx.prepModel({
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  format: 'Short label',
  camera: 'Jan',
  filming_direction: { framing: 'Lowercase desk shot.', pacing: 'Lowercase pace.' },
});
assert.strictEqual(lower.format, 'Short label');
assert.strictEqual(lower.framing, 'Lowercase desk shot.');
assert.strictEqual(lower.pacing, 'Lowercase pace.');

const gap = ctx.prepModel({
  title: 'No pace',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  format: 'Something else',
  camera: 'Jan',
});
assert.strictEqual(gap.format, 'Something else');
assert.strictEqual(gap.pacing, 'Add pacing in editor');
assert.strictEqual(gap.pacingPrompt, true);
assert.strictEqual(gap.framing, 'Add framing in editor');
assert.strictEqual(gap.framingPrompt, true);
assert.strictEqual(gap.showMetrics, true);
assert.strictEqual(gap.metrics.views, '');
const gapHtml = ctx.prepMetricsHtml(gap.metrics);
assert.ok(gapHtml.includes('—'));
assert.ok(gapHtml.includes('is-empty'));

const s5 = ctx.prepModel({
  id: 'e9f08bdc-dcc8-4468-94ec-0cc215bc0316',
  title: "Reaction: Bob Proctor's 6 Must-Read Books",
  client_slug: 'jan',
  format: 'Reaction + Listicle · greenscreen (@davidreadsfast · C96PhruO6BC)',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  filming_setup: 'LOCATION: Plain light wall at home.\nFRAMING: Phone handheld or tripod selfie, vertical 9:16, face in LOWER half.\nMIC: Lav or phone mic.\nSHOT LIST: 1) Hook line 2) Silent reaction while Proctor clip plays 3) Rapid list in one take 4) CTA\nTIME: ~59s.',
  clip_directions: 'REACT TO: https://www.youtube.com/watch?v=V_uebI9QpMg\nTrim only Think and Grow Rich.\nEDITOR SOUND: dialogue only under Monica.',
  editor_notes: 'AUDIO: dialogue only under Monica.\nCAPTION: Comment RICH.',
  filming_direction: {
    Format: 'Reaction + numbered listicle.',
    Pacing: '~59s davidreadsfast cadence.',
    Framing: 'Plain light wall. Face in the LOWER half.',
    'Reaction Clip': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
    'React To': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
    'EDITOR SOUND': 'dialogue only under Monica; Proctor clip audio.',
    'Reference Metrics': '420,531 views · 12,957 likes · 495 comments · 536.4x Sandcastles · Audience: Adjacent · Verdict: PASS',
  },
  proof_stats: '420,531 views · 12,957 likes · 495 comments\nOutlier / x-median: 536.4x Sandcastles\nAudience: Adjacent\nViral score / verdict: PASS',
});
assert.strictEqual(s5.ref.kind, 'ig');
assert.strictEqual(s5.ref.watch, 'https://www.instagram.com/reel/C96PhruO6BC/');
assert.strictEqual(s5.react.kind, 'yt');
assert.strictEqual(s5.react.watch, 'https://www.youtube.com/watch?v=V_uebI9QpMg');
assert.ok(s5.react.src.includes('youtube.com/embed/V_uebI9QpMg'));
assert.strictEqual(s5.metrics.views, '420,531');
assert.strictEqual(s5.showMetrics, true);
assert.ok(s5.audio.some(a => /dialogue only/i.test(a)));
assert.ok(s5.extras.some(ex => ex.label === 'Clip directions' && /Trim only/.test(ex.text)));
assert.ok(!s5.extras.some(ex => /^(reaction clip|react to)$/i.test(ex.label)));
const s5Html = ctx.prepStepHtml(s5, 0);
assert.ok(s5Html.indexOf('Clip to react to') < s5Html.indexOf('Format to match'));
assert.ok(s5Html.includes('Scroll if needed — this is what you react to.'));
assert.ok(s5Html.includes('https://www.instagram.com/reel/C96PhruO6BC/'));
assert.ok(s5Html.includes('https://www.youtube.com/watch?v=V_uebI9QpMg'));
assert.ok(s5Html.includes('instagram.com/reel/C96PhruO6BC/embed/'));
assert.ok(s5Html.includes('youtube.com/embed/V_uebI9QpMg'));
assert.ok(s5Html.includes('Outlier metrics'));
assert.ok(s5Html.includes('id="react-clip"'));
assert.ok(!s5Html.includes('class="prep-react"'));
assert.ok(!s5Html.includes('Open react-to clip'));
assert.ok(Array.isArray(s5.shots) && s5.shots.length === 4);
const s5Notes = ctx.prepStepHtml(s5, 1);
assert.ok(s5Notes.includes('Trim only Think and Grow Rich'));
assert.ok(/dialogue only/i.test(s5Notes));
assert.ok(s5Notes.includes('Silent reaction while Proctor clip plays'));
const quietHtml = ctx.prepStepHtml(prepped, 0);
assert.ok(!quietHtml.includes('>React to<'));
assert.ok(!quietHtml.includes('prep-react'));
assert.ok(quietHtml.includes('Open reference reel'));
assert.ok(quietHtml.includes('Outlier metrics'));

assert.strictEqual(ctx.reactionClipInfo({
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  filming_direction: { reaction_clip: 'https://www.youtube.com/watch?v=V_uebI9QpMg' },
}).watch, 'https://www.youtube.com/watch?v=V_uebI9QpMg');
assert.strictEqual(ctx.reactionClipInfo({
  filming_direction: { 'React To': 'Watch this https://youtu.be/V_uebI9QpMg today' },
}).watch, 'https://www.youtube.com/watch?v=V_uebI9QpMg');
assert.strictEqual(ctx.reactionClipInfo({
  reference_clip: 'https://www.youtube.com/watch?v=V_uebI9QpMg',
  filming_direction: { 'Reaction Clip': 'https://www.youtube.com/watch?v=V_uebI9QpMg' },
}), null);
assert.strictEqual(ctx.reactionClipInfo({ title: 'No clip' }), null);
assert.strictEqual(ctx.isReactionScript({ format: 'Reaction' }), true);
assert.strictEqual(ctx.isReactionScript({ format: 'Reaction + Listicle · greenscreen (@davidreadsfast)' }), true);
assert.strictEqual(ctx.isReactionScript({ format: 'Green-screen card' }), true);
assert.strictEqual(ctx.isReactionScript({ format: 'Personal Story', clip_directions: 'notes' }), false);
assert.strictEqual(ctx.isReactionScript({ format: 'F2 List', filming_direction: { 'React To': 'https://www.youtube.com/watch?v=V_uebI9QpMg' } }), true);
assert.strictEqual(ctx.showsReactClip({ format: 'Reaction', clip_directions: 'Say the line.' }), true);
assert.strictEqual(ctx.showsReactClip({ format: 'Personal Story', clip_directions: 'https://www.youtube.com/watch?v=V_uebI9QpMg' }), false);
assert.strictEqual(ctx.showsReactClip({
  format: 'Reaction + Listicle · greenscreen',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  filming_direction: {
    'Reaction Clip': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
    'React To': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
  },
}), true);

const dossier = ctx.renderDossierBody({
  id: 'e9f08bdc-dcc8-4468-94ec-0cc215bc0316',
  format: 'Reaction + Listicle · greenscreen (@davidreadsfast · C96PhruO6BC)',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  clip_directions: 'Trim only Think and Grow Rich. https://www.youtube.com/watch?v=V_uebI9QpMg',
  filming_direction: {
    'Reaction Clip': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
    'React To': 'https://www.youtube.com/watch?v=V_uebI9QpMg',
  },
});
assert.ok(dossier.includes('Format reference'));
assert.ok(dossier.includes('Format to match'));
assert.ok(dossier.includes('>React to<'));
assert.ok(dossier.includes('https://www.instagram.com/reel/C96PhruO6BC/'));
assert.ok(dossier.includes('https://www.youtube.com/watch?v=V_uebI9QpMg'));
assert.ok(dossier.includes('Open react-to clip'));
assert.ok(dossier.includes('Clip plays'));
const storyCard = ctx.renderDossierBody({
  id: 'story-1',
  format: 'Personal Story',
  clip_directions: 'General filming notes. No source clip.',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
});
assert.ok(storyCard.includes('Format reference'));
assert.ok(!storyCard.includes('>React to<'));
assert.ok(!storyCard.includes('Open react-to clip'));

const derived = ctx.prepModel({
  reference_clip: 'https://www.youtube.com/watch?v=abcdefghijk',
  format: 'Numbered List Talking Head',
  camera: 'Jan',
});
assert.strictEqual(derived.pacing, 'Numbered list. One beat per item.');
assert.strictEqual(derived.framing, 'Talking head, vertical 9:16, eye level.');

const bare = ctx.prepModel({ title: 'Bare' });
assert.strictEqual(bare.pacing, '');
assert.strictEqual(bare.framing, '');
assert.strictEqual(bare.showMetrics, false);

const desk = ctx.parseSetup('LOCATION: Seated office or home, plain wall.\nFRAMING: Mid talking-head desk/mic. Phone on tripod, eye level.', 'Jan');
assert.strictEqual(desk.location, 'Seated office or home, plain wall.');
assert.strictEqual(desk.mic, '');
assert.ok(/desk\/mic/i.test(desk.framing));

const outlierOnly = ctx.referenceMetrics('bradleysugars - 2,386,159 views, 2982.7x outlier score, 3,080 likes, 27 comments.', null);
assert.strictEqual(outlierOnly.views, '2,386,159');
assert.strictEqual(outlierOnly.likes, '3,080');
assert.strictEqual(outlierOnly.comments, '27');
assert.ok(/2982\.7x outlier score/i.test(outlierOnly.xMedian));
assert.strictEqual(outlierOnly.audience, '');
assert.strictEqual(outlierOnly.viral, '');

const notes = 'ON-SCREEN TEXT: OLD LINE\nCAPTION: Old caption.\nFILMING EASE: 4/5 — one location.';
const rewritten = ctx.setLabeledBlock(ctx.setLabeledBlock(ctx.setLabeledBlock(notes, 'ON-SCREEN TEXT', 'NEW LINE'), 'CAPTION', 'New caption.'), 'CLIENT NOTES', 'Say it warmer.');
assert.ok(rewritten.includes('ON-SCREEN TEXT: NEW LINE'));
assert.ok(rewritten.includes('CAPTION: New caption.'));
assert.ok(rewritten.includes('CLIENT NOTES: Say it warmer.'));
assert.ok(rewritten.includes('FILMING EASE: 4/5 — one location.'));
assert.strictEqual(ctx.setLabeledBlock(notes, 'CAPTION', ''), notes.replace('CAPTION: Old caption.\n', ''));

const editable = {
  hook: 'Old hook',
  full_script: 'Old body',
  cta: 'Old cta',
  editor_notes: notes,
  filming_direction: { Pacing: 'Steady', 'Text Hook': 'OLD LINE' },
};
assert.strictEqual(ctx.scriptEditValue(editable, 'on_screen'), 'OLD LINE');
assert.strictEqual(ctx.scriptEditValue(editable, 'caption'), 'Old caption.');
assert.strictEqual(ctx.scriptEditValue(editable, 'notes'), '');
const diff = ctx.scriptEditDiff(editable, {
  hook: 'New hook',
  on_screen: 'NEW LINE',
  body: 'Old body',
  cta: 'Old cta',
  caption: 'New caption.',
  notes: 'Say it warmer.',
});
assert.strictEqual(diff.changes.map(c => c.field).join(','), 'hook,on_screen,caption,notes');
assert.strictEqual(diff.patch.hook, 'New hook');
assert.strictEqual('full_script' in diff.patch, false);
assert.ok(diff.patch.editor_notes.includes('FILMING EASE: 4/5'));
assert.ok(diff.patch.editor_notes.includes('CLIENT NOTES: Say it warmer.'));
assert.strictEqual(diff.patch.filming_direction['Text Hook'], 'NEW LINE');
assert.strictEqual(diff.patch.filming_direction.Pacing, 'Steady');
const same = ctx.scriptEditDiff(editable, { hook: 'Old hook', body: 'Old body' });
assert.strictEqual(same.changes.length, 0);

const history = [
  { field: 'hook', before_text: 'First', after_text: 'Second', edited_at: '2026-10-24T02:00:00Z' },
  { field: 'hook', before_text: 'Original hook', after_text: 'First', edited_at: '2026-10-24T01:00:00Z' },
  { field: 'notes', before_text: '', after_text: 'A note', edited_at: '2026-10-24T03:00:00Z' },
];
assert.strictEqual(ctx.editOriginalMap(history).hook, 'Original hook');
assert.strictEqual(ctx.editOriginalMap(history).notes, '');
const restored = ctx.restoreEditValues({
  hook: 'Second',
  full_script: 'Body stays',
  cta: 'End',
  editor_notes: 'CLIENT NOTES: A note',
}, history);
assert.strictEqual(restored.hook, 'Original hook');
assert.strictEqual(restored.notes, '');
assert.strictEqual(restored.body, 'Body stays');
assert.strictEqual(restored.cta, 'End');

const csv = ctx.editsToCsv([{
  id: '1', script_id: 's', client: 'jan', field: 'hook',
  before_text: 'a, "b"', after_text: 'c', edited_by: 'Monica', edited_at: 't', reason: 'line\n2',
}]);
assert.ok(csv.startsWith('id,script_id,client,field,before_text,after_text,edited_by,edited_at,reason\n'));
assert.ok(csv.includes('"a, ""b"""'));
assert.ok(csv.includes('"line\n2"'));
assert.ok(csv.includes('Monica'));
const json = JSON.parse(ctx.editsToJson([{ field: 'cta', edited_by: 'Monica' }]));
assert.strictEqual(json[0].edited_by, 'Monica');
assert.strictEqual(ctx.editFieldLabel('on_screen'), 'On-screen text');
assert.strictEqual(ctx.editorLabel({ user_metadata: { full_name: 'Monica' }, email: 'x@y.com' }), 'Monica');
assert.strictEqual(ctx.editorLabel({ email: 'monica@example.com' }), 'Monica');
assert.strictEqual(ctx.editorLabel({ email: 'preview@localhost' }), 'Client');

assert.strictEqual(ctx.homeSlug(''), null);
assert.strictEqual(ctx.homeSlug(null), null);
assert.strictEqual(ctx.homeSlug('cristian'), 'cristian');
const adminHome = ctx.sessionLanding('admin', null);
assert.strictEqual(adminHome.viewSlug, null);
assert.strictEqual(adminHome.previewSlug, null);
assert.notStrictEqual(adminHome.viewSlug, 'andrew');
assert.strictEqual(ctx.sessionLanding('admin', 'cristian').viewSlug, 'cristian');
assert.strictEqual(ctx.sessionLanding('client', 'jan').viewSlug, 'jan');
assert.strictEqual(ctx.sessionLanding('client', 'andrew').viewSlug, 'andrew');

assert.strictEqual(ctx.isConferenceBatch('⭐ Floor Film · AIMW'), true);
assert.strictEqual(ctx.isConferenceBatch('CONFERENCE · floor-film'), true);
assert.strictEqual(ctx.isConferenceBatch('Andrew floor film pack'), true);
assert.strictEqual(ctx.isConferenceBatch('zz · archive · CONFERENCE'), false);
assert.strictEqual(ctx.isConferenceBatch('zz Floor Film'), false);
assert.strictEqual(ctx.isConferenceBatch('CONFERENCE archive'), false);
assert.strictEqual(ctx.isConferenceBatch('CORE Week 12'), false);
assert.strictEqual(ctx.isFloorFilmBatch('⭐ Floor Film'), true);
assert.strictEqual(ctx.isFloorFilmBatch('CONFERENCE interview'), false);

function segGroup(batch, status) {
  return [{ id: batch + status, batch: batch, status: status, format: 'Reaction', created_at: '2026-10-01T00:00:00Z' }];
}
assert.strictEqual(ctx.segmentOfGroup(segGroup('⭐ Floor Film', 'Needs Review')), 'conference');
assert.strictEqual(ctx.segmentOfGroup(segGroup('CONFERENCE · interviews', 'Posted')), 'conference');
assert.strictEqual(ctx.segmentOfGroup(segGroup('zz · archive · CONFERENCE', 'Needs Review')), 'other');
assert.strictEqual(ctx.segmentOfGroup(segGroup('CORE · Needs Review', 'Needs Review')), 'new');
assert.strictEqual(ctx.segmentOfGroup(segGroup('CORE · Needs Review', 'Posted')), 'other');
assert.strictEqual(ctx.segmentOfGroup(segGroup('zz leftover', 'Filming')), 'other');
assert.strictEqual(ctx.segmentOfGroup(segGroup('Old batch', 'Archived')), 'other');

const parts = ctx.partitionSegments([
  segGroup('CONFERENCE · interviews', 'Approved'),
  segGroup('⭐ Floor Film', 'Needs Review'),
  segGroup('CORE weekly', 'Needs Review'),
  segGroup('Posted last month', 'Posted'),
  segGroup('zz · archive · CONFERENCE', 'Needs Review'),
]);
assert.strictEqual(parts.conference.length, 2);
assert.strictEqual(parts.conference[0][0].batch, '⭐ Floor Film');
assert.strictEqual(parts.conference[1][0].batch, 'CONFERENCE · interviews');
assert.strictEqual(parts.new.length, 1);
assert.strictEqual(parts.new[0][0].batch, 'CORE weekly');
assert.strictEqual(parts.other.length, 2);

assert.strictEqual(ctx.prepPlan(false).labels.join('|'), 'Reference|Notes|Film');
assert.strictEqual(ctx.prepPlan(false).last, 2);
assert.strictEqual(ctx.prepPlan(true).labels.join('|'), 'Audit|Reference|Notes|Film');
assert.strictEqual(ctx.prepPlan(true).last, 3);
assert.strictEqual(ctx.prepContentIndex(0, false), 0);
assert.strictEqual(ctx.prepContentIndex(1, false), 1);
assert.strictEqual(ctx.prepContentIndex(2, false), 2);
assert.strictEqual(ctx.prepContentIndex(0, true), -1);
assert.strictEqual(ctx.prepContentIndex(1, true), 0);
assert.strictEqual(ctx.prepContentIndex(2, true), 1);
assert.strictEqual(ctx.prepContentIndex(3, true), 2);
ctx.role = 'client';
assert.strictEqual(ctx.prepShowsAudit(), false);
ctx.role = 'admin';
assert.strictEqual(ctx.prepShowsAudit(), true);
ctx.role = 'client';

const clientBody = ctx.prepStepBody(reaction, 0, false);
assert.strictEqual(clientBody, ctx.prepStepHtml(ctx.prepModel(reaction), 0));
assert.ok(clientBody.includes('Watch the reference'));
assert.ok(!clientBody.includes('How we built this'));
assert.ok(!clientBody.includes('Ready for client send'));
assert.strictEqual(ctx.prepStepBody(reaction, 1, true), ctx.prepStepHtml(ctx.prepModel(reaction), 0));
assert.strictEqual(ctx.prepStepBody(reaction, 2, true), ctx.prepStepHtml(ctx.prepModel(reaction), 1));
assert.strictEqual(ctx.prepStepBody(reaction, 3, true), ctx.prepStepHtml(ctx.prepModel(reaction), 2));

const emptyAudit = ctx.buildAudit({ title: 'Bare audit' });
assert.strictEqual(emptyAudit.saved, false);
assert.strictEqual(emptyAudit.ready.yes, false);
assert.ok(emptyAudit.ready.gapCount > 0);
const emptyLabels = emptyAudit.ready.blockers.map(b => b.label);
assert.ok(emptyLabels.some(l => l.indexOf('Offer') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('ICP') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Why this angle') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Keywords') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Search path') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Hook') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Format components') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Rehook') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Cadence') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Length vs ref') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Emotional reward') !== -1));
assert.ok(emptyLabels.some(l => l.indexOf('Spoken') !== -1));
assert.strictEqual(emptyAudit.gates.rows[0].status, 'pass');
assert.ok(/No open \[CONFIRM\]/.test(emptyAudit.gates.rows[0].why));
const emptyHtml = ctx.prepAuditHtml({ title: 'Bare audit' });
assert.ok(emptyHtml.includes('How we built this'));
assert.ok(emptyHtml.includes('No production audit is saved'));
assert.ok(emptyHtml.includes('>No<'));
assert.ok(emptyHtml.includes('GAP'));
assert.ok(emptyHtml.includes('Clients never see this step'));
assert.ok(!emptyHtml.includes('audit-link'));

const words = 'one two three four five six seven eight nine ten '.repeat(4).trim();
assert.strictEqual(ctx.spokenReadSeconds({ hook: words, full_script: '', cta: '' }), 16);
assert.strictEqual(ctx.parseSecondBand('Spoken ~100–105s. 0–4s hook.').label, '100–105s');
assert.strictEqual(ctx.parseSecondBand('vertical 9:16'), null);
assert.strictEqual(ctx.parseClockBand('Duration: 1:05').lo, 65);
assert.strictEqual(ctx.spokenInBand(16, { lo: 10, hi: 12, exact: false }), 'fail');
assert.strictEqual(ctx.spokenInBand(16, { lo: 10, hi: 20, exact: false }), 'pass');

const filled = {
  id: 'audit-1',
  title: 'System, not more ideas',
  client_slug: 'jan',
  format: 'Talking head',
  hook: words,
  full_script: 'The body stays on the idea and does not add a second story.',
  cta: 'Comment SYSTEM.',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  camera: 'Phone vertical 9:16, eye level.',
  filming_setup: 'FRAMING: Mid talking-head at a desk.',
  filming_direction: {
    Format: 'Numbered-list talking-head.',
    Pacing: 'Spoken ~40-55s. One beat.',
    Framing: 'Mid talking-head, vertical 9:16.',
    'Reference Metrics': '109,468 views · 6.6x Apify median',
  },
  proof_stats: '109,468 views\nOutlier / x-median: 6.6x Apify median\nSource: Apify Oct 23.',
  pipeline_audit: {
    offer: 'A film-ready system, not another tip.',
    icp: 'Founders who already know the story.',
    angle: 'You do not need more ideas.',
    angleWhy: 'The buyer is drowning in tips. The angle names the gap.',
    keywords: ['founder talking head', 'content system'],
    searchPath: 'Apify keyword search on founder talking-head, then kept ranks at or above 3x.',
    refs: [{
      url: 'https://www.instagram.com/reel/DUIafE1DJqb/',
      views: 109468,
      outlier: '6.6x',
      source: 'apify',
      creator: '@frazerbrookesonline',
    }],
    dna: {
      hook: { status: 'pass', why: 'First line keeps the reference hook.' },
      components: { status: 'pass', why: 'Talking head, one idea, then the ask.' },
      rehook: { status: 'pass', why: 'The turn is the second sentence.' },
      cadence: { status: 'pass', why: 'One beat, no extra story.' },
      length: { status: 'pass', why: 'Inside the reference band.' },
      idea: { status: 'pass', why: 'Same idea, their buyer.' },
      reward: { status: 'pass', why: 'One usable distinction.' },
      emotionalNext: { status: 'fail', why: 'The next step is harder than the reference.' },
    },
    spoken: { scriptSeconds: 46, refBand: '40-55s', ffprobeSeconds: 48, status: 'pass', why: 'Spoken 46s sits inside 40–55s. Ffprobe is 48s.' },
    gates: [],
    ready: false,
    readyWhy: 'The next step is still harder than the reference.',
  },
};
const built = ctx.buildAudit(filled);
assert.strictEqual(built.saved, true);
assert.strictEqual(built.ready.yes, false);
assert.ok(built.ready.blockers.some(b => /Emotional reward/.test(b.label) && b.status === 'fail'));
assert.strictEqual(built.offer.rows[0].status, 'pass');
assert.strictEqual(built.keywords.rows[0].status, 'pass');
assert.strictEqual(built.keywords.rows[1].status, 'pass');
assert.strictEqual(built.refs.rows[0].status, 'pass');
assert.strictEqual(built.refs.rows[0].href, 'https://www.instagram.com/reel/DUIafE1DJqb/');
assert.strictEqual(built.spoken.status, 'pass');
assert.ok(built.prep.rows.every(r => r.status === 'pass'));
assert.strictEqual(built.gates.openCount, 0);
const filledHtml = ctx.prepAuditHtml(filled);
assert.ok(filledHtml.includes('https://www.instagram.com/reel/DUIafE1DJqb/'));
assert.ok(filledHtml.includes('audit-link'));
assert.ok(filledHtml.includes('Open Instagram'));
assert.ok(filledHtml.includes('109,468'));
assert.ok(filledHtml.includes('Apify'));
assert.ok(filledHtml.includes('>PASS<'));
assert.ok(filledHtml.includes('>FAIL<'));
assert.ok(filledHtml.includes('The next step is harder than the reference.'));
assert.ok(filledHtml.includes('founder talking head'));
assert.ok(!filledHtml.includes('No production audit is saved'));
assert.strictEqual(ctx.prepStepHtml(ctx.prepModel(filled), 0).includes('How we built this'), false);

const fallback = ctx.buildAudit({
  title: 'Fallback reel',
  reference_clip: 'https://www.instagram.com/reel/DdbzuysjzzD/',
  hook: 'I do not care if you post every day.',
  full_script: 'Half of you will disagree. Here is the reason.',
  cta: 'Save this.',
  format: 'Talking head',
  filming_direction: { Format: 'Contrarian talking-head.', Pacing: 'Spoken ~30-45s.', Framing: 'Handheld selfie, vertical 9:16.' },
  proof_stats: '7,577,702 views\nOutlier / x-median: 1159.2x Sandcastles\nSource: Format vault. Apify monthly hard-limit exceeded — not live-scraped.',
  pipeline_audit: {
    offer: 'Offer',
    icp: 'Buyer',
    angle: 'Angle',
    angleWhy: 'Because the format already printed.',
    keywords: ['contrarian'],
    searchPath: 'Vault lookup after Apify quota.',
    toolRestricted: true,
    toolNote: 'Apify monthly hard-limit. Fell back to Sandcastles.',
    dna: {
      hook: 'pass — opener matches',
      components: 'pass — talking head plus one claim',
      rehook: 'pass — half will disagree',
      cadence: 'pass — claim then reason',
      length: 'pass — inside 30-45s',
      idea: 'pass — same idea',
      reward: 'pass — relief',
      emotionalNext: 'pass — save',
    },
    spoken: { scriptSeconds: 38, refBand: '30-45s', ffprobeSeconds: 38 },
  },
});
assert.ok(fallback.refs.toolFlag.includes('Apify quota forced a fallback'));
assert.ok(/Sandcastles/.test(fallback.refs.toolFlag));
assert.strictEqual(fallback.refs.rows[0].status, 'pass');
assert.ok(/Sandcastles/.test(fallback.refs.rows[0].meta));
assert.strictEqual(fallback.dna.rows.every(r => r.status === 'pass'), true);
assert.strictEqual(fallback.spoken.status, 'pass');
const fallbackHtml = ctx.prepAuditHtml({
  title: 'Fallback reel',
  reference_clip: 'https://www.instagram.com/reel/DdbzuysjzzD/',
  hook: 'I do not care if you post every day.',
  full_script: 'Half of you will disagree. Here is the reason.',
  cta: 'Save this.',
  format: 'Talking head',
  filming_direction: { Format: 'Contrarian talking-head.', Pacing: 'Spoken ~30-45s.', Framing: 'Handheld selfie, vertical 9:16.' },
  proof_stats: '7,577,702 views\nOutlier / x-median: 1159.2x Sandcastles\nSource: Format vault. Apify monthly hard-limit exceeded — not live-scraped.',
  pipeline_audit: fallback && {
    offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because the format already printed.',
    keywords: ['contrarian'], searchPath: 'Vault lookup after Apify quota.', toolRestricted: true,
    toolNote: 'Apify monthly hard-limit. Fell back to Sandcastles.',
    dna: { hook: 'pass — opener matches', components: 'pass — talking head plus one claim', rehook: 'pass — half will disagree', cadence: 'pass — claim then reason', length: 'pass — inside 30-45s', idea: 'pass — same idea', reward: 'pass — relief', emotionalNext: 'pass — save' },
    spoken: { scriptSeconds: 38, refBand: '30-45s', ffprobeSeconds: 38 },
  },
});
assert.ok(fallbackHtml.includes('Apify quota forced a fallback'));
assert.ok(fallbackHtml.includes('https://www.instagram.com/reel/DdbzuysjzzD/'));

const longSpoken = ctx.buildAudit({
  title: 'Too long',
  hook: words + ' ' + words,
  full_script: words,
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  pipeline_audit: { spoken: { refBand: '10-12s', ffprobeSeconds: 11 } },
});
assert.strictEqual(longSpoken.spoken.status, 'fail');
assert.ok(/outside the reference band 10–12s/.test(longSpoken.spoken.why));

const gated = ctx.buildAudit({
  title: 'Needs a number',
  hook: 'The number is the hook.',
  full_script: 'Say the real MRR.',
  editor_notes: '[CONFIRM] the MRR number before this goes to the client.\n⬜ Check the filming angle.',
  pipeline_audit: { gates: [{ item: 'Legal name of the offer', open: false }] },
});
assert.strictEqual(gated.gates.openCount, 2);
assert.ok(gated.gates.rows.some(r => r.status === 'fail' && /MRR number/.test(r.why)));
assert.ok(gated.gates.rows.some(r => r.status === 'fail' && /filming angle/.test(r.why)));
assert.ok(gated.gates.rows.some(r => r.status === 'pass' && /Legal name/.test(r.why)));
assert.strictEqual(ctx.teleprompterIssues({
  hook: 'Clean hook.',
  full_script: 'Clean body.',
  cta: 'Comment GO.',
}).issues.length, 0);
assert.ok(ctx.teleprompterIssues({
  hook: '[CONFIRM] say the number',
  full_script: 'Body.',
}).issues.length > 0);

const legacy = ctx.buildAudit({
  title: 'Legacy key',
  admin_audit: '{"offer":"Legacy offer","icp":"Legacy buyer","angle":"Legacy angle","angleWhy":"Because."}',
});
assert.strictEqual(legacy.saved, true);
assert.strictEqual(legacy.offer.rows[0].status, 'pass');
assert.strictEqual(legacy.offer.rows[0].why, 'Legacy offer');
const broken = ctx.buildAudit({ title: 'Broken', pipeline_audit: '{not json' });
assert.strictEqual(broken.broken, true);
assert.ok(broken.ready.blockers.some(b => /not valid JSON/.test(b.why)));
assert.ok(ctx.prepAuditHtml({ title: 'Broken', pipeline_audit: '{not json' }).includes('not valid JSON'));

const sourceOnly = ctx.buildAudit({
  title: 'Source note only',
  proof_stats: 'Source: Apify Oct 23. REPLACED — old ref.',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
});
assert.strictEqual(sourceOnly.keywords.rows[1].status, 'gap');
assert.ok(/Apify Oct 23/.test(sourceOnly.keywords.rows[1].why));

console.log('hub-logic tests passed');
