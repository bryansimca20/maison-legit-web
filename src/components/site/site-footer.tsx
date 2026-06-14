import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 px-5 py-11 text-center text-cream-500">
      <div className="font-script text-[34px] leading-[1.2] text-cream-200">
        {siteConfig.name}
      </div>
      <p className="mt-2 text-fine text-base text-gold-300">
        Grateful to be a part of your table.
      </p>
      <p className="mx-auto mt-[22px] max-w-md text-xs leading-[1.7] text-[color-mix(in_srgb,var(--cream-500)_65%,transparent)]">
        Pre-orders via WhatsApp · {siteConfig.location.city},{" "}
        {siteConfig.location.country}
        <br />
        Baked in small batches, by hand.
      </p>
    </footer>
  );
}
