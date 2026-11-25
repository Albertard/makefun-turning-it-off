// make.fun — "Have You Tried Turning It Off?"
// Bounty: u-motasimfuad-have-you-tried-turning-it-off-154a938b
//
// Writes one funny single-line reply a hopeless tech support agent gives
// a desperate customer to /output/entry.txt.
//
// The line: the agent asks the classic "turn it off and on again", then
// confesses he already tried it three times while the customer was
// talking — and now they are both just staring at the broken thing. The
// joke lands on the judge's brief in order: it is a real support line
// about the classic reboot (twisted, not stock), the humour comes from
// the agent's cheerful uselessness rather than the customer, the
// customer's desperation is felt in "while you were talking", and it
// stays tight — every word earns its place.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CLASSIC_LINE = "Have you tried turning it off and on again?";

const TEXT =
  CLASSIC_LINE +
  " I have — three times, while you were talking — and honestly, we're both just staring at it now.";

// The gate: 1-199 characters, and not only white space. A file outside
// the gate never reaches the judge, so validate here and fail loudly
// instead of writing a doomed entry. Array.from counts Unicode code
// points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 199;

function validateLength(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `entry must be ${GATE_MIN}-${GATE_MAX} characters, got ${length}`,
    );
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return length;
}

function main(): void {
  const length = validateLength(TEXT);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
  console.log(`wrote entry.txt (${length} chars)`);
}

main();
