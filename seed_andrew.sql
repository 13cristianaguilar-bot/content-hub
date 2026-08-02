-- seed_andrew.sql
-- Adds Andrew's 15 Batch-02 scripts + fixes Jan's reference clips to real URLs
-- Run in Supabase → SQL Editor → New query → Paste → Run

-- ─── FIX JAN'S REFERENCE CLIPS ──────────────────────────────────────────────

-- Jan reels 1-3: direct YouTube clips (research-verified)
UPDATE scripts SET reference_clip = 'https://www.youtube.com/watch?v=zrF9iohukqI'
WHERE client_slug = 'jan' AND reel_number = 1;

UPDATE scripts SET reference_clip = 'https://www.youtube.com/watch?v=2RZkQht6hnY'
WHERE client_slug = 'jan' AND reel_number = 2;

-- Jim Rohn — verify this clip is "Who am I around? What do they have me becoming?"
UPDATE scripts SET reference_clip = 'https://www.youtube.com/shorts/q6wxsK5v6VU'
WHERE client_slug = 'jan' AND reel_number = 3;

-- Jan reels 4-6 (F2 format ref): candasifamabarnes profile — swap for direct reel URL when you have it
UPDATE scripts SET reference_clip = 'https://www.instagram.com/candasifamabarnes/'
WHERE client_slug = 'jan' AND reel_number IN (4, 5, 6);

-- Jan reels 7-9 (F3 format ref): profitagnosis profile — swap for direct reel URL when you have it
UPDATE scripts SET reference_clip = 'https://www.instagram.com/profitagnosis/'
WHERE client_slug = 'jan' AND reel_number IN (7, 8, 9);

-- ─── ANDREW BATCH-02 (15 scripts) ───────────────────────────────────────────

INSERT INTO scripts (client_slug, title, format, status, hook, full_script, reference_clip, camera, cta, editor_notes, batch, reel_number) VALUES

('andrew',
'Nobody Says GHL Is Too Complicated',
'Format C',
'Needs Review',
$$I saw a comment that said "GoHighLevel is too complicated to explain in a short video."$$,
$$[0:00–0:04]
I saw a comment that said "GoHighLevel is too complicated to explain in a short video."

[0:04–0:09]
I've helped hundreds of people build their entire SaaS business on it — in 60 seconds or less.

[0:09–0:14]
[pause, direct look]
Sit on that one.$$,
'https://www.instagram.com/austingeorgas/',
'Camera A',
'None — End Clean',
$$No CTA. No lower thirds. Hard cut after "Sit on that." Max 14s.$$,
'Andrew Batch-02 · 7.11.2026', 1),

('andrew',
'Why GHL Affiliates Stall at $2k/mo',
'Format A',
'Needs Review',
$$How many GHL affiliates actually hit $5,000 a month in recurring revenue? Almost none. So why does SaaS Suite keep getting people there when nothing else does?$$,
$$[0:00–0:08]
How many GHL affiliates actually hit $5,000 a month in recurring revenue? Almost none. So why does SaaS Suite keep getting people there when nothing else does?

[0:08–0:18]
Most GHL affiliates set up their affiliate link, post a tutorial or two, and wait. And they get stuck because there's no system moving people from "interested" to "signed up." The business never compounds.

[0:18–0:35]
[screen recording — SaaS Suite dashboard or affiliate backend]
Here's the general gist of what's different. SaaS Suite gives you the offer to lead with — a free white-label GHL account. You're not selling software. You're giving something away. The affiliate link is the backend. That's literally it.

[0:35–0:44]
You're not asking for a purchase. You're giving a free tool — and the platform does the converting. Long story short: you lead with free, you win with recurring.

[0:44–0:48]
Comment SUITE and I'll show you exactly how to set it up from scratch.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A → Screen Recording → Camera A',
'Comment SUITE',
$$Screen recording cutaway at 0:18 — SaaS Suite dashboard (affiliate or free-account side). Andrew narrates over. Return to Andrew at 0:35. On-screen text at 0:00: "Why nobody hits $5k/mo with GHL" — sound-off readable. Lower third at 0:44: "Comment SUITE" + handle. End card: gofreesass.com$$,
'Andrew Batch-02 · 7.11.2026', 2),

('andrew',
'3 Things I Wish I Knew Before My First GHL Client',
'List Drop',
'Needs Review',
$$Three things I wish someone had told me before I got my first GoHighLevel client. Save this one.$$,
$$[0:00–0:06]
Three things I wish someone had told me before I got my first GoHighLevel client. Save this one.

[0:06–0:17]
One. The platform isn't the product. You are. People don't buy GHL — they buy the confidence that someone is going to make it work for them. Fun fact: the client who stays is the one who trusts you, not the one who thinks the software is cool.

[0:17–0:30]
Two. Set up before you sell. I don't care how excited you are — don't promise the client the workflow until you've built it in your own account and tested it. Here's the general gist: demo what works, not what might work.

[0:30–0:44]
Three. The free account is your best lead magnet. You guessed it — giving someone a working GHL account for free is a better first impression than any sales page. Boom. Just like that, you've got a warm lead who's already using the tool.

[0:44–0:50]
Three things. Learning them early would have saved me months.

[0:50–0:55]
Comment FREE and I'll send you the full setup guide — no cost.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A — Talking Head',
'Comment FREE',
$$Flash each number on screen as Andrew says it ("1." "2." "3.") — white bold. On-screen text at 0:00: "3 things I wish I knew before my first GHL client" — sound-off readable. Brisk delivery. Lower third at 0:50: "Comment FREE" + gofreesass.com$$,
'Andrew Batch-02 · 7.11.2026', 3),

('andrew',
'You Need 10K Followers Before Selling SaaS',
'Format C',
'Needs Review',
$$I saw a tweet that said you need 10,000 followers before you can sell a SaaS product.$$,
$$[0:00–0:04]
I saw a tweet that said you need 10,000 followers before you can sell a SaaS product.

[0:04–0:11]
I had my first SaaS customer before I had a hundred followers. That's literally it.

[0:11–0:16]
[pause]
Sit on that one.$$,
'https://www.instagram.com/austingeorgas/',
'Camera A',
'None — End Clean',
$$No CTA. No lower thirds. Hard cut after "Sit on that." Max 16s.$$,
'Andrew Batch-02 · 7.11.2026', 4),

('andrew',
'GHL Without Content Is Just an Expensive CRM',
'Format A',
'Needs Review',
$$How many people buy GoHighLevel and actually make money with it? Almost none. So what's the one thing the ones who do have in common?$$,
$$[0:00–0:08]
How many people buy GoHighLevel and actually make money with it? Almost none. So what's the one thing the ones who do have in common?

[0:08–0:18]
Most people buy GHL thinking the platform is the product. They set up their funnels, their workflows, their automations — and then they sit there with a full tech stack and zero customers. GHL is the engine. Content is the ignition.

[0:18–0:38]
[screen recording — Andrew's dashboard or a GHL SaaS account with active subscribers]
The accounts that are growing have one thing you can see immediately — they're showing you the platform. Screen recordings, walkthroughs, proof that it works. You guessed it — that content is what puts people in the pipeline. The CRM just handles them once they're there.

[0:38–0:45]
Here's the general gist: GHL without content is just an expensive CRM. GHL with consistent content is a SaaS business.

[0:45–0:50]
Comment FREE and I'll show you the exact setup I use — totally free.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A → Screen Recording → Camera A',
'Comment FREE',
$$Screen recording at 0:18 — subscriber dashboard or GHL SaaS backend showing active users. Return to talking head at 0:38. On-screen text at 0:00: "Why most GHL users make zero money" — sound-off readable. Lower third at 0:45: "Comment FREE" + gofreesass.com$$,
'Andrew Batch-02 · 7.11.2026', 5),

('andrew',
'3 Reasons GHL Affiliates Quit Before They Should',
'List Drop',
'Needs Review',
$$Three reasons most GHL affiliates quit — and why every single one of them is the wrong call.$$,
$$[0:00–0:06]
Three reasons most GHL affiliates quit — and why every single one of them is the wrong call.

[0:06–0:17]
One. They quit because nobody bought in the first 30 days. But that's not a product problem. That's a discovery problem. Your first 30 days are for building the machine — the content, the pipeline, the free offer. The sales come when the machine runs.

[0:17–0:30]
Two. They quit because they think they need to be a GHL expert first. I get it — don't get overwhelmed. But here's the general gist: you don't need to know everything. You need to know enough to show people the one thing that would change their business. Start there.

[0:30–0:44]
Three. They quit because they're comparing their month one to someone else's year three. You guessed it — the accounts you're looking at right now? They had a month one too. Boom. Just like that, the comparison stops making sense.

[0:44–0:52]
Three reasons. None of them are good enough to stop. Keep going.

[0:52–0:58]
Comment SUITE and I'll show you the system that actually compounds.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A — Talking Head',
'Comment SUITE',
$$Flash numbers on screen ("1." "2." "3."). On-screen text at 0:00: "3 reasons GHL affiliates quit before they should" — sound-off readable. Lower third at 0:52: "Comment SUITE" + sassuite.ai$$,
'Andrew Batch-02 · 7.11.2026', 6),

('andrew',
'Organic Content Doesn''t Work for B2B Software',
'Format C',
'Needs Review',
$$I saw a post that said organic content doesn't work if you're selling B2B software.$$,
$$[0:00–0:04]
I saw a post that said organic content doesn't work if you're selling B2B software.

[0:04–0:10]
[holds up one finger]
Forty-seven dollars a month. Eight thousand subscribers. Organic only.

[0:10–0:15]
[pause, slight smile]
Sit on that one.$$,
'https://www.instagram.com/austingeorgas/',
'Camera A',
'None — End Clean',
$$Andrew holds up one finger at "Forty-seven dollars." Visual interrupt. No CTA. Hard cut. Max 15s.$$,
'Andrew Batch-02 · 7.11.2026', 7),

('andrew',
'Why GHL SaaS Owners Don''t Post Consistently',
'Format A',
'Needs Review',
$$How many GHL SaaS owners post content every single week? Almost none. So why does SaaS Suite keep growing month after month with no ad spend?$$,
$$[0:00–0:08]
How many GHL SaaS owners post content every single week? Almost none. So why does SaaS Suite keep growing month after month with no ad spend?

[0:08–0:20]
Most GHL SaaS owners stop posting because they run out of ideas. They make two tutorials, a few walkthroughs — and then they're stuck. The issue isn't effort. It's that they're trying to create from scratch every time instead of working from a system.

[0:20–0:38]
[screen recording — MRR graph, subscriber count, or content calendar]
Here's what's different. You've got three formats — comparison, list, reframe. You cycle them. Boom. Just like that, you have a two-week content plan before you film a single thing. The growth isn't from working harder. It's from working the system.

[0:38–0:45]
Long story short: the accounts that post consistently aren't more creative. They just have a repeatable format. That's literally it.

[0:45–0:50]
Comment SUITE and I'll show you the exact system I run.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A → Screen Recording → Camera A',
'Comment SUITE',
$$Screen recording at 0:20 — MRR growth chart or subscriber dashboard. Return to talking head at 0:38. On-screen text at 0:00: "Why most GHL SaaS owners stop posting" — sound-off readable. Lower third at 0:45: "Comment SUITE" + sassuite.ai$$,
'Andrew Batch-02 · 7.11.2026', 8),

('andrew',
'3 Signs Your GHL Content Is Actually Working',
'List Drop',
'Needs Review',
$$Three signs your GHL content is working — even when it doesn't feel like it.$$,
$$[0:00–0:06]
Three signs your GHL content is working — even when it doesn't feel like it.

[0:06–0:18]
One. The comments aren't huge, but they're specific. Someone asks "does this work with [workflow type]?" — that's a buyer question. That's not someone scrolling. That's someone who is very close to a decision. Specific questions mean warm leads.

[0:18–0:32]
Two. Your follow count is flat but your DMs are active. Fun fact: the people watching your content carefully are usually not the loudest ones. They're watching, deciding, building trust. A slow-burn audience that converts beats a fast-growing audience that ghosts.

[0:32–0:46]
Three. The same people keep showing up. You start recognizing names in the comments. That's not a small account — that's a loyal one. And a loyal audience is the only kind that compounds. Here's the general gist: reach is vanity, loyalty is the engine.

[0:46–0:54]
Three signs. If any of those sound familiar, you're further along than you think.

[0:54–1:00]
Comment GROW and I'll walk you through how to read your numbers correctly.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A — Talking Head',
'Comment GROW',
$$Flash numbers on screen ("1." "2." "3."). On-screen text at 0:00: "3 signs your GHL content is working (most people miss these)" — sound-off readable. Warm delivery — this is encouraging, not urgent. Lower third at 0:54: "Comment GROW" + handle$$,
'Andrew Batch-02 · 7.11.2026', 9),

('andrew',
'Start Posting When Your Product Is Ready',
'Format C',
'Needs Review',
$$I got a DM that said "I'll start posting when my SaaS product is fully ready."$$,
$$[0:00–0:04]
I got a DM that said "I'll start posting when my SaaS product is fully ready."

[0:04–0:10]
[Andrew pauses, slight smile]
The product is never fully ready.

[0:10–0:14]
Sit on that one.$$,
'https://www.instagram.com/austingeorgas/',
'Camera A',
'None — End Clean',
$$No CTA. Hard pause between "never fully ready" and "Sit on that." The pause is the content. Max 14s.$$,
'Andrew Batch-02 · 7.11.2026', 10),

('andrew',
'SaaS Suite vs Every Other GHL Course',
'Format A',
'Needs Review',
$$Most GHL courses charge $997 upfront. You still have to figure out the tech, find your audience, and build the offer yourself. So why is SaaS Suite the one that actually gets people to recurring revenue?$$,
$$[0:00–0:08]
Most GHL courses charge $997 upfront. You still have to figure out the tech, find your audience, and build the offer yourself. So why is SaaS Suite the one that actually gets people to recurring revenue?

[0:08–0:20]
Most courses give you knowledge. SaaS Suite gives you a system you can use tomorrow. There's a difference between understanding how to build a SaaS business and actually having the tools to run one. Most people get the first and skip the second.

[0:20–0:38]
[screen recording — SaaS Suite dashboard, key tools or affiliate flow]
Here's the general gist. You get the platform tools, the content frameworks, and the affiliate offer already built. You're not starting from scratch. You're plugging into something that already works. That's literally it.

[0:38–0:45]
Fun fact: you can get started for $47 a month. The course you almost bought was $997 with no guarantee.

[0:45–0:50]
Comment SUITE and I'll send you the full breakdown.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A → Screen Recording → Camera A',
'Comment SUITE',
$$Screen recording at 0:20 — SaaS Suite dashboard showing tools or free account offer. Return to talking head at 0:38. On-screen text at 0:00: "SaaS Suite vs $997 GHL courses" — sound-off readable. Lower third at 0:45: "Comment SUITE" + sassuite.ai$$,
'Andrew Batch-02 · 7.11.2026', 11),

('andrew',
'3 Mistakes That Keep GHL SaaS Owners Stuck at $2k/mo',
'List Drop',
'Needs Review',
$$Three mistakes I see constantly that keep GHL SaaS owners stuck at $2,000 a month. If any of these sound familiar, write it down.$$,
$$[0:00–0:06]
Three mistakes I see constantly that keep GHL SaaS owners stuck at $2,000 a month. If any of these sound familiar, write it down.

[0:06–0:18]
One. They're selling the platform instead of the result. "You should use GHL" is not a pitch. "What if you never had to chase a lead again" — that's a pitch. Lead with what changes, not what the tool is called.

[0:18–0:30]
Two. They have no free offer. Here's the general gist: the single fastest way to get someone into your ecosystem is to give them something that works — before they've paid you anything. A free GHL account is more powerful than a sales page. I'd highly recommend setting this up before anything else.

[0:30–0:44]
Three. They post tutorials with no ask. You guessed it — the tutorial is the hook, not the close. Every piece of content needs one specific action at the end: comment this word, go to this link. No ask, no pipeline. Boom. Just like that, the views stop converting.

[0:44–0:52]
Three mistakes. Fix any one of them and the number moves.

[0:52–1:00]
Comment FREE and I'll send you the free account setup — no cost to start.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A — Talking Head',
'Comment FREE',
$$Flash numbers ("1." "2." "3."). On-screen text at 0:00: "3 mistakes keeping GHL SaaS owners at $2k/mo" — sound-off readable. Lower third at 0:52: "Comment FREE" + gofreesass.com$$,
'Andrew Batch-02 · 7.11.2026', 12),

('andrew',
'You Need to Go Viral',
'Format C',
'Needs Review',
$$I saw a thread that said you need to go viral to build a SaaS business on Instagram.$$,
$$[0:00–0:04]
I saw a thread that said you need to go viral to build a SaaS business on Instagram.

[0:04–0:10]
Show me your monthly recurring revenue first.

[0:10–0:15]
[pause, direct look]
Sit on that one.$$,
'https://www.instagram.com/austingeorgas/',
'Camera A',
'None — End Clean',
$$Andrew leans in slightly at "Show me your monthly recurring revenue." No CTA. Hard cut. Max 15s.$$,
'Andrew Batch-02 · 7.11.2026', 13),

('andrew',
'Why GHL Creators Fail Even With Great Products',
'Format A',
'Needs Review',
$$How many GHL SaaS owners have a genuinely good product and still have zero traction? Most of them. And the reason every single time is the same thing.$$,
$$[0:00–0:08]
How many GHL SaaS owners have a genuinely good product and still have zero traction? Most of them. And the reason every single time is the same thing.

[0:08–0:20]
It's not the product. The product is fine. The problem is nobody knows it exists. And the solution isn't paid ads. It's not cold DMs. It's showing the product working — consistently — in content that drives a specific action.

[0:20–0:38]
[screen recording — Andrew's own reel analytics, comment count, or subscriber growth]
Here's the general gist. Every week you post, you're adding to a machine that runs while you're not posting. Each reel is a piece of pipeline that keeps moving people toward your offer. And here's the key — this is the one thing paid ads can't replicate. Organic content builds trust. Trust is what converts.

[0:38–0:45]
Long story short: a great product with no content is invisible. Content is what makes the product findable. That's literally it.

[0:45–0:50]
Comment FREE and I'll show you how to get started — totally free.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A → Screen Recording → Camera A',
'Comment FREE',
$$Screen recording at 0:20 — Andrew's own analytics: reel views → comment count → affiliate signups. Return to talking head at 0:38. On-screen text at 0:00: "Why great products fail on Instagram" — sound-off readable. Lower third at 0:45: "Comment FREE" + gofreesass.com$$,
'Andrew Batch-02 · 7.11.2026', 14),

('andrew',
'3 Things Every $10k/mo GHL Creator Does Differently',
'List Drop',
'Needs Review',
$$Three things every GHL creator I've seen hit $10,000 a month does that the ones stuck at $1,000 don't.$$,
$$[0:00–0:06]
Three things every GHL creator I've seen hit $10,000 a month does that the ones stuck at $1,000 don't.

[0:06–0:18]
One. They lead with free. Not "check out my platform" — they give someone a working GHL account before they ever ask for a dollar. Fun fact: the person who uses your free tool for 30 days is 10x more likely to upgrade than the person who saw your sales page.

[0:18–0:32]
Two. They film in batches. Two setups, one 90-minute session, two weeks of content. Boom. Just like that, they're consistent without being glued to their camera. I'd highly recommend building this into your schedule before anything else — consistency is the only thing that compounds.

[0:32–0:46]
Three. They have one ask per reel. Not "follow me, share this, go to my link, DM me, and comment below." One. Comment this word. Or go to this link. You guessed it — the accounts with the highest comment counts have the simplest asks.

[0:46–0:54]
Three things. They're not secrets. They're just what people who are scaling actually do.

[0:54–1:02]
Comment GROW and I'll walk you through all three from the start.$$,
'https://www.instagram.com/reel/DXFzCMeE56r/',
'Camera A — Talking Head',
'Comment GROW',
$$Flash numbers ("1." "2." "3."). On-screen text at 0:00: "What $10k/mo GHL creators do differently" — sound-off readable. Andrew's delivery: confident, generous, not preachy. Expert-friend tone. Lower third at 0:54: "Comment GROW" + handle$$,
'Andrew Batch-02 · 7.11.2026', 15);
