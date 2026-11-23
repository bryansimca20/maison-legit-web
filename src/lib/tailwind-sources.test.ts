import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Tailwind v4 scans every project file for class names, comments and Markdown included. A bracketed
 * arbitrary-property example with a placeholder in it (an angle-bracket name, an ellipsis) becomes a real CSS
 * rule, and `npm run dev` then fails to parse the stylesheet (the production build silently drops it).
 */
function placeholderClasses(text: string): string[] {
  const candidates = text.match(/\[--[\w-]+:[^\]\s`'"]*\]/g) ?? [];
  return candidates.filter((c) => /[<>]|\.\.\./.test(c));
}

// Samples are assembled from pieces so this file never contains the broken class it describes.
const OPEN = "[--";
const broken = [`${OPEN}ring:var(--${"<"}block>-ring)]`, `${OPEN}x:var(${"."}..)]`];
const valid = [`${OPEN}ring:var(--band-ring)]`, `${OPEN}cell-size:--spacing(7)]`];

describe("placeholderClasses", () => {
  it.each(broken)("flags %s", (sample) => {
    expect(placeholderClasses(`a doc line with \`${sample}\` in it`)).toEqual([sample]);
  });

  it.each(valid)("accepts %s", (sample) => {
    expect(placeholderClasses(`className="${sample}"`)).toEqual([]);
  });
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css|md)$/.test(entry.name) ? [path] : [];
  });
}

describe("project sources Tailwind scans", () => {
  const files = [...sourceFiles(join(ROOT, "src")), join(ROOT, "DESIGN.md"), join(ROOT, "README.md")];

  it.each(files.map((f) => [f.slice(ROOT.length + 1), f]))("%s has no placeholder class examples", (_rel, file) => {
    expect(placeholderClasses(readFileSync(file, "utf8"))).toEqual([]);
  });
});
