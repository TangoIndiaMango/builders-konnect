import { atom } from 'jotai';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shippingAddress?: any;
  billingAddress?: any;
  deliveryMethod: 'ship' | 'pickup';
}

export const cartAtom = atom<CartState>({
  items: [],
  subtotal: 0,
  deliveryMethod: 'ship',
  shippingAddress: null,
  billingAddress: null
});

// Helper atom for persisting cart to localStorage
export const persistedCartAtom = atom(
  (get) => get(cartAtom),
  (get, set, newValue: CartState) => {
    set(cartAtom, newValue);
    localStorage.setItem('cart', JSON.stringify(newValue));
  }
);