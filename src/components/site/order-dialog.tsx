"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  SIZES,
  MAX_ORDER_LINES,
  getProduct,
  fmtK,
  orderTotal,
  nextProductKey,
  buildOrderMessage,
  buildWaLink,
  normalizeWaNational,
  type OrderLine,
  type ProductKey,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PriceTag } from "@/components/site/price-tag";
import { OrderProgress, type OrderStep } from "@/components/site/order-progress";
import { OrderLineRow, type DraftLine } from "@/components/site/order-line-row";
import { OrderSummary } from "@/components/site/order-summary";
import {
  loadOrderDraft,
  saveOrderDraft,
  clearOrderDraft,
} from "@/lib/order-draft";

const FIELD_LABEL =
  "text-sm font-semibold text-ink-800";

// The title names the step the progress bar shows; "sent" means WhatsApp is open, not yet sent.
const TITLES: Record<OrderStep, string> = {
  lapis: "Reserve your lapis",
  details: "Delivery details",
  review: "Review your order",
  sent: "Finish in WhatsApp",
};

const CONTROL = "h-11 w-full rounded-sm text-base md:text-base";

export interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProduct?: ProductKey;
}

export function OrderDialog({
  open,
  onOpenChange,
  initialProduct,
}: OrderDialogProps) {
  // The provider remounts this component (via `key`) on every open, so these initializers run per open.
  // An unfinished order saved in this tab wins over the product that was pressed (owner's call).
  const [saved] = React.useState(loadOrderDraft);
  const [step, setStep] = React.useState<OrderStep>(saved?.step ?? "lapis");
  const [name, setName] = React.useState(saved?.name ?? "");
  const [customerWa, setCustomerWa] = React.useState(saved?.customerWa ?? "");
  const [address, setAddress] = React.useState(saved?.address ?? "");
  const [lines, setLines] = React.useState<DraftLine[]>(() =>
    saved
      ? saved.lines.map((l, i) => ({ ...l, id: i }))
      : [{ id: 0, product: initialProduct ?? "original", size: "whole", qty: 1 }],
  );
  const [tried, setTried] = React.useState(false);
  const nextId = React.useRef(lines.length);

  // Keep the unfinished order in this tab, once the customer has changed something; clear it once sent.
  const draftJson = JSON.stringify({
    lines: lines.map(({ product, size, qty }) => ({ product, size, qty })),
    name,
    customerWa,
    address,
    step,
  });
  const openedWith = React.useRef(draftJson);
  const dirty = React.useRef(saved !== null);
  React.useEffect(() => {
    if (step === "sent") return clearOrderDraft();
    if (draftJson !== openedWith.current) dirty.current = true;
    if (dirty.current) saveOrderDraft(draftJson);
  }, [draftJson, step]);
  const popup = React.useRef<HTMLDivElement>(null);
  // Each step starts at the top of the sheet, not where the last one was scrolled to.
  const goTo = (next: OrderStep) => {
    setStep(next);
    popup.current?.scrollTo({ top: 0 });
  };
  const addButton = React.useRef<HTMLButtonElement>(null);

  const orderLines: OrderLine[] = lines.map((l) => ({
    product: getProduct(l.product),
    size: SIZES.find((s) => s.k === l.size) ?? SIZES[0],
    qty: l.qty,
  }));
  const total = orderTotal(orderLines);

  const updateLine = (id: number, patch: Partial<Omit<DraftLine, "id">>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const addLine = () => {
    if (lines.length >= MAX_ORDER_LINES) return;
    const line: DraftLine = {
      id: nextId.current++,
      product: nextProductKey(lines.map((l) => l.product)),
      size: "whole",
      qty: 1,
    };
    // Render the row now so focus can move into it: the add button may unmount at the cap.
    flushSync(() => setLines((ls) => [...ls, line]));
    const sheet = popup.current;
    sheet
      ?.querySelector<HTMLElement>(`[aria-label="Lapis, line ${lines.length + 1}"]`)
      ?.focus({ preventScroll: true });
    // Scroll to the end of the list so the new line and the add button sit above the pinned total.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sheet?.scrollTo({ top: sheet.scrollHeight, behavior: still ? "auto" : "smooth" });
  };
  const removeLine = (id: number) => {
    // Commit the removal first so the add button exists (it hides at the cap), then keep focus in the form.
    flushSync(() => setLines((ls) => ls.filter((l) => l.id !== id)));
    addButton.current?.focus();
  };

  const digits = normalizeWaNational(customerWa);
  const nameOk = name.trim().length > 1;
  const waOk = digits.length >= 8 && digits.length <= 13;
  // Delivery only: we need enough of an address to send the lapis to.
  const addressOk = address.trim().length >= 10;

  const message = buildOrderMessage({
    lines: orderLines,
    name,
    customerWa,
    address,
  });
  const waLink = buildWaLink(siteConfig.adminWhatsApp, message);

  const review = () => {
    setTried(true);
    if (nameOk && waOk && addressOk) goTo("review");
  };
  const send = () => {
    window.open(waLink, "_blank", "noopener,noreferrer");
    goTo("sent");
  };

  const firstName = name.trim().split(" ")[0] || "friend";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--ink-900)_55%,transparent)]",
            "transition-opacity duration-200 data-closed:opacity-0 data-open:opacity-100",
          )}
        />
        <DialogPrimitive.Popup
          ref={popup}
          className={cn(
            // mobile: bottom sheet
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[94dvh] w-full flex-col overflow-y-auto",
            "rounded-t-[16px] bg-cream-100 px-5 pt-6 pb-7 shadow-xl outline-none",
            // desktop: centered dialog
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-[560px] sm:max-w-[calc(100vw-2rem)]",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[16px] sm:px-8 sm:pt-7 sm:pb-8",
            // motion
            "transition-[transform,opacity] duration-200 ease-[var(--ease-out)]",
            "data-closed:opacity-0 data-closed:translate-y-3 sm:data-closed:translate-y-3 sm:data-closed:-translate-x-1/2",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogPrimitive.Title
                render={<h2 />}
                className="font-display text-[26px] font-semibold leading-[1.1] text-ink-900"
              >
                {TITLES[step]}
              </DialogPrimitive.Title>
              {step === "review" && (
                <DialogPrimitive.Description className="mt-1.5 text-sm text-ink-600">
                  We confirm every order on WhatsApp.
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mt-2 -mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          <div className="mb-3 sm:mb-[18px]">
            <OrderProgress step={step} />
          </div>

          {step === "lapis" ? (
            <div className="flex flex-col">
              <ul className="-mt-3 list-none p-0">
                {lines.map((l, i) => (
                  <OrderLineRow
                    key={l.id}
                    line={l}
                    number={i + 1}
                    canRemove={lines.length > 1}
                    onChange={(patch) => updateLine(l.id, patch)}
                    onRemove={() => removeLine(l.id)}
                  />
                ))}
              </ul>

              {lines.length < MAX_ORDER_LINES && (
                // Sits in the rows' text column, like the next blank line on an order slip.
                <Button
                  ref={addButton}
                  variant="ghost"
                  size="md"
                  className="ml-16 min-h-11 self-start px-3 text-[15px] text-ink-700 hover:text-ink-900"
                  onClick={addLine}
                >
                  <Plus className="size-4" />
                  Add another lapis
                </Button>
              )}

              {/* Total and Next stay pinned to the bottom of the sheet, so they stay in view as lines grow. */}
              <div className="sticky -bottom-7 z-10 -mx-5 -mb-7 mt-3 flex flex-col gap-3 border-t border-[var(--border-soft)] bg-cream-100 px-5 pt-3 pb-7 sm:-bottom-8 sm:-mx-8 sm:-mb-8 sm:mt-4 sm:px-8 sm:pb-8">
                <div className="flex items-center justify-between gap-3">
                  <span className={FIELD_LABEL}>Total</span>
                  <PriceTag amount={fmtK(total)} size="lg" />
                </div>
                <Button
                  variant="cta"
                  size="lg"
                  fullWidth
                  onClick={() => goTo("details")}
                >
                  Next: delivery details
                </Button>
              </div>
            </div>
          ) : (
            <>
              {step === "sent" && (
                // Leads the sheet so the confirmation and its actions are the first thing seen after Send.
                <div className="mb-3 sm:mb-[18px]">
                  <div className="rounded-sm border border-[color-mix(in_srgb,var(--green-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_12%,var(--cream-100))] px-3.5 py-3 text-sm leading-[1.6] text-green-700">
                    Terima kasih, {firstName}. WhatsApp opens with your order
                    written out. Press send and we reply to confirm your date.
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <Button
                      variant="secondary"
                      size="md"
                      className="min-h-11"
                      onClick={() => onOpenChange(false)}
                    >
                      Done
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      className="min-h-11"
                      onClick={() => goTo("details")}
                    >
                      Edit order
                    </Button>
                  </div>
                </div>
              )}
              {/* Review shows the message itself, which already lists every line and the total. */}
              {step !== "review" && <OrderSummary lines={orderLines} />}
            </>
          )}

          {step === "details" && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ml-name" className={FIELD_LABEL}>
                    Full name
                  </Label>
                  <Input
                    id="ml-name"
                    placeholder="e.g. Sari Dewi"
                    value={name}
                    autoComplete="name"
                    aria-invalid={tried && !nameOk}
                    aria-describedby={
                      tried && !nameOk ? "ml-name-error" : undefined
                    }
                    onChange={(e) => setName(e.target.value)}
                    className={CONTROL}
                  />
                  {tried && !nameOk && (
                    <span
                      id="ml-name-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      Please tell us your name.
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ml-wa" className={FIELD_LABEL}>
                    WhatsApp number
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-semibold text-ink-500">
                      +62
                    </span>
                    <Input
                      id="ml-wa"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="812 3456 7890"
                      value={customerWa}
                      aria-invalid={tried && !waOk}
                      aria-describedby={
                        tried && !waOk ? "ml-wa-error" : undefined
                      }
                      onChange={(e) => setCustomerWa(e.target.value)}
                      className={cn(CONTROL, "pl-12")}
                    />
                  </div>
                  {tried && !waOk && (
                    <span
                      id="ml-wa-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      We need a valid number to confirm your order.
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ml-address" className={FIELD_LABEL}>
                  Delivery address
                </Label>
                <Textarea
                  id="ml-address"
                  rows={3}
                  autoComplete="street-address"
                  placeholder="Street, building, area, city"
                  value={address}
                  aria-invalid={tried && !addressOk}
                  aria-describedby={
                    tried && !addressOk
                      ? "ml-address-hint ml-address-error"
                      : "ml-address-hint"
                  }
                  onChange={(e) => setAddress(e.target.value)}
                  className="field-sizing-fixed resize-none rounded-sm text-base focus-visible:ring-ring md:text-base"
                />
                <span id="ml-address-hint" className="text-sm text-ink-600">
                  We deliver within {siteConfig.deliveryArea}. The fee depends
                  on your address, and we confirm it on WhatsApp.
                </span>
                {tried && !addressOk && (
                  <span
                    id="ml-address-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    Please add your full address: street, area and city.
                  </span>
                )}
              </div>

              {/* Pinned to the bottom of the sheet on phones so the actions never scroll away. */}
              <div className="sticky -bottom-7 -mx-5 -mb-7 flex gap-2.5 bg-cream-100 px-5 pt-3 pb-7 sm:static sm:m-0 sm:p-0">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => goTo("lapis")}
                >
                  Back
                </Button>
                <Button variant="cta" size="lg" className="flex-1" onClick={review}>
                  Review order
                </Button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div>
              <pre className="rounded-sm border border-[var(--border-soft)] bg-card px-[18px] py-4 font-sans text-sm leading-[1.7] whitespace-pre-wrap text-ink-800">
                {message}
              </pre>

              {/* Pinned on phones like steps 1 and 2, so Send never sits below the fold. */}
              <div className="sticky -bottom-7 -mx-5 -mb-7 mt-[18px] flex flex-wrap gap-2.5 bg-cream-100 px-5 pt-3 pb-7 sm:static sm:m-0 sm:mt-[18px] sm:p-0">
                <Button variant="cta" size="lg" onClick={send}>
                  Send via WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => goTo("details")}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
