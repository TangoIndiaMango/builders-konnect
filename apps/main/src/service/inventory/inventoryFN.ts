import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, getProduct, searchProducts, updateProduct } from './inventory'
import { Product, ProductSearchParams } from './inventory.types'
import { axiosInstance } from '../../utils/axios-instance'

export const useSearchProducts = (params?: ProductSearchParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => searchProducts(params),
    retry: false,
    staleTime: 1000 * 60, // Cache results for 1 minute
    enabled: !!params?.q, // Only run query if there's a search term
    refetchOnWindowFocus: false
  })
}

interface InventoryAttribute {
  id: string;
  attribute: string;
  possible_values?: string[];
  category: string;
}

export const useGetInventoryAttributes = (categoryId?: string) => {
  return useQuery({
    queryKey: ['inventoryAttributes', categoryId],
    queryFn: async () => {
      const params = {
        paginate: 0,
        category_id: categoryId
      }
      const response = await axiosInstance.get('shared/inventory-attributes', { params })
      return response.data.data
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  })
}

export const useGetMeasuringUnits = () => {
  return useQuery({
    queryKey: ['measuringUnits'],
    queryFn: async () => {
      const response = await axiosInstance.get('shared/measuring-units')
      return response.data.data
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  })
}

export const useGetCategorizations = (level: 'category' | 'subcategory' | 'type', parentId?: string) => {
  return useQuery({
    queryKey: ['categorizations', level, parentId],
    queryFn: async () => {
      const params = {
        paginate: 0,
        table: 'inventory_products',
        level,
        ...(parentId && { parent_id: parentId })
      }
      const response = await axiosInstance.get('shared/categorizations', { params })
      return response.data.data
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  })
}

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    retry: false,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Product>) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = (id: string, data: Partial<Product>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    },
  })
}

export const useDeleteProduct = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
