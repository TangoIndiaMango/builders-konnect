import { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Address, AddressType } from '../../../utils/types';

const AddressMainPage = () => {
  const [addresses, setAddresses] = useState<
    Partial<Record<AddressType, Address>>
  >({});
  const [deleteType, setDeleteType] = useState<AddressType | null>(null);
  const navigate = useNavigate();

 useEffect(() => {
   const stored = localStorage.getItem('addresses');
   if (stored) {
     setAddresses(JSON.parse(stored));
   }
 }, []);

  const handleDelete = () => {
    if (deleteType) {
      const updated = { ...addresses };
      delete updated[deleteType];
      localStorage.setItem('addresses', JSON.stringify(updated));
      setAddresses(updated);
      setDeleteType(null);
      message.success('Address deleted');
    }
  };

  const renderCard = (type: AddressType, address: Address) => (
    <div key={type}>
      <h2 className="text-lg md:text-2xl text-[#4E4E4E] font-medium mb-4 capitalize">
        {type} Address
      </h2>
      <div className="bg-[#F9F9F9] p-6 shadow-sm">
        <div className="mb-4">
          <p className=" text-base md:text-lg font-medium text-[#4E4E4E]">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-[#4E4E4E]">
            {address.address}, {address.city}, {address.state},{' '}
            {address.country}
          </p>
        </div>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => navigate(`/edit/${type}`)}>
            Edit
          </Button>
          <Button danger onClick={() => setDeleteType(type)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="py-16 px-8">
      <h1 className="text-xl text-[#1E1E1E] md:text-3xl mb-12">My Addresses</h1>

      {!addresses.billing && !addresses.shipping ? (
        <div className="text-center space-y-4">
          <p>You do not have any address yet.</p>
          <Button type="primary" onClick={() => navigate('/edit/billing')}>
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {addresses.billing && renderCard('billing', addresses.billing)}
          {addresses.shipping && renderCard('shipping', addresses.shipping)}
        </div>
      )}

      <Modal
        open={!!deleteType}
        onCancel={() => setDeleteType(null)}
        onOk={handleDelete}
        okText="Yes, Delete"
        okButtonProps={{ danger: true }}
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
