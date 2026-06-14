/** Thin top bar advertising the pre-order window. */
export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-2 bg-ink-900 px-4 py-[9px] text-center text-xs font-semibold leading-[1.45] tracking-[0.02em] text-cream-200">
      <span>Pre-order is now open</span>
      <span aria-hidden className="text-gold-500">
        —
      </span>
      <span className="font-medium text-gold-300">
        3-day pre-order · small batch
      </span>
    </div>
  );
}
