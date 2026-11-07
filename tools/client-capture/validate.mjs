import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function sha256File(path) {
  return sha256(readFileSync(path));
}

function asText(value) {
  return value == null ? '' : String(value);
}

export function appVersion(html) {
  const match = String(html).match(/const APP_VERSION = '([^']+)'/);
  return match ? match[1] : '';
}

export function validateExport({ exportBytes, manifest, seven }) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object') errors.push('manifest missing');
  const digest = sha256(exportBytes);
  if (!manifest || manifest.sha256 !== digest) errors.push('export sha256 does not match the manifest');
  let rows;
  try {
    rows = JSON.parse(exportBytes.toString('utf8'));
  } catch (err) {
    errors.push('export is not json');
    return { ok: false, errors, rows: [], digest };
  }
  if (!Array.isArray(rows)) errors.push('export must be a json array of script rows');
  if (manifest && manifest.row_count != null && rows.length !== Number(manifest.row_count)) {
    errors.push('row count does not match the manifest');
  }
  const slug = manifest && manifest.filter ? String(manifest.filter) : '';
  const expectSlug = (slug.match(/client_slug='([^']+)'/) || [])[1] || '';
  if (expectSlug) {
    rows.forEach((row, i) => {
      if (!row || row.client_slug !== expectSlug) errors.push('row ' + i + ' is not ' + expectSlug);
    });
  }
  const listed = (manifest && manifest.current_seven) || [];
  listed.forEach(entry => {
    const id = entry && entry[0];
    const reel = entry && entry[1];
    const status = entry && entry[2];
    const chars = entry && entry[3];
    const row = rows.find(item => item && item.id === id);
    if (!row) {
      errors.push('manifest id missing from export: ' + id);
      return;
    }
    if (Number(row.reel_number) !== Number(reel)) errors.push('reel mismatch for ' + id);
    if (row.status !== status) errors.push('status mismatch for ' + id);
    if (asText(row.full_script).length !== Number(chars)) errors.push('full_script length mismatch for ' + id);
  });
  if (Array.isArray(seven)) {
    if (seven.length !== listed.length) errors.push('seven-file count does not match the manifest');
    seven.forEach(row => {
      const id = row && row.id;
      const source = rows.find(item => item && item.id === id);
      if (!source) {
        errors.push('seven-file id missing from export: ' + id);
        return;
      }
      if (asText(source.full_script) !== asText(row.full_script)) errors.push('seven-file full_script differs for ' + id);
      if (source.status !== row.status) errors.push('seven-file status differs for ' + id);
    });
  }
  return { ok: errors.length === 0, errors, rows, digest };
}

export function validateRenderer({ localHtml, liveHtml, expectedVersion }) {
  const errors = [];
  const local = Buffer.isBuffer(localHtml) ? localHtml : Buffer.from(String(localHtml));
  const live = Buffer.isBuffer(liveHtml) ? liveHtml : Buffer.from(String(liveHtml));
  const localHash = sha256(local);
  const liveHash = sha256(live);
  if (localHash !== liveHash) errors.push('local renderer bytes do not match the deployed page');
  const version = appVersion(local.toString('utf8'));
  const liveVersion = appVersion(live.toString('utf8'));
  if (!version || version !== liveVersion) errors.push('app version string differs from the deployed page');
  if (expectedVersion && version !== expectedVersion) errors.push('app version is not ' + expectedVersion);
  if (!local.toString('utf8').includes('function clientSpokenScript(')) errors.push('renderer is missing the client spoken-script function');
  if (!local.toString('utf8').includes("location.hostname === '127.0.0.1'")) errors.push('renderer is missing the localhost-only preview gate');
  return { ok: errors.length === 0, errors, version, localHash, liveHash };
}
