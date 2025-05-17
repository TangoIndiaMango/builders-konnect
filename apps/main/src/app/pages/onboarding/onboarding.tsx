// SubscriptionCheckout.tsx
import {
  AppleOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Typography } from 'antd';
import PaystackPop from 'paystack-inline-ts';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateData } from '../../../hooks/useApis';
import { axiosInstance, baseUrl } from '../../../utils/axios-instance';
import { formatBalance } from '../../../utils/helper';
import ActionIcon from '../../components/common/ActionIcon';
import { frontendBaseUrl } from '../auth/auth-outlets';
import { BillingInterval, SubscriptionPlan } from './types';

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

const popup = new PaystackPop();
export default function SubscriptionCheckout() {
  const { state } = useLocation();
  const plan = state?.plan as SubscriptionPlan;
  const billingInterval = state?.billingInterval as BillingInterval;
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('');
  const startSubcriptionApi = useCreateData('merchants/onboarding/subscribe');

  if (!plan) return <div>No plan selected.</div>;

  const selectedPlan = plan.price_items.find(
    (item) => item.interval === billingInterval
  );
  const navigate = useNavigate();

  const isFreeTrial = Number(selectedPlan?.free_days) > 0;

  const handleTransactionSuccess = async (
    transactionData: SuccessTransactionResponse
  ) => {
    // verify payment success
    try {
      if (
        transactionData?.reference &&
        transactionData?.status?.toLowerCase() === 'success'
      ) {
        message.success('Payment successful, redirecting to onboarding page');
        window.location.replace(transactionData?.redirecturl);
        form.resetFields();
      }
    } catch (error: any) {
      message.error(error?.message || 'Failed to verify payment');
    }
  };

  const onFinish = (values) => {
    if (!paymentMethod) {
      message.error('Please select a payment method');
      return;
    }
    const payload: StartSubscriptionPayload = {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      price_item_id: selectedPlan?.id as string,
      free_trial: isFreeTrial,
      callback_url: `${frontendBaseUrl}/auth/register-vendor`,
      provider: paymentMethod,
    };

    startSubcriptionApi.mutate(payload, {
      onSuccess: (data: any) => {
        const response = data?.data as StartSubscriptionResponse;

        // open paystack popup
        popup.resumeTransaction({
          accessCode: response.access_code,
          onSuccess: (transactionData) => {
            handleTransactionSuccess(
              transactionData as unknown as SuccessTransactionResponse
            );
          },
          onCancel: () => {
            message.error('Transaction was cancelled');
          },
        });
      },
      onError: (error: any) => {
        message.error(error?.message || 'Something went wrong');
      },
    });
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
        <div className="flex gap-4 items-center justify-evenly">
          <div className="w-full md:w-1/2">
            <Card style={{ borderRadius: 12 }}>
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
                  <Input />
                </Form.Item>
                <Form.Item label="Company Name" name="company">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input />
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
                  <Input />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card>
              <div className=" divide-y divide-gray-200 space-y-5">
                <div className="py-2 flex justify-between">
                  <span>{plan.name}</span>
                  <span
                    className={`${
                      isFreeTrial ? 'text-gray-500 line-through' : ''
                    }`}
                  >
                    {formatBalance(Number(selectedPlan?.amount))}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>VAT</span>
                  <span>{formatBalance(Number(selectedPlan?.vat))}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Total Cost</span>
                  <span
                    className={`${
                      isFreeTrial ? 'text-gray-500 line-through' : ''
                    }`}
                  >
                    {formatBalance(Number(selectedPlan?.amount))}
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
                loading={startSubcriptionApi.isPending}
                onClick={() => form.submit()}
              >
                {isFreeTrial
                  ? `Start ${selectedPlan?.free_days} days free trial`
                  : `Pay ${formatBalance(Number(selectedPlan?.amount))}`}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
