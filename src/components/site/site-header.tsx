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
      <Link href="/" title="Home" className="flex items-center">
        <Image
          src="/assets/logo/maison-legit-wordmark-blue.png"
          alt="Maison Legit"
          width={879}
          height={502}
          priority
          sizes="98px"
          className="h-12 w-auto md:h-14"
        />
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
