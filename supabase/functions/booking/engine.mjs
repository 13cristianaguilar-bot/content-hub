import { addCalendarDays, isoDate, partsInZone, zonedTimeToUtc } from "./time.mjs";

export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

export function windowsForWeekday(weeklyHours, weekday) {
  const windows = [];
  for (const rule of weeklyHours || []) {
    if ((rule.days || []).includes(weekday)) {
      windows.push({ openMin: rule.openMin, closeMin: rule.closeMin });
    }
  }
  return windows;
}

export function generateFromWindows({
  timeZone,
  now,
  durationMin,
  intervalMin,
  weeklyHours,
  dateHours,
  bookingWindowDays,
  minNoticeMs,
  busy = [],
}) {
  const today = partsInZone(now, timeZone);
  const slots = [];
  for (let i = 0; i < bookingWindowDays; i += 1) {
    const day = addCalendarDays(today.year, today.month, today.day, i);
    const key = isoDate(day);
    const probe = zonedTimeToUtc(day.year, day.month, day.day, 12, 0, timeZone);
    const weekday = partsInZone(probe.date, timeZone).weekday;
    const windows = dateHours?.[key] || windowsForWeekday(weeklyHours, weekday);
    for (const window of windows) {
      if (intervalMin <= 0 || durationMin <= 0) continue;
      for (let cursor = window.openMin; cursor + durationMin <= window.closeMin; cursor += intervalMin) {
        const zoned = zonedTimeToUtc(day.year, day.month, day.day, Math.floor(cursor / 60), cursor % 60, timeZone);
        if (!zoned.exists) continue;
        const startMs = zoned.date.getTime();
        if (startMs < now.getTime() + minNoticeMs) continue;
        slots.push({
          start: new Date(startMs).toISOString(),
          end: new Date(startMs + durationMin * 60000).toISOString(),
        });
      }
    }
  }
  return subtractBusy(dedupeSlots(slots), busy);
}

export function slotsFromGhl(payload, durationMin) {
  if (!payload || typeof payload !== "object") return [];
  const slots = [];
  for (const [key, value] of Object.entries(payload)) {
    if (key === "traceId" || !value || !Array.isArray(value.slots)) continue;
    for (const startIso of value.slots) {
      const startMs = Date.parse(startIso);
      if (!Number.isFinite(startMs)) continue;
      slots.push({
        start: new Date(startMs).toISOString(),
        end: new Date(startMs + durationMin * 60000).toISOString(),
      });
    }
  }
  return dedupeSlots(slots).sort((a, b) => a.start.localeCompare(b.start));
}

export function filterByNotice(slots, now, minNoticeMs, windowEndMs) {
  return slots.filter((slot) => {
    const start = Date.parse(slot.start);
    return start >= now.getTime() + minNoticeMs && (windowEndMs == null || start < windowEndMs);
  });
}

export function subtractBusy(slots, busy) {
  const ranges = (busy || []).map((block) => ({
    start: Date.parse(block.start) - (block.preBufferMin || 0) * 60000,
    end: Date.parse(block.end) + (block.postBufferMin || 0) * 60000,
  })).filter((block) => Number.isFinite(block.start) && Number.isFinite(block.end));
  return slots.filter((slot) => {
    const start = Date.parse(slot.start);
    const end = Date.parse(slot.end);
    return !ranges.some((block) => rangesOverlap(start, end, block.start, block.end));
  });
}

export function dedupeSlots(slots) {
  const seen = new Set();
  const out = [];
  for (const slot of slots) {
    if (seen.has(slot.start)) continue;
    seen.add(slot.start);
    out.push(slot);
  }
  return out;
}

export function windowEnd(now, bookingWindowDays, timeZone) {
  const today = partsInZone(now, timeZone);
  const last = addCalendarDays(today.year, today.month, today.day, bookingWindowDays);
  return zonedTimeToUtc(last.year, last.month, last.day, 0, 0, timeZone).date.getTime();
}
