import { axiosInstance } from "../../utils/axios-instance"

const URL = "/merchants/sales-orders"

const salesURLS = {
  checkOut: '',
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


