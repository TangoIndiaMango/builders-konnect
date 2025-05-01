import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, getProduct, searchProducts, updateProduct } from './inventory'
import { Product, ProductSearchParams } from './inventory.types'

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
