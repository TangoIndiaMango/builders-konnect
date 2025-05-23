import { useAtom, useSetAtom } from 'jotai';
import { fulfilmentTypeAtom } from '../store/purchaseBreakdown';
import { useShippingInfo } from '../store/shippingInfo';
import { useAddressManagement } from './useAddress';
import { getAuthUser } from '../utils/auth';

export const useFulfillment = (existingShippingAddress: any, existingBillingAddress: any) => {
  const [value, setValue] = useAtom(fulfilmentTypeAtom);
  const { resetShippingInfo } = useShippingInfo();
  const user = getAuthUser();
  const {
    handleAddressSelect,
    resetAddresses
  } = useAddressManagement(user);

  const handleFulfilmentTypeChange = (type: string) => {
    setValue(type);

    if (type === 'delivery') {
      if (existingShippingAddress?.data?.data?.[0]) {
        handleAddressSelect(
          'shipping',
          existingShippingAddress.data.data[0]
        );
      }
      if (existingBillingAddress?.data?.data?.[0]) {
        handleAddressSelect(
          'billing',
          existingBillingAddress.data.data[0]
        );
      }
    } else {
      resetAddresses();
      resetShippingInfo();
    }
  };

  return {
    value,
    handleFulfilmentTypeChange,
  };
};