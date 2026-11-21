import { PREORDER } from "@/lib/products";

/** Thin top bar advertising the pre-order window. */
export function AnnouncementBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 bg-ink-900 px-4 py-[9px] text-center text-xs font-semibold leading-[1.45] tracking-[0.02em] text-cream-200">
      <span>{PREORDER.season} pre-orders are open</span>
      <span aria-hidden className="hidden text-gold-500 sm:inline">
        ·
      </span>
      <span className="font-medium text-gold-300">
        Orders ship from {PREORDER.shipsFrom}
      </span>
    </div>
  );
}
