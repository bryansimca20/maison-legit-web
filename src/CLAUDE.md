@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Frontend guidelines for the **Maison Legit** website. Inherits and extends the repo root [../CLAUDE.md](../CLAUDE.md) (§1 Think Before Coding, §2 Simplicity First, §3 Surgical Changes, §4 Goal-Driven Execution).

> **Read `AGENTS.md` first** (imported above): this is Next.js 16 — APIs and conventions differ from older versions. Consult `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

## Project Overview

Maison Legit is a homemade *lapis legit* (Indonesian thousand-layer cake) brand in Jakarta. This is its public marketing + pre-order site, rebuilt from a Claude Design handoff. It is **mobile-first** (most visitors are on phones) and **SEO-focused**.

It is a content site with **no backend and no database**. Everything is static, server-rendered marketing pages plus one client-side flow: the pre-order dialog composes a WhatsApp message and opens `wa.me` — there is no API call, cart, payment, or auth. This project is deliberately much simpler than a typical app dashboard; keep it that way.

Pages: landing (`/`), Our Story (`/story`), and one static page per lapis (`/lapis/[slug]`). All are built and reviewed.

## Commands

Run from this repo root (`maison-legit-web/`).

```bash
npm run dev        # Next dev server (Turbopack) → http://localhost:3000
npm run build      # Production build (static / SSG)
npm run start      # Serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # Vitest unit tests (lib/)
```

Verify changes with `npm test`, `typecheck`, `lint` and `build`, and by running the app. `npm run lint` also scans the
gitignored `.design-extract/` folder and reports errors there; `npx eslint src` checks only the app.

## Environment

In `.env.local` (copy from `.env.example`; never commit):
- `NEXT_PUBLIC_ADMIN_WHATSAPP` — the number that receives pre-orders, with country code (e.g. `+62 812 3456 7890`). Defaults to a placeholder; **orders go nowhere until it is set**, and the JSON-LD `telephone` is omitted until then.
- `NEXT_PUBLIC_SITE_URL` — canonical absolute site URL (no trailing slash), used for metadata / canonicals / sitemap / JSON-LD. Defaults to `https://maisonlegit.com`.

Don't add a new env var without asking.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, RSC) · React 19 · TypeScript (strict).
- **Styling:** Tailwind CSS **v4** (CSS-first, no `tailwind.config.js`) + shadcn/ui (**Base UI** variant) → see [UI and Design Rules](#ui-and-design-rules).
- **Fonts:** `next/font` — Cormorant Garamond (display serif), Hanken Grotesk (UI/body), Yellowtail (script wordmark).
- **Icons:** `lucide-react`.
- **Dates:** `react-day-picker` (behind the shadcn `Calendar`), used only by the order form's delivery date step.
- **State:** local `useState` + one React Context (`OrderProvider`) for the shared pre-order dialog → see [Data Fetching & Services](#data-fetching--services).
- **Data:** static TypeScript in [lib/](lib) — no server data layer → see [Data Fetching & Services](#data-fetching--services).
- **Testing:** Vitest (`npm test`) for the pure helpers in `lib/`; tests sit next to the file as `*.test.ts`. No component tests: UI is checked in the browser at 390px and 1440px.

**Do NOT use without asking:**
- CSS modules, styled-components, emotion, or any non-Tailwind styling. No hardcoded hex in components — use the brand token utilities / semantic classes (raw hex lives **only** in the token definitions in [app/globals.css](app/globals.css) and the theme files in [app/themes/](app/themes); the one exception is each occasion's `themeColor` in `lib/occasion.ts`, because Next's viewport needs a literal).
- Redux/Zustand/Jotai, or a new app-level Context beyond `OrderProvider` — local `useState`/`useEffect` is for ephemeral UI state.
- A data-fetching library (TanStack Query, SWR) or HTTP client (Axios/`fetch`-in-component) — there is no backend. If server data is ever needed, use Next.js full-stack primitives (see [Data Fetching & Services](#data-fetching--services)).
- A form/validation library — the one form uses local state today; propose `react-hook-form` + `zod` first if forms grow.
- New scattered copy/prices in components — catalogue and brand content live in [lib/products.ts](lib/products.ts) / [lib/site.ts](lib/site.ts).

## Architecture

```
src/
  app/                       App Router routes
    layout.tsx               Root layout — next/font, sitewide Metadata + Viewport, sitewide JSON-LD
                             (bakery + website), wraps chrome in <OrderProvider>: AnnouncementBar,
                             SiteHeader, <main>{children}</main>, SiteFooter
    page.tsx                 Landing — Hero, Collection, FeatureBand + collection JSON-LD
    story/page.tsx           Our Story — prose, occasions list, close-up photos, CTA band + breadcrumb JSON-LD
    lapis/[slug]/page.tsx    Per-product page (generateStaticParams, generateMetadata, Product + breadcrumb JSON-LD)
    globals.css              Tailwind v4 theme: brand tokens, shadcn semantic mapping, seasonal roles, base layer,
                             brand utilities; imports the theme files below
    themes/<slug>.css        One file per seasonal theme (christmas.css): its palette and the seasonal roles,
                             all under :root[data-occasion="<slug>"] (a test in lib/occasion.test.ts checks)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx   SEO route handlers / generated OG image
  components/
    ui/                      shadcn primitives (Base UI) — do not hand-edit (CLI-regenerated); button.tsx is the
                             one intentional brand restyle (see Gotchas); calendar.tsx has two hand fixes to
                             keep if it is ever re-added: cn from @/lib/utils (the CLI writes the separate `cn`
                             package), and `ref={ref}` on CalendarDayButton's Button (arrow keys need it)
    site/                    Domain components — announcement-bar, site-header, site-footer, hero,
                             hero-slideshow (the home hero's crossfading photos + pause button), collection, product-carousel (product page only), product-badge, price-tag,
                             feature-band, cta-band, order-dialog, order-provider, order-date-picker (the
                             December-only shadcn Calendar), product-detail
    site/decor/              Seasonal decorations (aria-hidden SVG/CSS, no motion): starburst, line-bow,
                             gift-ribbon, stripe-strip, card-frame. Sections render one only when
                             hasDecor("<name>") is true for the current occasion (lib/occasion.ts); colours come
                             from the theme file's --decor-* tokens or a role utility
    seo/json-ld.tsx          <JsonLd> — renders a structured-data <script>
  lib/                       App + domain data (no server layer):
    site.ts                  siteConfig — name, url, adminWhatsApp, location, social
    occasion.ts              The seasonal switch: OccasionKey, OCCASIONS (hero line, theme slug, theme-color,
                             decorations per occasion), CURRENT_OCCASION, currentOccasion, hasDecor
                             (tested in occasion.test.ts). See DESIGN.md "Seasonal themes"
    products.ts              PRODUCTS, SIZES, PRICE_FROM, SITE_IMAGES, fmtK,
                             normalizeWaNational, OrderLine, orderTotal, nextProductKey, MAX_ORDER_LINES,
                             MIN_SMALL_QTY, minQty (the small box minimum, used by the order form, saved drafts
                             and the product page), DELIVERY, isDeliveryDay, isoDay, earliestDeliveryDay,
                             pickableDeliveryDay, fmtDeliveryDate (the delivery window and date helpers),
                             buildOrderMessage, buildWaLink (tested in products.test.ts)
    order-draft.ts           The unfinished pre-order in sessionStorage: parseOrderDraft (validates; tested in
                             order-draft.test.ts), loadOrderDraft, saveOrderDraft, clearOrderDraft
    schema.ts                JSON-LD builders (bakery, website, collection, single product, breadcrumb)
    utils.ts                 cn() helper
```

Structural rules:
- Path alias `@/*` → `./src/*`. Always use it.
- `lib/` holds the static catalogue/config, the WhatsApp + SEO helpers, and `cn()` — no React, no server I/O.
- Domain components in `components/site/` (kebab-case files); shadcn primitives in `components/ui/`. Route-specific code co-locates under its `app/<route>/`.
- For exports, components, styling, and data conventions, see the sections below.

## Coding Conventions

**TypeScript**
- Strict mode on. No `any`. Avoid the non-null assertion `!` — handle `null`/`undefined` explicitly (early return, guard, default — see `getProduct`).
- Prefer inferred types; annotate at module boundaries. Domain types live in [lib/products.ts](lib/products.ts) (`Product`, `SizeKey`, `ProductKey`, `BadgeTone`) and [lib/occasion.ts](lib/occasion.ts) (`OccasionKey`, `Occasion`, `Decor`).
- `type` for unions/aliases; **no `I` prefix**. Use `import type { … }` for type-only imports.

**Component patterns**
- Functional components only.
- Compose shadcn primitives (`Button`, `Dialog`, `Input`, `Select`, `Label`, `Badge`, `Textarea`) — wrap, don't rewrite. The `ui/` primitives use `cva` + `VariantProps` with `defaultVariants` and a `data-slot` attribute (Base UI) — match that if you extend one.
- Add `"use client"` only when needed (interactivity / hooks) and keep it as deep in the tree as possible. Pages stay server components; the interactive bits (`order-*`, `hero`, `hero-slideshow`, `collection`, `cta-band`, `product-detail`, `product-carousel`, `site-header`) are client.
- Presentational components don't hold business logic — static data comes from `lib/`, dialog actions come from `useOrder()`.
- Module-level `const` for static data (e.g. `POINTS` in `feature-band.tsx`, `OCCASION_ROWS` in `story/page.tsx`); the real catalogue is in `lib/products.ts`.

**Naming**
- `components/ui/` primitives: **lowercase** files (`button.tsx`) — shadcn CLI convention; don't rename.
- `components/site/` & `lib/` & route helpers: **kebab-case** (`order-dialog.tsx`, `products.ts`). Functions/hooks: `camelCase`. Route files: `page.tsx` / `layout.tsx` (Next convention).

**Exports**
- `page.tsx` / `layout.tsx` and the SEO route files (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`) use **default exports** (Next requires it). Every other file uses **named exports**.

**Async & error handling**
- `async`/`await` only — no `.then()` chains. (Async surface here is just Next's `generateMetadata`/`params`.)
- There are no network errors to handle (no backend). Keep validation user-facing and inline (see the pre-order form's `aria-invalid` + `role="alert"` messages).

**Comments** — short, purpose-stating comments where intent isn't obvious (match existing density). No dead or commented-out code.

## UI and Design Rules

**[DESIGN.md](../DESIGN.md) decides which tokens to use and where** (red for actions only, blue for brand only, roman display type, 4-8px radius, motion timings). Read it before any visual change; its "Gaps to close" list is where the current code still differs.

**Design system — brand tokens + Tailwind v4**
- The theme is **CSS-first** in [app/globals.css](app/globals.css). `:root` holds the raw brand palette (Legit Blue, Almond Cream, Gilded Gold, Lacquer Red, Heritage Green, Spice Burgundy, Lapis Amber, warm Ink neutrals) and maps the **shadcn semantic tokens** (`--background`, `--primary`, `--ring`, `--destructive`, …) onto it. The `@theme inline` block exposes brand scales as Tailwind utilities and overrides the radius/shadow scales. Fonts come from `next/font` variables (`--font-cormorant`/`--font-hanken`/`--font-yellowtail`).
- There is **no `tailwind.config.js`** (Tailwind v4 is CSS-first); theme changes go in the `@theme` block, not a JS config.
- **Rule:** don't edit the `@theme` block / token `:root` / base layers in `globals.css` without asking (see [Safety Rules](#safety-rules)). Use the brand utilities everywhere — never hardcode hex in a component.

**Components**
- **Prefer shadcn/ui over custom components.** Check [components/ui/](components/ui/) first. If a needed primitive isn't installed, add it with `npx shadcn@latest add <component>` (**Base UI** variant, not Radix — see [Gotchas](#project-specific-gotchas-read-before-coding)) — don't hand-roll a substitute. Don't hand-edit `components/ui/` (CLI-regenerated) **except** `button.tsx`, which is intentionally restyled to the brand.
- Domain components live in `components/site/`.

**Styling**
- Tailwind utilities in JSX; use `cn()` from [lib/utils.ts](lib/utils.ts) for conditional/merged classes. No inline `style={}` unless the value is dynamic (e.g. the carousel `translateX`).
- Brand color utilities only — `bg-cream-100`, `text-ink-800`, `bg-blue-500`, `text-gold-800`, `bg-feature`, etc. — plus the shadcn semantic classes the primitives use. Raw hex appears only in the token definitions in `globals.css`.
- **Seasonal surfaces use role utilities, never brand ramps.** The top bar, header, hero panel, home product section,
  feature band, CTA band, footer, actions, link accents and selection read the "Seasonal roles" in `globals.css`
  (`bg-bar`, `bg-header`, `bg-hero-panel`, `bg-products`, `bg-band`, `bg-footer`, `text-brand-text`, …), whose
  defaults are today's colours, so a theme can repaint them. Each coloured block sets its own focus ring with
  `[--ring:var(--<block>-ring)]`. Buttons: `cta` on light grounds, `ctaOnBlock` on the hero panel and product tiles.
  **A role used on a coloured block belongs to that block:** `text-brand-text` (link hover) is for light grounds
  only; on the product section the name's hover is `text-products-name-hover`. A new pair goes in `READABLE` in
  `lib/occasion.test.ts`, which checks every text and ring role against its ground in every theme.

**Icons & assets** — Icons: `lucide-react` only (`size-4`, etc.). All imagery goes through `next/image`; product photos live in [public/assets/photography/](../public/assets/photography). Keep `alt` text descriptive (SEO + a11y).

**Accessibility** — Semantic HTML and a single `<h1>` per page; labelled inputs (`<Label htmlFor>`), errors wired with `aria-describedby` + `role="alert"`; visible focus rings (the brand ring is `--ring` = blue, ≥3:1 — don't strip outlines); the carousel and stepper are keyboard-operable; `prefers-reduced-motion` is honored in `globals.css`. Preserve these when editing.

## Data Fetching & Services

**There is no backend, database, HTTP client, auth, or server state library — and there shouldn't be one without asking.** This site is full-stack Next.js, but the only "stack" today is static rendering.

- **Domain data is static TypeScript.** The catalogue (products, sizes, prices, photos, seasonal occasions) is in [lib/products.ts](lib/products.ts); brand/site config is in [lib/site.ts](lib/site.ts). Components import these directly — there is nothing to fetch.
- **The one "service" is WhatsApp order composition** in [lib/products.ts](lib/products.ts): `normalizeWaNational` (cleans the customer number — strips a leading `0`/`62`/`00`), `buildOrderMessage`, and `buildWaLink`. The pre-order dialog composes the message and opens `wa.me` in a new tab — no server round-trip.
- **SEO structured data** is built in [lib/schema.ts](lib/schema.ts) and rendered via `<JsonLd>` ([components/seo/json-ld.tsx](components/seo/json-ld.tsx)). Keep schema in `lib/schema.ts`, not inline.
- **Shared client state = one context.** Opening the pre-order dialog from the header / hero / product cards / CTA bands goes through `OrderProvider` ([components/site/order-provider.tsx](components/site/order-provider.tsx)): call `useOrder().open(productKey?)`. Don't add more global contexts or mount a second dialog.
- **Forms** use local React state with inline validation (one simple form — see [components/site/order-dialog.tsx](components/site/order-dialog.tsx)). If forms grow in number or complexity, adopt `react-hook-form` + `zod` (ask first) rather than expanding ad-hoc state.
- **If real server data is ever needed** (persisting orders, inventory, a contact endpoint), use **full-stack Next.js** — Route Handlers under `src/app/api/` or Server Actions — **not** a separate backend service or a client-side HTTP layer. Update this section when you do.

## Project-specific gotchas (read before coding)

- **shadcn here is the Base UI variant, not Radix.** Primitives in `components/ui/` import from `@base-ui/react`. Match that when adding components, and note Base UI prop names differ (`Dialog` uses `open`/`onOpenChange`; `Select` uses `value`/`onValueChange` + `items`, and `Select.Value` can take a function child).
- **Tailwind v4 is CSS-first — there is no `tailwind.config.js`.** Theme customization lives in the `@theme` block in [app/globals.css](app/globals.css).
- **Brand color scales intentionally override Tailwind defaults.** `bg-blue-500`, `bg-red-500`, `bg-green-800`, `bg-amber-500` are the Maison Legit palette, not Tailwind's. New brand scales are added too: `cream-*`, `gold-*`, `ink-*`, `burgundy-*`, plus `bg-canvas` / `bg-feature`. Use **`gold-800`** (not `gold-500`/`600`) for small text on light surfaces — it's the AA-contrast gilded tone.
- **`components/ui/button.tsx` is hand-restyled to the brand** (8px radius, `active:scale-[0.97]` press; variants `primary`/`cta`/`ctaOnBlock`/`gold`/`secondary`/`ghost`/`outline`, where `cta` and `ctaOnBlock` read the seasonal action roles; sizes `sm`/`md`/`lg`/`icon`/`icon-sm`). It's the one `ui/` primitive that deviates from CLI output — preserve its variants; if you ever re-add it via the CLI, re-apply them.
- **The pre-order dialog re-initializes via remount.** `order-provider.tsx` passes a changing `key` to `<OrderDialog>` on each open, so its `useState` initializers run per open — don't reintroduce a `useEffect` reset (it trips the React 19 set-state-in-effect lint). The initializers read the unfinished order from `sessionStorage` (`lib/order-draft.ts`) first: a saved order reopens as it was, ignoring the product pressed; with none, the product preselects. The dialog saves the draft once the customer changes something and clears it on send.
- **Each lapis has a lead `heroPhoto`** in [lib/products.ts](lib/products.ts): its home tile, its slide in the home hero slideshow, and the first photo on its product page. Order thumbnails and link previews use `photos[0]`. Keep a hero photo out of `photos`, or the product page shows it twice (a test checks). Its `focus` is the CSS `object-position` for the hero's wide crop.
- **The seasonal switch** is `CURRENT_OCCASION` in [lib/occasion.ts](lib/occasion.ts). It picks the hero line, puts
  `data-occasion="<slug>"` on `<html>` when the occasion has a theme, and sets the viewport `themeColor`
  (`"None"` is the default site: no line, no theme). **Turning a season off:** set `"None"` and deploy; keep the
  theme file for next year. **Adding an occasion's look:** add `app/themes/<slug>.css` (palette + roles under
  `:root[data-occasion="<slug>"]`), `@import` it in `globals.css`, set the occasion's `theme`, `themeColor` and
  `decor` in `lib/occasion.ts`, and add its subsection to DESIGN.md "Seasonal themes". No component edits needed
  unless it brings a new decoration.
- **Our Story uses product close-ups** (`SITE_IMAGES.story*`) where the family photos will go; swap the entries in `lib/products.ts` when the shots exist. Never ship a placeholder frame (`DESIGN.md`).

## Safety Rules

Do NOT change without explicit instruction:
- Files in [components/ui/](components/ui/) — shadcn primitives, CLI-regenerated. **Exception:** `button.tsx` is the documented brand restyle.
- The brand tokens / `@theme` block / base layer in [app/globals.css](app/globals.css) — they define the whole palette and the dark-safe semantics.
- [next.config.ts](../next.config.ts), `tsconfig.json`, `components.json`, `eslint.config.mjs`, `postcss.config.mjs` — config changes need approval.
- `.env` / any `.env*` — never commit or echo; don't add vars without asking, and never hardcode the real admin WhatsApp number or site URL (they're env-driven).

## Keeping This File Current

**Whenever the stack or conventions change, update this CLAUDE.md in the same change.** Specifically: adding/removing/upgrading a dependency, changing a build/run command, adding an env var, installing a shadcn component pattern, adding a product field, or shifting an architectural pattern (introducing server data, a form library, or new shared state). A stale CLAUDE.md misleads future work — treat it as part of the change, not a follow-up.

## When in Doubt

Stop and ask (root §1). When a needed component, token, dependency, or env var doesn't exist, propose options before writing code. Default to the simpler path (root §2) — this site should stay small.
