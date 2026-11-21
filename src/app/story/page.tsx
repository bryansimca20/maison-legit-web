import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_IMAGES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "For thirty years, our mother has baked lapis legit for the people she loves — the recipe has never changed, and she is still the baker. Now we are sharing it with you.",
  alternates: { canonical: "/story" },
  openGraph: {
    type: "article",
    title: "Our Story · Maison Legit",
    description:
      "Mom's thirty-year lapis legit recipe, baked by hand for every celebration — now shared with you.",
    url: "/story",
  },
};

const OCCASION_ROWS = [
  { name: "New Year", note: "the first slice of the year" },
  { name: "Lunar New Year", note: "baked for reunion dinner" },
  { name: "Eid Al-Fitr", note: "shared with friends who celebrate" },
  { name: "Christmas", note: "wrapped as gifts for neighbours" },
];

export default function StoryPage() {
  return (
    <article>
      <section className="mx-auto max-w-[760px] px-5 pt-11 pb-3 text-left md:px-12 md:pt-18 md:pb-4 md:text-center">
        <h1 className="font-display text-[42px] leading-[1.04] font-semibold tracking-[-0.02em] text-ink-900 md:text-[64px]">
          It began in Mom&apos;s kitchen.
        </h1>
        <p className="mt-4 max-w-[52ch] text-base leading-[1.7] text-ink-500 md:mx-auto md:text-[17px]">
          For thirty years, our mother has baked lapis legit for the people she
          loves. The recipe has never changed, and she is still the baker.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-5 pb-13 md:px-12">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-[22px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-amber-200">
            <Image
              src={SITE_IMAGES.storyLayers.src}
              alt={SITE_IMAGES.storyLayers.alt}
              fill
              priority
              sizes="(min-width: 1200px) 552px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-amber-200">
            <Image
              src={SITE_IMAGES.storyWhole.src}
              alt={SITE_IMAGES.storyWhole.alt}
              fill
              priority
              sizes="(min-width: 1200px) 552px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[640px] px-5 md:px-12">
        <p className="mb-[22px] text-base leading-[1.8] text-ink-800">
          Lapis legit is not something you hurry. Each of its forty layers is
          poured, griddled and pressed by hand, one at a time. A single lapis
          means a whole afternoon at the oven. That is how Mom learned it, and
          that is still the only way she will make it.
        </p>
        <h2 className="mt-[38px] mb-4 font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-ink-900 md:text-[40px]">
          Baked for every celebration
        </h2>
        <p className="mb-[22px] text-base leading-[1.8] text-ink-800">
          Whenever our family gathered, her lapis was on the table. It marked
          the turning of every year, and somewhere along the way it became the
          celebration itself.
        </p>

        <ul className="mt-6 list-none p-0">
          {OCCASION_ROWS.map((o) => (
            <li
              key={o.name}
              className="flex items-baseline gap-3.5 py-[13px]"
            >
              <span className="font-display text-[22px] font-semibold italic whitespace-nowrap text-ink-900 md:text-[25px]">
                {o.name}
              </span>
              <span aria-hidden className="occ-leader" />
              <span className="text-right text-[13px] leading-[1.5] text-ink-500 md:text-sm">
                {o.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-8 pb-13 md:px-12">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-[22px]">
          {[SITE_IMAGES.storyPlum, SITE_IMAGES.storyChocolate].map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-amber-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1200px) 552px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-2.5 pb-8 md:px-12">
        <blockquote className="mx-auto max-w-[22ch] py-3 text-center font-display text-[26px] leading-[1.35] font-medium italic text-ink-900 md:text-[34px]">
          She baked it for her kids. Now she bakes it for yours.
        </blockquote>
        <div className="mx-auto mt-[18px] h-px w-14 bg-gold-500" />
      </section>

      <section className="mx-auto max-w-[640px] px-5 pb-13 md:px-12">
        <h2 className="mb-4 font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-ink-900 md:text-[40px]">
          Now, shared with you
        </h2>
        <p className="mb-[22px] text-base leading-[1.8] text-ink-800">
          We are sharing the joy and the richness of the same homemade lapis
          legit, made the way it has always been made for us: with care, no
          preservatives, baked only to order.
        </p>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/story" },
        ])}
      />
    </article>
  );
}
