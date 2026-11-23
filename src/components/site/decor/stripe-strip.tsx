/** A ribbon-like strip of vertical stripes between two sections. Colours: --decor-stripe-a/-b/-rule. */
export function StripeStrip() {
  return (
    <div
      aria-hidden
      className="h-[52px] border-y-[5px] border-[var(--decor-stripe-rule)] bg-[repeating-linear-gradient(90deg,var(--decor-stripe-a)_0_30px,var(--decor-stripe-b)_30px_60px)]"
    />
  );
}
