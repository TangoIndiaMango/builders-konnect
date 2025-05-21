import { Form, Input, Button, FormInstance } from 'antd';
import { useAtom } from 'jotai';
import { persistedCartAtom } from '../../../store/cart';

interface GuestAddressFormProps {
  type: 'billing' | 'shipping';
  onSave: (address: any) => void;
  form: FormInstance;
}

const GuestAddressForm = ({ type, onSave, form }: GuestAddressFormProps) => {
  const [cart, setCart] = useAtom(persistedCartAtom);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const address = {
        ...values,
        type,
        is_default: type === 'billing',
      };

      // Update cart state with the new address
      setCart({
        ...cart,
        [`${type}Address`]: address,
      });

      onSave(address);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <>
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter your address' }]}
      >
        <Input.TextArea placeholder="Enter your address" />
      </Form.Item>
    </>
  );
};

export default GuestAddressForm;
