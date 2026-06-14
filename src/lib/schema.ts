import { siteConfig } from "@/lib/site";
import { PRODUCTS, SIZES, type Product } from "@/lib/products";

const abs = (path: string) => `${siteConfig.url}${path}`;

/** Recommended price-valid window for seasonal pre-orders (~1 year out). */
function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

/** Bakery (LocalBusiness) — the organization, sitewide. */
export function bakerySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${siteConfig.url}/#bakery`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: abs("/assets/photography/lapis-legit-original-1.jpg"),
    logo: abs("/assets/logo/maison-legit-logo-blue.jpg"),
    // Only publish a phone number once a real one is configured — never the placeholder.
    ...(siteConfig.whatsAppConfigured
      ? { telephone: siteConfig.adminWhatsApp }
      : {}),
    priceRange: "$$",
    servesCuisine: "Indonesian",
    currenciesAccepted: "IDR",
    paymentAccepted: "Bank transfer, QRIS, Cash",
    areaServed: { "@type": "City", name: siteConfig.location.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: Object.values(siteConfig.social),
    makesOffer: PRODUCTS.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: p.fullName },
      priceCurrency: "IDR",
      price: p.prices.whole * 1000,
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/PreOrder",
    })),
  };
}

/** WebSite node. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#bakery` },
  };
}

export function productPath(p: Product): string {
  return `/lapis/${p.k}`;
}

function productNode(p: Product) {
  const prices = Object.values(p.prices).map((v) => v * 1000);
  const url = abs(productPath(p));
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: p.fullName,
    description: p.description,
    image: p.photos.map((ph) => abs(ph.src)),
    category: "Lapis legit",
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: SIZES.length,
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/PreOrder",
      url,
      seller: { "@id": `${siteConfig.url}/#bakery` },
    },
  };
}

/** Standalone Product schema (with @context) for a product detail page. */
export function singleProductSchema(p: Product) {
  return { "@context": "https://schema.org", ...productNode(p) };
}

/** ItemList of the four lapis, for the landing page. */
export function collectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lapis Legit Collection",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: productNode(p),
    })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}
