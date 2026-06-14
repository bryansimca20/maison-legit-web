"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";

export function CtaBand() {
  const { open } = useOrder();
  return (
    <section className="bg-[var(--surface-inverse)] px-5 pt-13 pb-14 text-center">
      <h2 className="font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.015em] text-cream-200 md:text-[40px]">
        Taste it for yourself.
      </h2>
      <span className="text-fine mt-2.5 block text-[15px] text-blue-200">
        Pre-orders open for the season — we confirm every slot on WhatsApp.
      </span>
      <div className="mt-6 flex justify-center">
        <Button variant="cta" size="lg" onClick={() => open()}>
          Pre-order now
        </Button>
      </div>
    </section>
  );
}
