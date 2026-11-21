"use client";

import * as React from "react";
import Image from "next/image";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceTag } from "@/components/site/price-tag";

type Step = "lapis" | "details" | "review" | "sent";

const FIELD_LABEL =
  "text-sm font-semibold text-ink-800";

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
  // The provider remounts this component (via `key`) on every open, so these
  // initializers reset the form each time it is opened.
  const [step, setStep] = React.useState<Step>("lapis");
  const [name, setName] = React.useState("");
  const [customerWa, setCustomerWa] = React.useState("");
  const [address, setAddress] = React.useState("");
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
  // Delivery only: we need enough of an address to send the lapis to.
  const addressOk = address.trim().length >= 10;

  const message = buildOrderMessage({
    product: prod,
    size: sizeDef,
    qty,
    name,
    customerWa,
    address,
    total,
  });
  const waLink = buildWaLink(siteConfig.adminWhatsApp, message);

  const review = () => {
    setTried(true);
    if (nameOk && waOk && addressOk) setStep("review");
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
            "rounded-t-[16px] bg-cream-100 px-5 pt-6 pb-7 shadow-xl outline-none",
            // desktop: centered dialog
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-[560px] sm:max-w-[calc(100vw-2rem)]",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[16px] sm:px-8 sm:pt-7 sm:pb-8",
            // motion
            "transition-[transform,opacity] duration-200 ease-[var(--ease-out)]",
            "data-closed:opacity-0 data-closed:translate-y-3 sm:data-closed:translate-y-3 sm:data-closed:-translate-x-1/2",
          )}
        >
          <div className="mb-2 flex items-start justify-between gap-3 sm:mb-[18px]">
            <div>
              <DialogPrimitive.Title
                render={<h2 />}
                className="font-display text-[26px] font-semibold leading-[1.1] text-ink-900"
              >
                {step === "details" ? "Delivery details" : "Reserve your lapis"}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1.5 text-sm text-ink-600">
                {step === "lapis" && "Step 1 of 2"}
                {step === "details" && "Step 2 of 2"}
                {(step === "review" || step === "sent") &&
                  "We confirm every order on WhatsApp."}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mt-2 -mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          {step === "lapis" ? (
            // 4:3 on phones and 16:9 from sm, so the whole cake shows. Capped at 34% of the
            // visible height (31dvh = 262px at 844) so step 1 still fits on short phone screens.
            <div className="relative mb-3 aspect-[4/3] max-h-[31dvh] w-full shrink-0 overflow-hidden rounded-xs bg-amber-200 sm:mb-4 sm:aspect-video sm:max-h-none">
              {/* All four stay mounted so switching lapis swaps instantly, with no refetch or blank frame. */}
              {PRODUCTS.map((p) => (
                <Image
                  key={p.k}
                  src={p.photos[0].src}
                  alt={p.k === prod.k ? p.photos[0].alt : ""}
                  aria-hidden={p.k !== prod.k}
                  fill
                  sizes="(min-width: 640px) 496px, 100vw"
                  className={cn("object-cover", p.k !== prod.k && "opacity-0")}
                />
              ))}
            </div>
          ) : (
            // Later steps keep a small reference of what is being ordered.
            <div className="mb-3 flex items-center gap-3 rounded-xs border border-[var(--border-soft)] bg-card p-2.5 sm:mb-[18px]">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xs bg-amber-200">
                <Image
                  src={prod.photos[0].src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[18px] font-semibold leading-[1.15] text-ink-900">
                  {prod.fullName}
                </p>
                <p className="mt-0.5 text-sm text-ink-600">
                  {sizeDef.label}
                  <span className="block">Quantity {qty}</span>
                </p>
              </div>
              <PriceTag amount={fmtK(total)} size="sm" />
            </div>
          )}

          {step === "lapis" && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
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
                    {/* Plain dropdown below the field: Base UI's align-with-trigger mode can place the
                        list past the screen edge on phones, which widens the page and makes the form grow. */}
                    <SelectContent alignItemWithTrigger={false}>
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
                          const s = SIZES.find((x) => x.k === v) ?? SIZES[0];
                          return `${s.label}, IDR ${fmtK(prod.prices[s.k])}`;
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    {/* Plain dropdown below the field: Base UI's align-with-trigger mode can place the
                        list past the screen edge on phones, which widens the page and makes the form grow. */}
                    <SelectContent alignItemWithTrigger={false}>
                      {SIZES.map((s) => (
                        <SelectItem key={s.k} value={s.k}>
                          {s.label}, IDR {fmtK(prod.prices[s.k])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <span id="ml-qty-label" className={FIELD_LABEL}>
                    Quantity
                  </span>
                  <div
                    role="group"
                    aria-labelledby="ml-qty-label"
                    className="inline-flex w-max items-center rounded-sm border-[1.5px] border-[var(--border-default)] bg-card"
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={qty <= 1}
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex size-11 items-center justify-center rounded-xs text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent"
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
                      className="flex size-11 items-center justify-center rounded-xs text-ink-700 transition-colors hover:bg-cream-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-35 disabled:hover:bg-transparent"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className={FIELD_LABEL}>Total</span>
                  <PriceTag amount={fmtK(total)} size="lg" />
                </div>
              </div>

              {/* Pinned to the bottom of the sheet on phones so the action never scrolls away. */}
              <div className="sticky -bottom-7 -mx-5 -mb-7 bg-cream-100 px-5 pt-3 pb-7 sm:static sm:m-0 sm:p-0">
                <Button
                  variant="cta"
                  size="lg"
                  fullWidth
                  onClick={() => setStep("details")}
                >
                  Next: delivery details
                </Button>
              </div>
            </div>
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
                  onClick={() => setStep("lapis")}
                >
                  Back
                </Button>
                <Button variant="cta" size="lg" className="flex-1" onClick={review}>
                  Review order
                </Button>
              </div>
            </div>
          )}

          {(step === "review" || step === "sent") && (
            <div>
              <pre className="rounded-sm border border-[var(--border-soft)] bg-card px-[18px] py-4 font-sans text-sm leading-[1.7] whitespace-pre-wrap text-ink-800">
                {message}
              </pre>

              {step === "review" && (
                // Pinned on phones like steps 1 and 2, so Send never sits below the fold.
                <div className="sticky -bottom-7 -mx-5 -mb-7 mt-[18px] flex flex-wrap gap-2.5 bg-cream-100 px-5 pt-3 pb-7 sm:static sm:m-0 sm:mt-[18px] sm:p-0">
                  <Button variant="cta" size="lg" onClick={send}>
                    Send via WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep("details")}
                  >
                    Back
                  </Button>
                </div>
              )}

              {step === "sent" && (
                <div>
                  <div className="mt-3.5 flex items-start gap-2.5 rounded-sm border border-[color-mix(in_srgb,var(--green-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_12%,var(--cream-100))] px-3.5 py-3 text-sm leading-[1.6] text-green-700">
                    Terima kasih, {firstName}. WhatsApp opens with your order
                    written out. Press send and we reply to confirm your date.
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
                      onClick={() => setStep("details")}
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
