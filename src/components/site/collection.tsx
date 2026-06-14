"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { ProductCarousel } from "@/components/site/product-carousel";
import { ProductBadge } from "@/components/site/product-badge";
import { PriceTag } from "@/components/site/price-tag";
import { PRODUCTS, fmtK } from "@/lib/products";

export function Collection() {
  const { open } = useOrder();

  return (
    <section
      id="collection"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pt-10 pb-13 md:px-12 md:pt-14 md:pb-18"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-800">
        The collection
      </p>
      <h2 className="mt-1.5 font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-ink-900 md:text-[40px]">
        Four lapis, made to order
      </h2>

      <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-[22px] xl:grid-cols-4">
        {PRODUCTS.map((p, idx) => (
          <li key={p.k} className="flex">
            <article className="flex flex-1 flex-col overflow-hidden rounded-lg border border-[var(--border-soft)] bg-card shadow-md transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:-translate-y-[3px] hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-300">
                <ProductCarousel
                  photos={p.photos}
                  label={p.fullName}
                  priority={idx < 2}
                />
                {p.badge && (
                  <div className="absolute left-3 top-3 z-[2] inline-flex rounded-full bg-[color-mix(in_srgb,var(--cream-50)_94%,transparent)] shadow-sm">
                    <ProductBadge tone={p.badge.tone}>
                      {p.badge.label}
                    </ProductBadge>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-display text-[22px] font-semibold leading-[1.16] text-ink-900">
                  <Link
                    href={`/lapis/${p.k}`}
                    className="rounded-xs transition-colors outline-none hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Lapis Legit
                    <br />
                    <em className="text-blue-500">{p.name}</em>
                  </Link>
                </h3>
                <p className="text-[13px] leading-[1.5] text-ink-500">{p.tag}</p>
                <div className="mt-auto flex items-center justify-between gap-2.5 pt-3">
                  <PriceTag amount={fmtK(p.prices.whole)} size="md" note="/ whole" />
                  <Button variant="cta" size="sm" onClick={() => open(p.k)}>
                    Pre-order
                  </Button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
