"use client";

import * as React from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { HeroPhoto } from "@/lib/products";

const SLIDE_MS = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Full-bleed crossfading photos with a pause button. Fills its positioned parent. */
export function HeroSlideshow({ slides }: { slides: HeroPhoto[] }) {
  const [i, setI] = React.useState(0);
  // The visitor's own play/pause; null until they press it. Reduced motion starts paused.
  const [choice, setChoice] = React.useState<boolean | null>(null);
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const playing = choice ?? !reducedMotion;
  const n = slides.length;

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setI((k) => (k + 1) % n), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [playing, n]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Lapis legit photos"
      className="absolute inset-0 overflow-hidden"
    >
      {slides.map((s, k) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          aria-hidden={k !== i}
          fill
          preload={k === 0}
          sizes="100vw"
          style={{ objectPosition: s.focus }}
          className={cn(
            // The zoom lasts one slide and hidden slides rest at its end, so one fading out never jumps.
            "object-cover transition-opacity duration-1200 ease-[var(--ease-out)]",
            k === i
              ? "animate-[hero-zoom_5s_linear_forwards] opacity-100"
              : "scale-105 opacity-0",
            !playing && "paused",
          )}
        />
      ))}

      {/* Top right until lg: below 1024px the desktop panel reaches the bottom-right row. */}
      <div className="absolute top-4 right-5 z-2 flex items-center gap-1.5 lg:top-auto lg:right-[max(48px,calc((100vw-1200px)/2+48px))] lg:bottom-16">
        {slides.map((s, k) => (
          <span
            key={s.src}
            aria-hidden
            className={cn(
              "h-[3px] w-[22px]",
              k === i ? "bg-cream-100" : "bg-cream-100/50",
            )}
          />
        ))}
        <button
          type="button"
          onClick={() => setChoice(!playing)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className={cn(
            // 44px transparent hit area around the 32px circle
            "relative ml-1.5 grid size-8 place-items-center rounded-full bg-ink-900/55 text-cream-100 outline-none",
            "before:absolute before:top-1/2 before:left-1/2 before:size-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
            "focus-visible:ring-2 focus-visible:ring-cream-100",
          )}
        >
          {playing ? (
            <Pause aria-hidden className="size-3.5" fill="currentColor" />
          ) : (
            <Play aria-hidden className="size-3.5" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
}
