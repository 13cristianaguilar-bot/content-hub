import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { OFFERS } from "../supabase/functions/booking/calendars.mjs";
import { generateFromWindows } from "../supabase/functions/booking/engine.mjs";
import { handleRequest } from "../supabase/functions/booking/http.mjs";
import { createMemoryStore } from "../supabase/functions/booking/memory.mjs";
import { dateKey } from "../supabase/functions/booking/time.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const store = createMemoryStore();
const events = [];
const appointments = [];

const google = {
  async freeBusy(min, max) {
    const start = Date.parse(min);
    const end = Date.parse(max);
    return events
      .filter((event) => !event.deleted && Date.parse(event.start) < end && Date.parse(event.end) > start)
      .map((event) => ({ start: event.start, end: event.end }));
  },
  async createEvent(body) {
    const start = body.start.dateTime;
    const end = body.end.dateTime;
    if (events.some((event) => !event.deleted && Date.parse(event.start) < Date.parse(end) && Date.parse(event.end) > Date.parse(start))) {
      const error = new Error("busy");
      error.code = "google_create";
      throw error;
    }
    const id = `evt_${events.length + 1}`;
    events.push({ id, start, end, body, deleted: false });
    return { id, meetUrl: "https://meet.google.com/sig-nal-test" };
  },
  async deleteEvent(id) {
    const event = events.find((item) => item.id === id);
    if (event) event.deleted = true;
  },
};

const ghl = {
  async freeSlots(offer, startMs) {
    const slots = generateFromWindows({
      ...offer,
      now: new Date(startMs),
      minNoticeMs: offer.minNoticeHours * 3600000,
      busy: [],
    });
    const grouped = {};
    for (const slot of slots) {
      const key = dateKey(slot.start, offer.timeZone);
      grouped[key] ||= { slots: [] };
      grouped[key].slots.push(slot.start);
    }
    return grouped;
  },
  async upsertContact(guest) {
    return { id: "con_dev", ...guest };
  },
  async createAppointment(input) {
    const row = { id: `appt_${appointments.length + 1}`, ...input, cancelled: false };
    appointments.push(row);
    return row;
  },
  async cancelAppointment(id) {
    const row = appointments.find((item) => item.id === id);
    if (row) row.cancelled = true;
    return { id, appointmentStatus: "cancelled" };
  },
};

const deps = {
  offers: OFFERS,
  store,
  google,
  ghl,
  missingSecrets: () => [],
  now: () => new Date(),
  pagesOrigin: `http://127.0.0.1:${port}`,
  ipSalt: "dev",
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === "/api/debug") {
      res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({
        events: events.filter((event) => !event.deleted).length,
        deleted: events.filter((event) => event.deleted).length,
        appointments: appointments.length,
      }));
      return;
    }
    if (url.pathname === "/api/booking") {
      const request = new Request(url, { method: req.method, headers: req.headers, body: req.method === "GET" || req.method === "HEAD" ? undefined : await readBody(req) });
      const response = await handleRequest(request, deps);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    let filePath = path.normalize(path.join(root, decodeURIComponent(url.pathname)));
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end("no");
      return;
    }
    if (url.pathname.endsWith("/")) filePath = path.join(filePath, "index.html");
    const body = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
      return;
    }
    res.writeHead(500, { "content-type": "text/plain" }).end("Server error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Signal booking dev server http://127.0.0.1:${port}/book/audit/`);
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
