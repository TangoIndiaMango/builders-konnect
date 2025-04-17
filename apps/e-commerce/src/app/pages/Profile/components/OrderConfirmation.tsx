import React from 'react';
import { Modal, Button, Result, Input, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

interface OrderConfirmationProps {
  type: 'success' | 'cancel';
  visible: boolean;
  onClose: () => void;
  onConfirm?: (reason?: string) => void;
  orderNumber?: string;
}

const { TextArea } = Input;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  type,
  visible,
  onClose,
  onConfirm,
  orderNumber,
}) => {
  const [step, setStep] = React.useState<'confirm' | 'reason'>('confirm');
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (!visible) {
      setStep('confirm');
      form.resetFields();
    }
  }, [visible, form]);

  const handleConfirm = () => {
    if (type === 'cancel') {
      if (step === 'confirm') {
        setStep('reason');
      } else {
        form.validateFields().then(values => {
          onConfirm?.(values.reason);
        });
      }
    } else {
      onConfirm?.();
    }
  };

  const getContent = () => {
    if (type === 'cancel') {
      if (step === 'confirm') {
        return {
          icon: <ExclamationCircleOutlined className="text-6xl text-yellow-500" />,
          title: 'Cancel Order',
          subTitle: 'Are you sure you want to cancel this order? Please note this action is irreversible.',
          okText: 'Yes, Cancel Order',
          showCancel: true,
          danger: true,
        };
      } else {
        return {
          icon: <CloseCircleFilled className="text-6xl text-red-500" />,
          title: 'Cancel Order',
          content: (
            <Form form={form} layout="vertical">
              <Form.Item
                name="reason"
                label="Why do you want to cancel your order?"
                rules={[{ required: true, message: 'Please enter a reason' }]}
              >
                <TextArea rows={4} placeholder="Enter Reason" />
              </Form.Item>
            </Form>
          ),
          okText: 'Submit',
          showCancel: true,
          danger: true,
        };
      }
    }

    return {
      icon: <CheckCircleFilled className="text-6xl text-green-500" />,
      title: 'Congratulations',
      subTitle: `Your order ${orderNumber} has been confirmed successfully.`,
      okText: 'View Order',
      showCancel: false,
      danger: false,
    };
  };

  const content = getContent();

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      width={400}
      centered
      closable={false}
      className="order-confirmation-modal"
    >
      <div className="flex flex-col items-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[#EFF8FF] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Cancel Order</h2>
        <p className="text-[#667085] mb-6">Are you sure you want to cancel this order? Please note this action is irreversible.</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-[#FF4D4F] text-white rounded-lg hover:bg-[#ff3333]"
          >
            Yes, Cancel Order
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderConfirmation;