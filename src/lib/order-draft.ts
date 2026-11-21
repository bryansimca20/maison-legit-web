/**
 * The unfinished pre-order, kept in sessionStorage so an accidental close of the dialog
 * doesn't lose it. Cleared when the order is sent; gone when the tab closes.
 */
import {
  MAX_ORDER_LINES,
  PRODUCTS,
  SIZES,
  type ProductKey,
  type SizeKey,
} from "./products";

export const ORDER_DRAFT_KEY = "maison-legit:order-draft";

/** Steps a draft can be restored to; a sent order is never saved. */
export type DraftStep = "lapis" | "details" | "review";

export interface OrderDraft {
  lines: { product: ProductKey; size: SizeKey; qty: number }[];
  name: string;
  customerWa: string;
  address: string;
  step: DraftStep;
}

const STEPS: readonly string[] = ["lapis", "details", "review"];
const PRODUCT_KEYS: readonly string[] = PRODUCTS.map((p) => p.k);
const SIZE_KEYS: readonly string[] = SIZES.map((s) => s.k);

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isLine = (v: unknown): v is OrderDraft["lines"][number] =>
  isRecord(v) &&
  typeof v.product === "string" &&
  PRODUCT_KEYS.includes(v.product) &&
  typeof v.size === "string" &&
  SIZE_KEYS.includes(v.size) &&
  Number.isInteger(v.qty) &&
  (v.qty as number) >= 1 &&
  (v.qty as number) <= 10;

/** Read a stored draft back; anything unexpected (edited, stale or broken) gives null. */
export function parseOrderDraft(raw: string | null): OrderDraft | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (
    !isRecord(v) ||
    !Array.isArray(v.lines) ||
    v.lines.length < 1 ||
    v.lines.length > MAX_ORDER_LINES ||
    !v.lines.every(isLine) ||
    typeof v.name !== "string" ||
    typeof v.customerWa !== "string" ||
    typeof v.address !== "string" ||
    typeof v.step !== "string" ||
    !STEPS.includes(v.step)
  ) {
    return null;
  }
  return {
    lines: v.lines.map(({ product, size, qty }) => ({ product, size, qty })),
    name: v.name,
    customerWa: v.customerWa,
    address: v.address,
    step: v.step as DraftStep,
  };
}

// Browser-only helpers. Storage can throw (private mode, blocked site data); the form then just
// works without a saved draft.

export function loadOrderDraft(): OrderDraft | null {
  if (typeof window === "undefined") return null;
  try {
    return parseOrderDraft(window.sessionStorage.getItem(ORDER_DRAFT_KEY));
  } catch {
    return null;
  }
}

export function saveOrderDraft(json: string): void {
  try {
    window.sessionStorage.setItem(ORDER_DRAFT_KEY, json);
  } catch {}
}

export function clearOrderDraft(): void {
  try {
    window.sessionStorage.removeItem(ORDER_DRAFT_KEY);
  } catch {}
}
