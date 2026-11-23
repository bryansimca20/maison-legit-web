/** A thin frame line inset from a section's edges, like a printed card. The parent must be `relative`. */
export function CardFrame() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[10px] rounded-[2px] border-[1.5px] border-[var(--decor-frame)] md:inset-[18px]"
    />
  );
}
