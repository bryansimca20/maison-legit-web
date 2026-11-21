import { PREORDER } from "@/lib/products";

/** Thin top bar advertising the pre-order window. */
export function AnnouncementBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 bg-ink-900 px-4 py-2 text-center text-sm font-semibold leading-[1.45] text-cream-200">
      <span>{PREORDER.season} pre-orders are open.</span>
      <span className="font-medium text-gold-300">
        Orders ship from {PREORDER.shipsFrom}.
      </span>
    </div>
  );
}
