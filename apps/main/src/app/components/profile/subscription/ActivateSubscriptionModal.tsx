import { Modal } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';

interface ActivateSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

export const ActivateSubscriptionModal = ({ open, onClose }: ActivateSubscriptionModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <div className="flex flex-col items-center text-center py-4">
        <CustomerServiceOutlined className="text-4xl text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
        <p className="text-gray-600">
          To activate your subscription, please contact our support team.
          They will guide you through the process and help you get started.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

