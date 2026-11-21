"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";
import { PREORDER } from "@/lib/products";

export function CtaBand() {
  const { open } = useOrder();
  return (
    <section className="bg-[var(--surface-inverse)]">
      <div className="mx-auto max-w-[1200px] px-5 pt-13 pb-14 md:px-12">
        <h2 className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-cream-200 md:text-[40px]">
          Order a lapis from Mom&apos;s kitchen.
        </h2>
        <p className="mt-2.5 text-base text-cream-100">
          {PREORDER.season} orders ship from {PREORDER.shipsFrom}. We confirm
          every order on WhatsApp.
        </p>
        <div className="mt-6">
          <Button variant="cta" size="lg" onClick={() => open()}>
            Pre-order now
          </Button>
        </div>
      </div>
    </section>
  );
}
