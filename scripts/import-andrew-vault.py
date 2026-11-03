#!/usr/bin/env python3
"""File Andrew's confirmed repeat-format reels into format-vault/catalog.json.

Reads the ranked outlier CSV. Keeps the shelf to his chosen formats and the
confirmed repeats (a format label that is not caption-inferred, from a creator
who repeats that format, or a reel already used as the format reference).
Clones stays pending. Does not download covers.
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "format-vault" / "catalog.json"

FORMATS = [
    ("tips", "Tips", "A repeated tip, said straight."),
    ("visual", "Visual", "A setting, demo, or product shown on screen."),
    ("comparison", "Comparison", "Two paths, then the one to take."),
    ("transformations", "Transformations", "A before and the change that follows."),
    ("clones", "Clones", "Pending research."),
]


def norm(label):
    text = (label or "").lower()
    if "clone" in text:
        return "clones"
    if "visual" in text:
        return "visual"
    if "comparison" in text or "before" in text:
        return "comparison"
    if "transform" in text:
        return "transformations"
    if "tip" in text:
        return "tips"
    return ""


def confirmed(row):
    label = (row.get("format") or "").lower()
    if "caption-inferred" in label or "confirm visual" in label:
        return False
    return norm(label) in ("tips", "visual", "comparison", "transformations")


def clip(text, limit=96):
    raw = " ".join((text or "").replace("\n", " ").split())
    raw = " ".join(part for part in raw.split(" ") if not part.startswith("#"))
    if "ANCIENT" in raw:
        raw = raw.split("[ANCIENT")[0].strip()
    if len(raw) <= limit:
        return raw
    cut = raw[:limit].rsplit(" ", 1)[0].strip()
    return (cut or raw[:limit]).rstrip(".,;:") + "…"


def outlier_label(score):
    try:
        return f"{float(score):.1f}x"
    except (TypeError, ValueError):
        return ""


def pick(rows, force):
    ranked = sorted(rows, key=lambda row: -float(row["outlier_score"] or 0))
    chosen = ranked[:2]
    have = {row["shortcode"] for row in chosen}
    by_code = {row["shortcode"]: row for row in ranked}
    for code in force:
        if code in by_code and code not in have:
            chosen.append(by_code[code])
            have.add(code)
    return chosen


def reel_node(row, thumb=""):
    node = {
        "shortcode": row["shortcode"],
        "reelUrl": row["url"] if row["url"].endswith("/") else row["url"] + "/",
        "views": int(float(row["views"])),
        "outlier": outlier_label(row["outlier_score"]),
        "ageDays": int(float(row["age_days"])),
    }
    if thumb:
        node["thumbnail"] = thumb
    return node


def creator_node(handle, lane, rows, label):
    primary, rest = rows[0], rows[1:]
    idea = clip(primary.get("reward") or "") or clip(primary.get("idea") or "")
    person = {
        "lane": lane,
        "handle": "@" + handle,
        "name": handle,
        "shortcode": primary["shortcode"],
        "reelUrl": primary["url"] if str(primary["url"]).endswith("/") else primary["url"] + "/",
        "views": int(float(primary["views"])),
        "outlier": outlier_label(primary["outlier_score"]),
        "ageDays": int(float(primary["age_days"])),
        "dna": {
            "hook": clip(primary.get("hook") or ""),
            "format": label,
            "idea": idea,
        },
    }
    if rest:
        person["also"] = [reel_node(row) for row in rest]
    return person


# One original, one competitor, and one other-industry repeat where the CSV
# can support that tag. Extra codes are references already used on his scripts.
SHELF = {
    "tips": [
        ("andrewpreneurship", "original", ["DYU9NJjDWqa"]),
        ("pavels_life", "competitor", ["DeMiLEKqxfN"]),
        ("fratbuddha", "other", ["DeAdWCBS2AV"]),
    ],
    "visual": [
        ("martinwang.mp4", "other", ["DdjPyXlxmk2"]),
        ("creatingwithjerry", "other", ["DYEZ3w2TTPh"]),
        ("polinabatee", "other", ["DcqSKwzMfnE"]),
    ],
    "comparison": [
        ("polinabatee", "other", ["DbTGaGLRsfz"]),
        ("thechriscordero", "other", ["DeCtrfOAivs"]),
    ],
    "transformations": [
        ("thechriscordero", "other", ["CuRltiVLl49"]),
        ("susan_ho", "other", []),
    ],
}


def build_client(csv_path):
    with open(csv_path, newline="") as handle:
        rows = list(csv.DictReader(handle))
    grouped = {}
    for row in rows:
        if not confirmed(row):
            continue
        grouped.setdefault((row["creator"], norm(row["format"])), []).append(row)
    formats = []
    filed = []
    for format_id, label, summary in FORMATS:
        people = []
        if format_id != "clones":
            for creator, lane, force in SHELF[format_id]:
                pool = grouped.get((creator, format_id), [])
                chosen = pick(pool, force)
                if not chosen:
                    continue
                people.append(creator_node(creator, lane, chosen, label))
                filed.extend(item["shortcode"] if isinstance(item, dict) else item for item in [chosen[0]] )
                for row in chosen:
                    filed.append(row["shortcode"])
        formats.append({
            "id": format_id,
            "label": label,
            "niche": "HighLevel agencies and SaaS operators",
            "summary": summary,
            "thumbnail": "",
            "creators": people,
            "reelUrl": "",
            "shortcode": "",
            "dna": {
                "hook": "",
                "components": "",
                "rehook": "",
                "cadence": "",
                "length": "",
                "idea": "",
                "reward": "",
                "emotionalNext": "",
            },
        })
    client = {
        "slug": "andrew",
        "name": "Andrew George",
        "brand": "SaaSuite",
        "niche": "HighLevel agencies and SaaS operators",
        "industry": "SaaS",
        "note": "Chosen formats: Tips, Visual, Comparison, Transformations. Clones is pending research. The shelf is the confirmed repeats, tagged original, competitor, or other industry.",
        "creators": [
            {"name": "Andrew George", "handle": "@andrewpreneurship", "note": "Original repeat creator."},
            {"name": "", "handle": "@pavels_life", "note": "Competitor. HighLevel and agency."},
            {"name": "", "handle": "@fratbuddha", "note": "Other industry. Confirmed tips repeat."},
        ],
        "formats": formats,
    }
    return client, rows, filed


def main():
    if len(sys.argv) != 2:
        raise SystemExit("usage: import-andrew-vault.py outliers.csv")
    client, rows, filed = build_client(sys.argv[1])
    catalog = json.loads(CATALOG.read_text())
    clients = [item for item in catalog["clients"] if item.get("slug") != "andrew"]
    insert_at = 1 if clients and clients[0].get("slug") == "jan" else 0
    clients.insert(insert_at, client)
    catalog["clients"] = clients
    CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n")
    unique = []
    for code in filed:
        if code not in unique:
            unique.append(code)
    print(f"csv={len(rows)} filed={len(unique)}")
    for format_id, label, _summary in FORMATS:
        found = next(item for item in client["formats"] if item["id"] == format_id)
        count = 0
        for person in found["creators"]:
            count += 1 + len(person.get("also") or [])
        lanes = ",".join(person["lane"] for person in found["creators"]) or "pending"
        print(f"{label}: {count} reels [{lanes}]")


if __name__ == "__main__":
    main()
