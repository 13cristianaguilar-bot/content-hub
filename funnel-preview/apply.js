(function () {
  'use strict';


  // Customize these to match the qualifying questions in index.html
  // and the QUESTIONS array in netlify/functions/book.js.
  var CONFIG = {
    defaultTimezone: 'America/Chicago',
    slotsUrl: '/api/slots',
    bookUrl: '/api/book',
    questions: {
      footage: {
        values: ['calls', 'events', 'longform', 'none'],
        requiredMessage: 'Pick the footage you have the most of.'
      },
      bottleneck: {
        values: ['attract', 'convert', 'custom', 'unsure'],
        requiredMessage: 'Pick your biggest bottleneck.'
      }
    }
  };

  var TITLES = {
    1: 'Contact Info',
    2: 'What footage do you already have?',
    3: 'Where are you stuck right now?',
    4: 'Pick a date and time',
    5: "You're booked"
  };
  var PCT = { 1: 25, 2: 50, 3: 75, 4: 100, 5: 100 };

  var state = {
    step: 1,
    name: '',
    company: '',
    phone: '',
    email: '',
    footage: '',
    bottleneck: '',
    startTime: '',
    timezone: (function () {
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone || CONFIG.defaultTimezone; }
      catch (e) { return CONFIG.defaultTimezone; }
    })(),
    days: [],
    zoneLabel: '',
    monthCursor: null,
    pickedDate: '',
    loadingSlots: false,
    slotsError: '',
    booking: false,
    bookError: '',
    booked: null
  };

  var dlg, pctEl, barEl, panels, lastFocus;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function zoneLabel(tz) {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'long' }).formatToParts(new Date());
      var p = parts.find(function (x) { return x.type === 'timeZoneName'; });
      return p ? p.value : tz;
    } catch (e) { return tz; }
  }

  function fmtTime(iso, tz) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: '2-digit', timeZone: tz
    }).format(new Date(iso));
  }

  function fmtLong(iso, tz) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZone: tz, timeZoneName: 'short'
    }).format(new Date(iso));
  }

  function monthKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  }

  function parseYmd(ymd, tz) {
    // Noon UTC-ish: build a Date for ymd in local/tz for calendar grid in visitor TZ
    var p = ymd.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }

  function ymdInTz(date, tz) {
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    // en-CA is YYYY-MM-DD
    return parts;
  }

  function open() {
    lastFocus = document.activeElement;
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    if (state.step === 5) resetTo(1);
    showStep(state.step || 1);
    var focus = dlg.querySelector('[data-ap-focus]');
    if (focus) focus.focus({ preventScroll: true });
  }

  function close() {
    if (dlg.open) dlg.close();
  }

  function onClosed() {
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (location.hash === '#apply') {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function resetTo(n) {
    if (n === 1 && state.step === 5) {
      state.step = 1;
      state.startTime = '';
      state.pickedDate = '';
      state.booked = null;
      state.bookError = '';
    }
  }

  function setProgress(step) {
    var p = PCT[step] || 0;
    pctEl.textContent = p + '%';
    barEl.style.width = p + '%';
    var barWrap = $('.ap-progress');
    if (barWrap) {
      barWrap.setAttribute('aria-valuenow', String(p));
      barWrap.setAttribute('aria-label', p + ' percent complete');
    }
    var row = $('.ap-progress-row');
    if (row) row.hidden = step === 5;
  }

  function showStep(n) {
    state.step = n;
    setProgress(n);
    $all('[data-step]', dlg).forEach(function (el) {
      var s = Number(el.getAttribute('data-step'));
      el.hidden = s !== n;
    });
    if (n === 4 && !state.days.length && !state.loadingSlots) loadSlots();
    if (n === 4) renderCalendar();
    if (n === 5) renderConfirm();
    var focus = dlg.querySelector('[data-step="' + n + '"] [data-ap-focus], [data-step="' + n + '"] input, [data-step="' + n + '"] button.ap-option');
    if (focus) setTimeout(function () { focus.focus({ preventScroll: true }); }, 40);
  }

  function setError(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg || '';
    el.hidden = !msg;
    var field = document.getElementById(id.replace('-err', ''));
    if (field) {
      if (msg) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    }
  }

  function validPhone(raw) {
    var d = String(raw || '').replace(/\D/g, '');
    if (d.length === 11 && d[0] === '1') d = d.slice(1);
    return d.length === 10;
  }

  function validEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
  }

  function validateStep(n) {
    var ok = true;
    if (n === 1) {
      state.name = $('#ap-name').value.trim();
      state.company = $('#ap-company').value.trim();
      state.phone = $('#ap-phone').value.trim();
      state.email = $('#ap-email').value.trim();
      var eName = state.name.length < 2 ? 'Enter your name.' : '';
      var eCo = state.company.length < 2 ? 'Enter your company name.' : '';
      var ePh = validPhone(state.phone) ? '' : 'Enter a valid phone number.';
      var eEm = validEmail(state.email) ? '' : 'Enter a valid email.';
      setError('ap-name-err', eName);
      setError('ap-company-err', eCo);
      setError('ap-phone-err', ePh);
      setError('ap-email-err', eEm);
      ok = !eName && !eCo && !ePh && !eEm;
      if (!ok) {
        var first = eName ? 'ap-name' : eCo ? 'ap-company' : ePh ? 'ap-phone' : 'ap-email';
        document.getElementById(first).focus();
      }
    } else if (n === 2) {
      ok = !!state.footage;
      setError('ap-footage-err', ok ? '' : CONFIG.questions.footage.requiredMessage);
    } else if (n === 3) {
      ok = !!state.bottleneck;
      setError('ap-bottleneck-err', ok ? '' : CONFIG.questions.bottleneck.requiredMessage);
    } else if (n === 4) {
      ok = !!state.startTime;
      setError('ap-cal-err', ok ? '' : 'Pick a date and a time.');
    }
    return ok;
  }

  function goNext() {
    if (state.booking) return;
    if (!validateStep(state.step)) return;
    if (state.step === 4) {
      submitBook();
      return;
    }
    showStep(state.step + 1);
  }

  function goBack() {
    if (state.booking) return;
    if (state.step > 1 && state.step < 5) showStep(state.step - 1);
  }

  function loadSlots() {
    state.loadingSlots = true;
    state.slotsError = '';
    renderCalendar();
    fetch(CONFIG.slotsUrl + '?timezone=' + encodeURIComponent(state.timezone), { cache: 'no-store' })
      .then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }); })
      .then(function (x) {
        state.loadingSlots = false;
        if (!x.r.ok) {
          state.slotsError = x.j && x.j.error ? x.j.error : 'Could not load times.';
        } else {
          state.days = x.j.days || [];
          state.timezone = x.j.timezone || state.timezone;
          state.zoneLabel = zoneLabel(state.timezone);
          if (state.days.length) {
            var first = state.days[0].date;
            var d = parseYmd(first);
            state.monthCursor = new Date(d.getFullYear(), d.getMonth(), 1);
            if (!state.pickedDate) {
              state.pickedDate = first;
            }
          } else {
            state.slotsError = 'No times are open in the next three weeks. Close this and try again shortly.';
          }
        }
        renderCalendar();
      })
      .catch(function () {
        state.loadingSlots = false;
        state.slotsError = 'Could not load times. Check your connection and try again.';
        renderCalendar();
      });
  }

  function slotsFor(ymd) {
    var day = state.days.find(function (d) { return d.date === ymd; });
    return day ? day.slots : [];
  }

  function availableSet() {
    var s = {};
    state.days.forEach(function (d) { s[d.date] = true; });
    return s;
  }

  function renderCalendar() {
    var mount = $('#ap-cal');
    if (!mount) return;
    var html = '';
    if (state.loadingSlots) {
      mount.innerHTML = '<div class="ap-cal-loading" aria-busy="true">Loading times</div>';
      return;
    }
    if (state.slotsError && !state.days.length) {
      mount.innerHTML = '<p class="ap-err" style="display:block">' + escapeHtml(state.slotsError) + '</p>';
      return;
    }

    var avail = availableSet();
    var cursor = state.monthCursor || new Date();
    var year = cursor.getFullYear();
    var month = cursor.getMonth();
    var monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(cursor);

    // Can we go prev/next? Based on available days' months
    var months = {};
    state.days.forEach(function (d) {
      var dt = parseYmd(d.date);
      months[monthKey(dt)] = true;
    });
    var prevDate = new Date(year, month - 1, 1);
    var nextDate = new Date(year, month + 1, 1);
    var canPrev = !!months[monthKey(prevDate)];
    var canNext = !!months[monthKey(nextDate)];

    html += '<div class="ap-cal-nav">';
    html += '<button type="button" class="ap-cal-nav-btn" data-cal-prev' + (canPrev ? '' : ' disabled') + ' aria-label="Previous month">&lsaquo;</button>';
    html += '<div class="ap-cal-month" data-ap-focus tabindex="-1">' + escapeHtml(monthName) + '</div>';
    html += '<button type="button" class="ap-cal-nav-btn" data-cal-next' + (canNext ? '' : ' disabled') + ' aria-label="Next month">&rsaquo;</button>';
    html += '</div>';
    html += '<div class="ap-dow" aria-hidden="true"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>';
    html += '<div class="ap-grid" role="grid" aria-label="Available days">';

    var first = new Date(year, month, 1);
    var startDow = first.getDay();
    var lastDate = new Date(year, month + 1, 0).getDate();
    var i, cells = startDow + lastDate;
    var rows = Math.ceil(cells / 7) * 7;
    for (i = 0; i < rows; i++) {
      var dayNum = i - startDow + 1;
      if (dayNum < 1 || dayNum > lastDate) {
        html += '<span class="ap-day is-empty"></span>';
        continue;
      }
      var ymd = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(dayNum).padStart(2, '0');
      var isAvail = !!avail[ymd];
      var isSel = state.pickedDate === ymd;
      var cls = 'ap-day' + (isAvail ? ' is-avail' : ' is-off') + (isSel ? ' is-sel' : '');
      if (isAvail) {
        html += '<button type="button" class="' + cls + '" data-ymd="' + ymd + '" aria-pressed="' + (isSel ? 'true' : 'false') + '" aria-label="' + ymd + '">' + dayNum + '</button>';
      } else {
        html += '<span class="' + cls + '">' + dayNum + '</span>';
      }
    }
    html += '</div>';

    var zone = state.zoneLabel || zoneLabel(state.timezone);
    html += '<p class="ap-zone">Times shown in ' + escapeHtml(zone) + '</p>';

    if (state.pickedDate) {
      var slots = slotsFor(state.pickedDate);
      var pickedLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(parseYmd(state.pickedDate));
      html += '<div class="ap-slots-label">' + escapeHtml(pickedLabel) + '</div>';
      html += '<div class="ap-slots" role="list">';
      if (!slots.length) {
        html += '<p class="ap-muted">No times on this day.</p>';
      } else {
        slots.forEach(function (iso) {
          var sel = state.startTime === iso;
          html += '<button type="button" class="ap-slot' + (sel ? ' is-sel' : '') + '" data-iso="' + escapeHtml(iso) + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' + escapeHtml(fmtTime(iso, state.timezone)) + '</button>';
        });
      }
      html += '</div>';
    }

    mount.innerHTML = html;

    var prev = $('[data-cal-prev]', mount);
    var next = $('[data-cal-next]', mount);
    if (prev) prev.addEventListener('click', function () {
      if (state.monthCursor) state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1);
      renderCalendar();
    });
    if (next) next.addEventListener('click', function () {
      if (state.monthCursor) state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1);
      renderCalendar();
    });
    $all('[data-ymd]', mount).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.pickedDate = btn.getAttribute('data-ymd');
        state.startTime = '';
        setError('ap-cal-err', '');
        renderCalendar();
      });
    });
    $all('[data-iso]', mount).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.startTime = btn.getAttribute('data-iso');
        setError('ap-cal-err', '');
        renderCalendar();
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function setBusy(btn, busy) {
    state.booking = busy;
    if (!btn) return;
    btn.disabled = !!busy;
    btn.setAttribute('aria-busy', busy ? 'true' : 'false');
    var spin = btn.querySelector('.ap-spin');
    if (busy) {
      btn._t = setTimeout(function () { if (spin) spin.hidden = false; }, 300);
    } else {
      clearTimeout(btn._t);
      if (spin) spin.hidden = true;
    }
  }

  function fireEvents() {
    try {
      if (typeof window.fbq === 'function') window.fbq('track', 'Schedule');
    } catch (e) {}
    try {
      if (typeof window.gtag === 'function') window.gtag('event', 'schedule', { event_category: 'booking' });
    } catch (e) {}
    try {
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'schedule' });
    } catch (e) {}
  }

  function submitBook() {
    if (!validateStep(4)) return;
    var btn = dlg.querySelector('[data-step="4"] .ap-ok');
    setBusy(btn, true);
    setError('ap-cal-err', '');
    var payload = {
      name: state.name,
      company: state.company,
      phone: state.phone,
      email: state.email,
      footage: state.footage,
      bottleneck: state.bottleneck,
      startTime: state.startTime,
      timezone: state.timezone,
      website: ($('#ap-website') || {}).value || ''
    };
    fetch(CONFIG.bookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }); })
      .then(function (x) {
        setBusy(btn, false);
        if (!x.r.ok || !x.j.ok) {
          setError('ap-cal-err', (x.j && x.j.error) || 'Could not book that time. Pick another or try again.');
          return;
        }
        state.booked = x.j;
        fireEvents();
        showStep(5);
      })
      .catch(function () {
        setBusy(btn, false);
        setError('ap-cal-err', 'Could not book. Check your connection and try again.');
      });
  }

  function renderConfirm() {
    var el = $('#ap-confirm-when');
    if (el && state.startTime) {
      el.textContent = fmtLong(state.startTime, state.timezone);
    }
  }

  function bindOptions(name, values, key) {
    $all('[data-opt-group="' + name + '"] .ap-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state[key] = btn.getAttribute('data-value');
        $all('[data-opt-group="' + name + '"] .ap-option').forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-sel', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        setError('ap-' + name + '-err', '');
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
          if (e.key === 'Enter') goNext();
        }
      });
    });
  }

  function init() {
    dlg = document.getElementById('apply');
    if (!dlg) return;
    pctEl = $('.ap-pct');
    barEl = $('.ap-progress-bar');

    $all('[data-ap-open]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (location.hash !== '#apply') {
          history.pushState(null, '', '#apply');
        }
        open();
      });
    });

    $all('[data-ap-close]').forEach(function (el) {
      el.addEventListener('click', function () { close(); });
    });

    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) close();
    });
    dlg.addEventListener('close', onClosed);
    dlg.addEventListener('cancel', function (e) {
      e.preventDefault();
      close();
    });

    window.addEventListener('hashchange', function () {
      if (location.hash === '#apply') open();
      else if (dlg.open) close();
    });
    if (location.hash === '#apply') open();

    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') return;
      if (e.key === 'Enter' && e.target && e.target.tagName === 'INPUT') {
        e.preventDefault();
        goNext();
      }
    });

    $all('.ap-ok').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        goNext();
      });
    });
    $all('.ap-back').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        goBack();
      });
    });

    bindOptions('footage', CONFIG.questions.footage.values, 'footage');
    bindOptions('bottleneck', CONFIG.questions.bottleneck.values, 'bottleneck');

    setProgress(1);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
