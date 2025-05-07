import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';

interface ActionConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  type: 'approve' | 'reject';
}

const ActionConfirmModal = ({
  open,
  onCancel,
  onOk,
  type,
}: ActionConfirmModalProps) => (
  <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    centered
    closable={false}
    className="rounded"
    width={400}
  >
    <div className="space-y-4">
      <div className="flex items-start gap-5 ">
        {type === 'reject' ? (
          <ExclamationCircleOutlined className="mb-2 text-3xl text-red-500" />
        ) : (
          <ExclamationCircleOutlined className="mb-2 text-3xl text-yellow-500" />
        )}
        <div>
          <div className="mb-1 text-lg font-semibold">
            {type === 'reject'
              ? 'Reject Refund Request'
              : 'Approve Refund Request'}
          </div>
          <div className="mb-6">
            Are you sure you want to {type} this request?
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" danger={type === 'reject'} onClick={onOk}>
          Yes
        </Button>
      </div>
    </div>
  </Modal>
);

export default ActionConfirmModal;
