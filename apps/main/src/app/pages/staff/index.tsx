import ErrorModal from '../../components/common/ErrorModal';
import SuccessModal from '../../components/common/SuccessModal';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateData,
  useFetchData,
  usePutData,
} from '../../../hooks/useApis';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import AddStaffModal from '../../components/staff/AddStaffModal';
import RolesAndPermission from '../../components/staff/RolesAndPermission';
import StaffList from '../../components/staff/StaffList';
import { Roles, Staff, StaffListResponse, Stores } from './types';
import { PaginatedResponse } from '../../types/paginatedData';


export interface Role {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
const StaffHome = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState('staff');
  const staff = useFetchData('merchants/staff?paginate=1');
  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const roles = useFetchData('merchants/roles?q&sort_by=alphabetically');
  const createStaff = useCreateData('merchants/staff');
  const updateStaff = usePutData(`merchants/staff/`);


    const [search, setSearch] = useState('');
    const {
      data: rolesFetch,
      isLoading,
      refetch,
    } = useFetchData('merchants/roles?paginate=1');

  const rolesData = rolesFetch?.data as PaginatedResponse<Role>;

  const storeList = stores?.data?.data as Stores[];
  const roleList = roles?.data?.data as Roles[];
  const staffListResponse: StaffListResponse = staff?.data?.data;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const onChange = (key: string) => {
    setTab(key);
  };

  const handleStaffSubmit = (values: any) => {
    if (modalMode === 'add') {
      createStaff.mutate(
        {
          ...values,
          callback_url:
            'https://builders-konnect-app.netlify.app/auth/create-password',
        },
        {
          onSuccess: () => {
            setIsStaffModalOpen(false);
            setIsSuccessModalOpen(true);
            staff.refetch();
          },
          onError: (error: any) => {
            setIsStaffModalOpen(false);
            setErrorMessage(error.response.data.message);
            setIsErrorModalOpen(true);
          },
        }
      );
    } else {
      updateStaff.mutate(
        {
          id: selectedStaff?.id,
          data: values,
        },
        {
          onSuccess: () => {
            setIsStaffModalOpen(false);
            setIsSuccessModalOpen(true);
            staff.refetch();
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

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedStaff(null);
    setIsStaffModalOpen(true);
  };

  // const handleEditClick = (staffMember: Staff) => {
  //   setModalMode('edit');
  //   setSelectedStaff(staffMember);
  //   setIsStaffModalOpen(true);
  // };

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'staff',
        label: 'Staff',
        children: <StaffList data={staffListResponse} isLoading={staff?.isLoading} />,
      },
      {
        key: 'roles',
        label: 'Roles and Permissions',
        children: <RolesAndPermission rolesData={rolesData} isLoading={isLoading} refetch={refetch} />,
      },
    ],
    [tab]
  );

  return (
    <div>
      <PageIntroBanner
        title="Staff Management"
        description="Add staff to your business and control staff roles and permissions"
        actionButton={
          <div className="flex items-center justify-end gap-5">
            {tab === 'staff' ? (
              <Button
                type="primary"
                className="rounded"
                size="large"
                icon={<PlusOutlined />}
                onClick={handleAddClick}
              >
                Add Staff
              </Button>
            ) : (
              <Button
                type="primary"
                className="rounded"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => navigate('/pos/staff/add-role')}
              >
                Add Role
              </Button>
            )}
          </div>
        }
      />

      <div className="px-5 bg-white">
        <Tabs defaultActiveKey="all-sales" onChange={onChange} items={items} />
      </div>

      <AddStaffModal
        open={isStaffModalOpen}
        onClose={() => {
          setIsStaffModalOpen(false);
          setSelectedStaff(null);
        }}
        stores={storeList || []}
        roles={roleList || []}
        loading={
          modalMode === 'add' ? createStaff.isLoading : updateStaff.isLoading
        }
        onSubmit={handleStaffSubmit}
        mode={modalMode}
        initialValues={selectedStaff}
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

export default StaffHome;
