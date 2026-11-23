/**
 * Seasonal occasions: the hero line, the theme and the decorations for an important date.
 * Switch CURRENT_OCCASION and deploy; "None" is the default site. See DESIGN.md "Seasonal themes".
 */

export type OccasionKey = "Eid Al-Fitr" | "Lunar New Year" | "Christmas" | "None";

/** Decorations a theme can turn on (components in components/site/decor/). */
export type Decor = "starbursts" | "heroBow" | "giftRibbon" | "cardFrame" | "stripeStrip";

export interface Occasion {
  /** Line above the hero heading, or none. */
  eyebrow: string | null;
  /** `data-occasion` slug on <html>; its colours live in app/themes/<slug>.css. Null keeps the default theme. */
  theme: string | null;
  /** Browser UI colour (viewport theme-color). Next needs a literal, so it lives here, not in CSS. */
  themeColor: string;
  decor: readonly Decor[];
}

const DEFAULT_THEME_COLOR = "#fcf9f1";

export const OCCASIONS: Record<OccasionKey, Occasion> = {
  "Eid Al-Fitr": { eyebrow: "Welcoming Eid Al-Fitr", theme: null, themeColor: DEFAULT_THEME_COLOR, decor: [] },
  "Lunar New Year": {
    eyebrow: "Welcoming the Year of the Fire Horse",
    theme: null,
    themeColor: DEFAULT_THEME_COLOR,
    decor: [],
  },
  Christmas: {
    eyebrow: "Welcoming Christmas",
    theme: "christmas",
    themeColor: "#7a2421",
    decor: ["starbursts", "heroBow", "giftRibbon", "cardFrame", "stripeStrip"],
  },
  None: { eyebrow: null, theme: null, themeColor: DEFAULT_THEME_COLOR, decor: [] },
};

export const CURRENT_OCCASION: OccasionKey = "Christmas";

export const currentOccasion: Occasion = OCCASIONS[CURRENT_OCCASION];

export function hasDecor(decor: Decor, occasion: Occasion = currentOccasion): boolean {
  return occasion.decor.includes(decor);
}
