#!/usr/bin/env python3
"""Content Engine Kit: outlier ranking.
Usage: python3 outliers.py data/*.json --out out/batch-01 [--multiple 3] [--baseline-window 0]
Input: JSON arrays of reels. Works with Apify instagram-reel-scraper exports as is
(fields: shortCode, ownerUsername, videoPlayCount or videoViewCount, timestamp).
For other sources, map your columns to those names first (or use Prompt 02 on a CSV).
Logic: baseline = median views of the creator's OTHER reels. outlier_score = views / baseline.
is_outlier = score >= --multiple (default 3). Tiers 100K / 1M / 10M. Reels under --min-age-days are flagged too_new.
Method credit: the 3x-median outlier rule popularized by Artem Novitckii's open-source Creator Lab (MIT)."""
import json, sys, csv, argparse, statistics, html, datetime as dt, pathlib
ap=argparse.ArgumentParser(); ap.add_argument('files',nargs='+'); ap.add_argument('--out',default='out')
ap.add_argument('--multiple',type=float,default=3.0); ap.add_argument('--baseline-window',type=int,default=0)
ap.add_argument('--min-age-days',type=float,default=3); ap.add_argument('--min-reels',type=int,default=5)
a=ap.parse_args(); now=dt.datetime.now(dt.timezone.utc)
rows={}
for f in a.files:
    for r in json.load(open(f)):
        if r.get('error') or not r.get('shortCode'): continue
        rows[r['shortCode']]=r  # dedupe across repeated runs
def views(r):
    for k in ('videoPlayCount','videoViewCount'):
        v=r.get(k)
        if isinstance(v,(int,float)) and v>0: return int(v),k
    return None,None
by={}
for r in rows.values():
    v,src=views(r)
    if v is None: continue
    ts=dt.datetime.fromisoformat(r['timestamp'].replace('Z','+00:00')) if r.get('timestamp') else None
    by.setdefault(r.get('ownerUsername','unknown'),[]).append(dict(r=r,views=v,src=src,ts=ts))
out=[]
for h,items in by.items():
    items.sort(key=lambda x:x['ts'] or now)
    if len(items)<a.min_reels: print(f'skip {h}: only {len(items)} reels',file=sys.stderr); continue
    for i,it in enumerate(items):
        others=items[:i]+items[i+1:]
        if a.baseline_window: others=sorted(others,key=lambda x:abs(((x['ts'] or now)-(it['ts'] or now)).total_seconds()))[:a.baseline_window]
        base=statistics.median(o['views'] for o in others)
        r=it['r']; v=it['views']; age=((now-it['ts']).total_seconds()/86400) if it['ts'] else None
        tier='10M+' if v>=1e7 else '1M+' if v>=1e6 else '100K+' if v>=1e5 else '<100K'
        likes=r.get('likesCount'); likes=likes if isinstance(likes,int) and likes>=0 else ''
        out.append(dict(creator=h,shortcode=r['shortCode'],url=f"https://www.instagram.com/reel/{r['shortCode']}/",
            posted=r.get('timestamp',''),age_days=round(age,1) if age is not None else '',views=v,views_field=it['src'],
            creator_median=int(base),outlier_score=round(v/base,2) if base else '',is_outlier=bool(base and v/base>=a.multiple),
            too_new=bool(age is not None and age<a.min_age_days),view_tier=tier,likes=likes,comments=r.get('commentsCount',''),
            duration_s=round(r.get('videoDuration') or 0,1),caption=(r.get('caption') or '').replace('\n',' ')[:500],
            thumbnail=r.get('displayUrl',''),transcript=(r.get('transcript') or ''),
            # 7-part breakdown slots, filled downstream (Jev tags / LLM pass)
            hook='',format='',idea='',reward='',cta='',angle='',messaging=''))
out.sort(key=lambda x:(x['outlier_score'] or 0),reverse=True)
p=pathlib.Path(a.out); p.mkdir(parents=True,exist_ok=True)
with open(p/'outliers_ranked.csv','w',newline='') as fh:
    w=csv.DictWriter(fh,fieldnames=list(out[0].keys())); w.writeheader(); w.writerows(out)
json.dump(out,open(p/'outliers_ranked.json','w'),indent=1)
cards=[]
for x in out:
    badge='OUTLIER' if x['is_outlier'] else ''
    cards.append(f"""<a class="c {'o' if x['is_outlier'] else ''}" href="{html.escape(x['url'])}" target="_blank">
<img loading="lazy" referrerpolicy="no-referrer" src="{html.escape(x['thumbnail'])}" onerror="this.style.display='none'">
<div class="m"><b>{x['outlier_score']}×</b> {badge} · {x['view_tier']}<br>@{html.escape(x['creator'])} · {x['views']:,} views (median {x['creator_median']:,})<br>
<span>{html.escape(x['posted'][:10])}{' · too new' if x['too_new'] else ''}</span><p>{html.escape(x['caption'][:140])}</p></div></a>""")
(p/'wall.html').write_text(f"""<!doctype html><meta charset=utf-8><title>Outlier wall</title><style>
body{{font:13px system-ui;background:#080808;color:#fff;margin:16px}}.g{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}}
.c{{background:#141414;border-radius:8px;overflow:hidden;color:#eee;text-decoration:none;border:2px solid transparent}}.c.o{{border-color:#e6313a}}
.c img{{width:100%;aspect-ratio:9/16;object-fit:cover;background:#333}}.m{{padding:8px}}.m b{{color:#e6313a;font-size:16px}}span{{color:#999}}p{{color:#bbb;margin:4px 0 0}}</style>
<h2>Outlier wall - {len(out)} reels, {sum(x['is_outlier'] for x in out)} ≥{a.multiple}× median</h2>
<p style="color:#999">Thumbnails are Instagram CDN links and expire after a few days; re-scrape to refresh.</p><div class=g>{''.join(cards)}</div>""")
print(f"{len(out)} reels, {sum(x['is_outlier'] for x in out)} outliers -> {p}/outliers_ranked.csv, wall.html")
