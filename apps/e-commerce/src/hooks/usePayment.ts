import PaystackPop from 'paystack-inline-ts';
import { message } from 'antd';
import { useCreateData } from './useApis';

interface CheckoutPayload {
  line_items: string[];
  discounts: string[];
  fulfilment_type: string;
  shipping_address_id: string;
  callback_url: string;
}

interface PaymentConfig {
  payload: CheckoutPayload;
  provider: 'paystack' | 'stripe';
  userDetails?: {
    name: string;
    company?: string;
    email: string;
    phone: string;
  };
}

interface PaymentResponse {
  access_code: string;
  redirecturl: string;
}



/**
 *
 * @returns
 * line_items[]
c_PVNLrGS3Hrs8Y-SKH1LDt

line_items[]
c_PVNLrGS3Hrs8Y-SKH1230

discounts[]
xeyuu21029

discounts[]
awoff-breke

fulfilment_type
delivery, pick-up

shipping_address_id
for delivery only

callback_url
confirmation / receipt page that show success or failure alongside order details
 */

export const usePayment = () => {
  const popup = new PaystackPop();
  const checkoutApi = useCreateData('customers/sales-orders/checkout/initiate');

  const handleTransactionSuccess = async (transactionData: any) => {
    try {
      if (
        transactionData?.reference &&
        transactionData?.status?.toLowerCase() === 'success'
      ) {
        message.success('Payment successful, redirecting...');
        console.log(transactionData);
        window.location.replace(transactionData?.redirecturl);
        return true;
      }
      return false;
    } catch (error: any) {
      message.error(error?.message || 'Failed to verify payment');
      return false;
    }
  };

  const initiatePayment = async (config: PaymentConfig) => {
    try {

      const formData = new FormData();
      config.payload?.line_items.forEach((item) => {
        formData.append('line_items[]', item);
      });

      // if (config.payload?.discounts) {
      //   config.payload?.discounts.forEach((item) => {
      //     formData.append('discounts[]', item);
      //   });
      // }

      formData.append('fulfilment_type', config.payload?.fulfilment_type);
      formData.append('shipping_address_id', config.payload?.shipping_address_id);
      formData.append('callback_url', config.payload?.callback_url);
      formData.append('provider', config.provider);

      const response = await checkoutApi.mutateAsync({
        data: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      const data = response?.data as PaymentResponse;

      return new Promise((resolve, reject) => {
        popup.resumeTransaction({
          accessCode: data.access_code,
          onSuccess: async (transactionData) => {
            const success = await handleTransactionSuccess(transactionData);
            resolve(success);
          },
          onCancel: () => {
            message.error('Transaction was cancelled');
            reject(new Error('Transaction cancelled'));
          },
        });
      });
    } catch (error: any) {
      message.error(error?.message || 'Something went wrong');
      throw error;
    }
  };



  return {
    initiatePayment,
    isLoading: checkoutApi.isPending,
  };
};