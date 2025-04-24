import { axiosInstance } from "../../utils/axios-instance"

const URL = "/merchants/discounts"

const discountURLS = {
  getDiscounts: '',
  getDiscountOverview: '/?paginate=:paginate&limit=:limit&status=:status&date_filter=:date_filter&sort_by=:sort_by&export=:export&redemption_count=:redemption_count',
  viewSingleDiscount: '/:id',
  createDiscount: '/',
  updateDiscount: '/:id',
  deleteDiscount: '/:id',
}

export interface getDiscountsParams {
  paginate?: number;
  limit?: number;
  status?: string;
  date_filter?: string;
  sort_by?: string;
  export?: string;
  redemption_count?: string;
}

export const getDiscountsOverview = async (params?: getDiscountsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.paginate !== undefined) queryParams.append('paginate', params.paginate.toString());
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.date_filter) queryParams.append('date_filter', params.date_filter);
  if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params?.export) queryParams.append('export', params.export);
  if (params?.redemption_count) queryParams.append('redemption_count', params.redemption_count);

  const queryString = queryParams.toString();
  const finalURL = `${URL}/${queryString ? `?${queryString}` : ''}`;

  const response = await axiosInstance.get(finalURL);
  return response.data;
}

export const getDiscounts = async () => {
  const response = await axiosInstance.get(URL + discountURLS.getDiscounts)
  return response.data
}

export const getSingleDiscount = async (id: string) => {
  const response = await axiosInstance.get(URL + discountURLS.viewSingleDiscount.replace(':id', id))
  return response.data
}

export interface createDiscountInterface {
  name?: string;
  panel?: string;
  code?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  value?: number;
  all_products?: boolean;
  discounted_products?: number[];
}

export const createDiscount = async (data: createDiscountInterface) => {
  const response = await axiosInstance.post(URL + discountURLS.createDiscount, data)
  return response.data
}


export const updateDiscount = async (id: string, data: createDiscountInterface) => {
  const response = await axiosInstance.put(URL + discountURLS.updateDiscount.replace(':id', id), data)
  return response.data
}


