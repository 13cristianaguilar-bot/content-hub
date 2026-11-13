import { API_URL, CONSENT, TIME_ZONE, getOffer } from "./lib/calendars.mjs";
import { generateFromWindows } from "./lib/engine.mjs";
import { addCalendarDays, dateKey, formatClock, formatDay, isoDate, isValidTimeZone, partsInZone, zoneCity } from "./lib/time.mjs";
import { validateGuest } from "./lib/validate.mjs";

const slug = document.body.dataset.slug;
const offer = getOffer(slug);
const app = document.querySelector("#app");
const status = document.querySelector("#status");
const zone = document.querySelector("#zone");
const preview = new URLSearchParams(location.search).get("preview") === "1";
const params = new URLSearchParams(location.search);
const cancelToken = /^[a-f0-9]{64}$/i.test(params.get("cancel") || "") ? params.get("cancel").toLowerCase() : "";
if (cancelToken) {
  params.delete("cancel");
  const next = `${location.pathname}${params.toString() ? `?${params}` : ""}`;
  history.replaceState({}, "", next);
}

const visitorTz = readZone();
const state = {
  view: cancelToken ? "cancel" : "times",
  loading: !preview && !cancelToken,
  slots: [],
  day: "",
  selected: "",
  error: "",
  fieldErrors: {},
  form: { name: "", email: "", phone: "", notes: "", consent: false },
  booking: null,
  cancelToken,
  busy: false,
};

boot();

function readZone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (isValidTimeZone(tz)) return tz;
  } catch { /* keep Chicago */ }
  return TIME_ZONE;
}

function apiBase() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return `${location.origin}/api/booking`;
  return API_URL;
}

function setStatus(text, kind = "") {
  status.textContent = text;
  status.className = `status${kind ? ` ${kind}` : ""}`;
}

async function boot() {
  zone.textContent = visitorTz === TIME_ZONE
    ? "Times are Chicago time, which is also your time."
    : `Times are Chicago time. Your time (${zoneCity(visitorTz)}) is shown under each one.`;
  if (state.view === "cancel") {
    paint();
    return;
  }
  if (preview) {
    state.slots = previewSlots();
    state.day = state.slots.length ? dateKey(state.slots[0].start, TIME_ZONE) : "";
    state.loading = false;
    setStatus("");
    paint();
    return;
  }
  paint();
  await loadSlots();
}

function previewSlots() {
  const now = new Date();
  return generateFromWindows({
    ...offer,
    now,
    minNoticeMs: offer.minNoticeHours * 3600000,
    busy: [],
  });
}

async function loadSlots({ keepStatus = false } = {}) {
  state.loading = true;
  state.error = "";
  if (!keepStatus) setStatus("Loading open times.");
  paint();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(`${apiBase()}?action=slots&slug=${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    const body = await res.json();
    if (!res.ok || !body.ok) {
      state.slots = [];
      state.error = messageFor(body.error);
      setStatus(state.error, "error");
    } else {
      state.slots = body.slots || [];
      if (!state.slots.some((slot) => slot.start === state.selected)) state.selected = "";
      const keys = dayKeys();
      if (!keys.includes(state.day)) state.day = keys[0] || "";
      if (!keepStatus) setStatus(state.slots.length ? "" : "No open times in the next 10 days.");
    }
  } catch (error) {
    state.error = error.name === "AbortError"
      ? "The calendar is taking too long. Try again."
      : "The connection dropped. Try again.";
    setStatus(state.error, "error");
  } finally {
    clearTimeout(timer);
    state.loading = false;
    paint();
  }
}

function messageFor(code) {
  if (code === "not_configured") return "Booking is not open yet. Please try again later.";
  if (code === "slot_unavailable") return "That time was just taken. Pick another.";
  if (code === "rate_limited" || code === "email_limited") return "Too many attempts from this network. Try again in an hour.";
  if (code === "calendar_unavailable" || code === "calendar_failed") return "The calendar did not respond. Nothing was booked. Try again.";
  if (code === "crm_unauthorized" || code === "crm_rejected") return "We could not finish the booking. Nothing was reserved. Try again in a minute.";
  if (code === "in_progress") return "That booking is still finishing. Wait a moment, then try again.";
  return "Something went wrong. Try again.";
}

function dayKeys() {
  const keys = [];
  for (const slot of state.slots) {
    const key = dateKey(slot.start, TIME_ZONE);
    if (!keys.includes(key)) keys.push(key);
  }
  return keys;
}

function clocks(iso) {
  const chicago = formatClock(iso, TIME_ZONE);
  const local = formatClock(iso, visitorTz);
  const chicagoDay = dateKey(iso, TIME_ZONE);
  const localDay = dateKey(iso, visitorTz);
  const same = chicago === local && chicagoDay === localDay;
  const localText = same
    ? ""
    : localDay === chicagoDay
      ? `${local} your time`
      : `${local} your time (${formatDay(iso, visitorTz, "short")})`;
  return { chicago, local, same, localText };
}

function paint() {
  app.replaceChildren();
  if (state.view === "success") {
    app.append(successView());
    return;
  }
  if (state.view === "cancel") {
    app.append(cancelView());
    return;
  }
  if (preview) app.append(el("p", { class: "banner", text: "Preview. This does not book a real time." }));
  if (state.loading) {
    app.append(el("div", { class: "skeleton" }), el("div", { class: "skeleton" }), el("div", { class: "skeleton" }));
    return;
  }
  if (!state.slots.length) {
    const retry = el("button", { class: "btn", type: "button", text: "Refresh times", onclick: () => loadSlots() });
    app.append(el("p", { text: state.error || "No open times in the next 10 days." }), el("div", { class: "actions" }, [retry]));
    return;
  }
  app.append(dayStrip(), slotList());
  if (state.selected) app.append(formView());
}

function dayStrip() {
  const row = el("div", { class: "days", role: "group", "aria-label": "Days" });
  const todayPart = partsInZone(new Date(), TIME_ZONE);
  const today = isoDate(todayPart);
  const tomorrow = isoDate(addCalendarDays(todayPart.year, todayPart.month, todayPart.day, 1));
  for (const key of dayKeys()) {
    const sample = state.slots.find((slot) => dateKey(slot.start, TIME_ZONE) === key);
    const label = key === today ? "Today" : key === tomorrow ? "Tomorrow" : formatDay(sample.start, TIME_ZONE, "short");
    const dayNum = partsInZone(new Date(sample.start), TIME_ZONE).day;
    const button = el("button", {
      class: "day",
      type: "button",
      "aria-pressed": state.day === key ? "true" : "false",
      onclick: () => {
        state.day = key;
        paint();
      },
    }, [el("small", { text: label }), el("b", { text: String(dayNum) })]);
    row.append(button);
  }
  return row;
}

function slotList() {
  const wrap = el("div");
  const slots = state.slots.filter((slot) => dateKey(slot.start, TIME_ZONE) === state.day);
  let part = "";
  let group = null;
  for (const slot of slots) {
    const hour = partsInZone(new Date(slot.start), TIME_ZONE).hour;
    const name = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
    if (name !== part) {
      part = name;
      wrap.append(el("h3", { class: "part", text: name }));
      group = el("div", { class: "slots", role: "group", "aria-label": `${name} times` });
      wrap.append(group);
    }
    const time = clocks(slot.start);
    const button = el("button", {
      class: "slot",
      type: "button",
      "aria-pressed": state.selected === slot.start ? "true" : "false",
      "aria-label": ariaTime(slot.start),
      onclick: () => {
        state.selected = slot.start;
        state.fieldErrors = {};
        paint();
        document.querySelector("#details")?.scrollIntoView({ block: "nearest" });
      },
    }, [el("b", { text: time.chicago })]);
    if (!time.same) button.append(el("span", { text: time.localText }));
    group.append(button);
  }
  return wrap;
}

function ariaTime(iso) {
  const time = clocks(iso);
  const day = formatDay(iso, TIME_ZONE, "long");
  if (time.same) return `${day}, ${time.chicago} Chicago time`;
  return `${day}, ${time.chicago} Chicago time, ${time.localText}`;
}

function formView() {
  const time = clocks(state.selected);
  const form = el("form", { class: "form", id: "details", novalidate: "true" });
  form.addEventListener("submit", onSubmit);
  const summary = el("p", {
    class: "summary",
    text: time.same
      ? `${formatDay(state.selected, TIME_ZONE, "long")} at ${time.chicago} Chicago time.`
      : `${formatDay(state.selected, TIME_ZONE, "long")} at ${time.chicago} Chicago time (${time.localText}).`,
  });
  form.append(summary);
  form.append(field("name", "Name", "text", "name", true));
  form.append(field("email", "Email", "email", "email", true));
  form.append(field("phone", "Phone", "tel", "tel", true));
  form.append(field("notes", "Notes", "textarea", "off", false));
  const honeypot = el("label", { class: "hp" }, [
    el("span", { text: "Company website" }),
    el("input", { name: "company_website", tabindex: "-1", autocomplete: "off", "aria-hidden": "true" }),
  ]);
  form.append(honeypot);
  const box = el("input", { type: "checkbox", id: "consent", name: "consent" });
  box.checked = state.form.consent;
  box.addEventListener("change", () => { state.form.consent = box.checked; });
  const consent = el("label", { class: "check" }, [box, el("span", { text: CONSENT })]);
  form.append(consent);
  if (state.fieldErrors.consent) {
    box.setAttribute("aria-invalid", "true");
    box.setAttribute("aria-describedby", "consent-error");
    form.append(el("p", { class: "err", id: "consent-error", text: state.fieldErrors.consent }));
  }
  const button = el("button", { class: "btn", type: "submit", text: state.busy ? "Booking..." : preview ? "Preview confirmation" : "Book this time" });
  if (state.busy) button.disabled = true;
  form.append(el("div", { class: "actions" }, [button]));
  return form;
}

function field(name, label, type, autocomplete, required) {
  const id = `f-${name}`;
  const control = type === "textarea"
    ? el("textarea", { id, name, autocomplete, rows: "4" })
    : el("input", { id, name, type, autocomplete, inputmode: type === "tel" ? "tel" : type === "email" ? "email" : "text" });
  control.value = state.form[name] || "";
  control.required = required;
  if (state.fieldErrors[name]) control.setAttribute("aria-invalid", "true");
  control.addEventListener("input", () => { state.form[name] = control.value; });
  const wrap = el("label", { class: "field" }, [el("span", { text: label }), control]);
  if (state.fieldErrors[name]) {
    const err = el("p", { class: "err", id: `${id}-error`, text: state.fieldErrors[name] });
    control.setAttribute("aria-describedby", err.id);
    wrap.append(err);
  }
  return wrap;
}

async function onSubmit(event, attempt = 0) {
  event.preventDefault();
  if (state.busy) return;
  const data = new FormData(event.currentTarget);
  const input = {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    notes: data.get("notes"),
    consent: data.get("consent") === "on",
    visitorTimezone: visitorTz,
    company_website: data.get("company_website"),
  };
  state.form = { ...state.form, ...input, consent: input.consent };
  if (String(input.company_website || "").trim()) {
    setStatus("We could not book that time.", "error");
    return;
  }
  const parsed = validateGuest(input);
  if (!parsed.ok) {
    state.fieldErrors = parsed.errors;
    setStatus("Check the highlighted fields.", "error");
    paint();
    document.querySelector("[aria-invalid='true']")?.focus();
    return;
  }
  state.fieldErrors = {};
  if (preview) {
    state.view = "success";
    state.booking = {
      start: state.selected,
      end: new Date(Date.parse(state.selected) + offer.durationMin * 60000).toISOString(),
      meetUrl: "",
      preview: true,
      summary: offer.eventPrefix,
      thanks: "Preview only. No invite was sent.",
      cancelToken: null,
    };
    setStatus("");
    paint();
    return;
  }
  state.busy = true;
  paint();
  setStatus("Booking that time.");
  const idempotencyKey = rememberKey();
  try {
    const res = await fetch(`${apiBase()}?action=book`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        slug,
        start: state.selected,
        ...input,
        consent: input.consent,
        idempotencyKey,
        visitorTimezone: visitorTz,
      }),
    });
    const body = await res.json();
    if (res.status === 409 && body.error === "in_progress" && attempt < 1) {
      state.busy = false;
      await wait(1200);
      return onSubmit(event, attempt + 1);
    }
    if (!res.ok || !body.ok) {
      state.busy = false;
      if (body.error === "slot_unavailable") {
        state.selected = "";
        setStatus(messageFor(body.error), "error");
        await loadSlots({ keepStatus: true });
        return;
      }
      if (body.fields) {
        state.fieldErrors = body.fields;
        setStatus("Check the highlighted fields.", "error");
      } else {
        setStatus(messageFor(body.error), "error");
      }
      paint();
      return;
    }
    if (body.cancelToken) sessionStorage.setItem(cancelStore(), body.cancelToken);
    sessionStorage.removeItem(idemStore());
    state.booking = body;
    state.view = "success";
    state.busy = false;
    setStatus("");
    paint();
  } catch {
    state.busy = false;
    setStatus("The connection dropped. Try again. You will not be booked twice.", "error");
    paint();
  }
}

function rememberKey() {
  const key = idemStore();
  let value = sessionStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    sessionStorage.setItem(key, value);
  }
  return value;
}

function idemStore() {
  return `signal-book-${slug}`;
}
function cancelStore() {
  return `signal-cancel-${slug}`;
}

function successView() {
  const booking = state.booking;
  const time = clocks(booking.start);
  const box = el("div", { class: "success" });
  box.append(el("h3", { text: "You are booked." }));
  box.append(el("p", { text: booking.thanks || offer.thanks }));
  box.append(el("p", {
    class: "summary",
    text: time.same
      ? `${formatDay(booking.start, TIME_ZONE, "long")} at ${time.chicago} Chicago time. ${offer.durationLabel} on Google Meet.`
      : `${formatDay(booking.start, TIME_ZONE, "long")} at ${time.chicago} Chicago time, ${time.localText}. ${offer.durationLabel} on Google Meet.`,
  }));
  if (booking.preview) box.append(el("p", { text: "Preview only. No calendar invite was created." }));
  else if (safeMeet(booking.meetUrl)) {
    box.append(el("a", { class: "meet", href: booking.meetUrl, text: "Open Google Meet" }));
  } else {
    box.append(el("p", { text: "The Google Meet link is in the calendar invite on its way to your email." }));
  }
  const ics = el("button", { class: "btn ghost", type: "button", text: "Add to calendar", onclick: () => downloadIcs(booking) });
  const actions = el("div", { class: "actions" }, [ics]);
  const token = booking.cancelToken || sessionStorage.getItem(cancelStore());
  if (token && !booking.preview) {
    actions.append(el("button", {
      class: "btn ghost",
      type: "button",
      text: "Cancel this time",
      onclick: () => {
        state.cancelToken = token;
        state.view = "cancel";
        paint();
      },
    }));
  }
  box.append(actions);
  return box;
}

function cancelView() {
  const box = el("div", { class: "success" });
  box.append(el("h3", { text: "Cancel this time?" }));
  box.append(el("p", { text: "The calendar invite will be removed and the time will open up again." }));
  const go = el("button", {
    class: "btn",
    type: "button",
    text: state.busy ? "Cancelling..." : "Cancel the booking",
    onclick: sendCancel,
  });
  if (state.busy) go.disabled = true;
  const back = el("button", {
    class: "btn ghost",
    type: "button",
    text: "Keep it",
    onclick: () => {
      state.view = state.booking ? "success" : "times";
      paint();
    },
  });
  box.append(el("div", { class: "actions" }, [go, back]));
  return box;
}

async function sendCancel() {
  if (preview) {
    setStatus("Preview only. Nothing was cancelled.", "ok");
    state.view = "times";
    paint();
    return;
  }
  state.busy = true;
  paint();
  try {
    const res = await fetch(`${apiBase()}?action=cancel`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ token: state.cancelToken }),
    });
    const body = await res.json();
    state.busy = false;
    if (!res.ok || !body.ok) {
      setStatus(body.error === "not_found" ? "That cancel link is not valid." : "We could not cancel yet. Try again.", "error");
      paint();
      return;
    }
    sessionStorage.removeItem(cancelStore());
    state.view = "times";
    state.selected = "";
    state.booking = null;
    setStatus("The time is cancelled.", "ok");
    await loadSlots({ keepStatus: true });
  } catch {
    state.busy = false;
    setStatus("The connection dropped. Try the cancel again.", "error");
    paint();
  }
}

function safeMeet(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "meet.google.com";
  } catch {
    return false;
  }
}

function downloadIcs(booking) {
  const stamp = icsDate(new Date().toISOString());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Signal Marketing//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${icsText(booking.bookingId || crypto.randomUUID())}@signals.marketing`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(booking.start)}`,
    `DTEND:${icsDate(booking.end)}`,
    `SUMMARY:${icsText(`${offer.eventPrefix}`)}`,
    `DESCRIPTION:${icsText(offer.description)}`,
  ];
  if (safeMeet(booking.meetUrl)) {
    lines.push(`URL:${booking.meetUrl}`, `LOCATION:${booking.meetUrl}`);
  }
  lines.push("END:VEVENT", "END:VCALENDAR");
  const blob = new Blob([`${lines.join("\r\n")}\r\n`], { type: "text/calendar" });
  const link = el("a", { href: URL.createObjectURL(blob), download: `signal-${slug}.ics` });
  document.body.append(link);
  link.click();
  link.remove();
}

function icsDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
function icsText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value == null ? "" : String(value);
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, String(value));
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}
