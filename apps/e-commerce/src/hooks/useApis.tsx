import { axiosInstance, baseUrl } from '../utils/axios-instance';
import { useQuery, useMutation } from '@tanstack/react-query';

// Create Data
export const useCreateData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const { data, config } =
        arg && arg.data !== undefined ? arg : { data: arg, config: {} };
      const response = await axiosInstance.post(baseUrl + url, data, config);
      return response.data;
    },
  });

  return mutation;
};

export const useCreateExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: Record<string, unknown>) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        responseType: 'blob',
      });
      return response.data;
    },
  });

  return mutation;
};

// Get Export Data
export const useGetExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url, {
        responseType: 'blob',
      });
      return response.data;
    },
  });

  return mutation;
};

// Upload Data
export const useUploadData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: Record<string, unknown>) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });

  return mutation;
};

// Logout
export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + 'api/v1/auth/logout');
      return response.data;
    },
  });

  return mutation;
};

// Update (PUT) Data
export const usePutData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: Record<string, unknown>) => {
      const response = await axiosInstance.put(baseUrl + url, arg);
      return response.data;
    },
  });

  return mutation;
};

// Delete Data
export const useDeleteData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Get Data (Single Fetch)
export const useGetData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Fetch Data (GET with Query)
export const useFetchData = (url: string, enabled = true) => {
  const query = useQuery({
    queryKey: ['fetchData', url],
    queryFn: async () => {
      if (!url) return null;
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
    enabled: !!url && enabled,
  });

  return { ...query, isLoading: query.isFetching || query.isLoading };
};

export const useFetchDataSeperateLoading = (url: string, enabled = true) => {
  const query = useQuery({
    queryKey: ['fetchData', url],
    queryFn: async () => {
      if (!url) return null;
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
    enabled: !!url && enabled,
  });

  // Expose both isLoading (first load) and isFetching (background refetch)
  return { ...query, isLoading: query.isLoading, isFetching: query.isFetching };
};

// Fetch Post Data (POST with Query)
export const useFetchPostData = (
  url: string,
  options: Record<string, unknown>
) => {
  const query = useQuery({
    queryKey: [url, options],
    queryFn: async () => {
      const response = await axiosInstance.post(baseUrl + url, options);
      return response.data;
    },
  });

  return { ...query, isLoading: query.isFetching || query.isLoading };
};

// Get all categories

export const useGetCategorizations = (
  level: 'category' | 'subcategory' | 'type',
  parentId?: string
) => {
  return useQuery({
    queryKey: ['categorizations', level, parentId],
    queryFn: async () => {
      const params = {
        paginate: 0,
        table: 'inventory_products',
        level,
        ...(parentId && { parent_id: parentId }),
      };
      const response = await axiosInstance.get('shared/categorizations', {
        params,
      });
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};

type Product = {
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
  };
  primary_media_url: string;
  ratings: number;
};

interface ProductsResponse {
  error: boolean;
  message: string;
  data: {
    total: number;
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

export const useGetInventoryAttributes = (categoryId?: string) => {
  return useQuery({
    queryKey: ['inventoryAttributes', categoryId],
    queryFn: async () => {
      if (!categoryId) {
        return [];
      }
      const response = await axiosInstance.get(`shared/inventory-attributes`, {
        params: {
          paginate: 0,
          category_id: categoryId,
        },
      });
      return response.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

interface GetProductsParams {
  categoryId?: string;
  subcategoryId?: string;
  sort_by?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo_url?: string;
  banner_url?: string;
  description?: string;
  rating?: number;
  total_reviews?: number;
  total_products?: number;
  successful_sales?: number;
  sales_duration?: string;
  ratings?: number;
}

export const useGetMerchant = (id: string, params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: ['merchant', id, params],
    queryFn: async () => {
      if (!id) return null;
      const apiParams: Record<
        string,
        string | number | boolean | string[] | undefined
      > = {
        q: params.q,
        limit: params.limit,
        sort_by: params.sort_by,
        'filters[categorization][category_id]': params.categoryId,
        'filters[categorization][subcategory_id]': params.subcategoryId,
        'filters[categorization][sub_subcategory_id]': params.subSubcategoryId,
        'filters[categorization][product_type_id]': params.productTypeId,
        collection: params.collection,
      };

      // Only add price filters if they are explicitly set
      if (params.minPrice !== undefined) {
        apiParams['filters[price][min]'] = params.minPrice;
      }
      if (params.maxPrice !== undefined) {
        apiParams['filters[price][max]'] = params.maxPrice;
      }

      // Add any dynamic metadata filters
      Object.entries(params).forEach(([key, value]) => {
        if (
          key.startsWith('filters[metadata]') &&
          (typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            Array.isArray(value) ||
            value === undefined)
        ) {
          apiParams[key] = value;
        }
      });

      // Remove undefined parameters
      Object.keys(apiParams).forEach(
        (key) => apiParams[key] === undefined && delete apiParams[key]
      );

      const response = await axiosInstance.get(`/customers/merchants/${id}`, {
        params: apiParams,
      });
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useGetProducts = (params: GetProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const apiParams: Record<
        string,
        string | number | boolean | string[] | undefined
      > = {
        q: params.q,
        limit: params.limit,
        sort_by: params.sort_by,
        'filters[categorization][category_id]': params.categoryId,
        'filters[categorization][subcategory_id]': params.subcategoryId,
        'filters[categorization][sub_subcategory_id]': params.subSubcategoryId,
        'filters[categorization][product_type_id]': params.productTypeId,
        collection: params.collection,
      };

      // Only add price filters if they are explicitly set
      if (params.minPrice !== undefined) {
        apiParams['filters[price][min]'] = params.minPrice;
      }
      if (params.maxPrice !== undefined) {
        apiParams['filters[price][max]'] = params.maxPrice;
      }

      // Add any dynamic metadata filters
      Object.entries(params).forEach(([key, value]) => {
        if (
          key.startsWith('filters[metadata]') &&
          (typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            Array.isArray(value) ||
            value === undefined)
        ) {
          apiParams[key] = value;
        }
      });

      // Remove undefined parameters
      Object.keys(apiParams).forEach(
        (key) => apiParams[key] === undefined && delete apiParams[key]
      );

      const response = await axiosInstance.get('/customers/products', {
        params: apiParams,
      });
      return response.data as ProductsResponse;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};
