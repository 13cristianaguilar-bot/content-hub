# Signal booking setup

The pages are static files in `book/`. GitHub Pages serves them after this branch is on `main`. The booking API is the Supabase edge function `booking` on the existing Content Hub project (`udkbnlpnfyjuwlstfxhr`). Nothing here changes the Content Hub tables or the existing GoHighLevel calendars.

Until the four secrets below are saved, the pages load and the API answers `not_configured`. It does not invent open times.

## Secrets Cristian adds

Supabase dashboard → Project `udkbnlpnfyjuwlstfxhr` → **Edge Functions** → **Secrets**.

| Secret | What it is |
|---|---|
| `GOOGLE_CLIENT_ID` | OAuth client id from the one-time Google step below |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | Refresh token for Cristian's own Google account |
| `GHL_PRIVATE_TOKEN` | GoHighLevel private integration token |

Optional:

| Secret | Default |
|---|---|
| `GOOGLE_CALENDAR_ID` | `primary` |
| `GHL_LOCATION_ID` | `Yu4Qxi3iICjZbsKEWR5g` |
| `GHL_USER_ID` | `EvJpYg3QAZcZF4TDfLMk` |
| `BOOKING_PUBLIC_ORIGIN` | `https://13cristianaguilar-bot.github.io/content-hub` |
| `BOOKING_IP_SALT` | a long random string, so IP hashes are not reversible |
| `BOOKING_RULES_JSON` | overrides notice, window, duration, or weekly hours by slug |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are already injected into edge functions. Do not paste them into the pages.

## 1. Google Calendar

1. [Google Cloud Console](https://console.cloud.google.com/) → new project → enable **Google Calendar API**. The project stays on the free quota.
2. OAuth consent screen → External → add the scope `https://www.googleapis.com/auth/calendar` → add the Google account that owns the calendar as a test user. Publishing the app is unnecessary while it stays in testing and only that account signs in.
3. Credentials → OAuth client → **Desktop app** (or Web application with redirect `http://127.0.0.1:53682/callback`).
4. On your machine, from this repo:

```bash
export GOOGLE_CLIENT_ID="..."
export GOOGLE_CLIENT_SECRET="..."
node booking/google-oauth-setup.mjs
```

5. Open the printed URL, sign in as the Google account that owns the calendar, approve access, and copy the refresh token into the Supabase secret. The script prints the token once and does not write it to disk.
6. If the appointments live on a calendar other than the primary one, set `GOOGLE_CALENDAR_ID` to that calendar's id.

The token is used to read free/busy, create the event with a Google Meet link, invite the guest, and delete the event if they cancel.

## 2. GoHighLevel

1. Sub-account `Yu4Qxi3iICjZbsKEWR5g` → Settings → Private Integrations → Create.
2. Scopes: `calendars.readonly`, `calendars/events.write`, `contacts.write`.
3. Copy the token once into `GHL_PRIVATE_TOKEN`.

The function reads that calendar's live free slots (so the hours, 2 hour notice, and 10 day window stay in GoHighLevel), then removes anything busy on Google Calendar or already held here. After a booking it upserts the contact by email and creates the appointment on the same calendar id, with notifications left on. Cancelling updates that appointment to `cancelled`. The old widget links are not edited.

## 3. Database

The migration `migrations/2026-11-13_signal_bookings.sql` is already applied on project `udkbnlpnfyjuwlstfxhr`. It adds `signal_bookings` and `signal_booking_attempts`. Row level security is forced on, and `anon` has no grants, so the publishable key cannot read guest names, emails, or phones. The service role, which only the edge function has, is the writer.

Do not run the file again. If the tables are ever dropped, that file is the source.

## 4. Function

The source is `supabase/functions/booking/`. `verify_jwt` is off because a guest does not have a Supabase login. The function still refuses origins other than the GitHub Pages host and local dev.

```bash
supabase functions deploy booking --project-ref udkbnlpnfyjuwlstfxhr --no-verify-jwt
```

Check:

```bash
curl -s "https://udkbnlpnfyjuwlstfxhr.supabase.co/functions/v1/booking?action=health"
```

`configured` becomes true after the four secrets are saved. Then open a booking page and reserve a time you can cancel.

## Links, after Pages rebuilds

- https://13cristianaguilar-bot.github.io/content-hub/book/audit/
- https://13cristianaguilar-bot.github.io/content-hub/book/connect/
- https://13cristianaguilar-bot.github.io/content-hub/book/content-engine/
- https://13cristianaguilar-bot.github.io/content-hub/book/ma/
- https://13cristianaguilar-bot.github.io/content-hub/book/ma-30/

Add `?preview=1` to click through the layout without creating an event.
