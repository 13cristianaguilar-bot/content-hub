import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CONSENT, OFFERS, PUBLIC_ORIGIN } from "../supabase/functions/booking/calendars.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const book = path.join(root, "book");
const lib = path.join(root, "supabase/functions/booking");

const MARK = `<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="12" fill="#080808"></rect><g stroke="#ef3038" stroke-width="5" stroke-linecap="round"><path d="M14 27v10M23 19v26M32 11v42M41 21v22M50 27v10"></path></g></svg>`;

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function head({ title, description, canonical, image, imageAlt, assetPrefix }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#080808">
<meta name="color-scheme" content="dark">
<meta name="robots" content="index, follow">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Signal Marketing">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:secure_url" content="${esc(image)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<link rel="icon" href="${assetPrefix}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${assetPrefix}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${assetPrefix}apple-touch-icon.png">
<link rel="stylesheet" href="${assetPrefix}book.css">
</head>`;
}

function offerPage(offer) {
  const canonical = `${PUBLIC_ORIGIN}/book/${offer.slug}/`;
  const image = `${PUBLIC_ORIGIN}/book/og/${offer.slug}.jpg`;
  const prep = offer.prep.map((item) => `<li>${esc(item)}</li>`).join("");
  const price = offer.priceNote ? `<p class="price">${esc(offer.priceNote)}</p>` : "";
  const recorded = offer.recorded ? `<p class="flag">This call will be recorded.</p>` : "";
  return `${head({
    title: `${offer.ogTitle}`,
    description: offer.ogDescription,
    canonical,
    image,
    imageAlt: `Signal Marketing card for ${offer.name}, ${offer.durationLabel}`,
    assetPrefix: "../assets/",
  })}
<body data-slug="${esc(offer.slug)}">
<a class="skip" href="#times">Skip to open times</a>
<div class="glow" aria-hidden="true"></div>
<header class="top">
  <a class="brand" href="../">${MARK}<span>Signal Marketing</span></a>
  <a class="ext" href="https://signals.marketing">signals.marketing</a>
</header>
<main class="layout">
  <section class="story">
    <p class="kicker">${esc(offer.durationLabel)} · ${esc(offer.meet)}</p>
    <h1>${esc(offer.name)}</h1>
    <p class="lede">${esc(offer.headline)}</p>
    <p>${esc(offer.description)}</p>
    ${price}
    ${recorded}
    <h2>Optional, so the call is useful</h2>
    <ol class="prep">${prep}</ol>
    <p class="fine">Add any of these in the notes box. Notes are optional.</p>
  </section>
  <section class="panel" id="times" aria-labelledby="times-title">
    <div class="panel-head">
      <h2 id="times-title">Pick a time</h2>
      <p id="zone">Times show in Chicago, and in your local time.</p>
    </div>
    <p id="status" class="status" role="status"></p>
    <div id="app"></div>
  </section>
</main>
<footer class="foot">
  <span>Signal Marketing</span>
  <span aria-hidden="true">·</span>
  <a href="https://signals.marketing">signals.marketing</a>
</footer>
<noscript>
  <p class="noscript">Open times load with JavaScript. You can still read this page, then enable JavaScript to book.</p>
</noscript>
<script type="module" src="../assets/book.js"></script>
</body>
</html>
`;
}

function homePage() {
  const canonical = `${PUBLIC_ORIGIN}/book/`;
  const image = `${PUBLIC_ORIGIN}/book/og/home.jpg`;
  const cards = OFFERS.map((offer) => `<a class="choice" href="${esc(offer.slug)}/">
    <span class="kicker">${esc(offer.durationLabel)} · ${esc(offer.meet)}</span>
    <span class="choice-name">${esc(offer.name)}</span>
    <span class="choice-line">${esc(offer.ogDescription)}</span>
  </a>`).join("");
  return `${head({
    title: "Book a call | Signal Marketing",
    description: "Pick a time with Cristian Aguilar. AI Gap Audit, opportunities, content engine, or an M&A interview.",
    canonical,
    image,
    imageAlt: "Signal Marketing booking card",
    assetPrefix: "assets/",
  })}
<body data-page="home">
<a class="skip" href="#offers">Skip to calls</a>
<div class="glow" aria-hidden="true"></div>
<header class="top">
  <a class="brand" href="./">${MARK}<span>Signal Marketing</span></a>
  <a class="ext" href="https://signals.marketing">signals.marketing</a>
</header>
<main class="home">
  <p class="kicker">Book a call</p>
  <h1>Pick the conversation.</h1>
  <p class="lede">Five ways to spend time with Cristian Aguilar. Each page has its own link, so the preview in a text or DM matches the call.</p>
  <div class="choices" id="offers">${cards}</div>
</main>
<footer class="foot">
  <span>Signal Marketing</span>
  <span aria-hidden="true">·</span>
  <a href="https://signals.marketing">signals.marketing</a>
</footer>
</body>
</html>
`;
}

await mkdir(path.join(book, "assets/lib"), { recursive: true });
await mkdir(path.join(book, "og"), { recursive: true });
for (const file of ["calendars.mjs", "time.mjs", "engine.mjs", "validate.mjs"]) {
  await copyFile(path.join(lib, file), path.join(book, "assets/lib", file));
}
await copyFile("/tmp/favicon.svg", path.join(book, "assets/favicon.svg")).catch(async () => {
  const svg = await readFile(path.join(root, "book/assets/favicon.svg"), "utf8").catch(() => "");
  if (!svg) throw new Error("favicon.svg missing");
});
for (const offer of OFFERS) {
  await mkdir(path.join(book, offer.slug), { recursive: true });
  await writeFile(path.join(book, offer.slug, "index.html"), offerPage(offer));
}
await writeFile(path.join(book, "index.html"), homePage());
console.log(`Rendered ${OFFERS.length} booking pages. Consent line kept in the form: ${CONSENT.slice(0, 24)}...`);
