// makefun-dad-joke — Dad Joke Showdown (u-mfnakmal-dad-joke-showdown-1d2ce3e5)
// Entry: one dad joke, written to /output/entry.txt (gate: UTF-8, 1-200 chars).
//
// PASS 1 — candidate draft. Eight original dad jokes, each scored 1-5 against
// the judge brief, in the brief's own order:
//   1. dad-at-table — a joke a father would tell at the dinner table
//   2. pun lands — the turn is understood on first read, no explaining
//   3. fresh — not told a thousand times, still inside the dad-joke tradition
//   4. tight — every word earns its place, punchline at the end
//   5. aloud — reads naturally out loud, a rhythm a father could deliver
// Deliberately avoided: "Hi hungry, I'm dad", anti-gravity book, scarecrow
// award, skeleton guts, fish without eyes, "I'm reading a book about..." and
// every other classic in the canon — the judge rewards freshness.
//
// Candidate scores (criterion 1..5, each 1-5):
//   1. steak/medium     [5,5,4,4,5] = 23, 104 chars — steakhouse scene, dad
//      at the table; "medium" (doneness + moderate) lands on first read;
//      "medium problem" phrasing is uncommon, though medium-rare puns exist.
//   2. leftovers band   [4,5,4,5,5] = 23, 71 chars — "reheated hits" is a
//      clean, fresh pun; band framing is slightly less dinner-table, but the
//      shortest of the top scorers.
//   3. toaster          [5,4,3,5,5] = 22, 73 chars — "burnt out" is a real
//      double meaning, but toaster wordplay is well-mined; freshness costs it.
//   4. something light  [5,4,4,5,5] = 23, 78 chars — "light" (low-calorie
//      vs illumination) lands clean; dad-at-table voice is strong; the joke
//      is a dad move as much as a dad line.
//   5. vacuum           [4,5,4,4,4] = 21, 84 chars — "sucks up to me" is a
//      sharp double meaning, but "sucks up" reads a touch mean and clunky.
//   6. night light      [5,3,4,4,5] = 21, 88 chars — sweet dad answer, but
//      the "pun" is a gentle reframe, not a sharp turn; criterion 2 is weak.
//   7. plate-ful        [5,3,4,5,3] = 20, 63 chars — "plate-ful" only works
//      as a slant rhyme of "grateful"; spoken aloud it wobbles.
//   8. drain on budget  [5,4,3,4,5] = 21, 103 chars — "drain" is literal
//      and financial at once, but the idiom itself is common; freshness low.
//
// PASS 1 pick: #2, the Leftovers band — joint-highest score (23) and the
// fewest bytes of the three 23s (71 vs 78 vs 104). Provisional only: PASS 2
// re-judges everything executably and adds three challengers.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I started a band called The Leftovers. We only play reheated hits.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Runtime gate validation: re-read what we wrote and hold it to the gate.
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error(`gate failed: entry.txt is ${written.length} chars`);
}
if (written !== JOKE) {
  throw new Error("gate failed: entry.txt differs from the chosen joke");
}
console.log(`wrote ${written.length} chars: ${written}`);
