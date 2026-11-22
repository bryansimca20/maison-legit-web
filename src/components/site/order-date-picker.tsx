"use client";

import { Calendar } from "@/components/ui/calendar";
import { DELIVERY, isoDay } from "@/lib/products";

/** "2026-12-03" → that day at local midnight, the form react-day-picker compares against. */
const localDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// The delivery window sits inside one month, so the calendar shows that month only, with no way to leave it.
const MONTH = localDate(DELIVERY.from);

/** The pre-order's delivery day: December 2026 only, days before `earliest` greyed out. */
export function OrderDatePicker({
  value,
  earliest,
  onChange,
}: {
  value: string;
  earliest: string;
  onChange: (iso: string) => void;
}) {
  return (
    <Calendar
      mode="single"
      required
      selected={value ? localDate(value) : undefined}
      onSelect={(d) => onChange(isoDay(d))}
      month={MONTH}
      startMonth={MONTH}
      endMonth={MONTH}
      hideNavigation
      showOutsideDays={false}
      weekStartsOn={1}
      disabled={{ before: localDate(earliest) }}
      className="w-full bg-transparent p-0 [--cell-size:--spacing(11)]"
      classNames={{
        // Wide sheets would stretch the square days past 70px and push Next out of view.
        root: "w-full max-w-[360px]",
        month_caption: "flex h-11 w-full items-center",
        caption_label: "font-display text-[22px] font-semibold text-ink-900",
        weekday: "flex-1 text-sm font-normal text-ink-600 select-none",
        day: [
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          // min-w-0 lets the days shrink below 44px on 320px phones instead of overflowing the sheet.
          "[&_button]:min-w-0 [&_button]:text-base [&_button]:text-ink-800",
          "[&_button[data-selected-single=true]]:bg-ink-800 [&_button[data-selected-single=true]]:text-cream-100",
        ].join(" "),
      }}
    />
  );
}
