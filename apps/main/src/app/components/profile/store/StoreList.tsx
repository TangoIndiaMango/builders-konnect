import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, notification } from 'antd';
import { useMemo, useState } from 'react';
import {
  useCreateData,
  useFetchData,
  useFetchSingleData,
} from '../../../../hooks/useApis';
import { FilterState } from '../../../types/table';
import DisplayHeader from '../../common/DisplayHeader';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import SuccessModal from '../../common/SuccessModal';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import { StoreTable } from '../table/StoreTable';
import StoreFormModal from './AddStoreForm';
interface StoreListProps extends FilterState {
  data: any;
  isLoading: boolean;
  refetch: () => void;
}
const StoreList = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setPage,
  setCustomDateRange,
  handleFilterChange,
  filterValue,
  onExport,
  updateLimitSize,
  filterOptions,
  searchValue,
  setSearchValue,
  reset,
  refetch,
}: StoreListProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [initialValues, setInitialValues] = useState<any>(null);
  const [state, setState] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const StatesState = useFetchData('shared/states?paginate=0&country_id=161');
  const CitiesState = useFetchSingleData(
    `shared/cities?paginate=0&country_id=161&state_id=${state}`,
    !!state
  );
  const createStore = useCreateData('merchants/locations');

  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Stores',
        value: `${data?.stats?.total}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Active',
        value: `${data?.stats?.active}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Deactivated',
        value: `${data?.stats?.inactive}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
    ],
    [data?.stats]
  );

  const handleStateChange = (value: string) => {
    setState(value);
    form.setFieldsValue({
      state: value,
      cityRegion: undefined,
    });
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    createStore.mutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'Store created successfully',
        });
        setOpen(false);
        setSuccessModalOpen(true);
        form.resetFields();
        refetch();
      },
      onError: () => {
        notification.error({
          message: 'Store creation failed',
        });
      },
    });
  };

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Stores"
        description="You're viewing all stores below."
        actionButton={
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button onClick={reset}>Clear</Button>
            <Button
              type="primary"
              onClick={() => {
                setMode('add');
                setOpen(true);
              }}
              icon={<PlusOutlined />}
            >
              New Store
            </Button>
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {tableStatsData?.map((item, index) => (
            <TableStats
              key={index}
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
      </SkeletonLoader>

      <TableWrapper
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={filterValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onExport={onExport}
      >
        <StoreTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
          perPage={data?.data?.per_page}
          updateLimitSize={updateLimitSize}
        />
      </TableWrapper>

      <StoreFormModal
        open={open}
        onClose={() => setOpen(false)}
        state={StatesState?.data?.data}
        city={CitiesState?.data?.data}
        handleStateChange={handleStateChange}
        form={form}
        isLoading={isLoading}
        mode={mode}
        initialValues={initialValues}
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

export default StoreList;
