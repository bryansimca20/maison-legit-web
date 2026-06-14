import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PRODUCTS.map((p) => ({
      url: `${siteConfig.url}/lapis/${p.k}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${siteConfig.url}/story`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
}
