import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axios-instance';

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  code: string;
  retail_price: string;
  discount_information: {
    id: number;
    type: string;
    value: string;
    amount: string;
  } | null;
  primary_media_url: string;
  ratings: number;
  total_reviews: number;
  seller: {
    name: string | null;
    location_id: string;
  };
  description: string | null;
  metadata: any;
  media: string[];
  ratings_breakdown: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

interface ProductDetailsResponse {
  error: boolean;
  message: string;
  data: ProductDetails;
}

export const useProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) return null;
      const response = await axiosInstance.get(`/customers/products/${productId}`);
      return response.data as ProductDetailsResponse;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });
};
