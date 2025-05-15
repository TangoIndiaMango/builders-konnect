import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  message,
  Modal,
  notification,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import { SkeletonLoader } from '../../../components/common/SkeletonLoader';
import { exportCsvFromString, getStatusColor } from '../../../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import SalesOverview from '../../../components/profile/store/OrderDetails';
import {
  useFetchData,
  useFetchSingleData,
  useGetExportData,
  usePutData,
} from '../../../../hooks/useApis';
import StoreDetailsnfo from '../../../components/profile/store/StoreDetailsnfo';
import { SingleStoreResponse } from '../types';
import { useTableState } from '../../../../hooks/useTable';
import { SalesFilterOptions } from '../../sales/constant';
import StoreFormModal from '../../../components/profile/store/AddStoreForm';
import SuccessModal from '../../../components/common/SuccessModal';

const SingleStoreDetails = () => {
  const { id } = useParams();

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

  const getSalesOrder =
    useFetchData(`merchants/locations/${id}?with_sales_overview=true
`);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  // const [initialValues, setInitialValues] = useState<any>(null);
  const [state, setState] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const StatesState = useFetchData('shared/states?paginate=0&country_id=161');
  const CitiesState = useFetchSingleData(
    `shared/cities?paginate=0&country_id=161&state_id=${state}`,
    !!state
  );
  const updateStore = usePutData(`merchants/locations/${id}`);
  const singleSalesOrder = getSalesOrder?.data?.data as SingleStoreResponse;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalType, setModalType] = useState<'deactivate' | 'activate'>(
  //   singleSalesOrder?.status === 'active' ? 'deactivate' : 'activate'
  // );
  const handleDeactivateStore = () => {
    updateStore.mutate(
      {
        is_active: singleSalesOrder?.status === 'active' ? false : true,
      } as any,
      {
        onSuccess: () => {
          message.success(
            `${
              singleSalesOrder?.status === 'active'
                ? 'Deactivated'
                : 'Activated'
            } store successfully`
          );
          getSalesOrder.refetch();
          setIsModalOpen(false);
        },
        onError: (error: any) => {
          message.error('Failed to deactivate store', error?.message);
        },
      }
    );
  };

  const handleStateChange = (value: string) => {
    setState(value);
    form.setFieldsValue({
      state: value,
      cityRegion: undefined,
    });
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    updateStore.mutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'Store created successfully',
        });
        setOpen(false);
        setSuccessModalOpen(true);
        form.resetFields();
        getSalesOrder.refetch();
      },
      onError: () => {
        notification.error({
          message: 'Store creation failed',
        });
      },
    });
  };
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View Store
          </Typography.Title>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={() => {
              setMode('edit');
              setOpen(true);
            }}
          >
            Edit Store
          </Button>

          {getSalesOrder.isFetching ? (
            <Skeleton.Input active={true} size="small" />
          ) : (
            <Button
              type="primary"
              danger={singleSalesOrder?.status === 'active'}
              onClick={() => setIsModalOpen(true)}
            >
              {singleSalesOrder?.status === 'active'
                ? 'Deactivate'
                : 'Activate'}
            </Button>
          )}
        </div>
      </div>

      <div className="p-5 ">
        <div className="p-5 space-y-5 bg-white">
          <Typography.Title level={4}>
            {singleSalesOrder?.name} store
          </Typography.Title>
          <StoreDetailsnfo
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
          />
          <SalesOverview
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
            currentPage={currentPage}
            setPage={setPage}
            setSearchValue={setSearch}
            handleFilterChange={handleFilterChange}
            filterOptions={SalesFilterOptions}
            onExport={handleExport}
            filterValue={filterValue ?? ''}
            setCustomDateRange={setCustomDateRange}
            pageSize={pageSize}
            reset={reset}
            updateLimitSize={setLimitSize}
            searchValue={searchValue}
          />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="space-y-4">
          <Typography.Title level={4}>
            {singleSalesOrder?.status === 'active'
              ? 'Deactivate Store'
              : 'Activate Store'}
          </Typography.Title>
          <Typography.Text>
            {singleSalesOrder?.status === 'active'
              ? 'Are you sure you want to deactivate this store? Products in deactivated stores can not be sold.'
              : 'Products in active stores can be sold to customers.'}
          </Typography.Text>
          <div className="flex items-center justify-end gap-3 mt-3">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              danger={singleSalesOrder?.status === 'active'}
              onClick={handleDeactivateStore}
              loading={updateStore.isPending}
            >
              {singleSalesOrder?.status === 'active'
                ? 'Deactivate'
                : 'Activate'}
            </Button>
          </div>
        </div>
      </Modal>

      <StoreFormModal
        open={open}
        onClose={() => setOpen(false)}
        state={StatesState?.data?.data}
        city={CitiesState?.data?.data}
        handleStateChange={handleStateChange}
        form={form}
        isLoading={getSalesOrder.isLoading}
        loading={updateStore.isPending}
        mode={mode}
        initialValues={singleSalesOrder}
        onSubmit={onSubmit}
      />

      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Store created successfully"
        message="Your store has been created successfully. You can now view it in the list of stores."
      />
    </div>
  );
};

export default SingleStoreDetails;
