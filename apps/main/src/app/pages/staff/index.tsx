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
/**
 * paginate
1

limit
status
active, inactive

date_filter
Today, 3 days, 7 days, 14 days, this month, 3 months, this year, 2025, 2025-03-01|2025-03-31

sort_by
alphabetically, date_ascending, date_descending

export
csv
 */
export interface Role {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
const StaffHome = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filterOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value: string) => {
    setStatus(value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const [tab, setTab] = useState('staff');
  const staff = useFetchData(
    `merchants/staff?paginate=1&page=${currentPage}&status=${status}&date_filter=${dateFilter}&sort_by=${sortBy}&q=${searchQuery}`
  );
  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const roles = useFetchData('merchants/roles?q&sort_by=alphabetically');
  const createStaff = useCreateData('merchants/staff');
  const updateStaff = usePutData(`merchants/staff/`);

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
            'https://builders-konnect-app.netlify.app/auth/add-staff-password',
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
        children: (
          <StaffList
            data={staffListResponse}
            isLoading={staff?.isLoading}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleSearch={handleSearch}
            handleFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            selectedFilter={status}
            handleDateFilterChange={handleDateFilterChange}
            selectedDateFilter={dateFilter}
          />
        ),
      },
      {
        key: 'roles',
        label: 'Roles and Permissions',
        children: (
          <RolesAndPermission
            rolesData={rolesData}
            isLoading={isLoading}
            refetch={refetch}
          />
        ),
      },
    ],
    [tab, rolesData, staff, refetch]
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
