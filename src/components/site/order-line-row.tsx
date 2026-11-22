"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PRODUCTS,
  SIZES,
  getProduct,
  fmtK,
  minQty,
  MIN_SMALL_QTY,
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

const ICON_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-sm text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent";

/** "Whole (20 × 20 cm)" → "Whole": the segment shows the name, the accessible name keeps the rest. */
const sizeName = (label: string) => label.split(" (")[0];

interface OrderLineRowProps {
  line: DraftLine;
  /** 1-based, used in accessible names ("Lapis, line 2"). */
  number: number;
  canRemove: boolean;
  onChange: (patch: Partial<Omit<DraftLine, "id">>) => void;
  onRemove: () => void;
}

/**
 * A line of the order, read like a line on an order slip: the lapis as its heading,
 * the three sizes one tap each, then quantity and subtotal.
 */
export function OrderLineRow({
  line,
  number,
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
        <div className="-mt-1.5 flex items-center justify-between gap-1">
          {/* The lapis is the row's heading; it opens the same list a field would. */}
          <Select
            value={line.product}
            onValueChange={(v) => onChange({ product: v as ProductKey })}
          >
            <SelectTrigger
              aria-label={`Lapis, line ${number}`}
              className="-ml-1.5 min-w-0 gap-1 rounded-sm border-transparent px-1.5 font-display text-[21px] font-semibold text-ink-900 hover:bg-cream-300 data-[size=default]:h-11 [&_svg]:text-ink-700"
            >
              <SelectValue>
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

          {canRemove && (
            <button
              type="button"
              aria-label={`Remove line ${number}, ${prod.fullName}`}
              onClick={onRemove}
              className={cn(ICON_BUTTON, "-mr-3")}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="sr-only">Size, line {number}</legend>
          <div className="grid grid-cols-3 gap-1.5">
            {SIZES.map((s) => (
              <label key={s.k} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name={`size-${line.id}`}
                  value={s.k}
                  checked={line.size === s.k}
                  onChange={() =>
                    onChange({
                      size: s.k,
                      qty: Math.max(line.qty, minQty(s.k)),
                    })
                  }
                  aria-label={`${sizeName(s.label)}, ${s.dimensions}, IDR ${fmtK(prod.prices[s.k])}${minQty(s.k) > 1 ? `, minimum ${minQty(s.k)}` : ""}`}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 flex-col items-center justify-center rounded-sm border-[1.5px] border-[var(--border-default)] px-1 py-1.5 text-ink-700 transition-colors hover:bg-cream-200 peer-checked:border-ink-800 peer-checked:bg-ink-800 peer-checked:text-cream-100 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream-100">
                  <span className="text-[15px] leading-tight font-semibold">
                    {sizeName(s.label)}
                  </span>
                  {/* Dimensions in the quieter ink-600; cream on the chosen size. */}
                  <span className="mt-0.5 text-sm leading-tight whitespace-nowrap text-ink-600 [.peer:checked~*_&]:text-cream-200">
                    {s.dimensions}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {line.size === "small" && (
          <p id={`small-min-${line.id}`} className="text-sm text-ink-600">
            Small boxes: minimum {MIN_SMALL_QTY}.
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <div
            role="group"
            aria-label={`Quantity, line ${number}`}
            aria-describedby={
              line.size === "small" ? `small-min-${line.id}` : undefined
            }
            className="-ml-3 inline-flex w-max items-center"
          >
            <button
              type="button"
              aria-label={`Decrease quantity, line ${number}`}
              disabled={line.qty <= minQty(line.size)}
              onClick={() =>
                onChange({ qty: Math.max(minQty(line.size), line.qty - 1) })
              }
              className={cn(ICON_BUTTON, "text-ink-600 hover:text-ink-900")}
            >
              <Minus className="size-4" />
            </button>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="min-w-8 text-center text-base font-bold text-ink-900 tabular-nums"
            >
              {line.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity, line ${number}`}
              disabled={line.qty >= 10}
              onClick={() => onChange({ qty: Math.min(10, line.qty + 1) })}
              className={cn(ICON_BUTTON, "text-ink-600 hover:text-ink-900")}
            >
              <Plus className="size-4" />
            </button>
          </div>
          <PriceTag amount={fmtK(unit * line.qty)} size="md" />
        </div>
      </div>
    </li>
  );
}
