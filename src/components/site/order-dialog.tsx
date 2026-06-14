"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  PRODUCTS,
  SIZES,
  getProduct,
  fmtK,
  buildOrderMessage,
  buildWaLink,
  normalizeWaNational,
  type ProductKey,
  type SizeKey,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceTag } from "@/components/site/price-tag";

type Step = "form" | "review" | "sent";

const FIELD_LABEL =
  "text-[12px] font-bold uppercase tracking-[0.08em] text-ink-500";

const CONTROL = "h-11 w-full rounded-md text-base md:text-base";

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
  // The provider remounts this component (via `key`) on every open, so these
  // initializers reset the form each time it is opened.
  const [step, setStep] = React.useState<Step>("form");
  const [name, setName] = React.useState("");
  const [customerWa, setCustomerWa] = React.useState("");
  const [product, setProduct] = React.useState<ProductKey>(
    initialProduct ?? "original",
  );
  const [size, setSize] = React.useState<SizeKey>("whole");
  const [qty, setQty] = React.useState(1);
  const [tried, setTried] = React.useState(false);

  const prod = getProduct(product);
  const sizeDef = SIZES.find((s) => s.k === size) ?? SIZES[0];
  const unit = prod.prices[size];
  const total = unit * qty;

  const digits = normalizeWaNational(customerWa);
  const nameOk = name.trim().length > 1;
  const waOk = digits.length >= 8 && digits.length <= 13;

  const message = buildOrderMessage({
    product: prod,
    size: sizeDef,
    qty,
    name,
    customerWa,
    total,
  });
  const waLink = buildWaLink(siteConfig.adminWhatsApp, message);

  const review = () => {
    setTried(true);
    if (nameOk && waOk) setStep("review");
  };
  const send = () => {
    window.open(waLink, "_blank", "noopener,noreferrer");
    setStep("sent");
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
          className={cn(
            // mobile: bottom sheet
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[94dvh] w-full flex-col overflow-y-auto",
            "rounded-t-[26px] bg-cream-100 px-5 pt-6 pb-7 shadow-xl outline-none",
            // desktop: centered dialog
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-[560px] sm:max-w-[calc(100vw-2rem)]",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[26px] sm:px-8 sm:pt-7 sm:pb-8",
            // motion
            "transition-[transform,opacity] duration-200 ease-[var(--ease-out)]",
            "data-closed:opacity-0 data-closed:translate-y-3 sm:data-closed:translate-y-3 sm:data-closed:-translate-x-1/2",
          )}
        >
          {/* gold-leaf seam */}
          <div className="gold-seam pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[26px]" />

          <div className="mb-[18px] flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-800">
                Pre-order
              </p>
              <DialogPrimitive.Title
                render={<h2 />}
                className="mt-1.5 font-display text-[26px] font-semibold leading-[1.1] text-ink-900"
              >
                Reserve your lapis
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1.5 text-fine text-sm text-ink-500">
                Small batch — limited slot · we confirm your slot on WhatsApp
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          {step === "form" && (
            <div className="flex flex-col gap-4">
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
                      className="text-xs text-destructive"
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
                      className="text-xs text-destructive"
                    >
                      We need a valid number to confirm your order.
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label className={FIELD_LABEL}>Lapis</Label>
                  <Select
                    value={product}
                    onValueChange={(v) => setProduct(v as ProductKey)}
                  >
                    <SelectTrigger className={CONTROL}>
                      <SelectValue>
                        {(v: string | null) =>
                          v ? getProduct(v as ProductKey).fullName : ""
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCTS.map((p) => (
                        <SelectItem key={p.k} value={p.k}>
                          {p.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className={FIELD_LABEL}>Size</Label>
                  <Select
                    value={size}
                    onValueChange={(v) => setSize(v as SizeKey)}
                  >
                    <SelectTrigger className={CONTROL}>
                      <SelectValue>
                        {(v: string | null) => {
                          const s =
                            SIZES.find((x) => x.k === v) ?? SIZES[0];
                          return `${s.label} — IDR ${fmtK(prod.prices[s.k])}`;
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {SIZES.map((s) => (
                        <SelectItem key={s.k} value={s.k}>
                          {s.label} — IDR {fmtK(prod.prices[s.k])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span id="ml-qty-label" className={FIELD_LABEL}>
                  Quantity
                </span>
                <div
                  role="group"
                  aria-labelledby="ml-qty-label"
                  className="inline-flex w-max items-center rounded-full border-[1.5px] border-[var(--border-default)] bg-card"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span
                    aria-live="polite"
                    aria-atomic="true"
                    className="min-w-10 text-center text-base font-bold text-ink-900"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={qty >= 10}
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="flex size-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-0.5 flex items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-4">
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-500">
                  Total
                </span>
                <PriceTag amount={fmtK(total)} size="lg" />
              </div>

              <Button variant="cta" size="lg" fullWidth onClick={review}>
                Review order
              </Button>
            </div>
          )}

          {step !== "form" && (
            <div>
              <pre className="rounded-md border border-[var(--border-soft)] border-l-[3px] border-l-gold-400 bg-card px-[18px] py-4 font-sans text-sm leading-[1.7] whitespace-pre-wrap text-ink-800">
                {message}
              </pre>

              {step === "review" && (
                <div className="mt-[18px] flex flex-wrap gap-2.5">
                  <Button variant="cta" size="lg" onClick={send}>
                    Send via WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep("form")}
                  >
                    Back
                  </Button>
                </div>
              )}

              {step === "sent" && (
                <div>
                  <div className="mt-3.5 flex items-start gap-2.5 rounded-md border border-[color-mix(in_srgb,var(--green-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_12%,var(--cream-100))] px-3.5 py-3 text-[13.5px] leading-[1.6] text-green-700">
                    Terima kasih, {firstName} — WhatsApp should now open with your
                    order ready. Just press send, and we will confirm your slot.
                  </div>
                  <div className="mt-[18px] flex flex-wrap gap-2.5">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => onOpenChange(false)}
                    >
                      Done
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => setStep("form")}
                    >
                      Edit order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
