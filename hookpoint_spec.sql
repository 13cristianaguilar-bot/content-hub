-- hookpoint_spec.sql
-- Appends Hookpoint 3-channel filming spec to Andrew's editor_notes
-- Run in: Supabase → SQL Editor → New query → Run
-- Safe to run: only appends, never overwrites

-- ─── FORMAT C (Reels 1, 4, 7, 10, 13) ──────────────────────────────────────
-- Short reframe. "I saw X. [counter]. Sit on that one." Max 14-16s.

UPDATE scripts
SET editor_notes = editor_notes || E'\n\n─── HOOKPOINT SPEC ───\nVERBAL: Read the quote completely flat — no emotion, no performance. The absurdity does the work. Pause 1 full second before the counter statement. "Sit on that one" lands quieter, not louder. If you feel like you\'re being boring, you\'re doing it right.\nVISUAL: Chest-up tight frame. Direct eye contact at camera the entire time. No hand gestures, no movement. Neutral background — nothing competing with your face. If the take runs over 16s, cut during the pause.\nTEXT OVERLAY: The quote appears at 0:00 as you read it — bold white centered. It fades or cuts at the counter statement. No lower thirds. No CTA card.\nENERGY: 2/10 — deliberately understated. The quieter the delivery, the harder the reframe lands. This is not a hype video. Calm confidence only.'
WHERE client_slug = 'andrew' AND format = 'Format C';

-- ─── FORMAT A (Reels 2, 5, 8, 11, 14) ──────────────────────────────────────
-- "How many... Almost none. So what's different?" + screen recording proof.

UPDATE scripts
SET editor_notes = editor_notes || E'\n\n─── HOOKPOINT SPEC ───\nVERBAL: Open the question like you\'re genuinely asking — slight curiosity, not rhetorical. "Almost none" lands with a small pause. Narrate smoothly over the screen recording without slowing down — keep momentum. Close with confidence, not salesmanship. Expert-friend tone throughout.\nVISUAL: Tight frame Camera A → screen recording at the timestamp listed → return to tight frame. The switch IS the pattern interrupt — make the cut fast and clean. Screen recording should be prepped and ready; nothing loading or lagging on screen.\nTEXT OVERLAY: Hook stat or question visible at 0:00 sound-off readable. Screen recording is the proof layer — no extra text needed there. Lower third CTA at the close.\nENERGY: 5/10 rising — curious open, analytical middle, confident close. Conversational all the way through. Never salesy.'
WHERE client_slug = 'andrew' AND format = 'Format A';

-- ─── LIST DROP (Reels 3, 6, 9, 12, 15) ──────────────────────────────────────
-- Numbered list, brisk delivery. "Save this one."

UPDATE scripts
SET editor_notes = editor_notes || E'\n\n─── HOOKPOINT SPEC ───\nVERBAL: "Save this one" is a direct command to the viewer — slight pause after it so it registers. Each numbered point delivered clean with zero filler between. Keep pace brisk — slow lists bleed retention. The last item should feel like the payoff, slightly warmer delivery.\nVISUAL: Minimal movement from you — the numbers flashing on screen carry the visual momentum. You don\'t need to add physical energy on top. Tight frame, consistent throughout.\nTEXT OVERLAY: Number + condensed point text hits exactly as you say it — not before, not after. Hook statement visible at 0:00. CTA lower third at close.\nENERGY: 6/10 consistent — warm, generous, expert. Not urgent. You\'re giving something away freely. Think: a mentor sharing what took them years to learn.'
WHERE client_slug = 'andrew' AND format = 'List Drop';

-- Verify
SELECT reel_number, format, length(editor_notes) as spec_length
FROM scripts
WHERE client_slug = 'andrew'
ORDER BY reel_number;
