import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message, Tag, Typography } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerInformation from '../../components/returns/CustomerInfo';
import ActionConfirmModal from '../../components/returns/ActionConfirmMdal';
import ActionReasonModal from '../../components/returns/ActionReasonModal';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import ReturnOrderDetails from '../../components/returns/ProductReturnsDetails';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';

const ReturnsViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API call to get the return request details
  const decsionUpdate = usePutData(`merchants/returns/${id}`);

  const { data: returnDetailsData, isLoading: returnDetailsLoading } =
    useFetchData(`merchants/returns/${id}`);
  const { data: productDetailsData, isLoading: productDetailsLoading } =
    useFetchData(
      `merchants/inventory-products/${returnDetailsData?.data?.product_id}`
    );

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
  };
  const handleCancel = () => {
    setConfirmType(null);
    setShowReason(null);
  };
  const handleReasonSubmit = (reason: string) => {
    const status = confirmType === 'approve' ? 'approved' : 'declined';
    decsionUpdate.mutate(
      {
        status: status,
        decision_comment: reason,
      },
      {
        onSuccess: (data) => {
          setShowReason(null);
          message.success(data?.message || 'Action completed successfully');
        },
        onError: (error) => {
          message.error(error?.message || 'An error occurred');
        },
      }
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className=" space-y-3">
          <div className="flex items-center gap-3">
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <Typography.Title level={4} className="!mb-0">
              View Request
            </Typography.Title>
            <Tag
              color={
                returnDetailsData?.data?.status === 'pending'
                  ? 'orange'
                  : 'green'
              }
              className="capitalize"
            >
              {returnDetailsData?.data?.status}
            </Tag>
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
          <SkeletonLoader
            active={returnDetailsLoading || productDetailsLoading}
            type="card"
            hasHeader
            className="p-5"
          >
            <ReturnOrderDetails
              returnOrderData={returnDetailsData?.data}
              productImages={productDetailsData?.data?.media}
            />
            <CustomerInformation
              customer={returnDetailsData?.data}
              showOrder={false}
            />
          </SkeletonLoader>
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
