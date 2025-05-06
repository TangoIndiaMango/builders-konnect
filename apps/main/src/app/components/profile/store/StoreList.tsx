import { Button, Form, notification } from 'antd';
import DisplayHeader from '../../common/DisplayHeader';
import TimelineFilter from '../../common/filters/TimelineFilter';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import { StoreTable } from '../table/StoreTable';
import { PlusOutlined } from '@ant-design/icons';
import {
  useCreateData,
  useFetchData,
  useFetchSingleData,
} from '../../../../hooks/useApis';
import { useMemo, useState } from 'react';
import StoreFormModal from './AddStoreForm';
import SuccessModal from '../../common/SuccessModal';
interface StoreListProps {
  data: any;
  isLoading: boolean;
  currentPage: number;
  handlePageChange: (page: number, pageSize: number) => void;
  handleSearch: (value: string) => void;
  handleDateFilterChange: (value: string) => void;
  filterOptions: any;
  handleFilterChange: (value: string) => void;
  selectedFilter: string;
  selectedDateFilter: string;
  refetch: () => void;
}
const StoreList = ({
  data,
  isLoading,
  currentPage,
  handlePageChange,
  handleSearch,
  handleDateFilterChange,
  filterOptions,
  handleFilterChange,
  selectedFilter,
  selectedDateFilter,
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
            <Button
              onClick={() => {
                handleFilterChange('');
              }}
            >
              Clear
            </Button>
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
        onSearch={handleSearch}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      >
        <StoreTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
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
