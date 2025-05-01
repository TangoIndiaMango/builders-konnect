'use client';
import { useState } from 'react';
import { Button, Input, Select, Form, Divider, Checkbox } from 'antd';
import {
  ArrowLeftOutlined,
  ShopOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCheckout } from '../../../hooks/useContext';
import CheckoutBreadcrumb from '../BreadCrumb';
import { cartItems, steps } from '../../lib/Constants';
import { marble } from '../../lib/assets/images';
import AddressCard from '../AddressCard';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
    const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
      useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [value, setValue] = useState('ship');
    const { setStep } = useCheckout();
 const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
  );
  const options = [
      {
        key: 'ship',
        icon: <TruckOutlined className="text-xl text-gray-700" />,
        title: 'Ship',
        description: '',
      },
      {
        key: 'pickup',
        icon: <ShopOutlined className="text-xl text-gray-700" />,
        title: 'Pick Up',
        description:
          'Please note that you would have to pick up from the vendor’s store yourself',
      },
  ]; 
  
  function handleChange() {
   setShowAddresses(!showAddresses);
  }

  return (
    <div className="min-h-screen  w-full">
      <div className="flex bg-[#F9F9F9]   flex-col xl:flex-row min-h-screen">
        <div className="w-full xl:w-[60%]  bg-white px-6 xl:px-24 py-16">
          <h2 className="md:text-2xl text-lg font-medium text-[#1E1E1E] mb-8">
            Builder Konnect
          </h2>
          <div className="text-sm text-gray-600 mb-6 space-x-1">
            <CheckoutBreadcrumb steps={steps} activeStep="Information" />
          </div>

          <Form layout="vertical">
            <Form.Item label="Email">
              <Input placeholder="Enter" />
            </Form.Item>
            <Checkbox className="mb-4">Email me with news and offers</Checkbox>

            <div className="mb-4 space-x-6">
              <div className="flex flex-col gap-3">
                {options.map((option) => (
                  <div
                    key={option.key}
                    onClick={() => setValue(option.key)}
                    className={`flex items-start gap-3 w-full border rounded-md px-4 py-3 cursor-pointer ${
                      value === option.key
                        ? 'border-blue-500'
                        : 'border-gray-200'
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
            </div>
            {value === 'ship' &&
              (isLoggedIn ? (
                <div className="space-y-8 ">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Billing Address
                    </h2>
                    <AddressCard
                      name="John Doe"
                      address="13, Adeola Odeku Street, Victoria Island, Lagos, Nigeria"
                      onChangeClick={handleChange}
                    />
                    {showAddresses && (
                      <div>
                        <h3 className="font-semibold text-base mb-3">
                          Shipping Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item label="First Name" name="firstName">
                            <Input placeholder="First name" />
                          </Form.Item>
                          <Form.Item label="Last Name" name="lastName">
                            <Input placeholder="Last name" />
                          </Form.Item>
                        </div>

                        <Form.Item label="Company" name="company">
                          <Input placeholder="Enter" />
                        </Form.Item>

                        <Form.Item label="Address" name="address">
                          <Input placeholder="Enter Address" />
                        </Form.Item>

                        <Form.Item label="Country" name="country">
                          <Select
                            placeholder="Select Country"
                            options={[
                              { value: 'nigeria', label: 'Nigeria' },
                              { value: 'ghana', label: 'Ghana' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="State" name="state">
                          <Select
                            placeholder="Select State"
                            options={[
                              { value: 'lagos', label: 'Lagos' },
                              { value: 'abuja', label: 'Abuja' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="City" name="city">
                          <Select
                            placeholder="Select City"
                            options={[
                              { value: 'ikeja', label: 'Ikeja' },
                              { value: 'lekki', label: 'Lekki' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phone">
                          <Input placeholder="Enter Phone Number" />
                        </Form.Item>

                        <h3 className="font-medium text-[#1E1E1E] text-base mt-14">
                          Billing Address
                        </h3>
                        <Checkbox
                          className="mb-4 text-[#1E1E1E]"
                          checked={useDifferentBillingAddress}
                          onChange={(e) =>
                            setUseDifferentBillingAddress(e.target.checked)
                          }
                        >
                          Enter a different address
                        </Checkbox>

                        {useDifferentBillingAddress && (
                          <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Form.Item label="First Name" name="firstName">
                                <Input placeholder="First name" />
                              </Form.Item>
                              <Form.Item label="Last Name" name="lastName">
                                <Input placeholder="Last name" />
                              </Form.Item>
                            </div>

                            <Form.Item label="Company" name="company">
                              <Input placeholder="Enter" />
                            </Form.Item>

                            <Form.Item label="Address" name="address">
                              <Input placeholder="Enter Address" />
                            </Form.Item>

                            <Form.Item label="Country" name="country">
                              <Select
                                placeholder="Select Country"
                                options={[
                                  { value: 'nigeria', label: 'Nigeria' },
                                  { value: 'ghana', label: 'Ghana' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="State" name="state">
                              <Select
                                placeholder="Select State"
                                options={[
                                  { value: 'lagos', label: 'Lagos' },
                                  { value: 'abuja', label: 'Abuja' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="City" name="city">
                              <Select
                                placeholder="Select City"
                                options={[
                                  { value: 'ikeja', label: 'Ikeja' },
                                  { value: 'lekki', label: 'Lekki' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="Phone Number" name="phone">
                              <Input placeholder="Enter Phone Number" />
                            </Form.Item>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Shipping Address
                    </h2>
                    <AddressCard
                      name="John Doe"
                      address="13, Adeola Odeku Street, Victoria Island, Lagos, Nigeria"
                      onChangeClick={handleChange}
                    />
                    {showAddresses && (
                      <div>
                        <h3 className="font-semibold text-base mb-3">
                          Shipping Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item label="First Name" name="firstName">
                            <Input placeholder="First name" />
                          </Form.Item>
                          <Form.Item label="Last Name" name="lastName">
                            <Input placeholder="Last name" />
                          </Form.Item>
                        </div>

                        <Form.Item label="Company" name="company">
                          <Input placeholder="Enter" />
                        </Form.Item>

                        <Form.Item label="Address" name="address">
                          <Input placeholder="Enter Address" />
                        </Form.Item>

                        <Form.Item label="Country" name="country">
                          <Select
                            placeholder="Select Country"
                            options={[
                              { value: 'nigeria', label: 'Nigeria' },
                              { value: 'ghana', label: 'Ghana' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="State" name="state">
                          <Select
                            placeholder="Select State"
                            options={[
                              { value: 'lagos', label: 'Lagos' },
                              { value: 'abuja', label: 'Abuja' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="City" name="city">
                          <Select
                            placeholder="Select City"
                            options={[
                              { value: 'ikeja', label: 'Ikeja' },
                              { value: 'lekki', label: 'Lekki' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phone">
                          <Input placeholder="Enter Phone Number" />
                        </Form.Item>

                        <h3 className="font-medium text-[#1E1E1E] text-base mt-14">
                          Billing Address
                        </h3>
                        <Checkbox
                          className="mb-4 text-[#1E1E1E]"
                          checked={useDifferentBillingAddress}
                          onChange={(e) =>
                            setUseDifferentBillingAddress(e.target.checked)
                          }
                        >
                          Enter a different address
                        </Checkbox>

                        {useDifferentBillingAddress && (
                          <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Form.Item label="First Name" name="firstName">
                                <Input placeholder="First name" />
                              </Form.Item>
                              <Form.Item label="Last Name" name="lastName">
                                <Input placeholder="Last name" />
                              </Form.Item>
                            </div>

                            <Form.Item label="Company" name="company">
                              <Input placeholder="Enter" />
                            </Form.Item>

                            <Form.Item label="Address" name="address">
                              <Input placeholder="Enter Address" />
                            </Form.Item>

                            <Form.Item label="Country" name="country">
                              <Select
                                placeholder="Select Country"
                                options={[
                                  { value: 'nigeria', label: 'Nigeria' },
                                  { value: 'ghana', label: 'Ghana' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="State" name="state">
                              <Select
                                placeholder="Select State"
                                options={[
                                  { value: 'lagos', label: 'Lagos' },
                                  { value: 'abuja', label: 'Abuja' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="City" name="city">
                              <Select
                                placeholder="Select City"
                                options={[
                                  { value: 'ikeja', label: 'Ikeja' },
                                  { value: 'lekki', label: 'Lekki' },
                                ]}
                              />
                            </Form.Item>

                            <Form.Item label="Phone Number" name="phone">
                              <Input placeholder="Enter Phone Number" />
                            </Form.Item>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-base mb-3">
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label="First Name" name="firstName">
                      <Input placeholder="First name" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </div>

                  <Form.Item label="Company" name="company">
                    <Input placeholder="Enter" />
                  </Form.Item>

                  <Form.Item label="Address" name="address">
                    <Input placeholder="Enter Address" />
                  </Form.Item>

                  <Form.Item label="Country" name="country">
                    <Select
                      placeholder="Select Country"
                      options={[
                        { value: 'nigeria', label: 'Nigeria' },
                        { value: 'ghana', label: 'Ghana' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="State" name="state">
                    <Select
                      placeholder="Select State"
                      options={[
                        { value: 'lagos', label: 'Lagos' },
                        { value: 'abuja', label: 'Abuja' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="City" name="city">
                    <Select
                      placeholder="Select City"
                      options={[
                        { value: 'ikeja', label: 'Ikeja' },
                        { value: 'lekki', label: 'Lekki' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Phone Number" name="phone">
                    <Input placeholder="Enter Phone Number" />
                  </Form.Item>

                  <h3 className="font-medium text-[#1E1E1E] text-base mt-14">
                    Billing Address
                  </h3>
                  <Checkbox
                    className="mb-4 text-[#1E1E1E]"
                    checked={useDifferentBillingAddress}
                    onChange={(e) =>
                      setUseDifferentBillingAddress(e.target.checked)
                    }
                  >
                    Enter a different address
                  </Checkbox>

                  {useDifferentBillingAddress && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item label="First Name" name="firstName">
                          <Input placeholder="First name" />
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastName">
                          <Input placeholder="Last name" />
                        </Form.Item>
                      </div>

                      <Form.Item label="Company" name="company">
                        <Input placeholder="Enter" />
                      </Form.Item>

                      <Form.Item label="Address" name="address">
                        <Input placeholder="Enter Address" />
                      </Form.Item>

                      <Form.Item label="Country" name="country">
                        <Select
                          placeholder="Select Country"
                          options={[
                            { value: 'nigeria', label: 'Nigeria' },
                            { value: 'ghana', label: 'Ghana' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item label="State" name="state">
                        <Select
                          placeholder="Select State"
                          options={[
                            { value: 'lagos', label: 'Lagos' },
                            { value: 'abuja', label: 'Abuja' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item label="City" name="city">
                        <Select
                          placeholder="Select City"
                          options={[
                            { value: 'ikeja', label: 'Ikeja' },
                            { value: 'lekki', label: 'Lekki' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item label="Phone Number" name="phone">
                        <Input placeholder="Enter Phone Number" />
                      </Form.Item>
                    </div>
                  )}
                </div>
              ))}

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
                onClick={() => setStep('shipping')}
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                Continue To Shipping
              </Button>
            </div>
          </Form>
        </div>
        <div className="w-full xl:w-1/3 bg-[#F9F9F9] px-6 xl:px-8 py-24">
          <div className="space-y-4">
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-3 border-b last:border-none border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={marble}
                    alt={product.name}
                    className="w-14 h-14 object-cover border"
                  />
                  <div className="text-base">
                    <p className="text-[#4E4E4E]">{product.name}</p>
                  </div>
                </div>
                <div className="font-medium text-[#4E4E4E]">
                  ₦ {product.price.toLocaleString()}
                </div>
              </div>
            ))}

            <div className="flex gap-6">
              <Input
                placeholder="Gift Card or Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button className="bg-[#A4A4A4] text-white font-bold py-5 rounded-md px-6">
                APPLY
              </Button>
            </div>

            <Divider className="my-4" />

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#4E4E4E]">Subtotal</span>
                <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
                  ₦ {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span className="text-sm text-[#4E4E4E]">Shipping</span>
                <span className=" text-base  text-[#4E4E4E] ">
                  Calculated at the next step
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span className="text-sm text-[#1E1E1E]">Total</span>
                <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
                  ₦ {subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
