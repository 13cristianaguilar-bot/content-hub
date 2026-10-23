# Content Hub UI research

Research for a phone-first script view. The people using this are Cristian Aguilar and clients (Andrew, Jan, Devin, Sagun) filming short-form video on a phone, often in a hallway, a booth, or a spare room. The screen has to answer, in order: what do I say, where do I stand, what do I shoot, what goes on screen, and what do I ask them to do at the end.

Brand source: the live site [signals.marketing](https://signals.marketing/) (fetched October 22, 2026), its stylesheet, and `favicon.svg`.

## What the references actually do

### Shot lists (StudioBinder, CineLog)

[StudioBinder’s shot list](https://www.studiobinder.com/shotlist-app/) treats every shot as its own row with a short description plus the specs that change between setups: camera, lens, movement, location. The list is the page. Notes do not compete with the shot. People scan down a column of shots, not a paragraph that happens to contain the words “shot list.”

[CineLog’s phone write-up](https://cinelog.com/journal/cross-platform-polish/) is the clearest warning against shrinking a desktop app onto a phone. Their production UI on a phone uses:

- Expandable cards, so the default row is glanceable and detail is one tap away.
- Bottom sheets and thumb-reachable actions instead of menus at the top of the screen.
- One-handed shot lists. A shot you cannot check off while holding a phone is a shot you will skip.
- Persistent display choices (density, light/dark) so the set does not reset every time the screen redraws.

For this hub that means a checklist with large hit targets, not a “SHOT LIST:” sentence inside a green paragraph, and sections that stay open when a realtime update redraws the page (this app already learned that lesson with `expandedSections`).

### Teleprompters (Cuevora, classic autocue, a recorded redesign)

Teleprompter UIs converge on the same surface once you press play. [Cuevora](https://github.com/iclectic/Cuevora) is a clear current example: full-screen scroll, a focus band around the line you are reading, speed control, mirror mode for a beam-splitter rig, large type (they go 16–72px), and a dark or high-contrast theme so the screen is readable outdoors. Playback is the whole screen. Settings are a bar, not a second document.

[Gergő Bartha’s teleprompter redesign](https://gerrybartha.com/teleprompter-redesign) makes the list-side point: a grid of tiny document thumbnails fails because you cannot tell scripts apart. Each entry needs enough of the real words on the card that you recognize it before you open it. Search matters once the list is long. This hub already has search; the cards do not show enough of the script.

Classic autocue apps (the pattern in simple full-screen prompters) add mirror, a play/pause control in the thumb zone, and type size that survives a redraw. They do not ask you to copy the script into another app before you can read it at arm’s length. Copy stays useful. It is not the read mode.

### Review and status (Frame.io, short-form tools)

Frame.io and similar review tools put one asset in the frame and a status chip on it. Comments, specs, and history sit in panels that do not compete with the thing you came to look at. Status is a word you can read, not only a color.

Short-form caption and teleprompter apps (Captions and the same category) put the spoken line in large type and keep the recording surface almost empty. Setup, b-roll, and editor notes are not on that surface. The line is.

### Mobile reading

Phone reading research (Nielsen Norman Group’s mobile content guidance, and the same findings CineLog ran into) keeps showing up the same way:

- Front-load the decision. The first screen answers “what is this and what do I do.”
- Line length stays short. A 22px script across a 390px screen is about the right measure. The same 22px stretched across a 1280px window is not, so the script column needs a max width even when the page is wide.
- Body type at arm’s length wants to be closer to 20–28px than to 12–14px. Labels can be small. The words you say cannot.
- Tap targets at least 44px. A status pill that is only a color fails in sun and for colorblind users; the word has to be there.
- One accent, not six pastel boxes of equal weight. If everything is a colored card, nothing is the script.

## What that means for a script you film from

A card for this hub, top to bottom, on a phone held in one hand:

1. **Whose script and which one.** Client, title, format, the real status word.
2. **The reference,** as a thumbnail or play row, not a raw URL. Embed on tap. A link that opens Instagram or YouTube stays, because in-app embeds fail often enough that the native app is the backup.
3. **Proven hook vs. the line they will actually say.** The reference line is evidence. The adapted line is the job. The adapted line is the largest type on the card.
4. **The script or the question sheet,** big enough to read without the teleprompter, with a full-screen read mode one tap away (large type, focus line, speed, mirror, thumb controls).
5. **Setup as four facts:** location, phone or tripod, framing, mic. Prose notes stay available under the four facts. Do not make someone parse a paragraph to find the mic.
6. **Shot list as a checklist** they can tick on the phone. State stays on the device so a redraw does not clear it.
7. **On-screen text** as timed lines, pulled out of editor notes, not left inside them.
8. **The CTA** as the last thing they say, big enough to read after the script.
9. **Advanced,** collapsed: the seven sous-chef fields, 7-pass notes, proof stats, and every other stored field so nothing disappears.

Status for a filmer collapses visually to a path of Draft → Filmed → Posted, while the saved word (Needs Review, Approved, Filming, Passed, Archived) stays on the card and in the pipeline. The database status does not change meaning.

Desktop is the same card with more room: title across the top, the line and the script in a left column, reference and setup in a right column. It is not a denser table.

## Brand: signals.marketing

Pulled from the live site on October 22, 2026 (CSS variables in `/_next/static/css/index.*.css`, masthead markup, `favicon.svg`).

| Token | Value | Where it shows up |
|---|---|---|
| Paper | `#fafafa` | Page background (`--background`) |
| Ink | `#171717` | Text (`--foreground`, `--strong`) |
| Signal red | `#ce2029` | Primary, eyebrows, the waveform (`--primary`) |
| Red ring | `#e6313a` | Focus (`--ring`) |
| Blush | `#f7e5e6` | Accent wash (`--accent`) |
| Line | `#d8d8d8` | Borders (`--border`) |
| Muted text | `#575757` | Secondary (`--muted-foreground`) |
| Near black | `#080808` | Favicon tile, and the right ground for a teleprompter |
| Wave stroke | `#ef3038` | Favicon bars |

Type:

- **Geist** (variable) for everything you read. The masthead wordmark is Geist, extra-bold, tight tracking (`letter-spacing: -1.2px` at 27px).
- **Geist Mono** for eyebrows. On the site, `.eyebrow` is Geist Mono, 12px, `letter-spacing: 1px`.
- The mark is a Lucide `audio-lines` waveform in signal red, followed by `signals` in black and `.marketing` at a lighter weight. Favicon is the same five bars, red on `#080808`, squared with a small radius.

Shape: reel cards on the site are white, 1px border, **2px signal-red top rule**, almost no corner radius. Eyebrows are red or muted, not rainbow pills. One red, used rarely, is the brand. Slate-and-blue Tailwind is a different product.

## Implications for the current hub

The current list is a competent admin tool and a weak filming tool. The first screen is tabs, filters, and a search box. The first thing inside a dossier card is a reference URL and like-counts. The line you say is below that, at a size closer to a note than a script. Setup, the shot list, on-screen type, and the CTA are trapped in paragraphs. There is no full-screen read mode. The visual system (slate, blue focus, rounded pills, six pastel boxes) does not match signals.marketing.

The rebuild keeps every behavior that is not visual: Supabase auth, `app_metadata` roles, RLS, realtime, status transitions, takes, calendar, pipeline, search, and the default All filter.
