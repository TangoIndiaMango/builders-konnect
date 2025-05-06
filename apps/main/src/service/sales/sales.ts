import { axiosInstance } from "../../utils/axios-instance"

const URL = "/merchants/sales-orders"

const salesURLS = {
  checkOut: '',
  salesOrder: '?paginate=:paginate&sales_type:sales_type&status:status&payment_status:payment_status'
}

export interface checkOutInterface {
  orders: {
    customer: {
      id: string; //if id is available, you can ignore the rest of the customer payload
      name?: string;
      phone?: string;
      email?: string;
      referral_source?: string;
      opened_via?: string;
    },
    status?: string; //draft, completed
    discount_id?: string;
    sales_type?: string;
    line_items: {
      product_id?: string;
      quantity?: number;
      discount_id?: string;
    }[];
    payment_methods: {
      id?: string;
      amount?: string;
    }[];
  }[];
}

export const checkOut = async (data: checkOutInterface) => {
  const response = await axiosInstance.post(URL + salesURLS.checkOut, data)
  return response.data
}


export interface GetSalesParams {
  paginate?: number;
  limit?: number;
  status?: string;
  date_filter?: string;
  sort_by?: string;
  q?: string;
  export?: string;
  sales_type?: string;
  payment_status?:string;
}

export const getSales = async (params?: GetSalesParams) => {
  const queryParams = new URLSearchParams();

  if (params?.paginate !== undefined) queryParams.append('paginate', params.paginate.toString());
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.date_filter) queryParams.append('date_filter', params.date_filter);
  if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params?.export) queryParams.append('export', params.export);
  if (params?.sales_type) queryParams.append('sales_type', params.sales_type);
  if (params?.payment_status) queryParams.append('payment_status', params.payment_status);

  const queryString = queryParams.toString();
  const finalURL = `${URL}${queryString ? `?${queryString}` : ''}`;

  const response = await axiosInstance.get(finalURL);
  return response.data;
}


