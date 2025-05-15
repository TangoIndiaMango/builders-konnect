import { Button, Form, notification } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import {
  useCreateData,
  useFetchData,
  useFetchSingleData,
} from '../../../../hooks/useApis';
import { FilterState } from '../../../types/table';
import DisplayHeader from '../../common/DisplayHeader';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import { SubscriptionTable } from '../table/SubscriptionTable';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionListProps extends FilterState {
  data: any;
  isLoading: boolean;
  refetch: () => void;
}
const SubscriptionList = ({
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
}: SubscriptionListProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [initialValues, setInitialValues] = useState<any>(null);
  const [state, setState] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
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

  const handleViewSubscription = (record: any) => {
    setSelectedSubscription(record);
    setShowSubscriptionModal(true);
  };

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="Subscription Plans"
        description="This shows the vendors billing history overtime"
        actionButton={
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button onClick={reset}>Clear</Button>
          </div>
        }
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x divide-gray-300">
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
        <SubscriptionTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={setPage}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
          perPage={data?.data?.per_page}
          updateLimitSize={updateLimitSize}
          handleViewSubscription={handleViewSubscription}
        />
      </TableWrapper>

      <SubscriptionModal
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        planName={selectedSubscription?.planName || 'Free Plan'}
        isActive={selectedSubscription?.isActive ?? true}
        price={selectedSubscription?.price ?? 3000}
        endDate={
          selectedSubscription?.endDate
            ? dayjs(selectedSubscription.endDate).format('DD MMM, YYYY')
            : '12 Jun, 2025'
        }
        features={[
          { label: 'List up to 20 products' },
          { label: '1 User Seat' },
          { label: 'Standard Support' },
          // ...add more features as needed
        ]}
        onCancelSubscription={() => {
          // TODO: implement cancel logic
          setShowSubscriptionModal(false);
        }}
      />

    </div>
  );
};

export default SubscriptionList;
