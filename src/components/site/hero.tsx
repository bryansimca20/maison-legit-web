"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import {
  SITE_IMAGES,
  OCCASIONS,
  CURRENT_OCCASION,
  PRICE_FROM,
  PREORDER,
  fmtK,
} from "@/lib/products";

// One entrance on load; reduced motion is handled globally in globals.css.
const ENTER =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-[var(--ease-out)]";

export function Hero() {
  const { open } = useOrder();
  const occasion = OCCASIONS[CURRENT_OCCASION].eyebrow;

  return (
    <section className="relative flex flex-col-reverse md:grid md:min-h-[580px] md:grid-cols-[0.95fr_1.05fr] md:items-stretch">
      <div className="relative z-10 -mt-[76px] px-5 pb-13 md:mt-0 md:self-center md:py-24 md:pr-6 md:pl-[max(48px,calc((100vw-1200px)/2+48px))]">
        {occasion && (
          <p className={`text-sm font-semibold text-gold-800 ${ENTER}`}>
            {occasion}
          </p>
        )}
        <h1
          className={`mt-3.5 font-display text-[42px] leading-[1.04] font-semibold tracking-[-0.02em] text-ink-900 md:text-[64px] ${ENTER}`}
        >
          Lapis legit, baked by hand in Jakarta.
        </h1>
        <p
          className={`mt-4 max-w-[52ch] text-base leading-[1.7] text-ink-600 md:text-[17px] ${ENTER} delay-[60ms]`}
        >
          Mom&apos;s thirty-year family recipe, griddled one layer at a time.
          Small batch, no preservatives, made to order.
        </p>
        <p
          className={`mt-3 text-sm font-semibold text-ink-800 ${ENTER} delay-[60ms]`}
        >
          From IDR {fmtK(PRICE_FROM)} · ships from {PREORDER.shipsFrom}
        </p>
        <div
          className={`mt-7 flex flex-wrap items-center gap-4 ${ENTER} delay-[120ms]`}
        >
          <Button variant="cta" size="lg" onClick={() => open()}>
            Pre-order now
          </Button>
        </div>
      </div>

      <div className="relative h-[370px] md:h-auto">
        <Image
          src={SITE_IMAGES.hero.src}
          alt={SITE_IMAGES.hero.alt}
          fill
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
        />
        <div className="hero-fade pointer-events-none absolute inset-0" />
      </div>
    </section>
  );
}
