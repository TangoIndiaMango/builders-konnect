import { useState } from "react";

import { useCallback } from "react";
import { usePurchaseBreakdown } from "./usePurchaseBreakdown";
import { CartItem } from "../store/cartStore";

export const useCartDiscount = () => {
  const [discountCode, setDiscountCode] = useState('');
  const { handlePurchaseAmountBreakdown } = usePurchaseBreakdown();

  const applyDiscount = useCallback((cartItems: CartItem[]) => {
    handlePurchaseAmountBreakdown(cartItems, 'delivery', discountCode, '');
  }, [discountCode, handlePurchaseAmountBreakdown]);

  return {
    discountCode,
    setDiscountCode,
    applyDiscount,
  };
};