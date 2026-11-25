"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { PRODUCTS, PRICE_FROM, PREORDER, fmtK } from "@/lib/products";
import { currentOccasion, hasDecor } from "@/lib/occasion";
import { cn } from "@/lib/utils";
import { Starburst } from "@/components/site/decor/starburst";
import { LineBow } from "@/components/site/decor/line-bow";

// One entrance on load; reduced motion is handled globally in globals.css.
const ENTER =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-[var(--ease-out)]";

const SLIDES = PRODUCTS.map((p) => p.heroPhoto);

export function Hero() {
  const { open } = useOrder();
  const occasion = currentOccasion.eyebrow;
  const stars = hasDecor("starbursts");

  return (
    // The hero is the first screen below the bar and header, so its button always shows: on phones the bar is one
    // line (about 6.375rem with the header), under 350px it wraps to two (8rem), from md 7rem.
    <section className="relative flex h-[calc(100svh-6.875rem)] min-h-100 flex-col max-[349px]:h-[calc(100svh-8.5rem)] md:block md:h-[calc(100svh-7.625rem)] md:min-h-140">
      <div className="relative min-h-0 flex-1 bg-amber-200 md:absolute md:inset-0">
        <HeroSlideshow slides={SLIDES} />
      </div>

      <div className="relative z-10 mx-5 -mt-11 mb-4 rounded-xs bg-hero-panel p-5 [--ring:var(--hero-panel-ring)] md:absolute md:bottom-16 md:left-[max(48px,calc((100vw-1200px)/2+48px))] md:m-0 md:w-[580px] md:p-11">
        {occasion && (
          <p
            className={cn(
              "text-sm font-semibold text-hero-panel-eyebrow",
              stars && "flex items-center gap-2",
              ENTER,
            )}
          >
            {stars && <Starburst size={12} />}
            {occasion}
          </p>
        )}
        <h1
          className={`mt-2.5 font-display text-[36px] leading-[1.04] font-semibold tracking-[-0.02em] text-hero-panel-heading first:mt-0 md:mt-3.5 md:text-[64px] ${ENTER}`}
        >
          Lapis legit, baked by hand in Jakarta.
        </h1>
        {/* Below md the card stays compact so the photo above it is the larger part (DESIGN.md "Hero"). */}
        <p
          className={`mt-4 hidden max-w-[52ch] text-base leading-[1.7] text-hero-panel-text md:block md:text-[17px] ${ENTER} delay-[60ms]`}
        >
          Mom&apos;s thirty-year family recipe, baked one layer at a time.
          Small batch, no preservatives, made to order.
        </p>
        <p
          className={`mt-2 text-sm font-semibold text-hero-panel-fact md:mt-3 ${ENTER} delay-[60ms]`}
        >
          From IDR {fmtK(PRICE_FROM)}. Ships from {PREORDER.shipsFrom}.
        </p>
        <div
          className={`mt-3.5 flex flex-wrap items-center gap-4 md:mt-7 ${ENTER} delay-[120ms]`}
        >
          <Button
            variant="ctaOnBlock"
            size="lg"
            className="max-md:px-[26px] max-md:py-[13px] max-md:text-[15px]"
            onClick={() => open()}
          >
            Pre-order now
          </Button>
        </div>
        {/* Last child, so the heading's first:mt-0 still works; absolute, so its place in the order doesn't show. */}
        {hasDecor("heroBow") && (
          <LineBow className="absolute top-4 right-4 w-10 text-hero-panel-text md:top-6 md:right-[30px] md:w-[72px]" />
        )}
      </div>
    </section>
  );
}
