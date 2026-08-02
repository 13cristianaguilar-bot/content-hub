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
- Email: `richlifedevteam@gmail.com`
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

## Updating the app

Edit `index.html` locally → then:

```bash
cd /Users/cristianaguilar/Documents/my-ai-team/content-app
git add index.html
git commit -m "update"
git push
```

GitHub Pages rebuilds in ~30–60 seconds.
