import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Homemade Lapis Legit`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf5e8",
    theme_color: "#fcf9f1",
    icons: [
      { src: "/assets/logo/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/assets/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
