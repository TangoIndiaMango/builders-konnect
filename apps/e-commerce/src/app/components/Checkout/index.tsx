'use client';
import {
  ArrowLeftOutlined,
  ShopOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { App, Button, Checkbox, Form, Input, message } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useCreateData,
  useFetchDataSeperateLoading,
} from '../../../hooks/useApis';
import { useCheckout } from '../../../hooks/useContext';
import { usePurchaseBreakdown } from '../../../hooks/usePurchaseBreakdown';
import { persistedCartAtom } from '../../../store/cart';
import { useCart } from '../../../store/cartStore';
import { purchaseBreakdownAtom } from '../../../store/purchaseBreakdown';
import { useShippingInfo } from '../../../store/shippingInfo';
import { getAuthUser } from '../../../utils/auth';
import { cartItems, steps } from '../../lib/Constants';
import CheckoutBreadcrumb from '../BreadCrumb';
import AddressComp from './AddressComp';
import CartSummary from './CartSummary';
import { AddressI } from './types';

interface CreateAddressPayload {
  name: string;
  company: string;
  address: string;
  phone: string;
  is_default: boolean;
  country_id: number;
  state_id: number;
  city_id: number;
  type: string;
  lon: number;
  lat: number;
}


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

function Index() {
  const [discountCode, setDiscountCode] = useState('');
  const [value, setValue] = useState('pickup');
  const { setStep } = useCheckout();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [form] = Form.useForm();
  const user = getAuthUser();
  const { notification } = App.useApp();
  const [cart, setCart] = useAtom(persistedCartAtom);
  const {
    cart: cartItemsStore,
    isLoading: cartIsLoading,
    error,
    fetchCart,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      message.success('Item removed from cart');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || 'Failed to remove item from cart'
      );
    }
  };
  const createAddress = useCreateData('customers/addresses');

  const existingShippingAddress = useFetchDataSeperateLoading(
    `customers/addresses?type=shipping`,
    !!user
  );
  const existingBillingAddress = useFetchDataSeperateLoading(
    `customers/addresses?type=billing`,
    !!user
  );
  const { handlePurchaseAmountBreakdown, isLoading } = usePurchaseBreakdown();
  const purchaseBreakdown = useAtomValue(purchaseBreakdownAtom);

  const initalShippingAddress = existingShippingAddress?.data
    ?.data as AddressI[];
  const initalBillingAddress = existingBillingAddress?.data?.data as AddressI[];

  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<AddressI | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<AddressI | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAddress, updateContactInfo, updateSelectedShippingAddress } = useShippingInfo();

  const handleNotSinedInAction = () => {
    navigate('/auth/login', {
      state: {
        from: location.pathname,
        message: 'Please login to continue with your checkout',
      },
    });
  };

  // Create Address
  const handleCreateAddress = async (addressType: 'billing' | 'shipping') => {
    try {
      const values = await form.validateFields();

      if (!user) {
        const values = await form.validateFields();
        const address = {
          ...values,
          type: addressType,
          is_default: addressType === 'billing',
        };

        // Update cart state with the new address
        setCart({
          ...cart,
          [`${addressType}Address`]: address,
        });
        handleNotSinedInAction();
      } else {
        // If billing address exists
        if (addressType === 'billing') {
          const address = {
            name: values.billing.name,
            company: values.billing.company,
            address: values.billing.address,
            phone: values.billing.phone,
            country_id: values.billing.country_id,
            state_id: values.billing.state_id,
            city_id: values.billing.city_id.toString(),
            type: 'billing',
            is_default: true,
            lon: 0,
            lat: 0,
          };

          createAddress.mutate(address as any, {
            onSuccess: (data: any) => {
              existingBillingAddress.refetch();
              // updateAddress('billing', data.data as AddressI);
              // updateContactInfo(values.billing.phone, values.email);
              message.success('Billing address created successfully');
              setShowModal(false);
              form.resetFields();
            },
            onError: (error: any) => {
              message.error(error?.message);
              setShowModal(false);
            },
          });
        }

        // If shipping address exists
        if (addressType === 'shipping') {
          const address = {
            name: values.shipping.name,
            company: values.shipping.company,
            address: values.shipping.address,
            phone: values.shipping.phone,
            country_id: values.shipping.country_id,
            state_id: values.shipping.state_id,
            city_id: values.shipping.city_id.toString(),
            type: 'shipping',
            is_default: false,
            lon: 0,
            lat: 0,
          };

          createAddress.mutate(address as any, {
            onSuccess: (data: any) => {
              existingShippingAddress.refetch();
              // updateAddress('shipping', data.data as AddressI);
              // updateContactInfo(values.shipping.phone, values.email);
              message.success('Shipping address created successfully');
              setShowModal(false);
              form.resetFields();
            },
            onError: (error: any) => {
              message.error(error?.message);
              setShowModal(false);
            },
          });
        }
      }
    } catch (errorInfo) {
      // This will only run if form validation fails
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

  const handleNextStepAction = () => {
    if (value === 'delivery') {
      setStep('shipping');
    } else {
      setStep('paymentmethod');
    }
  };

  const handleAddressSelect = (
    type: 'billing' | 'shipping',
    address: AddressI
  ) => {
    if (type === 'billing') {
      setSelectedBillingAddress(address);
      updateAddress(type, address);
    } else {
      setSelectedShippingAddress(address);
      updateAddress(type, address);
      updateSelectedShippingAddress(address);
    }
  };

  useEffect(() => {
    handlePurchaseAmountBreakdown(
      cartItemsStore,
      value,
      discountCode,
      selectedShippingAddress?.id ||
        ''
    );
  }, [cartItemsStore, value, discountCode, selectedShippingAddress]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex bg-[#F9F9F9]  flex-col lg:flex-row min-h-screen space-y-5">
        <div className="w-full xl:w-[60%]  bg-white px-6 xl:px-24 py-16">
          <h2 className="md:text-2xl text-lg font-medium text-[#1E1E1E] space-y-5">
            Builder Konnect
          </h2>
          <div className="text-sm text-gray-600 mb-6 space-x-1">
            <CheckoutBreadcrumb steps={steps} activeStep="Information" />
          </div>

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
                  onClick={() => {
                    setValue(option.key);
                    if (option.key === 'delivery') {
                      setSelectedShippingAddress(
                        existingShippingAddress?.data?.data[0] || null
                      );
                      updateAddress('shipping',
                        existingShippingAddress?.data?.data[0] || null
                      );
                    }
                  }}
                  className={`flex items-start gap-3 w-full border rounded-md px-4 py-3 cursor-pointer ${
                    value === option.key ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${
                      value === option.key
                        ? 'border-blue-500'
                        : 'border-gray-400'
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

            {/* Address Component */}
            {user ? (
              <div>
                <AddressComp
                  value={value as 'delivery' | 'pickup'}
                  form={form}
                  initialShippingAddress={initalShippingAddress}
                  initialBillingAddress={initalBillingAddress}
                  isLoading={
                    existingShippingAddress.isLoading ||
                    existingBillingAddress.isLoading ||
                    createAddress.isPending
                  }
                  handleCreateAddress={handleCreateAddress}
                  onAddressSelect={handleAddressSelect}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </div>
            ) : (
              value === 'delivery' && (
                <div>
                  <div className="flex flex-col gap-3">
                    <h1>Please Login to add an Address</h1>
                    <Button onClick={() => navigate('/login')}>Login</Button>
                  </div>
                  {/* <Modal
                    open={showModal}
                    onCancel={() => setShowModal(false)}
                    onOk={() => {
                      handleCreateAddress('shipping');
                    }}
                    width={500}
                    closeIcon={false}
                    centered
                  >
                    <BillingOrShippingAddyForm
                      form={form}
                      type={'shipping'}
                      showTitle={false}
                    />
                  </Modal> */}
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

        {/* Cart Items */}
        <CartSummary
          cartItemsStore={cartItemsStore}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      </div>
    </div>
  );
}

export default Index;
