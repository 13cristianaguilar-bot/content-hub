# Command Center `today.json`

The board at `command-center/index.html` reads `command-center/today.json` on open. A daily routine regenerates that file from Calendar, Fathom, Gmail, Drive, and Content Hub. The page does not invent numbers. If a key is missing, the panel says **Not connected yet** and shows the age of the feed. An empty list is different: it means the source was read and there was nothing, and the panel says so in words (for example **No failed charges**). It never shows a fake zero.

Do not write floor counts into this file. Videos filmed, lead magnets, contacts, booked calls, showed calls, closed deals, and client wins are logged on the board and stored in `public.cc_kpi_log`. See the migration `migrations/2026-11-11_cc_kpi_log.sql`. Until that migration is applied, those cards say **Not set up yet** after the owner signs in. Before that they say **Log in to track**. A week with no log row is **Log to start**, never 0.

Targets live in `command-center/targets.json`. The page loads that file. Do not hardcode targets into `today.json`. Weeks start Monday, America/Chicago. A count is on pace when it has reached `target * (days elapsed / days in the period)`. The side score is the average of progress-to-target, capped at 100, using only metrics that have a real value. Missing metrics are left out of the score. The page does not show a score of 0 when nothing has data.

`today.sample.json` is layout-only. It loads behind `?sample=1` and is badged SAMPLE. Never copy it over `today.json`.

Times are America/Chicago. Prefer ISO-8601 with a numeric offset (`2026-11-10T06:47:00-06:00`). A date-only string (`2026-11-04`) is allowed on `calls[].when` when there is no clock time.

The board is read-only except the floor log. Do not add fields that tell the page to send mail, stamp a script, or charge a card. Links must be `https://` URLs. Personal DMs stay unconnected: leave `dmBridge` null. The page does not render that inbox.

## Existing feed (keep this shape)

```json
{
  "asOf": "2026-11-10T06:47:00-06:00",
  "calls": [
    {
      "title": "Steve x Cristian",
      "when": "2026-11-10T14:00:00-06:00",
      "who": "person@example.com",
      "nextStep": "Review the mind map",
      "source": "calendar",
      "url": "https://fathom.video/calls/890129674"
    }
  ],
  "emails": [
    {
      "to": "Name <name@example.com>",
      "subject": "Subject line",
      "intent": "What the draft is for",
      "status": "draft",
      "source": "gmail",
      "url": "https://mail.google.com/mail/u/0/#drafts"
    }
  ],
  "podcast": {
    "guest": "Molly Mahoney",
    "status": "Jan 22, 12-1pm PT (draft reply unsent)",
    "nextAction": "Send the draft, then the calendar invite"
  },
  "dmBridge": null
}
```

| Field | Required | Notes |
|---|---|---|
| `asOf` | yes | When this file was written. The header shows its age. |
| `calls[]` | yes | Use `[]` when Calendar and Fathom were read and there is nothing. Omit the key only when those sources were not read. |
| `calls[].source` | yes | `calendar` or `fathom`. |
| `calls[].url` | no | `https` only. Fathom recordings use this. |
| `emails[]` | yes | Same rule as calls. `status` is `draft` or `needs-send`. |
| `emails[].url` | no | `https` link that opens the draft. The board never sends. |
| `podcast` | yes | Object, or `null` when there is no booking. |
| `dmBridge` | yes | Always `null`. |

`url` on a call or email is optional and was not in the oldest files. The page still renders rows that omit it.

## Optional sections the routine should start filling

Omit a whole section when that source was not read. Include it with an empty list, or with `"error"`, when the source was attempted.

`error` is a short sentence the page can show, such as `Gmail did not answer.` Optional `lastGoodAt` is the ISO time of the last successful read. When `error` is set, do not include a number for that section.

### `decisions` (top two moves)

```json
"decisions": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "topMoves": [
    {
      "id": "move-1",
      "rank": 1,
      "title": "Send the cash ask to Northwind",
      "kind": "cash-send",
      "why": "A payment is past due.",
      "status": "act",
      "href": "https://mail.google.com/mail/",
      "copyText": "Short note Cristian can copy."
    }
  ]
}
```

`kind` is `cash-send`, `delivery`, `charge`, or `other`. `status` is `good`, `watch`, or `act`. `rank` 1 is the guide button. Rank 2 is the "Then" line. Two moves is the morning job. `topMoves: []` means the list was built and nothing is waiting.

### `cash` (Gmail-visible payments)

Gmail (and Drive, when a file is the evidence) fills `stillDue`, `in`, `out`, and `payments`. Stripe is a separate object, `cash.stripe`, written by the daily routine. The page never calls Stripe and never holds a Stripe key. When `cash.stripe` is absent, the Stripe panel says **Waiting for first Stripe sync**. Do not add Gmail totals to Stripe totals. The collected-this-month figure uses `cash.stripe.monthToDate.collected` when that number is present, and otherwise `cash.in`.

```json
"cash": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "source": "gmail",
  "stillDue": {
    "amount": 1200,
    "currency": "USD",
    "note": "$1,200 past due",
    "status": "act",
    "history": [800, 1000, 1200],
    "historyLabels": ["Mon", "Tue", "Wed"]
  },
  "in": { "amount": 400, "currency": "USD", "note": "One payment seen in Gmail", "history": [200, 400] },
  "out": { "amount": 80, "currency": "USD", "note": "One receipt seen in Gmail", "history": [40, 80] },
  "payments": [
    {
      "id": "pay-1",
      "direction": "due",
      "who": "Northwind Studio",
      "amount": 1200,
      "currency": "USD",
      "when": "2026-11-01",
      "subject": "Invoice 14",
      "note": "Past due",
      "status": "act",
      "href": "https://mail.google.com/mail/"
    }
  ]
}
```

`direction` is `due`, `in`, or `out`. `source` is `gmail` or `drive`.

Headline rules the page applies when `status` is omitted:

- `stillDue.amount` greater than 0 is **watch**, unless a payment is past due, in which case set `status` to `act`.
- Amount `0` with the section present means nothing due. The page says **Nothing due**, not `$0`.
- If `stillDue` is omitted and `payments` exists, the page sums `direction: "due"` for the tile, `in` for cash in, and `out` for cash out.
- `history` is an array of numbers, oldest first. The sparkline draws only when there are two or more numbers. Do not pad missing days with zeros. `historyLabels` is optional and the same length as `history`.
- A `history` value of `0` is allowed only as a real measured day, never as a stand-in for "source missing".

`cash.in` and `cash.out` are Gmail-visible totals, not Stripe.

### `cash.stripe` (read-only snapshot from the routine)

```json
"stripe": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "recentCharges": [
    { "date": "2026-11-10", "customer": "Northwind Studio", "amount": 2000, "status": "succeeded" }
  ],
  "monthToDate": { "collected": 2000 },
  "refunds": 0,
  "failedCharges": 1,
  "balance": { "available": 1500, "pending": 200 }
}
```

Amounts are USD numbers. `recentCharges[].status` is `succeeded`, `refunded`, or `failed`. `failedCharges` may be a number or an array of charges. `refunds` is a USD number. A present `0` is a real reading from Stripe. Omitting `stripe` is not a zero. `balance.available` and `balance.pending` are USD numbers.

### `moneyMoves` (unsent cash sends and proposals)

```json
"moneyMoves": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "source": "gmail",
  "history": [1, 2, 2],
  "historyLabels": ["Mon", "Tue", "Wed"],
  "items": [
    {
      "id": "mm-1",
      "title": "Proposal PDF is ready",
      "kind": "proposal",
      "status": "unsent",
      "who": "Northwind Studio",
      "note": "Sitting in Drive",
      "href": "https://drive.google.com/file/d/example"
    }
  ]
}
```

`kind` is `proposal`, `ask`, or `invoice`. `status` is `unsent` or `sent`. The tile counts `unsent`. Any unsent item is **act**. `items: []` means none waiting. This is not the Gmail drafts list. Drafts stay in `emails`.

### `delivery` (oldest overdue client delivery)

```json
"delivery": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "source": "content-hub",
  "oldestDays": 13,
  "client": "Lumen Lab",
  "note": "13 days waiting on a stamp",
  "status": "act",
  "href": "https://13cristianaguilar-bot.github.io/content-hub/",
  "history": [8, 11, 13],
  "historyLabels": ["Mon", "Tue", "Wed"]
}
```

`oldestDays` is a number of days a paid client has been waiting. More than 7 forces **act** even if `status` says otherwise. `0` means nothing is waiting. The page says **Nothing waiting**.

### `alerts` (failed charges and open loops)

```json
"alerts": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "source": "gmail",
  "failedCharges": [
    {
      "id": "chg-1",
      "tool": "Sample Host",
      "amount": 20,
      "currency": "USD",
      "when": "2026-11-09",
      "note": "This tool would take client work offline.",
      "status": "act",
      "href": "https://mail.google.com/mail/"
    }
  ],
  "loops": [
    {
      "id": "loop-1",
      "title": "Confirm the shoot address",
      "who": "Video team",
      "status": "watch",
      "action": "Copy the address into the calendar note",
      "href": "",
      "copyText": "Address to copy"
    }
  ]
}
```

`failedCharges` is the named list for the fourth tile. Any item is **act**. `failedCharges: []` means Gmail was read and nothing failed. The page says **No failed charges**. `tool` is the product name a person would say, not an account id. Omit `amount` when the mail did not state one. Do not send `0`.

`loops` are other open items. `status` is `act`, `watch`, or `good`. The page sorts `act` above `watch`.

### `retainers`

```json
"retainers": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "source": "content-hub",
  "items": [
    {
      "id": "ret-1",
      "name": "Northwind Studio",
      "who": "Alex North",
      "status": "act",
      "risk": "late-payment",
      "why": "Invoice is past due.",
      "daysWaiting": null,
      "amountDue": 1200,
      "currency": "USD",
      "href": "https://13cristianaguilar-bot.github.io/content-hub/"
    }
  ]
}
```

`name` is the client a person would say. Do not put a database id in `name`. `risk` is `late-payment`, `overdue-delivery`, or `none`. `status` `act` or `watch` is at risk. `none` plus `good` is healthy and still listed. `items: []` means the roster was read and nobody is on it. The page says **No retainers in this feed.**

`daysWaiting` and `amountDue` may be `null` when that side is not the risk. Do not send `0` for unknown.

### `agents` (every bot, not a subset)

Top-level array. The Team view and the hand-off pipeline render every object, in this order. Do not omit a quiet bot. If a bot did not report, include it with `"status": "not-reported"` and a null `lastReportAt`.

```json
"agents": [
  {
    "name": "Ops",
    "role": "Ops desk",
    "status": "working",
    "currentWork": "Sorting today's calls",
    "lastReportAt": "2026-11-10T06:40:00-06:00"
  }
]
```

| Field | Notes |
|---|---|
| `name` | Readable desk name. Never a raw id, uuid, or `agt_...` token. If the only identifier is an id, put the desk name here and leave the id out. |
| `role` | Readable role or desk. `desk` is accepted as an alias when `role` is missing. |
| `status` | `working`, `idle`, `blocked`, `offline`, or `not-reported`. Other short words are shown as typed. |
| `currentWork` | What that desk is doing, in a sentence. `""` when it reported and has nothing in progress. |
| `lastReportAt` | ISO time of that bot's last report, or `null` if it has never reported. |

`agents: []` means the routine ran and no bot reported. The page says **No agents in this feed.** Omitting `agents` means not connected.

The page never prints an `id` field from this array.

### `activityLog`

```json
"activityLog": [
  {
    "at": "2026-11-10T06:47:00-06:00",
    "level": "info",
    "actor": "Ops",
    "message": "Read Calendar and Gmail."
  }
]
```

`level` is `info`, `ok`, or `warn`. `actor` is a readable name. This is the Behind the scenes log. Omit the key when nothing wrote a log. `[]` means the log was checked and it is empty. Do not synthesize rows from calls.

## Triangle sections

The board is Home, Attract, Convert, and Transform. Omit a section when that source was not read. The page then says **Not connected**. An empty array means the source was read and nothing was there.

### `attract.social`

```json
"attract": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "social": {
    "asOf": "2026-11-10T06:47:00-06:00",
    "platforms": [
      {
        "id": "ig",
        "handle": "@cristianaguilar.ai",
        "postsThisWeek": 6,
        "viewsByWeek": [800, 900, 1100, 1400],
        "weekLabels": ["Oct 19", "Oct 26", "Nov 2", "Nov 9"],
        "followersByWeek": [12, 10, 18, 24],
        "posts": [
          { "title": "Hook", "url": "https://www.instagram.com/p/example/", "views": 1400, "publishedAt": "2026-11-08" }
        ]
      }
    ]
  },
  "community": {
    "asOf": "2026-11-10T06:47:00-06:00",
    "postsThisWeek": 2,
    "repliesThisWeek": 3,
    "note": "Skool and Discord"
  }
}
```

`platforms[].id` is `ig`, `x`, or `youtube` (`instagram`, `twitter`, and `yt` are accepted aliases). `postsThisWeek` is this Monday-start week. `viewsByWeek` and `followersByWeek` are oldest first, one number per week. The last point is this week. Until `targets.json` `baselineWeeks` (4) complete weeks exist, the page says **Baseline building** and leaves the trend out of the score. Do not pad a missing week with 0. Use `null` in the array for a gap, or omit the week only if you also shorten `weekLabels` the same way.

`posts[]` feeds the outlier count. A post is an outlier when its `views` are at least `outliersPerMonth.multiple` (3) times the median views of the posts in this payload. The page counts outliers whose `publishedAt` falls in the current Chicago month. Fewer than 4 posts with a views number is **Baseline building**, not a count of 0.

`attract.community` is Skool and Discord posts plus replies for this week. The page adds `postsThisWeek` and `repliesThisWeek` when both are numbers. Target is `communityPerWeek` in `targets.json`.

### `convert.funnel` and `convert.pipeline`

```json
"convert": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "funnel": { "contacts": 8, "booked": 4, "showed": 3, "closed": 1 },
  "pipeline": [
    { "name": "Northwind Studio", "stage": "Proposal", "nextStep": "Send the scope", "amount": 2000, "href": "https://mail.google.com/mail/" }
  ]
}
```

`funnel` numbers are the Calendar and Fathom sales counts for the current week. Omit a key when that step was not counted. Do not send 0 unless the source was read and the count was actually zero.

The page prefers the floor log for contacts, booked calls, showed calls, and closed deals when any row exists in the window. It does not add the log to `funnel`. Show rate is showed / booked and close rate is closed / showed, and only when both numbers come from the same source and the denominator is greater than 0. A missing denominator is **Log to start**, not 0%.

`pipeline: []` means the list was read and there are no deals. Omit `pipeline` when it was not read. `href` is `https` only.

Booked-call target, show rate, close rate, and the MRR target are in `targets.json`, not here. The MRR comparison uses cash collected this month. It is labeled **Target** and is never drawn as the result.

### `transform.clients`

```json
"transform": {
  "asOf": "2026-11-10T06:47:00-06:00",
  "clients": [
    {
      "name": "Andrew George",
      "handle": "@andrewpreneurship",
      "viewsByWeek": [1200, 1400, 1600, 2100],
      "weekLabels": ["Oct 19", "Oct 26", "Nov 2", "Nov 9"],
      "followersByWeek": [20, 18, 30, 40],
      "scripts": [
        { "title": "Hook", "deliveredAt": "2026-11-03", "filmedAt": "2026-11-05" }
      ],
      "overdue": [],
      "payment": "on-time",
      "health": 88,
      "wins": [{ "at": "2026-11-10", "text": "What they actually said." }]
    }
  ]
}
```

The page always lists the clients in `targets.json` `transform.clients`. It matches feed rows by handle, then by name. A named client with no row says **Not connected** on each line. Extra feed rows are still shown.

`payment` is `on-time`, `late`, or `partial`. On time is green. Late or partial is red. Omit `payment` when it is unknown.

`overdue` is items still open. Each item has `title` and `days`. `[]` means the list was checked and nothing is waiting (green, target none). Any item older than `overdueActAfterDays` (7) is red. Omit `overdue` when it was not checked.

`scripts[]` uses `deliveredAt` and `filmedAt` (`YYYY-MM-DD` or ISO). The target is `filmedRate` (1) filmed within `filmedWithinDays` (7). A script still inside that window is on pace. Counts without dates are a fallback: `scriptsDelivered` and `scriptsFilmed`. The page then cannot apply the 7-day check and says so.

`health` is a number the routine computed. Omit it to show **Not connected**. The page does not invent a health target, so health is not part of the side score.

`wins[]` are real logged quotes only. Do not put placeholder praise here. An empty list or a missing key shows **No wins logged**. Sample mode is the only place a SAMPLE quote belongs. The floor log metric `client_wins` is the other source, and those rows require `client_name`.

`viewsByWeek` and `followersByWeek` follow the same baseline rule as Attract.

### Game layer (computed, not stored)

The page computes this from the log and the feed. Do not write a score, a streak, or XP into `today.json`.

- Side score: average of progress-to-target for metrics on that side that have a value and a target. Capped at 100. The card lists the metrics it counted.
- Filming streak: consecutive Chicago days with a `videos` row, ending today or yesterday.
- Booked-call streak: consecutive finished weeks whose booked-call sum met the target. The current week does not break it.
- XP: `targets.json` `xp.points` times log `count`, plus cash. Succeeded `cash.stripe.recentCharges` are used when that array is present. Otherwise the Stripe month total, otherwise Gmail `payments` with `direction: "in"`. No bar is drawn at 0 XP.
- Weekly wins: log rows, client wins, and succeeded cash whose date is in the current Monday-start week.

## Freshness

- File `asOf` feeds the header age.
- A section `asOf` overrides that for its own panels.
- Same Chicago calendar day: **Updated today at 6:47 AM CT**.
- Older: **Last updated 3 days ago**.
- `error` plus `lastGoodAt`: the page shows the error and the age of `lastGoodAt`.

## Floor log (not in `today.json`)

Table `public.cc_kpi_log`, owner login only (`app_metadata.role = admin`).

| Column | Meaning |
|---|---|
| `metric` | `videos`, `lead_magnets`, `contacts`, `booked_calls`, `showed_calls`, `closed_deals`, `client_wins` |
| `count` | How many were logged in this entry (1 to 500). The card sums `count`. There is no zero row. |
| `logged_on` | `YYYY-MM-DD` Chicago day the work counts for. |
| `note` | Optional, up to 240 characters. Required in the board UI for `client_wins`. |
| `client_name` | Required for `client_wins` (1 to 80 characters). Must be null for every other metric. |
| `user_id` | Defaults to `auth.uid()`. |
| `created_at` | When the button was pressed. |

The sparkline groups `count` by `logged_on` for that metric. Days with no row are left out. They are not drawn as zero.

## Sample mode

`?sample=1` fetches `today.sample.json` instead. That file sets `"sample": true`. Every figure on that view is layout sample data and must stay out of `today.json`.
