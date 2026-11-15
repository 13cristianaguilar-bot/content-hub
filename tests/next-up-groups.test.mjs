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

const src = ['nextUpField', 'nextUpKeyword', 'nextUpNamed', 'nextUpGroup'].map(extract).join('\n');
const context = {};
vm.createContext(context);
vm.runInContext(src + '\nthis.nextUpGroup = nextUpGroup; this.nextUpField = nextUpField;', context);
const nextUpGroup = context.nextUpGroup;
const nextUpField = context.nextUpField;

test('keyword classifier when category, wedge, and lane are missing', () => {
  assert.strictEqual(nextUpGroup({ title: "Review Devin's scripts" }), 'delivery');
  assert.strictEqual(nextUpGroup({ title: 'Close the open thread with Jan' }), 'delivery');
  assert.strictEqual(nextUpGroup({ title: 'Send Jackson AUREA report' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Text Anand to lock TEN terms' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Send Travis the Sooth sponsorship ROI pitch' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Follow up with Corey Morrison' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Update resume and send 10 marketing job applications' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Call the contacts closest to paying' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Collect the open balance', notes: 'money owed from last month' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Publish podcast episode' }), 'ops');
  assert.strictEqual(nextUpGroup({ title: '' }), 'ops');
});

test('a stored category, wedge, or lane maps onto the four sections', () => {
  assert.strictEqual(nextUpField({ category: 'clients' }), 'delivery');
  assert.strictEqual(nextUpField({ category: 'future_money' }), 'sales');
  assert.strictEqual(nextUpField({ category: 'cash_now' }), 'cash');
  assert.strictEqual(nextUpField({ category: 'content' }), 'ops');
  assert.strictEqual(nextUpField({ category: 'ops' }), 'ops');
  assert.strictEqual(nextUpField({ wedge: 'clients' }), 'delivery');
  assert.strictEqual(nextUpField({ lane: 'convert' }), 'sales');
  assert.strictEqual(nextUpField({ category: 'ops', lane: 'convert' }), 'ops');
  assert.strictEqual(nextUpGroup({ title: 'Publish podcast episode', category: 'content' }), 'ops');
  assert.strictEqual(nextUpGroup({ title: 'Rotate Jan account passwords', category: 'ops' }), 'ops');
  assert.strictEqual(nextUpGroup({ title: 'Collect Jan 250', category: 'cash_now' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Pick one retainer price before Jackson', category: 'future_money' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Hooks and schedule', wedge: 'clients' }), 'delivery');
});

test('named live titles keep their section when the stored category disagrees', () => {
  assert.strictEqual(nextUpGroup({ title: 'Send Jackson AUREA report', category: 'cash_now' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Send Travis the Sooth sponsorship ROI pitch, then chase', category: 'cash_now' }), 'sales');
  assert.strictEqual(nextUpGroup({ title: 'Call the contacts closest to paying', category: 'future_money' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Update resume and send 10 marketing job applications', category: 'cash_now' }), 'cash');
  assert.strictEqual(nextUpGroup({ title: 'Close the open thread with Jan', category: 'clients' }), 'delivery');
  assert.strictEqual(nextUpGroup({ title: "Review Devin's scripts", category: 'clients' }), 'delivery');
});
