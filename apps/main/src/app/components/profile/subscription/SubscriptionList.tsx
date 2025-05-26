import { Button, Form, message, Modal, notification } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import {
  useCreateData,
  useFetchData,
  useFetchSingleData,
  useGetData,
} from '../../../../hooks/useApis';
import { FilterState } from '../../../types/table';
import DisplayHeader from '../../common/DisplayHeader';
import { SkeletonLoader } from '../../common/SkeletonLoader';
import TableWrapper from '../../common/Table/TableWrapper';
import TableStats from '../../common/TableStats';
import { SubscriptionTable } from '../table/SubscriptionTable';
import SubscriptionModal from './SubscriptionModal';
import { Subscription } from '../../../pages/profile/types';
import { usePayment } from '../../../../hooks/usePayment';
import { frontendBaseUrl } from '@/app/pages/auth/auth-outlets';
import { ActivateSubscriptionModal } from './ActivateSubscriptionModal';

interface SubscriptionListProps extends FilterState {
  data: any;
  isLoading: boolean;
  refetch: () => void;
  dateRange: string | null;
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
  dateRange,
}: SubscriptionListProps) => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const [showActivateModal, setShowActivateModal] = useState(false);

  const cancelSubscription = useGetData(
    `merchants/subscriptions/${selectedSubscription?.id}/cancel`
  );

  const tableStatsData = useMemo(
    () => [
      {
        label: 'Total Subscriptions',
        value: `${data?.stats?.total ?? 0}`,
        valueBgColor: '#E6F7FF',
        valueColor: '#003399',
      },
      {
        label: 'Active',
        value: `${data?.stats?.active ?? 0}`,
        valueBgColor: '#E6FFFB',
        valueColor: '#08979C',
      },
      {
        label: 'Cancelled',
        value: `${data?.stats?.inactive ?? 0}`,
        valueBgColor: '#F9F0FF',
        valueColor: '#722ED1',
      },
    ],
    [data?.stats]
  );

  const handleViewSubscription = (record: Subscription) => {
    setSelectedSubscription(record);
    setShowSubscriptionModal(true);
  };

  const handleCancelSubscription = () => {
    cancelSubscription.mutate(selectedSubscription?.id, {
      onSuccess: () => {
        notification.success({
          message: 'Subscription cancelled successfully',
        });
        refetch();
      },
      onError: () => {
        notification.error({
          message: 'Subscription cancellation failed',
        });
      },
    });
  };

  // const { activateSubscription, isLoading: isActivatingSubscription } = usePayment();

  const handleActivateSubscription = async () => {
    // try {
    //   await activateSubscription(selectedSubscription.id, {
    //     priceItemId: selectedSubscription.price_item_id,
    //     callbackUrl: `${frontendBaseUrl}/profile/subscription`,
    //     provider: 'paystack',
    //   });
    // } catch (error: any) {
    //   message.error(error?.message || 'Failed to activate subscription');
    // }
    setShowActivateModal(true);
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
          data={data?.data ?? []}
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
        planName={selectedSubscription?.plan_name || 'Free Plan'}
        isActive={selectedSubscription?.status === 'active'}
        price={selectedSubscription?.plan_amount ?? 3000}
        endDate={
          selectedSubscription?.end_date
            ? dayjs(selectedSubscription.end_date).format('DD MMM, YYYY')
            : '12 Jun, 2025'
        }
        features={selectedSubscription?.features ?? []}
        onCancelSubscription={handleCancelSubscription}
        isLoading={cancelSubscription.isPending}
        onActivateSubscription={handleActivateSubscription}
      />

      <ActivateSubscriptionModal
        open={showActivateModal}
        onClose={() => setShowActivateModal(false)}
      />
    </div>
  );
};

export default SubscriptionList;
