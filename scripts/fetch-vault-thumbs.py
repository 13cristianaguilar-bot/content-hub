#!/usr/bin/env python3
"""Download each Format Vault reel cover once and store it in the repo.

Uses the public Instagram cover URL only. Writes thumbs/<shortcode>.jpg and
sets that path on the reel. Never writes an expiring CDN address. Re-runs
skip covers that are already real JPEG files. Then mirrors catalog.json into
the FORMAT_VAULT object in index.html.
"""
import json
import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "format-vault" / "catalog.json"
INDEX = ROOT / "index.html"
THUMBS = ROOT / "thumbs"
COVER = "https://www.instagram.com/p/{code}/media/?size=l"
AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def shortcodes(node, found):
    if isinstance(node, dict):
        code = str(node.get("shortcode") or "").strip()
        if code:
            found.append(code)
        for value in node.values():
            shortcodes(value, found)
    elif isinstance(node, list):
        for value in node:
            shortcodes(value, found)


def is_jpeg(path):
    if not path.is_file() or path.stat().st_size < 1000:
        return False
    head = path.read_bytes()[:3]
    return head == b"\xff\xd8\xff"


def download(code, dest):
    url = COVER.format(code=code)
    request = urllib.request.Request(url, headers={"User-Agent": AGENT})
    context = ssl.create_default_context()
    with urllib.request.urlopen(request, timeout=30, context=context) as response:
        data = response.read()
        kind = response.headers.get("Content-Type", "")
    if not data.startswith(b"\xff\xd8\xff") or "image" not in kind.lower():
        raise RuntimeError(f"{code} was not a jpeg ({kind}, {len(data)} bytes)")
    dest.write_bytes(data)


def stamp(node):
    if isinstance(node, dict):
        code = str(node.get("shortcode") or "").strip()
        if code and is_jpeg(THUMBS / f"{code}.jpg"):
            node["thumbnail"] = f"thumbs/{code}.jpg"
        for value in node.values():
            stamp(value)
    elif isinstance(node, list):
        for value in node:
            stamp(value)


def sync_index(catalog):
    text = INDEX.read_text()
    start = text.find("const FORMAT_VAULT = ")
    if start < 0:
        raise SystemExit("FORMAT_VAULT missing from index.html")
    brace = text.find("{", start)
    depth = 0
    end = None
    for index in range(brace, len(text)):
        char = text[index]
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                end = index + 1
                break
    if end is None:
        raise SystemExit("FORMAT_VAULT object did not close")
    body = json.dumps(catalog, indent=2, ensure_ascii=False)
    INDEX.write_text(text[:start] + "const FORMAT_VAULT = " + body + text[end:])


def main():
    catalog = json.loads(CATALOG.read_text())
    codes = []
    shortcodes(catalog, codes)
    unique = []
    for code in codes:
        if code not in unique:
            unique.append(code)
    THUMBS.mkdir(exist_ok=True)
    failed = []
    downloaded = 0
    for code in unique:
        dest = THUMBS / f"{code}.jpg"
        if is_jpeg(dest):
            continue
        try:
            download(code, dest)
            downloaded += 1
            print(f"saved {code}")
        except Exception as error:
            failed.append(f"{code}: {error}")
            print(f"miss {code}: {error}")
    stamp(catalog)
    CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n")
    sync_index(catalog)
    print(f"reels={len(unique)} downloaded={downloaded} failed={len(failed)}")
    if failed:
        print("FAILED")
        print("\n".join(failed))


if __name__ == "__main__":
    main()
