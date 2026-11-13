import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "/tmp/pw/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js";

const port = 4173;
const base = `http://127.0.0.1:${port}`;
const outDir = "/opt/cursor/artifacts/booking";
const issues = [];
const slugs = ["audit", "connect", "content-engine", "ma", "ma-30"];
const agents = {
  facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  whatsapp: "WhatsApp/2.23.20.0",
  imessage: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
  instagram: "Instagram 219.0.0.12.117 Android",
};

function note(kind, detail) {
  issues.push({ kind, detail });
  console.log(`${kind}: ${detail}`);
}

await mkdir(outDir, { recursive: true });
const killer = spawn("fuser", ["-k", `${port}/tcp`], { stdio: "ignore" });
killer.on("error", () => {});
await new Promise((resolve) => setTimeout(resolve, 300));
const server = spawn("node", ["booking/dev-server.mjs"], { stdio: ["ignore", "pipe", "pipe"] });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("server did not start")), 8000);
  server.stdout.on("data", (chunk) => {
    if (String(chunk).includes("4173")) {
      clearTimeout(timer);
      resolve();
    }
  });
  server.stderr.on("data", (chunk) => console.error(String(chunk)));
});

for (const slug of slugs) {
  for (const [name, ua] of Object.entries(agents)) {
    const res = await fetch(`${base}/book/${slug}/`, { headers: { "user-agent": ua } });
    const html = await res.text();
    if (res.status !== 200) note("crawler", `${name} ${slug} status ${res.status}`);
    if (!html.includes('property="og:title"') || !html.includes('property="og:image"') || !html.includes("twitter:card")) {
      note("crawler", `${name} ${slug} missing preview tags`);
    }
    if (/http-equiv=["']refresh["']/i.test(html) || html.includes("noindex")) note("crawler", `${name} ${slug} redirect or noindex`);
    const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (image) {
      const local = image.replace("https://13cristianaguilar-bot.github.io/content-hub", base);
      const card = await fetch(local, { headers: { "user-agent": ua } });
      if (card.status !== 200 || !card.headers.get("content-type")?.includes("image")) {
        note("crawler", `${name} ${slug} image ${card.status}`);
      }
    }
    const icon = await fetch(`${base}/book/assets/favicon.svg`, { headers: { "user-agent": ua } });
    if (icon.status !== 200) note("crawler", `favicon ${icon.status}`);
  }
}

const launch = () => puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: "new",
  protocolTimeout: 20000,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
let browser = await launch();

async function open(width, height, timezone, url) {
  console.log("open", timezone, url);
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("fontsource")) errors.push(`${res.status()} ${res.url()}`);
  });
  await page.emulateTimezone(timezone);
  await page.setViewport({ width, height, deviceScaleFactor: width < 500 ? 2 : 1, isMobile: width < 500, hasTouch: width < 500 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  console.log("loaded", url);
  return { page, errors };
}

async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

for (const width of process.env.SKIP_SWEEP ? [] : [320, 390, 768, 1280]) {
  for (const slug of slugs) {
    console.log("page", slug, width);
    const { page, errors } = await open(width, width < 500 ? 844 : 900, "America/Chicago", `${base}/book/${slug}/?preview=1`);
    await page.waitForSelector(".slot", { timeout: 8000 });
    if (await overflow(page)) note("layout", `${slug} overflows at ${width}`);
    const text = await page.evaluate(() => document.body.innerText);
    const clipped = await page.evaluate(() => {
      const bad = [];
      for (const node of document.querySelectorAll("body *")) {
        if (node.closest(".days")) continue;
        const rect = node.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) continue;
        if (rect.right > window.innerWidth + 1 || rect.left < -1) bad.push(`${node.tagName}.${node.className}`.slice(0, 80));
      }
      return [...new Set(bad)].slice(0, 6);
    });
    if (clipped.length) note("layout", `${slug} clips at ${width}: ${clipped.join(", ")}`);
    if (text.includes("\u2014") || text.includes("\u2013")) note("copy", `${slug} has a dash at ${width}`);
    const duration = slug === "ma-30" ? /30 min/i : /60 min/i;
    if (!duration.test(text)) note("copy", `${slug} duration missing`);
    if (slug === "audit" && !text.includes("$100")) note("copy", "audit price missing");
    if (slug === "ma" && !text.toLowerCase().includes("recorded")) note("copy", "recorded line missing");
    const h1 = await page.$eval("h1", (node) => node.textContent);
    if (!h1) note("a11y", `${slug} missing h1`);
    await page.screenshot({ path: `${outDir}/${slug}-${width}.png`, fullPage: true });
    if (errors.length) note("console", `${slug} ${width}: ${errors.join(" | ")}`);
    await page.close();
  }
}

const home = await open(390, 844, "America/Chicago", `${base}/book/`);
await home.page.screenshot({ path: `${outDir}/home-390.png`, fullPage: true });
if (await overflow(home.page)) note("layout", "home overflows");
await home.page.close();

async function bookFlow(width, timezone) {
  console.log("book", width, timezone);
  const { page, errors } = await open(width, width < 500 ? 900 : 1000, timezone, `${base}/book/audit/`);
  console.log("waiting for slots", timezone);
  await page.waitForSelector(".slot", { timeout: 8000 });
  console.log("slots visible", timezone);
  const before = await page.$$eval(".slot", (nodes) => nodes.length);
  if (before < 1) note("flow", `no slots at ${width} ${timezone}`);
  const local = await page.$$eval(".slot span", (nodes) => nodes.map((node) => node.textContent));
  if (timezone !== "America/Chicago" && !local.some((line) => line.includes("your time"))) {
    note("timezone", `no local time at ${timezone}`);
  }
  if (timezone === "Pacific/Auckland") {
    const shifted = local.some((line) => /,/.test(line));
    if (!shifted) note("timezone", "Auckland evening slots do not show the local date");
  }
  await page.click(".slot");
  await page.waitForSelector("#details");
  if (width === 390 && timezone === "America/Chicago") {
    await page.screenshot({ path: `${outDir}/form-390.png`, fullPage: true });
  }
  if (width === 1280) await page.screenshot({ path: `${outDir}/form-1280.png`, fullPage: true });
  await page.click(".btn[type=submit]");
  await page.waitForFunction(() => document.body.innerText.includes("Enter your name."), { timeout: 8000 }).catch(async (error) => {
    note("flow", `validation did not show at ${width}: ${(await page.evaluate(() => document.body.innerText)).slice(0, 400)}`);
    throw error;
  });
  await page.type("#f-name", "Ada Lovelace");
  await page.type("#f-email", "not-an-email");
  await page.type("#f-phone", "555");
  await page.click(".btn[type=submit]");
  await page.waitForFunction(() => document.body.innerText.includes("Enter a valid email."));
  await page.$eval("#f-email", (node) => { node.value = ""; node.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.type("#f-email", "ada@example.com");
  await page.$eval("#f-phone", (node) => { node.value = ""; node.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.type("#f-phone", "5125550134");
  await page.type("#f-notes", "Website example.com");
  await page.click("#consent");
  await page.click(".btn[type=submit]");
  await page.waitForFunction(() => document.body.innerText.includes("You are booked."), { timeout: 8000 });
  const meet = await page.$eval("a.meet", (node) => node.href).catch(() => "");
  if (!meet.startsWith("https://meet.google.com/")) note("flow", "missing meet link");
  await page.screenshot({ path: `${outDir}/booked-${width}-${timezone.split("/").pop()}.png`, fullPage: true });
  if (errors.length) note("console", `flow ${width} ${timezone}: ${errors.join(" | ")}`);
  const slotText = await page.$eval(".summary", (node) => node.textContent);
  await page.click("button.btn.ghost:last-of-type");
  await page.waitForFunction(() => document.body.innerText.includes("Cancel this time?"));
  await page.click(".btn:not(.ghost)");
  await page.waitForFunction(() => document.body.innerText.includes("The time is cancelled."), { timeout: 8000 });
  await page.close();
  return slotText;
}

await browser.close();
browser = await launch();
const chicagoSummary = await bookFlow(390, "America/Chicago");
const laSummary = await bookFlow(1280, "America/Los_Angeles");
if (!laSummary.includes("your time")) note("timezone", "desktop LA confirmation missing local time");
if (!chicagoSummary.includes("Chicago time")) note("timezone", "confirmation missing Chicago time");
await browser.close();
browser = await launch();
await bookFlow(390, "Pacific/Auckland");

const london = await open(390, 844, "Europe/London", `${base}/book/connect/`);
await london.page.waitForSelector(".slot span", { timeout: 8000 });
const londonText = await london.page.$$eval(".slot span", (nodes) => nodes.map((node) => node.textContent).join(" "));
if (!londonText.includes("your time")) note("timezone", "London does not show local time");
await london.page.close();

async function fillAndSubmit(page, person) {
  await page.click(".slot");
  await page.waitForSelector("#f-name");
  await page.type("#f-name", person.name);
  await page.type("#f-email", person.email);
  await page.type("#f-phone", person.phone);
  await page.click("#consent");
  await page.click(".btn[type=submit]");
}
const raceA = await open(390, 900, "America/Chicago", `${base}/book/ma-30/`);
const raceB = await open(1280, 900, "America/Chicago", `${base}/book/ma-30/`);
await raceA.page.waitForSelector(".slot");
await raceB.page.waitForSelector(".slot");
const labelA = await raceA.page.$eval(".slot", (node) => node.getAttribute("aria-label"));
const labelB = await raceB.page.$eval(".slot", (node) => node.getAttribute("aria-label"));
if (labelA !== labelB) note("race", `first slots differed: ${labelA} vs ${labelB}`);
await Promise.all([
  fillAndSubmit(raceA.page, { name: "Grace Hopper", email: "grace@example.com", phone: "5125550199" }),
  fillAndSubmit(raceB.page, { name: "Katherine Johnson", email: "katherine@example.com", phone: "5125550188" }),
]);
await Promise.all([
  raceA.page.waitForFunction(() => /You are booked\.|That time was just taken\./.test(document.body.innerText), { timeout: 8000 }),
  raceB.page.waitForFunction(() => /You are booked\.|That time was just taken\./.test(document.body.innerText), { timeout: 8000 }),
]);
const raceText = [
  await raceA.page.evaluate(() => document.body.innerText),
  await raceB.page.evaluate(() => document.body.innerText),
];
const wins = raceText.filter((text) => text.includes("You are booked.")).length;
const losses = raceText.filter((text) => text.includes("That time was just taken.")).length;
if (wins !== 1 || losses !== 1) note("race", `expected one booking and one conflict, saw wins ${wins} losses ${losses}`);
await raceA.page.screenshot({ path: `${outDir}/race-a.png`, fullPage: true });
await raceB.page.screenshot({ path: `${outDir}/race-b.png`, fullPage: true });
await raceA.page.close();
await raceB.page.close();

await browser.close();
browser = await launch();
const slow = await browser.newPage();
const client = await slow.createCDPSession();
await client.send("Network.enable");
await client.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 2500,
  downloadThroughput: 40 * 1024,
  uploadThroughput: 20 * 1024,
});
await slow.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
const seen = { skeleton: false, slots: false };
slow.on("response", () => {});
const nav = slow.goto(`${base}/book/connect/`, { waitUntil: "domcontentloaded", timeout: 30000 });
await slow.waitForSelector(".skeleton", { timeout: 12000 }).then(() => { seen.skeleton = true; }).catch(() => {});
await nav;
await slow.waitForSelector(".slot", { timeout: 20000 }).then(() => { seen.slots = true; }).catch(() => {});
if (!seen.skeleton) note("slow", "no skeleton while the calendar was slow");
if (!seen.slots) note("slow", "slots never arrived on a slow network");
await slow.screenshot({ path: `${outDir}/slow-connect.png`, fullPage: true });
await slow.close();

const blocked = await browser.newPage();
await blocked.setViewport({ width: 390, height: 844 });
await blocked.setRequestInterception(true);
blocked.on("request", (request) => {
  if (request.url().includes("/api/booking")) request.abort();
  else request.continue();
});
await blocked.goto(`${base}/book/ma-30/`, { waitUntil: "domcontentloaded" });
await blocked.waitForFunction(() => document.body.innerText.includes("connection dropped") || document.body.innerText.includes("Refresh times"), { timeout: 8000 }).catch(() => note("error-state", "offline state missing"));
await blocked.screenshot({ path: `${outDir}/offline-ma30.png`, fullPage: true });
await blocked.close();

const debug = await fetch(`${base}/api/debug`).then((res) => res.json());
if (debug.deleted < 1) note("flow", `expected a cancelled event, saw ${JSON.stringify(debug)}`);

await browser.close();
server.kill();
await writeFile(`${outDir}/review.json`, JSON.stringify({ issues, debug }, null, 2));
console.log(JSON.stringify({ issueCount: issues.length, debug }, null, 2));
if (issues.length) process.exit(1);
