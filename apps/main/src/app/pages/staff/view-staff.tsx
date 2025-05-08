import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import SuccessModal from '../../components/common/SuccessModal';
import ChangeStatusDropdown from '../../components/staff/view/ChangeStatusDropDown';
import {
  StaffInformation,
  StaffProfileHeader,
} from '../../components/staff/view/ViewStaff';

const ViewStaffDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getStaff = useFetchData(`merchants/staff/${id}`);
  console.log('getStaff', getStaff?.data);
  const updateStaffStatus = usePutData(`merchants/staff/${id}`);

  const mockStaffData: any = {
    id: getStaff?.data?.data?.id,
    name: getStaff?.data?.data?.name,
    email: getStaff?.data?.data?.email,
    phone: getStaff?.data?.data?.phone,
    role: getStaff?.data?.data?.role,
    subsidiary: getStaff?.data?.data?.subsidiary || '--',
    houseAddress: getStaff?.data?.data?.houseAddress || '--',
    lastActive: getStaff?.data?.data?.last_active,
    status: getStaff?.data?.data?.status || '--',
  };

  const [status, setStatus] = React.useState<'Active' | 'Inactive'>(
    mockStaffData.status
  );
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChangeStatus = (newStatus: 'Active' | 'Inactive') => {
    if (newStatus === status) return;
    updateStaffStatus.mutate(
      { is_active: newStatus === 'Active' ? true : false },
      {
        onSuccess: () => {
          setStatus(newStatus);
          getStaff.refetch();
          setIsSuccess(true);
        },
        onError: () => {
          setIsSuccess(false);
        },
        onSettled: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View Staff
          </Typography.Title>
        </div>

        <div className="flex justify-end">
          <ChangeStatusDropdown
            currentStatus={status}
            onChange={handleChangeStatus}
            loading={updateStaffStatus.isLoading}
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <StaffProfileHeader staff={mockStaffData} />
        <StaffInformation staff={mockStaffData} />
      </div>

      <SuccessModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Status Changed"
        message={`Staff status changed to ${status}.`}
      />
    </div>
  );
};

export default ViewStaffDetails;
