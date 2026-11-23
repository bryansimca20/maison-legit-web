/** A bow drawn as a single line (Christmas card theme). Size it by width; colour comes from `currentColor`. */
export function LineBow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 72"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 30 C40 6 12 4 10 20 C8 34 34 35 50 30" />
      <path d="M50 30 C60 6 88 4 90 20 C92 34 66 35 50 30" />
      <ellipse cx="50" cy="31" rx="5.5" ry="4.5" />
      <path d="M47 35 C43 47 37 58 28 68" />
      <path d="M53 35 C57 47 63 58 72 68" />
    </svg>
  );
}
