import { cn } from "@/lib/utils";

/** Eight-point starburst (Christmas card theme). Colour comes from `currentColor`, so set it with a text utility. */
export function Starburst({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12.00 0.00L13.22 9.04L20.49 3.51L14.96 10.78L24.00 12.00L14.96 13.22L20.49 20.49L13.22 14.96L12.00 24.00L10.78 14.96L3.51 20.49L9.04 13.22L0.00 12.00L9.04 10.78L3.51 3.51L10.78 9.04Z" />
    </svg>
  );
}
