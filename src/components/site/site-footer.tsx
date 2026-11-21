import { siteConfig } from "@/lib/site";
import { PREORDER, waDigits } from "@/lib/products";

const LINK =
  "inline-block py-3 underline decoration-[var(--hairline-on-dark)] underline-offset-4 transition-colors hover:text-cream-100";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 px-5 py-11 text-center text-cream-500">
      <div className="font-script text-[34px] leading-[1.2] text-cream-200">
        {siteConfig.name}
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm leading-[1.7]">
        Baked in {siteConfig.location.city}, {siteConfig.location.country}.
        Pre-orders on WhatsApp.
        <br />
        Delivery within {siteConfig.deliveryArea}. {PREORDER.season} orders
        ship from {PREORDER.shipsFrom}.
      </p>
      <p className="mt-2 flex justify-center gap-6 text-sm font-semibold text-cream-200">
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
