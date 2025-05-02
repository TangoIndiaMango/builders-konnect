import { Modal, Button, Input, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { paymentMethodInterface } from '../../pages/sales/create';
import { formatBalance } from '../../../utils/helper';
import { useEffect } from 'react';

interface PaymentAmountModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedMethods: paymentMethodInterface[];
  totalAmount: number;
  onConfirmPayments: (payments: { methodId: string; amount: number; balance: number }[]) => void;
  isLoading: boolean;
}

const PaymentAmountModal: React.FC<PaymentAmountModalProps> = ({
  open,
  onClose,
  onBack,
  selectedMethods,
  totalAmount,
  onConfirmPayments,
  isLoading,
}) => {
  const [form] = Form.useForm();

  // Watch the entire form values instead of individual fields
  const formValues = Form.useWatch([], form);
  // console.log(formValues);
  console.log(totalAmount);
  // Calculate balances whenever form values change
  useEffect(() => {
    if (!formValues) return;

    let remainingTotal = totalAmount;
    selectedMethods.forEach((method) => {
      const amount = Number(formValues?.[method.id]?.amount || 0);
      const balance = amount - remainingTotal;
      form.setFieldValue([method.id, 'balance'], balance);
      remainingTotal = balance >= 0 ? 0 : Math.abs(balance);
    });
  }, [formValues, totalAmount]);

  const handleSubmit = () => {
    const payments = selectedMethods.map(method => ({
      methodId: method.id,
      amount: Number(form.getFieldValue([method.id, 'amount']) || 0),
      balance: Number(form.getFieldValue([method.id, 'balance']) || 0)
    }));
    onConfirmPayments(payments);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={
        <div className="flex items-center gap-2">
          <ArrowLeftOutlined onClick={onBack} className="cursor-pointer" />
          <span>Payment Breakdown</span>
        </div>
      }
      width={500}
    >
      <div className="mt-4 space-y-4">
        <div className="p-4 text-center bg-gray-50">
          <div className="text-gray-500">Total Amount</div>
          <div className="text-2xl font-semibold">{formatBalance(totalAmount)}</div>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          {selectedMethods.map((method) => (
            <div key={method.id} className="p-4 mb-4 border rounded-sm">
              <h3 className="mb-3 font-medium">{method.name}</h3>
              <div className="flex items-center justify-between gap-2">
                <Form.Item
                  name={[method.id, 'amount']}
                  label="Amount Collected"
                  rules={[
                    { required: true, message: 'Please input the amount' },
                    {
                      validator: (_, value) => {
                        if (Number(value) <= 0) {
                          return Promise.reject('Amount must be greater than 0');
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    prefix="₦"
                    type="number"
                    placeholder="0.00"

                  />
                </Form.Item>

                <Form.Item
                  name={[method.id, 'balance']}
                  label="Balance"
                >
                  <Input
                    prefix="₦"
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              disabled={!formValues || !Object.values(formValues).some((value: any) =>
                Number(value?.amount) > 0
              ) || isLoading}
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentAmountModal;