import { atom, useAtom } from 'jotai';
import { axiosInstance, baseUrl } from '../utils/axios-instance';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

export interface CartItem {
  id: string;
  product_name: string;
  metadata: Record<string, unknown> | null | any;
  price: string;
  quantity: number;
  total_price: string;
}

interface CartResponse {
  error: boolean;
  message: string;
  data: CartItem[];
}

interface AddToCartParams {
  line_items: Array<{
    product_id: string;
    quantity: number;
  }>;
}

// Cart state atom
const cartAtom = atom<CartItem[]>([]);
const cartLoadingAtom = atom(false);
const cartErrorAtom = atom<string | null>(null);

// Custom hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const [error, setError] = useAtom(cartErrorAtom);

  const fetchCart = useCallback(async (paginate = 0): Promise<CartResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get<CartResponse>(`${baseUrl}customers/carts?paginate=${paginate}`);
      setCart(response.data.data);
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to fetch cart';
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setCart, setIsLoading, setError]);

  const addToCart = useCallback(async (params: AddToCartParams): Promise<CartResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.post<CartResponse>(`${baseUrl}customers/carts`, params);
      await fetchCart(); // Refresh cart after adding item
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to add item to cart';
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setCart, setIsLoading, setError, fetchCart]);

  const removeFromCart = useCallback(async (itemId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await axiosInstance.delete(`${baseUrl}customers/carts/${itemId}`);
      await fetchCart(); // Refresh cart after removing item
    } catch (error) {
      let errorMessage = 'Failed to remove item from cart';
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setCart, setIsLoading, setError, fetchCart]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await axiosInstance.patch(`${baseUrl}customers/carts/${itemId}`, { quantity });
      await fetchCart(); // Refresh cart after updating quantity
    } catch (error) {
      let errorMessage = 'Failed to update item quantity';
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setCart, setIsLoading, setError, fetchCart]);

  return {
    cart,
    isLoading,
    error,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};
