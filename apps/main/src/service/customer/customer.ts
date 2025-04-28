import { axiosInstance } from "../../utils/axios-instance"

const URL = "/merchants/customers"

const customerURLS = {
  getCustomer: '/:id',
  getCustomers: '',
  createCustomer: '',
  updateCustomer: '/:id',
  deleteCustomer: '/:id',
  overView: '?paginate=:paginate&export=:export&limit=:limit&type=:type&date_filter=:date_filter&sort_by=:sort_by&export=csv',
}

export const getCustomer = async (id: string) => {
  const response = await axiosInstance.get(URL + customerURLS.getCustomer.replace(':id', id))
  return response.data
}

export const getCustomers = async () => {
  const response = await axiosInstance.get(URL + customerURLS.getCustomers)
  return response.data
}

export interface createCustomerInterface {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  referral_source?: string;
}

export const createCustomer = async (data: createCustomerInterface) => {
  const response = await axiosInstance.post(URL + customerURLS.createCustomer, data)
  return response.data
}

export const updateCustomer = async (id: string, data: createCustomerInterface) => {
  const response = await axiosInstance.put(URL + customerURLS.updateCustomer.replace(':id', id), data)
  return response.data
}

export const deleteCustomer = async (id: string) => {
  const response = await axiosInstance.delete(URL + customerURLS.deleteCustomer.replace(':id', id))
  return response.data
}

export interface CustomerOverviewParams {
  paginate?: number;
  limit?: number;
  type?: string;
  date_filter?: string;
  sort_by?: string;
  export?: string;
}

export const getCustomerOverview = async (params?: CustomerOverviewParams) => {
  const queryParams = new URLSearchParams();

  if (params?.paginate !== undefined) queryParams.append('paginate', params.paginate.toString());
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params?.type) queryParams.append('type', params.type);
  if (params?.date_filter) queryParams.append('date_filter', params.date_filter);
  if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params?.export) queryParams.append('export', params.export);

  const queryString = queryParams.toString();
  const finalURL = `${URL}/${queryString ? `?${queryString}` : ''}`;

  const response = await axiosInstance.get(finalURL);
  return response.data;
}



