# Tools and Setup

Everything you need to run the engine, in the order to set it up. Only one AI assistant is required. Everything else is optional or has a free option. Prices are from 07 Cost Breakdown (read November 16, 2026).

## Account checklist (in setup order)
| # | Tool | Required? | Free option | Paid from | What it does in the engine |
|---|---|---|---|---|---|
| 1 | One AI assistant: Claude, ChatGPT, Grok Bot, or Cursor | Yes | Free tiers with limits | Claude Pro $20, ChatGPT Plus $20 (check current price), Cursor Plus $8 | Runs the workflows, writes scripts, does the math |
| 2 | Google account (Sheets, Calendar, Drive) | Yes, or Notion or Airtable | Free | None needed | Content Hub, calendar blocks, file storage |
| 3 | Instagram account | Yes | Free | None | Finding creators and checking reels |
| 4 | Apify | Optional | $5 usage each month | Starter $19 | Instagram Reel Scraper for outlier research |
| 5 | Bright Data | Optional (Apify alternative) | 5,000 records a month | $1.50 per 1,000 after that | Instagram Reels scraper |
| 6 | Sandcastles | Optional | None listed | Pro $49 | Outlier database, channel recaps, transcripts |
| 7 | Meta Muse | Optional | Free with a weekly limit | Power $20 | Phone-side idea capture and quick research (02) |
| 8 | Python 3 | Optional | Free | None | Runs outliers.py |
| 9 | Whisper | Optional | Free | None | Local transcription of your voice memos |
| 10 | yt-dlp and ffmpeg | Optional | Free | None | Download a reel you are studying and grab frames of its opening text |

## Setup order
1. **AI assistant** (04 Train Your AI). Load the instruction block and your files.
2. **Content Hub.** Import content-hub-tracker.csv from Full Kit Files/05_TEMPLATES into Google Sheets.
3. **Calendar.** Import 06/Content_Engine_Weekly.ics.
4. **Research method.** Choose Apify, Bright Data, or the manual log (08).
5. **Python and outliers.py** if you scrape (below).
6. **Teleprompter.** Open teleprompter.html in your browser and bookmark it.

## The outlier-ranking script (outliers.py)
Ranks every scraped reel against its own creator's median and flags 3x+ outliers.
1. Install Python 3 from python.org (tick "Add to PATH" on Windows).
2. Save your scraper exports (JSON or CSV) in one folder, for example data/.
3. Open a terminal in the folder with outliers.py and run:
```
python3 outliers.py data/*.json --out results --multiple 3
```
4. Open the results file it creates. Sort by multiple. Keep 3x+.
5. No Python? Paste your CSV into your AI with Prompt 02 from the main kit and ask it to do the same math.
See tools/README.md in Full Kit Files for every option.

## The teleprompter (teleprompter.html)
1. Double-click teleprompter.html. It opens in your browser and works offline.
2. Paste your approved script.
3. Set the speed and text size, mirror it if you use a teleprompter glass, and press start.
4. Put your phone or laptop right under your camera lens so your eyes stay close to the lens.

## Full Kit Files
The Full Kit Files folder holds everything from the main kit zip: setup guides, the 8 workflows, 10 prompts, 8 skill files, templates, outliers.py, and the teleprompter.
