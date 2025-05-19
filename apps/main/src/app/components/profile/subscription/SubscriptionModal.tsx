import { Modal, Tag, Button, Divider } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { SubscriptionFeature } from '../../../pages/profile/types';

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  isActive: boolean;
  price: number;
  endDate: string;
  features: SubscriptionFeature[];
  onCancelSubscription?: () => void;
  onActivateSubscription?: () => void;
  isLoading: boolean;
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
  onActivateSubscription,
  isLoading,
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
              <Tag color={isActive ? "green" : "red"} className="ml-2">
                {isActive ? 'Active' : 'Inactive'}
              </Tag>
            </div>
            {isActive ? (
              <Button onClick={onCancelSubscription} loading={isLoading}>
                Cancel Subscription
              </Button>
            ) : (
              <Button onClick={onActivateSubscription} loading={isLoading}>
                Reactivate Subscription
              </Button>
            )}
          </div>
          <div>
            <div className="mt-4 mb-1 text-3xl font-bold">
              {price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">
                /per month
              </span>
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
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
