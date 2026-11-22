import Image from "next/image";

import { SITE_IMAGES } from "@/lib/products";

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
  return (
    <section className="bg-blue-500">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 px-5 pt-11 pb-13 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-16 md:px-12 md:pt-18 md:pb-21">
        <div>
          <h2 className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-cream-100 md:text-[40px]">
            Just like she makes it for us.
          </h2>
          <div className="mt-5 flex flex-col">
            {POINTS.map((pt) => (
              <div
                key={pt.h}
                className="border-t border-[var(--hairline-on-dark)] py-4"
              >
                <h3 className="mb-1 font-display text-[20px] font-semibold text-cream-100">
                  {pt.h}
                </h3>
                <p className="max-w-[44ch] text-base leading-[1.6] text-blue-100">
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
        </div>
      </div>
    </section>
  );
}
