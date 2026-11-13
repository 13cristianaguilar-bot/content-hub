import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { OFFERS, PUBLIC_ORIGIN } from "../supabase/functions/booking/calendars.mjs";

const root = path.resolve("book");

function jpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

function pngSize(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test("every offer page has its own preview tags and no redirect", async () => {
  const titles = new Set();
  const images = new Set();
  for (const offer of OFFERS) {
    const html = await readFile(path.join(root, offer.slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`<title>${escapeReg(offer.ogTitle.replaceAll("&", "&amp;"))}</title>`));
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /rel="icon"/);
    assert.match(html, /rel="apple-touch-icon"/);
    assert.equal(html.includes("noindex"), false);
    assert.equal(html.includes("http-equiv=\"refresh\""), false);
    assert.equal(html.includes("http-equiv=\"Refresh\""), false);
    assert.match(html, new RegExp(`${PUBLIC_ORIGIN}/book/${offer.slug}/`));
    assert.match(html, new RegExp(`${PUBLIC_ORIGIN}/book/og/${offer.slug}\\.jpg`));
    titles.add(offer.ogTitle);
    images.add(`${offer.slug}.jpg`);
    const card = await readFile(path.join(root, "og", `${offer.slug}.jpg`));
    const size = jpegSize(card);
    assert.deepEqual(size, { width: 1200, height: 630 });
    assert.ok(card.length < 300_000, `${offer.slug} card is ${card.length} bytes`);
  }
  assert.equal(titles.size, OFFERS.length);
  assert.equal(images.size, OFFERS.length);
  const home = await readFile(path.join(root, "index.html"), "utf8");
  assert.match(home, /Book a call \| Signal Marketing/);
  assert.equal(home.includes("noindex"), false);
  const homeCard = jpegSize(await readFile(path.join(root, "og", "home.jpg")));
  assert.deepEqual(homeCard, { width: 1200, height: 630 });
  const favicon = pngSize(await readFile(path.join(root, "assets", "favicon-32.png")));
  assert.equal(favicon.width, 32);
});

test("public copy has no emoji and no em dash", async () => {
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(html|css|js|mjs|md)$/.test(entry.name)) files.push(full);
    }
  }
  await walk(root);
  files.push(path.resolve("supabase/functions/booking/calendars.mjs"));
  const banned = /\u2014|\u2013|\p{Extended_Pictographic}/u;
  for (const file of files) {
    const text = await readFile(file, "utf8");
    assert.equal(banned.test(text), false, file);
  }
});

function escapeReg(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
