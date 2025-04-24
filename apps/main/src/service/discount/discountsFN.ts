import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDiscount, createDiscountInterface, getDiscounts, getDiscountsOverview, getDiscountsParams, getSingleDiscount, updateDiscount } from "./discounts"

export const useGetDiscountsOverview = (params?: getDiscountsParams) => {
  return useQuery({
    queryKey: ['discounts'],
    queryFn: () => getDiscountsOverview(params),
    retry: false,
  })
}

export const useGetDiscounts = () => {
  return useQuery({
    queryKey: ['discounts'],
    queryFn: () => getDiscounts(),
    retry: false,
  })
}


export const useGetSingleDiscount = (id: string) => {
  return useQuery({
    queryKey: ['discount', id],
    queryFn: () => getSingleDiscount(id),
    retry: false,
    enabled: !!id,
  })
}

export const useCreateDiscount = (data: createDiscountInterface) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createDiscount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] })
    },
  })
}

export const useUpdateDiscount = (id: string, data: createDiscountInterface) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updateDiscount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] })
    },
  })
}


