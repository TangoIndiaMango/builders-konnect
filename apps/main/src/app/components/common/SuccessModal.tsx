import { Modal, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  title = 'Registration Form Submitted!',
  message = "Your registration to join Builder'sKonnect is under review. Kindly check your email for registration updates.",
  buttonText = 'Okay',
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
          <CheckCircleOutlined className="text-2xl text-green-500" />

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
          className="min-w-[100px] rounded-sm"
        >
          {buttonText}
        </Button>
     </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
