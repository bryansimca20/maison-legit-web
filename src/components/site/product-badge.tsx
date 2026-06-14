import { cn } from "@/lib/utils";
import type { BadgeTone } from "@/lib/products";

const TONE: Record<BadgeTone, string> = {
  gold: "bg-transparent text-gold-800 border-gold-400",
  red: "bg-red-100 text-red-700 border-transparent",
  blue: "bg-blue-100 text-blue-700 border-transparent",
  green: "bg-[color-mix(in_srgb,var(--green-500)_16%,white)] text-green-700 border-transparent",
  solid: "bg-ink-900 text-cream-200 border-transparent",
};

/** Small status pill — "Best seller", "Limited slot", "New". */
export function ProductBadge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.4em] rounded-full border px-[11px] py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.12em]",
        TONE[tone],
      )}
    >
      {children}
    </span>
  );
}
