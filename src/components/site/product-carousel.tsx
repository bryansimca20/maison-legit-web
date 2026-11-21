"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/products";

interface DragState {
  startX: number;
  dx: number;
  w: number;
}

/** Swipe/drag photo carousel with dot indicators (no arrows). */
export function ProductCarousel({
  photos,
  label,
  priority = false,
}: {
  photos: Photo[];
  label?: string;
  priority?: boolean;
}) {
  const [i, setI] = React.useState(0);
  const [drag, setDrag] = React.useState<DragState | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const n = photos.length;

  const go = (next: number) => setI(Math.max(0, Math.min(n - 1, next)));

  const onDown = (e: React.PointerEvent) => {
    const w = ref.current?.offsetWidth ?? 1;
    setDrag({ startX: e.clientX, dx: 0, w });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag) return;
    let dx = e.clientX - drag.startX;
    if ((i === 0 && dx > 0) || (i === n - 1 && dx < 0)) dx = dx / 3; // rubber-band
    setDrag({ ...drag, dx });
  };
  const onUp = () => {
    if (!drag) return;
    const threshold = drag.w * 0.16;
    if (drag.dx < -threshold) go(i + 1);
    else if (drag.dx > threshold) go(i - 1);
    setDrag(null);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(i + 1);
    }
  };

  const offset = -i * 100 + (drag ? (drag.dx / drag.w) * 100 : 0);

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={label ? `${label} — photo gallery` : "Product photos"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:cursor-grabbing"
    >
      <div
        className={cn(
          "flex h-full",
          drag
            ? ""
            : "transition-transform duration-200 ease-[var(--ease-out)]",
        )}
        style={{ transform: `translateX(${offset}%)` }}
      >
        {photos.map((p, k) => (
          <div
            key={p.src}
            aria-hidden={k !== i}
            className="relative h-full w-full shrink-0 grow-0 basis-full"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              draggable={false}
              priority={priority && k === 0}
              sizes="(min-width: 1200px) 552px, (min-width: 768px) 50vw, 100vw"
              className="pointer-events-none object-cover select-none"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-7">
        {photos.map((p, k) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Show photo ${k + 1} of ${n}`}
            aria-current={k === i}
            onClick={(e) => {
              e.stopPropagation();
              go(k);
            }}
            className={cn(
              // 44px transparent hit area around the small visible pill
              "relative h-1.5 rounded-full outline-none transition-[width,background-color] duration-150 ease-[var(--ease-out)]",
              "before:absolute before:left-1/2 before:top-1/2 before:size-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
              "focus-visible:ring-2 focus-visible:ring-cream-100",
              k === i
                ? "w-4 bg-cream-100"
                : "w-1.5 bg-[color-mix(in_srgb,var(--cream-100)_60%,transparent)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}
