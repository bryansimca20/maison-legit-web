"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { ProductCarousel } from "@/components/site/product-carousel";
import { ProductBadge } from "@/components/site/product-badge";
import { PriceTag } from "@/components/site/price-tag";
import { SIZES, fmtK, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { open } = useOrder();

  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-6 pb-14 md:px-12 md:pt-10 md:pb-18">
      <nav aria-label="Breadcrumb" className="text-xs text-ink-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-blue-700">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-ink-300">
            /
          </li>
          <li>
            <Link
              href="/#collection"
              className="transition-colors hover:text-blue-700"
            >
              The collection
            </Link>
          </li>
          <li aria-hidden className="text-ink-300">
            /
          </li>
          <li aria-current="page" className="text-ink-700">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 md:mt-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cream-300 shadow-lg md:aspect-square">
          <ProductCarousel photos={product.photos} label={product.fullName} priority />
          {product.badge && (
            <div className="absolute left-3 top-3 z-[2] inline-flex rounded-full bg-[color-mix(in_srgb,var(--cream-50)_94%,transparent)] shadow-sm">
              <ProductBadge tone={product.badge.tone}>
                {product.badge.label}
              </ProductBadge>
            </div>
          )}
        </div>

        <div className="md:self-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-800">
            Lapis Legit
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-ink-900 md:text-[52px]">
            <em className="text-blue-500">{product.name}</em>
          </h1>
          <p className="mt-3 max-w-[46ch] text-base leading-[1.7] text-ink-600">
            {product.description}
          </p>

          <dl className="mt-7">
            {SIZES.map((s) => (
              <div
                key={s.k}
                className="flex items-center justify-between gap-4 border-t border-[var(--border-soft)] py-3.5"
              >
                <dt className="text-sm text-ink-700">{s.label}</dt>
                <dd>
                  <PriceTag amount={fmtK(product.prices[s.k])} size="sm" />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button variant="cta" size="lg" onClick={() => open(product.k)}>
              Pre-order now
            </Button>
            <span className="text-fine text-[15px] text-ink-500">
              we confirm your slot on WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
