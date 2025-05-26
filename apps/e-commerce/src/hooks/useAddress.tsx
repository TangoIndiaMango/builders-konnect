import { useState, useEffect, useCallback } from 'react';
import { Form, message } from 'antd';
import { useCreateData, useFetchDataSeperateLoading } from './useApis';
import { AddressI } from '../app/components/Checkout/types';
import { useAtom } from 'jotai';
import { persistedCartAtom } from '../store/cart';
import { useShippingInfo } from '../store/shippingInfo';

export const useAddressManagement = (user: any) => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<AddressI | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<AddressI | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cart, setCart] = useAtom(persistedCartAtom);
  const createAddress = useCreateData('customers/addresses');
  const { updateAddress, resetShippingInfo, updateSelectedShippingAddress } = useShippingInfo();

  const existingShippingAddress = useFetchDataSeperateLoading(
    `customers/addresses?type=shipping`,
    !!user
  );
  const existingBillingAddress = useFetchDataSeperateLoading(
    `customers/addresses?type=billing`,
    !!user
  );

  // Handle initial address selection when data is loaded
  useEffect(() => {
    if (!isInitialized && user && existingShippingAddress.data && existingBillingAddress.data) {
      const shippingAddresses = existingShippingAddress.data.data as AddressI[];
      const billingAddresses = existingBillingAddress.data.data as AddressI[];

      if (shippingAddresses.length > 0) {
        handleAddressSelect('shipping', shippingAddresses[0]);
      }
      if (billingAddresses.length > 0) {
        handleAddressSelect('billing', billingAddresses[0]);
      }
      setIsInitialized(true);
    }
  }, [existingShippingAddress.data, existingBillingAddress.data, user, isInitialized]);

  const handleCreateAddress = async (addressType: 'billing' | 'shipping') => {
    try {
      const values = await form.validateFields();

      if (!user) {
        const address = {
          ...values,
          type: addressType,
          is_default: addressType === 'billing',
        };
        setCart({
          ...cart,
          [`${addressType}Address`]: address,
        });
        return;
      }

      const address = {
        name: values[addressType].name,
        company: values[addressType].company,
        address: values[addressType].address,
        phone: values[addressType].phone,
        country_id: values[addressType].country_id,
        state_id: values[addressType].state_id,
        city_id: values[addressType].city_id.toString(),
        type: addressType,
        is_default: addressType === 'billing',
        lon: values[addressType].longitude || 0,
        lat: values[addressType].latitude || 0,
      };

      createAddress.mutate(address as any, {
        onSuccess: (data: any) => {
          if (addressType === 'billing') {
            existingBillingAddress.refetch();
          } else {
            existingShippingAddress.refetch();
          }
          message.success(`${addressType} address created successfully`);
          setShowModal(false);
          form.resetFields();
        },
        onError: (error: any) => {
          message.error(error?.message);
          setShowModal(false);
        },
      });
    } catch (errorInfo) {
      const errorFields = form.getFieldsError();
      const errorMessages = errorFields
        .filter(({ errors }) => errors.length > 0)
        .map(({ name, errors }) => `${name.join('.')}: ${errors[0]}`)
        .join('\n');

      message.error(
        <div>
          <p>Please fix the following errors:</p>
          <pre>{errorMessages}</pre>
        </div>
      );
    }
  };

  const handleAddressSelect = (type: 'billing' | 'shipping', address: AddressI) => {
    if (type === 'billing') {
      setSelectedBillingAddress(address);
      updateAddress(type, address);
    } else {
      setSelectedShippingAddress(address);
      updateAddress(type, address);
      updateSelectedShippingAddress(address);
    }
  };

  const isLoading = existingShippingAddress.isLoading ||
                   existingBillingAddress.isLoading ||
                   createAddress.isPending;

  const resetAddresses = useCallback(() => {
    setSelectedShippingAddress(null);
    setSelectedBillingAddress(null);
    form.resetFields();
  }, [form]);

  return {
    form,
    showModal,
    setShowModal,
    selectedShippingAddress,
    selectedBillingAddress,
    existingShippingAddress,
    existingBillingAddress,
    handleCreateAddress,
    handleAddressSelect,
    createAddress,
    setSelectedShippingAddress,
    setSelectedBillingAddress,
    isLoading,
    isInitialized,
    resetAddresses,
  };
};