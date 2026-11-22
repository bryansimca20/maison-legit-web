/**
 * Site-wide configuration for Maison Legit.
 * The admin WhatsApp number and public site URL can be overridden with
 * environment variables so they never need to be hard-coded for deploy.
 */

export const siteConfig = {
  name: "Maison Legit",
  /** Used in <title> templates and JSON-LD. */
  legalName: "Maison Legit",
  tagline: "A family recipe, baked in layers.",
  description:
    "Homemade lapis legit from a thirty-year family recipe: the Indonesian thousand-layer cake, baked by hand in small batches with no preservatives. Pre-order in Jakarta via WhatsApp.",
  /** Canonical, absolute base URL (no trailing slash). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://maisonlegit.com").replace(
    /\/$/,
    "",
  ),
  locale: "en_ID",
  location: {
    city: "Jakarta",
    region: "DKI Jakarta",
    country: "Indonesia",
    countryCode: "ID",
  },
  /** Delivery only, within this area. The fee depends on the address and is confirmed on WhatsApp. */
  deliveryArea: "Jakarta",
  /** Admin WhatsApp number that receives pre-orders. Digits + country code. */
  adminWhatsApp: process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ?? "+62 812 3456 7890",
  /** True only when a real admin number is configured (not the placeholder). */
  whatsAppConfigured: Boolean(process.env.NEXT_PUBLIC_ADMIN_WHATSAPP),
  /** Optional social profiles (used for JSON-LD sameAs). */
  social: {
    instagram: "https://www.instagram.com/maisonlegit",
  },
} as const;

export type SiteConfig = typeof siteConfig;
