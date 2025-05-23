import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  message,
  Modal,
  notification,
  Skeleton,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useFetchData,
  useFetchSingleData,
  useGetExportData,
  usePutData,
} from '../../../../hooks/useApis';
import { useTableState } from '../../../../hooks/useTable';
import { exportCsvFromString } from '../../../../utils/helper';
import SuccessModal from '../../../components/common/SuccessModal';
import {
  ProductTable,
  ProductTableData,
} from '../../../components/inventory/product-table';
import StoreFormModal from '../../../components/profile/store/AddStoreForm';
import SalesOverview from '../../../components/profile/store/OrderDetails';
import StoreDetailsnfo from '../../../components/profile/store/StoreDetailsnfo';
import { PaginatedResponse } from '../../../types/paginatedData';
import { SalesFilterOptions } from '../../sales/constant';
import { SingleStoreResponse } from '../types';
import { useDeleteProduct } from '../../../../service/inventory/inventoryFN';

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
  const products = useFetchData(
    `merchants/inventory-products?paginate=1&page=${
      currentPage ?? 1
    }&date_filter=${customDateRange ?? ''}&q=${searchValue ?? ''}&limit=${
      limitSize ?? 10
    }&sort_by=${filterKey === 'sort_by' ? filterValue : ''}&status=${
      filterKey === 'status' ? filterValue : ''
    }`
  );
  const navigate = useNavigate();
  const productsData = products?.data?.data
    ?.data as PaginatedResponse<ProductTableData>;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalType, setModalType] = useState<'deactivate' | 'activate'>(
  //   singleSalesOrder?.status === 'active' ? 'deactivate' : 'activate'
  // );

  const deleteProduct = useDeleteProduct();
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

  const [tab, setTab] = useState('sales-overview');

  const onChange = (key: string) => {
    setTab(key);
  };

  const handleEdit = (record: ProductTableData) => {
    navigate(`/pos/inventory/product-edit/${record.id}`, { state: record });
  };

  const handleViewDetails = (record: ProductTableData) => {
    navigate(`/pos/inventory/preview-product/${record.id}`, { state: record });
  };

  const handleDelete = (record: ProductTableData) => {
    Modal.confirm({
      title: 'Delete Product',
      content: `Are you sure you want to delete ${record.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      okButtonProps: {
        loading: deleteProduct.isPending,
        disabled: deleteProduct.isPending,
      },
      centered: true,
      styles: {
        content: {
          minWidth: 400,
          borderRadius: '0px',
        },
      },
      onOk: async () => {
        try {
          await deleteProduct.mutateAsync(record.id, {
            onSuccess: () => {
              message.success('Product deleted successfully');
              products.refetch();
            },
            onError: (error) => {
              // console.log(error);
              message.error(error?.message || 'Failed to delete product');
            },
          });
        } catch (err) {
          console.error('Failed to delete product:', err);
          // message.error('Failed to delete product');
        }
      },
    });
  };

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'sales-overview',
        label: 'Sales Overview',
        children: (
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
            dateRange={customDateRange || null}
          />
        ),
      },
      {
        key: 'products-list',
        label: 'Products/ Inventory List',
        children: (
          <ProductTable
            data={productsData?.data}
            currentPage={currentPage}
            onPageChange={setPage}
            loading={products?.isLoading}
            showCheckbox={true}
            total={productsData?.total}
            perPage={productsData?.per_page}
            updateLimitSize={setLimitSize}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        ),
      },
    ],
    [tab]
  );

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

          <Tabs
            defaultActiveKey="all-sales"
            onChange={onChange}
            items={items}
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
