# Design System — Maison Legit

Source of truth for every visual and UI decision on this site. Tokens live in
[`src/app/globals.css`](src/app/globals.css); this file says which of them to use, where, and why.
The code does not fully match this file yet; see [Gaps to close](#gaps-to-close).

## Product Context

- **What this is:** the pre-order site for Maison Legit, homemade *lapis legit* (the Dutch-Indonesian
  thousand-layer cake) from a thirty-year family recipe, baked by hand in Jakarta. Orders go to WhatsApp.
- **Who it's for:** people in Jakarta buying a lapis for a celebration or as a gift, mostly on a phone.
- **Space:** home bakery / small-batch kue. A **place**-kind site: photographs lead, no effects.
- **Project type:** marketing site with one transaction (the pre-order dialog).
- **The one thing to remember:** *Mom's forty-layer lapis, made by hand in Jakarta.* Every decision serves this.

## Aesthetic Direction

- **Direction:** family bakery ledger. Cream paper, espresso ink, one lacquer-red action, the cake's
  photographs doing the talking.
- **Decoration level:** minimal. No gradients beyond the hero photo fade, no blobs, no patterns, no icons
  as decoration, no emoji.
- **Mood:** warm, plain-spoken, proud of the craft. A family handing you a slice, not a luxury brand selling one.
- **Signature:** the cross-section of the layers. Use that photograph where a wine site would use its label.
- **Not this:** script headlines, a coloured italic word inside a heading, tracked all-caps labels above
  headings, invented badges ("Best seller"), the same mood line repeated in several sections.

## Typography

| Role | Font | Use |
| --- | --- | --- |
| Display | Cormorant Garamond 500/600, **roman** | h1-h3, the one large type moment |
| Body / UI | Hanken Grotesk 400/500/700 | paragraphs, buttons, labels, prices |
| Wordmark | Yellowtail 400 | the "Maison Legit" logotype only. Never a heading or tagline |

- **Italic:** allowed for a whole short line (a pull quote), never for one word inside a heading, and never coloured.
- **Loading:** self-hosted via `next/font/google` in `src/app/layout.tsx`, `display: swap`.
- **Numbers:** prices in Hanken Grotesk 700 with `tabular-nums`.
- **Scale (mobile / desktop, px):** h1 42 / 64 · h2 30 / 40 · h3 22 · body 16 / 17 · small 14 · fine print 12 (legal and footer only).
- Body text never below 16px. Product blurbs 15px minimum.
- Line height: body 1.6-1.7, headings 1.04-1.16. Measure 45-70ch. `text-wrap: balance` on headings (set in the base layer).
- No letter-spacing on lowercase. Uppercase is for the product badge only, if it stays.

## Color

**Approach:** restrained. One accent for action, one brand colour, everything else cream and ink.

| Token | Hex | Use |
| --- | --- | --- |
| `cream-200` (`--background`) | `#faf5e8` | page ground |
| `cream-100` / `cream-50` | `#fcf9f1` / `#fefcf7` | header, dialog, raised surfaces |
| `ink-900` | `#1e1710` | headings, footer ground |
| `ink-800` (`--foreground`) | `#2c231a` | body text |
| `ink-600` | `#5f5142` | secondary text on cream (use instead of `ink-500` for anything under 18px) |
| `red-500` | `#c23a2b` | **actions only**: the pre-order buttons. Nothing else is red |
| `blue-500` (`--primary`) | `#3f5e96` | brand: logo tile, the one brand band (CTA band), focus ring (`blue-700`) |
| `gold-800` | `#7a601f` | small text on cream when a gold tone is needed |
| `gold-300`-`gold-500` | `#e2cd8e`-`#c2a04c` | 1px rules and hairlines only, never fills or text |
| `amber-200` | `#f4dba6` | image frame background while a photo loads (the cake's colour) |

- **Retired from page use:** `green-*` (feature band), `burgundy-*`. Keep the tokens, stop using them on pages.
  The feature band moves to `ink-900` or `blue-500`.
- **One accent per screen:** red appears only on buttons. Blue appears only as the logo, one band, and links.
- **Progress and choice:** `ink-800` fills the order form's progress bar (upcoming steps `--border-default`) and the
  chosen size in an order line. Neither is an action, so neither is red, and neither is a link, so neither is blue.
- **Semantic:** error `red-600` (`--destructive`) with a text message, success `green-700` on the order
  confirmation only. Never colour alone.
- **Contrast:** body 4.5:1 minimum. On `blue-500`, text is `cream-100` (not `blue-200`).
- **Dark mode:** none. The site is light-only by design; do not add a dark theme.

## Spacing

- **Base unit:** 4px (Tailwind's scale).
- **Density:** comfortable on desktop, tight on phone.
- **Scale in use:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 80. Section padding 44-52px on phone, 72-84px on desktop.
- Related things sit closer than unrelated ones: a heading is nearer its own text than the section above.

## Layout

- **Approach:** grid-disciplined, photograph-led.
- **Max content width:** 1200px, side gutters 20px phone / 48px desktop. Left and right edges match on every section.
- **Grid:** 1 column under 640px, 2 columns from 640px, 4 product columns from 1280px.
- **Hero:** full-height photo of the cake, h1 names the product and the city, one fact line (price from, lead
  time), one button. Nothing else.
- **Order of the home page:** hero → the collection → the craft (one large type moment over the cross-section) → footer.
- **Products:** photo on the cream ground, name, one factual line, price, button. No white box, no shadow
  around the product. The whole tile is one link to `/lapis/[slug]`; the button opens the dialog.
- **Cards:** only where the card is the thing you click. No decorative card grids.
- **Centred text:** only the footer and a single pull quote. Headings and body align left.
- **Border radius:** photos 4px, buttons 8px, inputs 8px, dialog 16px, badges 4px. No pill shapes on new work.
- **Shadows:** none on photos or products. `shadow-xl` on the dialog only.
- **Touch targets:** 44px minimum for every link and control outside running text (carousel dots included, via the hit area).
- **Footer:** wordmark, WhatsApp link, lead time, delivery area, Instagram. Facts, not a tagline.

## Photography

- Real photographs of the real cake only. No stock passed off as ours.
- Never use a social-media export (baked-in border, drop shadow, text) as a page photo.
- No photo twice on the same page.
- Shots still needed: Mom at the griddle, the family table, an old family photo, a clean cross-section
  close-up. Until they exist, use the product shots; never ship a placeholder frame.
- Every image through `next/image` with a `sizes` that matches its rendered width, descriptive `alt`.

## Copy

- Plain, specific, first-person plural ("we", "Mom"). Facts beat adjectives.
- Say "small batch" once on the whole site. Use the space for lead time, area, price.
- Buttons: verb + object ("Pre-order now", "Order on WhatsApp").
- No em dashes in UI copy, no exclamation marks, no invented claims ("best seller", "limited slot").
- Brand nuance: the owners are not Muslim. Eid is "shared with friends who celebrate", never about fasting.

## Motion

- **Approach:** minimal-functional, plus one entrance on load.
- **Easing:** `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for everything entering or responding.
  `--ease-gentle` is legacy; do not use it on new work. Never `ease-in` on UI.
- **Durations:** press 120-160ms · hover 150-200ms · carousel slide 200ms · dialog 200ms · hero entrance 400-700ms.
- **Buttons:** `active:scale-[0.97]`.
- **Product tile (linked):** photo `scale-[1.03]` inside its frame on hover, no lift.
- **Hero entrance:** h1, text, button fade in with an 8px rise, 60ms apart, once on load (`animate-in` from tw-animate-css).
- Animate `transform` and `opacity` only. No `transition: all`, no scroll-triggered fades, no parallax.
- `prefers-reduced-motion` is honoured globally in `globals.css`; keep it.

## Gaps to close

The audit of 2026-11-17 found these differences between the code and this file. Treat them as the
design backlog; strike each when fixed.

1. ~~Feature-band photo is a social export.~~ Now the cross-section (`lapis-legit-original-3.jpg`).
2. ~~Blue italic word in headings.~~
3. ~~Uppercase gold labels above headings.~~ The seasonal hero line remains, sentence case, only when an occasion is set.
4. ~~"Small batch" repeated.~~ Once, in the hero.
5. ~~No ordering or delivery info.~~ The footer and the address field say it: delivery
   only, within Jakarta (`siteConfig.deliveryArea`), fee confirmed on WhatsApp. No payments on the site.
6. ~~Placeholder frames on `/story`.~~ Product close-ups stand in until the family photos exist.
7. ~~Invented badges.~~ No product carries a badge now.
8. ~~H1 does not name the product or Jakarta; brand name not shown as text.~~ Wordmark text shows from 640px up.
9. ~~White product cards; lift without a link.~~ Tiles show one photo; the carousel stays on the product page.
10. ~~Green feature band; four accents.~~ Feature band is `blue-500`.
11. ~~Low-contrast CTA subtitle; 13px blurbs.~~
12. ~~Carousel `sizes`; empty frame while loading.~~ Frames load on `amber-200`.
13. ~~Pill buttons and badges.~~ 8px buttons, 4px badges.
14. ~~Button press and easing; no hero entrance.~~

15. ~~Centred hero text on `/story`; em dashes in product descriptions; the order dialog's 26px radius, pill
    stepper, gold gradient seam and tracked all-caps field labels.~~ Swept 2026-11-21 with the other leftover tells:
    middot-joined fact lines, italic small text, sub-14px text, the centred CTA band, the gold left border on the order review, and the gradient OG image (now the cross-section photo).

Full findings: `~/.gstack/projects/maison-legit/designs/design-audit-20261117/design-audit-localhost.md`.

## Decisions Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-11-17 | Initial design system written from the design audit and /design-consultation | Remove template tells; let the photographs and facts carry the brand |
| 2026-11-17 | Red for actions only, blue for brand only, green and burgundy retired from pages | Four accents on one page competed with the cake |
| 2026-11-17 | Display serif stays Cormorant Garamond, roman; Yellowtail limited to the wordmark | Keeps the brand's existing voice without the italic-accent and script-heading habits |
| 2026-11-17 | Radius drops from pills/18px to 4-8px (dialog 16px) | Uniform bubbly radius read as a shop template |
| 2026-11-17 | Light theme only | Bakery site, daytime use; dark mode adds work without a reader asking for it |
| 2026-11-21 | Delivery only, within Jakarta; fee confirmed on WhatsApp; no payments on the site | Owners' call; the order form requires an address |
| 2026-11-21 | "How ordering works" section removed from the home page | Owners' call; ship date, delivery area and fee still show in the banner, hero, footer and order form |
| 2026-11-21 | Pre-orders hold several lapis lines; a three-step progress bar replaces "Step N of 2" | Gift buyers order for several people in one message; the bar shows how far through the form they are |
