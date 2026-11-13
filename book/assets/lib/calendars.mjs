// Public offer catalog for Signal booking.
// Calendar ids are already public on the GoHighLevel widget links.
// Availability numbers were read from those calendars on 2026-11-13:
// 2 hour notice, 10 calendar days, 1 booking per slot, no buffer,
// slot interval equal to the duration, Google Meet, America/Chicago.
// Weekly 7:00-22:00 is the fallback envelope when GoHighLevel is down.
// BOOKING_RULES_JSON can override numeric rules without a code change.

export const LOCATION_ID = "Yu4Qxi3iICjZbsKEWR5g";
export const USER_ID = "EvJpYg3QAZcZF4TDfLMk";
export const TIME_ZONE = "America/Chicago";
export const PUBLIC_ORIGIN = "https://13cristianaguilar-bot.github.io/content-hub";
export const API_URL = "https://udkbnlpnfyjuwlstfxhr.supabase.co/functions/v1/booking";

export const LIMITS = {
  bookAttemptsPerHour: 10,
  confirmedPerEmail: 4,
  holdMs: 2 * 60 * 1000,
};

export const CONSENT =
  "I confirm that I want to receive content from this company using any contact information I provide.";

const WEEK = [{ days: [0, 1, 2, 3, 4, 5, 6], openMin: 7 * 60, closeMin: 22 * 60 }];

export const OFFERS = [
  {
    slug: "audit",
    ghlCalendarId: "azJSrIbLXh844Bhg13It",
    name: "AI Gap Audit",
    headline: "Find the gaps. Then close them.",
    durationMin: 60,
    intervalMin: 60,
    durationLabel: "60 min",
    meet: "Google Meet",
    ogTitle: "Book an AI Gap Audit | Signal Marketing",
    ogDescription:
      "One hour with Cristian Aguilar to find where AI can save time and bring in more leads. $100, paid after the call.",
    description:
      "One hour with Cristian Aguilar. We go through your business and find exactly where AI can save you time and bring in more leads.",
    priceNote: "$100, paid after the call. Nothing to pay on this page.",
    recorded: false,
    prep: [
      "Business name, website, and main social link",
      "What you sell and to whom",
      "Rough monthly revenue range",
      "Team size",
      "How you get leads now",
      "Biggest bottleneck or time sink",
      "Tools and software you use today",
      "What you have tried with AI so far",
      "What would make this call a win",
    ],
    thanks:
      "A calendar invite with the Google Meet link is on its way. The $100 is paid after the call.",
    eventPrefix: "AI Gap Audit",
    minNoticeHours: 2,
    bookingWindowDays: 10,
    preBufferMin: 0,
    postBufferMin: 0,
    timeZone: TIME_ZONE,
    weeklyHours: WEEK,
  },
  {
    slug: "connect",
    ghlCalendarId: "M6UcFNTN03SHWNpYHFsn",
    name: "Opportunities & Connecting",
    headline: "One hour to compare notes.",
    durationMin: 60,
    intervalMin: 60,
    durationLabel: "60 min",
    meet: "Google Meet",
    ogTitle: "Book an Opportunities & Connecting call | Signal Marketing",
    ogDescription: "One hour with Cristian Aguilar to talk through opportunities and connections.",
    description: "One hour with Cristian Aguilar to talk through opportunities and connections.",
    priceNote: "",
    recorded: false,
    prep: [
      "Who you are and what you do",
      "What opportunity or connection you have in mind",
      "What would make this hour worth it",
    ],
    thanks: "A calendar invite with the Google Meet link is on its way.",
    eventPrefix: "Opportunities & Connecting",
    minNoticeHours: 2,
    bookingWindowDays: 10,
    preBufferMin: 0,
    postBufferMin: 0,
    timeZone: TIME_ZONE,
    weeklyHours: WEEK,
  },
  {
    slug: "content-engine",
    ghlCalendarId: "kAv4vZKErMnCHqOt7Xxy",
    name: "Content Engine Strategy Call",
    headline: "A content engine for your coaching calls.",
    durationMin: 60,
    intervalMin: 60,
    durationLabel: "60 min",
    meet: "Google Meet",
    ogTitle: "Book a Content Engine Strategy Call | Signal Marketing",
    ogDescription:
      "One hour with Cristian Aguilar on a content engine for coaching calls, clips, and weekly reels.",
    description:
      "One hour with Cristian Aguilar to walk through a Content Engine for your coaching calls: clipping, 3 to 4 AI-edited reels a week, plus format research and ideation.",
    priceNote: "",
    recorded: false,
    prep: [
      "Your business and offer",
      "Where your coaching calls are recorded",
      "Your current posting (how often and where)",
    ],
    thanks: "A calendar invite with the Google Meet link is on its way.",
    eventPrefix: "Content Engine Strategy Call",
    minNoticeHours: 2,
    bookingWindowDays: 10,
    preBufferMin: 0,
    postBufferMin: 0,
    timeZone: TIME_ZONE,
    weeklyHours: WEEK,
  },
  {
    slug: "ma",
    ghlCalendarId: "8CzOGDxP62enPLYpdsG7",
    name: "M&A Interview",
    headline: "One recorded hour on M&A.",
    durationMin: 60,
    intervalMin: 60,
    durationLabel: "60 min",
    meet: "Google Meet",
    ogTitle: "Book an M&A Interview (1 hour) | Signal Marketing",
    ogDescription: "One recorded hour with Cristian Aguilar on M&A. Buyers, sellers, and operators.",
    description:
      "One hour with Cristian Aguilar. He is learning M&A from Dane Maxwell at The Foundation and interviewing buyers, sellers, and people with experience in the industry. This call will be recorded.",
    priceNote: "",
    recorded: true,
    prep: [
      "Your background in M&A (buyer, seller, advisor)",
      "Anything you would like Cristian to know before the call",
    ],
    thanks:
      "A calendar invite with the Google Meet link is on its way. This call will be recorded.",
    eventPrefix: "M&A Interview (1 hour)",
    minNoticeHours: 2,
    bookingWindowDays: 10,
    preBufferMin: 0,
    postBufferMin: 0,
    timeZone: TIME_ZONE,
    weeklyHours: WEEK,
  },
  {
    slug: "ma-30",
    ghlCalendarId: "OfnK8nLxglEdMMqSO0MX",
    name: "M&A Interview",
    headline: "Thirty minutes on M&A.",
    durationMin: 30,
    intervalMin: 30,
    durationLabel: "30 min",
    meet: "Google Meet",
    ogTitle: "Book an M&A Interview (30 min) | Signal Marketing",
    ogDescription: "Thirty minutes with Cristian Aguilar on M&A. Buyers, sellers, and operators.",
    description:
      "30 minutes with Cristian Aguilar. He is learning M&A from Dane Maxwell at The Foundation and interviewing buyers, sellers, and people with experience in the industry.",
    priceNote: "",
    recorded: false,
    prep: [
      "Your background in M&A (buyer, seller, advisor)",
      "Anything you would like Cristian to know before the call",
    ],
    thanks: "A calendar invite with the Google Meet link is on its way.",
    eventPrefix: "M&A Interview (30 min)",
    minNoticeHours: 2,
    bookingWindowDays: 10,
    preBufferMin: 0,
    postBufferMin: 0,
    timeZone: TIME_ZONE,
    weeklyHours: WEEK,
  },
];

export function getOffer(slug, offers = OFFERS) {
  return offers.find((offer) => offer.slug === slug) || null;
}

export function applyRulesOverride(offers, raw) {
  if (!raw) return offers;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return offers;
  }
  if (!parsed || typeof parsed !== "object") return offers;
  return offers.map((offer) => {
    const patch = parsed[offer.slug];
    if (!patch || typeof patch !== "object") return offer;
    const next = { ...offer };
    for (const key of ["durationMin", "intervalMin", "minNoticeHours", "bookingWindowDays", "preBufferMin", "postBufferMin"]) {
      if (Number.isFinite(patch[key]) && patch[key] >= 0 && patch[key] <= 24 * 60) next[key] = patch[key];
    }
    if (Array.isArray(patch.weeklyHours)) next.weeklyHours = patch.weeklyHours;
    return next;
  });
}

export function missingSecretNames(env) {
  const missing = [];
  for (const key of ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GHL_PRIVATE_TOKEN"]) {
    if (!env?.[key]) missing.push(key);
  }
  return missing;
}
