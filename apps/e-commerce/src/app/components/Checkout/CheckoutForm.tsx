import { Checkbox, Form, Input } from 'antd';
import {
  ArrowLeftOutlined,
  ShopOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddressComp from './AddressComp';
import { useAddressManagement } from '../../../hooks/useAddress';
import { useFulfillment } from '../../../hooks/useFulfillment';
import { getAuthUser } from '../../../utils/auth';

const options = [
  {
    key: 'delivery',
    icon: <TruckOutlined className="text-xl text-gray-700" />,
    title: 'Ship',
    description: '',
  },
  {
    key: 'pickup',
    icon: <ShopOutlined className="text-xl text-gray-700" />,
    title: 'Pick Up',
    description:
      "Please note that you would have to pick up from the vendor's store yourself",
  },
];

interface CheckoutFormProps {
  form?: any;
  handleCreateAddress: (values: any) => void;
  handleFulfilmentTypeChange: (type: string) => void;
  value?: string;
  user?: any;
  existingShippingAddress?: any;
  existingBillingAddress?: any;
  createAddress?: any;
  handleAddressSelect: (type: 'billing' | 'shipping', address: any) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedShippingAddress?: any;
  selectedBillingAddress?: any;
  handleNextStepAction?: () => void;
  isLoading?: boolean;
  isInitialized: boolean;
}
const CheckoutForm = ({
  form,
  value,
  user,
  existingShippingAddress,
  existingBillingAddress,
  createAddress,
  handleAddressSelect,
  showModal,
  setShowModal,
  selectedShippingAddress,
  selectedBillingAddress,
  handleNextStepAction,
  handleFulfilmentTypeChange,
  isLoading,
  handleCreateAddress,
  isInitialized,
}: CheckoutFormProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && value === 'pickup') {
      handleFulfilmentTypeChange('pickup');
    }
  }, [isInitialized, value]);

  if (isLoading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div>
      <Form
        layout="vertical"
        name="checkout"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        form={form}
        onFinish={handleCreateAddress}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter a valid email',
              type: 'email',
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="newsletter" valuePropName="checked" label={null}>
          <Checkbox>Email me with news and offers</Checkbox>
        </Form.Item>

        <div className="mb-4 space-x-6 space-y-3 flex flex-col gap-3">
          {options.map((option) => (
            <div
              key={option.key}
              onClick={() => handleFulfilmentTypeChange(option.key)}
              className={`flex items-start gap-3 w-full border rounded-md px-4 py-3 cursor-pointer ${
                value === option.key ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${
                  value === option.key ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                {value === option.key && (
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                )}
              </div>
              <div className="flex items-start gap-3">
                {option.icon}
                <div>
                  <p className="font-medium text-gray-800 m-0">
                    {option.title}
                  </p>
                  {option.description && (
                    <p className="text-gray-500 text-sm m-0">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {user && value === 'delivery' ? (
          <div>
            <AddressComp
              value={value as 'delivery' | 'pickup'}
              form={form}
              initialShippingAddress={existingShippingAddress?.data?.data}
              initialBillingAddress={existingBillingAddress?.data?.data}
              isLoading={isLoading}
              handleCreateAddress={handleCreateAddress}
              onAddressSelect={handleAddressSelect}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedShippingAddress={selectedShippingAddress}
              selectedBillingAddress={selectedBillingAddress}
              isInitialized={isInitialized}
            />
          </div>
        ) : (
          value === 'delivery' && (
            <div>
              <div className="flex flex-col gap-3">
                <h1>Please Login to add an Address</h1>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </div>
            </div>
          )
        )}

        <div className="flex justify-between items-center mt-8">
          <Link to="/cart">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="text-blue-500"
            >
              Return to Cart
            </Button>
          </Link>
          <Button
            htmlType="submit"
            loading={createAddress.isPending}
            onClick={handleNextStepAction}
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            {`Continue To ${value === 'delivery' ? 'Shipping' : 'Payment'}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutForm;
