import PaystackPop from 'paystack-inline-ts';
import { message } from 'antd';
import { useCreateData } from './useApis';

interface PaymentConfig {
  priceItemId: string;
  isFreeTrial?: boolean;
  callbackUrl: string;
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

export const usePayment = () => {
  const popup = new PaystackPop();
  const startPaymentApi = useCreateData('merchants/onboarding/subscribe');
  const activateSubscriptionApi = useCreateData('merchants/subscription/activate');

  const handleTransactionSuccess = async (transactionData: any) => {
    try {
      if (
        transactionData?.reference &&
        transactionData?.status?.toLowerCase() === 'success'
      ) {
        message.success('Payment successful, redirecting...');
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
      const payload = {
        ...(config.userDetails && { ...config.userDetails }),
        price_item_id: config.priceItemId,
        free_trial: config.isFreeTrial,
        callback_url: config.callbackUrl,
        provider: config.provider,
      };

      const response = await startPaymentApi.mutateAsync(payload);
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

  const activateSubscription = async (subscriptionId: string, config: Omit<PaymentConfig, 'userDetails'>) => {
    try {
      const payload = {
        subscription_id: subscriptionId,
        price_item_id: config.priceItemId,
        callback_url: config.callbackUrl,
        provider: config.provider,
      };

      const response = await activateSubscriptionApi.mutateAsync(payload);
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
    activateSubscription,
    isLoading: startPaymentApi.isPending || activateSubscriptionApi.isPending,
  };
};