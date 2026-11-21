"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PRODUCTS,
  SIZES,
  getProduct,
  fmtK,
  type ProductKey,
  type SizeKey,
} from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceTag } from "@/components/site/price-tag";

/** One editable line of the order while the dialog is open. */
export interface DraftLine {
  id: number;
  product: ProductKey;
  size: SizeKey;
  qty: number;
}

const LABEL = "text-sm font-semibold text-ink-800";
const CONTROL = "h-11 w-full rounded-sm text-base md:text-base";
const STEP_BUTTON =
  "flex size-11 items-center justify-center rounded-xs text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent";

interface OrderLineRowProps {
  line: DraftLine;
  /** 1-based, used in accessible names ("Lapis 2"). */
  number: number;
  /** Visible "Lapis" / "Size" / "Quantity" labels, shown on the first row only. */
  showLabels: boolean;
  canRemove: boolean;
  onChange: (patch: Partial<Omit<DraftLine, "id">>) => void;
  onRemove: () => void;
}

export function OrderLineRow({
  line,
  number,
  showLabels,
  canRemove,
  onChange,
  onRemove,
}: OrderLineRowProps) {
  const prod = getProduct(line.product);
  const unit = prod.prices[line.size];

  return (
    <li
      className={cn(
        "flex items-start gap-3 py-3",
        number > 1 && "border-t border-[var(--border-soft)]",
      )}
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xs bg-amber-200">
        {/* All four stay mounted so switching lapis swaps instantly, with no blank frame. */}
        {PRODUCTS.map((p) => (
          <Image
            key={p.k}
            src={p.photos[0].src}
            alt={p.k === prod.k ? p.photos[0].alt : ""}
            aria-hidden={p.k !== prod.k}
            fill
            sizes="64px"
            className={cn("object-cover", p.k !== prod.k && "opacity-0")}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          {showLabels && (
            <span aria-hidden className={LABEL}>
              Lapis
            </span>
          )}
          <Select
            value={line.product}
            onValueChange={(v) => onChange({ product: v as ProductKey })}
          >
            <SelectTrigger aria-label={`Lapis ${number}`} className={CONTROL}>
              <SelectValue>
                {/* Short name in the closed field so it fits beside the photo; the list shows full names. */}
                {(v: string | null) =>
                  v ? getProduct(v as ProductKey).name : ""
                }
              </SelectValue>
            </SelectTrigger>
            {/* Plain dropdown below the field: the align-with-trigger mode can overflow on phones. */}
            <SelectContent alignItemWithTrigger={false}>
              {PRODUCTS.map((p) => (
                <SelectItem key={p.k} value={p.k}>
                  {p.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          {showLabels && (
            <span aria-hidden className={LABEL}>
              Size
            </span>
          )}
          <Select
            value={line.size}
            onValueChange={(v) => onChange({ size: v as SizeKey })}
          >
            <SelectTrigger aria-label={`Size ${number}`} className={CONTROL}>
              <SelectValue>
                {/* Price lives in the list and the line subtotal, so the closed field never truncates. */}
                {(v: string | null) =>
                  (SIZES.find((x) => x.k === v) ?? SIZES[0]).label
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {SIZES.map((s) => (
                <SelectItem key={s.k} value={s.k}>
                  {s.label}, IDR {fmtK(prod.prices[s.k])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          {showLabels && (
            <span aria-hidden className={LABEL}>
              Quantity
            </span>
          )}
          <div className="flex items-center justify-between gap-3">
            <div
              role="group"
              aria-label={`Quantity ${number}`}
              className="inline-flex w-max items-center rounded-sm border-[1.5px] border-[var(--border-default)] bg-card"
            >
              <button
                type="button"
                aria-label={`Decrease quantity ${number}`}
                disabled={line.qty <= 1}
                onClick={() => onChange({ qty: Math.max(1, line.qty - 1) })}
                className={STEP_BUTTON}
              >
                <Minus className="size-4" />
              </button>
              <span
                aria-live="polite"
                aria-atomic="true"
                className="min-w-10 text-center text-base font-bold text-ink-900"
              >
                {line.qty}
              </span>
              <button
                type="button"
                aria-label={`Increase quantity ${number}`}
                disabled={line.qty >= 10}
                onClick={() => onChange({ qty: Math.min(10, line.qty + 1) })}
                className={STEP_BUTTON}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <PriceTag amount={fmtK(unit * line.qty)} size="sm" />
          </div>
        </div>
      </div>

      {canRemove && (
        <button
          type="button"
          aria-label={`Remove ${prod.fullName}`}
          onClick={onRemove}
          className="-mt-1 -mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <X className="size-4" />
        </button>
      )}
    </li>
  );
}
