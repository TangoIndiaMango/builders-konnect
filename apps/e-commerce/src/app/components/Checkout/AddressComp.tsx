import { PlusOutlined } from '@ant-design/icons';
import { Button, FormInstance, Modal } from 'antd';
import { useState } from 'react';
import { getAuthUser } from '../../../utils/auth';
import AddressCard from '../AddressCard';
import BillingOrShippingAddyForm from './BillingOrShippingAddyForm';
import { AddressI } from './types';
interface AddressCompProps {
  value: 'ship' | 'pickup';
  form: FormInstance;
  initialShippingAddress: AddressI[];
  initialBillingAddress: AddressI[];
  isLoading?: boolean;
  handleCreateAddress: (addressType: 'billing' | 'shipping') => void;
  onAddressSelect: (type: 'billing' | 'shipping', address: AddressI) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
const AddressComp = ({
  value,
  form,
  initialShippingAddress,
  initialBillingAddress,
  isLoading,
  handleCreateAddress,
  onAddressSelect,
  showModal,
  setShowModal,
}: AddressCompProps) => {
  const [addressType, setAddressType] = useState<'billing' | 'shipping'>(
    'billing'
  );

  const user = getAuthUser();

  const handleAddNewAddress = (addressType: 'billing' | 'shipping') => {
    setAddressType(addressType);
    setShowModal(true);
  };

  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<AddressI | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<AddressI | null>(null);

  const handleAddressSelect = (
    type: 'billing' | 'shipping',
    address: AddressI
  ) => {
    if (type === 'billing') {
      setSelectedBillingAddress(address);
    } else {
      setSelectedShippingAddress(address);
    }
    onAddressSelect(type, address);
  };

  return (
    <div>
      {value === 'ship' && (
        <div className="space-y-5">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddNewAddress('shipping')}
                  className="!text-blue-500"
                >
                  Add New Address
                </Button>
              </div>
              <div className="space-y-3 border border-gray-200 shadow-sm rounded-md p-4 max-h-[300px] overflow-y-auto">
                {initialShippingAddress && initialShippingAddress.length > 0 ? (
                  initialShippingAddress.map((address) => (
                    <AddressCard
                      key={address.id}
                      id={address.id}
                      name={address?.name || ''}
                      companyName={address?.company || ''}
                      address={address?.address || ''}
                      city={address?.city || ''}
                      state={address?.state || ''}
                      country={address?.country || ''}
                      loading={isLoading}
                      isSelected={selectedShippingAddress?.id === address.id}
                      onSelect={() => handleAddressSelect('shipping', address)}
                    />
                  ))
                ) : (
                  <div>
                    No shipping address added click the button above to add one
                  </div>
                )}
              </div>
            </div>
            {/* <h3 className="font-medium text-[#1E1E1E] text-base mt-14">
                Shipping Address
              </h3>
              <Checkbox
                className="mb-4 text-[#1E1E1E]"
                checked={useDifferentShippingAddress}
                onChange={(e) =>
                  setUseDifferentShippingAddress(e.target.checked)
                }
              >
                Enter a different shipping address
              </Checkbox>

              {useDifferentShippingAddress && (
                <div className="mt-4">
                  <BillingOrShippingAddyForm
                    form={form}
                    type="billing"
                    showTitle={false}
                  />
                </div>
              )} */}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => handleAddNewAddress('billing')}
                className="!text-blue-500"
              >
                Add New Address
              </Button>
            </div>
            <div className="space-y-3 border border-gray-200 shadow-sm rounded-md p-4 max-h-[300px] overflow-y-auto">
              {initialBillingAddress && initialBillingAddress.length > 0 ? (
                initialBillingAddress.map((address) => (
                  <AddressCard
                    key={address.id}
                    id={address.id}
                    name={address?.name || ''}
                    companyName={address?.company || ''}
                    address={address?.address || ''}
                    city={address?.city || ''}
                    state={address?.state || ''}
                    country={address?.country || ''}
                    loading={isLoading}
                    isSelected={selectedBillingAddress?.id === address.id}
                    onSelect={() => handleAddressSelect('billing', address)}
                  />
                ))
              ) : (
                <div>
                  No billing address added click the button above to add one
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        onOk={() => {
          handleCreateAddress(addressType);
        }}
      >
        <BillingOrShippingAddyForm
          form={form}
          type={addressType}
          showTitle={false}
        />
      </Modal>
    </div>
  );
};

export default AddressComp;
