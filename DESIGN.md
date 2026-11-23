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
- **The one thing to remember:** *Mom's lapis, made by hand in Jakarta, one layer at a time.* Every decision serves this.

## Aesthetic Direction

- **Direction:** family bakery ledger. Cream paper, espresso ink, one lacquer-red action, the cake's
  photographs doing the talking.
- **Decoration level:** minimal. No gradients, no blobs, no patterns, no icons
  as decoration, no emoji.
- **Mood:** warm, plain-spoken, proud of the craft. A family handing you a slice, not a luxury brand selling one.
- **Signature:** the cross-section of the layers. Use that photograph where a wine site would use its label.
- **Not this:** script headlines, a coloured italic word inside a heading, tracked all-caps labels above
  headings, invented badges ("Best seller"), the same mood line repeated in several sections.
- **Scope:** this direction and decoration level describe the **default theme**. A seasonal theme may add the
  decorations its own subsection lists, and nothing else (see [Seasonal themes](#seasonal-themes)).

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

This palette and its rules (red for actions only, blue for the brand) are the **default theme**. While an
occasion with a theme is set, that theme's roles replace these colours; see [Seasonal themes](#seasonal-themes).

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
  chosen size in an order line and the chosen delivery day. None is an action, so none is red, and none is a link, so none is blue.
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
- **Hero:** a full-width slideshow of the lapis close-ups (each product's hero photo, one per lapis; photo only,
  no caption or link), with the text on a `cream-100` panel over it: h1 names the product and the city, one fact
  line (price from, lead time), one button, with the short paragraph between the h1 and the fact line. On phones
  the hero fills the first screen below the bar and header and its button is always on that screen: the photo
  gives up height, the button never moves. Desktop panel sits at the content's left edge, 64px from the bottom.
- **Order of the home page:** hero → the collection → the craft (one large type moment over the cross-section) → footer.
- **Products:** photo on the cream ground, name, one factual line, price, button. No white box, no shadow
  around the product. The whole tile is one link to `/lapis/[slug]`; the button opens the dialog.
- **Cards:** only where the card is the thing you click. No decorative card grids.
- **Centred text:** only the footer and a single pull quote. Headings and body align left.
- **Border radius:** photos and the hero panel 4px, buttons 8px, inputs 8px, dialog 16px, badges 4px. No pill shapes on new work.
- **Shadows:** none on photos or products. `shadow-xl` on the dialog only.
- **Touch targets:** 44px minimum for every link and control outside running text (carousel dots included, via the hit area).
- **Footer:** wordmark, WhatsApp link, lead time, delivery area, Instagram. Facts, not a tagline.

## Photography

- Real photographs of the real cake only. No stock passed off as ours.
- Never use a social-media export (baked-in border, drop shadow, text) as a page photo.
- No photo twice on the same page. One exception: the home hero slideshow shows each lapis's hero photo, which
  is also that lapis's tile just below (owners' call).
- Shots still needed: Mom at the oven, the family table, an old family photo, a clean cross-section
  close-up. Until they exist, use the product shots; never ship a placeholder frame.
- Every image through `next/image` with a `sizes` that matches its rendered width, descriptive `alt`.

## Copy

- Plain, specific, first-person plural ("we", "Mom"). Facts beat adjectives.
- Say "small batch" once on the whole site. Use the space for lead time, area, price.
- Buttons: verb + object ("Pre-order now", "Order on WhatsApp").
- No em dashes in UI copy, no exclamation marks, no invented claims ("best seller", "limited slot").
- Brand nuance: the owners are not Muslim. Eid is "shared with friends who celebrate", never about fasting.

## Motion

- **Approach:** minimal-functional, plus one entrance on load and the hero slideshow.
- **Easing:** `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for everything entering or responding.
  `--ease-gentle` is legacy; do not use it on new work. Never `ease-in` on UI.
- **Durations:** press 120-160ms · hover 150-200ms · carousel slide 200ms · dialog 200ms · hero entrance 400-700ms ·
  hero crossfade 1200ms, a new photo every 5s.
- **Hero slideshow:** the showing photo zooms 1 to 1.05 over its 5s, linear (ambient, so not `--ease-out`). A
  pause/play button sits over the photo (44px hit area); pausing freezes the zoom too. Reduced motion: the slideshow starts paused on the first
  photo and plays only if the visitor presses play.
- **Buttons:** `active:scale-[0.97]`.
- **Product tile (linked):** photo `scale-[1.03]` inside its frame on hover, no lift.
- **Hero entrance:** h1, text, button fade in with an 8px rise, 60ms apart, once on load (`animate-in` from tw-animate-css).
- Animate `transform` and `opacity` only. No `transition: all`, no scroll-triggered fades, no parallax.
- `prefers-reduced-motion` is honoured globally in `globals.css`; keep it.

## Seasonal themes

The site can wear a look for an important date (Christmas, Lunar New Year, Eid al-Fitr) and return to the
default afterwards. Design: `docs/superpowers/specs/2026-11-23-seasonal-themes-design.md` (workspace root).

- **The switch:** `CURRENT_OCCASION` in `src/lib/occasion.ts`, then a deploy. `"None"` is the default theme
  above, unchanged. Each occasion's config names its theme, its browser `theme-color`, and the decorations it
  turns on. Turning a season off means setting `"None"`; the theme files stay for next year.
- **Roles, not colours:** seasonal surfaces (top bar, header, hero panel, product section, brand band, CTA band,
  footer, actions, link accents, focus rings, selection) use role utilities such as `bg-band` and `bg-footer`.
  Their defaults in `globals.css` are the colours above. A theme file (`src/app/themes/<slug>.css`) redefines
  only those roles, under `:root[data-occasion="<slug>"]`.
- **Never themed:** the logo tile, the header wordmark (`blue-700`), every photograph, the photo loading ground
  (`amber-200`), typography, radii, shadows, spacing (except padding a decoration needs while it is on), error red
  (`red-600`), success green (`green-700`), the order form's progress and chosen-option colour (`ink-800`), and the
  order dialog's cream surfaces.
- **Neighbour rule:** two full-width sections next to each other never share a ground colour, in any theme.
- **A role used on a coloured block belongs to that block:** the shared link-hover role (`brand-text`) is for
  light grounds only. Text on the hero panel, product section, band and footer uses that block's own roles. A
  test (`lib/occasion.test.ts`) checks every text and ring role against its own ground, in every theme.
- **Focus rings flip on coloured blocks:** each dark or coloured block sets its own ring colour, so the ring
  always shows (3:1 at least).
- **Decorations:** only the ones a theme's subsection lists. All are `aria-hidden` inline SVG or CSS, with no
  image files and no motion.

### Christmas ("Christmas card")

Oxblood, cream and a dusty blue that echoes the backdrop in every product photo. The owners picked it from three
directions on 2026-11-23. Hanging ornaments were tried and removed.

**Palette** (raw tokens, only in `src/app/themes/christmas.css`):

| Name | Hex | Used for |
| --- | --- | --- |
| Oxblood | `#7a2421` | top bar, hero panel, brand bands (feature band, Our Story CTA band), buttons on light grounds and on blue, ribbon and bow |
| Deep oxblood | `#5c1a18` | footer, headings and prices on dusty blue, button hover, focus ring on light grounds and on blue |
| Cream | `#f4ebdf` | page ground |
| Light cream | `#f9f3ea` | header, type on oxblood, buttons on oxblood, ribbon edge lines, gift-wrap stars and frame line |
| Rose cream | `#ecd9d2` | secondary text on oxblood, the hero's line-drawn bow |
| Dusty blue | `#9fb6d1` | home product section, stripe strip |
| Frost | `#d3deeb` | small accents on oxblood: bar fact text, hero line, starbursts on oxblood, text selection |

**Roles:**

| Role | Default | Christmas |
| --- | --- | --- |
| Page ground | `cream-200` | Cream |
| Header ground | `cream-100` | Light cream |
| Announcement bar: ground / text / second sentence | `ink-900` / `cream-200` / `gold-300` | Oxblood / Light cream / Frost |
| Hero panel: ground / heading / paragraph / fact line / seasonal line | `cream-100` / `ink-900` / `ink-600` / `ink-800` / `gold-800` | Oxblood / Light cream / Rose cream / Light cream / Frost |
| Action on a light ground (header, product page, order dialog): fill / hover | `red-500` / `red-600` | Oxblood / Deep oxblood |
| Hero panel button: fill / text | `red-500` / `cream-100` | Light cream / Oxblood |
| Product tile buttons (the section sets its own): fill / hover / text | `red-500` / `red-600` / `cream-100` | Oxblood / Deep oxblood / Light cream |
| Our Story CTA band button (the band sets its own): fill / hover / text | `red-500` / `red-600` / `cream-100` | Light cream / Rose cream / Oxblood |
| Product section: ground / heading / name / description / price / "/ whole" | page / `ink-900` / `ink-900` / `ink-600` / `ink-900` / `ink-600` | Dusty blue / Deep oxblood / Deep oxblood / Ink / Deep oxblood / Ink |
| Brand band (feature band, Our Story CTA band): ground / heading / body / hairlines | `blue-500` / `cream-100` / `blue-100` (CTA: `cream-100`) / `hairline-on-dark` | Oxblood / Light cream / Rose cream / Light cream at 22% |
| Footer: ground / text / wordmark | `ink-900` / `cream-500` / `cream-200` | Deep oxblood / Rose cream / Light cream |
| Link hover, active nav text and underline (light grounds only) | `blue-700`, `gold-500` underline | Oxblood |
| Product name hover (on the product section's ground) | `blue-700` | Oxblood |
| Focus ring on light grounds / on oxblood / on dusty blue | `blue-700` / n/a / `cream-100` | Deep oxblood / Light cream / Deep oxblood |
| Text selection | `gold-300` | Frost |

**Contrast, measured:** Light cream on Oxblood 9.06:1 · Rose cream or Frost on Oxblood 7.34:1 · Oxblood on Cream
8.47:1 · Deep oxblood on Dusty blue 6.24:1 · Ink on Dusty blue 7.40:1 · Oxblood button against Dusty blue 4.80:1 ·
`ink-600` on Cream 6.49:1 · Oxblood name hover on Dusty blue 4.80:1 · Rose cream on Deep oxblood 9.54:1 · rings: Deep
oxblood on Cream 11.01:1, Light cream on Oxblood 9.06:1, Deep oxblood on Dusty blue 6.24:1. The oxblood band and the
deep oxblood footer sit next to each other at only 1.30:1: different colours, close in value (accepted with E2).

**Decorations:**

| Piece | Where | Details |
| --- | --- | --- |
| Starburst (8 points) | either side of the top bar text (from 640px); before "Welcoming Christmas"; a cluster of four beside "Four lapis, made to order" (from 640px); before each feature-band point heading; either side of the footer wordmark; four scattered on the feature band (desktop) | Frost or Light cream on oxblood, Deep oxblood or Light cream on dusty blue. 9 to 22px |
| Line-drawn bow | top-right corner of the hero panel | Rose cream, 72px desktop / 46px phone, clear of the heading |
| Gift ribbon and bow | across the feature band's cross-section photo | Oxblood ribbons (26px / 20px) at 24% from the right and 30% from the top, Light cream edge lines, a solid oxblood bow (132px / 90px) at the crossing |
| Card frame and gift-wrap | the home product section | 1.5px Light cream frame line inset 18px (10px on phones) at 85%. A repeating starburst pattern (330px tile, Light cream at 60%) never sits under text: the heading and each tile's text block sit on the solid dusty blue. The heading cluster's small star is Light cream. Padding grows to 64/88px (desktop) and 44/28/56px (phones) to clear the frame |
| Stripe strip | between the product section and the feature band | Dusty blue and Cream stripes 30px wide, 52px tall, 5px oxblood rule above and below |

Colours only, no decorations: the Our Story body, the product pages and the order dialog. The bar and footer
starbursts show on every page.

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
| 2026-11-22 | Delivery date is its own order step (Lapis, Date, Delivery, Review: a four-segment bar); its calendar shows December 2026 only, 3 to 31 December pickable; first delivery moves to 3 December | Owners' call: every order names a day the owners deliver on, so dates are no longer settled by hand in the chat |
| 2026-11-21 | Christmas campaign shot as the hero; banner and order copy name Christmas | Owners' call for the Christmas pre-order; revert to the cross-section photo after the season |
| 2026-11-22 | Christmas lapis shots lead each product page and home tile (`seasonalPhoto`), cropped to the cake without logo or tagline | Owners' call; order thumbnails and link previews keep the plain photos, which read better small. Delete the entries after the season |
| 2026-11-23 | Christmas photos removed from the hero, home tiles and product pages; each lapis has a hero photo that leads its tile, its hero slide and its page (the new close-ups for Original, Plum, Cheesecake; the forkful close-up for Chocolate) | Owners' call: the striped Christmas set looked like a circus. Christmas copy stays. The hero photos show twice on the home page (slide and tile), an accepted exception |
| 2026-11-23 | "Forty layers" removed from the copy (Original tile and description, Our Story, this file) | Owners' call: they don't know the exact count. "Thousand-layer cake" stays as the cake's common name |
| 2026-11-23 | Hero is a full-width slideshow of the lapis close-ups (crossfade every 5s, slow zoom, pause button, still under reduced motion) with the text on a cream panel; the hero photo fade is gone. On phones the hero fits the first screen so its button always shows; the paragraph shows on phones too, and the photo gives up the height | Owners' call: a moving hero makes the site feel alive, and the phone button must be visible without scrolling. Chosen over a crossfading split layout and a sliding row of tall photos |
| 2026-11-23 | Seasonal theme system: one occasion switch (`CURRENT_OCCASION`), role colour tokens with today's colours as defaults, one CSS block per occasion, decorations listed per occasion | Swap looks for Christmas, Lunar New Year and Eid without touching components; the default look returns untouched when the occasion is "None" |
| 2026-11-23 | "Christmas card" theme live for the Christmas pre-order: oxblood, cream and dusty blue; starbursts, a line-drawn bow, a gift ribbon on the cross-section, a card frame with starburst gift-wrap, a stripe strip. Hanging ornaments rejected | Owners' call after two rounds of browser mockups: bolder than cream and unmistakably Christmas, without the circus of the striped photo set. Buttons are oxblood for the season |
| 2026-11-23 | Christmas theme ("E2"): the home product section moves to dusty blue (deep oxblood type, oxblood buttons), the brand bands to oxblood (light cream type, light cream button on Our Story), the footer to deep oxblood; gift-wrap stars 60%, frame line 85%. The product section and brand bands now set their own button colours | Team feedback: on phones the lapis list was a long column of oxblood and wanted more of the band's blue. Owner picked E2 from mockups (over blue details, blue mounts, alternating panels, stripe dividers, and blue products beside a blue band) because it keeps the page alternating |
