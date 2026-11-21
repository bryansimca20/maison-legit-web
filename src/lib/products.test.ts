import { describe, expect, it } from "vitest";

import {
  SIZES,
  getProduct,
  buildOrderMessage,
  orderTotal,
  nextProductKey,
  type OrderLine,
  type ProductKey,
  type SizeKey,
} from "./products";

const line = (p: ProductKey, s: SizeKey, qty: number): OrderLine => ({
  product: getProduct(p),
  size: SIZES.find((x) => x.k === s) ?? SIZES[0],
  qty,
});

const base = {
  name: " Sari Dewi ",
  customerWa: "0812 3456 7890",
  address: " Jl. Kemang Raya 10, Jakarta Selatan ",
};

describe("orderTotal", () => {
  it("sums price × qty over lines", () => {
    expect(
      orderTotal([line("original", "whole", 2), line("plum", "half", 1)]),
    ).toBe(890 * 2 + 660);
  });

  it("counts duplicate lapis + size rows separately", () => {
    expect(
      orderTotal([line("original", "whole", 1), line("original", "whole", 1)]),
    ).toBe(1780);
  });
});

describe("nextProductKey", () => {
  it("returns the first lapis not taken, in catalogue order", () => {
    expect(nextProductKey(["original"])).toBe("plum");
    expect(nextProductKey(["original", "plum"])).toBe("chocolate");
  });

  it("falls back to original when all four are taken", () => {
    expect(nextProductKey(["original", "plum", "chocolate", "cheese"])).toBe(
      "original",
    );
  });
});

describe("buildOrderMessage", () => {
  it("numbers a single line", () => {
    const msg = buildOrderMessage({
      ...base,
      lines: [line("original", "whole", 1)],
    });
    expect(msg).toContain(
      "1. Lapis Legit Original, Whole (20 × 20 cm), 1 × IDR 890k = IDR 890k",
    );
    expect(msg).toContain("Total: IDR 890k");
  });

  it("lists every line with subtotals and one total", () => {
    const msg = buildOrderMessage({
      ...base,
      lines: [line("original", "whole", 2), line("plum", "half", 1)],
    });
    expect(msg).toBe(
      [
        "Hello Maison Legit, I would like to pre-order:",
        "",
        "1. Lapis Legit Original, Whole (20 × 20 cm), 2 × IDR 890k = IDR 1.780k",
        "2. Lapis Legit Plum, Half (10 × 20 cm), 1 × IDR 660k = IDR 660k",
        "Total: IDR 2.440k",
        "",
        "Name: Sari Dewi",
        "WhatsApp: +62 81234567890",
        "",
        "Delivery address:",
        "Jl. Kemang Raya 10, Jakarta Selatan",
        "",
        "Thank you.",
      ].join("\n"),
    );
  });

  it("lists duplicate rows as entered", () => {
    const msg = buildOrderMessage({
      ...base,
      lines: [line("plum", "half", 1), line("plum", "half", 2)],
    });
    expect(msg).toContain(
      "1. Lapis Legit Plum, Half (10 × 20 cm), 1 × IDR 660k = IDR 660k",
    );
    expect(msg).toContain(
      "2. Lapis Legit Plum, Half (10 × 20 cm), 2 × IDR 660k = IDR 1.320k",
    );
    expect(msg).toContain("Total: IDR 1.980k");
  });
});
