// SubscriptionCheckout.tsx
import {
  AppleOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Typography } from 'antd';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../../../hooks/usePayment';
import { formatBalance } from '../../../utils/helper';
import ActionIcon from '../../components/common/ActionIcon';
import { useSubscription } from '../../store/subscription';
import { frontendBaseUrl } from '../auth/auth-outlets';

const { Title, Text } = Typography;

const paymentMethods = [
  {
    value: 'paystack',
    label: 'Paystack',
    description: 'Easy payment for Nigeria and Africa',
    icon: <CreditCardOutlined style={{ fontSize: 24, color: '#003399' }} />,
  },
  {
    value: 'apple',
    label: 'Apple Pay',
    description: 'Easy payment for international payment',
    icon: <AppleOutlined style={{ fontSize: 24, color: '#111' }} />,
  },
];

interface PaymentMethodCardProps {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (value: string) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  value,
  label,
  description,
  icon,
  selected,
  onSelect,
}) => (
  <div
    onClick={() => onSelect(value)}
    className={`mb-3 cursor-pointer flex items-center justify-between p-3 transition-all ${
      selected ? 'border-2 border-[#003399]' : 'border border-gray-200'
    }`}
  >
    <div className="mr-4">{icon}</div>
    <div className="flex-1">
      <div className="font-semibold">{label}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
    {selected && <CheckCircleOutlined className="text-[#003399] text-xl" />}
  </div>
);

export interface StartSubscriptionPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  price_item_id: string;
  free_trial: boolean;
  callback_url: string;
  provider: string;
}

export interface StartSubscriptionResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface SuccessTransactionResponse {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
}

export default function SubscriptionCheckout() {
  const { subscription } = useSubscription();
  const { selectedPlan, planName, billingInterval, isFreeTrial } = subscription;
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { initiatePayment, isLoading: isInitiatingPayment } = usePayment();
  const navigate = useNavigate();

  if (!selectedPlan) return <div>No plan selected.</div>;

  const onFinish = async (values) => {
    if (!paymentMethod) {
      message.error('Please select a payment method');
      return;
    }
    try {
      await initiatePayment({
        priceItemId: selectedPlan.id,
        isFreeTrial,
        callbackUrl: `${frontendBaseUrl}/auth/register-vendor`,
        provider: paymentMethod as 'paystack' | 'stripe',
        userDetails: {
          name: values.name,
          company: values.company,
          email: values.email,
          phone: values.phone,
        },
      });
    } catch (error: any) {
      message.error(error?.message || 'Failed to initiate payment');
    }
  };

  return (
    <div>
      <div className="bg-[#003399] p-5">
        <Title
          style={{ color: 'white', textAlign: 'center', marginBottom: 32 }}
        >
          Powerful Tool for Selling
        </Title>
      </div>
      <div className="p-5 relative">
        <ActionIcon
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/subscribe')}
          variant="light"
        />
        <div style={{ marginBottom: 24 }}>
          <Text strong style={{ fontSize: 18 }}>
            Get started with the right plan today
          </Text>
          <div style={{ color: '#888', marginBottom: 16 }}>
            Get discovered by thousands of real buyers looking for building
            materials.
            <br />
            Choose a plan that fits your business and start growing your sales
            in minutes.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Card style={{ borderRadius: 10 }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Company Name" name="company">
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div className="!space-y-3 w-full">
            <Card style={{ borderRadius: 10 }}>
              <div className=" w-full">
                <div className="space-y-3">
                  <Title level={5}>Discount</Title>
                  <Text type="secondary">Apply discount code</Text>
                  <div className="flex items-center gap-3">
                    <Input placeholder="Enter discount code" size="large" />
                    <Button type="primary"size="large">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card style={{ borderRadius: 10 }}>
              <div className=" divide-y divide-gray-200 space-y-5">
                <div className="py-2 flex justify-between">
                  <span>{planName}</span>
                  <span
                    className={`${
                      isFreeTrial ? 'text-gray-500 line-through' : ''
                    }`}
                  >
                    {formatBalance(Number(selectedPlan.amount))}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Discount</span>
                  <span>{formatBalance(Number(selectedPlan.discount))}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>VAT</span>
                  <span>{formatBalance(Number(selectedPlan.vat))}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Total Cost</span>
                  <span
                    className={`${
                      isFreeTrial ? 'text-gray-500 line-through' : ''
                    }`}
                  >
                    {formatBalance(Number(selectedPlan.amount))}
                  </span>
                </div>
              </div>
              <Divider />
              <div style={{ marginBottom: 16 }}>
                <Text strong>Pay With</Text>
                <div className="mt-3 space-y-3">
                  {paymentMethods.map((pm) => (
                    <div key={pm.value} className="space-y-3">
                      <PaymentMethodCard
                        key={pm.value}
                        value={pm.value}
                        label={pm.label}
                        description={pm.description}
                        icon={pm.icon}
                        selected={paymentMethod === pm.value}
                        onSelect={setPaymentMethod}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Button
                type="primary"
                block
                size="large"
                disabled={
                  !paymentMethod ||
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().some(({ errors }) => errors.length)
                }
                loading={isInitiatingPayment}
                onClick={() => form.submit()}
              >
                {isFreeTrial
                  ? `Start ${selectedPlan.free_days} days free trial`
                  : `Pay ${formatBalance(Number(selectedPlan.amount))}`}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
