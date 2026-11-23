import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { OCCASIONS, hasDecor, type OccasionKey } from "./occasion";

const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "app");

/** Every theme slug the occasion config names (each must have app/themes/<slug>.css). */
const THEMED = Object.values(OCCASIONS)
  .map((o) => o.theme)
  .filter((slug): slug is string => slug !== null);

/** Custom-property declarations inside the first block that opens with `opener`. */
function declarations(source: string, opener: string): Record<string, string> {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const start = css.indexOf(opener);
  if (start < 0) throw new Error(`no block opening with ${opener}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

/** Follow var(--x) chains to a hex colour. A chain longer than 20 hops is a cycle (a typo), so it throws. */
function hexOf(vars: Record<string, string>, name: string): string {
  let value = vars[name];
  if (value === undefined) throw new Error(`--${name} is not defined`);
  let hops = 0;
  for (let ref = value.match(/^var\(--([\w-]+)\)$/); ref; ref = value.match(/^var\(--([\w-]+)\)$/)) {
    if (++hops > 20) throw new Error(`var cycle at --${name}`);
    const next = vars[ref[1]];
    if (next === undefined) throw new Error(`--${ref[1]} (from --${name}) is not defined`);
    value = next;
  }
  if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`--${name} does not resolve to a hex colour: ${value}`);
  return value;
}

function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Every text role against its own block's ground (4.5:1), and every focus ring against its block (3:1). */
const READABLE: [fg: string, ground: string, min: number][] = [
  ["bar-fg", "bar", 4.5],
  ["bar-accent", "bar", 4.5],
  ["hero-panel-heading", "hero-panel", 4.5],
  ["hero-panel-text", "hero-panel", 4.5],
  ["hero-panel-fact", "hero-panel", 4.5],
  ["hero-panel-eyebrow", "hero-panel", 4.5],
  ["action-fg", "action", 4.5],
  ["action-on-block-fg", "action-on-block", 4.5],
  ["products-action-fg", "products-action", 4.5],
  ["band-action-fg", "band-action", 4.5],
  ["products-action", "products", 3],
  ["products-heading", "products", 4.5],
  ["products-name", "products", 4.5],
  ["products-name-hover", "products", 4.5],
  ["products-text", "products", 4.5],
  ["products-price", "products", 4.5],
  ["products-unit", "products", 4.5],
  ["band-heading", "band", 4.5],
  ["band-text", "band", 4.5],
  ["cta-band-heading", "band", 4.5],
  ["cta-band-text", "band", 4.5],
  ["footer-text", "footer", 4.5],
  ["footer-strong", "footer", 4.5],
  ["brand-text", "background", 4.5],
  ["brand-text", "header", 4.5],
  ["foreground", "header", 4.5],
  ["ring", "background", 3],
  ["hero-panel-ring", "hero-panel", 3],
  ["products-ring", "products", 3],
  ["band-ring", "band", 3],
  ["footer-ring", "footer", 3],
];

const KEYS: OccasionKey[] = ["Eid Al-Fitr", "Lunar New Year", "Christmas", "None"];

describe("OCCASIONS", () => {
  it("has an entry for every occasion key", () => {
    expect(Object.keys(OCCASIONS).sort()).toEqual([...KEYS].sort());
  });

  it("None is today's site: no line, no theme, no decorations, the default browser colour", () => {
    expect(OCCASIONS.None).toEqual({ eyebrow: null, theme: null, themeColor: "#fcf9f1", decor: [] });
  });

  it("Christmas is the card theme with every decoration", () => {
    expect(OCCASIONS.Christmas.eyebrow).toBe("Welcoming Christmas");
    expect(OCCASIONS.Christmas.theme).toBe("christmas");
    expect(OCCASIONS.Christmas.themeColor).toBe("#7a2421");
    expect([...OCCASIONS.Christmas.decor].sort()).toEqual([
      "cardFrame",
      "giftRibbon",
      "heroBow",
      "starbursts",
      "stripeStrip",
    ]);
  });

  it("occasions without a designed theme keep their hero line and nothing else", () => {
    expect(OCCASIONS["Lunar New Year"]).toMatchObject({
      eyebrow: "Welcoming the Year of the Fire Horse",
      theme: null,
      decor: [],
    });
    expect(OCCASIONS["Eid Al-Fitr"]).toMatchObject({ eyebrow: "Welcoming Eid Al-Fitr", theme: null, decor: [] });
  });
});

describe("hasDecor", () => {
  it("is false for every decoration when the occasion has none", () => {
    expect(hasDecor("cardFrame", OCCASIONS.None)).toBe(false);
  });

  it("is true for a decoration the occasion lists", () => {
    expect(hasDecor("cardFrame", OCCASIONS.Christmas)).toBe(true);
  });
});

describe("every role is readable on its own ground", () => {
  const base = declarations(readFileSync(join(APP_DIR, "globals.css"), "utf8"), ":root {");
  const themes: [string, Record<string, string>][] = [
    ["default", base],
    ...THEMED.map((slug): [string, Record<string, string>] => [
      slug,
      {
        ...base,
        ...declarations(
          readFileSync(join(APP_DIR, "themes", `${slug}.css`), "utf8"),
          `:root[data-occasion="${slug}"] {`,
        ),
      },
    ]),
  ];

  describe.each(themes)("%s theme", (_name, vars) => {
    it.each(READABLE)("--%s on --%s reaches %s:1", (fg, ground, min) => {
      expect(contrast(hexOf(vars, fg), hexOf(vars, ground))).toBeGreaterThanOrEqual(min);
    });
  });
});

describe("theme files", () => {
  it.each(THEMED)("%s has a theme file that globals.css imports", (slug) => {
    const css = readFileSync(join(APP_DIR, "themes", `${slug}.css`), "utf8");
    expect(css).toContain(`[data-occasion="${slug}"]`);
    expect(readFileSync(join(APP_DIR, "globals.css"), "utf8")).toContain(`@import "./themes/${slug}.css";`);
  });

  it.each(THEMED)("%s styles nothing outside its own occasion", (slug) => {
    const css = readFileSync(join(APP_DIR, "themes", `${slug}.css`), "utf8");
    expect(themeLeaks(css, slug)).toEqual([]);
  });
});

/**
 * Anything in a theme file that could style the site outside `:root[data-occasion="<slug>"]`.
 * Theme files stay flat: no at-rules, no nesting, every selector starts with the occasion's scope.
 */
function themeLeaks(source: string, slug: string): string[] {
  const css = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/url\((["']).*?\1\)/g, "url()")
    .replace(/url\([^)]*\)/g, "url()");
  // An at-rule (@media, @layer, @theme, @property, …) can hold rules this scan can't scope-check.
  const atRules = [...css.matchAll(/@[\w-]+/g)].map((m) => `${m[0]} (keep theme files flat)`);
  // Every selector, whether it follows the start, a closing brace or an opening one (nesting).
  const selectors = [...css.matchAll(/(^|[{}])\s*([^{}@;]+?)\s*{/g)].map((m) => m[2].trim());
  const unscoped = selectors
    .flatMap((s) => s.split(",").map((part) => part.trim()))
    .filter((part) => !part.startsWith(`:root[data-occasion="${slug}"]`));
  return [...atRules, ...unscoped];
}

describe("hexOf", () => {
  it("throws on a var cycle instead of looping forever", () => {
    expect(() => hexOf({ a: "var(--b)", b: "var(--a)" }, "a")).toThrow("var cycle at --a");
  });
});

describe("themeLeaks", () => {
  it("accepts flat rules scoped to the occasion", () => {
    const css = ':root[data-occasion="x"] { --a: red; }\n:root[data-occasion="x"] .y { background: url("data:a(1)b"); }';
    expect(themeLeaks(css, "x")).toEqual([]);
  });

  it("flags a top-level rule", () => {
    expect(themeLeaks(':root[data-occasion="x"] { --a: red; }\n.foo { color: red; }', "x")).not.toEqual([]);
  });

  it.each([
    "@media (min-width: 640px) { .foo { color: red; } }",
    "@layer components { .foo { color: red; } }",
    "@theme { --color-band: red; }",
    '@property --band { syntax: "<color>"; inherits: true; initial-value: red; }',
  ])("flags a rule wrapped in an at-rule: %s", (wrapped) => {
    expect(themeLeaks(`:root[data-occasion="x"] { --a: red; }\n${wrapped}`, "x")).not.toEqual([]);
  });
});
