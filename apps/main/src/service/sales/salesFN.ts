import { useMutation, useQueryClient } from "@tanstack/react-query"
import { checkOut, checkOutInterface } from "./sales"

export const useCheckOut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: checkOutInterface) => checkOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] })
    },
  })
}

