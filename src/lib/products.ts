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

export interface HeroPhoto extends Photo {
  /** CSS object-position that keeps the cake in frame when the home hero crops the tall photo wide. */
  focus: string;
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
  /** Lead photo: the home tile, a home hero slide and the first photo on the product page. Order thumbnails and link previews use photos[0]. */
  heroPhoto: HeroPhoto;
}

export const SIZES: Size[] = [
  { k: "whole", label: "Whole (20 × 20 cm)", dimensions: "20 × 20 cm" },
  { k: "half", label: "Half (10 × 20 cm)", dimensions: "10 × 20 cm" },
  { k: "small", label: "Small (6 × 20 cm)", dimensions: "6 × 20 cm" },
];

const PHOTO_BASE = "/assets/photography";

export const PRODUCTS: Product[] = [
  {
    k: "original",
    name: "Original",
    fullName: "Lapis Legit Original",
    tag: "The house classic: butter and warm spice in every layer.",
    description:
      "Our house lapis legit: fine layers of butter, egg yolk and warm spice, each one baked and pressed by hand.",
    badge: null,
    prices: { whole: 890, half: 530, small: 325 },
    heroPhoto: { src: `${PHOTO_BASE}/lapis-legit-original-4.webp`, alt: "Lapis Legit Original on a gold-handled tray, three slices cut to show its fine layers", focus: "50% 62%" },
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
    tag: "Whole prunes, set into the layers.",
    description:
      "The Original's layers with whole prunes set between them, for a deep, jammy sweetness.",
    badge: null,
    prices: { whole: 1100, half: 660, small: 400 },
    heroPhoto: { src: `${PHOTO_BASE}/lapis-legit-plum-4.webp`, alt: "A forkful of Lapis Legit Plum lifted from the cake, prunes set between its layers", focus: "50% 45%" },
    photos: [
      { src: `${PHOTO_BASE}/lapis-legit-plum-1.jpg`, alt: "Lapis Legit Plum with whole prunes set into the layers" },
      { src: `${PHOTO_BASE}/lapis-legit-plum-2.jpg`, alt: "A slice of Lapis Legit Plum on a plate" },
      { src: `${PHOTO_BASE}/lapis-legit-plum-3.jpg`, alt: "Close detail of the prunes between the layers of Lapis Legit Plum" },
    ],
  },
  {
    k: "chocolate",
    name: "Valrhona Chocolate",
    fullName: "Lapis Legit Valrhona Chocolate",
    tag: "Deep Valrhona chocolate, baked layer by layer.",
    description:
      "Each layer brushed with Valrhona dark couverture. Bittersweet, and still baked one layer at a time.",
    badge: null,
    prices: { whole: 1200, half: 720, small: 480 },
    heroPhoto: { src: `${PHOTO_BASE}/lapis-legit-chocolate-2.jpg`, alt: "A whole Lapis Legit Valrhona Chocolate", focus: "50% 60%" },
    photos: [
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
      "Our buttery layers with a tangy baked cheesecake cream between them, finished with a golden lattice top.",
    badge: null,
    prices: { whole: 1200, half: 720, small: 480 },
    heroPhoto: { src: `${PHOTO_BASE}/lapis-legit-cheese-5.webp`, alt: "A forkful of Lapis Legit Cheesecake lifted from its lattice-topped cake", focus: "50% 58%" },
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

/** Imagery for page sections outside the product carousels. */
export const SITE_IMAGES = {
  feature: { src: `${PHOTO_BASE}/lapis-legit-original-3.jpg`, alt: "A close cross-section of lapis legit showing its fine golden layers" },
  storyWhole: { src: `${PHOTO_BASE}/lapis-legit-original-2.jpg`, alt: "A whole lapis legit on the family serving tray" },
  storyLayers: { src: `${PHOTO_BASE}/lapis-legit-original-3.jpg`, alt: "The layers of a lapis legit up close, each one baked by hand" },
  storyPlum: { src: `${PHOTO_BASE}/lapis-legit-plum-3.jpg`, alt: "Prunes set between the layers of a plum lapis" },
  storyChocolate: { src: `${PHOTO_BASE}/lapis-legit-chocolate-3.jpg`, alt: "Alternating chocolate and butter layers of a chocolate lapis" },
} as const;

/** Seasonal occasion copy. Switch CURRENT_OCCASION to show a line above the hero heading. */
export type OccasionKey = "Eid Al-Fitr" | "Lunar New Year" | "Christmas" | "None";

export const OCCASIONS: Record<OccasionKey, { eyebrow: string | null }> = {
  "Eid Al-Fitr": { eyebrow: "Welcoming Eid Al-Fitr" },
  "Lunar New Year": { eyebrow: "Welcoming the Year of the Fire Horse" },
  Christmas: { eyebrow: "Welcoming Christmas" },
  None: { eyebrow: null },
};

export const CURRENT_OCCASION: OccasionKey = "None";

/** The open pre-order window, shown in the banner, hero, CTA band and footer. */
export const PREORDER = { season: "Christmas", shipsFrom: "December 3, 2026" } as const;

/** Days the owners deliver this season, as ISO days (inclusive). No day inside is off limits. */
export const DELIVERY = { from: "2026-12-03", to: "2026-12-31" } as const;

/** A `YYYY-MM-DD` string inside the delivery window. ISO days sort as strings, so compare directly. */
export function isDeliveryDay(iso: unknown): iso is string {
  return (
    typeof iso === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(iso) &&
    iso >= DELIVERY.from &&
    iso <= DELIVERY.to
  );
}

/** The local calendar day of `d` as `YYYY-MM-DD`. */
export function isoDay(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** First day a customer can pick: the later of the window's start and tomorrow; null once none is left. */
export function earliestDeliveryDay(now: Date): string | null {
  const tomorrow = isoDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  const day = tomorrow > DELIVERY.from ? tomorrow : DELIVERY.from;
  return day <= DELIVERY.to ? day : null;
}

/** `iso` if a customer could still pick it at `now`, else "" (passed, same-day, or season over). */
export function pickableDeliveryDay(iso: string, now: Date): string {
  const earliest = earliestDeliveryDay(now);
  return iso && earliest && iso >= earliest ? iso : "";
}

const DAY_PARTS = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-12-03" → "Thursday, 3 December 2026". UTC so server, browser and tests agree. */
export function fmtDeliveryDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const parts = DAY_PARTS.formatToParts(new Date(Date.UTC(y, m - 1, d)));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("weekday")}, ${part("day")} ${part("month")} ${part("year")}`;
}

/** Lowest price on the menu, in thousands of IDR (shown as "from"). */
export const PRICE_FROM = Math.min(...PRODUCTS.flatMap((p) => Object.values(p.prices)));

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

/** Most lines one pre-order can hold. */
export const MAX_ORDER_LINES = 8;

/** Small boxes are sold 3 or more of the same lapis (the owners' flyer rule). */
export const MIN_SMALL_QTY = 3;

/** Lowest quantity an order line of this size can have. */
export function minQty(size: SizeKey): number {
  return size === "small" ? MIN_SMALL_QTY : 1;
}

interface SizedQty {
  size: SizeKey;
  qty: number;
  /** The quantity before picking Small raised it; undone when the line leaves Small. */
  qtyBeforeSmall?: number;
}

/** A line's size and quantity after the customer picks `size`. */
export function changeSize(line: SizedQty, size: SizeKey): SizedQty {
  if (size === line.size) return line;
  if (line.qty < minQty(size)) {
    return { size, qty: minQty(size), qtyBeforeSmall: line.qty };
  }
  // Explicit undefined, so merging this into a line clears what it remembered.
  return { size, qty: line.qtyBeforeSmall ?? line.qty, qtyBeforeSmall: undefined };
}

/** One line of a pre-order: a lapis, a size and how many. */
export interface OrderLine {
  product: Product;
  size: Size;
  qty: number;
}

/** Order total in thousands of IDR, like `prices`. */
export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.product.prices[l.size.k] * l.qty, 0);
}

/** The lapis a new order line starts with: the first one not yet in the order. */
export function nextProductKey(taken: ProductKey[]): ProductKey {
  return PRODUCTS.find((p) => !taken.includes(p.k))?.k ?? "original";
}

interface OrderDetails {
  lines: OrderLine[];
  name: string;
  customerWa: string;
  address: string;
  /** ISO delivery day, e.g. "2026-12-03". */
  date: string;
}

/** Compose the pre-order message that gets sent to the admin WhatsApp. */
export function buildOrderMessage({
  lines,
  name,
  customerWa,
  address,
  date,
}: OrderDetails): string {
  const digits = normalizeWaNational(customerWa);
  return [
    "Hello Maison Legit, I would like to pre-order:",
    "",
    ...lines.map((l, i) => {
      const unit = l.product.prices[l.size.k];
      return `${i + 1}. ${l.product.fullName}, ${l.size.label}, ${l.qty} × IDR ${fmtK(unit)} = IDR ${fmtK(unit * l.qty)}`;
    }),
    `Total: IDR ${fmtK(orderTotal(lines))}`,
    "",
    `Delivery date: ${fmtDeliveryDate(date)}`,
    "",
    `Name: ${name.trim()}`,
    `WhatsApp: +62 ${digits}`,
    "",
    "Delivery address:",
    address.trim(),
    "",
    "Thank you.",
  ].join("\n");
}

/** Build the wa.me deep link that opens the admin chat with the order text. */
export function buildWaLink(adminWa: string, message: string): string {
  return `https://wa.me/${waDigits(adminWa)}?text=${encodeURIComponent(message)}`;
}
