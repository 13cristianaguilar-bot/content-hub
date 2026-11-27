import { DECK } from "./deck.js?v=20261127";
import {
  STORAGE_KEY,
  parseStored,
  picked,
  picksText,
  popVote,
  position,
  pushVote,
  remaining,
  serialize,
  thumbUrls,
} from "./logic.js?v=20261127";

const EXIT = {
  skip: "translate3d(-130%, 28px, 0) rotate(-16deg)",
  like: "translate3d(130%, 28px, 0) rotate(16deg)",
  super: "translate3d(0, -120%, 0) scale(.94)",
};
const ENTER = {
  skip: "translate3d(-70%, 0, 0) rotate(-8deg)",
  like: "translate3d(70%, 0, 0) rotate(8deg)",
  super: "translate3d(0, -60%, 0)",
};

const byId = new Map(DECK.map((video) => [video.id, video]));
const $ = (id) => document.getElementById(id);

const deckView = $("deckView");
const resultsView = $("resultsView");
const stack = $("stack");
const emptyDeck = $("emptyDeck");
const actions = $("actions");
const stage = $("stage");
const barFill = $("barFill");
const posEl = $("pos");
const totalEl = $("total");
const picksCount = $("picksCount");
const picksBtn = $("btn-picks");
const undoBtn = $("btn-undo");
const toast = $("toast");
const sheet = $("sheet");
const sheetText = $("sheetText");

let log = [];
let frontEl = null;
let backEl = null;
let busy = false;
let toastTimer = 0;

totalEl.textContent = String(DECK.length);

function readLog() {
  try {
    return parseStored(DECK, localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, serialize(log));
  } catch {
    /* private mode can refuse storage; the session still works */
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("on"), 1400);
}

function bindThumb(img, id) {
  const urls = thumbUrls(id);
  let step = 0;
  const generation = `${id}:${Math.random().toString(36).slice(2)}`;
  img.dataset.g = generation;
  img.referrerPolicy = "no-referrer";
  img.decoding = "async";
  img.alt = img.alt || "";
  const alive = () => img.dataset.g === generation;
  img.onload = () => {
    if (!alive()) return;
    if (step === 0 && img.naturalWidth > 0 && img.naturalWidth <= 120) {
      step = 1;
      img.src = urls.hq;
      return;
    }
    img.classList.add("ready");
  };
  img.onerror = () => {
    if (!alive()) return;
    if (step === 0) {
      step = 1;
      img.src = urls.hq;
      return;
    }
    img.closest(".shot, .frame")?.classList.add("broken");
  };
  img.classList.remove("ready");
  step = 0;
  img.src = urls.max;
}

function warm(items) {
  for (const video of items.slice(2, 5)) {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.src = thumbUrls(video.id).max;
  }
}

function stamp(kind, text) {
  const node = document.createElement("div");
  node.className = `stamp ${kind}`;
  node.textContent = text;
  return node;
}

function makeCard(video, place) {
  const card = document.createElement("article");
  card.className = `card ${place}`;
  card.dataset.id = video.id;
  if (place === "back") card.setAttribute("aria-hidden", "true");
  else card.setAttribute("aria-label", `${video.channel}. ${video.title}`);

  const shot = document.createElement("div");
  shot.className = "shot";
  const img = document.createElement("img");
  img.alt = video.title;
  img.draggable = false;
  bindThumb(img, video.id);
  const miss = document.createElement("div");
  miss.className = "miss";
  miss.textContent = "Thumbnail didn't load. You can still vote, or open the video.";
  shot.append(img, stamp("skip", "Skip"), stamp("like", "Like"), stamp("super", "Copy"), miss);

  const rank = document.createElement("div");
  rank.className = "badge rank";
  rank.textContent = `#${video.rank}`;
  const mult = document.createElement("div");
  mult.className = "badge mult";
  mult.textContent = `${Number(video.multiplier).toFixed(1)}×`;
  shot.append(rank, mult);

  const meta = document.createElement("div");
  meta.className = "meta";
  const style = document.createElement("p");
  style.className = "style";
  style.textContent = video.style;
  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = video.title;
  const channel = document.createElement("p");
  channel.className = "channel";
  channel.textContent = video.channel;
  const stats = document.createElement("p");
  stats.className = "stats";
  const views = document.createElement("span");
  views.textContent = `${video.views.toLocaleString("en-US")} views`;
  const multInline = document.createElement("span");
  multInline.className = "x";
  multInline.textContent = `${Number(video.multiplier).toFixed(1)}×`;
  stats.append(views, multInline);
  const watch = document.createElement("a");
  watch.className = "watch";
  watch.href = video.url;
  watch.target = "_blank";
  watch.rel = "noopener noreferrer";
  watch.textContent = "Watch video";
  meta.append(style, title, channel, stats, watch);
  card.append(shot, meta);
  bindDrag(card);
  return card;
}

function armButtons(dx, dy) {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  $("btn-skip").classList.toggle("armed", dx < -48 && ax > ay);
  $("btn-like").classList.toggle("armed", dx > 48 && ax > ay);
  $("btn-super").classList.toggle("armed", dy < -48 && ay > ax * 0.8);
}

function bindDrag(card) {
  const like = () => card.querySelector(".stamp.like");
  const skip = () => card.querySelector(".stamp.skip");
  const sup = () => card.querySelector(".stamp.super");
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dy = 0;
  let active = false;
  let pid = null;

  function clearStamps() {
    like().style.opacity = "";
    skip().style.opacity = "";
    sup().style.opacity = "";
  }

  function onDown(event) {
    if (busy || !card.classList.contains("front")) return;
    if (event.button != null && event.button !== 0) return;
    if (event.target.closest("a")) return;
    active = true;
    pid = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    dx = 0;
    dy = 0;
    stack.dataset.drag = "1";
    card.classList.add("dragging");
    try { card.setPointerCapture(event.pointerId); } catch { /* pointer already gone */ }
    event.preventDefault();
  }

  function onMove(event) {
    if (!active || event.pointerId !== pid) return;
    dx = event.clientX - startX;
    let nextY = event.clientY - startY;
    if (nextY > 0) nextY *= 0.4;
    dy = nextY;
    const rot = Math.max(-12, Math.min(12, dx / 22));
    card.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`;
    like().style.opacity = String(Math.max(0, Math.min(1, dx / 90)));
    skip().style.opacity = String(Math.max(0, Math.min(1, -dx / 90)));
    const upward = dy < 0 && Math.abs(dy) > Math.abs(dx) * 0.7;
    sup().style.opacity = upward ? String(Math.max(0, Math.min(1, -dy / 80))) : "0";
    armButtons(dx, dy);
  }

  function onUp(event) {
    if (!active) return;
    if (event && event.pointerId != null && event.pointerId !== pid && event.type !== "lostpointercapture") return;
    active = false;
    stack.dataset.drag = "0";
    card.classList.remove("dragging");
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    armButtons(0, 0);
    if (dy < -76 && ay > ax * 0.8) {
      vote("super");
      return;
    }
    if (dx > 86 && ax > ay * 0.75) {
      vote("like");
      return;
    }
    if (dx < -86 && ax > ay * 0.75) {
      vote("skip");
      return;
    }
    card.style.transform = "";
    clearStamps();
  }

  card.addEventListener("pointerdown", onDown);
  card.addEventListener("pointermove", onMove);
  card.addEventListener("pointerup", onUp);
  card.addEventListener("pointercancel", onUp);
}

function updateChrome() {
  const spot = position(DECK, log);
  posEl.textContent = String(spot.done ? spot.total : spot.current);
  barFill.style.width = `${(spot.seen / spot.total) * 100}%`;
  const picks = log.filter((item) => item.vote === "like" || item.vote === "super").length;
  picksCount.textContent = String(picks);
  picksBtn.classList.toggle("has", picks > 0);
  undoBtn.disabled = log.length === 0 || busy;
  const done = !frontEl;
  emptyDeck.hidden = !done;
  actions.hidden = done;
  stack.hidden = done;
}

function fit() {
  if (deckView.hidden) return;
  const width = stack.clientWidth || stage.clientWidth;
  if (width <= 0) return;
  const body = deckView.querySelector(".deck-body");
  const actionH = actions.offsetHeight || 0;
  const avail = (body?.clientHeight || 0) - actionH - 8;
  if (avail <= 0) return;
  const meta = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--meta-h")) || 188;
  let shot = Math.round(width * 9 / 16);
  if (shot + meta > avail) shot = Math.max(96, Math.floor(avail - meta));
  document.documentElement.style.setProperty("--shot-h", `${shot}px`);
}

function mount(fromVote) {
  const items = remaining(DECK, log);
  stack.replaceChildren();
  backEl = items[1] ? makeCard(items[1], "back") : null;
  frontEl = items[0] ? makeCard(items[0], "front") : null;
  if (backEl) stack.appendChild(backEl);
  if (frontEl) {
    if (fromVote) {
      frontEl.style.transition = "none";
      frontEl.style.transform = ENTER[fromVote] || ENTER.like;
    }
    stack.appendChild(frontEl);
    if (fromVote) {
      frontEl.offsetHeight;
      requestAnimationFrame(() => {
        if (!frontEl) return;
        frontEl.style.transition = "transform .28s cubic-bezier(.2,.9,.2,1)";
        frontEl.style.transform = "";
      });
    }
  }
  updateChrome();
  fit();
  warm(items);
}

function commit(id, kind) {
  log = pushVote(log, id, kind);
  persist();
  const gone = frontEl;
  if (gone && gone.dataset.id === id) gone.remove();
  frontEl = backEl;
  if (frontEl) {
    frontEl.classList.remove("back");
    frontEl.classList.add("front");
    frontEl.style.transform = "";
    frontEl.style.transition = "";
    frontEl.removeAttribute("aria-hidden");
  } else {
    frontEl = null;
  }
  const items = remaining(DECK, log);
  backEl = items[1] ? makeCard(items[1], "back") : null;
  if (backEl) stack.insertBefore(backEl, stack.firstChild);
  busy = false;
  updateChrome();
  fit();
  warm(items);
  if (!frontEl) showResults();
}

function vote(kind) {
  if (busy || !frontEl || deckView.hidden) return;
  const card = frontEl;
  const id = card.dataset.id;
  if (!byId.has(id)) return;
  busy = true;
  undoBtn.disabled = true;
  armButtons(0, 0);
  card.classList.remove("dragging");
  card.classList.add(`show-${kind}`);
  if (!card.style.transform) card.style.transform = "translate3d(0,0,0)";
  card.style.transition = "none";
  card.offsetHeight;
  card.style.transition = "transform .28s cubic-bezier(.2,.9,.2,1)";
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    card.removeEventListener("transitionend", onEnd);
    clearTimeout(timer);
    commit(id, kind);
  };
  const onEnd = (event) => {
    if (event.propertyName !== "transform") return;
    finish();
  };
  card.addEventListener("transitionend", onEnd);
  const timer = setTimeout(finish, 420);
  requestAnimationFrame(() => {
    card.style.transform = EXIT[kind];
  });
  if (navigator.vibrate && kind === "super") navigator.vibrate(12);
}

function undo() {
  if (busy) return;
  const result = popVote(log);
  if (!result.removed) return;
  log = result.log;
  persist();
  showDeck();
  mount(result.removed.vote);
}

function showDeck() {
  resultsView.hidden = true;
  deckView.hidden = false;
  fit();
}

function section(title, videos) {
  const block = document.createElement("section");
  block.className = "block";
  const heading = document.createElement("h3");
  heading.textContent = `${title} · ${videos.length}`;
  const grid = document.createElement("div");
  grid.className = "grid";
  for (const video of videos) {
    const link = document.createElement("a");
    link.className = "tile";
    link.href = video.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    const frame = document.createElement("div");
    frame.className = "frame";
    const img = document.createElement("img");
    img.alt = video.title;
    img.draggable = false;
    bindThumb(img, video.id);
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = `${Number(video.multiplier).toFixed(1)}×`;
    frame.append(img, pill);
    const who = document.createElement("p");
    who.className = "who";
    who.textContent = `#${video.rank} ${video.channel}`;
    const name = document.createElement("p");
    name.className = "name";
    name.textContent = video.title;
    link.append(frame, who, name);
    grid.appendChild(link);
  }
  block.append(heading, grid);
  return block;
}

function renderResults() {
  const { supers, likes } = picked(DECK, log);
  const body = $("resultsBody");
  const lead = $("resultsLead");
  body.replaceChildren();
  const spot = position(DECK, log);
  if (!supers.length && !likes.length) {
    lead.textContent = spot.done
      ? "No likes yet. Undo a skip if one of them should stay."
      : "Nothing saved yet. Like a thumbnail, or swipe up to copy that style closely.";
  } else {
    const bits = [];
    if (supers.length) bits.push(`${supers.length} to copy closely`);
    if (likes.length) bits.push(`${likes.length} liked`);
    lead.textContent = bits.join(" · ");
  }
  if (supers.length) body.appendChild(section("Copy closely", supers));
  if (likes.length) body.appendChild(section("Liked", likes));
  $("btn-copy").disabled = !supers.length && !likes.length;
  $("btn-undo-results").disabled = log.length === 0;
  $("btn-back").hidden = spot.done;
}

function showResults() {
  renderResults();
  deckView.hidden = true;
  resultsView.hidden = false;
}

async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

async function copyPicks() {
  const text = picksText(DECK, log);
  if (!text) {
    showToast("Nothing to copy yet");
    return;
  }
  try {
    await writeClipboard(text);
    const button = $("btn-copy");
    button.classList.add("done");
    button.textContent = "Copied";
    showToast("Copied");
    setTimeout(() => {
      button.classList.remove("done");
      button.textContent = "Copy picks";
    }, 1400);
  } catch {
    sheetText.value = text;
    sheet.hidden = false;
    sheetText.focus();
    sheetText.select();
  }
}

function onKey(event) {
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.closest("textarea, input")) return;
  if (!sheet.hidden) {
    if (event.key === "Escape") sheet.hidden = true;
    return;
  }
  if (!deckView.hidden) {
    if (event.key === "ArrowLeft") { event.preventDefault(); vote("skip"); }
    else if (event.key === "ArrowRight") { event.preventDefault(); vote("like"); }
    else if (event.key === "ArrowUp") { event.preventDefault(); vote("super"); }
    else if (event.key === "ArrowDown" || event.key === "Backspace" || event.key === "z" || event.key === "Z") {
      event.preventDefault();
      undo();
    }
  }
}

stack.addEventListener("touchmove", (event) => {
  if (stack.dataset.drag === "1") event.preventDefault();
}, { passive: false });

$("btn-skip").addEventListener("click", () => vote("skip"));
$("btn-like").addEventListener("click", () => vote("like"));
$("btn-super").addEventListener("click", () => vote("super"));
$("btn-undo").addEventListener("click", undo);
$("btn-picks").addEventListener("click", showResults);
$("btn-see").addEventListener("click", showResults);
$("btn-back").addEventListener("click", showDeck);
$("btn-undo-results").addEventListener("click", undo);
$("btn-clear").addEventListener("click", () => {
  if (!log.length) return;
  if (!window.confirm("Clear every vote on this phone?")) return;
  log = [];
  persist();
  showDeck();
  mount(null);
});
$("btn-copy").addEventListener("click", copyPicks);
$("sheet-close").addEventListener("click", () => { sheet.hidden = true; });
$("sheet-copy").addEventListener("click", async () => {
  try {
    await writeClipboard(sheetText.value);
    sheet.hidden = true;
    showToast("Copied");
  } catch {
    sheetText.focus();
    sheetText.select();
  }
});
window.addEventListener("keydown", onKey);
window.addEventListener("resize", fit);

log = readLog();
mount(null);
if (!frontEl) showResults();
document.fonts?.ready?.then(fit);
