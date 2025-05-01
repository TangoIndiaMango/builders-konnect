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
    id: '2381614',
    name: 'Adeboyega Boyega',
    email: 'buildershub@gmail.com',
    phone: '(+234) 80 2424 24212',
    role: 'Sales Representative',
    subsidiary: 'Lagos',
    houseAddress: '23 Ozumba Mbadiwe, Victoria Island, Lagos State',
    lastActive: '2025-01-25T09:00:00',
    status: 'Active',
  };

  const [status, setStatus] = React.useState<'Active' | 'Inactive'>(
    mockStaffData.status
  );
  const [isStatusLoading, setIsStatusLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChangeStatus = (newStatus: 'Active' | 'Inactive') => {
    if (newStatus === status) return;
    setIsStatusLoading(true);
    updateStaffStatus.mutate(
      { status: newStatus },
      {
        onSuccess: () => {
          setStatus(newStatus);
          setIsStatusLoading(false);
          setIsSuccess(true);
        },
        onError: () => {
          setIsStatusLoading(false);
          setIsSuccess(false);
        },
        onSettled: () => {
          setIsStatusLoading(false);
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
            loading={isStatusLoading}
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
