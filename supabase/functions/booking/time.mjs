const WEEKDAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function isValidTimeZone(timeZone) {
  if (!timeZone || typeof timeZone !== "string" || timeZone.length > 80) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

export function partsInZone(date, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
  });
  const bag = {};
  for (const part of dtf.formatToParts(date)) bag[part.type] = part.value;
  let hour = Number(bag.hour);
  if (hour === 24) hour = 0;
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour,
    minute: Number(bag.minute),
    second: Number(bag.second),
    weekday: WEEKDAY[bag.weekday],
  };
}

export function zonedTimeToUtc(year, month, day, hour, minute, timeZone) {
  let utc = Date.UTC(year, month - 1, day, hour, minute, 0);
  for (let i = 0; i < 4; i += 1) {
    const offset = zoneOffsetMs(new Date(utc), timeZone);
    const next = Date.UTC(year, month - 1, day, hour, minute, 0) - offset;
    if (next === utc) break;
    utc = next;
  }
  const date = new Date(utc);
  const back = partsInZone(date, timeZone);
  const exists =
    back.year === year &&
    back.month === month &&
    back.day === day &&
    back.hour === hour &&
    back.minute === minute;
  return { date, exists };
}

function zoneOffsetMs(date, timeZone) {
  const part = partsInZone(date, timeZone);
  const asUtc = Date.UTC(part.year, part.month - 1, part.day, part.hour, part.minute, part.second);
  return asUtc - date.getTime();
}

export function addCalendarDays(year, month, day, delta) {
  const next = new Date(Date.UTC(year, month - 1, day + delta));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

export function isoDate(part) {
  return `${String(part.year).padStart(4, "0")}-${String(part.month).padStart(2, "0")}-${String(part.day).padStart(2, "0")}`;
}

export function dateKey(iso, timeZone) {
  return isoDate(partsInZone(new Date(iso), timeZone));
}

function plain(text) {
  return text.replace(/[\u202f\u00a0]/g, " ");
}

export function formatClock(iso, timeZone) {
  return plain(new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso)));
}

export function formatDay(iso, timeZone, variant = "long") {
  return plain(new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: variant === "long" ? "long" : "short",
    month: variant === "long" ? "long" : "short",
    day: "numeric",
  }).format(new Date(iso)));
}

export function zoneCity(timeZone) {
  if (!timeZone || timeZone === "UTC") return "UTC";
  const city = timeZone.split("/").pop() || timeZone;
  return city.replace(/_/g, " ");
}
