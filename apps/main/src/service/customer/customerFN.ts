import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCustomerInterface, CustomerOverviewParams, getCustomerOverview, updateCustomer } from "./customer"
import { getCustomer, getCustomers, createCustomer } from "./customer"


export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
    retry: false,
  })
}


export const useGetOverviewCustomers = (params?: CustomerOverviewParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomerOverview(params),
    retry: false,
  })
}

export const useGetCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
    retry: false,
  })
}


export const useCreateCustomer = (data: createCustomerInterface) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}

export const useUpdateCustomer = (id: string, data: createCustomerInterface) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}



