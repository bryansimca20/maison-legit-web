"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { ProductBadge } from "@/components/site/product-badge";
import { PriceTag } from "@/components/site/price-tag";
import { PRODUCTS, fmtK } from "@/lib/products";

export function Collection() {
  const { open } = useOrder();

  return (
    <section
      id="collection"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pt-6 pb-13 md:px-12 md:pt-8 md:pb-18"
    >
      <h2 className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-ink-900 md:text-[40px]">
        Four lapis, made to order
      </h2>

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

                <div className="flex flex-1 flex-col gap-1.5 pt-4">
                  <h3 className="font-display text-[24px] font-semibold leading-[1.16] text-ink-900">
                    <Link
                      href={`/lapis/${p.k}`}
                      className="rounded-xs outline-none transition-colors after:absolute after:inset-0 after:z-[1] after:content-[''] hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-ink-600">{p.tag}</p>
                  <div className="mt-auto flex items-center justify-between gap-2.5 pt-3">
                    <PriceTag amount={fmtK(p.prices.whole)} size="md" note="/ whole" />
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
    </section>
  );
}
