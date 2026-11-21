import { describe, expect, it } from "vitest";

import { parseOrderDraft, type OrderDraft } from "./order-draft";

const good: OrderDraft = {
  lines: [
    { product: "plum", size: "half", qty: 2 },
    { product: "original", size: "whole", qty: 1 },
  ],
  name: "Sari Dewi",
  customerWa: "812 3456 7890",
  address: "Jl. Kemang Raya 10, Jakarta Selatan",
  step: "details",
};

describe("parseOrderDraft", () => {
  it("reads back a saved draft", () => {
    expect(parseOrderDraft(JSON.stringify(good))).toEqual(good);
  });

  it("returns null when nothing is saved or the JSON is broken", () => {
    expect(parseOrderDraft(null)).toBeNull();
    expect(parseOrderDraft("{not json")).toBeNull();
    expect(parseOrderDraft("[]")).toBeNull();
  });

  it("rejects an unknown lapis or size", () => {
    const badProduct = { ...good, lines: [{ product: "durian", size: "whole", qty: 1 }] };
    const badSize = { ...good, lines: [{ product: "plum", size: "huge", qty: 1 }] };
    expect(parseOrderDraft(JSON.stringify(badProduct))).toBeNull();
    expect(parseOrderDraft(JSON.stringify(badSize))).toBeNull();
  });

  it("rejects quantities outside 1 to 10 or not whole numbers", () => {
    for (const qty of [0, 11, 1.5, "2"]) {
      const d = { ...good, lines: [{ product: "plum", size: "whole", qty }] };
      expect(parseOrderDraft(JSON.stringify(d))).toBeNull();
    }
  });

  it("rejects no lines or more than 8", () => {
    const line = { product: "plum", size: "whole", qty: 1 };
    expect(parseOrderDraft(JSON.stringify({ ...good, lines: [] }))).toBeNull();
    expect(
      parseOrderDraft(JSON.stringify({ ...good, lines: Array(9).fill(line) })),
    ).toBeNull();
  });

  it("rejects a step that cannot be restored and non-string fields", () => {
    expect(parseOrderDraft(JSON.stringify({ ...good, step: "sent" }))).toBeNull();
    expect(parseOrderDraft(JSON.stringify({ ...good, name: 42 }))).toBeNull();
  });
});
