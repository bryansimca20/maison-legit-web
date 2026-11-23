import { siteConfig } from "@/lib/site";
import { PREORDER, waDigits } from "@/lib/products";
import { hasDecor } from "@/lib/occasion";
import { cn } from "@/lib/utils";
import { Starburst } from "@/components/site/decor/starburst";

const LINK =
  "inline-block py-3 underline decoration-[var(--hairline-on-dark)] underline-offset-4 transition-colors hover:text-cream-100";

export function SiteFooter() {
  const stars = hasDecor("starbursts");
  const star = stars && <Starburst size={14} className="text-bar-accent" />;

  return (
    <footer className="bg-footer px-5 py-11 text-center text-footer-text [--ring:var(--footer-ring)]">
      <div
        className={cn(
          "font-script text-[34px] leading-[1.2] text-footer-strong",
          stars && "inline-flex items-center gap-3.5",
        )}
      >
        {star}
        {siteConfig.name}
        {star}
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm leading-[1.7]">
        Baked in {siteConfig.location.city}, {siteConfig.location.country}.
        Pre-orders on WhatsApp.
        <br />
        Delivery within {siteConfig.deliveryArea}. {PREORDER.season} orders
        ship from {PREORDER.shipsFrom}.
      </p>
      <p className="mt-2 flex justify-center gap-6 text-sm font-semibold text-footer-strong">
        {/* Hidden until the real admin number is set; the placeholder would send orders nowhere. */}
        {siteConfig.whatsAppConfigured && (
          <a href={`https://wa.me/${waDigits(siteConfig.adminWhatsApp)}`} className={LINK}>
            WhatsApp
          </a>
        )}
        <a href={siteConfig.social.instagram} className={LINK}>
          Instagram
        </a>
      </p>
    </footer>
  );
}
