import { API_URL, OFFERS, PUBLIC_ORIGIN, applyRulesOverride, missingSecretNames } from "./calendars.mjs";
import { createGhlClient } from "./ghl.mjs";
import { createGoogleClient } from "./google.mjs";
import { createPgStore } from "./pg.mjs";

function env(name) {
  if (typeof Deno !== "undefined" && Deno.env?.get) return Deno.env.get(name) || "";
  return "";
}

export function createLiveDeps() {
  const secrets = {
    GOOGLE_CLIENT_ID: env("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: env("GOOGLE_CLIENT_SECRET"),
    GOOGLE_REFRESH_TOKEN: env("GOOGLE_REFRESH_TOKEN"),
    GOOGLE_CALENDAR_ID: env("GOOGLE_CALENDAR_ID"),
    GHL_PRIVATE_TOKEN: env("GHL_PRIVATE_TOKEN"),
    GHL_LOCATION_ID: env("GHL_LOCATION_ID"),
    GHL_USER_ID: env("GHL_USER_ID"),
    BOOKING_RULES_JSON: env("BOOKING_RULES_JSON"),
  };
  const googleReady = Boolean(secrets.GOOGLE_CLIENT_ID && secrets.GOOGLE_CLIENT_SECRET && secrets.GOOGLE_REFRESH_TOKEN);
  const ghlReady = Boolean(secrets.GHL_PRIVATE_TOKEN);
  return {
    offers: applyRulesOverride(OFFERS, secrets.BOOKING_RULES_JSON),
    store: createPgStore({
      url: env("SUPABASE_URL"),
      serviceRole: env("SUPABASE_SERVICE_ROLE_KEY"),
    }),
    google: googleReady ? createGoogleClient(secrets) : null,
    ghl: ghlReady ? createGhlClient(secrets) : null,
    missingSecrets() {
      return missingSecretNames({
        ...secrets,
        GOOGLE_CLIENT_ID: googleReady ? secrets.GOOGLE_CLIENT_ID : "",
        GOOGLE_CLIENT_SECRET: googleReady ? secrets.GOOGLE_CLIENT_SECRET : "",
        GOOGLE_REFRESH_TOKEN: googleReady ? secrets.GOOGLE_REFRESH_TOKEN : "",
        GHL_PRIVATE_TOKEN: ghlReady ? secrets.GHL_PRIVATE_TOKEN : "",
      });
    },
    now: () => new Date(),
    pagesOrigin: env("BOOKING_PUBLIC_ORIGIN") || PUBLIC_ORIGIN,
    ipSalt: env("BOOKING_IP_SALT") || "signal-booking",
    apiUrl: API_URL,
  };
}
