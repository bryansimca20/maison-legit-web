import Image from "next/image";

import { SITE_IMAGES } from "@/lib/products";
import { hasDecor } from "@/lib/occasion";
import { cn } from "@/lib/utils";
import { GiftRibbon } from "@/components/site/decor/gift-ribbon";
import { Starburst } from "@/components/site/decor/starburst";

const POINTS = [
  {
    h: "A thirty-year recipe",
    p: "Mom's own, unchanged since the first New Year she baked it. She is still the baker.",
  },
  {
    h: "Baked by hand",
    p: "Each layer is baked one at a time. A whole lapis takes an afternoon.",
  },
  {
    h: "No preservatives, ever",
    p: "Butter, eggs, spice and patience. Nothing else.",
  },
];

export function FeatureBand() {
  const stars = hasDecor("starbursts");

  return (
    <section className="relative bg-band [--ring:var(--band-ring)]">
      {stars && (
        // A few scattered in the band's margins, desktop only (DESIGN.md "Christmas").
        <div aria-hidden className="hidden md:block">
          <Starburst size={16} className="absolute top-11 left-10 text-band-heading" />
          <Starburst size={22} className="absolute right-13 bottom-9 text-band-heading" />
          <Starburst size={12} className="absolute top-10 right-24 text-[var(--decor-star-light)]" />
          <Starburst size={14} className="absolute bottom-7.5 left-[46%] text-[var(--decor-star-light)]" />
        </div>
      )}
      <div
        className={cn(
          "mx-auto grid max-w-[1200px] grid-cols-1 gap-7 px-5 pt-11 pb-13 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-16 md:px-12 md:pt-18 md:pb-21",
          stars && "relative z-10",
        )}
      >
        <div>
          <h2 className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-band-heading md:text-[40px]">
            Just like she makes it for us.
          </h2>
          <div className="mt-5 flex flex-col">
            {POINTS.map((pt) => (
              <div
                key={pt.h}
                className="border-t border-band-rule py-4"
              >
                <h3
                  className={cn(
                    "mb-1 font-display text-[20px] font-semibold text-band-heading",
                    stars && "flex items-center gap-2.5",
                  )}
                >
                  {stars && <Starburst size={14} />}
                  {pt.h}
                </h3>
                <p className="max-w-[44ch] text-base leading-[1.6] text-band-text">
                  {pt.p}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs">
          <Image
            src={SITE_IMAGES.feature.src}
            alt={SITE_IMAGES.feature.alt}
            fill
            sizes="(min-width: 1200px) 500px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          {hasDecor("giftRibbon") && <GiftRibbon />}
        </div>
      </div>
    </section>
  );
}
