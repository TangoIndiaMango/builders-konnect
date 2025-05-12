import { Modal, Tag, Button, Divider } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

interface Feature {
  label: string;
}

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  isActive: boolean;
  price: number;
  endDate: string;
  features: Feature[];
  onCancelSubscription?: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  open,
  onClose,
  planName,
  isActive,
  price,
  endDate,
  features,
  onCancelSubscription,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="View Subscription"
      centered

    >
      <div className="mb-4">
        <div className="p-4 border rounded">
          <div className="flex items-center justify-between ">
            <div className="flex gap-3">
              <div className="font-medium">{planName}</div>
              <Tag color="green" className="ml-2">
                {isActive ? 'Active' : 'Inactive'}
              </Tag>
            </div>
            <Button onClick={onCancelSubscription}>Cancel Subscription</Button>
          </div>
          <div>
            <div className="mt-4 mb-1 text-3xl font-bold">
              ₦ {price.toLocaleString()}<span className="text-sm font-normal text-gray-500">/per month</span>
            </div>

          </div>
          <div className="text-sm text-gray-500">
          Subscription end date:{' '}
          <span className="text-blue-600">{endDate}</span>
        </div>
        </div>


      </div>
      <div>
        <div className="font-medium">Feature List</div>
        <Divider />
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircleTwoTone twoToneColor="#003399" />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
