import React, { useState } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';

interface Address {
  id: number;
  type: string;
  address: string;
  isDefault: boolean;
}

interface AddressFormValues {
  type: string;
  address: string;
}

const Addresses: React.FC = () => {
  const [addresses] = useState<Address[]>([]);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);

  const handleAddAddress = (values: AddressFormValues) => {
    console.log('New address:', values);
    setIsAddressModalVisible(false);
    notification.success({
      message: 'Address Added',
      description: 'Your new address has been added successfully.',
    });
  };

  return (
    <div>
      {addresses.length === 0 ? (
        <div>
          <p className="mb-4">You do not have any address yet</p>
          <Button
            type="primary"
            onClick={() => setIsAddressModalVisible(true)}
            className="bg-[#003399]"
          >
            Add New Address
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddressModalVisible(true)}
            className="mb-4 bg-[#003399]"
          >
            Add New Address
          </Button>
          <div className="space-y-4">
            {addresses.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.type}</p>
                    <p>{item.address}</p>
                    {item.isDefault && (
                      <span className="text-[#003399] text-sm">Default Address</span>
                    )}
                  </div>
                  <div>
                    <Button type="link">Edit</Button>
                    <Button type="link" danger>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      <Modal
        title="Add New Address"
        open={isAddressModalVisible}
        onCancel={() => setIsAddressModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddAddress} layout="vertical">
          <Form.Item
            name="type"
            label="Address Type"
            rules={[{ required: true, message: 'Please select address type' }]}
          >
            <Input placeholder="e.g., Home, Office" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter your full address" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-[#003399]">
              Save Address
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;
