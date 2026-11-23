import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  sm: "text-[15px]",
  md: "text-[20px]",
  lg: "text-[28px]",
} as const;

const TONE = {
  default: { amount: "text-ink-900", currency: "text-ink-600", note: "text-ink-600" },
  onDark: { amount: "text-cream-200", currency: "text-gold-400", note: "text-ink-600" },
  products: { amount: "text-products-price", currency: "text-products-unit", note: "text-products-unit" },
} as const;

interface PriceTagProps {
  amount: string;
  currency?: string;
  size?: keyof typeof SIZE_CLASS;
  /** `products`: the home product section's seasonal roles. */
  tone?: "default" | "onDark" | "products";
  note?: string;
  className?: string;
}

/** "IDR 890k" in the house style: small currency code, heavy amount. */
export function PriceTag({
  amount,
  currency = "IDR",
  size = "md",
  tone = "default",
  note,
  className,
}: PriceTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.35em] font-sans whitespace-nowrap",
        TONE[tone].amount,
        SIZE_CLASS[size],
        className,
      )}
    >
      <span
        className={cn(
          "text-[0.62em] font-bold tracking-[0.08em] -translate-y-[0.1em]",
          TONE[tone].currency,
        )}
      >
        {currency}
      </span>
      <span className="font-extrabold tracking-[-0.01em]">{amount}</span>
      {note ? (
        <span className={cn("text-[0.6em] font-semibold", TONE[tone].note)}>{note}</span>
      ) : null}
    </span>
  );
}
