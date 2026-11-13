import { isValidTimeZone } from "./time.mjs";

export function normalizeName(input) {
  const name = String(input ?? "").replace(/\s+/g, " ").trim();
  if (name.length < 2 || name.length > 80) return null;
  if (!/^[\p{L}][\p{L}\p{M} .'’\-]*$/u.test(name)) return null;
  return name;
}

export function normalizeEmail(input) {
  const email = String(input ?? "").trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  if (email.includes("..")) return null;
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) return null;
  return email;
}

export function normalizePhone(input) {
  const raw = String(input ?? "").trim();
  const hasPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "");
  if (!digits || /^(\d)\1+$/.test(digits)) return null;
  let phone = null;
  if (hasPlus) {
    if (digits.length < 8 || digits.length > 15) return null;
    phone = `+${digits}`;
  } else if (digits.length === 10) {
    phone = `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    phone = `+${digits}`;
  } else {
    return null;
  }
  if (phone.startsWith("+1")) {
    const national = phone.slice(2);
    if (national.length !== 10) return null;
    if (national[0] === "0" || national[0] === "1") return null;
    if (national[3] === "0" || national[3] === "1") return null;
  }
  return phone;
}

export function normalizeNotes(input) {
  if (input == null || input === "") return "";
  const notes = String(input).replace(/\u0000/g, "").trim();
  if (notes.length > 2000) return null;
  return notes;
}

export function splitName(full) {
  const parts = full.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function validateGuest(input) {
  const errors = {};
  const name = normalizeName(input?.name);
  const email = normalizeEmail(input?.email);
  const phone = normalizePhone(input?.phone);
  const notes = normalizeNotes(input?.notes);
  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter a valid email.";
  if (!phone) errors.phone = "Enter a phone number with area code.";
  if (notes == null) errors.notes = "Keep notes under 2000 characters.";
  if (input?.consent !== true) errors.consent = "Confirm you want to hear from Signal Marketing.";
  let visitorTimezone = null;
  if (input?.visitorTimezone) {
    if (!isValidTimeZone(input.visitorTimezone)) errors.visitorTimezone = "Unknown timezone.";
    else visitorTimezone = input.visitorTimezone;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    guest: { name, email, phone, notes, visitorTimezone, ...splitName(name) },
  };
}
