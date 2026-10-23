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
  'isFilmedStatus', 'isUnfilmedGroup', 'weekStartMonday', 'freshPartition', 'scriptType',
  'renderStatusRail', 'renderVideoSlot',
  'asText', 'parseHookPair', 'normSpoken', 'spokenHook', 'parseBeats', 'peelHook', 'beatName', 'scriptFlow',
  'parseSetup', 'parseShots', 'parseOnScreen', 'videoInfo', 'extractVideoLink', 'fdObject', 'pullLabeled', 'referencePack',
];
const src = [
  "const STATUS_ORDER = ['Draft','Needs Review','Approved','Filming','Posted','Passed'];",
  "const APP_VERSION = '2026.10.23';",
  "const WALKTHROUGH_VIDEO_URL = '';",
  "const CLIENTS = { jan: { name: 'Jan Zands', label: 'Jan' } };",
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

console.log('hub-logic tests passed');
