# Content Hub — Deploy Guide
Zero cost. Phone-first. Live in ~20 minutes.

Stack: **Supabase** (database + auth) + **GitHub Pages** (hosting)

---

## Step 1 — Create your Supabase project (5 min)

1. Go to **supabase.com** → sign in with GitHub or email → **New project**
2. Name it `content-hub` (or whatever you like)
3. Set a strong database password → save it somewhere → click **Create new project**
4. Wait ~2 min for the project to spin up

---

## Step 2 — Run the schema (2 min)

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Open `content-app/schema.sql` on your computer
3. Copy the entire file → paste into the editor → click **Run**
4. You should see: `Success. No rows returned`

This creates the `scripts` table, turns on Row Level Security, and seeds Jan's 9 Batch-01 scripts.

---

## Step 3 — Get your API keys (1 min)

In Supabase: **Project Settings** (gear icon, bottom left) → **API**

Copy these two values:
- **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
- **anon public** key — the long `eyJ...` string

---

## Step 4 — Paste keys into the app (1 min)

Open `content-app/index.html` in any text editor.

Find lines 27–28 at the top of the `<script>` block:

```js
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace the placeholder strings with your real values. Save the file.

---

## Step 5 — Create user accounts (5 min)

In Supabase: **Authentication** → **Users** → **Add user** (for each person)

### Your admin account (Cristian)
- Email: your own admin email
- Password: pick something strong
- After creating: click the user → **Edit** → paste into **Raw user meta data**:
  ```json
  {"role": "admin"}
  ```
  → Save

### Andrew's account
- Email: Andrew's email
- Password: text it to him after setup
- User meta data:
  ```json
  {"role": "client", "client_slug": "andrew"}
  ```

### Jan's account
- Email: Jan's email
- Password: text it to him after setup
- User meta data:
  ```json
  {"role": "client", "client_slug": "jan"}
  ```

### Required extra step (as of the client-isolation fix): also set app_metadata
The dashboard's "Add user" form only writes **Raw user meta data**, which a signed-in user can
edit on themselves — fine for the app's own UI, but not safe to use for real access control.
The actual security check (in `schema.sql`'s RLS policies) reads **app_metadata** instead, which
only an admin/service-role can set. After creating a user the normal way above, also run this in
**SQL Editor** for that user (swap the email and values):

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'client', 'client_slug', 'newclient')
where email = 'newclient@example.com';
```

Use `'role': 'admin'` with no `client_slug` for an admin account. Without this step, the new
account can sign in and the app's UI will look right, but RLS will correctly show them zero rows,
since nothing in their app_metadata matches any client_slug yet.

---

## Step 6 — Push to GitHub Pages (5 min)

### If you don't have a GitHub account
Sign up at github.com — free forever.

### Create the repo
1. github.com → **+** (top right) → **New repository**
2. Name: `content-hub` (or anything)
3. Set to **Public** (required for free Pages)
4. Click **Create repository**

### Push the file
Open Terminal on your Mac and run these commands one at a time:

```bash
cd /Users/cristianaguilar/Documents/my-ai-team/content-app

git init
git add index.html
git commit -m "launch content hub"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/content-hub.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Enable Pages
1. In your GitHub repo → **Settings** → **Pages** (left sidebar)
2. Under **Source** → select **main** branch → **/ (root)** → click **Save**
3. Wait ~1 min → refresh → your URL appears: `https://YOUR_GITHUB_USERNAME.github.io/content-hub`

---

## Step 7 — Test it (2 min)

1. Open the URL on your phone
2. Sign in with your admin email + password
3. You should see: Andrew/Jan tabs + Jan's 9 Batch-01 scripts loaded
4. Tap a card → expand it → tap **Approved →** to advance status → confirm it saves

If you see a blank white screen: check that the Supabase URL and anon key are pasted correctly in `index.html`.

---

## Sharing with clients

Send each client:
- The URL: `https://YOUR_GITHUB_USERNAME.github.io/content-hub`
- Their email + temporary password (they can't change it themselves — you reset from Supabase Auth dashboard)

They'll only see their own scripts. You see everyone's.

Sign in once on a phone. Closing the tab and opening the Hub link again stays signed in. The password is still required the first time on that phone or browser. There is no "remember me" checkbox — staying signed in is the default.

### If a phone still asks for the password every visit

The app saves the session in `localStorage` (not `sessionStorage`) under `sb-udkbnlpnfyjuwlstfxhr-auth-token`, with `persistSession` and `autoRefreshToken` on. Checked against the live project on November 5, 2026: active sessions have no `not_after`, so nothing on the server is expiring them early. Confirm these in the dashboard anyway if phones start dropping sessions after this ships:

Supabase → **Authentication** → **Sessions** (`/dashboard/project/udkbnlpnfyjuwlstfxhr/auth/sessions`):

| Setting | What to use | Why |
|---|---|---|
| Time-box user sessions | **0** (never) or at least 30 days | A short time-box forces a password again even when the phone still has the refresh token. |
| Inactivity timeout | **0** (never) or at least 30 days | A phone that isn't opened within the window is signed out on the next visit. |
| Single session per user | **Off** | Signing in on a laptop revokes the phone. |
| Refresh token reuse interval | Leave at **10 seconds**. Raise to **60** only if a double page-load still signs people out. | Covers a refresh whose response was lost. Don't turn reuse detection off. |

JWT expiry (access token) is separate: **Project Settings → JWT Keys → Legacy JWT Secret**, or Authentication settings. The default **3600 seconds (1 hour)** is right. The phone refreshes it in the background. Don't set it under 5 minutes — that makes refresh fail more often and looks like a logout. Raising it does not keep anyone signed in longer than the refresh token does.

Two limits the app cannot remove:

- **Safari deletes script-writable storage** (localStorage included) after about 7 days of Safari use with no tap or click on this site. Opening the Hub and using it resets that clock. A phone that doesn't open the Hub for a week may have to sign in again. That is an iOS rule, not a JWT setting.
- **WhatsApp's in-app browser** often keeps a separate, empty store from Safari. A session saved inside WhatsApp can vanish when that browser is dismissed, and it is not the Safari session. Use **Open in Safari** (or Chrome) for the link that should stay signed in. Saved-password autofill is there for the case iOS still asks.

---

## Adding Andrew's Batch-02 scripts

After deploying, add Andrew's 15 scripts via Supabase:

**SQL Editor** → **New query** → paste an insert like:

```sql
insert into scripts (client_slug, title, format, status, hook, full_script, reference_clip, camera, cta, editor_notes, batch, reel_number)
values ('andrew', 'Your Title Here', 'Format A', 'Needs Review', 'Hook text...', 'Full script...', '@tenfoldmarc', 'Camera A', 'Comment SUITE', 'Editor notes...', 'Andrew Batch-02 · 7.11.2026', 1);
```

Or: **Table Editor** → `scripts` table → **+ Insert row** (manual one at a time, slower but visual).

---

## What costs $0

| Thing | Free tier |
|---|---|
| Supabase | Free forever. Pauses after 7 days inactivity — resumes in ~5s on first request. 500MB storage. |
| GitHub Pages | Free forever. ~100GB/month bandwidth. |
| Tailwind CDN | Free. |
| Supabase JS CDN | Free. |

**Total: $0/month, no expiry.**

---

## Preview as client

The admin screen stays the admin screen. Needs your brain check, Read + stamp, Human QA, Mark client-ready, Format Vault, and the other stamp tools do not change.

**See what they see** is a separate option. It stays off until an admin opens it.

1. On the admin screen, open **View a client**.
2. Next to that client, tap **See what they see**. If you are already in their admin workspace, the same button is on the Viewing as banner.
3. The film list and Film prep match that client's own login. Read + stamp and Human QA are not on this screen.
4. A banner says **Viewing as [name]** with **Exit**. Exit returns to the full admin screen.

Andrew’s client screen leads with the current scripts. Conference, Italy, and other one-off batches stay behind **Past one-off scripts**. Nothing is deleted. His script screen shows the reference video, the visual hook, the text hook, and the spoken script. The teleprompter is the spoken script. Jan and Devin keep their existing lists. The admin note titled “See what the client sees” is admin-only. A real client login does not get that popup, including after a reload.

**Their scripts, prep, and edits** is still the admin workspace for that client. It keeps the stamp tools.

This does not change Supabase auth or anyone's password. It only changes what the admin screen draws. The page version is `2026.11.06.1`, so GitHub Pages loads the new file instead of a cached copy.

Andrew’s current list is the Approved CORE 10.28 and NOLAN 10.30 scripts. His spoken script is the hook column, the full_script body, and the cta column, plus a filming_direction Verbal Hook or CTA only when that text is not already in those columns. The script screen still shows the reference, visual hook, and text hook beside that full spoken body.

Conference and mastermind drafts were already on his list. They stay behind Past one-off scripts. Drafts outside those one-off batches, including the zz CORE 10.24 rows, stay off. A draft that shares a group with an archived take stays off, the same way All hid that group. Needs Review, including reel 10, stays off this film list. Archived rows stay off. Older Approved, Posted, Passed, and Filming rows, including Batch-03, open from Past one-off scripts and do not lead the current list. Nothing is deleted, and this does not change who can read a row in Supabase.

---

## Updating the app

Edit `index.html` locally → then:

```bash
cd /Users/cristianaguilar/Documents/my-ai-team/content-app
git add index.html
git commit -m "update"
git push
```

GitHub Pages rebuilds in ~30–60 seconds.
