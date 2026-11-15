import fs from 'fs';
import assert from 'assert';
import vm from 'vm';
import test from 'node:test';

const html = fs.readFileSync(new URL('../command-center/index.html', import.meta.url), 'utf8');
const open = html.lastIndexOf('<script>');
const close = html.lastIndexOf('</script>');
const script = html.slice(open + 8, close);

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

const src = ['moneyFit', 'moneyShort', 'signalPlainMoney', 'signalNoteJargon', 'signalNoteKeep', 'signalPlainNotes'].map(extract).join('\n');
const context = { result: null };
vm.createContext(context);
vm.runInContext(src + '\nresult = { signalPlainNotes: signalPlainNotes, signalNoteJargon: signalNoteJargon };', context);
const signalPlainNotes = context.result.signalPlainNotes;

const devin = "Devin is fully paid ($1,000/mo plus setup). Delivered work was already a month overdue as of Oct 22. Ops Nov 11 still lists Devin CORE stamp rows as pending (client result this week). An earlier Ops check (around early November) said 10 Needs Review, none stamped, with six rows awaiting review: R2, R4, R5, R6, R7, and R10. That exact row list was not re-counted on Nov 11, so treat the row ids as last-known, not freshly audited. Value is monthly retainer health, not new cash. Voice memo bank Nov 11 (memos 1448, 1450, 1460, dated 2026-11-05, Nexus East Devin session). Lesson from that working session: target a 6 to 12 hour turnaround on script reviews and keep the filming accountability loop on one proven format. Progress over perfection. Related promise is tracked separately as rem-devin-github (GitHub website access). Reminder for Cristian only; no bot messages anyone else.";

const devinKept = 'Devin is fully paid ($1K/mo plus setup). Delivered work was already a month overdue as of Oct 22. Value is monthly retainer health, not new cash. Lesson from that working session: target a 6 to 12 hour turnaround on script reviews and keep the filming accountability loop on one proven format. Progress over perfection. Reminder for Cristian only; no bot messages anyone else. ';

function sentences(text) {
  return text.split(/(?<=\.)\s/).filter(Boolean);
}

test('live-shaped Devin note drops jargon sentences and keeps the rest', () => {
  const out = signalPlainNotes(devin);
  assert.strictEqual(out, devinKept);
  assert.doesNotMatch(out, /R\d+|none stamped|last-known|row ids|CORE|memo|rem-devin|script list was not rechecked|last copy on file|none of the scripts|Scripts are waiting/i);
  sentences(out).forEach((line) => {
    assert.match(line, /\.$/);
  });
  assert.match(out, /\. $/);
});

test('a jargon sentence is dropped instead of rewritten', () => {
  const out = signalPlainNotes('Ship the cut tomorrow. with six rows awaiting review:,,, and. Call Jan in the morning.');
  assert.strictEqual(out, 'Ship the cut tomorrow. Call Jan in the morning. ');
});

test('nothing readable is left as an empty string', () => {
  assert.strictEqual(signalPlainNotes(''), '');
  assert.strictEqual(signalPlainNotes('   '), '');
  assert.strictEqual(signalPlainNotes(null), '');
  assert.strictEqual(signalPlainNotes('none stamped. R2, R4, and R10. treat the row ids as last-known.'), '');
  assert.strictEqual(signalPlainNotes(',,, and.'), '');
  assert.strictEqual(signalPlainNotes('Voice memo bank Nov 11 (memos 1448, 1450).'), '');
});

test('kept sentences end with a period and a space, and leftover punctuation collapses', () => {
  assert.strictEqual(signalPlainNotes('Paid in full.Next step is to film'), 'Paid in full. Next step is to film. ');
  assert.strictEqual(signalPlainNotes('Hello,,   world!!!'), 'Hello, world. ');
  assert.strictEqual(signalPlainNotes('The balance is $1,537.89 today.'), 'The balance is $1.5K today. ');
  assert.strictEqual(signalPlainNotes('The core offer stays at one price.'), 'The core offer stays at one price. ');
});

test('ids and stamp words drop the whole sentence', () => {
  const id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
  const out = signalPlainNotes('Confirm the payment before acting. See memo ' + id + ' for the tape. Then send the note.');
  assert.strictEqual(out, 'Confirm the payment before acting. Then send the note. ');
  assert.strictEqual(signalPlainNotes('Seven scripts stamped client-ready. Film them this week.'), 'Film them this week. ');
  assert.strictEqual(signalPlainNotes('Nov 7 memo [1473]: check the audio. Confirm it against the payment record.'), 'Confirm it against the payment record. ');
});
