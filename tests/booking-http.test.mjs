import assert from "node:assert/strict";
import test from "node:test";
import { OFFERS } from "../supabase/functions/booking/calendars.mjs";
import { handleRequest } from "../supabase/functions/booking/http.mjs";

function deps() {
  return {
    offers: OFFERS,
    missingSecrets: () => ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GHL_PRIVATE_TOKEN"],
    now: () => new Date("2026-11-16T15:00:00.000Z"),
  };
}

test("crawler-safe health and a blocked foreign origin", async () => {
  const blocked = await handleRequest(new Request("https://booking.test/functions/v1/booking?action=health", {
    headers: { origin: "https://evil.example" },
  }), deps());
  assert.equal(blocked.status, 403);

  const health = await handleRequest(new Request("https://booking.test/functions/v1/booking?action=health", {
    headers: { origin: "https://13cristianaguilar-bot.github.io" },
  }), deps());
  assert.equal(health.status, 200);
  assert.equal(health.headers.get("access-control-allow-origin"), "https://13cristianaguilar-bot.github.io");
  const body = await health.json();
  assert.equal(body.configured, false);
  assert.deepEqual(body.missing, ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GHL_PRIVATE_TOKEN"]);
  assert.equal(JSON.stringify(body).includes("ya29."), false);
});

test("slots stay closed until the calendar secrets exist", async () => {
  const res = await handleRequest(new Request("https://booking.test/booking?action=slots&slug=audit", {
    headers: { origin: "http://127.0.0.1:4173" },
  }), deps());
  assert.equal(res.status, 503);
  const body = await res.json();
  assert.equal(body.error, "not_configured");
});

test("a book request without a body is rejected before any calendar call", async () => {
  const res = await handleRequest(new Request("https://booking.test/booking?action=book", {
    method: "POST",
    headers: { origin: "http://localhost:4173", "content-type": "application/json" },
    body: "{",
  }), deps());
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, "invalid_json");
});

test("preflight does not redirect", async () => {
  const res = await handleRequest(new Request("https://booking.test/booking?action=book", {
    method: "OPTIONS",
    headers: { origin: "https://13cristianaguilar-bot.github.io" },
  }), deps());
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("access-control-allow-methods").includes("POST"), true);
});
