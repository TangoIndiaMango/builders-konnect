import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDeleteData, useFetchData } from '../../../hooks/useApis';

interface Address {
  id: string;
  name: string;
  company: string | null;
  address: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  type: 'billing' | 'shipping';
  is_default: boolean;
}

const AddressMainPage = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { data: addressesData, isLoading, refetch } = useFetchData('customers/addresses');
  const deleteAddressState = useDeleteData(`customers/addresses/${selectedAddress}`);

  const handleDelete = async () => {
    if (selectedAddress) {
      try {
        await deleteAddressState.mutateAsync();
        await refetch();
        message.success('Address deleted successfully');
        setSelectedAddress(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete address';
        message.error(errorMessage);
      }
    }
  };

  const renderCard = (address: Address) => (
    <div key={address.id}>
      <h2 className="text-lg md:text-2xl text-[#4E4E4E] font-medium mb-4 capitalize">
        {address.type} Address
      </h2>
      <div className="bg-[#F9F9F9] p-6 shadow-sm">
        <div className="mb-4">
          <p className=" text-base md:text-lg font-medium text-[#4E4E4E]">
            {address.name}
            {address.company && <span className="block text-sm">{address.company}</span>}
          </p>
          <p className="text-[#4E4E4E]">
            {address.address}, {address.city}, {address.state}, {address.country}
          </p>
          <p className="text-[#4E4E4E]">{address.phone}</p>
        </div>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => navigate(`/edit/${address.type}/${address.id}`)}>
            Edit
          </Button>
          <Button danger onClick={() => setSelectedAddress(address.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="py-16 px-8">
      <h1 className="text-xl font-medium text-[#1E1E1E] md:text-3xl mb-12">
        My Addresses
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {isLoading ? (
          <p>Loading addresses...</p>
        ) : (
          <>
            {addressesData?.data?.length > 0 ? (
              addressesData.data.map((address: Address) => renderCard(address))
            ) : (
              <div className="col-span-2 space-y-8">
                <div className="space-y-6">
                  <p className="font-medium text-base text-[#4E4E4E]">
                    You do not have any addresses yet.
                  </p>
                </div>
              </div>
            )}
            <div className="col-span-2 mt-8">
              <div className="flex gap-4">
                {!addressesData?.data?.some((a: Address) => a.type === 'billing') && (
                  <Button
                    type="primary"
                    className="py-5 rounded-md px-10 text-white"
                    onClick={() => navigate('/edit/billing/')}
                  >
                    Add Billing Address
                  </Button>
                )}
                {!addressesData?.data?.some((a: Address) => a.type === 'shipping') && (
                  <Button
                    type="primary"
                    className="py-5 rounded-md px-10 text-white"
                    onClick={() => navigate('/edit/shipping/')}
                  >
                    Add Shipping Address
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        open={!!selectedAddress}
        onCancel={() => setSelectedAddress(null)}
        onOk={handleDelete}
        okText="Yes, Delete"
        okButtonProps={{ danger: true, loading: deleteAddressState.isPending }}
        cancelText="Cancel"
        title="Delete Address"
      >
        <p className="text-[#000000D9] text-sm mb-5">
          Are you sure you want to delete this address? This cannot be undone.
        </p>
      </Modal>
    </main>
  );
};

export default AddressMainPage;
