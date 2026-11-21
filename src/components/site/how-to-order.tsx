import { PREORDER } from "@/lib/products";
import { siteConfig } from "@/lib/site";

const STEPS = [
  {
    h: "Choose your lapis",
    p: "Pick a flavour and a size: whole, half or small.",
  },
  {
    h: "Send it on WhatsApp",
    p: "The order form writes the message for you. We reply to confirm your date.",
  },
  {
    h: `Ships from ${PREORDER.shipsFrom}`,
    p: `${PREORDER.season} orders are baked to order, and the first ones ship out that day. We deliver within ${siteConfig.deliveryArea}; the fee is confirmed on WhatsApp.`,
  },
];

export function HowToOrder() {
  return (
    <section
      aria-labelledby="how-to-order"
      className="mx-auto max-w-[1200px] px-5 pt-4 pb-10 md:px-12 md:pt-6 md:pb-14"
    >
      <h2
        id="how-to-order"
        className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-ink-900 md:text-[40px]"
      >
        How ordering works
      </h2>
      <ol className="mt-6 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-3 md:gap-10">
        {STEPS.map((s, i) => (
          <li key={s.h} className="border-t border-gold-400 py-4">
            <p className="font-display text-[22px] font-semibold text-ink-900">
              <span className="mr-2 text-gold-800">{i + 1}.</span>
              {s.h}
            </p>
            <p className="mt-1 max-w-[40ch] text-base leading-[1.6] text-ink-600">
              {s.p}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
