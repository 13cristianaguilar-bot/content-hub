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
  'clockSeconds', 'skimClockLabel', 'prompterSkimStops', 'prompterSkimTarget',
  'parseSetup', 'parseShots', 'parseOnScreen', 'videoInfo',
  'isHostedMediaUrl', 'isAudioMediaUrl', 'explicitPlayableUrl', 'mediaLockOf', 'hubStorageOrigin', 'storagePublicUrl',
  'pushUnique', 'resolveMediaValue', 'referenceHostedFile', 'referencePosterUrl', 'attachReferenceMedia',
  'openReferenceLabel', 'referenceOpenLink', 'hubPlayerHtml',
  'extractVideoLink', 'fdObject', 'pullLabeled', 'referencePack',
  'resourceKey', 'isResourceCard', 'resolveResourceImage', 'normalizeResourceCard',
  'clientResourcePackSlug', 'clientResourcePack', 'parseClientResources', 'resourceMap',
  'firstResourceText', 'formatDnaReminder', 'reviewRefs',
  'resourceCardSrc', 'mergeResourceCards', 'resourceInlineHtml', 'resourceMarkdownHtml', 'prompterResourceCardHtml',
  'prompterIsPhone', 'prompterRefPrefersOn', 'prompterRefStartsOn', 'clientResourceItems', 'prompterRefHtml', 'prompterResourcesHtml', 'prompterEmbed',
  'extractProofStats', 'parseReadWays', 'labeledChunks', 'prepShownNote',
  'clipKey', 'sameClip', 'formatPrinciples', 'tightCopy',
  'reactClipKey', 'hasReactClipKey', 'isReactionScript', 'reactionClipInfo', 'reactionClipUrl', 'showsReactClip',
  'fdPick', 'referenceMetrics', 'derivePrepPacing', 'derivePrepFraming', 'prepModel',
  'prepText', 'prepMetricsHtml', 'prepFact', 'prepParagraphs', 'prepFrame', 'prepOpenLink',
  'prepPlayer', 'prepTightFact', 'prepReferenceHtml', 'prepStepHtml',
  'prepShowsAudit', 'prepPlan', 'prepContentIndex', 'prepReferenceStep', 'prepTabReachable',
  'prepShowsStamp', 'prepStampBlocksTabs', 'prepQaHintHtml', 'prompterCanShowReference', 'prepStepBody',
  'humanQaNotePlaceholder', 'reviewHasResources',
  'normFormatKey', 'formatChipLabel', 'lockedFormatFromText', 'scriptLockedFormat',
  'collectIgHandles', 'collectShortcodes', 'outlierScore', 'reelClearsOutlierBar', 'outlierLabel',
  'reviewCreatorProof', 'reviewRefPosterHtml', 'reviewCreatorThumbsHtml', 'reviewClipSlotHtml', 'reviewReferenceHtml',
  'prepReadBodyHtml', 'clientLabel',
  'isRlaClient', 'normalizeQaChecks', 'humanQaChecks', 'humanQaReviewAction', 'humanQaContinueWarn', 'humanQaNotesOk', 'humanQaScriptHash',
  'normalizeQaFormats', 'vaultSlugKey', 'lockedFormatsForSlug', 'vaultFormatsForSlug',
  'vaultDnaValueFilled', 'vaultDnaAliases', 'formatCountsAsRecipe', 'vaultEmptyTitle', 'vaultEmptyBlocksStatus',
  'humanQaFormatSummary', 'humanQaFormatFieldsHtml',
  'unpackHumanQa', 'humanQaFrom',
  'humanQaComplete', 'humanQaStale', 'humanQaDeliveryReady', 'humanQaFilmStartDone', 'humanQaFilmEndDone',
  'prompterShowsFilmQa', 'prompterShouldForceStart', 'prompterShouldBlockClose',
  'isClientDeliveryStatus', 'humanQaBlocksStatus', 'humanQaValidate',
  'buildHumanQaStamp', 'attachHumanQaFilm', 'staleHumanQaAfterScriptChange', 'applyHumanQa', 'currentAuditObject', 'renderHumanQaBadge',
  'humanQaOpsPrefill', 'pipelineDnaObject', 'dnaFieldIsPass', 'thesisResourcePass', 'lengthBandPass', 'dnaStripHtml',
  'reviewBlockerBadges', 'reviewBlockerBadgesHtml', 'reviewStampAidsHtml',
  'renderHumanQaGate', 'prompterFilmQaHtml', 'humanQaFilmSurface', 'renderShotActions', 'formatStamp',
  'auditStatus', 'auditCount', 'auditNumLabel', 'auditScoreLabel', 'auditList', 'auditToolLabel',
  'auditSource', 'auditCheck', 'auditFact', 'parseSecondBand', 'parseClockBand',
  'spokenReadSeconds', 'spokenInBand', 'auditBlob', 'auditRestrictYes', 'auditRestricted',
  'collectConfirmGates', 'teleprompterIssues', 'auditHref', 'auditPick',
  'pacingWritten', 'framingWritten', 'parseLegacyAudit', 'unpackAudit', 'auditOwner', 'gateFromText', 'buildAudit',
  'auditBadge', 'auditRollup', 'auditSection', 'auditRowHtml',
  'gapIdentity', 'auditGapItems', 'batchTopGaps', 'scriptsFromGroups', 'gapSummaryLine', 'batchGapsHtml', 'scriptGapHtml', 'auditBatchStrip',
  'needsBrainCheck', 'reviewQueueRank', 'reviewQueueFor', 'readyQueueFor', 'stampQueueClientRank', 'stampQueueFor', 'stampQueueClients', 'stampQueueRailHtml', 'nextStampId',
  'deliveryStatusAction', 'deliveryActionHtml', 'listClientReadyHtml',
  'prepAuditHtml',
  'formatVaultCatalog', 'formatVaultClients', 'formatVaultHandle', 'vaultEmptyRecipeCopy', 'clientHasEmptyVault', 'formatVaultPeopleHtml', 'formatVaultDnaLines', 'formatVaultCreatorLines', 'formatVaultRecipeHtml', 'formatVaultCards', 'vaultReelShortcode', 'vaultReelWatchUrl', 'vaultPosterDataUri', 'vaultIgMediaUrl', 'vaultPosterSrc', 'vaultPosterHtml', 'vaultCardReels', 'vaultDevinJumpHtml', 'formatVaultCardHtml', 'vaultCreatorLane', 'vaultLaneLabel', 'vaultCreatorReels', 'vaultReelRowHtml', 'formatVaultFormatChips', 'formatVaultBrowseHtml', 'renderFormatVaultHtml',
  'dossierBlock', 'linkOrText', 'copyScriptButton', 'renderDossierBody',
  'setLabeledBlock', 'finalScriptEditAllowed', 'finalScriptEditDraft', 'prompterEditHtml', 'scriptEditValue', 'scriptEditDiff', 'editOriginalMap', 'restoreEditValues',
  'csvCell', 'editsToCsv', 'editsToJson', 'editFieldLabel', 'editorLabel',
  'homeSlug', 'sessionLanding', 'unseenReleasesFor',
];
const appVersion = (script.match(/const APP_VERSION = '([^']+)'/) || [])[1];
function extractAssignment(name) {
  const start = script.indexOf('const ' + name + ' =');
  if (start < 0) throw new Error('missing const ' + name);
  let i = script.indexOf('=', start) + 1;
  while (script[i] === ' ' || script[i] === '\n') i++;
  if (script[i] === "'" || script[i] === '"') {
    const q = script[i];
    const end = script.indexOf(q, i + 1);
    return script.slice(start, end + 1);
  }
  const open = script[i];
  const close = open === '[' ? ']' : open === '{' ? '}' : '';
  if (close) {
    let depth = 0;
    let quote = '';
    let esc = false;
    for (let j = i; j < script.length; j++) {
      const c = script[j];
      if (quote) {
        if (esc) { esc = false; continue; }
        if (c === '\\') { esc = true; continue; }
        if (c === quote) quote = '';
        continue;
      }
      if (c === "'" || c === '"') { quote = c; continue; }
      if (c === open) depth++;
      else if (c === close) {
        depth--;
        if (depth === 0) return script.slice(start, j + 1);
      }
    }
  }
  throw new Error('unclosed const ' + name);
}
const src = [
  "const STATUS_ORDER = ['Draft','Needs Review','Approved','Filming','Posted','Passed'];",
  extractAssignment('APP_VERSION') + ';',
  extractAssignment('HUMAN_QA_KEYS') + ';',
  'const HUMAN_QA_NOTE_MIN = 12;',
  "const WALKTHROUGH_VIDEO_URL = '';",
  extractAssignment('RELEASES'),
  "const CLIENTS = { jan: { name: 'Jan Zands', label: 'Jan' } };",
  extractAssignment('CLIENT_RESOURCE_BASE') + ';',
  extractAssignment('CLIENT_RESOURCE_PACKS'),
  extractAssignment('CLIENT_RESOURCE_MANIFESTS'),
  extractAssignment('FORMAT_VAULT'),
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
assert.ok(!melHtml.includes('instagram.com/reel/C96PhruO6BC/embed/'));
assert.ok(melHtml.includes('Open on Instagram'));
assert.ok(melHtml.includes('No hosted file'));
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
assert.ok(!s5Html.includes('instagram.com/reel/C96PhruO6BC/embed/'));
assert.ok(s5Html.includes('Open on Instagram'));
assert.ok(!s5Html.includes('class="embed-frame"'));
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

const ownScript = {
  id: '11111111-1111-1111-1111-111111111111',
  client_slug: 'jan',
  hook: 'Say this first.',
  full_script: 'The body line stays on camera.',
  cta: 'Comment FOLLOW',
  pipeline_audit: { tele: 'SECRET AUDIT' },
  editor_notes: 'ON-SCREEN TEXT: do not show this in the final editor',
};
const janSession = { role: 'client', mySlug: 'jan', viewSlug: 'jan', previewSlug: null };
assert.strictEqual(ctx.finalScriptEditAllowed(janSession, ownScript), true);
assert.strictEqual(ctx.finalScriptEditAllowed(janSession, { id: ownScript.id, client_slug: 'andrew' }), false);
assert.strictEqual(ctx.finalScriptEditAllowed({ role: 'client', mySlug: 'jan', viewSlug: 'andrew' }, ownScript), false);
assert.strictEqual(ctx.finalScriptEditAllowed({ role: 'admin', mySlug: 'cristian', viewSlug: 'jan', previewSlug: 'jan' }, ownScript), true);
assert.strictEqual(ctx.finalScriptEditAllowed({ role: 'admin', mySlug: 'cristian', viewSlug: 'jan', previewSlug: null }, ownScript), true);
assert.strictEqual(ctx.finalScriptEditAllowed({ role: 'admin', mySlug: 'cristian', viewSlug: 'cristian' }, { id: ownScript.id, client_slug: 'jan' }), false);
assert.strictEqual(ctx.finalScriptEditAllowed({ role: 'admin', mySlug: 'cristian', viewSlug: 'cristian' }, { id: ownScript.id, client_slug: 'cristian' }), true);
assert.strictEqual(ctx.finalScriptEditAllowed(janSession, { client_slug: 'jan' }), false);
assert.strictEqual(ctx.finalScriptEditAllowed({}, ownScript), false);
const finalDraft = ctx.finalScriptEditDraft(ownScript);
assert.strictEqual(finalDraft.hook, 'Say this first.');
assert.strictEqual(finalDraft.body, 'The body line stays on camera.');
assert.strictEqual(finalDraft.cta, 'Comment FOLLOW');
assert.strictEqual(ctx.scriptEditDiff(ownScript, ctx.finalScriptEditDraft(ownScript)).changes.length, 0);
finalDraft.body = 'The body line stays on camera. Warmer.';
const finalDiff = ctx.scriptEditDiff(ownScript, finalDraft);
assert.deepStrictEqual(Object.keys(finalDiff.patch).sort(), ['full_script']);
assert.strictEqual(finalDiff.patch.full_script, 'The body line stays on camera. Warmer.');
assert.strictEqual(finalDiff.changes[0].field, 'body');
assert.strictEqual('pipeline_audit' in finalDiff.patch, false);
const editHtml = ctx.prompterEditHtml(ownScript);
assert.ok(editHtml.includes('id="pr-edit-body"'));
assert.ok(editHtml.includes('The body line stays on camera.'));
assert.ok(editHtml.includes('Say this first.'));
assert.ok(editHtml.includes('Comment FOLLOW'));
assert.ok(!editHtml.includes('SECRET AUDIT'));
assert.ok(!editHtml.includes('do not show this'));
assert.ok(!editHtml.includes('pipeline_audit'));

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

assert.strictEqual(appVersion, '2026.10.28.8');
assert.ok(/WALKTHROUGH_VIDEO_URL = ''/.test(script));
assert.ok(/Paste a Loom, YouTube/.test(script));
assert.ok(!/function helpDismissed|let showHelp|window\.toggleHelp|hub_help_dismissed/.test(script));
const firstUnseen = ctx.unseenReleasesFor('', false, '');
assert.strictEqual(firstUnseen.length, 1);
assert.strictEqual(firstUnseen[0].version, '2026.10.28.8');
assert.strictEqual(firstUnseen[0].version, appVersion);
const releaseNotes = firstUnseen[0].items.join(' ');
assert.ok(/four boxes/.test(releaseNotes));
assert.ok(/Mark client-ready/.test(releaseNotes));
assert.ok(/batch list/.test(releaseNotes));
assert.ok(/Read/.test(releaseNotes));
assert.ok(/Format Vault/.test(releaseNotes));
assert.ok(/does not send/i.test(releaseNotes));
assert.ok(/Clients never see/.test(releaseNotes));
assert.ok(/Candace/.test(releaseNotes));
assert.ok(/Pierini/.test(releaseNotes));
assert.ok(/Lorin/.test(releaseNotes));
assert.ok(/viewing as that client/.test(releaseNotes));
assert.ok(/Approved/.test(releaseNotes));
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.8', false, '').length, 0);
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.7', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.6', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.5', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.4', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.3', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.2', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.1', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.27.5', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.27.4', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.27.3', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.27.2', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.27.1', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.26.3', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.26.2', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.26.1', false, '')[0].version, '2026.10.28.8');
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.4', true, '').length, 1);
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.8', true, '2026.10.28.8').length, 0);
assert.strictEqual(ctx.unseenReleasesFor('2026.10.28.3', true, '2026.10.24.2')[0].version, '2026.10.28.8');
assert.ok(script.includes('Replay client onboarding'));
assert.ok(script.includes('hub_preview_onboarding_seen'));

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
assert.strictEqual(ctx.prepPlan(true).labels.join('|'), 'Read|Audit|Reference|Notes|Film');
assert.strictEqual(ctx.prepPlan(true).last, 4);
assert.strictEqual(ctx.prepContentIndex(0, false), 0);
assert.strictEqual(ctx.prepContentIndex(1, false), 1);
assert.strictEqual(ctx.prepContentIndex(2, false), 2);
assert.strictEqual(ctx.prepContentIndex(0, true), -2);
assert.strictEqual(ctx.prepContentIndex(1, true), -1);
assert.strictEqual(ctx.prepContentIndex(2, true), 0);
assert.strictEqual(ctx.prepContentIndex(3, true), 1);
assert.strictEqual(ctx.prepContentIndex(4, true), 2);
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
assert.ok(!clientBody.includes('Cristian brain check'));
assert.ok(!clientBody.includes('Sign the brain check'));
assert.strictEqual(ctx.prepStepBody(reaction, 2, true), ctx.prepStepHtml(ctx.prepModel(reaction), 0));
assert.strictEqual(ctx.prepStepBody(reaction, 3, true), ctx.prepStepHtml(ctx.prepModel(reaction), 1));
assert.strictEqual(ctx.prepStepBody(reaction, 4, true), ctx.prepStepHtml(ctx.prepModel(reaction), 2));
const readFirst = ctx.prepStepBody({
  id: 'r1', title: 'Growth Reveals Your Circle', client_slug: 'jan', status: 'Needs Review',
  batch: 'Jan FINAL · 10.23.2026', hook: 'Say the hook line.', full_script: 'The body stays on leadership.', cta: 'Comment GROW.',
}, 0, true);
assert.ok(readFirst.includes('Read + stamp'));
assert.ok(readFirst.includes('Say the hook line.'));
assert.ok(readFirst.includes('The body stays on leadership.'));
assert.ok(readFirst.includes('Comment GROW.'));
assert.ok(readFirst.includes('Resources'));
assert.ok(readFirst.indexOf('Say the hook line.') < readFirst.indexOf('The body stays on leadership.'));
assert.ok(!readFirst.includes('How we built this'));
assert.ok(!readFirst.includes('Top Gaps'));
const andrewRead = ctx.prepStepBody({ id: 'r2', title: 'Other', client_slug: 'andrew', hook: 'Hook.', full_script: 'Body.', cta: 'End.' }, 0, true);
assert.ok(!andrewRead.includes('review-res-btn'));
assert.strictEqual(ctx.prepStepBody(reaction, 1, true), ctx.prepAuditHtml(reaction));

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

assert.strictEqual(ctx.auditStatus('SOFT'), 'soft_pass');
assert.strictEqual(ctx.auditStatus('SOFT PASS'), 'soft_pass');
assert.strictEqual(ctx.auditStatus('HOLD'), 'hold');
assert.strictEqual(ctx.auditStatus('PASS (top of band)'), 'pass');
assert.strictEqual(ctx.auditStatus('PASS (soft audience)'), 'soft_pass');
assert.strictEqual(ctx.auditStatus('PASS-adjacent — grant seekers'), 'soft_pass');
assert.strictEqual(ctx.auditStatus('Directional PASS (fundraising creators)'), 'soft_pass');
assert.notStrictEqual(ctx.auditStatus('SOFT'), 'pass');
assert.notStrictEqual(ctx.auditStatus('HOLD'), 'pass');
assert.strictEqual(ctx.auditCheck(['SOFT', 'Left long on purpose.'], 'missing').status, 'soft_pass');
assert.strictEqual(ctx.auditCheck(['SOFT', 'Left long on purpose.'], 'missing').why, 'Left long on purpose.');
assert.strictEqual(ctx.auditRollup([{ status: 'pass' }, { status: 'soft_pass' }]), 'soft_pass');
assert.strictEqual(ctx.auditRollup([{ status: 'soft_pass' }, { status: 'hold' }]), 'hold');
assert.strictEqual(ctx.auditRollup([{ status: 'hold' }, { status: 'fail' }]), 'fail');

const dnaPass = {
  hook: { status: 'pass', why: 'Hook matches.' },
  components: { status: 'pass', why: 'Components match.' },
  rehook: { status: 'pass', why: 'Rehook matches.' },
  cadence: { status: 'pass', why: 'Cadence matches.' },
  length: { status: 'pass', why: 'Inside the band.' },
  idea: { status: 'pass', why: 'Same idea.' },
  reward: { status: 'pass', why: 'Reward matches.' },
  emotionalNext: { status: 'pass', why: 'Next step matches.' },
};
const softOnly = ctx.buildAudit({
  title: 'Soft length',
  hook: 'Clean hook for the teleprompter.',
  full_script: 'Clean body for the teleprompter.',
  cta: 'Comment GO.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  filming_direction: { Format: 'Talking-head.', Pacing: 'Spoken ~20-40s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '10,000 views\nOutlier / x-median: 4x',
  pipeline_audit: {
    offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
    keywords: ['founder'], searchPath: 'Logged search.',
    refs: [{ url: 'https://www.instagram.com/reel/DUIafE1DJqb/', views: 10000, outlier: '4x', source: 'apify' }],
    dna: Object.assign({}, dnaPass, { length: { status: 'soft_pass', why: 'Top of the band. Left long on purpose.' } }),
    spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'soft_pass', why: 'Top of the band. Accepted.' },
    ready: true,
  },
});
assert.strictEqual(softOnly.ready.yes, true);
assert.strictEqual(softOnly.dna.rows.filter(r => r.label === 'Length vs ref')[0].status, 'soft_pass');
assert.strictEqual(softOnly.spoken.status, 'soft_pass');
assert.ok(!softOnly.ready.blockers.some(b => b.status === 'soft_pass'));
const softHtml = ctx.prepAuditHtml({
  title: 'Soft length',
  hook: 'Clean hook for the teleprompter.',
  full_script: 'Clean body for the teleprompter.',
  cta: 'Comment GO.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  filming_direction: { Format: 'Talking-head.', Pacing: 'Spoken ~20-40s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '10,000 views\nOutlier / x-median: 4x',
  pipeline_audit: {
    offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
    keywords: ['founder'], searchPath: 'Logged search.',
    refs: [{ url: 'https://www.instagram.com/reel/DUIafE1DJqb/', views: 10000, outlier: '4x', source: 'apify' }],
    dna: Object.assign({}, dnaPass, { length: { status: 'soft_pass', why: 'Top of the band. Left long on purpose.' } }),
    spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'soft_pass', why: 'Top of the band. Accepted.' },
    ready: true,
  },
});
assert.ok(softHtml.includes('>SOFT<'));
assert.ok(softHtml.includes('>Yes<'));
assert.ok(softHtml.includes('Top of the band. Left long on purpose.'));

const held = ctx.buildAudit({
  title: 'Held turn',
  hook: 'Clean hook for the teleprompter.',
  full_script: 'Clean body for the teleprompter.',
  cta: 'Comment GO.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  filming_direction: { Format: 'Talking-head.', Pacing: 'Spoken ~20-40s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '10,000 views\nOutlier / x-median: 4x',
  pipeline_audit: {
    offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
    keywords: ['founder'], searchPath: 'Logged search.',
    refs: [{ url: 'https://www.instagram.com/reel/DUIafE1DJqb/', views: 10000, outlier: '4x', source: 'apify' }],
    dna: Object.assign({}, dnaPass, { rehook: { status: 'hold', why: 'Cristian has to lock the turn.' } }),
    spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'pass', why: 'Inside.' },
    ready: true,
  },
});
assert.strictEqual(held.ready.yes, false);
assert.strictEqual(held.dna.rows.filter(r => r.label === 'Rehook')[0].status, 'hold');
assert.ok(held.ready.blockers.some(b => b.status === 'hold' && /lock the turn/.test(b.why)));
assert.ok(ctx.prepAuditHtml({
  title: 'Held turn',
  hook: 'Clean hook for the teleprompter.',
  full_script: 'Clean body for the teleprompter.',
  cta: 'Comment GO.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DUIafE1DJqb/',
  filming_direction: { Format: 'Talking-head.', Pacing: 'Spoken ~20-40s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '10,000 views\nOutlier / x-median: 4x',
  pipeline_audit: held.saved && {
    offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
    keywords: ['founder'], searchPath: 'Logged search.',
    refs: [{ url: 'https://www.instagram.com/reel/DUIafE1DJqb/', views: 10000, outlier: '4x', source: 'apify' }],
    dna: Object.assign({}, dnaPass, { rehook: { status: 'hold', why: 'Cristian has to lock the turn.' } }),
    spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'pass', why: 'Inside.' },
    ready: true,
  },
}).includes('>HOLD<'));
assert.ok(/says ready, but open checks still block/.test(held.ready.why));

const ops = ctx.buildAudit({
  title: 'Intention vs Impact',
  hook: 'If your engagement looks good on paper, the mission is not the problem.',
  full_script: 'Intention and impact are not the same room.',
  cta: 'Comment BUYIN.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DeJ9TelO4RM/',
  filming_direction: { Format: 'Contrarian talking-head.', Pacing: 'Spoken ~70-80s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '901,845 views\nOutlier / x-median: 38.2x Sandcastles',
  pipeline_audit: {
    offer_icp_angle: {
      offer: 'ID3A Jam holds intention and impact equally',
      icp: 'Orgs whose engagement looks good on paper',
      angle: 'Intention versus impact, transplanted',
      verdict: 'PASS (soft audience)',
      why: 'Offer fit is strong. Audience is a format transplant.',
    },
    keywords: {
      documented: 'GAP — no keyword log for this reel',
      inferred_path: 'Contrarian two-movies reframe. Inferred only.',
      verdict: 'GAP',
      why: 'Search path not logged.',
    },
    ref: {
      url: 'https://www.instagram.com/reel/DeJ9TelO4RM/',
      handle: '@goodmorgantherapy',
      views: '901,845',
      likes: '40,071',
      comments: '333',
      outlier: '38.2x',
      source: 'Sandcastles',
      tool_restriction: 'Y — Sandcastles-only; Apify not used',
      why_ref: 'Huge views and a clean contrarian reframe.',
      audience: 'SOFT PASS — therapy creator; format transplant only',
    },
    dna: {
      hook: ['PASS', 'Contrarian open matches.'],
      components: ['PASS', 'Conflict then reframe.'],
      rehook: ['PASS', 'The column split is the rehook.'],
      cadence: ['PASS', 'Office yap.'],
      length: ['SOFT', 'About one second over the band. Left intact.'],
      idea: ['PASS', 'Same reframe.'],
      reward: ['PASS', 'Quiz next step.'],
      emotional: ['PASS', 'Shame to clarity.'],
    },
    spoken: {
      est: '~80.8s',
      band: '70–80s',
      ref_ffprobe: '76.7s',
      verdict: 'SOFT — 0.8–1s over band',
      why: 'Left intact on purpose.',
    },
    film_prep: {
      fpf: 'PASS — Format, pacing, and framing are filled.',
      metrics: 'PASS — views are above the fold.',
      tele: 'PASS — teleprompter is clean.',
    },
    confirms: [
      'ManyChat keyword BUYIN is placeholder — not live; Cristian must lock it before send',
      'Austin local proof is still empty. Film the default.',
    ],
    blockers: ['ManyChat keyword not locked', 'Austin proof empty (MASS film OK)'],
    gaps: ['Keywords/search path not logged', 'Soft audience transplant', 'Spoken ~1s over band'],
    ready: true,
  },
});
assert.strictEqual(ops.keywords.rows[0].status, 'gap');
assert.strictEqual(ops.keywords.rows[0].chips.length, 0);
assert.ok(/Inferred only/.test(ops.keywords.rows[0].inferred));
assert.ok(!/GAP — no keyword log/.test((ops.keywords.rows[0].chips || []).join(' ')));
assert.strictEqual(ops.keywords.rows[1].status, 'gap');
assert.strictEqual(ops.refs.rows[0].href, 'https://www.instagram.com/reel/DeJ9TelO4RM/');
assert.ok(/Huge views/.test(ops.refs.rows[0].why));
assert.strictEqual(ops.refs.rows[0].audienceStatus, 'soft_pass');
assert.ok(/therapy creator/.test(ops.refs.rows[0].audienceWhy));
assert.ok(/Apify quota forced a fallback/.test(ops.refs.toolFlag));
assert.ok(/Sandcastles/.test(ops.refs.toolFlag));
assert.strictEqual(ops.dna.rows.filter(r => r.label === 'Length vs ref')[0].status, 'soft_pass');
assert.strictEqual(ops.spoken.status, 'soft_pass');
assert.strictEqual(ops.ready.yes, false);
assert.ok(ops.gates.rows.some(r => r.status === 'hold' && /ManyChat/.test(r.why)));
assert.ok(ops.gates.rows.some(r => r.status === 'soft_pass' && /Austin/.test(r.why)));
assert.ok(!ops.ready.blockers.some(b => /Austin/.test(b.why) && b.status !== 'soft_pass'));
const opsHtml = ctx.prepAuditHtml({
  title: 'Intention vs Impact',
  hook: 'If your engagement looks good on paper, the mission is not the problem.',
  full_script: 'Intention and impact are not the same room.',
  cta: 'Comment BUYIN.',
  format: 'Talking head',
  reference_clip: 'https://www.instagram.com/reel/DeJ9TelO4RM/',
  filming_direction: { Format: 'Contrarian talking-head.', Pacing: 'Spoken ~70-80s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '901,845 views\nOutlier / x-median: 38.2x Sandcastles',
  pipeline_audit: {
    offer_icp_angle: {
      offer: 'ID3A Jam holds intention and impact equally',
      icp: 'Orgs whose engagement looks good on paper',
      angle: 'Intention versus impact, transplanted',
      verdict: 'PASS (soft audience)',
      why: 'Offer fit is strong. Audience is a format transplant.',
    },
    keywords: {
      documented: 'GAP — no keyword log for this reel',
      inferred_path: 'Contrarian two-movies reframe. Inferred only.',
      verdict: 'GAP',
      why: 'Search path not logged.',
    },
    ref: {
      url: 'https://www.instagram.com/reel/DeJ9TelO4RM/',
      handle: '@goodmorgantherapy',
      views: '901,845',
      outlier: '38.2x',
      source: 'Sandcastles',
      tool_restriction: 'Y — Sandcastles-only; Apify not used',
      why_ref: 'Huge views and a clean contrarian reframe.',
      audience: 'SOFT PASS — therapy creator; format transplant only',
    },
    dna: {
      hook: ['PASS', 'Contrarian open matches.'],
      length: ['SOFT', 'About one second over the band. Left intact.'],
      emotional: ['PASS', 'Shame to clarity.'],
    },
    spoken: { verdict: 'SOFT — 0.8–1s over band', why: 'Left intact on purpose.', band: '70–80s' },
    confirms: ['ManyChat keyword BUYIN is placeholder — not live; Cristian must lock it before send'],
    ready: true,
  },
});
assert.ok(opsHtml.includes('https://www.instagram.com/reel/DeJ9TelO4RM/'));
assert.ok(opsHtml.includes('Open Instagram'));
assert.ok(opsHtml.includes('Inferred, not documented'));
assert.ok(opsHtml.includes('>SOFT<'));
assert.ok(opsHtml.includes('>HOLD<'));
assert.ok(opsHtml.includes('>No<'));
assert.ok(opsHtml.includes('Ready to send?'));
assert.ok(opsHtml.includes('Apify quota forced a fallback'));
assert.ok(!opsHtml.includes('>GAP — no keyword log'));

const legacyStamp = [
  'Offer: ID3A Jam buy-in',
  'ICP: Nonprofit EDs',
  'Angle: Funders want proof',
  'Why this angle: The reference already runs the pattern.',
  'Keywords: GAP — search path not logged',
  'Search path: GAP — not logged',
  'Inferred: fundraising outliers',
  'Reference: https://www.instagram.com/reel/DdovX4Utsqj/',
  '199,209 views · 67.6x outlier · Sandcastles',
  'Why this ref: Comment CTA maps to the offer.',
  'Audience: SOFT PASS — therapy creator, format transplant only',
  'Hook: PASS — first line matches',
  'Length: SOFT — top of band, left long on purpose',
  'Rehook: HOLD — Cristian has to lock the turn',
  'Apify IG monthly limit. Not live-scraped. Shown from Sandcastles.',
  'Ready to send: NO',
].join('\n');
const stamped = ctx.buildAudit({
  title: 'Stamped before JSON',
  hook: 'Fundraising advice I wish every ED had.',
  full_script: 'The body stays on buy-in.',
  cta: 'Comment BUYIN.',
  filming_direction: { 'Admin Audit': legacyStamp, Format: 'Talking-head.', Pacing: 'Spoken ~80-90s.', Framing: 'Eye-level.' },
});
assert.strictEqual(stamped.saved, true);
assert.strictEqual(stamped.legacy, true);
assert.strictEqual(stamped.refs.rows.filter(r => r.href).length, 1);
assert.strictEqual(stamped.refs.rows[0].href, 'https://www.instagram.com/reel/DdovX4Utsqj/');
assert.ok(/199,209/.test(stamped.refs.rows[0].meta));
assert.ok(!/invented/.test(JSON.stringify(stamped.refs.rows)));
assert.strictEqual(stamped.dna.rows.filter(r => r.label === 'Hook')[0].status, 'pass');
assert.strictEqual(stamped.dna.rows.filter(r => r.label === 'Length vs ref')[0].status, 'soft_pass');
assert.strictEqual(stamped.dna.rows.filter(r => r.label === 'Rehook')[0].status, 'hold');
assert.strictEqual(stamped.keywords.rows[0].status, 'gap');
assert.ok(/fundraising outliers/.test(stamped.keywords.rows[0].inferred));
assert.ok(/quota forced a fallback/.test(stamped.refs.toolFlag));
assert.strictEqual(stamped.ready.yes, false);
assert.ok(!JSON.stringify(stamped.refs.rows).includes('https://www.instagram.com/reel/NOTREAL'));

const sharedAudit = {
  offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
  keywords: { documented: 'GAP — no keyword log', verdict: 'GAP', why: 'Search path not logged.', inferred_path: 'fundraise outliers' },
  toolRestricted: true,
  toolNote: 'Apify monthly hard-limit. Fell back to Sandcastles.',
  refs: [{ url: 'https://www.instagram.com/reel/DdovX4Utsqj/', views: 199209, outlier: '67.6x', source: 'sandcastles', why_ref: 'The comment CTA fits.' }],
  dna: dnaPass,
  spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'pass', why: 'Inside.' },
  confirms: ['ManyChat keyword BUYIN is placeholder — not live; Cristian must lock it before send'],
  ready: false,
};
const cardBits = {
  hook: 'Clean hook for the teleprompter.',
  full_script: 'Clean body for the teleprompter.',
  cta: 'Comment GO.',
  format: 'Talking head',
  filming_direction: { Format: 'Talking-head.', Pacing: 'Spoken ~20-40s.', Framing: 'Eye-level phone, vertical 9:16.' },
  proof_stats: '10,000 views\nOutlier / x-median: 4x',
};
const batch = ctx.batchTopGaps([
  Object.assign({ id: 'a', title: 'Mission statement' }, cardBits, { pipeline_audit: sharedAudit }),
  Object.assign({ id: 'b', title: 'Sticky notes' }, cardBits, { pipeline_audit: sharedAudit, reference_clip: 'https://www.instagram.com/reel/DbeOK3pBTZ7/' }),
  Object.assign({ id: 'c', title: 'Gamma only' }, cardBits, {
    pipeline_audit: {
      offer: 'Offer', icp: 'Buyer', angle: 'Angle', angleWhy: 'Because.',
      keywords: ['logged'], searchPath: 'Logged on this one.',
      refs: [{ url: 'https://www.instagram.com/reel/DUIafE1DJqb/', views: 10000, outlier: '4x', source: 'apify' }],
      dna: dnaPass,
      spoken: { scriptSeconds: 30, refBand: '20-40s', status: 'pass', why: 'Inside.' },
      gaps: ['Unique proof name for Gamma only'],
      ready: true,
    },
  }),
]);
assert.ok(batch.some(item => item.key === 'shared-confirm' && item.titles.join('|') === 'Mission statement|Sticky notes'));
assert.ok(batch.some(item => item.key === 'shared-keywords' && item.owner === 'Ops'));
assert.ok(batch.some(item => item.key === 'shared-tool' && /Sandcastles|fallback|Apify/.test(item.why)));
assert.ok(!batch.some(item => /Unique proof name/.test(item.why) || /Gamma only/.test(item.titles.join(' '))));
assert.strictEqual(ctx.batchTopGaps([Object.assign({ title: 'Solo' }, cardBits, { pipeline_audit: sharedAudit })]).length, 0);
ctx.role = 'admin';
const strip = ctx.batchGapsHtml([
  [Object.assign({ id: 'a', title: 'Mission statement' }, cardBits, { pipeline_audit: sharedAudit })],
  [Object.assign({ id: 'b', title: 'Sticky notes' }, cardBits, { pipeline_audit: sharedAudit })],
]);
assert.ok(strip.includes('Top Gaps across this batch'));
assert.ok(strip.includes('Mission statement'));
assert.ok(strip.includes('Cristian'));
assert.ok(strip.includes('>HARD<'));
assert.ok(strip.includes('<details>'));
assert.ok(!/<details[^>]*\bopen\b/.test(strip));
const stripSum = (strip.match(/class="batch-gaps-sum">([^<]*)</) || [])[1] || '';
assert.ok(/^\d+ open · /.test(stripSum));
assert.ok(!stripSum.includes('Mission statement'));
ctx.role = 'client';
assert.strictEqual(ctx.batchGapsHtml([[{ title: 'Mission statement', pipeline_audit: sharedAudit }]]), '');
assert.ok(!ctx.prepStepBody({ title: 'Client card', hook: 'Hook.' }, 0, false).includes('Top Gaps'));
assert.ok(!ctx.prepStepBody({ title: 'Client card', hook: 'Hook.' }, 0, false).includes('How we built this'));

assert.strictEqual(ctx.prompterRefPrefersOn({ role: 'admin' }), true);
assert.strictEqual(ctx.prompterRefPrefersOn({ role: 'client' }), false);
assert.strictEqual(ctx.prompterRefPrefersOn({}), false);
assert.strictEqual(ctx.prompterIsPhone(), false);
assert.strictEqual(ctx.prompterRefStartsOn({ role: 'admin' }), true);
assert.strictEqual(ctx.prompterRefStartsOn({ role: 'client' }), false);
ctx.window = { matchMedia: (q) => ({ matches: /max-width:\s*899px/.test(q) }) };
assert.strictEqual(ctx.prompterIsPhone(), true);
assert.strictEqual(ctx.prompterRefStartsOn({ role: 'admin' }), false);
assert.strictEqual(ctx.prompterRefStartsOn({ role: 'client' }), false);
ctx.window = { matchMedia: () => ({ matches: false }) };
assert.strictEqual(ctx.prompterIsPhone(), false);
assert.strictEqual(ctx.prompterRefStartsOn({ role: 'admin' }), true);
delete ctx.window;

const parsedRes = ctx.parseClientResources({
  thesis: 'Founders need a publishing rhythm, not more tips.',
  do_not_say: 'No invented revenue.',
});
assert.strictEqual(ctx.resourceMap(parsedRes).thesis.text, 'Founders need a publishing rhythm, not more tips.');
assert.ok(ctx.parseClientResources('Just a markdown reminder.').markdown.includes('markdown reminder'));
assert.strictEqual(ctx.parseClientResources(null).items.length, 0);

const reviewScript = {
  client_slug: 'jan',
  title: 'Growth Reveals Your Circle',
  format: 'Talking Head',
  reference_clip: 'https://www.instagram.com/reel/DdbzuysjzzD/',
  filming_direction: { Format: 'Talking-head list. Keep the same hook shape, pacing, and talk-to-camera energy.' },
  editor_notes: 'Do not say: I will change your life.\nThesis: Growth shows you who stays.',
  tonality_delivery: '3 WAYS TO READ IT (Monica stamp): A) Quiet conviction. B) Friend over coffee. C) Wry, then serious.',
  pipeline_audit: {
    offer: 'Content system for founders.',
    refs: [{ url: 'https://www.youtube.com/watch?v=abcdefghijk' }],
    dna: {
      hook: { status: 'pass', why: 'First line keeps the reference hook shape.' },
      idea: { status: 'pass', why: 'Same idea as the reference. Only the buyer changed.' },
    },
  },
  client_resources: { formats: 'Locked: talking-head list.' },
};
const clientItems = ctx.clientResourceItems(reviewScript, { includeAudit: false });
assert.ok(clientItems.some(it => it.id === 'thesis' && /who stays/.test(it.text)));
assert.ok(clientItems.some(it => it.id === 'avoid' && /change your life/.test(it.text)));
assert.ok(clientItems.some(it => it.id === 'formats' && /Locked: talking-head/.test(it.text)));
assert.ok(clientItems.some(it => it.id === 'read' && /Monica/.test(it.label)));
assert.ok(!clientItems.some(it => /Content system for founders/.test(it.text)));
const adminItems = ctx.clientResourceItems(reviewScript, { includeAudit: true });
assert.ok(adminItems.some(it => it.id === 'dna' && /Hook lock/.test(it.text) && /Body shift/.test(it.text)));
assert.ok(adminItems.some(it => it.id === 'thesis' && /who stays/.test(it.text)));

const clientRefs = ctx.reviewRefs(reviewScript, { includeAudit: false });
assert.strictEqual(clientRefs.length, 1);
assert.strictEqual(clientRefs[0].kind, 'ig');
const adminRefs = ctx.reviewRefs(reviewScript, { includeAudit: true });
assert.strictEqual(adminRefs.length, 2);
assert.ok(adminRefs.some(r => r.kind === 'yt'));

const refHtml = ctx.prompterRefHtml(reviewScript, { includeAudit: false });
assert.ok(!refHtml.includes('instagram.com/reel/DdbzuysjzzD/embed/'));
assert.ok(!refHtml.includes('<iframe'));
assert.ok(refHtml.includes('Open on Instagram'));
assert.ok(refHtml.includes('No hosted file'));
assert.ok(refHtml.includes('pr-ref-frame'));
assert.ok(refHtml.includes('pr-ref-close'));
assert.ok(refHtml.includes('Back to script'));
assert.ok(html.includes('Phone: Ref is a compact dock'));
assert.ok(!html.includes('height: 46vh; max-height: 46vh;'));
assert.ok(!html.includes('#prompter.has-ref #prompter-scroll { padding-bottom: 52vh; }'));
assert.ok(/prompterIsPhone\(\)\s*\n\s*\? false/.test(html));
assert.ok(html.includes('if (!prompterIsPhone()) lsSetBool(prompterRefKey()'));
const resHtml = ctx.prompterResourcesHtml(reviewScript, { includeAudit: false });
assert.ok(resHtml.includes('Do not say'));
assert.ok(resHtml.includes('pr-res-item'));
assert.ok(!resHtml.includes('Content system for founders'));
assert.ok(!resHtml.includes('monica-stamp.png'));

const richCard = {
  id: 'monica-stamp',
  title: 'Monica Stamp — Leadership lens',
  body_md: 'Pass only if it is about **leadership**.\n\n- Rewrite rank-chase\n- Keep personal development',
  image: 'png/monica-stamp.png',
  image_hub: 'hub/monica-stamp.png',
  tags: ['filter', 'monica'],
  admin_only: true,
  order: 1,
};
const parsedCard = ctx.parseClientResources([richCard], { base: 'assets/client-resources/jan-rla/' });
assert.strictEqual(parsedCard.cards.length, 1);
assert.strictEqual(parsedCard.cards[0].id, 'monica-stamp');
assert.strictEqual(parsedCard.cards[0].image_hub, 'assets/client-resources/jan-rla/hub/monica-stamp.png');
assert.strictEqual(parsedCard.cards[0].admin_only, true);
assert.ok(ctx.parseClientResources({ thesis: 'Keep this shape.' }).items.some(it => it.key === 'thesis'));
assert.strictEqual(ctx.parseClientResources(null).cards.length, 0);
assert.strictEqual(ctx.clientResourcePackSlug('jan'), 'jan-rla');
assert.strictEqual(ctx.clientResourcePackSlug('andrew'), '');
const janPack = ctx.clientResourcePack('jan');
assert.strictEqual(janPack.cards.length, 6);
assert.ok(janPack.cards.some(c => c.id === 'monica-stamp' && /hub\/monica-stamp\.png/.test(c.image_hub)));
assert.ok(janPack.cards.every(c => c.admin_only === true));

const janAdmin = ctx.clientResourceItems({ client_slug: 'jan', title: 'Growth Reveals Your Circle' }, { role: 'admin', includeAudit: true });
assert.ok(janAdmin.some(it => it.id === 'monica-stamp' && it.kind === 'card' && /hub\/monica-stamp\.png/.test(it.image_hub)));
assert.ok(janAdmin.some(it => it.id === 'thesis' && it.kind === 'card'));
assert.ok(janAdmin.some(it => it.id === 'do-not-say'));
assert.ok(janAdmin.some(it => it.id === 'format-dna-check'));
assert.ok(janAdmin.some(it => it.id === 'locked-formats'));
assert.ok(janAdmin.some(it => it.id === 'review-checklist'));
const janClient = ctx.clientResourceItems({ client_slug: 'jan' }, { role: 'client', includeAudit: false });
assert.ok(!janClient.some(it => it.kind === 'card'));
assert.ok(!janClient.some(it => it.id === 'monica-stamp'));
const andrewAdmin = ctx.clientResourceItems({ client_slug: 'andrew', title: 'Other client' }, { role: 'admin', includeAudit: true });
assert.ok(!andrewAdmin.some(it => it.id === 'monica-stamp'));

const janHtml = ctx.prompterResourcesHtml({ client_slug: 'jan' }, { role: 'admin', includeAudit: true });
assert.ok(janHtml.includes('pr-res-card'));
assert.ok(janHtml.includes('assets/client-resources/jan-rla/hub/monica-stamp.png'));
assert.ok(janHtml.includes('Monica Stamp'));
assert.ok(janHtml.includes('<strong>leadership</strong>') || janHtml.includes('leadership'));
const compactHtml = ctx.prompterResourcesHtml({ client_slug: 'jan' }, { role: 'admin', includeAudit: true }, { compact: true });
assert.ok(compactHtml.includes('Monica Stamp'));
assert.ok(!compactHtml.includes('<img'));
const missingImg = ctx.prompterResourceCardHtml({
  id: 'no-art', title: 'Text only', body_md: '- One reminder', kind: 'card',
});
assert.ok(missingImg.includes('Text only'));
assert.ok(missingImg.includes('<li>'));
assert.ok(!missingImg.includes('<img'));
assert.ok(!ctx.prompterResourcesHtml({ client_slug: 'jan' }, { role: 'client', includeAudit: false }).includes('pipeline_audit'));
assert.ok(!ctx.prompterResourcesHtml(reviewScript, { role: 'client', includeAudit: false }).includes('Content system for founders'));

assert.strictEqual(ctx.isRlaClient('jan'), true);
assert.strictEqual(ctx.isRlaClient('jan-rla'), true);
assert.strictEqual(ctx.isRlaClient('andrew'), false);
assert.ok(ctx.humanQaChecks({ client_slug: 'jan' }).some(c => /Monica|Rich Life|leadership/i.test(c.label)));
assert.ok(ctx.humanQaChecks({ client_slug: 'andrew' }).some(c => /thesis filter/i.test(c.label)));
assert.strictEqual(ctx.humanQaChecks({ client_slug: 'jan' }).map(c => c.key).join(','), 'nicheShift,thesisVoice,shareable,referenceOpened');
assert.strictEqual(ctx.humanQaChecks({ client_slug: 'jan' }, { compact: true }).map(c => c.key).join(','), 'nicheShift,thesisVoice,shareable,referenceOpened');
assert.ok(ctx.humanQaChecks({ client_slug: 'jan' }, { compact: true }).some(c => /Monica|Rich Life/i.test(c.label)));
const incompleteAction = ctx.humanQaReviewAction({}, '');
assert.strictEqual(incompleteAction.label, 'Continue');
assert.strictEqual(incompleteAction.stamp, false);
assert.strictEqual(incompleteAction.warn, true);
assert.strictEqual(incompleteAction.allow, true);
assert.strictEqual(incompleteAction.noteRequired, false);
const completeAction = ctx.humanQaReviewAction({
  nicheShift: true, thesisVoice: true, shareable: true, referenceOpened: true,
}, '');
assert.strictEqual(completeAction.label, 'Accept');
assert.strictEqual(completeAction.stamp, true);
assert.strictEqual(completeAction.warn, false);
assert.ok(/Mark client-ready still needs all four/.test(ctx.humanQaContinueWarn()));
assert.strictEqual(ctx.humanQaNotesOk('looks fine'), false);
assert.strictEqual(ctx.humanQaNotesOk('AI finished'), false);
assert.strictEqual(ctx.humanQaNotesOk('Leadership angle, not a copy of the reel, shareable with their team.'), true);
assert.strictEqual(ctx.humanQaComplete({}), false);
assert.strictEqual(ctx.humanQaComplete({ pipeline_audit: {} }), false);
assert.strictEqual(ctx.isClientDeliveryStatus('Needs Review'), true);
assert.strictEqual(ctx.isClientDeliveryStatus('Approved'), true);
assert.strictEqual(ctx.isClientDeliveryStatus('Filming'), false);
assert.strictEqual(ctx.isClientDeliveryStatus('Draft'), false);
assert.strictEqual(ctx.humanQaBlocksStatus({ status: 'Draft' }, 'Needs Review'), true);
assert.strictEqual(ctx.humanQaBlocksStatus({ status: 'Needs Review' }, 'Approved'), true);
assert.strictEqual(ctx.humanQaBlocksStatus({ status: 'Needs Review' }, 'Filming'), false);
assert.strictEqual(ctx.humanQaBlocksStatus({ status: 'Draft' }, 'Draft'), false);
const signedQa = ctx.buildHumanQaStamp({
  readFull: true, notVerbatim: true, thesisFilter: true, shareable: true,
}, 'Leadership angle, not a copy of the reel, shareable with their team.', 'Cristian Aguilar', '2026-10-27T15:00:00.000Z');
assert.strictEqual(signedQa.complete, true);
assert.strictEqual(signedQa.by, 'Cristian Aguilar');
const signedScript = { id: 'qa-1', title: 'Growth Reveals Your Circle', client_slug: 'jan', status: 'Draft', pipeline_audit: ctx.applyHumanQa({ offer: 'Keep offer' }, signedQa) };
assert.strictEqual(ctx.humanQaComplete(signedScript), true);
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Needs Review'), false);
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Approved'), false);
assert.strictEqual(ctx.currentAuditObject(signedScript).offer, 'Keep offer');
assert.strictEqual(ctx.currentAuditObject(signedScript).humanQa.notes.indexOf('Leadership') !== -1, true);
assert.strictEqual(ctx.humanQaValidate({ readFull: true, notVerbatim: true, thesisFilter: true, shareable: false }, signedQa.notes).ok, false);
assert.strictEqual(ctx.humanQaValidate(signedQa.checks, '').ok, true);
assert.strictEqual(ctx.humanQaValidate(signedQa.checks, 'ok').ok, true);
assert.strictEqual(ctx.humanQaValidate(signedQa.checks, signedQa.notes).ok, true);
assert.strictEqual(ctx.buildHumanQaStamp(signedQa.checks, '', 'Cristian', '2026-10-28T00:00:00.000Z').complete, true);
assert.strictEqual(ctx.buildHumanQaStamp({ nicheShift: true, thesisVoice: true, shareable: true }, '', 'Cristian', '2026-10-28T00:00:00.000Z').complete, false);
ctx.role = 'admin';
const unsignedHtml = ctx.prepAuditHtml({ id: 'qa-2', title: 'Bare QA', client_slug: 'jan', status: 'Needs Review' });
assert.ok(unsignedHtml.includes('Cristian brain check'));
assert.ok(unsignedHtml.includes('DNA niche-shift'));
assert.ok(unsignedHtml.includes('Reference opened'));
assert.ok(unsignedHtml.includes('Optional'));
assert.ok(/Monica|Rich Life|leadership/i.test(unsignedHtml));
assert.ok(unsignedHtml.includes('Why this is good to send'));
assert.ok(unsignedHtml.includes('Mark client-ready is blocked'));
assert.ok(unsignedHtml.includes('Cristian brain check is still open'));
assert.ok(unsignedHtml.includes('qa-prep-qa-2') || unsignedHtml.includes('submitHumanQa'));
const signedHtml = ctx.prepAuditHtml(signedScript);
assert.ok(signedHtml.includes('You signed this one'));
assert.ok(signedHtml.includes('Cristian Aguilar'));
assert.ok(signedHtml.includes('Leadership angle'));
assert.ok(signedHtml.includes('Send to Needs Review'));
assert.ok(!signedHtml.includes('Sign the brain check'));
const andrewGate = ctx.renderHumanQaGate({ id: 'qa-3', client_slug: 'andrew', status: 'Draft' }, 'card');
assert.ok(/thesis filter/i.test(andrewGate));
assert.ok(!/Monica stamp|Rich Life \/ Monica/i.test(andrewGate));
assert.ok(!andrewGate.includes('name="qa-format"'));
assert.ok(andrewGate.includes('qa-card-qa-3'));
assert.ok(andrewGate.includes('Fits their thesis, not a copy, and it is shareable.'));
const reviewGate = ctx.renderHumanQaGate({ id: 'qa-r', client_slug: 'jan', status: 'Needs Review' }, 'review');
assert.ok(reviewGate.includes('is-compact'));
assert.ok(reviewGate.includes('qa-review-qa-r'));
assert.ok(reviewGate.includes('Fits RLA leadership thesis / shareable.'));
assert.ok(reviewGate.includes('>Continue</button>'));
assert.ok(!/<button type="button" class="qa-go" disabled/.test(reviewGate));
assert.ok(!reviewGate.includes('Sign the brain check'));
assert.ok(reviewGate.includes('dna-strip'));
assert.ok(reviewGate.includes('Hook locked'));
assert.ok(!reviewGate.includes('class="audit-dna"'));
assert.ok(reviewGate.includes('DNA niche-shift'));
assert.ok(reviewGate.includes('Thesis / voice'));
assert.ok(reviewGate.includes('Reference opened'));
assert.ok(reviewGate.includes('The note is optional'));
assert.ok(reviewGate.includes('never blocks'));
assert.ok(reviewGate.includes('Open on Instagram if it is not'));
assert.ok(reviewGate.includes('Play stays in the Hub'));
assert.ok(reviewGate.includes('qa-note-fold'));
assert.ok(reviewGate.includes('Why this is good to send, optional'));
assert.ok(reviewGate.includes('qa-pin'));
assert.ok(/qa-pin[\s\S]*qa-nicheShift/.test(reviewGate));
assert.ok(/qa-pin[\s\S]*qa-go/.test(reviewGate));
assert.ok(!reviewGate.includes('write why this is good to send'));
assert.ok(reviewGate.includes('Mark client-ready still needs all four'));
assert.ok(reviewGate.includes('Myth-buster / contrarian'));
assert.ok(reviewGate.includes('name="qa-format"'));
assert.ok(reviewGate.includes('Signing still works if you skip this'));
assert.ok(!reviewGate.includes('Open Reference to compare'));
assert.ok(!reviewGate.includes("moveStatus('qa-r'"));
const devinGate = ctx.renderHumanQaGate({ id: 'qa-d', client_slug: 'devin', status: 'Draft' }, 'review');
assert.ok(devinGate.includes('Greenscreen'));
assert.ok(devinGate.includes('Tips / hacks'));
assert.ok(devinGate.includes('Whiteboard'));
assert.strictEqual(ctx.lockedFormatsForSlug('jan').map(f => f.id).join(','), 'reaction,education,lists,interview,myth-buster,car-aphorism');
assert.strictEqual(ctx.lockedFormatsForSlug('jan-rla').map(f => f.id).join(','), 'reaction,education,lists,interview,myth-buster,car-aphorism');
assert.strictEqual(ctx.lockedFormatsForSlug('jan').filter(f => f.id === 'car-aphorism')[0].label, 'Car talking-head + aphorism');
assert.strictEqual(ctx.lockedFormatsForSlug('devin').map(f => f.id).join(','), 'tutorials,tips-hacks,greenscreen,whiteboard,reaction');
assert.strictEqual(ctx.lockedFormatsForSlug('andrew').length, 0);
assert.strictEqual(ctx.normalizeQaFormats(['reaction', 'reaction', ' lists ']).join(','), 'reaction,lists');
const stampedFormats = ctx.buildHumanQaStamp({
  readFull: true, notVerbatim: true, thesisFilter: true, shareable: true,
}, 'Leadership angle, not a copy of the reel, shareable with their team.', 'Cristian Aguilar', '2026-10-27T15:00:00.000Z', ['reaction', 'lists']);
assert.strictEqual(stampedFormats.formats.join(','), 'reaction,lists');
assert.strictEqual(stampedFormats.complete, true);
assert.strictEqual(ctx.unpackHumanQa({ humanQa: stampedFormats }).formats.join(','), 'reaction,lists');
assert.strictEqual(ctx.humanQaFormatSummary({ client_slug: 'jan' }, ['myth-buster', 'reaction']), 'Myth-buster / contrarian · Reaction');
assert.strictEqual(ctx.humanQaValidate(stampedFormats.checks, stampedFormats.notes).ok, true);
const queueRows = [
  { id: 'core', title: 'Core one', client_slug: 'devin', status: 'Needs Review', batch: 'Devin CORE' },
  { id: 'final', title: 'Final one', client_slug: 'jan', status: 'Draft', batch: 'Jan FINAL · 10.23.2026' },
  { id: 'posted', title: 'Old', client_slug: 'jan', status: 'Posted', batch: 'Jan FINAL' },
  { id: 'conf', title: 'Floor', client_slug: 'jan', status: 'Draft', batch: '⭐ Floor Film' },
  { id: 'other', title: 'Weekly', client_slug: 'andrew', status: 'Draft', batch: 'Andrew weekly' },
  { id: 'sent', title: 'Already stamped', client_slug: 'jan', status: 'Needs Review', batch: 'Jan FINAL', pipeline_audit: signedScript.pipeline_audit },
];
assert.deepStrictEqual(ctx.reviewQueueFor(queueRows, { slug: '' }).map(s => s.id), ['final', 'core', 'conf', 'other']);
assert.deepStrictEqual(ctx.reviewQueueFor(queueRows, { slug: 'jan' }).map(s => s.id), ['final', 'conf']);
assert.strictEqual(ctx.needsBrainCheck(queueRows[2]), false);
assert.strictEqual(ctx.needsBrainCheck(queueRows[5]), false);
assert.strictEqual(ctx.nextStampId(['final', 'core', 'conf'], 'final', id => id !== 'final'), 'core');
assert.strictEqual(ctx.nextStampId(['final', 'core', 'conf'], 'conf', id => id !== 'conf'), 'final');
assert.strictEqual(ctx.nextStampId(['core', 'conf'], 'final', () => true), 'core');
assert.strictEqual(ctx.nextStampId(['final', 'core'], 'final', () => false), '');
assert.ok(script.includes('Stamped. Not sent. Next script.'));
assert.ok(script.includes('Needs your brain check'));
assert.ok(script.includes("if (modal === 'whats-new' || modal === 'new-scripts') modal = null;"));
assert.ok(/humanQaBlocksStatus/.test(script));
ctx.role = 'admin';
assert.ok(ctx.renderHumanQaBadge({ client_slug: 'jan' }).includes('Brain check needed'));
assert.ok(ctx.renderHumanQaBadge(signedScript).includes('Brain check'));
assert.ok(ctx.renderHumanQaBadge(signedScript).includes('Cristian'));
ctx.role = 'client';
assert.strictEqual(ctx.renderHumanQaBadge(signedScript), '');
const qaBatch = ctx.batchGapsHtml([
  [{ id: 'a', title: 'Unsigned one', client_slug: 'jan' }],
  [{ id: 'b', title: 'Unsigned two', client_slug: 'jan' }],
]);
ctx.role = 'admin';
const qaBatchAdmin = ctx.batchGapsHtml([
  [{ id: 'a', title: 'Unsigned one', client_slug: 'jan' }],
  [{ id: 'b', title: 'Unsigned two', client_slug: 'jan' }],
]);
assert.ok(qaBatchAdmin.includes('Cristian brain check still open'));
assert.ok(qaBatchAdmin.includes('Unsigned one'));
assert.ok(qaBatch === '' || qaBatch.includes('Cristian') === false);
assert.ok(ctx.scriptGapHtml({ ready: { blockers: [] } }, { title: 'Open' }).includes('Cristian brain check'));
assert.ok(ctx.scriptGapHtml({ ready: { blockers: [] } }, signedScript).includes('No hard gaps'));
ctx.role = 'admin';
const draftBlocked = ctx.renderShotActions({ id: 'act-1', status: 'Draft' });
assert.ok(draftBlocked.includes('Needs Review'));
assert.ok(draftBlocked.includes('disabled'));
assert.ok(!draftBlocked.includes("moveStatus('act-1','Needs Review')"));
const reviewAdmin = ctx.renderShotActions({ id: 'act-2', status: 'Needs Review' });
assert.ok(reviewAdmin.includes('Film this'));
assert.ok(reviewAdmin.includes("moveStatus('act-2','Filming')"));
assert.ok(reviewAdmin.includes('Request a tweak'));
assert.ok(reviewAdmin.includes("moveStatus('act-2','Passed')"));
assert.ok(reviewAdmin.includes('Mark client-ready'));
assert.ok(reviewAdmin.includes('disabled'));
const signedReady = ctx.renderShotActions(Object.assign({}, signedScript, { id: 'act-3', status: 'Needs Review' }));
assert.ok(signedReady.includes('Mark client-ready'));
assert.ok(signedReady.includes("moveStatus('act-3','Approved')"));
assert.ok(!signedReady.includes('disabled'));
assert.ok(!signedReady.includes(ctx.vaultEmptyTitle()));
assert.ok(!signedReady.includes('openFormatVault()'));
const andrewSignedReady = ctx.renderShotActions(Object.assign({}, signedScript, { id: 'act-andrew', client_slug: 'andrew', status: 'Needs Review' }));
assert.ok(andrewSignedReady.includes("moveStatus('act-andrew','Approved')"));
assert.ok(!andrewSignedReady.includes(ctx.vaultEmptyTitle()));
const devinSignedReady = ctx.renderShotActions(Object.assign({}, signedScript, { id: 'act-devin', client_slug: 'devin', status: 'Needs Review' }));
assert.ok(devinSignedReady.includes("moveStatus('act-devin','Approved')"));
assert.ok(!devinSignedReady.includes(ctx.vaultEmptyTitle()));
ctx.role = 'client';
const clientReview = ctx.renderShotActions({ id: 'act-4', status: 'Needs Review' });
assert.ok(clientReview.includes('Film this'));
assert.ok(clientReview.includes("moveStatus('act-4','Filming')"));
assert.ok(!clientReview.includes('Mark client-ready'));
assert.ok(!clientReview.includes('Brain check'));
const clientDraft = ctx.renderShotActions({ id: 'act-5', status: 'Draft' });
assert.ok(clientDraft.includes("moveStatus('act-5','Needs Review')"));
assert.ok(/Finish the Cristian brain check first/.test(script));
assert.ok(/humanQaBlocksStatus/.test(script));
assert.ok(/pipeline_audit: nextAudit/.test(script));
assert.ok(/confirmHumanQaFilm/.test(script));
assert.ok(/prompterShouldForceStart/.test(script));
assert.ok(/staleHumanQaAfterScriptChange/.test(script));

const hashScript = { hook: 'Line one', full_script: 'Body two', cta: 'Comment FOLLOW' };
assert.strictEqual(ctx.humanQaScriptHash(hashScript), 'Line one\n\x1e\nBody two\n\x1e\nComment FOLLOW');
assert.notStrictEqual(ctx.humanQaScriptHash(hashScript), ctx.humanQaScriptHash({ hook: 'Changed', full_script: 'Body two', cta: 'Comment FOLLOW' }));
const filmStamp = ctx.attachHumanQaFilm(signedQa, 'start', ctx.humanQaScriptHash(hashScript));
assert.ok(filmStamp.filmStartAt);
assert.strictEqual(filmStamp.filmEndAt, '');
assert.strictEqual(filmStamp.scriptHash, ctx.humanQaScriptHash(hashScript));
const filmEndStamp = ctx.attachHumanQaFilm(filmStamp, 'end', ctx.humanQaScriptHash(hashScript));
assert.ok(filmEndStamp.filmEndAt);
const filmScript = {
  id: 'qa-film-1',
  title: 'Growth Reveals Your Circle',
  client_slug: 'jan',
  status: 'Draft',
  hook: hashScript.hook,
  full_script: hashScript.full_script,
  cta: hashScript.cta,
  pipeline_audit: ctx.applyHumanQa({ offer: 'Keep offer' }, filmEndStamp),
};
assert.strictEqual(ctx.humanQaFilmStartDone(filmScript), true);
assert.strictEqual(ctx.humanQaFilmEndDone(filmScript), true);
assert.strictEqual(ctx.humanQaStale(filmScript), false);
assert.strictEqual(ctx.humanQaDeliveryReady(filmScript), true);
const editedFilm = Object.assign({}, filmScript, { full_script: 'Body two. Warmer.' });
assert.strictEqual(ctx.humanQaStale(editedFilm), true);
assert.strictEqual(ctx.humanQaDeliveryReady(editedFilm), false);
assert.strictEqual(ctx.humanQaFilmStartDone(editedFilm), false);
assert.strictEqual(ctx.humanQaBlocksStatus(editedFilm, 'Needs Review'), true);
const stalePatch = ctx.staleHumanQaAfterScriptChange(filmScript, { full_script: 'Body two. Warmer.' });
assert.ok(stalePatch);
assert.strictEqual(stalePatch.humanQa.complete, false);
assert.strictEqual(stalePatch.offer, 'Keep offer');
assert.strictEqual(ctx.staleHumanQaAfterScriptChange(filmScript, { editor_notes: 'only notes' }), null);
assert.strictEqual(ctx.humanQaNotesOk('looks fine now'), false);
assert.strictEqual(ctx.humanQaNotesOk('AI finished'), false);

ctx.role = 'admin';
assert.strictEqual(ctx.prompterShowsFilmQa(), true);
assert.strictEqual(ctx.prompterShouldForceStart(signedScript), false);
assert.strictEqual(ctx.prompterShouldForceStart(filmScript), false);
assert.strictEqual(ctx.prompterShouldBlockClose(filmScript), false);
assert.strictEqual(ctx.prompterCanShowReference({ editing: false, ref: true, refCount: 1, showQa: true }), true);
assert.strictEqual(ctx.prompterCanShowReference({ editing: true, ref: true, refCount: 1 }), false);
const startOnly = Object.assign({}, filmScript, {
  pipeline_audit: ctx.applyHumanQa({ offer: 'Keep offer' }, filmStamp),
});
assert.strictEqual(ctx.humanQaFilmStartDone(startOnly), true);
assert.strictEqual(ctx.humanQaFilmEndDone(startOnly), false);
assert.strictEqual(ctx.prompterShouldBlockClose(startOnly), false);
assert.strictEqual(ctx.prompterShouldForceStart({ client_slug: 'jan' }), true);
const startHtml = ctx.renderHumanQaGate({ id: 'qa-film-2', client_slug: 'jan', status: 'Draft' }, 'film-start');
assert.ok(startHtml.includes('qa-film-start-qa-film-2'));
assert.ok(startHtml.includes('Film start'));
assert.ok(startHtml.includes('teleprompter stays closed'));
assert.ok(startHtml.includes('submitHumanQa'));
const startConfirm = ctx.renderHumanQaGate(signedScript, 'film-start');
assert.ok(startConfirm.includes("I'm reading this myself"));
assert.ok(startConfirm.includes('confirmHumanQaFilm'));
const endHtml = ctx.renderHumanQaGate(startOnly, 'film-end');
assert.ok(endHtml.includes('I finished this film read'));
assert.ok(endHtml.includes('Film end'));
const filmSheet = ctx.prompterFilmQaHtml({ id: 'qa-film-2', client_slug: 'jan', status: 'Draft' }, 'start');
assert.ok(filmSheet.includes('Start this film read'));
assert.ok(filmSheet.includes('qa-film-start-qa-film-2'));
assert.ok(filmSheet.includes('closePrompter(true)'));
assert.ok(filmSheet.includes('prompterRef()'));
assert.ok(filmSheet.includes('>Reference</button>'));
const endSheet = ctx.prompterFilmQaHtml(startOnly, 'end');
assert.ok(endSheet.includes('Finish this film read'));
assert.ok(endSheet.includes('prompterQa(false)'));
ctx.role = 'client';
assert.strictEqual(ctx.prompterShowsFilmQa(), false);
assert.strictEqual(ctx.prompterShouldForceStart(signedScript), false);
assert.strictEqual(ctx.prompterShouldBlockClose(startOnly), false);
assert.ok(/finalScriptEditAllowed/.test(script));
assert.ok(/commitScriptEdit/.test(script));
assert.ok(/You can only edit your own scripts/.test(script));
assert.ok(/viewSlug === session.viewSlug/.test(script) || /slug === session.viewSlug/.test(script));

assert.strictEqual(ctx.prepStampBlocksTabs(), false);
assert.strictEqual(ctx.prepShowsStamp(0, true), true);
assert.strictEqual(ctx.prepReferenceStep(true), 2);
assert.strictEqual(ctx.prepShowsStamp(ctx.prepReferenceStep(true), true), false);
assert.strictEqual(ctx.prepTabReachable(ctx.prepReferenceStep(true), true), true);
assert.strictEqual(ctx.prepTabReachable(ctx.prepReferenceStep(false), false), true);
assert.strictEqual(ctx.prepTabReachable(9, true), false);
const refBody = ctx.prepStepBody({
  title: 'Growth Reveals Your Circle',
  client_slug: 'jan',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
}, ctx.prepReferenceStep(true), true);
assert.ok(refBody.includes('Reference'));
assert.ok(!refBody.includes('Sign the brain check'));
assert.ok(ctx.prepQaHintHtml({ client_slug: 'jan', status: 'Draft' }, false, true).includes('does not ask you to sign again'));
assert.ok(ctx.prepQaHintHtml({ client_slug: 'jan', status: 'Draft' }, false, true).includes('does not clear a stamp'));
assert.strictEqual(ctx.prepQaHintHtml(signedScript, false, true), '');
assert.strictEqual(ctx.prepQaHintHtml({ client_slug: 'jan' }, true, true), '');
const prepGoAt = script.indexOf('window.prepGo =');
const prepGoSrc = script.slice(prepGoAt, script.indexOf('window.prepMove =', prepGoAt));
assert.ok(/prepTabReachable/.test(prepGoSrc));
assert.ok(/rememberPrepQaDraft/.test(prepGoSrc));
assert.ok(!/pipeline_audit/.test(prepGoSrc));
assert.ok(!/humanQa\s*=/.test(prepGoSrc));
const formatStale = ctx.staleHumanQaAfterScriptChange({
  hook: 'Line one',
  full_script: 'Body two',
  cta: 'Comment FOLLOW',
  pipeline_audit: ctx.applyHumanQa({ offer: 'Keep offer' }, stampedFormats),
}, { hook: 'Line one changed' });
assert.strictEqual(formatStale.humanQa.formats.join(','), 'reaction,lists');
assert.strictEqual(formatStale.humanQa.complete, false);
const vaultHtml = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'all');
assert.ok(vaultHtml.includes('Format Vault'));
assert.ok(vaultHtml.includes('Jan Zands'));
assert.ok(vaultHtml.includes('Devin Shea'));
assert.ok(vaultHtml.includes('Myth-buster / contrarian'));
assert.ok(vaultHtml.includes('Greenscreen'));
assert.ok(vaultHtml.includes('Network marketing'));
assert.ok(vaultHtml.includes('Nonprofit'));
assert.ok(vaultHtml.includes('@teamr3set'));
assert.ok(vaultHtml.includes('@susan_ho'));
assert.ok(vaultHtml.includes('Tony Robbins'));
assert.ok(vaultHtml.includes('Keepers: Candace · Pierini · Lorin'));
assert.ok(vaultHtml.includes('Jan keepers on file: Candace, Pierini, and Lorin.'));
assert.ok(!vaultHtml.includes('Keepers are not decided yet.'));
assert.ok(!vaultHtml.includes('Jan stays empty until keepers are decided.'));
assert.ok(!vaultHtml.includes('No recipes filed yet. Run success-recipes and file the sheet.'));
assert.ok(vaultHtml.includes('No creator examples filed yet'));
assert.ok(vaultHtml.includes('https://www.instagram.com/reel/Dej6DYnye-H/'));
assert.ok(vaultHtml.includes('Lane · cross-industry'));
assert.ok(vaultHtml.includes('Lane · niche'));
assert.ok(!vaultHtml.includes('Lane · competitors'));
assert.ok(!/apify|scrapecreators|sandcastles|instagram\.com\/api/i.test(vaultHtml));
assert.ok(vaultHtml.includes('class="vault-sticky"'));
assert.ok(vaultHtml.includes('href="https://www.instagram.com/reel/Dej6DYnye-H/"'));
assert.ok(vaultHtml.includes('vault-poster'));
assert.ok(!vaultHtml.includes('Tap Devin'));
assert.ok(vaultHtml.includes('https://www.instagram.com/reel/DeJhq0AINpW/'));
assert.ok(vaultHtml.includes('https://www.instagram.com/reel/DbbGzGzu-Ys/'));
assert.ok(vaultHtml.includes('https://www.instagram.com/reel/DcBWZ8oC51Q/'));
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Approved'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'devin' }, 'Needs Review'), false);
const devinVault = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'devin');
assert.ok(devinVault.includes('Dej6DYnye-H'));
assert.ok(devinVault.includes('class="vault-sticky"'));
assert.ok(devinVault.includes('>Devin Shea</h2>'));
assert.ok(devinVault.includes('vault-poster'));
assert.ok(!devinVault.includes('No thumbnail yet'));
assert.ok(!devinVault.includes('Keepers are not decided yet.'));
const janVaultHtml = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'jan');
assert.ok(janVaultHtml.includes('Keepers: Candace · Pierini · Lorin'));
assert.ok(!janVaultHtml.includes('Keepers are not decided yet.'));
assert.ok(janVaultHtml.includes('No thumbnail yet'));
assert.ok(!janVaultHtml.includes('Tap Devin'));
assert.ok(janVaultHtml.includes('https://www.instagram.com/reel/DeJhq0AINpW/'));
assert.ok(janVaultHtml.includes('https://www.instagram.com/reel/DbbGzGzu-Ys/'));
assert.ok(janVaultHtml.includes('https://www.instagram.com/reel/DcBWZ8oC51Q/'));
assert.ok(janVaultHtml.includes('https://www.instagram.com/reel/Dbv-LIFiURH/'));
assert.ok(janVaultHtml.includes('https://www.instagram.com/reel/DbzHPbyC7DJ/'));
assert.ok(janVaultHtml.includes('@edupierinicoach'));
assert.ok(janVaultHtml.includes('@lorinkrenn'));
assert.ok(janVaultHtml.includes('@candasifamabarnes'));
assert.ok(janVaultHtml.includes('Car talking-head + aphorism'));
assert.ok(!ctx.formatVaultCatalog().clients.some(client => client.slug === 'andrew'));
const tutorialsBrowse = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'devin', 'tutorials');
assert.ok(tutorialsBrowse.includes('setFormatVaultFormat(\'tutorials\')'));
assert.ok(tutorialsBrowse.includes('<h3>Cross-industry</h3>'));
assert.ok(!tutorialsBrowse.includes('<h3>Niche</h3>'));
assert.ok(!tutorialsBrowse.includes('<h3>Competitors</h3>'));
assert.ok(tutorialsBrowse.includes('class="vault-reel-row"'));
assert.ok(tutorialsBrowse.includes('Previous reel'));
assert.ok(tutorialsBrowse.includes('Next reel'));
assert.ok(tutorialsBrowse.includes('class="vault-sticky"'));
assert.ok(tutorialsBrowse.includes('vault-poster'));
assert.ok(tutorialsBrowse.includes('data:image/svg+xml'));
assert.ok(tutorialsBrowse.includes('href="https://www.instagram.com/reel/Dej6DYnye-H/"'));
assert.ok(tutorialsBrowse.includes('href="https://www.instagram.com/reel/De7Kwg_hCLn/"'));
assert.ok(tutorialsBrowse.includes('25.3x'));
assert.ok(!/instagram\.com\/api|<iframe/i.test(tutorialsBrowse));
const tipsBrowse = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'devin', 'tips-hacks');
assert.ok(tipsBrowse.includes('<h3>Niche</h3>'));
assert.ok(tipsBrowse.includes('<h3>Cross-industry</h3>'));
assert.ok(!tipsBrowse.includes('<h3>Competitors</h3>'));
const janBrowse = ctx.renderFormatVaultHtml(ctx.formatVaultCatalog(), 'jan', 'reaction');
assert.ok(janBrowse.includes('Keepers: Candace · Pierini · Lorin'));
assert.ok(!janBrowse.includes('Keepers are not decided yet.'));
assert.ok(janBrowse.includes('No recipes filed yet. Run success-recipes and file the sheet.'));
assert.ok(janBrowse.includes('Tap Devin'));
assert.ok(!janBrowse.includes('class="vault-reel-row"'));
assert.ok(!janBrowse.includes('vault-poster'));
assert.ok(!/<a [^>]*href=/i.test(janBrowse));
assert.ok(!/<h3>Competitors<\/h3>/.test(tutorialsBrowse + tipsBrowse + janBrowse));
const recipeCard = ctx.formatVaultCardHtml({
  client: 'Devin',
  brand: 'Devin',
  label: 'Tutorials',
  niche: 'Fundraising',
  industry: 'Nonprofit',
  creators: [{ name: 'Team', handle: '@teamr3set' }],
  reelUrl: 'https://example.com/reel/ABC123xyz',
  shortcode: 'ABC123xyz',
  dna: { hook: 'question open', components: '', rehook: '', cadence: '', length: '', idea: 'one move', reward: '', emotionalNext: 'save it' },
  emptyRecipe: false,
});
assert.ok(recipeCard.includes('Handle · @teamr3set'));
assert.ok(recipeCard.includes('Reel · https://example.com/reel/ABC123xyz'));
assert.ok(recipeCard.includes('Shortcode · ABC123xyz'));
assert.ok(recipeCard.includes('hook · question open'));
assert.ok(recipeCard.includes('idea · one move'));
assert.ok(recipeCard.includes('emotionalNext · save it'));
assert.ok(!recipeCard.includes('components ·'));
assert.ok(!/apify|scrapecreators|sandcastles/i.test(recipeCard));
assert.ok(recipeCard.includes('href="https://example.com/reel/ABC123xyz"'));
assert.ok(recipeCard.includes('vault-poster'));
assert.ok(vaultHtml.includes('No thumbnail yet'));
assert.ok(!vaultHtml.includes('moveStatus'));
assert.ok(!vaultHtml.includes('Mark client-ready'));
assert.strictEqual(ctx.formatVaultCards(ctx.formatVaultCatalog(), 'jan').length, 6);
assert.strictEqual(ctx.formatVaultCards(ctx.formatVaultCatalog(), 'devin').length, 5);
assert.ok(script.includes("if (role !== 'admin') return;"));
assert.ok(script.includes('openFormatVault'));
const catalogFile = JSON.parse(fs.readFileSync(new URL('../format-vault/catalog.json', import.meta.url), 'utf8'));
assert.strictEqual(JSON.stringify(ctx.formatVaultCatalog()), JSON.stringify(catalogFile));

assert.strictEqual(ctx.formatCountsAsRecipe({ id: 'reaction', thumbnail: 'Tony Robbins', creators: [{ name: 'Tony Robbins', handle: '' }] }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ reelUrl: '   ' }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ reelUrl: 'https://www.instagram.com/reel/C96PhruO6BC/' }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ shortcode: 'C96PhruO6BC' }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ shortcode: '  ' }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: {} }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { hook: '' } }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { hook: '   ' } }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { thumbnail: 'face', creator: 'Tony' } }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { hook: 'locked pattern' } }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { emotional: 'warm close' } }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { emotionalNext: { status: '', why: '' } } }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ dna: { components: { status: 'pass' } } }), true);
assert.strictEqual(ctx.vaultFormatsForSlug('jan').some(ctx.formatCountsAsRecipe), true);
assert.strictEqual(ctx.vaultFormatsForSlug('jan').filter(f => f.id === 'education').every(ctx.formatCountsAsRecipe), true);
assert.strictEqual(ctx.vaultFormatsForSlug('jan').filter(f => f.id === 'myth-buster').every(ctx.formatCountsAsRecipe), true);
assert.strictEqual(ctx.vaultFormatsForSlug('jan').filter(f => f.id === 'car-aphorism').every(ctx.formatCountsAsRecipe), true);
assert.strictEqual(ctx.vaultFormatsForSlug('jan').filter(f => f.id === 'reaction').some(ctx.formatCountsAsRecipe), false);
const carKeeper = ctx.vaultFormatsForSlug('jan').filter(f => f.id === 'car-aphorism')[0];
assert.strictEqual(carKeeper.creators[0].shortcode, 'DcBWZ8oC51Q');
assert.strictEqual(carKeeper.creators[0].also.map(reel => reel.shortcode).join(','), 'Dbv-LIFiURH,DbzHPbyC7DJ');
assert.strictEqual(ctx.vaultFormatsForSlug('devin').every(ctx.formatCountsAsRecipe), true);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan', status: 'Needs Review' }, 'Approved'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan-rla' }, 'Needs Review'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'devin' }, 'Approved'), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ creators: [{ handle: '@williamholmancoaching', reelUrl: 'https://www.instagram.com/reel/Dej6DYnye-H/' }] }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ creators: [{ dna: { format: 'coach teaches steps' } }] }), true);
assert.strictEqual(ctx.formatCountsAsRecipe({ creators: [{ dna: { thumbnail: 'face', creator: 'Tony' } }] }), false);
assert.strictEqual(ctx.formatCountsAsRecipe({ creators: [{ name: 'Tony Robbins', handle: '' }] }), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'andrew' }, 'Approved'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'sagun' }, 'Needs Review'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'cristian' }, 'Approved'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Filming'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Draft'), false);
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Approved'), false);
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Needs Review'), false);
const checkboxProof = {
  client_slug: 'jan',
  status: 'Needs Review',
  pipeline_audit: ctx.applyHumanQa({ offer: 'Keep offer' }, stampedFormats),
};
assert.strictEqual(ctx.humanQaDeliveryReady(checkboxProof), true);
assert.strictEqual(ctx.humanQaBlocksStatus(checkboxProof, 'Approved'), false);
assert.strictEqual(ctx.vaultEmptyBlocksStatus(checkboxProof, 'Approved'), false);
assert.strictEqual(ctx.prompterShouldForceStart(signedScript), false);
assert.strictEqual(ctx.prompterShouldBlockClose(signedScript), false);
assert.strictEqual(ctx.prepStampBlocksTabs(), false);
assert.strictEqual(ctx.humanQaNotesOk(''), false);
assert.strictEqual(ctx.humanQaNotesOk('looks fine'), false);
const janVaultClient = ctx.formatVaultCatalog().clients.filter(c => c.slug === 'jan')[0];
const reactionFormat = janVaultClient.formats.filter(f => f.id === 'reaction')[0];
const savedThumb = reactionFormat.thumbnail;
const savedCreators = reactionFormat.creators;
try {
  reactionFormat.reelUrl = 'https://www.instagram.com/reel/C96PhruO6BC/';
  assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Approved'), false);
  delete reactionFormat.reelUrl;
  reactionFormat.shortcode = 'C96PhruO6BC';
  assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Approved'), false);
  delete reactionFormat.shortcode;
  reactionFormat.dna = { hook: '  ' };
  assert.strictEqual(ctx.formatCountsAsRecipe(reactionFormat), false);
  reactionFormat.dna = { hook: 'question then lesson' };
  assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Needs Review'), false);
  delete reactionFormat.dna;
  reactionFormat.thumbnail = 'Tony Robbins face';
  reactionFormat.creators = [{ name: 'Tony Robbins', handle: '' }];
  assert.strictEqual(ctx.formatCountsAsRecipe(reactionFormat), false);
  assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Approved'), false);
  const recipeIds = ['education', 'myth-buster', 'car-aphorism'];
  const savedRecipes = recipeIds.map(id => {
    const format = janVaultClient.formats.filter(f => f.id === id)[0];
    return { format: format, creators: format.creators, reelUrl: format.reelUrl, shortcode: format.shortcode, dna: format.dna };
  });
  try {
    savedRecipes.forEach(row => {
      row.format.creators = [];
      row.format.reelUrl = '';
      row.format.shortcode = '';
      row.format.dna = { hook: '' };
    });
    assert.strictEqual(ctx.vaultFormatsForSlug('jan').some(ctx.formatCountsAsRecipe), false);
    assert.strictEqual(ctx.vaultEmptyBlocksStatus({ client_slug: 'jan' }, 'Approved'), true);
  } finally {
    savedRecipes.forEach(row => {
      row.format.creators = row.creators;
      row.format.reelUrl = row.reelUrl;
      row.format.shortcode = row.shortcode;
      row.format.dna = row.dna;
    });
  }
} finally {
  delete reactionFormat.reelUrl;
  delete reactionFormat.shortcode;
  delete reactionFormat.dna;
  reactionFormat.thumbnail = savedThumb;
  reactionFormat.creators = savedCreators;
}
const signedGate = ctx.renderHumanQaGate(signedScript, 'card');
assert.ok(signedGate.includes('Send to Needs Review'));
assert.ok(signedGate.includes("moveStatus('qa-1','Needs Review')"));
assert.ok(!signedGate.includes('disabled'));
assert.ok(!signedGate.includes('openFormatVault()'));
const andrewGateReady = ctx.renderHumanQaGate(Object.assign({}, signedScript, { client_slug: 'andrew' }), 'card');
assert.ok(andrewGateReady.includes("moveStatus('qa-1','Needs Review')"));
const setStatusAt = script.indexOf('async function setStatus');
const setStatusSrc = script.slice(setStatusAt, script.indexOf('async function requestTweak'));
assert.ok(/humanQaBlocksStatus/.test(setStatusSrc));
assert.ok(/vaultEmptyBlocksStatus/.test(setStatusSrc));
assert.ok(/openFormatVault/.test(setStatusSrc));
assert.ok(!/humanQa\s*=/.test(setStatusSrc));
ctx.role = 'admin';
const sagunReady = ctx.renderShotActions(Object.assign({}, signedScript, { id: 'act-sagun', client_slug: 'sagun', status: 'Needs Review' }));
assert.ok(sagunReady.includes("moveStatus('act-sagun','Approved')"));
const cristianReady = ctx.renderShotActions(Object.assign({}, signedScript, { id: 'act-cristian', client_slug: 'cristian', status: 'Needs Review' }));
assert.ok(cristianReady.includes("moveStatus('act-cristian','Approved')"));

const why = 'Leadership angle, not a copy of the reel, shareable with their team.';
const prefilled = ctx.renderHumanQaGate({
  id: 'qa-pre',
  client_slug: 'jan',
  status: 'Needs Review',
  pipeline_audit: { readyWhy: why },
}, 'review');
assert.ok(prefilled.includes(why));
assert.ok(prefilled.includes('>Continue</button>'));
assert.ok(/<button type="button" class="qa-go" onclick="window.submitHumanQa\('qa-pre'\)">Continue<\/button>/.test(prefilled));
assert.ok(!/<button type="button" class="qa-go" disabled/.test(prefilled));
assert.ok(prefilled.includes("onclick=\"window.submitHumanQa('qa-pre')\""));
assert.ok(!prefilled.includes('submitHumanQa(\'qa-pre\');'));
const canned = ctx.renderHumanQaGate({
  id: 'qa-can',
  client_slug: 'devin',
  status: 'Needs Review',
  pipeline_audit: { readyWhy: 'looks fine' },
}, 'review');
assert.ok(/<button type="button" class="qa-go" onclick="window.submitHumanQa\('qa-can'\)">Continue<\/button>/.test(canned));
assert.ok(!/<button type="button" class="qa-go" disabled/.test(canned));
const cardSign = ctx.renderHumanQaGate({ id: 'qa-card-sign', client_slug: 'andrew', status: 'Draft' }, 'card');
assert.ok(cardSign.includes('Sign the brain check'));
assert.ok(!cardSign.includes('>Accept</button>'));
const passStrip = ctx.dnaStripHtml({
  id: 'dna-pass',
  client_slug: 'jan',
  hook: 'Leadership is the path for the team.',
  full_script: 'Leadership is the path for the team. Grow the person before the rank.',
  cta: 'Comment TEAM',
  pipeline_audit: {
    dna: { hook: 'pass', nicheShift: 'fail' },
    spoken: { lo: 5, hi: 40, scriptSeconds: 12 },
  },
});
assert.ok(passStrip.includes('class="dna-chip is-pass">Hook locked</span>'));
assert.ok(passStrip.includes('class="dna-chip is-fail">Niche-shift</span>'));
assert.ok(passStrip.includes('class="dna-chip is-pass">Thesis</span>'));
assert.ok(passStrip.includes('class="dna-chip is-pass">Length band</span>'));
assert.ok(!passStrip.includes('audit-dna'));
const missStrip = ctx.dnaStripHtml({ id: 'dna-miss', client_slug: 'andrew', status: 'Needs Review' });
assert.ok(missStrip.includes('class="dna-chip is-fail">Hook locked</span>'));
assert.ok(missStrip.includes('class="dna-chip is-fail">Niche-shift</span>'));
assert.ok(missStrip.includes('class="dna-chip is-fail">Thesis</span>'));
assert.ok(missStrip.includes('class="dna-chip is-fail">Length band</span>'));
assert.strictEqual(ctx.prompterSkimTarget(reaction, 0), 0);
assert.strictEqual(ctx.prompterSkimTarget(reaction, 10), ctx.prompterSkimTarget(reaction, 12));
assert.notStrictEqual(ctx.prompterSkimTarget(reaction, 10), ctx.prompterSkimTarget(reaction, 20));
assert.ok(ctx.prompterSkimStops(reaction).indexOf(10) !== -1);
const untimed = {
  hook: 'One two three four five',
  full_script: 'Six seven eight nine ten eleven twelve thirteen fourteen fifteen',
  cta: 'Sixteen seventeen',
};
assert.strictEqual(ctx.prompterSkimTarget(untimed, 1), 0);
assert.ok(ctx.prompterSkimTarget(untimed, 40) > ctx.prompterSkimTarget(untimed, 1));
assert.ok(script.includes('is-skim'));
assert.ok(script.includes('class="pr-skim"'));
assert.ok(script.includes('class="pr-jump"'));
const buyinBadges = ctx.reviewBlockerBadges({ client_slug: 'devin', cta: 'Comment BUYIN', pipeline_audit: { blockers: ['ManyChat must lock before send'] } });
assert.ok(buyinBadges.some(badge => badge.label === 'BUYIN'));
const austinBadges = ctx.reviewBlockerBadges({ client_slug: 'devin', pipeline_audit: { gaps: ['Austin proof is empty'] } });
assert.ok(austinBadges.some(badge => badge.label === 'Austin empty'));
const melBadges = ctx.reviewBlockerBadges({ client_slug: 'andrew', pipeline_audit: { note: 'Mel rights stay held' } });
assert.ok(melBadges.some(badge => badge.label === 'Mel rights'));
assert.strictEqual(ctx.reviewBlockerBadges({ client_slug: 'sagun', title: 'Plain' }).length, 0);
const signedBuyin = ctx.reviewBlockerBadgesHtml(Object.assign({}, signedScript, {
  cta: 'Comment BUYIN',
  pipeline_audit: Object.assign({}, signedScript.pipeline_audit, { blockers: ['BUYIN still open'] }),
}));
assert.ok(signedBuyin.includes('BUYIN'));
assert.ok(signedBuyin.includes('data-blocker="buyin"'));
assert.deepStrictEqual(ctx.reviewQueueFor(queueRows, { slug: '' }).map(s => s.id), ['final', 'core', 'conf', 'other']);
assert.deepStrictEqual(ctx.stampQueueFor(queueRows, { slug: '' }).map(s => s.id), ['final', 'conf', 'core']);
assert.deepStrictEqual(ctx.readyQueueFor(queueRows, { slug: '' }).map(s => s.id), ['sent']);
assert.deepStrictEqual(ctx.readyQueueFor(queueRows, { slug: 'devin' }).map(s => s.id), []);
const readyMixed = queueRows.concat([
  { id: 'andy', title: 'Andrew stamped', client_slug: 'andrew', status: 'Needs Review', batch: 'Andrew weekly', pipeline_audit: signedScript.pipeline_audit },
]);
assert.deepStrictEqual(ctx.readyQueueFor(readyMixed, { slug: '' }).map(s => s.id), ['sent', 'andy']);
assert.deepStrictEqual(ctx.readyQueueFor(readyMixed, { slug: '', stampClientsOnly: true }).map(s => s.id), ['sent']);
ctx.role = 'admin';
const janListReady = Object.assign({}, signedScript, { id: 'list-jan', status: 'Needs Review' });
const janListBtn = ctx.listClientReadyHtml(janListReady);
assert.ok(janListBtn.includes('class="list-ready"'));
assert.ok(janListBtn.includes('Mark client-ready'));
assert.ok(janListBtn.includes('This stamp did not send anything and did not mark it client-ready.'));
assert.ok(janListBtn.includes("moveStatus('list-jan','Approved')"));
assert.ok(!janListBtn.includes('disabled'));
assert.ok(!janListBtn.includes(ctx.vaultEmptyTitle()));
assert.ok(!janListBtn.includes('openFormatVault()'));
const janReadReady = ctx.renderHumanQaGate(janListReady, 'review');
assert.ok(janReadReady.includes('You signed this one'));
assert.ok(janReadReady.includes('Mark client-ready'));
assert.ok(janReadReady.includes("moveStatus('list-jan','Approved')"));
assert.ok(janReadReady.includes('This stamp did not send anything and did not mark it client-ready.'));
assert.ok(!janReadReady.includes('disabled'));
assert.ok(!janReadReady.includes('class="list-ready"'));
const andrewListReady = Object.assign({}, signedScript, { id: 'list-andrew', client_slug: 'andrew', status: 'Needs Review' });
const andrewListBtn = ctx.listClientReadyHtml(andrewListReady);
assert.ok(andrewListBtn.includes("moveStatus('list-andrew','Approved')"));
assert.ok(andrewListBtn.includes('Mark client-ready'));
assert.ok(andrewListBtn.includes('This stamp did not send anything and did not mark it client-ready.'));
assert.ok(!andrewListBtn.includes('disabled'));
assert.strictEqual(ctx.listClientReadyHtml(Object.assign({}, andrewListReady, { status: 'Draft' })), '');
assert.strictEqual(ctx.listClientReadyHtml({ id: 'unsigned-list', client_slug: 'andrew', status: 'Needs Review' }), '');
ctx.role = 'client';
assert.strictEqual(ctx.listClientReadyHtml(andrewListReady), '');
ctx.role = 'admin';
const readReady = ctx.renderHumanQaGate(andrewListReady, 'review');
assert.ok(readReady.includes('You signed this one'));
assert.ok(readReady.includes('Mark client-ready'));
assert.ok(readReady.includes("moveStatus('list-andrew','Approved')"));
assert.ok(readReady.includes('This stamp did not send anything and did not mark it client-ready.'));
assert.ok(!readReady.includes('class="list-ready"'));
const batchCardAt = script.indexOf('function renderBatchCard');
const batchCardSrc = script.slice(batchCardAt, script.indexOf('function renderBatchCards', batchCardAt));
assert.ok(batchCardSrc.includes('class="batch-film"'));
assert.ok(/batch-film[\s\S]*listClientReadyHtml/.test(batchCardSrc));
assert.ok(/viewingAsClient\(\)\) \? '' : listClientReadyHtml\(s\)/.test(batchCardSrc));
const reviewCardAt = script.indexOf('function renderReviewCard');
const reviewCardSrc = script.slice(reviewCardAt, script.indexOf('function renderReadyQueueHtml', reviewCardAt));
assert.ok(/review-hit[\s\S]*listClientReadyHtml/.test(reviewCardSrc));
assert.ok(!/viewingAsClient/.test(reviewCardSrc));
assert.ok(script.includes('Stamped, not client-ready'));
assert.ok(/function renderReviewQueue[\s\S]*readyQueueScripts/.test(script));
const stampRail = ctx.stampQueueRailHtml(ctx.stampQueueFor(queueRows, { slug: '' }));
assert.ok(stampRail.includes('Jan'));
assert.ok(stampRail.includes('Devin'));
assert.ok(stampRail.includes('stamp-rail'));
const openAt = script.indexOf('function openReview');
const openSrc = script.slice(openAt, script.indexOf('window.openReview', openAt));
assert.ok(/reviewQueueScripts/.test(openSrc));
const advanceAt = script.indexOf('function advanceReview');
const advanceSrc = script.slice(advanceAt, script.indexOf('function finishHumanQaUi', advanceAt));
assert.ok(/stampQueueNext/.test(advanceSrc));
assert.ok(/stamped !== false/.test(advanceSrc));
assert.ok(/Moved on\. Not stamped/.test(advanceSrc));
assert.ok(/nextStampId/.test(script.slice(script.indexOf('function stampQueueNext'), advanceAt)));
const submitAt = script.indexOf('window.submitHumanQa = async');
const submitSrc = script.slice(submitAt, script.indexOf('window.confirmHumanQaFilm = async'));
assert.ok(/humanQaReviewAction/.test(submitSrc));
assert.ok(/humanQaFormIsReview/.test(submitSrc));
assert.ok(/humanQaContinueWarn/.test(submitSrc));
assert.ok(/window\.confirm/.test(submitSrc));
assert.ok(/advanceReview\(id, \{ stamped: false \}\)/.test(submitSrc));
assert.ok(/btn\.disabled = false/.test(script.slice(script.indexOf('window.syncQaAccept ='), script.indexOf('window.toggleReviewResources ='))));
assert.ok(script.includes('Stamp Queue Mode'));
assert.strictEqual(ctx.prompterShouldBlockClose(signedScript), false);
assert.strictEqual(ctx.prepStampBlocksTabs(), false);
assert.strictEqual(ctx.humanQaNotesOk('looks fine'), false);
assert.strictEqual(ctx.humanQaNotesOk('ok'), false);
ctx.role = 'admin';
assert.strictEqual(ctx.prompterShouldForceStart(signedScript), false);
assert.strictEqual(ctx.prompterShouldBlockClose(signedScript), false);
assert.strictEqual(ctx.prepStampBlocksTabs(), false);
const needsBrain = { id: 'ver-ready', client_slug: 'andrew', status: 'Needs Review' };
assert.strictEqual(ctx.humanQaDeliveryReady(needsBrain), false);
assert.strictEqual(ctx.humanQaBlocksStatus(needsBrain, 'Approved'), true);
assert.strictEqual(ctx.prompterShouldForceStart(needsBrain), true);
const needsBrainBtn = ctx.renderShotActions(needsBrain);
assert.ok(needsBrainBtn.includes('Mark client-ready'));
assert.ok(needsBrainBtn.includes('disabled'));
assert.ok(needsBrainBtn.includes('Finish the Cristian brain check first'));
assert.ok(!needsBrainBtn.includes("moveStatus('ver-ready','Approved')"));
const withReel = ctx.prepReadBodyHtml({
  title: 'Growth Reveals Your Circle',
  client_slug: 'jan',
  hook: 'I do not care how long lunch takes.',
  full_script: 'The spoken body stays on screen.',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
});
assert.ok(withReel.includes('class="review-ref"'));
assert.ok(withReel.includes('Open on Instagram'));
assert.ok(withReel.includes('class="review-ref-open"'));
assert.ok(withReel.includes('href="https://www.instagram.com/reel/C96PhruO6BC/"'));
assert.ok(withReel.includes('target="_blank"'));
assert.ok(withReel.includes('rel="noopener noreferrer"'));
assert.ok(!withReel.includes('vault-poster'));
assert.ok(!withReel.includes('<iframe'));
assert.ok(!withReel.includes('/embed/'));
assert.ok(!withReel.includes('pr-embed'));
assert.ok(withReel.includes('I do not care how long lunch takes.'));
const noReel = ctx.prepReadBodyHtml({
  title: 'No reel',
  client_slug: 'jan',
  hook: 'Hook only',
  full_script: 'Body only',
});
assert.ok(!noReel.includes('class="review-ref"'));
assert.ok(!noReel.includes('Open on Instagram'));
assert.ok(!noReel.includes('Open reel'));
assert.ok(!noReel.includes('instagram.com/reel'));
const fratRead = ctx.reviewReferenceHtml({
  client_slug: 'devin',
  title: '3-Step Guide to Funder Buy-In (Before the Ask)',
  format: 'Tutorials · vault D2 · @fratbuddha De7Kwg_hCLn',
  filming_direction: { Format: '3-step system tutorial (D2 / @fratbuddha). Numbered list talking-head.' },
  reference_clip: 'https://www.instagram.com/reel/De7Kwg_hCLn/',
  hook: 'Stop pitching the funder first.',
  full_script: 'The spoken body stays readable.',
});
assert.ok(fratRead.includes('review-format-chip">Tutorials<'));
assert.ok(!fratRead.includes('vault D2'));
assert.ok(fratRead.includes('href="https://www.instagram.com/reel/De7Kwg_hCLn/"'));
assert.ok(fratRead.includes('href="https://www.instagram.com/reel/DeAdWCBS2AV/"'));
assert.ok(fratRead.includes('@fratbuddha repeats · 2 outliers'));
assert.ok(fratRead.includes('review-ref-poster'));
assert.ok(fratRead.includes('review-ref-row'));
assert.ok(fratRead.includes('This script'));
assert.ok(fratRead.includes('30.6×'));
assert.ok(fratRead.includes('1470.1×'));
assert.ok(!fratRead.includes('vault-poster'));
assert.ok(!fratRead.includes('vault-reel'));
assert.ok(!fratRead.includes('<iframe'));
assert.ok(!fratRead.includes('/embed/'));
assert.ok(fratRead.includes('target="_blank"'));
assert.ok(fratRead.includes('rel="noopener noreferrer"'));
assert.ok(fratRead.includes('>Open on Instagram</a>'));
assert.ok(!fratRead.includes('<video'));
const oneReel = ctx.reviewReferenceHtml({
  client_slug: 'devin',
  format: 'Tutorials · vault D1 · @williamholmancoaching Dej6DYnye-H',
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
});
assert.ok(oneReel.includes('review-format-chip">Tutorials<'));
assert.ok(oneReel.includes('@williamholmancoaching · 1 reel'));
assert.ok(oneReel.includes('Dej6DYnye-H'));
assert.ok(!oneReel.includes('repeats ·'));
assert.ok(!oneReel.includes('De7Kwg_hCLn'));
const tipsRead = ctx.reviewReferenceHtml({
  client_slug: 'devin',
  format: 'Tips/hacks · vault D4 · @raisewithrachelle Dehx5O2huv2',
  reference_clip: 'https://www.instagram.com/reel/Dehx5O2huv2/',
});
assert.ok(tipsRead.includes('review-format-chip">Tips / hacks<'));
assert.ok(!tipsRead.includes('vault D4'));
assert.ok(tipsRead.includes('· 1 reel'));
assert.ok(!tipsRead.includes('DeAdWCBS2AV'));
const janReactionRead = ctx.reviewReferenceHtml({
  client_slug: 'jan',
  format: 'Reaction · David Reads Fast stack (C96PhruO6BC) · Mel react-to',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
});
assert.ok(janReactionRead.includes('review-format-chip">Reaction<'));
assert.ok(!janReactionRead.includes('David Reads Fast'));
assert.ok(!janReactionRead.includes('review-ref-row'));
assert.ok(!janReactionRead.includes('vault-poster'));
assert.ok(janReactionRead.includes('Open on Instagram'));
assert.ok(janReactionRead.includes('C96PhruO6BC'));
assert.ok(!janReactionRead.includes('Clip to react to'));
const melStamp = ctx.reviewReferenceHtml({
  client_slug: 'jan',
  title: 'Reaction: Mel Robbins — Your Self-Doubt Is Lying to You',
  format: 'Reaction · David Reads Fast stack (C96PhruO6BC) · Mel react-to',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  clip_directions: 'REACT TO / SOURCE CLIP (Mel Robbins): https://www.youtube.com/shorts/wFbr2UUZ2Xo',
  filming_direction: { 'Reaction Clip': 'https://www.youtube.com/shorts/wFbr2UUZ2Xo' },
  hook: 'I do not care how long lunch takes.',
  full_script: 'The spoken body stays on screen.',
});
assert.ok(melStamp.includes('Format reference'));
assert.ok(melStamp.includes('Clip to react to'));
assert.ok(melStamp.indexOf('Format reference') < melStamp.indexOf('Clip to react to'));
assert.ok(melStamp.includes('review-ref-duo'));
assert.ok(melStamp.includes('youtube.com/embed/wFbr2UUZ2Xo'));
assert.ok(melStamp.includes('https://www.youtube.com/shorts/wFbr2UUZ2Xo'));
assert.ok(melStamp.includes('>Open on YouTube</a>'));
assert.ok(melStamp.includes('>Open on Instagram</a>'));
assert.ok(melStamp.includes('C96PhruO6BC'));
assert.ok(!melStamp.includes('instagram.com/reel/C96PhruO6BC/embed/'));
assert.ok(melStamp.includes('review-format-chip">Reaction<'));
const melBody = ctx.prepReadBodyHtml({
  client_slug: 'jan',
  title: 'Reaction: Mel Robbins — Your Self-Doubt Is Lying to You',
  format: 'Reaction · David Reads Fast stack (C96PhruO6BC) · Mel react-to',
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  filming_direction: { 'Reaction Clip': 'https://www.youtube.com/shorts/wFbr2UUZ2Xo' },
  hook: 'I do not care how long lunch takes.',
  full_script: 'The spoken body stays on screen.',
});
assert.ok(melBody.indexOf('Clip to react to') < melBody.indexOf('I do not care how long lunch takes.'));
assert.ok(melBody.includes('The spoken body stays on screen.'));
assert.ok(melBody.includes('youtube.com/embed/wFbr2UUZ2Xo'));
assert.strictEqual(ctx.reactionClipUrl({
  reference_clip: 'https://www.instagram.com/reel/C96PhruO6BC/',
  proof_stats: 'REACT-TO (Mel Short): https://www.youtube.com/shorts/wFbr2UUZ2Xo',
}), 'https://www.youtube.com/shorts/wFbr2UUZ2Xo');
const andrewStampRead = ctx.reviewReferenceHtml({
  client_slug: 'andrew',
  format: 'Tips · vault A4 · @fratbuddha DeAdWCBS2AV',
  reference_clip: 'https://www.instagram.com/reel/DeAdWCBS2AV/',
});
assert.ok(andrewStampRead.includes('review-format-chip">Tips<'));
assert.ok(!andrewStampRead.includes('review-ref-row'));
assert.ok(!andrewStampRead.includes('De7Kwg_hCLn'));
assert.ok(!andrewStampRead.includes('repeats ·'));
assert.ok(andrewStampRead.includes('href="https://www.instagram.com/reel/DeAdWCBS2AV/"'));
assert.strictEqual(ctx.scriptLockedFormat({
  client_slug: 'jan',
  format: 'Myth-bust talking-head · Frazer DaLLZdAMta2',
}).label, 'Myth-buster / contrarian');
assert.strictEqual(ctx.scriptLockedFormat({
  client_slug: 'devin',
  format: 'Greenscreen · vault D8 · @attorneysekou DeVL2R_sUWx',
}).label, 'Greenscreen');
assert.strictEqual(ctx.reelClearsOutlierBar({ outlier: '2.9x' }), false);
assert.strictEqual(ctx.reelClearsOutlierBar({ outlier: '3x' }), true);
assert.strictEqual(ctx.reelClearsOutlierBar({ outlier: '3.4×' }), true);
assert.strictEqual(ctx.reelClearsOutlierBar({}), true);
const lowProof = ctx.reviewCreatorProof({
  client_slug: 'devin',
  format: 'Tutorials · vault D2 · @fratbuddha De7Kwg_hCLn',
  reference_clip: 'https://www.instagram.com/reel/De7Kwg_hCLn/',
});
assert.strictEqual(lowProof.repeats, true);
assert.strictEqual(lowProof.reels.length, 2);
assert.ok(ctx.prepReadBodyHtml({
  title: '3-Step Guide to Funder Buy-In (Before the Ask)',
  client_slug: 'devin',
  format: 'Tutorials · vault D2 · @fratbuddha De7Kwg_hCLn',
  hook: 'Stop pitching the funder first.',
  full_script: 'The spoken body stays readable.',
  reference_clip: 'https://www.instagram.com/reel/De7Kwg_hCLn/',
}).includes('Stop pitching the funder first.'));
assert.ok(script.includes('class="client-jump"'));
assert.ok(script.includes('window.exitToClients'));
assert.ok(script.includes('window.openClientResources'));
assert.ok(script.includes('>Clients</button>'));
assert.ok(script.includes('>Resources</button>'));
const exitAt = script.indexOf('window.exitToClients =');
const exitSrc = script.slice(exitAt, script.indexOf('window.openClientResources =', exitAt));
assert.ok(/viewAsOpen = true/.test(exitSrc));
const openVaultAt = script.indexOf('window.openFormatVault =');
const openVaultSrc = script.slice(openVaultAt, script.indexOf('window.setFormatVaultFilter', openVaultAt));
assert.ok(/vaultSlugKey\(row\.client_slug\) === 'devin'/.test(openVaultSrc));
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Approved'), false);
assert.strictEqual(ctx.humanQaBlocksStatus(signedScript, 'Needs Review'), false);
const blocksAt = script.indexOf('function humanQaBlocksStatus');
const blocksSrc = script.slice(blocksAt, script.indexOf('function humanQaValidate', blocksAt));
assert.ok(/return isClientDeliveryStatus\(nextStatus\) && !humanQaDeliveryReady\(s\)/.test(blocksSrc));
assert.ok(!/vaultEmpty/.test(blocksSrc));

const hostedRead = ctx.prepReadBodyHtml({
  title: 'Buy-in with a file',
  client_slug: 'devin',
  format: 'Tutorials · vault D1 · @williamholmancoaching Dej6DYnye-H',
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
  reference_video_url: 'https://cdn.example.com/reels/dej.mp4',
  thumbnail_url: 'https://cdn.example.com/reels/dej.jpg',
  hook: 'Stop pitching the funder first.',
  full_script: 'The spoken body stays readable beside the player.',
});
assert.ok(hostedRead.includes('class="hub-player is-file'));
assert.ok(hostedRead.includes('playsinline'));
assert.ok(hostedRead.includes('src="https://cdn.example.com/reels/dej.mp4"'));
assert.ok(hostedRead.includes('poster="https://cdn.example.com/reels/dej.jpg"'));
assert.ok(hostedRead.includes('>Open on Instagram</a>'));
assert.ok(hostedRead.includes('target="_blank"'));
assert.ok(!hostedRead.includes('/embed/'));
assert.ok(!hostedRead.includes('class="embed-frame"'));
assert.ok(hostedRead.includes('Stop pitching the funder first.'));
assert.ok(hostedRead.includes('The spoken body stays readable beside the player.'));
assert.ok(hostedRead.includes('review-format-chip">Tutorials<'));
assert.ok(hostedRead.includes('qa-pin') === false);
const lockFile = ctx.referenceHostedFile({
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
  pipeline_audit: { media_lock: { media_path: 'https://files.example.com/a.mp4', poster: 'https://files.example.com/a.jpg' } },
}, 'https://www.instagram.com/reel/Dej6DYnye-H/');
assert.strictEqual(lockFile, 'https://files.example.com/a.mp4');
assert.strictEqual(ctx.referenceHostedFile({
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
  thumbnail_url: 'https://cdn.example.com/only-poster.jpg',
}, 'https://www.instagram.com/reel/Dej6DYnye-H/'), '');
const audioHtml = ctx.hubPlayerHtml({ kind: 'ig', watch: 'https://www.instagram.com/reel/Dej6DYnye-H/' }, {
  file: 'https://cdn.example.com/voice.m4a',
});
assert.ok(audioHtml.includes('<audio'));
assert.ok(audioHtml.includes('playsinline'));
assert.ok(audioHtml.includes('Open on Instagram'));
assert.ok(!audioHtml.includes('<iframe'));
const igOnly = ctx.hubPlayerHtml(ctx.videoInfo('https://www.instagram.com/reel/Dej6DYnye-H/'), { inlineFallback: true, link: false });
assert.ok(!igOnly.includes('<iframe'));
assert.ok(!igOnly.includes('/embed/'));
assert.ok(igOnly.includes('No hosted file'));
const ytPlayer = ctx.hubPlayerHtml(ctx.videoInfo('https://www.youtube.com/watch?v=abcdefghijk'), { link: false });
assert.ok(ytPlayer.includes('youtube.com/embed/abcdefghijk'));
assert.ok(ytPlayer.includes('hub-player-frame'));
ctx.SUPABASE_URL = 'https://example.supabase.co';
assert.strictEqual(ctx.referenceHostedFile({
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
  pipeline_audit: { media_lock: { bucket: 'reference-media', media_path: 'devin/reel.mp4' } },
}, 'https://www.instagram.com/reel/Dej6DYnye-H/'), 'https://example.supabase.co/storage/v1/object/public/reference-media/devin/reel.mp4');
assert.strictEqual(ctx.referenceHostedFile({
  reference_clip: 'https://www.instagram.com/reel/Dej6DYnye-H/',
  reference_video_url: 'https://cdn.example.com/primary.mp4',
  pipeline_audit: { media_lock: { media_path: 'https://files.example.com/other.mp4' } },
}, 'https://www.youtube.com/watch?v=abcdefghijk'), '');
assert.ok(html.includes('max-height: min(188px, 30dvh)'));
assert.ok(!html.includes('position: absolute; inset: 0;\n    flex: none; width: 100%; height: auto; max-height: none;'));
assert.ok(script.includes('function rememberPrepScroll'));
assert.ok(/prepState\.scrolls\[String\(prepState\.step/.test(script));
assert.ok(/prepState\.scrolls && prepState\.scrolls\[String\(step\)\]/.test(script));

console.log('hub-logic tests passed');
