import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';
import { AddressType, Address } from '../../../utils/types';

const EditAddressPage = () => {
  const { type } = useParams<{ type: AddressType }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (type) {
      const stored = localStorage.getItem('addresses');
      const allAddresses = stored ? JSON.parse(stored) : {};
      const current = allAddresses[type];
      if (current) {
        form.setFieldsValue(current);
      }
    }
  }, [type, form]);

  const onFinish = (values: Address) => {
    const stored = localStorage.getItem('addresses');
    const allAddresses = stored ? JSON.parse(stored) : {};

    const updated = {
      ...allAddresses,
      [type!]: values,
    };

    localStorage.setItem('addresses', JSON.stringify(updated));
    message.success(`${type} address updated!`);

    // Decide where to go next
    const otherType: AddressType = type === 'billing' ? 'shipping' : 'billing';
    const hasOther = updated[otherType];

    if (!hasOther) {
      navigate(`/edit/${otherType}`);
    } else {
      navigate('/profile/addresses');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">{type} Address</h1>
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
              Update changes
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAddressPage;
