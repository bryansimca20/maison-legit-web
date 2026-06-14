/**
 * Maison Legit catalogue — lapis legit variants, sizes and seasonal copy.
 * Prices are stored in thousands of IDR (e.g. 890 → "IDR 890k").
 */

export type SizeKey = "whole" | "half" | "small";
export type ProductKey = "original" | "plum" | "chocolate" | "cheese";
export type BadgeTone = "gold" | "red" | "blue" | "green" | "solid";

export interface Size {
  k: SizeKey;
  label: string;
  /** Centimetres, for structured data and accessibility. */
  dimensions: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export interface Product {
  k: ProductKey;
  name: string;
  /** "Lapis Legit Original" — the full retail name. */
  fullName: string;
  /** Short card line. */
  tag: string;
  /** Longer copy for product detail / SEO description. */
  description: string;
  badge: { tone: BadgeTone; label: string } | null;
  prices: Record<SizeKey, number>;
  photos: Photo[];
}

export const SIZES: Size[] = [
  { k: "whole", label: "Whole · 20 × 20 cm", dimensions: "20 × 20 cm" },
  { k: "half", label: "Half · 10 × 20 cm", dimensions: "10 × 20 cm" },
  { k: "small", label: "Small · 6 × 20 cm", dimensions: "6 × 20 cm" },
];

const PHOTO_BASE = "/assets/photography";

export const PRODUCTS: Product[] = [
  {
    k: "original",
    name: "Original",
    fullName: "Lapis Legit Original",
    tag: "The house classic: forty layers of butter and warm spice.",
    description:
      "Our signature lapis legit — forty-plus layers of butter, egg yolk and warm spice, griddled and pressed one ribbon at a time. Patient, rich, unmistakably ours.",
    badge: { tone: "gold", label: "Best seller" },
    prices: { whole: 890, half: 530, small: 325 },
    photos: [
      { src: `${PHOTO_BASE}/lapis-legit-original-2.jpg`, alt: "A whole Lapis Legit Original on a serving tray" },
      { src: `${PHOTO_BASE}/lapis-legit-original-1.jpg`, alt: "A forkful of Lapis Legit Original showing its many fine layers" },
      { src: `${PHOTO_BASE}/lapis-legit-original-3.jpg`, alt: "Slices of Lapis Legit Original, layers facing up" },
    ],
  },
  {
    k: "plum",
    name: "Plum",
    fullName: "Lapis Legit Plum",
    tag: "Brandied prunes, set into the layers.",
    description:
      "The festive favourite. Whole brandied prunes suspended between the layers, with a deep, jammy sweetness that has graced Indonesian celebration tables for generations.",
    badge: { tone: "red", label: "Limited slot" },
    prices: { whole: 1100, half: 660, small: 400 },
    photos: [
      { src: `${PHOTO_BASE}/lapis-legit-plum-1.jpg`, alt: "Lapis Legit Plum with brandied prunes set into the layers" },
      { src: `${PHOTO_BASE}/lapis-legit-plum-2.jpg`, alt: "A slice of Lapis Legit Plum on a plate" },
      { src: `${PHOTO_BASE}/lapis-legit-plum-3.jpg`, alt: "Close detail of the prunes between the layers of Lapis Legit Plum" },
    ],
  },
  {
    k: "chocolate",
    name: "Valrhona Chocolate",
    fullName: "Lapis Legit Valrhona Chocolate",
    tag: "Deep Valrhona chocolate, griddled layer by layer.",
    description:
      "Layers brushed with Valrhona dark couverture for a grown-up, cocoa-deep take on the classic — bittersweet, glossy and intensely layered.",
    badge: null,
    prices: { whole: 1200, half: 720, small: 480 },
    photos: [
      { src: `${PHOTO_BASE}/lapis-legit-chocolate-2.jpg`, alt: "A whole Lapis Legit Valrhona Chocolate" },
      { src: `${PHOTO_BASE}/lapis-legit-chocolate-1.jpg`, alt: "A slice of Lapis Legit Valrhona Chocolate showing dark layers" },
      { src: `${PHOTO_BASE}/lapis-legit-chocolate-3.jpg`, alt: "Close detail of the chocolate layers" },
    ],
  },
  {
    k: "cheese",
    name: "Cheesecake",
    fullName: "Lapis Legit Cheesecake",
    tag: "Cream-laced, finished with a lattice top.",
    description:
      "A modern hybrid — our buttery layers laced with a tangy baked cheesecake cream and finished with a golden lattice top. Indulgent and quietly showy.",
    badge: { tone: "solid", label: "New" },
    prices: { whole: 1200, half: 720, small: 480 },
    photos: [
      { src: `${PHOTO_BASE}/lapis-legit-cheese-3.jpg`, alt: "A whole Lapis Legit Cheesecake with a golden lattice top" },
      { src: `${PHOTO_BASE}/lapis-legit-cheese-4.jpg`, alt: "A slice of Lapis Legit Cheesecake" },
      { src: `${PHOTO_BASE}/lapis-legit-cheese-1.jpg`, alt: "Close detail of the lattice top and cream-laced layers" },
    ],
  },
];

export function getProduct(key: ProductKey): Product {
  return PRODUCTS.find((p) => p.k === key) ?? PRODUCTS[0];
}

/** Imagery reused across page sections (kept out of the carousels). */
export const SITE_IMAGES = {
  hero: { src: `${PHOTO_BASE}/lapis-legit-original-1.jpg`, alt: "A forkful of Lapis Legit Original lifted from a freshly baked slab, showing its fine golden layers" },
  feature: { src: `${PHOTO_BASE}/lapis-legit-cheese-2.jpg`, alt: "A Maison Legit lapis legit, framed by its lattice packaging" },
  storyWhole: { src: `${PHOTO_BASE}/lapis-legit-original-2.jpg`, alt: "A whole lapis legit on the family serving tray" },
} as const;

/** Seasonal occasion copy. Switch CURRENT_OCCASION to change the hero eyebrow. */
export type OccasionKey = "Eid Al-Fitr" | "Lunar New Year" | "Christmas" | "None";

export const OCCASIONS: Record<OccasionKey, { eyebrow: string }> = {
  "Eid Al-Fitr": { eyebrow: "Welcoming Eid Al-Fitr" },
  "Lunar New Year": { eyebrow: "Welcoming the Year of the Fire Horse" },
  Christmas: { eyebrow: "Welcoming Christmas" },
  None: { eyebrow: "Small batch — limited slot" },
};

export const CURRENT_OCCASION: OccasionKey = "None";

/** Format a thousands value as the house price string, e.g. 1100 → "1.100k". */
export function fmtK(thousands: number): string {
  return (
    String(Math.round(thousands)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "k"
  );
}

/** Strip a WhatsApp number down to the digits wa.me expects. */
export function waDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Normalize a customer-entered Indonesian number to its national digits,
 * so "+62 812…", "0812…", "0062 812…" and "812…" all become "812…".
 * Prevents a doubled +62 in the composed message.
 */
export function normalizeWaNational(input: string): string {
  let d = waDigits(input);
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("62")) d = d.slice(2);
  return d.replace(/^0+/, "");
}

interface OrderDetails {
  product: Product;
  size: Size;
  qty: number;
  name: string;
  customerWa: string;
  total: number;
}

/** Compose the pre-order message that gets sent to the admin WhatsApp. */
export function buildOrderMessage({
  product,
  size,
  qty,
  name,
  customerWa,
  total,
}: OrderDetails): string {
  const digits = normalizeWaNational(customerWa);
  return [
    "Hello Maison Legit, I would like to pre-order:",
    "",
    `${product.fullName} — ${size.label}`,
    `Quantity: ${qty}`,
    `Total: IDR ${fmtK(total)}`,
    "",
    `Name: ${name.trim()}`,
    `WhatsApp: +62 ${digits}`,
    "",
    "Thank you.",
  ].join("\n");
}

/** Build the wa.me deep link that opens the admin chat with the order text. */
export function buildWaLink(adminWa: string, message: string): string {
  return `https://wa.me/${waDigits(adminWa)}?text=${encodeURIComponent(message)}`;
}
