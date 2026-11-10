# Client-renderer capture

This takes an owner-authorized script export and screenshots it through the same `index.html` that GitHub Pages is serving. The page is opened on localhost only. The existing localhost preview hook passes the rows into the app, and the app’s own client list and script functions draw the screen.

This is a real-data client-renderer preview. It is not an authenticated client session. It does not sign anyone in, mint a token, or open the public site in a browser.

## What stays out of git

Do not commit the export, the manifest, the seven-row file, or the screenshots. The command refuses an output directory inside this repository.

## Command

```bash
node tools/client-capture/capture.mjs \
  --export /absolute/path/export.json \
  --manifest /absolute/path/manifest.json \
  --seven /absolute/path/seven.json \
  --out /absolute/path/outside-the-repo
```

The manifest must carry the export’s SHA-256, the row count, and the current-row id, reel, status, and `full_script` length. The seven-file is a crosscheck of those rows. The command downloads the live Pages `index.html`, hashes it, and continues only when those bytes match the local renderer and the app version matches.

Optional flags:

- `--renderer path` — renderer file. Default is this repo’s `index.html`.
- `--live-url URL` — deployed page to hash. Default is the public Content Hub `index.html`.
- `--expected-version version` — default `2026.11.06.1`.
- `--chrome path` — Chrome binary. Or set `CHROME_PATH`.
- `--puppeteer path` — puppeteer-core entry module. Or set `PUPPETEER_MODULE`.

Chrome and puppeteer-core are local tools. They are not app dependencies.

## Checks

Before any screenshot, the harness checks the export hash, the seven-file body text against the full export, and renderer/live byte parity. After the app draws, it reads the cards and the script sheet from the page and checks that each current row’s `full_script` paragraphs, hook, CTA, visual hook, and text hook are present. A held row that is not in the manifest’s current list must not appear on the current list.

## Output

The output directory gets `provenance.json` (hashes, ids, and pass/fail counts, not a copy of the scripts), unlabeled originals, labeled copies, and contact sheets. The label says the image is a source-snapshot reconstruction, not a login.

```bash
node tools/client-capture/validate.test.mjs
```
