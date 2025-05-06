import { useState, useCallback } from 'react';
import { DiscountType, ProductType } from '../app/pages/sales/types';

export type DiscountMap = Record<string, { discountId: string; price: number }>;

const calculateDiscount = (type: string, discount: number, price: number) => {
  if (type === 'percentage') {
    return (Number(discount) / 100) * Number(price);
  }
  return Number(discount);
};

export function useProductDiscounts(discountData: DiscountType[]) {
  const [discountedPrices, setDiscountedPrices] = useState<DiscountMap>({});

  const applyDiscount = useCallback(
    (product: ProductType, discountId: string) => {
      const discount = discountData.find((d) => d.id === Number(discountId));
      if (!discount) return;

      const discountValue = calculateDiscount(
        discount.type,
        Number(discount.value),
        Number(product.retail_price)
      );
      const newPrice = Number(product.retail_price) - discountValue;

      setDiscountedPrices((prev) => ({
        ...prev,
        [product.id]: { discountId, price: newPrice },
      }));
    },
    [discountData]
  );

  const removeDiscount = useCallback(
    (productId: string) => {
      setDiscountedPrices((prev) => {
        const newPrices = { ...prev };
        delete newPrices[productId];
        return newPrices;
      });
    },
    [discountedPrices]
  );

  return {
    discountedPrices, // { [productId]: { discountId, price } }
    applyDiscount,
    removeDiscount,
  };
}