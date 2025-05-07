import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message, Tag, Typography } from 'antd';
import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import ProductDetails from '../../components/returns/ProductReturnsDetails';
import CustomerInformation from '../../components/returns/CustomerInfo';
import ActionConfirmModal from '../../components/returns/ActionConfirmMdal';
import ActionReasonModal from '../../components/returns/ActionReasonModal';
import { usePutData } from '../../../hooks/useApis';

const ReturnsViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API call to get the return request details
  const decsionUpdate = usePutData(`merchants/returns/${id}`);

  // Modal states
  const [confirmType, setConfirmType] = useState<'approve' | 'reject' | null>(
    null
  );
  const [showReason, setShowReason] = useState<'approve' | 'reject' | null>(
    null
  );

  // Handlers
  const handleActionClick = (type: 'approve' | 'reject') =>
    setConfirmType(type);
  const handleConfirm = () => {
    setShowReason(confirmType);
    setConfirmType(null);
  };
  const handleCancel = () => {
    setConfirmType(null);
    setShowReason(null);
  };
  const handleReasonSubmit = (reason: string) => {
    decsionUpdate.mutate(
      {
        status: confirmType,
        decision_comment: reason,
      },
      {
        onSuccess: () => {
          setShowReason(null);
          message.success('Decision updated successfully');
        },
        onError: () => {
          message.error('Failed to update decision');
        },
      }
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div>
          <div className="flex items-center gap-3">
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <Typography.Title level={4} className="!mb-0">
              View Staff
            </Typography.Title>
            <Tag color="yellow">pending</Tag>
          </div>
          <p>See details of a refund request and track the progress. </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="primary"
            danger
            onClick={() => handleActionClick('reject')}
          >
            Reject
          </Button>
          <Button type="primary" onClick={() => handleActionClick('approve')}>
            Approve
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-6">
          <ProductDetails />
          <CustomerInformation />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ActionConfirmModal
        open={!!confirmType}
        onCancel={handleCancel}
        onOk={handleConfirm}
        type={confirmType as 'approve' | 'reject'}
      />

      {/* Reason Modal */}
      <ActionReasonModal
        open={!!showReason}
        onCancel={handleCancel}
        onSubmit={handleReasonSubmit}
        type={showReason as 'approve' | 'reject'}
      />
    </div>
  );
};

export default ReturnsViewPage;
