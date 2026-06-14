import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  sm: "text-[15px]",
  md: "text-[20px]",
  lg: "text-[28px]",
} as const;

interface PriceTagProps {
  amount: string;
  currency?: string;
  size?: keyof typeof SIZE_CLASS;
  tone?: "default" | "onDark";
  note?: string;
  className?: string;
}

/** "IDR 890k" in the house style — small caps currency, heavy amount. */
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
        tone === "onDark" ? "text-cream-200" : "text-ink-900",
        SIZE_CLASS[size],
        className,
      )}
    >
      <span
        className={cn(
          "text-[0.62em] font-bold tracking-[0.08em] -translate-y-[0.1em]",
          tone === "onDark" ? "text-gold-400" : "text-ink-500",
        )}
      >
        {currency}
      </span>
      <span className="font-extrabold tracking-[-0.01em]">{amount}</span>
      {note ? (
        <span className="text-[0.6em] font-semibold text-ink-500">{note}</span>
      ) : null}
    </span>
  );
}
