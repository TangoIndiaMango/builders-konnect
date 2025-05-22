import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { purchaseBreakdownAtom, PurchaseBreakdown } from '../store/purchaseBreakdown';
import { useCreateData } from '../hooks/useApis';

export const usePurchaseBreakdown = () => {
  const setBreakdown = useSetAtom(purchaseBreakdownAtom);
  const purchaseAmountBreakdown = useCreateData('customers/sales-orders/amount/breakdown');

  const handlePurchaseAmountBreakdown = useCallback(
    (cartItemsStore: any[], value: string, discount: string, shippingAddressId: string) => {
      const formData = new FormData();
      cartItemsStore.forEach((item) => {
        formData.append('line_items[]', item?.id);
      });
      if (discount) {
        formData.append('discounts[]', discount);
      }
      formData.append('fulfilment_type', value);
      if (shippingAddressId) {
        formData.append('shipping_address_id', shippingAddressId);
      }

      purchaseAmountBreakdown.mutate(
        {
          data: formData,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            tenant_id: false,
          },
        },
        {
          onSuccess: (data) => {
            setBreakdown({
              data: data?.data as PurchaseBreakdown,
              loading: false,
            });
          },
          onError: (error) => {
            // Optionally handle error
            setBreakdown({
              data: null,
              loading: false,
            });
          },
        }
      );
    },
    [purchaseAmountBreakdown, setBreakdown]
  );

  return {
    handlePurchaseAmountBreakdown,
  };
};