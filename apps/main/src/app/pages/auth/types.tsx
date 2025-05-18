export interface ActionPayload {
  identifier_no: string;
  action: string;
  reference: string;
  metadata: {
    user_information: {
      price_item_id: string;
      user_name: string;
      free_trial: boolean;
      email: string;
      phone: string;
      business_name: string;
      category_id: string;
      business_type: string;
    };
    payment_information: {
      payment_method: string;
      payment_reference: string;
      payment_channel: string;
      metadata: {
        authorization_code: string;
        customer_code: string;
        subscription_code: string;
      };
    };
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
