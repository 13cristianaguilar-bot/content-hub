import assert from "node:assert/strict";
import test from "node:test";
import { DECK } from "./deck.js";
import {
  formatLine,
  normalizeLog,
  parseStored,
  picksText,
  popVote,
  position,
  pushVote,
  remaining,
  serialize,
  thumbUrls,
} from "./logic.js";

test("deck is the 143-row outlier sheet", () => {
  assert.equal(DECK.length, 143);
  assert.deepEqual(DECK.map((video) => video.rank), Array.from({ length: 143 }, (_, i) => i + 1));
  const ids = new Set();
  for (const video of DECK) {
    assert.equal(video.id.length, 11);
    assert.equal(ids.has(video.id), false);
    ids.add(video.id);
    assert.equal(video.url, `https://www.youtube.com/watch?v=${video.id}`);
    assert.equal(typeof video.views, "number");
    assert.ok(video.views > 0);
    assert.equal(typeof video.multiplier, "number");
    assert.ok(video.channel);
    assert.ok(video.title);
    assert.ok(video.style);
  }
  assert.equal(DECK[0].id, "_ytyOMSjnTk");
  assert.equal(DECK[0].channel, "Habits & Hustle w/ Jennifer Cohen");
  assert.equal(DECK[0].views, 67659);
  assert.equal(DECK[3].id, "JOh-9iaPcGU");
  assert.equal(DECK[3].multiplier, 33.8);
  assert.equal(DECK.at(-1).id, "Lohfmq7IaYI");
  assert.equal(DECK.at(-1).rank, 143);
});

test("thumbnail urls are the real YouTube files", () => {
  assert.deepEqual(thumbUrls("_ytyOMSjnTk"), {
    max: "https://i.ytimg.com/vi/_ytyOMSjnTk/maxresdefault.jpg",
    hq: "https://i.ytimg.com/vi/_ytyOMSjnTk/hqdefault.jpg",
  });
  assert.deepEqual(thumbUrls("-ulnlWH7JqQ"), {
    max: "https://i.ytimg.com/vi/-ulnlWH7JqQ/maxresdefault.jpg",
    hq: "https://i.ytimg.com/vi/-ulnlWH7JqQ/hqdefault.jpg",
  });
});

test("copy line uses the real title, channel, multiplier, and url", () => {
  const video = DECK[3];
  assert.equal(
    formatLine(video, "super"),
    "SUPER: #4 The Knowledge Project Podcast — No.1 Performance Psychologist: The Simple Daily Habits That Build Excellence (33.8x) https://www.youtube.com/watch?v=JOh-9iaPcGU",
  );
  assert.equal(
    formatLine(DECK[0], "like"),
    "LIKE: #1 Habits & Hustle w/ Jennifer Cohen — Dr. David Perlmutter: Brain Health Expert: The Daily Habits That Protect Your Brain as You Age (52.0x) https://www.youtube.com/watch?v=_ytyOMSjnTk",
  );
});

test("voting, undo, resume, and copy stay in deck order", () => {
  let log = [];
  assert.equal(remaining(DECK, log)[0].rank, 1);
  log = pushVote(log, DECK[0].id, "like", 10);
  log = pushVote(log, DECK[1].id, "super", 11);
  log = pushVote(log, DECK[2].id, "skip", 12);
  assert.equal(remaining(DECK, log)[0].rank, 4);
  assert.deepEqual(position(DECK, log), { seen: 3, total: 143, current: 4, done: false });

  const undone = popVote(log);
  log = undone.log;
  assert.equal(undone.removed.id, DECK[2].id);
  assert.equal(remaining(DECK, log)[0].rank, 3);

  const restored = parseStored(DECK, serialize(log));
  assert.deepEqual(restored, log);
  assert.equal(remaining(DECK, restored)[0].id, DECK[2].id);

  log = pushVote(log, DECK[2].id, "like", 13);
  const text = picksText(DECK, log);
  const lines = text.split("\n");
  assert.equal(lines.length, 3);
  assert.ok(lines[0].startsWith("SUPER: #2 "));
  assert.ok(lines[1].startsWith("LIKE: #1 "));
  assert.ok(lines[2].startsWith("LIKE: #3 "));
  assert.equal(text.includes("skip") || text.includes("SKIP"), false);
});

test("stored junk and unknown ids are dropped", () => {
  const raw = JSON.stringify({
    v: 1,
    history: [
      { id: DECK[0].id, vote: "like", at: 1 },
      { id: "not-a-real-id", vote: "super", at: 2 },
      { id: DECK[0].id, vote: "super", at: 3 },
      { id: DECK[1].id, vote: "nope", at: 4 },
      { vote: "like" },
    ],
  });
  const log = parseStored(DECK, raw);
  assert.deepEqual(log, [{ id: DECK[0].id, vote: "like", at: 1 }]);
  assert.deepEqual(parseStored(DECK, "{"), []);
  assert.deepEqual(normalizeLog(DECK, null), []);
});
