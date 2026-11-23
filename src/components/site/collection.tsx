"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { ProductBadge } from "@/components/site/product-badge";
import { PriceTag } from "@/components/site/price-tag";
import { CardFrame } from "@/components/site/decor/card-frame";
import { Starburst } from "@/components/site/decor/starburst";
import { PRODUCTS, fmtK } from "@/lib/products";
import { hasDecor } from "@/lib/occasion";
import { cn } from "@/lib/utils";

export function Collection() {
  const { open } = useOrder();
  const card = hasDecor("cardFrame");
  const stars = hasDecor("starbursts");

  return (
    // Full-width ground for the season's colour; the content keeps its max-width container.
    <section
      id="collection"
      className={cn(
        "scroll-mt-24 bg-products [--ring:var(--products-ring)]",
        // This block's own button colours (the tile buttons use the plain cta variant).
        "[--action:var(--products-action)] [--action-hover:var(--products-action-hover)] [--action-fg:var(--products-action-fg)]",
        card && "decor-giftwrap relative",
      )}
    >
      {card && <CardFrame />}
      <div
        className={cn(
          "mx-auto max-w-[1200px]",
          // The card frame needs room inside its line.
          card
            ? "relative z-10 px-7 pt-11 pb-14 md:px-12 md:pt-16 md:pb-22"
            : "px-5 pt-6 pb-13 md:px-12 md:pt-8 md:pb-18",
        )}
      >
        <div className={cn(stars && "flex items-center justify-between gap-4")}>
          {/* Solid ground behind the heading, so the gift-wrap never sits under it. */}
          <h2 className="bg-products font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-products-heading md:text-[40px]">
            Four lapis, made to order
          </h2>
          {stars && (
            <span aria-hidden className="hidden items-center gap-3.5 sm:flex">
              <Starburst size={14} className="text-products-heading" />
              <Starburst size={9} className="text-[var(--decor-star-light)]" />
              <Starburst size={18} className="text-products-heading" />
              <Starburst size={10} className="text-products-heading" />
            </span>
          )}
        </div>

        <ul className="mt-6 grid list-none grid-cols-1 gap-x-[22px] gap-y-10 p-0 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p, idx) => {
            const photo = p.heroPhoto;
            return (
              <li key={p.k} className="flex">
                {/* The title link stretches over the whole tile; the button sits above it. */}
                <article className="group relative flex flex-1 flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-amber-200">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      priority={idx < 2}
                      sizes="(min-width: 1280px) 270px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                    />
                    {p.badge && (
                      <div className="absolute left-3 top-3 z-[2] inline-flex rounded-xs bg-cream-50">
                        <ProductBadge tone={p.badge.tone}>
                          {p.badge.label}
                        </ProductBadge>
                      </div>
                    )}
                  </div>

                  {/* Solid ground under the text, so a seasonal pattern never sits behind it. */}
                  <div className="flex flex-1 flex-col gap-1.5 bg-products pt-4">
                    <h3 className="font-display text-[24px] font-semibold leading-[1.16] text-products-name">
                      <Link
                        href={`/lapis/${p.k}`}
                        className="rounded-xs outline-none transition-colors after:absolute after:inset-0 after:z-[1] after:content-[''] hover:text-products-name-hover focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-[15px] leading-[1.5] text-products-text">{p.tag}</p>
                    <div className="mt-auto flex items-center justify-between gap-2.5 pt-3">
                      <PriceTag amount={fmtK(p.prices.whole)} size="md" tone="products" note="/ whole" />
                      <Button
                        variant="cta"
                        size="sm"
                        className="z-10"
                        onClick={() => open(p.k)}
                      >
                        Pre-order
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
