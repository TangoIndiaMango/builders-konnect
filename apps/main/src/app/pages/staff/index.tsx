import ErrorModal from '../../components/common/ErrorModal';
import SuccessModal from '../../components/common/SuccessModal';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useCreateData,
  useFetchData,
  useGetExportData,
  usePutData,
} from '../../../hooks/useApis';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import AddStaffModal from '../../components/staff/AddStaffModal';
import RolesAndPermission from '../../components/staff/RolesAndPermission';
import StaffList from '../../components/staff/StaffList';
import { Roles, Staff, StaffListResponse, Stores } from './types';
import { PaginatedResponse } from '../../types/paginatedData';
import { exportCsvFromString } from '../../../utils/helper';
import { useTableState } from '../../../hooks/useTable';
import { StaffFilterOptions } from './constant';

export interface Role {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
const StaffHome = () => {
  const navigate = useNavigate();

  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    reset,
    customDateRange,
    setCustomDateRange,
    filterKey,
    filterValue,
    handleFilterChange,
    exportType,
    setExportType,
    limitSize,
    setLimitSize,
  } = useTableState('staff');
  const exportStaff = useGetExportData(`merchants/staff?export=${exportType}`);

  const handleExport = () => {
    exportStaff.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Staff');
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setExportType('');
      },
    });
  };

  useEffect(() => {
    if (exportType) {
      handleExport();
    }
  }, [exportType]);


  const [searchParams, setSearchParams] = useSearchParams();
  const initialParams = searchParams.get('tab') || 'staff';
  const [tab, setTab] = useState(initialParams);
  console.log(tab)

  const searchTabValue = searchValue

  const staff = useFetchData(
    `merchants/staff?paginate=1&page=${currentPage ?? 1}&status=${
      filterKey === 'status' ? filterValue : ''
    }&date_filter=${customDateRange ?? ''}&sort_by=${
      filterKey === 'sort_by' ? filterValue : ''
    }&q=${searchValue ?? ''}&limit=${limitSize ?? 10}`
  );
  const stores = useFetchData('merchants/locations?q&sort_by=alphabetically');
  const roles = useFetchData('merchants/roles?q&sort_by=alphabetically');
  const createStaff = useCreateData('merchants/staff');
  const updateStaff = usePutData(`merchants/staff/`);

  const {
    data: rolesFetch,
    isLoading,
    refetch,
  } = useFetchData(`merchants/roles?paginate=1&q=${searchValue ?? ''}`);

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
    setSearchParams({ tab: key });
  };
  const baseUrl = window.location.origin;
  const handleStaffSubmit = (values: any) => {
    if (modalMode === 'add') {
      createStaff.mutate(
        {
          ...values,
          callback_url: `${baseUrl}/auth/add-staff-password`,
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
            setPage={setPage}
            setSearchValue={setSearch}
            handleFilterChange={handleFilterChange}
            filterOptions={StaffFilterOptions}
            onExport={setExportType}
            filterValue={filterValue ?? ''}
            setCustomDateRange={setCustomDateRange}
            pageSize={pageSize}
            reset={reset}
            updateLimitSize={setLimitSize}
            searchValue={searchValue}
            dateRange={customDateRange || null}
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
            searchValue={searchValue}
            setSearchValue={setSearch}
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

      <div className='p-5'>
      <div className="p-5 bg-white">
        <Tabs defaultActiveKey={tab} onChange={onChange} items={items} />
      </div>
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
          modalMode === 'add' ? createStaff.isPending : updateStaff.isPending
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
