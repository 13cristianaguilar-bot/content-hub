import { spawn } from 'child_process';
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, isAbsolute, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { appVersion, sha256File, validateExport, validateRenderer } from './validate.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');
const sheetPy = join(here, 'sheet.py');
const LABEL = [
  'Real-data client-renderer preview.',
  'Reconstructed from an owner script export through the deployed page.',
  'Not an authenticated client login.',
].join(' ');

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  if (i < 0) return fallback;
  return process.argv[i + 1];
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function insideRepo(path) {
  const rel = relative(repoRoot, resolve(path));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function norm(value) {
  return String(value || '').toLowerCase().replace(/[“”"']/g, '').replace(/\s+/g, ' ').trim();
}

function paragraphs(value) {
  return String(value || '').split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
}

async function fetchLive(url) {
  const response = await fetch(url, { headers: { 'cache-control': 'no-cache', pragma: 'no-cache' } });
  if (!response.ok) throw new Error('live renderer HTTP ' + response.status);
  return Buffer.from(await response.arrayBuffer());
}

function startServer(dir, port) {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: dir,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return child;
}

async function waitForServer(port) {
  for (let i = 0; i < 40; i++) {
    try {
      const response = await fetch('http://127.0.0.1:' + port + '/index.html');
      if (response.ok) return;
    } catch (err) {}
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error('local renderer did not start');
}

function runPy(args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn('python3', [sheetPy, ...args], { stdio: 'inherit' });
    child.on('exit', code => code === 0 ? resolvePromise() : reject(new Error('sheet.py ' + args[0] + ' failed')));
  });
}

async function shootFitted(page, file, dsf) {
  const first = await page.evaluate(() => {
    const sc = document.getElementById('prep-scroll');
    const prep = document.getElementById('prep');
    const bar = document.querySelector('.prep-bar');
    if (!sc || !prep) return null;
    const sr = sc.getBoundingClientRect();
    const pr = prep.getBoundingClientRect();
    const br = bar ? bar.getBoundingClientRect() : { x: 0, y: window.innerHeight, width: window.innerWidth, height: 0 };
    return {
      scrollHeight: sc.scrollHeight,
      clientHeight: sc.clientHeight,
      scroll: { x: sr.x, y: sr.y, w: sr.width, h: sr.height },
      header: { x: pr.x, y: pr.y, w: pr.width, h: Math.max(0, sr.y - pr.y) },
      footer: { x: br.x, y: br.y, w: br.width, h: br.height },
    };
  });
  if (!first) throw new Error('script sheet is not open');
  if (first.scrollHeight <= first.clientHeight + 2) {
    await page.screenshot({ path: file, fullPage: false });
    return { stitched: false };
  }
  const sliceDir = file + '.slices';
  mkdirSync(sliceDir, { recursive: true });
  const step = Math.max(120, first.clientHeight - 48);
  const max = Math.max(0, first.scrollHeight - first.clientHeight);
  const planned = [];
  for (let top = 0; top < max - 1; top += step) planned.push(top);
  planned.push(max);
  const tops = [];
  const slices = [];
  let previous = -1;
  for (let i = 0; i < planned.length; i++) {
    await page.evaluate(scrollTop => {
      document.getElementById('prep-scroll').scrollTop = scrollTop;
    }, planned[i]);
    await new Promise(resolve => setTimeout(resolve, 80));
    const actual = await page.evaluate(() => document.getElementById('prep-scroll').scrollTop);
    if (actual <= previous) continue;
    previous = actual;
    tops.push(actual);
    const slice = join(sliceDir, String(tops.length - 1) + '.png');
    await page.screenshot({ path: slice, fullPage: false });
    slices.push(slice);
  }
  const meta = {
    dsf,
    slices,
    scroll: first.scroll,
    header: first.header,
    footer: first.footer,
    scrollTops: tops,
  };
  const metaPath = file + '.meta.json';
  writeFileSync(metaPath, JSON.stringify(meta));
  await runPy(['stitch', metaPath, file]);
  rmSync(sliceDir, { recursive: true, force: true });
  rmSync(metaPath, { force: true });
  await page.evaluate(() => { document.getElementById('prep-scroll').scrollTop = 0; });
  return { stitched: true, slices: tops.length };
}

async function main() {
  const exportPath = arg('--export');
  const manifestPath = arg('--manifest');
  const sevenPath = arg('--seven');
  const outDir = arg('--out');
  const rendererPath = arg('--renderer', join(repoRoot, 'index.html'));
  const liveUrl = arg('--live-url', 'https://13cristianaguilar-bot.github.io/content-hub/index.html');
  const expectedVersion = arg('--expected-version', '2026.11.06.1');
  const chromePath = arg('--chrome', process.env.CHROME_PATH || '/opt/google/chrome/chrome');
  const puppeteerModule = arg('--puppeteer', process.env.PUPPETEER_MODULE || '/tmp/qa-deps/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js');
  if (!exportPath || !manifestPath || !sevenPath || !outDir) fail('Need --export, --manifest, --seven, and --out');
  if (!isAbsolute(outDir)) fail('--out must be an absolute path');
  if (insideRepo(outDir)) fail('Refusing to write screenshots inside the repository');

  const exportBytes = readFileSync(exportPath);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const seven = JSON.parse(readFileSync(sevenPath, 'utf8'));
  const checked = validateExport({ exportBytes, manifest, seven });
  if (!checked.ok) fail(checked.errors.join('\n'));

  const liveHtml = await fetchLive(liveUrl + (liveUrl.includes('?') ? '&' : '?') + 'nocache=' + Date.now());
  const localHtml = readFileSync(rendererPath);
  const renderer = validateRenderer({ localHtml, liveHtml, expectedVersion });
  if (!renderer.ok) fail(renderer.errors.join('\n'));

  const serveDir = join(tmpdir(), 'client-capture-' + Date.now());
  mkdirSync(serveDir, { recursive: true });
  writeFileSync(join(serveDir, 'index.html'), localHtml);
  const port = 8777;
  const server = startServer(serveDir, port);
  const originals = join(outDir, 'originals');
  const labeled = join(outDir, 'labeled');
  const contacts = join(outDir, 'contacts');
  mkdirSync(originals, { recursive: true });
  mkdirSync(labeled, { recursive: true });
  mkdirSync(contacts, { recursive: true });

  const puppeteer = await import(puppeteerModule);
  const browser = await puppeteer.default.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const bodyChecks = [];
  try {
    await waitForServer(port);
    const page = await browser.newPage();
    async function openClient(width, height, dsf) {
      await page.setViewport({ width, height, deviceScaleFactor: dsf });
      await page.goto('http://127.0.0.1:' + port + '/index.html?cv=' + encodeURIComponent(renderer.version), { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => typeof window.__preview === 'function' && typeof splitClientFilmQueue === 'function');
      await page.evaluate(rows => {
        window.__preview(rows, {
          role: 'client',
          mySlug: rows[0] && rows[0].client_slug,
          viewSlug: rows[0] && rows[0].client_slug,
          autoModal: false,
          filtersOpen: false,
        });
      }, checked.rows);
      await page.waitForSelector('.batch-card');
    }

    async function queueState() {
      return page.evaluate(() => {
        const groups = groupIntoTakes(scripts.filter(row => row && row.client_slug === viewSlug));
        const split = splitClientFilmQueue(groups);
        const ids = (list) => list.map(group => queueAnchor(group, groupQueueBucket(group) === 'current' ? 'current' : 'past').id);
        const dom = Array.from(document.querySelectorAll('.batch-card')).map(card => (card.getAttribute('data-script-ids') || '').split(',')[0]);
        return { current: ids(split.current), past: ids(split.past), dom };
      });
    }

    await openClient(1280, 900, 1);
    const desktopQueue = await queueState();
    const expectedIds = (manifest.current_seven || []).map(entry => entry[0]);
    const currentSet = desktopQueue.current.slice().sort().join(',');
    const expectedSet = expectedIds.slice().sort().join(',');
    if (currentSet !== expectedSet) fail('renderer current ids do not match the manifest\n' + currentSet + '\n' + expectedSet);
    if (desktopQueue.dom.join(',') !== desktopQueue.current.join(',')) fail('on-screen cards do not match the client queue function');
    const held = checked.rows.filter(row => row.status === 'Needs Review').map(row => row.id);
    held.forEach(id => {
      if (desktopQueue.current.includes(id) || desktopQueue.past.includes(id)) fail('Needs Review row was shown: ' + id);
    });

    async function shotList(name) {
      const file = join(originals, name + '.png');
      await page.screenshot({ path: file, fullPage: true });
      await runPy(['label', file, join(labeled, name + '.png'), LABEL]);
      return join(labeled, name + '.png');
    }
    const listDesktop = await shotList('desktop-list');
    await openClient(390, 844, 2);
    const phoneQueue = await queueState();
    if (phoneQueue.dom.join(',') !== desktopQueue.current.join(',')) fail('phone list does not match the desktop client queue');
    const listPhone = await shotList('phone-list');
    await runPy(['contact', join(contacts, 'lists.png'), 'Current list, desktop and phone', listDesktop, listPhone]);

    async function sheetText() {
      return page.evaluate(() => document.getElementById('prep-scroll').innerText || '');
    }
    async function assertBody(row, where) {
      const text = norm(await sheetText());
      const missing = [];
      paragraphs(row.full_script).forEach((part, index) => {
        if (!text.includes(norm(part))) missing.push('full_script paragraph ' + (index + 1));
      });
      ['hook', 'cta'].forEach(key => {
        const part = String(row[key] || '').trim();
        if (part && !text.includes(norm(part))) missing.push(key);
      });
      const fd = row.filming_direction || {};
      ['Visual Hook', 'Text Hook'].forEach(key => {
        const part = String(fd[key] || '').trim();
        if (part && !text.includes(norm(part))) missing.push(key);
      });
      bodyChecks.push({ id: row.id, where, full_script_chars: String(row.full_script || '').length, missing });
      if (missing.length) fail(where + ' ' + row.id + ' dropped ' + missing.join(', '));
    }

    async function captureStep(name, dsf) {
      const file = join(originals, name + '.png');
      await shootFitted(page, file, dsf);
      await runPy(['label', file, join(labeled, name + '.png'), LABEL]);
      return join(labeled, name + '.png');
    }

    for (const id of desktopQueue.current) {
      const row = checked.rows.find(item => item.id === id);
      const short = id.slice(0, 8);
      await openClient(1280, 900, 1);
      await page.evaluate(scriptId => window.filmScript(scriptId), id);
      await page.waitForSelector('#prep-scroll');
      const referenceDesktop = await captureStep('desktop-reference-' + short, 1);
      await page.click('.prep-next');
      await new Promise(resolve => setTimeout(resolve, 150));
      await assertBody(row, 'desktop');
      const scriptDesktop = await captureStep('desktop-script-' + short, 1);
      await page.evaluate(() => window.closePrep());

      await openClient(390, 844, 2);
      await page.evaluate(scriptId => window.filmScript(scriptId), id);
      await page.waitForSelector('#prep-scroll');
      const referencePhone = await captureStep('phone-reference-' + short, 2);
      await page.click('.prep-next');
      await new Promise(resolve => setTimeout(resolve, 150));
      await assertBody(row, 'phone');
      const scriptPhone = await captureStep('phone-script-' + short, 2);
      await page.evaluate(() => window.closePrep());
      await runPy([
        'contact',
        join(contacts, short + '.png'),
        'Script ' + short + ', reference and full script, desktop and phone',
        referenceDesktop,
        scriptDesktop,
        referencePhone,
        scriptPhone,
      ]);
      console.log('captured', short);
    }

    const provenance = {
      label: LABEL,
      authenticated_session: false,
      extracted_at: manifest.extracted_at || '',
      source_project: manifest.source_project || '',
      table: manifest.table || '',
      filter: manifest.filter || '',
      export_sha256: checked.digest,
      renderer_sha256: renderer.localHash,
      live_sha256: renderer.liveHash,
      app_version: renderer.version,
      live_url: liveUrl,
      current_ids: desktopQueue.current,
      past_count: desktopQueue.past.length,
      needs_review_hidden: held,
      body_checks: bodyChecks,
    };
    writeFileSync(join(outDir, 'provenance.json'), JSON.stringify(provenance, null, 2));
    console.log('wrote', outDir);
  } finally {
    await browser.close().catch(() => {});
    server.kill('SIGTERM');
    rmSync(serveDir, { recursive: true, force: true });
  }
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
