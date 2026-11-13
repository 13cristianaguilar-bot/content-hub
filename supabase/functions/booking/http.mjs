import { PUBLIC_ORIGIN } from "./calendars.mjs";
import { book, cancelBooking, listSlots } from "./service.mjs";

const PAGE_ORIGIN = "https://13cristianaguilar-bot.github.io";

export function originAllowed(origin) {
  if (!origin) return false;
  if (origin === PAGE_ORIGIN) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

export function clientIp(req) {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function actionOf(url) {
  const query = url.searchParams.get("action");
  if (query) return query;
  if (url.pathname.endsWith("/slots")) return "slots";
  if (url.pathname.endsWith("/book")) return "book";
  if (url.pathname.endsWith("/cancel")) return "cancel";
  if (url.pathname.endsWith("/health")) return "health";
  return "";
}

function json(status, body, origin) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": origin || PAGE_ORIGIN,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization, apikey",
    vary: "Origin",
  };
  return new Response(JSON.stringify(body), { status, headers });
}

async function readJson(req) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > 20_000) return { error: "too_large" };
  const text = await req.text();
  if (text.length > 20_000) return { error: "too_large" };
  try {
    return { value: JSON.parse(text || "{}") };
  } catch {
    return { error: "invalid_json" };
  }
}

export async function handleRequest(req, deps) {
  const url = new URL(req.url);
  const origin = req.headers.get("origin");
  const allow = origin && originAllowed(origin) ? origin : PAGE_ORIGIN;
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": allow,
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "content-type, authorization, apikey",
        vary: "Origin",
      },
    });
  }
  if (origin && !originAllowed(origin)) return json(403, { ok: false, error: "origin" }, PAGE_ORIGIN);

  const action = actionOf(url);
  if (req.method === "GET" && action === "health") {
    const missing = deps.missingSecrets();
    return json(200, { ok: true, service: "signal-booking", configured: missing.length === 0, missing }, allow);
  }
  if (req.method === "GET" && action === "slots") {
    const out = await listSlots(deps, { slug: url.searchParams.get("slug") || "", now: deps.now() });
    return json(out.status, out.body, allow);
  }
  if (req.method === "POST" && (action === "book" || action === "cancel")) {
    const body = await readJson(req);
    if (body.error) return json(400, { ok: false, error: body.error }, allow);
    const out = action === "book"
      ? await book(deps, { ...body.value, ip: clientIp(req) })
      : await cancelBooking(deps, { token: body.value?.token || url.searchParams.get("token") || "" });
    return json(out.status, out.body, allow);
  }
  return json(404, { ok: false, error: "not_found", origin: PUBLIC_ORIGIN }, allow);
}
