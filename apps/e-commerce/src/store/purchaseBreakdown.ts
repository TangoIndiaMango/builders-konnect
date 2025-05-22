import { atom, useAtom } from 'jotai';

export interface PurchaseBreakdown {
  items_count: number;
  total_item_quantity: number;
  subtotal: number;
  discount_breakdown: any[];
  total_discount: number;
  fees: {
    tax: number;
    service_fee: number;
    delivery_fee: number;
  };
  total: number;
  shipping_breakdown: any[];
}

export const purchaseBreakdownAtom = atom<PurchaseBreakdown | null>(null);

export const usePurchaseBreakdown = () => useAtom(purchaseBreakdownAtom);