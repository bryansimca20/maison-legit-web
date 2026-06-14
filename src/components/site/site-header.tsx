"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/site/order-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useOrder();
  const storyActive = pathname?.startsWith("/story");

  return (
    <header className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] bg-cream-100 px-5 py-3 md:px-12 md:py-3.5">
      <Link href="/" aria-label="Maison Legit — home" title="Home">
        <Image
          src="/assets/logo/maison-legit-logo-blue.jpg"
          alt="Maison Legit"
          width={46}
          height={46}
          priority
          className="size-10 rounded-md md:size-[46px]"
        />
      </Link>

      <div className="flex items-center gap-4 md:gap-[22px]">
        <nav aria-label="Primary">
          <Link
            href="/story"
            className={cn(
              "text-[13px] font-semibold tracking-[0.01em] transition-colors hover:text-blue-700",
              storyActive
                ? "border-b-2 border-gold-500 pb-[3px] text-blue-700"
                : "text-foreground",
            )}
          >
            Our story
          </Link>
        </nav>
        <Button variant="cta" size="sm" onClick={() => open()}>
          Pre-order now
        </Button>
      </div>
    </header>
  );
}
