import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import SuccessModal from '../../components/common/SuccessModal';
import ChangeStatusDropdown from '../../components/staff/view/ChangeStatusDropDown';
import dayjs from 'dayjs';
import {
  StaffInformation,
  StaffProfileHeader,
} from '../../components/staff/view/ViewStaff';
import ErrorModal from '../../components/common/ErrorModal';
import { Staff } from './types';
import { Roles, Stores } from './types';
import AddStaffModal from '../../components/staff/AddStaffModal';

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
    store: getStaff?.data?.data?.store || '--',
    houseAddress: getStaff?.data?.data?.houseAddress || '--',
    lastActive: getStaff?.data?.data?.last_active,
    status: getStaff?.data?.data?.status || '--',
    staffID: getStaff?.data?.data?.staffID || '--',
    store_id: getStaff?.data?.data?.store_id || '--',
    role_id: getStaff?.data?.data?.role_id || '--',
  };

  const [status, setStatus] = React.useState<'Active' | 'Inactive'>(
    mockStaffData.status
  );
  const [isSuccess, setIsSuccess] = React.useState(false);

  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const roles = useFetchData('merchants/roles?q&sort_by=alphabetically');
  const updateStaff = usePutData(`merchants/staff/${id}`);

  const storeList = stores?.data?.data as Stores[];
  const roleList = roles?.data?.data as Roles[];

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const baseUrl = window.location.origin;
  const handleStaffSubmit = (values: any) => {
    if (modalMode === 'edit') {
      updateStaff.mutate(
        {
          ...values,
          callback_url: `${baseUrl}/auth/add-staff-password`,
        },
        {
          onSuccess: () => {
            setIsStaffModalOpen(false);
            setIsSuccessModalOpen(true);
            getStaff.refetch();
          },
          onError: (error: any) => {
            setIsStaffModalOpen(false);
            setErrorMessage(error.response.data.message);
            setIsErrorModalOpen(true);
          },
        }
      );
    }
  };

  const handleEditClick = () => {
    setModalMode('edit');
    setSelectedStaff(null);
    setIsStaffModalOpen(true);
  };

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

        <div className="flex justify-end gap-2">
          <ChangeStatusDropdown
            currentStatus={status}
            onChange={handleChangeStatus}
            loading={updateStaffStatus.isPending}
          />

          <Button type="primary" onClick={handleEditClick}>
            Edit Staff
          </Button>
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

      <AddStaffModal
        open={isStaffModalOpen}
        onClose={() => {
          setIsStaffModalOpen(false);
          setSelectedStaff(null);
        }}
        stores={storeList || []}
        roles={roleList || []}
        loading={modalMode === 'edit' && updateStaff.isPending}
        onSubmit={handleStaffSubmit}
        mode={modalMode}
        initialValues={mockStaffData}
      />

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Staff Added Successfully"
        message="The staff member has been added successfully."
      />

      <ErrorModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Error"
        message={errorMessage}
      />
    </div>
  );
};

export default ViewStaffDetails;
