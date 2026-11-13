/* PREVIEW ONLY. Always on for this unlisted GitHub Pages preview.
   Fakes /api/slots and /api/book so the application pop-up can be clicked
   through end to end. Nothing is booked and nothing is sent. */
(function () {
  var real = window.fetch;
  function pathOf(url) {
    try {
      if (url && typeof url === 'object' && url.url) url = url.url;
      var u = String(url);
      if (/^https?:/i.test(u)) {
        var a = document.createElement('a');
        a.href = u;
        return a.pathname + a.search;
      }
      return u;
    } catch (e) {
      return String(url);
    }
  }
  function iso(d, h, m) {
    var x = new Date(d); x.setHours(h, m, 0, 0); return x.toISOString();
  }
  window.fetch = function (url, opts) {
    var u = pathOf(url);
    if (u.indexOf('/api/slots') !== -1) {
      var days = [], d = new Date(); d.setDate(d.getDate() + 1);
      for (var i = 0; days.length < 8 && i < 21; i++) {
        var c = new Date(d); c.setDate(d.getDate() + i);
        if (c.getDay() === 0 || c.getDay() === 6) continue;
        var ymd = c.getFullYear() + '-' + String(c.getMonth() + 1).padStart(2, '0') + '-' + String(c.getDate()).padStart(2, '0');
        days.push({ date: ymd, slots: [iso(c, 10, 0), iso(c, 11, 30), iso(c, 14, 0), iso(c, 16, 0)] });
      }
      return Promise.resolve(new Response(JSON.stringify({
        days: days,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.indexOf('/api/book') !== -1) {
      return Promise.resolve(new Response(JSON.stringify({ ok: true, preview: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    return real.apply(this, arguments);
  };
  document.addEventListener('DOMContentLoaded', function () {
    var f = document.createElement('div');
    f.className = 'preview-flag';
    f.textContent = 'PREVIEW MODE · NOTHING IS BOOKED';
    document.body.appendChild(f);
  });
})();
