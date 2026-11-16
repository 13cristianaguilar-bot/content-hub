# Walk Through the Creators in Your Niche

This is the research half of the engine: find the right creators, pull their reels, keep only the outliers, and lift the proven on-screen hooks. Worksheets for every step are in this folder.

## Step 1: Build your keyword list (15 minutes)
Write keywords in four groups (Keyword_List_Worksheet.csv):
| Group | What to write | Example for a business coach (illustrative) |
|---|---|---|
| Core | What you do, in plain words | business coach, sales coaching, small business tips |
| Problems | What your audience is struggling with | no leads, low prices, burnout, slow sales |
| Outcomes | What they want | more clients, raise prices, consistent income |
| Audience | Who they are | coaches, consultants, service business owners |
Add the hashtags creators in your space actually use. Write 20 to 40 keywords total.

## Step 2: Find 10 to 30 creators (30 minutes)
Search method:
1. Search each keyword in Instagram search (top results, accounts, and reels).
2. Open the Reels tab of each creator that shows up. Look for a few reels that clearly beat the rest.
3. Check "Suggested for you" on good creators' profiles. It surfaces similar accounts.
4. Optional: use a research app's search (for example Sandcastles) or your scraper's keyword search to speed this up.

Pick a mix (Creator_List_Worksheet.csv):
| Type | How many | Why |
|---|---|---|
| Same niche | 5 to 15 | Formats your audience already responds to |
| Adjacent niche | 3 to 10 | Fresh formats your competitors are not using yet |
| Outside your niche | 2 to 5 | Strong formats you can shift into your world |
| Your own account | 1 | Your median is your benchmark |

Good signs: posts reels often, has some reels far above their usual views, similar format to what you can film.

## Step 3: Pull their reels
Pick one method. The cost of each is in 07.
| Method | How | Good for |
|---|---|---|
| Apify Instagram Reel Scraper | Paste handles, set about 50 reels each, export JSON or CSV | Fastest, about $2.30 to $2.60 per 1,000 reels |
| Bright Data Instagram scraper | Same idea, 5,000 free records a month | Low volume for free |
| Manual log | Open each Reels tab, write views for the last 30 to 50 reels into Outlier_Worksheet.csv | $0, about 2 minutes per creator |

## Step 4: The 3x outlier rule
An outlier is a reel with **at least 3x that creator's own median views**, measured on roughly their last 50 reels.
- Use the **median**, not the average. One giant video skews the average.
- Compare each reel to **its own creator**, not to other creators. A 50K reel from someone whose median is 10K is an outlier. A 200K reel from someone whose median is 150K is not.
- Flag reels under about 3 days old as too new to judge.
- Run tools/outliers.py on scraped files (09), or use Prompt 02 in the main kit on your manual log.

### Worked example (illustrative numbers)
| Reel | Views | Creator median | Multiple | Outlier? |
|---|---|---|---|---|
| A | 21,000 | 20,000 | 1.05x | No |
| B | 64,000 | 20,000 | 3.2x | Yes |
| C | 130,000 | 20,000 | 6.5x | Yes, and eligible as a hook source |

## Step 5: Proven text hooks (100K+ and 3x)
To reuse an on-screen text hook, the reel must clear both bars: **100K+ views and at least 3x the creator's median.**
1. Check the reel itself: confirm the right creator, and that the like count looks believable for the views. Index data can be wrong.
2. Watch the first 0 to 3 seconds. Copy the **exact on-screen text**. Not the caption, not the spoken subtitles.
3. Name the formula. Example skeletons: "How [X] affects [Y]," "Never [common action] immediately," "Types of [thing]: label / label / label."
4. Keep the skeleton and the emotion (curiosity gap, "that's me," or rule-break). Swap only the nouns.
5. Your video must pay off the new words in the first few seconds. If it does not, pick another hook.
6. Save it to your hook bank (Hook_Bank_Worksheet.csv) with the source URL, views, median, and multiple.
7. Test two hooks per video when you can.

## Step 6: Hand off to Format DNA
Take your top 10 to 20 outliers into 01 Format DNA and fill one worksheet per reel. Formats a creator reused after a hit are the strongest candidates.

## Keep it honest
- Never cite a view count you did not check.
- A proven format raises your odds. It does not guarantee views or leads.
- Do not copy anyone's script. Copy the structure, then make it yours.
