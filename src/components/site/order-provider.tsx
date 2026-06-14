"use client";

import * as React from "react";

import { OrderDialog } from "@/components/site/order-dialog";
import type { ProductKey } from "@/lib/products";

interface OrderContextValue {
  /** Open the pre-order dialog, optionally pre-selecting a lapis. */
  open: (product?: ProductKey) => void;
}

const OrderContext = React.createContext<OrderContextValue | null>(null);

export function useOrder(): OrderContextValue {
  const ctx = React.useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used within an <OrderProvider>");
  }
  return ctx;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [product, setProduct] = React.useState<ProductKey | undefined>(
    undefined,
  );
  // Bumped on every open() so the dialog remounts with a fresh form.
  const [nonce, setNonce] = React.useState(0);

  const open = React.useCallback((p?: ProductKey) => {
    setProduct(p);
    setNonce((n) => n + 1);
    setIsOpen(true);
  }, []);

  const value = React.useMemo<OrderContextValue>(() => ({ open }), [open]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <OrderDialog
        key={nonce}
        open={isOpen}
        onOpenChange={setIsOpen}
        initialProduct={product}
      />
    </OrderContext.Provider>
  );
}
