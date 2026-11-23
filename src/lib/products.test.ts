import { readdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  PRODUCTS,
  SIZES,
  getProduct,
  buildOrderMessage,
  orderTotal,
  nextProductKey,
  minQty,
  changeSize,
  isDeliveryDay,
  earliestDeliveryDay,
  fmtDeliveryDate,
  pickableDeliveryDay,
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
  date: "2026-12-03",
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

describe("minQty", () => {
  it("needs 3 small boxes and 1 of the other sizes", () => {
    expect(minQty("small")).toBe(3);
    expect(minQty("half")).toBe(1);
    expect(minQty("whole")).toBe(1);
  });
});

describe("changeSize", () => {
  it("raises a line to 3 when Small is picked and remembers the old quantity", () => {
    expect(changeSize({ size: "whole", qty: 1 }, "small")).toEqual({
      size: "small",
      qty: 3,
      qtyBeforeSmall: 1,
    });
  });

  it("puts the old quantity back when leaving Small", () => {
    const small = changeSize({ size: "whole", qty: 2 }, "small");
    expect(changeSize(small, "half")).toEqual({ size: "half", qty: 2 });
  });

  it("keeps the quantity when Small did not raise it", () => {
    const small = changeSize({ size: "whole", qty: 4 }, "small");
    expect(small).toEqual({ size: "small", qty: 4 });
    expect(changeSize(small, "whole")).toEqual({ size: "whole", qty: 4 });
  });

  it("changes nothing when the same size is picked again", () => {
    const small = changeSize({ size: "whole", qty: 1 }, "small");
    expect(changeSize(small, "small")).toEqual(small);
  });

  it("keeps a quantity the customer set while on Small", () => {
    expect(changeSize({ size: "small", qty: 5 }, "whole")).toEqual({
      size: "whole",
      qty: 5,
    });
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
        "Delivery date: Thursday, 3 December 2026",
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

describe("delivery dates", () => {
  it("accepts only YYYY-MM-DD days inside 3–31 December 2026", () => {
    expect(isDeliveryDay("2026-12-03")).toBe(true);
    expect(isDeliveryDay("2026-12-31")).toBe(true);
    for (const bad of ["2026-12-02", "2027-01-01", "2026-12-3", "", 5, null])
      expect(isDeliveryDay(bad)).toBe(false);
  });

  it("earliest day is 3 December before the season, tomorrow during it, null after", () => {
    expect(earliestDeliveryDay(new Date(2026, 10, 22, 9))).toBe("2026-12-03");
    expect(earliestDeliveryDay(new Date(2026, 11, 2, 23, 59))).toBe("2026-12-03");
    expect(earliestDeliveryDay(new Date(2026, 11, 10, 0, 5))).toBe("2026-12-11");
    expect(earliestDeliveryDay(new Date(2026, 11, 30, 18))).toBe("2026-12-31");
    expect(earliestDeliveryDay(new Date(2026, 11, 31, 8))).toBeNull();
  });

  it("keeps a chosen day only while it can still be picked", () => {
    const nov22 = new Date(2026, 10, 22, 9);
    expect(pickableDeliveryDay("2026-12-10", nov22)).toBe("2026-12-10");
    expect(pickableDeliveryDay("", nov22)).toBe("");
    // Picked 10 Dec late on the 9th; it is now past midnight, so the 10th is same-day.
    expect(pickableDeliveryDay("2026-12-10", new Date(2026, 11, 10, 0, 5))).toBe("");
    expect(pickableDeliveryDay("2026-12-11", new Date(2026, 11, 10, 0, 5))).toBe("2026-12-11");
    expect(pickableDeliveryDay("2026-12-31", new Date(2026, 11, 31, 8))).toBe("");
  });

  it("formats a day for the message", () => {
    expect(fmtDeliveryDate("2026-12-03")).toBe("Thursday, 3 December 2026");
    expect(fmtDeliveryDate("2026-12-25")).toBe("Friday, 25 December 2026");
  });
});

describe("hero photos", () => {
  const plain = PRODUCTS.flatMap((p) => p.photos.map((x) => x.src));

  it("are never one of the plain photos, so a product page never shows one twice", () => {
    for (const p of PRODUCTS) expect(plain).not.toContain(p.heroPhoto.src);
  });

  it("are a different photo for each lapis", () => {
    expect(new Set(PRODUCTS.map((p) => p.heroPhoto.src)).size).toBe(PRODUCTS.length);
  });

  // Exact names, not existsSync: macOS disks ignore case, Linux hosts do not.
  it("exist on disk with the exact file name", () => {
    for (const p of PRODUCTS) {
      const dir = join(process.cwd(), "public", dirname(p.heroPhoto.src));
      expect(readdirSync(dir)).toContain(basename(p.heroPhoto.src));
    }
  });
});
