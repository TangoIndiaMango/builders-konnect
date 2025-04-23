import { Modal, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  pending?: boolean;
  buttonText?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title = 'Submit Registration Form',
  message = 'Are you sure you want to submit this form? Kindly check that all information is correctly filled.',
  pending = false,
  buttonText="Yes, submit"
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
      width={400}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-2">
          <InfoCircleOutlined
            className="text-[#003399] text-2xl"
            rotate={180}
          />
          <div className="space-y-2 text-left">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-gray-600 ">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            size="middle"
            onClick={onCancel}
            className="min-w-[100px] rounded-sm"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            size="middle"
            onClick={onConfirm}
            className="min-w-[100px] bg-[#003399] rounded-sm"
            loading={pending}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
