import { Modal, Button, Input, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { paymentMethodInterface } from '../../pages/sales/create';
import { formatBalance } from '../../../utils/helper';
import { useEffect } from 'react';

interface PaymentAmountModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedMethod: paymentMethodInterface;
  totalAmount: number;
  onConfirmPayment: (amount: number) => void;
  isLoading: boolean;
}

const PaymentAmountModal: React.FC<PaymentAmountModalProps> = ({
  open,
  onClose,
  onBack,
  selectedMethod,
  totalAmount,
  onConfirmPayment,
  isLoading,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { amount: number }) => {
    onConfirmPayment(values.amount);
  };

  // Watch for changes in the amount field
  const amount = Form.useWatch('amount', form);

  // Update balance whenever amount changes
  useEffect(() => {
    const balance = amount ? Number(amount) - Number(totalAmount) : Number(totalAmount);
    form.setFieldValue('balance', balance);
  }, [amount, totalAmount]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      title={
        <div className="flex items-center gap-2">
          <ArrowLeftOutlined onClick={onBack} className="cursor-pointer" />
          <span>{selectedMethod?.name}</span>
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
          initialValues={{
            balance: totalAmount
          }}
        >
          <Form.Item
            name="amount"
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
              className="mt-2"
            />
          </Form.Item>

          <Form.Item
            name="balance"
            label="Balance"
          >
            <Input
              prefix="₦"
              disabled
              value={form.getFieldValue('balance')}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              disabled={!amount || Number(amount) <= 0 || isLoading}
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