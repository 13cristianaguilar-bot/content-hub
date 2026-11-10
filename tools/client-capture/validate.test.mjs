import assert from 'assert';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { sha256, validateExport, validateRenderer } from './validate.mjs';

const dir = mkdtempSync(join(tmpdir(), 'capture-validate-'));
const rows = [
  { id: 'row-1', client_slug: 'ada', reel_number: 1, status: 'Approved', full_script: 'One two.' },
  { id: 'row-2', client_slug: 'ada', reel_number: 2, status: 'Draft', full_script: 'Draft body.' },
];
const exportBytes = Buffer.from(JSON.stringify(rows));
const manifest = {
  filter: "client_slug='ada'",
  row_count: 2,
  sha256: sha256(exportBytes),
  current_seven: [['row-1', 1, 'Approved', 'One two.'.length]],
};
const good = validateExport({ exportBytes, manifest, seven: [rows[0]] });
assert.strictEqual(good.ok, true, good.errors.join('; '));

const badHash = validateExport({
  exportBytes,
  manifest: Object.assign({}, manifest, { sha256: '0'.repeat(64) }),
  seven: [rows[0]],
});
assert.strictEqual(badHash.ok, false);
assert.ok(badHash.errors.some(line => line.includes('sha256')));

const badLen = validateExport({
  exportBytes,
  manifest: Object.assign({}, manifest, { current_seven: [['row-1', 1, 'Approved', 3]] }),
  seven: [rows[0]],
});
assert.strictEqual(badLen.ok, false);

const html = "<script>const APP_VERSION = '2099.1.1';\nfunction clientSpokenScript(){}\nif (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {}\n</script>";
const same = validateRenderer({ localHtml: html, liveHtml: html, expectedVersion: '2099.1.1' });
assert.strictEqual(same.ok, true, same.errors.join('; '));
const drifted = validateRenderer({ localHtml: html + ' ', liveHtml: html, expectedVersion: '2099.1.1' });
assert.strictEqual(drifted.ok, false);

writeFileSync(join(dir, 'note.txt'), 'ok');
rmSync(dir, { recursive: true, force: true });
console.log('client-capture validate tests passed');
