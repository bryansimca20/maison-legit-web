import Image from "next/image";

import { cn } from "@/lib/utils";
import { fmtK, orderTotal, type OrderLine } from "@/lib/products";
import { PriceTag } from "@/components/site/price-tag";

/** Compact read-only list of the order, shown on the delivery, review and sent steps. */
export function OrderSummary({ lines }: { lines: OrderLine[] }) {
  return (
    <div className="mb-3 rounded-xs border border-[var(--border-soft)] bg-card sm:mb-[18px]">
      <ul className="list-none p-0">
        {lines.map((l, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-3 p-2.5",
              i > 0 && "border-t border-[var(--border-soft)]",
            )}
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded-xs bg-amber-200">
              <Image
                src={l.product.photos[0].src}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[17px] font-semibold leading-[1.15] text-ink-900">
                {l.product.fullName}
              </p>
              <p className="mt-0.5 text-sm text-ink-600">
                {l.size.label}
                <span className="block">Quantity {l.qty}</span>
              </p>
            </div>
            <PriceTag
              amount={fmtK(l.product.prices[l.size.k] * l.qty)}
              size="sm"
            />
          </li>
        ))}
      </ul>
      {lines.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border-soft)] px-2.5 py-2">
          <span className="text-sm font-semibold text-ink-800">Total</span>
          <PriceTag amount={fmtK(orderTotal(lines))} size="sm" />
        </div>
      )}
    </div>
  );
}
