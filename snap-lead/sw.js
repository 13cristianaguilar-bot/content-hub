const C = "snaplead-v2";
const SHELL = ["/content-hub/snap-lead/", "/content-hub/snap-lead/index.html", "/content-hub/snap-lead/manifest.json", "/content-hub/snap-lead/icon-192.png", "/content-hub/snap-lead/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.hostname.endsWith("supabase.co")) return;
  e.respondWith(fetch(e.request).then((r) => { if (r.ok && (u.origin === location.origin || u.hostname === "cdn.jsdelivr.net")) { const cp = r.clone(); caches.open(C).then((c) => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request)));
});
