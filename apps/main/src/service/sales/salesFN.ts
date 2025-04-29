import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { checkOut, checkOutInterface, getSales, GetSalesParams } from "./sales"

export const useCheckOut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: checkOutInterface) => checkOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] })
    },
  })
}

export const useGetSales = (params?: GetSalesParams) => {
  return useQuery({
    queryKey: ['sales', params],
    queryFn: () => getSales(params),
    retry: false,
  })
}