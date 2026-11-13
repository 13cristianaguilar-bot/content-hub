/* Shared client deliverable config for the Content Hub and the Command Center.
   Both pages load this file. Do not copy the lists into either page. */
(function (root) {
  var STEPS = [
    { id: 'progress', label: 'In progress' },
    { id: 'review', label: 'Needs your review' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'results', label: 'Results' }
  ];
  var CLIENTS = {
    andrew: { name: 'Andrew George', label: 'Andrew' },
    jan: { name: 'Jan Zands', label: 'Jan' },
    cristian: { name: 'Cristian Aguilar', label: 'Cristian' },
    devin: { name: 'Devin Shea', label: 'Devin' },
    sagun: { name: 'Sagun Sedai', label: 'Sagun' }
  };
  var DELIVERABLES = {
    andrew: { type: 'scripts' },
    jan: { type: 'scripts' },
    devin: { type: 'scripts' },
    cristian: { type: 'scripts' },
    sagun: {
      type: 'stories_coaching',
      stories: [
        {
          id: 'stories-2026-10-24',
          title: 'Stories pack',
          delivered: '2026-10-24',
          step: 'shipped',
          driveId: '121-BzuEH-nScy3y7cukusrD6gnaxDLItUk-Z2NlwSTI'
        }
      ],
      calls: []
    }
  };
  var BOARD = ['andrew', 'jan', 'devin', 'sagun'];
  var STATUS_ORDER = ['Draft', 'Needs Review', 'Approved', 'Filming', 'Posted'];

  function deliverableFor(slug) {
    var row = DELIVERABLES[slug];
    if (row && row.type) return row;
    return { type: 'scripts' };
  }

  function groupInStep(status, step) {
    if (status === 'Archived') return false;
    if (step === 'review') return status === 'Needs Review';
    if (step === 'results') return status === 'Posted';
    if (step === 'shipped') return status === 'Approved' || status === 'Posted' || status === 'Passed';
    return status !== 'Needs Review' && status !== 'Approved' && status !== 'Posted' && status !== 'Passed' && status !== 'Archived';
  }

  function stepForStatus(status) {
    if (status === 'Needs Review') return 'review';
    if (status === 'Posted') return 'results';
    if (status === 'Approved' || status === 'Passed') return 'shipped';
    return 'progress';
  }

  function groupStatus(rows) {
    if (rows.some(function (s) { return s && s.status === 'Archived'; })) return 'Archived';
    var active = rows.filter(function (s) { return s && s.status !== 'Passed'; });
    if (!active.length) return 'Passed';
    var best = 'Draft';
    var bestIdx = -1;
    active.forEach(function (s) {
      var st = STATUS_ORDER.indexOf(s.status) >= 0 ? s.status : 'Draft';
      var idx = STATUS_ORDER.indexOf(st);
      if (idx > bestIdx) { bestIdx = idx; best = st; }
    });
    return best;
  }

  function groupRows(rows, slug) {
    var groups = {};
    var order = [];
    (rows || []).forEach(function (row) {
      if (!row || row.client_slug !== slug) return;
      var key = String(row.client_slug || '') + '\n' + String(row.batch || '') + '\n' + String(Number(row.reel_number) || 0);
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(row);
    });
    return order.map(function (key) { return groups[key]; });
  }

  function ageDays(iso, now) {
    var t = Date.parse(iso || '');
    if (!iso || isNaN(t)) return null;
    return Math.floor((now.getTime() - t) / 86400000);
  }

  function ageWords(days) {
    if (days == null) return '';
    if (days <= 0) return 'Today';
    if (days === 1) return '1 day';
    return days + ' days';
  }

  function storyItems(slug) {
    var row = deliverableFor(slug);
    return (row.stories || []).concat(row.calls || []);
  }

  function summarize(slug, rows, now) {
    now = now || new Date();
    var counts = { progress: 0, review: 0, shipped: 0, results: 0 };
    var type = deliverableFor(slug).type;
    var oldest = null;
    var oldestTitle = '';
    if (type === 'stories_coaching') {
      storyItems(slug).forEach(function (item) {
        if (!item || !counts.hasOwnProperty(item.step)) return;
        counts[item.step] += 1;
        if (item.step !== 'review') return;
        var days = ageDays(item.delivered || item.when || '', now);
        if (oldest == null || (days != null && days > oldest)) {
          oldest = days;
          oldestTitle = item.title || '';
        }
      });
    } else {
      groupRows(rows, slug).forEach(function (group) {
        var status = groupStatus(group);
        STEPS.forEach(function (step) {
          if (groupInStep(status, step.id)) counts[step.id] += 1;
        });
        if (status !== 'Needs Review') return;
        group.forEach(function (row) {
          if (!row || row.status !== 'Needs Review') return;
          var days = ageDays(row.created_at || '', now);
          if (days == null) return;
          if (oldest == null || days > oldest) {
            oldest = days;
            oldestTitle = row.title || '';
          }
        });
        if (oldest == null) oldestTitle = (group[0] && group[0].title) || oldestTitle;
      });
    }
    var waiting = 'Nothing waiting';
    if (counts.review > 0) waiting = oldest == null ? 'Oldest waiting: age not on file' : ('Oldest waiting: ' + ageWords(oldest));
    return { type: type, counts: counts, waiting: waiting, oldestTitle: oldestTitle };
  }

  function sampleScripts(now) {
    now = now || new Date();
    var day = 86400000;
    function row(slug, n, status, ageDays) {
      return {
        id: 'sample-' + slug + '-' + n,
        client_slug: slug,
        status: status,
        batch: 'SAMPLE',
        reel_number: n,
        title: 'SAMPLE layout',
        created_at: new Date(now.getTime() - ageDays * day).toISOString()
      };
    }
    return [
      row('devin', 1, 'Needs Review', 4),
      row('devin', 2, 'Draft', 1),
      row('jan', 1, 'Approved', 2),
      row('andrew', 1, 'Posted', 3),
      row('andrew', 2, 'Filming', 1)
    ];
  }

  root.SignalClients = {
    steps: STEPS,
    clients: CLIENTS,
    deliverables: DELIVERABLES,
    board: BOARD,
    deliverableFor: deliverableFor,
    groupInStep: groupInStep,
    stepForStatus: stepForStatus,
    summarize: summarize,
    sampleScripts: sampleScripts
  };
})(typeof window !== 'undefined' ? window : globalThis);
