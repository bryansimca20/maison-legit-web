# Maison Legit

Marketing + pre-order site for **Maison Legit**, a homemade *lapis legit* (Indonesian
thousand-layer cake) brand in Jakarta. Built from the Claude Design handoff as a
mobile-first, SEO-friendly **Next.js + Tailwind + shadcn/ui** app.

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack), code under [`src/`](src)
- **Tailwind CSS v4** — brand design tokens live in [`src/app/globals.css`](src/app/globals.css)
- **shadcn/ui** (base-nova / Base UI primitives) — Button, Dialog, Input, Select, Label, Badge
- **TypeScript**
- Fonts via `next/font/google`: Cormorant Garamond (display), Hanken Grotesk (UI/body), Yellowtail (script wordmark)

Coding conventions for the app live in [`src/CLAUDE.md`](src/CLAUDE.md); general principles in [`CLAUDE.md`](CLAUDE.md).

## Pages

- `/` — landing: hero, the four-lapis collection, the "made with care" feature band
- `/story` — Our Story: mom's thirty-year recipe, the tasting-menu occasions list, photo suggestions
- `/lapis/[slug]` — a static page per lapis (original, plum, chocolate, cheese)

Pre-ordering uses **WhatsApp** (no backend): any "Pre-order" button opens a dialog that
collects the order, composes a message, and opens `wa.me/<admin>` with it pre-filled.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_ADMIN_WHATSAPP` | Number that receives pre-orders (with country code) | `+62 812 3456 7890` (placeholder — **set this**) |
| `NEXT_PUBLIC_SITE_URL` | Canonical absolute URL, used for metadata / sitemap / JSON-LD | `https://maisonlegit.com` |

Other content lives in plain TypeScript:

- **Products, prices, sizes, photos** — [`src/lib/products.ts`](src/lib/products.ts)
- **Seasonal occasion** — set `CURRENT_OCCASION` in [`src/lib/products.ts`](src/lib/products.ts)
  (`"Eid Al-Fitr" | "Lunar New Year" | "Christmas" | "None"`); shows a line above the hero heading (none for `"None"`)
- **Brand / location / socials** — [`src/lib/site.ts`](src/lib/site.ts)

## Photography

Product photos are in [`public/assets/photography/`](public/assets/photography). The Our Story
page uses close-up product shots (`SITE_IMAGES.story*` in `src/lib/products.ts`) until the
family photos are taken (Mom at the oven, the family table, an old family photo); swap the
entries when they exist. Photo rules are in [`DESIGN.md`](DESIGN.md).

## SEO

Per-page metadata + canonicals, Open Graph / Twitter cards, a generated OG image
(`src/app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, a web manifest, semantic HTML,
and JSON-LD structured data (`Bakery`, `WebSite`, product `ItemList`, per-product `Product`,
`BreadcrumbList`) in [`src/lib/schema.ts`](src/lib/schema.ts).
