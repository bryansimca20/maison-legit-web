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
    <header className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] bg-header px-5 py-3 md:px-12 md:py-3.5">
      <Link href="/" title="Home" className="flex items-center gap-3">
        <Image
          src="/assets/logo/maison-legit-logo-blue.jpg"
          alt="Maison Legit"
          width={46}
          height={46}
          priority
          className="size-10 rounded-xs md:size-[46px]"
        />
        {/* Wordmark text from sm up; on phones the hero heading carries the name of the product. */}
        <span aria-hidden className="hidden font-script text-[26px] leading-none text-blue-700 sm:inline">
          Maison Legit
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-[22px]">
        <nav aria-label="Primary">
          <Link
            href="/story"
            className={cn(
              "py-3.5 text-sm font-semibold transition-colors hover:text-brand-text",
              storyActive
                ? "border-b-2 border-nav-underline pb-[3px] text-brand-text"
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
