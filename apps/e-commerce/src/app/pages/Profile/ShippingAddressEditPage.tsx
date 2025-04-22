import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { Address } from '../../../utils/types';

const ShippingAddressEditPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('addresses');
    const allAddresses = stored ? JSON.parse(stored) : {};
    const shipping = allAddresses.shipping;
    if (shipping) {
      form.setFieldsValue(shipping);
    }
  }, [form]);

  const onFinish = (values: Address) => {
    const stored = localStorage.getItem('addresses');
    const allAddresses = stored ? JSON.parse(stored) : {};

    const updated = {
      ...allAddresses,
      shipping: values,
    };

    localStorage.setItem('addresses', JSON.stringify(updated));
    message.success('Shipping address updated!');
    navigate('/profile/addresses');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="company" label="Company">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="state" label="State" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <Button type="primary" htmlType="submit">
              Update Changes
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingAddressEditPage;
