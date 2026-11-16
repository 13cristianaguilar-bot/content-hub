# Cost Breakdown: Every Account, Every Credit

Prices below were read on each vendor's public pricing page on **November 16, 2026** (US prices, before tax). Prices change. Check the vendor page before you buy. Anything marked **check current price** could not be confirmed on the vendor's own page.

## Accounts you need
| Account | Required? | Free option | Paid plans (per month) | What you use it for |
|---|---|---|---|---|
| Claude (Anthropic) | One AI assistant is required | Free: $0, limited usage, up to 5 Projects | Pro $20 monthly ($17/mo billed annually, $200 up front). Max $100. Ultra $200 | Projects, skills, Claude Code, writing and QA |
| ChatGPT (OpenAI) | Alternative to Claude | Free: $0, limited | Go $8. Plus $20. Pro $100, $200, or $500. See note 1 | Custom GPTs, Projects, Code Interpreter for the math |
| Cursor | Optional, for running the kit as a coding project | Free: $0, limited agent requests | Plus $8 (Grok models only). Premium $30. Super $100. Ultra $200. Third-party models billed by usage | Running skills, scripts, and connectors in a folder |
| Apify | Optional (or use Bright Data or manual) | Free: $0 with $5 of usage each month | Starter $19 ($17 annual) incl. $19 usage. Scale $199. Business $999 | Instagram Reel Scraper for outlier research |
| Bright Data | Optional (alternative to Apify) | 5,000 free records per month, no card | Pay as you go $1.50 per 1,000 records. Scale $499 with 384,000 records, then $1.30 per 1,000 | Instagram Reels scraper |
| Sandcastles | Optional | No free plan listed on the pricing page | Pro $49 ($39 annual), 100 credits. Visionary $99 ($79 annual), 250 credits. Titan $499 ($399 annual), 1,500 credits | Outlier database, channel recaps, transcripts, MCP connector |
| Muse (Meta) | Optional, phone research assistant | Free with a weekly usage limit | Power $20 (500M Muse tokens per week). Maximum $100 (3B per week). US and Canada, limited testing | Quick creator and format research on the go |
| Content Hub | Required (any one) | Google Sheets: free with a Google account | Notion or Airtable paid tiers: check current price | Script tracker and filming list |
| Supabase | Only if you build your own Hub app | Free: $0, 500 MB database, 2 active projects | Pro from $25 | Custom Hub database |
| yt-dlp, ffmpeg, Whisper, Python | Optional, free | Free and open source | None | Downloading a reel you study, frames, local transcription, outlier math |

**Note 1:** chatgpt.com/pricing loads its prices in the browser, and our fetch could not read the dollar amounts directly. The figures above match OpenAI's US prices as reported on November 10 and 16, 2026 by trackers citing OpenAI's pricing and help pages. Treat them as **check current price** until you see them at checkout.

## Price per credit or per unit
| Tool | Unit | Price |
|---|---|---|
| Apify Instagram Reel Scraper | 1,000 reel results | $2.60 on Free, $2.30 on Starter, from $1.00 at the highest Store discount tier |
| Apify Free plan | Monthly usage credit | $5, which covers nearly 2,000 reel results at $2.60 per 1,000 |
| Apify Starter | Monthly usage included | $19, which covers about 8,200 reel results at $2.30 per 1,000 |
| Bright Data Instagram scraper | 1,000 records | Free for the first 5,000 each month, then $1.50 (pay as you go) or $1.30 above Scale's included 384,000 |
| Sandcastles | 1 credit | About $0.49 on Pro, $0.40 on Visionary, $0.33 on Titan (monthly billing). Credits go to analyzing videos, writing scripts, and running reports. Credits per action are not listed on the pricing page: **check current price** in the app before a big run |
| Claude, ChatGPT, Cursor, Muse | Usage limits | Not sold per credit on consumer plans. You get a usage allowance that resets (every 5 hours and weekly on Claude, weekly on Muse) |

## Typical usage per run
| Run | Typical volume | Apify cost | Bright Data cost |
|---|---|---|---|
| Full outlier research (20 creators x 50 reels) | 1,000 results | About $2.60 on Free, $2.30 on Starter | $0 inside the 5,000 free records |
| Weekly refresh (you + 10 competitors x 30 reels) | 330 results | About $0.86 on Free, $0.76 on Starter | $0 inside the free records |
| Hook search for one clip | 0 to 100 results, or manual | $0 to $0.26 | $0 |
| Format DNA script, voice check, QA | AI only | $0 extra | $0 extra |

## Estimated monthly cost
| Level | Who it fits | Stack | Monthly |
|---|---|---|---|
| **Light** | 1 brand, 3 scripts a week | Claude Pro or ChatGPT Plus ($20), Apify Free or Bright Data free tier ($0, about 1,300 results a month fits the free allowance), Google Sheets Hub ($0), free local tools | **About $20** (or $0 if you stay inside free AI limits and log views by hand) |
| **Medium** | 1 to 3 brands, 5 to 7 scripts a week | Claude Pro or ChatGPT Plus ($20), Apify Starter ($19), Sandcastles Pro ($49) | **About $88** (about $73 with annual billing where offered) |
| **Heavy** | Agency, 5+ brands, 7 to 10 scripts a week each | Claude Max or ChatGPT Pro ($100), Apify Starter plus overage at about 15,000 results ($34.50 total), Sandcastles Visionary ($99), Muse Power ($20) | **About $254** (about $279 if you add Supabase Pro for a custom Hub) |

## Free alternatives for every paid piece
| Paid piece | Free alternative | Trade-off |
|---|---|---|
| Claude Pro / ChatGPT Plus | Claude Free or ChatGPT Free | Tighter usage limits; fewer projects |
| Apify / Bright Data | Manual outlier log (05_TEMPLATES/outlier-log.csv) + Prompt 02 | About 2 minutes per creator by hand |
| Sandcastles | Instagram search + manual log + yt-dlp | Slower discovery, no outlier database |
| Paid transcription | Whisper (open source) on your computer | Needs a one-time install |
| Hub app | Google Sheets template | No custom app, but it works |
| Teleprompter app | tools/teleprompter.html | Basic, but free and offline |

## Sources (read November 16, 2026)
- Claude: https://claude.com/pricing
- ChatGPT: https://chatgpt.com/pricing (see note 1)
- Cursor: https://cursor.com/pricing
- Apify plans: https://apify.com/pricing
- Apify Instagram Reel Scraper: https://apify.com/apify/instagram-reel-scraper
- Bright Data Instagram Scraper API: https://brightdata.com/products/web-scraper/instagram
- Sandcastles: https://sandcastles.ai (pricing section)
- Muse: https://www.meta.com/help/subscriptions/1021145227643680/
- Supabase: https://supabase.com/pricing

## Per-credit math: work out your own month
Use Cost_Math_Worksheet.csv in this folder, or do it by hand:
1. **Reels per research run** = creators x reels per creator. Example: 20 creators x 50 reels = 1,000 reels.
2. **Runs per month** = full runs + weekly refreshes. Example: 1 full run (1,000) + 4 refreshes of 330 = 2,320 reels a month.
3. **Scraper cost** = reels per month divided by 1,000, times the price per 1,000.
   - Apify Free: 2,320 / 1,000 x $2.60 = about $6.03, so it goes past the $5 monthly credit by about $1.03.
   - Apify Starter: 2,320 / 1,000 x $2.30 = about $5.34, covered by the $19 of included usage.
   - Bright Data: 2,320 is under the 5,000 free records, so $0.
4. **Research app cost** (optional) = plan price. Sandcastles credits: plan price divided by credits. Pro $49 / 100 = $0.49 a credit. Credits per action are not listed publicly, so check in the app before a big run.
5. **Monthly total** = AI plan + scraper overage or plan + optional apps.

The worked numbers above are arithmetic on the listed prices, not a quote. Prices change: check each vendor page before you buy.
