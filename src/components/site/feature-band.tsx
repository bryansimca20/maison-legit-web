import Image from "next/image";

import { SITE_IMAGES } from "@/lib/products";

const POINTS = [
  {
    h: "A thirty-year recipe",
    p: "Mom's own, unchanged since the first New Year she baked it. She is still the baker.",
  },
  {
    h: "Baked by hand, in small batches",
    p: "Each layer is griddled one at a time. A whole lapis takes an afternoon.",
  },
  {
    h: "No preservatives, ever",
    p: "Butter, eggs, spice and patience. Nothing else.",
  },
];

export function FeatureBand() {
  return (
    <section className="bg-feature">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 px-5 pt-11 pb-13 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-16 md:px-12 md:pt-18 md:pb-21">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-500">
            Made with care
          </p>
          <h2 className="mt-1.5 font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-cream-200 md:text-[40px]">
            Just like she makes it for us.
          </h2>
          <div className="mt-5 flex flex-col">
            {POINTS.map((pt) => (
              <div
                key={pt.h}
                className="border-t border-[var(--hairline-on-dark)] py-4"
              >
                <h3 className="mb-1 font-display text-[19px] font-semibold text-cream-200">
                  {pt.h}
                </h3>
                <p className="max-w-[44ch] text-sm leading-[1.6] text-[color-mix(in_srgb,var(--cream-300)_72%,transparent)]">
                  {pt.p}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
          <Image
            src={SITE_IMAGES.feature.src}
            alt={SITE_IMAGES.feature.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
