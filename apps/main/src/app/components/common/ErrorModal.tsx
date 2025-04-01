import { Modal, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  title = 'Registration Failed',
  message = 'We encountered an error while submitting your registration. Please try again.',
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      onClose();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
      width={410}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-2">
          <CloseCircleOutlined className="text-2xl text-red-500" />

            <div className="space-y-2 text-left">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-gray-600 ">{message}</p>
          </div>
        </div>

       <div className="flex justify-end">
       <Button
          type="primary"
          size="middle"
          onClick={handleOk}
          loading={confirmLoading}
          className="min-w-[100px] bg-red-500 hover:bg-red-600 rounded-sm"
        >
          Try Again
        </Button>
       </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
