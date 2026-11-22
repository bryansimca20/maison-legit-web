import { cn } from "@/lib/utils";

export type OrderStep = "lapis" | "date" | "details" | "review" | "sent";

const STEPS = [
  { step: "lapis", label: "Lapis" },
  { step: "date", label: "Date" },
  { step: "details", label: "Delivery" },
  { step: "review", label: "Review" },
] as const;

/** Four-segment bar showing how far through the pre-order form someone is. */
export function OrderProgress({ step }: { step: OrderStep }) {
  // "sent" counts as past the last step, so every segment is filled.
  const current =
    step === "sent" ? STEPS.length - 1 : STEPS.findIndex((s) => s.step === step);

  return (
    <div className="mt-3">
      <p className="sr-only">
        Step {current + 1} of {STEPS.length}
      </p>
      <ol className="grid list-none grid-cols-4 gap-1 p-0">
        {STEPS.map((s, i) => (
          <li
            key={s.step}
            aria-current={i === current ? "step" : undefined}
            className="flex flex-col gap-1.5"
          >
            <span className="block h-1 overflow-hidden rounded-xs bg-[var(--border-default)]">
              <span
                className={cn(
                  "block h-full origin-left bg-ink-800 transition-transform duration-200 ease-[var(--ease-out)]",
                  i <= current ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
            <span
              className={cn(
                "text-sm",
                i === current ? "font-semibold text-ink-900" : "text-ink-600",
              )}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
