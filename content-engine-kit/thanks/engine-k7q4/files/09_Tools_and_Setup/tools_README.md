# Tools

## outliers.py
Ranks reels by how far they beat their creator's median.
- Needs Python 3 (no extra packages).
- Input: JSON exports from the Apify Instagram Reel Scraper (or any JSON with shortCode, ownerUsername, videoPlayCount or videoViewCount, timestamp).
- Run: `python3 outliers.py data/*.json --out out/batch-01`
- Output: `outliers_ranked.csv`, `outliers_ranked.json`, and `wall.html` (a thumbnail wall; Instagram thumbnails expire after a few days).
- For hooks, keep rows where `is_outlier` is True AND `views` is 100,000 or more.
- The empty columns hook, format, idea, reward, cta, angle, messaging are for your 7-part breakdown (Prompt 03).

## teleprompter.html
Open it in any browser. Paste the Script column from your Hub, press Start, and film. It saves your last script on that device only. Nothing is uploaded.
