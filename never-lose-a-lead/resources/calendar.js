(function () {
  var days = [
    { title: "NLL Day 1: Write both text-back scripts", mins: 30, details: "Fill in The Missed Call Fix scripts. No leftover brackets. You would be willing to receive this text." },
    { title: "NLL Day 2: Open the tool and get the number", mins: 45, details: "Google Voice, Quo, CallRail, or HighLevel. Inbox must open on the phone you carry." },
    { title: "NLL Day 3: Turn on missed-call text-back", mins: 45, details: "Auto-text if the tool can do it. Otherwise set a manual alert habit." },
    { title: "NLL Day 4: Set conditional call forwarding", mins: 20, details: "Phone still rings first. Verizon official: *71 plus the 10-digit number, *73 to turn off. Confirm other carriers." },
    { title: "NLL Day 5: Test a missed call and after hours", mins: 20, details: "Unlock step. Text arrives, reply reaches you, after-hours script is the after-hours one." },
    { title: "NLL Day 6: Brief anyone else who answers", mins: 15, details: "They should not send a contradictory message." },
    { title: "NLL Day 7: Tally the week and notice the next leak", mins: 20, details: "Missed calls, texts, replies. Quotes that went quiet are layer 2." }
  ];

  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtICS(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
  }
  function startOfDayLocal(offsetDays) {
    var d = new Date();
    d.setDate(d.getDate() + offsetDays);
    d.setHours(8, 0, 0, 0);
    return d;
  }
  function endFrom(start, mins) { return new Date(start.getTime() + mins * 60000); }

  function icsEvent(day, i) {
    var s = startOfDayLocal(i);
    var e = endFrom(s, day.mins);
    return [
      "BEGIN:VEVENT",
      "UID:nll-day-" + (i + 1) + "-" + s.getFullYear() + "@neverlosealead",
      "DTSTAMP:" + fmtICS(new Date()),
      "DTSTART:" + fmtICS(s),
      "DTEND:" + fmtICS(e),
      "SUMMARY:" + day.title,
      "DESCRIPTION:" + day.details.replace(/\n/g, "\\n"),
      "END:VEVENT"
    ].join("\r\n");
  }

  function icsFile(list) {
    return "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Signal Marketing//Never Lose a Lead//EN\r\n" +
      list.map(icsEvent).join("\r\n") + "\r\nEND:VCALENDAR\r\n";
  }

  function downloadIcs(filename, list) {
    var blob = new Blob([icsFile(list)], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  function gcalUrl(day, i) {
    var s = startOfDayLocal(i);
    var e = endFrom(s, day.mins);
    function g(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z"; }
    var params = new URLSearchParams({
      action: "TEMPLATE",
      text: day.title,
      details: day.details,
      dates: g(s) + "/" + g(e)
    });
    return "https://calendar.google.com/calendar/render?" + params.toString();
  }

  var allBtn = document.getElementById("ics-all");
  if (allBtn) {
    allBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      downloadIcs("never-lose-a-lead-first-7-days.ics", days.map(function (d, i) { return [d, i]; }).map(function (pair, i) { return days[i]; }));
    });
  }
  var holder = document.getElementById("gcal-days");
  if (holder) {
    days.forEach(function (day, i) {
      var row = document.createElement("p");
      var a = document.createElement("a");
      a.href = gcalUrl(day, i);
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Add to Google Calendar: " + day.title;
      row.appendChild(a);
      holder.appendChild(row);
    });
  }
})();
