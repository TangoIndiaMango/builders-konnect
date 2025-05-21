import { atom, useAtom, useSetAtom } from "jotai";
import { AddressI } from "../app/components/Checkout/types";

export interface shippingInfoState {
  addresses: {
    shipping?: AddressI;
    shippingAddyId?: string;
    billing?: AddressI;
    billingAddyId?: string;
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
  };
}

const initialState: shippingInfoState = {
  addresses: {},
  contactInfo: {
    phoneNumber: '',
    email: '',
  }
};

export const shippingInfoAtom = atom<shippingInfoState>(initialState);

// Custom hook to update specific parts of the state
export const useShippingInfo = () => {
  const [shippingInfo, setShippingInfo] = useAtom(shippingInfoAtom);

  const updateAddress = (type: 'shipping' | 'billing', address: AddressI) => {
    setShippingInfo(prev => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [type]: address,
        [`${type}AddyId`]: address.id
      }
    }));
  };

  const updateContactInfo = (phoneNumber: string, email: string) => {
    setShippingInfo(prev => ({
      ...prev,
      contactInfo: {
        phoneNumber,
        email
      }
    }));
  };

  const resetShippingInfo = () => {
    setShippingInfo(initialState);
  };

  return {
    shippingInfo,
    updateAddress,
    updateContactInfo,
    resetShippingInfo
  };
};