// The Router Confesses — batch 16 entry for make.fun.
// A home Wi-Fi router explains why it dropped the connection at the climax.
// Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";
import * as path from "node:path";

const CAPS = Object.freeze({
  outputFile: "entry.txt",
  ceiling: 200,
  floor: 1,
});

const CONFESSION = Object.freeze({
  opener: "Sorry, I dropped the Wi-Fi right at the climax.",
  middle: "I saw the buffering wheel spin and thought: this is my moment.",
  closer: "The villain never stood a chance. I did.",
});

function compose(c: typeof CONFESSION): string {
  return [c.opener, c.middle, c.closer].join(" ");
}

function inspect(line: string): void {
  if (!line.trim()) throw new Error("empty entry");
  if (line.length > CAPS.ceiling) {
    throw new Error(`entry is ${line.length} chars; ceiling is ${CAPS.ceiling}`);
  }
  if (line.length < CAPS.floor) throw new Error("entry too short");
  if (line.split("\n").length !== 1) throw new Error("entry must be one line");
  if (!/[.!?]$/.test(line)) throw new Error("entry should end with punctuation");
}

async function deliver(outDir: string, line: string): Promise<void> {
  inspect(line);
  await mkdir(outDir, { recursive: true });
  const dest = path.join(outDir, CAPS.outputFile);
  await writeFile(dest, line, { encoding: "utf8" });
  console.log(`wrote ${line.length} chars to ${dest}`);
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "";
if (targetDir === "") throw new Error("MAKEFUN_OUTPUT_DIR is not set");
await deliver(targetDir, compose(CONFESSION));
