export interface ActionPayload {
  identifier_no: string;
  action: string;
  reference: string;
  metadata: {
    callback_url: string;
    company: string;
    email: string;
    free_trial: boolean;
    name: string;
    phone: string;
    price_item_id: string;
    provider: string;
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
}
