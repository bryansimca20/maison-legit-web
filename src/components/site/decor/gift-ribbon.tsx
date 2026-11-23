/**
 * Ties a photo up like a gift: a ribbon down and a ribbon across, each with a thin edge line on both sides,
 * and a bow where they cross. Place it inside a `relative overflow-hidden` photo frame.
 * Colours: --decor-ribbon, --decor-ribbon-dark, --decor-ribbon-edge (set by the theme file).
 */
export function GiftRibbon() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute inset-y-0 right-[24%] w-5 bg-[var(--decor-ribbon)] md:w-[26px]">
        <span className="absolute inset-y-0 inset-x-[3px] border-x border-[var(--decor-ribbon-edge)]" />
      </span>
      <span className="absolute inset-x-0 top-[30%] h-5 bg-[var(--decor-ribbon)] md:h-[26px]">
        <span className="absolute inset-x-0 inset-y-[3px] border-y border-[var(--decor-ribbon-edge)]" />
      </span>
      {/* A point at the crossing; the bow centres its knot on it. */}
      <span className="absolute top-[calc(30%+10px)] right-[calc(24%+10px)] md:top-[calc(30%+13px)] md:right-[calc(24%+13px)]">
        <svg
          viewBox="0 0 100 72"
          className="absolute top-0 left-0 w-[90px] -translate-x-1/2 -translate-y-[48%] drop-shadow-[0_4px_6px_color-mix(in_srgb,var(--ink-900)_30%,transparent)] md:w-[132px]"
        >
          <path d="M47 40 L33 70 L40 66 L45 72 L51 42Z" fill="var(--decor-ribbon-dark)" />
          <path d="M53 40 L67 70 L60 66 L55 72 L49 42Z" fill="var(--decor-ribbon-dark)" />
          <g fill="var(--decor-ribbon)" stroke="var(--decor-ribbon-edge)" strokeWidth={1}>
            <path d="M50 34 C36 6 6 4 6 22 C6 38 30 40 50 34Z" />
            <path d="M50 34 C64 6 94 4 94 22 C94 38 70 40 50 34Z" />
          </g>
          <g fill="none" stroke="var(--decor-ribbon-dark)" strokeWidth={2} opacity={0.6}>
            <path d="M50 34 C38 16 18 14 16 24" />
            <path d="M50 34 C62 16 82 14 84 24" />
          </g>
          <rect
            x="43"
            y="27"
            width="14"
            height="15"
            rx="4"
            fill="var(--decor-ribbon)"
            stroke="var(--decor-ribbon-edge)"
            strokeWidth={1}
          />
        </svg>
      </span>
    </div>
  );
}
