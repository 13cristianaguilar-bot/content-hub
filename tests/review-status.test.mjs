import fs from 'fs';
import assert from 'assert';
import vm from 'vm';
import test from 'node:test';

const html = fs.readFileSync(new URL('../command-center/index.html', import.meta.url), 'utf8');
const script = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));

function extract(name) {
  const start = script.indexOf('function ' + name + '(');
  if (start < 0) throw new Error('missing ' + name);
  let i = script.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let esc = false;
  for (; i < script.length; i++) {
    const c = script[i];
    if (quote) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === quote) quote = '';
      continue;
    }
    if (c === "'" || c === '"') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return script.slice(start, i + 1);
    }
  }
  throw new Error('unclosed ' + name);
}

const context = {};
vm.createContext(context);
vm.runInContext(extract('reviewStatus') + '\nthis.reviewStatus = reviewStatus;', context);
const reviewStatus = context.reviewStatus;

function kept(result) {
  assert.ok(result && result.status);
  assert.match(result.status, /^(ready|decision|reference|done|open)$/);
  assert.equal(result.line.includes('\u2014'), false);
  assert.equal(result.line.includes('\u2013'), false);
}

test('known statuses stay themselves', () => {
  ['ready', 'decision', 'reference', 'done'].forEach((name) => {
    const got = reviewStatus(name);
    kept(got);
    assert.equal(got.status, name);
    assert.equal(got.muted, false);
    assert.equal(got.line, '');
  });
});

test('needs review and in progress stay open', () => {
  const needs = reviewStatus('needs review');
  kept(needs);
  assert.equal(needs.status, 'open');
  assert.equal(needs.badge, 'Needs review');
  assert.equal(needs.muted, false);
  assert.equal(needs.line, '');
  assert.deepEqual(reviewStatus('Needs Review'), needs);

  const progress = reviewStatus('in progress');
  kept(progress);
  assert.equal(progress.status, 'open');
  assert.equal(progress.badge, 'In progress');
  assert.equal(progress.muted, true);
  assert.equal(progress.line, '');
  assert.deepEqual(reviewStatus('In Progress'), progress);
});

test('unknown and free-text statuses stay open and keep the raw line', () => {
  const live = reviewStatus('Pushed to Sunday by Cristian (Nov 14, 10:08 PM CT)');
  kept(live);
  assert.equal(live.status, 'open');
  assert.equal(live.badge, 'Open');
  assert.equal(live.muted, false);
  assert.equal(live.line, 'Pushed to Sunday by Cristian (Nov 14, 10:08 PM CT)');

  const dashed = reviewStatus('Held \u2014 until Monday');
  kept(dashed);
  assert.equal(dashed.status, 'open');
  assert.equal(dashed.line, 'Held - until Monday');

  const blank = reviewStatus('');
  kept(blank);
  assert.equal(blank.status, 'open');
  assert.equal(blank.line, '');

  const weird = reviewStatus('  not a known status  ');
  kept(weird);
  assert.equal(weird.status, 'open');
  assert.equal(weird.line, 'not a known status');
});
