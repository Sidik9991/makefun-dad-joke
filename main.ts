// makefun-dad-joke — Dad Joke Showdown (u-mfnakmal-dad-joke-showdown-1d2ce3e5)
// Entry: one dad joke, written to /output/entry.txt (gate: UTF-8, 1-200 chars).
//
// PASS 2 — executable judgement. Every candidate is data with a per-criterion
// numeric score (1-5) against the judge brief, in the brief's own order:
//   1. dad-at-table — a joke a father would tell at the dinner table
//   2. pun lands — the turn is understood on first read, no explaining
//   3. fresh — not told a thousand times, still inside the dad-joke tradition
//   4. tight — every word earns its place, punchline at the end
//   5. aloud — reads naturally out loud, a rhythm a father could deliver
// The winner is picked at runtime: gate first (1-200 chars, non-blank), then
// highest total score, then fewest bytes as tie-break. Three challengers were
// added in this pass and re-judged against the same eight from pass 1.
//
// Deliberately avoided: "Hi hungry, I'm dad", anti-gravity book, scarecrow
// award, skeleton guts, fish without eyes, "I'm reading a book about..." and
// every other classic in the canon — the judge rewards freshness.
//
// How the scores were decided (the reasoning the numbers stand for):
//   steak/medium (23): steakhouse scene, dad at the table; "medium"
//     (doneness + moderate) lands on first read; "medium problem" phrasing
//     is uncommon, though medium-rare puns exist.
//   leftovers band (23): "reheated hits" is a clean, fresh pun and the
//     tightest of the top scorers; band framing is slightly less
//     dinner-table than a food joke.
//   toaster (22): "burnt out" is a real double meaning, but toaster
//     wordplay is well-mined; freshness costs it.
//   something light (23): "light" (low-calorie vs illumination) lands
//     clean; dad-at-table voice is strong; the joke is a dad move as much
//     as a dad line.
//   vacuum (21): "sucks up to me" is a sharp double meaning, but it reads
//     a touch mean and clunky aloud.
//   night light (21): sweet dad answer, but the "pun" is a gentle reframe,
//     not a sharp turn; criterion 2 is weak.
//   plate-ful (20): "plate-ful" only works as a slant rhyme of "grateful";
//     spoken aloud it wobbles.
//   drain on budget (21): "drain" is literal and financial at once, but
//     the idiom itself is common; freshness low.
//   control issues (25) — NEW challenger: dad delivers the punchline
//     himself; "control issues" (remote control + relationship control
//     issues) lands instantly, is genuinely uncommon wordplay, every word
//     earns its place, and it reads like a line said across a couch, not
//     a stage. Highest on every axis that matters.
//   fridge chills (21) — NEW challenger: "chills" (relaxes + cold) is a
//     mild turn, not a sharp one; criterion 2 caps it.
//   grounded plants (23) — NEW challenger: "grounded" (in the ground +
//     punished) is clean and fresh, but the punchline belongs to the son,
//     dad only retells it, so criterion 1 is a 4, not a 5.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = [number, number, number, number, number]; // criteria 1..5
type Candidate = { text: string; scores: Scores; note: string };

const CANDIDATES: Candidate[] = [
  {
    text: "I sent my steak back for being too rare. The waiter said, 'Relax — it's only a medium problem.'",
    scores: [5, 5, 4, 4, 5],
    note: "steak/medium",
  },
  {
    text: "I started a band called The Leftovers. We only play reheated hits.",
    scores: [4, 5, 4, 5, 5],
    note: "leftovers band",
  },
  {
    text: "Our toaster quit this morning — said it was feeling a bit burnt out.",
    scores: [5, 4, 3, 5, 5],
    note: "toaster burnt out",
  },
  {
    text: "My wife asked for something light for dinner, so I turned off the lights.",
    scores: [5, 4, 4, 5, 5],
    note: "something light",
  },
  {
    text: "Our vacuum is the most honest appliance in the house — it really sucks up to me.",
    scores: [4, 5, 4, 4, 4],
    note: "vacuum sucks up",
  },
  {
    text: "My daughter asked why the moon follows us home. I said, 'Because it's our night light.'",
    scores: [5, 3, 4, 4, 5],
    note: "night light",
  },
  {
    text: "The dishes are piling up, but don't worry — I'm very plate-ful.",
    scores: [5, 3, 4, 5, 3],
    note: "plate-ful",
  },
  {
    text: "The plumber said fixing the leak would cost fifty bucks. I said, 'Well, that's a drain on the budget.'",
    scores: [5, 4, 3, 4, 5],
    note: "drain on budget",
  },
  {
    text: "My wife hid the remote in the couch. I told her, 'That's where our control issues started.'",
    scores: [5, 5, 5, 5, 5],
    note: "control issues (challenger, pass 2)",
  },
  {
    text: "Our fridge is a great listener. It never judges — it just chills.",
    scores: [4, 3, 4, 5, 5],
    note: "fridge chills (challenger, pass 2)",
  },
  {
    text: "My son refused to water the plants. He said, 'Dad, they're already grounded.'",
    scores: [4, 5, 4, 5, 5],
    note: "grounded plants (challenger, pass 2)",
  },
];

function total(s: Scores): number {
  return s[0] + s[1] + s[2] + s[3] + s[4];
}

function gateOk(text: string): boolean {
  return text.length >= 1 && text.length <= 200 && text.trim().length > 0;
}

// Gate first, then score, then fewest bytes as tie-break.
const ranked = CANDIDATES.filter((c) => gateOk(c.text)).sort((a, b) => {
  const byScore = total(b.scores) - total(a.scores);
  if (byScore !== 0) return byScore;
  return Buffer.byteLength(a.text, "utf8") - Buffer.byteLength(b.text, "utf8");
});
if (ranked.length === 0) throw new Error("no candidate passes the gate");
const winner = ranked[0];

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");

// Runtime gate validation: re-read what we wrote and hold it to the gate.
const written = readFileSync("/output/entry.txt", "utf8");
if (!gateOk(written)) {
  throw new Error(`gate failed: entry.txt is ${written.length} chars`);
}
if (written !== winner.text) {
  throw new Error("gate failed: entry.txt differs from the chosen joke");
}
console.log(`winner (${winner.note}): ${total(winner.scores)}/25, ${written.length} chars`);
console.log(written);
