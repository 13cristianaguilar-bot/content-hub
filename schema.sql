-- Content Hub — Supabase schema
-- Run this entire file in: Supabase → SQL Editor → New query → Paste → Run

-- ─────────────────────────────────────────────
-- SCRIPTS TABLE
-- ─────────────────────────────────────────────
create table if not exists scripts (
  id             uuid primary key default gen_random_uuid(),
  client_slug    text not null,       -- 'andrew' | 'jan'
  title          text not null,
  format         text,                -- 'Reaction' | 'F2 List' | 'F3 Perspective-Flip' | etc.
  status         text default 'Draft',-- 'Draft' | 'Needs Review' | 'Approved' | 'Filming' | 'Posted'
  hook           text,
  full_script    text,
  reference_clip text,                -- YouTube URL or account handle
  camera         text,
  cta            text,
  editor_notes   text,
  batch          text,
  reel_number    integer,
  date_planned   date,
  created_at     timestamptz default now()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Any signed-in user can read all scripts.
-- Any signed-in user can update status.
-- Only admins can insert/delete (enforced in app, not RLS, for simplicity).
-- ─────────────────────────────────────────────
alter table scripts enable row level security;

create policy "signed_in_can_read" on scripts
  for select to authenticated using (true);

create policy "signed_in_can_update" on scripts
  for update to authenticated using (true);

create policy "signed_in_can_insert" on scripts
  for insert to authenticated with check (true);

-- ─────────────────────────────────────────────
-- SEED: Jan's Batch-01 scripts (9 reels)
-- ─────────────────────────────────────────────
insert into scripts (client_slug, title, format, status, hook, full_script, reference_clip, camera, cta, editor_notes, batch, reel_number) values

('jan', 'Tony Robbins: The Past Doesn''t Have to Follow You', 'Reaction', 'Needs Review',
'Tony Robbins has been doing this work for over forty years. And this line — I love this.',
'[0:00–0:05] Tony Robbins has been doing this work for over forty years. And this line — I love this.

[CLIP 0:05–0:10] "The past does not equal the future unless you live there."

[0:10–0:13] The past does not equal the future... unless you live there.

[0:13–0:26] What does it mean to be living in your past? To be holding onto fears and beliefs that were created from past circumstances — and literally dragging them into your future where they don''t even exist?

[0:26–0:38] Because here''s what I know. Our future is wide open. Our future is full of possibility. It can be anything that we want it to be — and it''ll be so different from what we even think it could be right now.

[0:38–0:44] So the question isn''t, "Can I have a different future?" The question is — am I bringing my past with me into it?

[0:44–0:46] Just sit with that one.',
'YouTube: "Tony Robbins past does not equal future" — use 5–8s of that line',
'Camera A + B-roll', 'None — End Clean',
'At 0:05 cut to Tony B-roll (5–8s). Text overlay: "The past does not equal the future unless you live there." Return to Jan at 0:10. End clean — no music swell, no CTA.',
'Jan Batch-01 · 7.11.2026', 1),

('jan', 'Les Brown: Their Opinion Isn''t Your Reality', 'Reaction', 'Needs Review',
'Les Brown said something I think every single person building a business needs to hear.',
'[0:00–0:05] Les Brown said something I think every single person building a business needs to hear.

[CLIP 0:05–0:10] "Someone''s opinion of you does not have to become your reality."

[0:10–0:14] Someone''s opinion of you does not have to become your reality.

[0:14–0:27] The reason this is so powerful is because most of us carry opinions we collected years ago — from someone who said we couldn''t do it, someone who didn''t believe in us, maybe even a version of ourselves that gave up. And that opinion has become a voice.

[0:27–0:40] But here''s what I want to offer you. Just because that voice is in your head doesn''t mean it''s your only available thought. Just because we think something doesn''t mean we have to believe it. The voice isn''t being honest with you — it''s just being loud. And loud is not the same as true.

[0:40–0:46] For your consideration: the loudest thought isn''t always the truest one.

[0:46–0:53] If you want to go deeper on this — there''s a full lesson in the app. I''ll drop the link.',
'YouTube: "Les Brown someone''s opinion" — use 5s of that line',
'Camera A + B-roll', 'App Download',
'At 0:05 cut to Les Brown B-roll (5s). Text overlay: "Someone''s opinion of you does not have to become your reality." Return to Jan at 0:10. Jan leans slightly forward at "just being loud." CTA end card at 0:46: "Full lesson in the app →"',
'Jan Batch-01 · 7.11.2026', 2),

('jan', 'Jim Rohn: Who Are You Becoming?', 'Reaction', 'Needs Review',
'Jim Rohn figured this out early. And honestly, it took me a long time to catch up.',
'[0:00–0:05] Jim Rohn figured this out early. And honestly, it took me a long time to catch up.

[CLIP 0:05–0:12] "Who am I around? What have they got me thinking? What have they got me becoming?"

[0:12–0:16] What do they have me becoming.

[0:16–0:28] I believe that personal development is the great multiplier. Not just for your business — for your health, your relationships, your sense of self. When you grow, everything grows with you.

[0:28–0:40] And the question to ask yourself isn''t "how do I make more money" or "how do I recruit more people." The question is — who am I becoming? What am I reading? What am I listening to? Who am I spending time with?

[0:40–0:49] Grow your business by growing yourself. Because the inner work is what makes the outer work work.

[0:49–0:56] If you want a practice for this — there''s a full lesson in the app. I''ll drop the link below.',
'YouTube: "Jim Rohn who am I around what have they got me becoming" — use 7s',
'Camera A + B-roll', 'App Download',
'At 0:05 cut to Jim Rohn B-roll (7s). Text overlay: "What do they have me becoming?" Return to Jan at 0:12. Warm, meditative delivery. CTA end card: "Full lesson in the app →"',
'Jan Batch-01 · 7.11.2026', 3),

('jan', '5 Things 20 Years of Coaching Taught Me About the Inner Critic', 'F2 List', 'Needs Review',
'Twenty years of coaching in 60 seconds. Here''s what I''ve learned about the voice in your head.',
'[0:00–0:06] Twenty years of coaching in 60 seconds. Here''s what I''ve learned about the voice in your head.

[0:06–0:12] One. That voice isn''t your enemy. It''s a confused protector. It tells you you''re not enough because it thinks that''ll make you work harder. It means well. It''s just not helping.

[0:12–0:20] Two. Just because you think something doesn''t mean you have to believe it. A thought is not a verdict. It''s just the first thing that showed up.

[0:20–0:28] Three. You can''t fight the voice with logic. You have to give it a better job. What if instead of telling you you''re behind, it started reminding you how far you''ve actually come?

[0:28–0:36] Four. The loudest thought isn''t the truest one. Loud is a volume setting, not a fact-checking system.

[0:36–0:47] Five. Every scar on your body — you can barely find them now. Every fear, every hard season — you got through all of them. This one is no different. This too shall pass.

[0:47–0:55] Twenty years. Five things. For your consideration.',
'Format ref: @candasifamabarnes "4 yrs therapy in 1 min" — 2,351x / 19.7M — watch the numbered-beat structure',
'Camera A — Talking Head', 'None — End Clean',
'Flash each number on screen as Jan says it (1. 2. 3. 4. 5.) — white bold centered. Hook text: "20 years of coaching in 60 seconds." Brisk delivery between beats. No CTA. End clean on Jan''s final look.',
'Jan Batch-01 · 7.11.2026', 4),

('jan', '4 Questions That Change How You See Yourself', 'F2 List', 'Needs Review',
'Four questions I ask every coaching client. Save this one.',
'[0:00–0:05] Four questions I ask every coaching client. Save this one.

[0:05–0:13] One. When is the last time you talked to yourself the way you''d talk to someone you love? Because for most of us, the answer is — not today.

[0:13–0:22] Two. Is this the first time you''ve felt this way? Because if it isn''t — what''s different about you now versus then? You made it through. That matters.

[0:22–0:32] Three. What am I making this mean? Because something happened — and your brain immediately assigned a story. Is that the only story? Is there a truer, kinder version?

[0:32–0:45] Four. Behind whose schedule? Because when you feel behind — behind who? Who set the timeline? Who said you should be further by now? And the answer, most of the time, is you. And you can change the schedule anytime.

[0:45–0:53] Four questions. You can ask any one of them the next time things feel hard.

[0:53–1:00] If you want the full practice for this — there''s a lesson in the app. I''ll drop the link below.',
'Format ref: @candasifamabarnes numbered-beat format — time-compression mechanic',
'Camera A — Talking Head', 'App Download',
'Number each question on screen (1. 2. 3. 4.). Hook text: "4 questions that change how you see yourself." Jan can be slightly slower here — let each question land. CTA end card: "Full lesson in the app →"',
'Jan Batch-01 · 7.11.2026', 5),

('jan', '3 Signs You''re Closer Than You Think', 'F2 List', 'Needs Review',
'Three signs you''re actually closer than you think. And most people completely miss these.',
'[0:00–0:05] Three signs you''re actually closer than you think. And most people completely miss these.

[0:05–0:16] One. The resistance is getting louder. The doubt, the fear, the "why is this so hard" — that''s not a sign to stop. That''s almost always a sign that something real is about to happen. The voice gets loudest right before the breakthrough.

[0:16–0:27] Two. You''ve stopped reacting and started noticing. The fact that you can catch yourself in a pattern — that you''re watching the thought instead of being the thought — that''s awareness. And awareness is the whole game.

[0:27–0:40] Three. You keep going. Not because it''s easy, not because you have all the answers — but you''re still here, still showing up. How many scars are there on your body that have faded over time? That hurt so much when you got them, and now you can barely even find them. This is the same.

[0:40–0:50] Three signs. You''re probably further along than you think.

[0:50–0:55] For your consideration.',
'Format ref: @candasifamabarnes numbered-beat format — inversion mechanic',
'Camera A — Talking Head', 'None — End Clean',
'Flash numbers on screen (1. 2. 3.). Hook text: "3 signs you''re closer than you think." No CTA. End on Jan''s quiet look to camera.',
'Jan Batch-01 · 7.11.2026', 6),

('jan', 'The Biggest Mistake In How You Talk to Yourself', 'F3 Perspective-Flip', 'Needs Review',
'The biggest mistake most people make with their inner critic — they try to win the argument.',
'[0:00–0:07] The biggest mistake most people make with their inner critic — they try to win the argument.

[0:07–0:18] You tell yourself you''re not ready. And you fire back: "Yes I am." You tell yourself you''re going to fail. You say: "No I won''t." And for about thirty seconds, you feel better — and then the voice comes back louder.

[0:18–0:30] Here''s the shift. The inner critic isn''t your enemy. It''s a voice that''s trying to serve you. It''s a confused parent, an overprotective friend — it thinks by telling you you''re not enough, you''re going to work harder. It thinks by telling you you''ll never make it, you''ll stay safe from rejection.

[0:30–0:44] So you don''t argue with it. You don''t fight it. You get curious. What are you actually afraid of? What are you trying to protect me from? And then you offer it a better job — not "tell me I''m failing," but "remind me how far I''ve come."

[0:44–0:50] The voice is going to talk. You get to decide what it says.

[0:50–0:58] If you want a practice for this — there''s a full lesson in the app. I''ll drop the link below.',
'Format ref: @profitagnosis — 161x / 4.3M (IG) — assumption-buster mechanic',
'Camera A — Talking Head', 'App Download',
'Hook text: "The mistake everyone makes with their inner critic." Tighten frame slightly at "you don''t argue with it." CTA end card: "Full lesson in the app →"',
'Jan Batch-01 · 7.11.2026', 7),

('jan', 'Why Comparing Yourself to Others Will Never Work', 'F3 Perspective-Flip', 'Needs Review',
'The biggest mistake in comparing yourself to other people — most people never realize it''s a rigged game.',
'[0:00–0:07] The biggest mistake in comparing yourself to other people — most people never realize it''s a rigged game.

[0:07–0:19] Here''s why. You are comparing your behind-the-scenes to their highlight reel. You know every fear, every doubt, every thing you haven''t figured out yet. And what you''re comparing yourself to — that''s not even a version of the truth. That''s the part they chose to show.

[0:19–0:31] And even if you got to where they are — you''d move the goalposts. We always do. Once we get there, it becomes the next thing. The comparison doesn''t go away. You just pick a new target.

[0:31–0:43] So the question I''d ask is: behind whose schedule? Who said you should be further by now? Who set that timeline? Because when you actually look for the answer — most of the time it''s a voice. And you can change what that voice says.

[0:43–0:49] Says who is one of the most powerful questions you can ask yourself.

[0:49–0:54] For your consideration.',
'Format ref: @profitagnosis — 161x / 4.3M (IG) — perspective-flip on a false belief',
'Camera A — Talking Head', 'None — End Clean',
'"Says who" — Jan delivers directly, calmly, leaning in slightly. Philosophical, not aggressive. No CTA. End clean.',
'Jan Batch-01 · 7.11.2026', 8),

('jan', 'What Forgiving Someone Actually Means', 'F3 Perspective-Flip', 'Needs Review',
'The biggest misunderstanding about forgiveness — most people think it means what it doesn''t.',
'[0:00–0:07] The biggest misunderstanding about forgiveness — most people think it means what it doesn''t.

[0:07–0:18] Forgiveness doesn''t mean what they did was okay. It doesn''t mean you have to let them back in. It doesn''t mean you''re pretending it didn''t happen. And it definitely doesn''t mean they deserve it.

[0:18–0:30] Here''s the shift. Forgiveness is for you — not for them. It''s the act of releasing what you''re carrying so you don''t have to carry it into your future. You are not doing them a favor. You are freeing your own hands.

[0:30–0:43] And here''s something I''ve watched as a coach, with so many people: you can forgive someone and still have a boundary. Those aren''t opposites. "I forgive you — and I don''t need you in my space anymore" is a complete sentence.

[0:43–0:49] Forgiveness is how you take back what''s yours.

[0:49–0:56] If this resonated — there''s a full lesson on this in the app. I''ll drop the link below.',
'Format ref: @profitagnosis — 161x / 4.3M (IG) — reframe on a universally misunderstood concept',
'Camera A — Talking Head', 'App Download',
'Jan is warm throughout — this is a gift, not a confrontation. CTA end card: "Full lesson in the app →"',
'Jan Batch-01 · 7.11.2026', 9);

-- ─────────────────────────────────────────────
-- SEED: Andrew's Batch-02 scripts (15 reels)
-- Add these next. Template:
-- insert into scripts (client_slug, title, format, status, hook, full_script, reference_clip, camera, cta, editor_notes, batch, reel_number) values
-- ('andrew', '...', 'Format A', 'Needs Review', '...', '...', '...', 'Camera A', 'Comment SUITE', '...', 'Andrew Batch-02 · 7.11.2026', 1);
-- ─────────────────────────────────────────────
