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
  shipping_breakdown: {
    base_fee: number;
    delivery_fee: number;
    est_distance: number;
  };
}

export interface PurchaseBreakdownState {
  data: PurchaseBreakdown | null;
  loading: boolean;
}

export const purchaseBreakdownAtom = atom<PurchaseBreakdownState>({
  data: null,
  loading: false,
});

export const fulfilmentTypeAtom = atom<string>('pickup');

export const usePurchaseBreakdown = () => useAtom(purchaseBreakdownAtom);
export const useFulfilmentType = () => useAtom(fulfilmentTypeAtom);