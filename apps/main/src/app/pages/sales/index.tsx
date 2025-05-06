import { PlusOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetExportData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { useGetSales } from '../../../service/sales/salesFN';
import ConfirmModal from '../../components/common/ConfirmModal';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import AllSales from '../../components/sales/AllSales';
import { exportCsvFromString } from '../../../utils/helper';

const tabConfigs = [
  {
    key: 'all',
    label: 'All Sales',
    title: 'All Sales',
    description: "You're viewing all sales order below.",
  },
  {
    key: 'mop',
    label: 'Online Sales',
    title: 'Online Sales',
    description: "You're viewing all online sales order below.",
  },
  {
    key: 'pos',
    label: 'In-store Sales',
    title: 'In-store Sales',
    description: "You're viewing all in-store sales order below.",
  },
];

const SalesHome = () => {
  const [pauseSalesOpened, setPauseSalesOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    status,
    setStatus,
    setCustomFilter,
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
  } = useTableState('sales');

  const filterOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const [tab, setTab] = useState<string>('pos');
  const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: limitSize,
    sales_type: tab === 'all' ? '' : tab,
    q: searchValue,
    sort_by: sortBy,
    payment_status: filterKey === 'payment_status' ? filterValue : '',
    order_status: filterKey === 'order_status' ? filterValue : '',
    date_filter: customDateRange,
    page: currentPage,
  });

  const exportSales = useGetExportData(
    `merchants/sales-orders?export=${exportType}`
  );

  const handleExport = () => {
    exportSales.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Order Sales');
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

  const onChange = (key: string) => {
    setTab(key);
  };

  const items: TabsProps['items'] = useMemo(
    () =>
      tabConfigs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: (
          <AllSales
            data={sales?.data}
            isLoading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            setPage={(page: number) => setPage(page, pageSize)}
            searchValue={searchValue}
            setSearchValue={(value: string) => setSearch(value)}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={(value: string) => setSortBy(value)}
            setSortOrder={(value: string) => setSortOrder(value)}
            status={status}
            setStatus={(value: string) => setStatus(value)}
            reset={reset}
            periodOptions={filterOptions}
            periodFilter={customDateRange}
            setPeriodFilter={(value: string) => setCustomFilter(value)}
            title={tab.title}
            description={tab.description}
            setCustomDateRange={setCustomDateRange}
            handleFilterChange={handleFilterChange}
            filterValue={filterValue}
            onExport={setExportType}
            updateLimitSize={setLimitSize}
          />
        ),
      })),
    [sales, isLoading, tab]
  );

  return (
    <div>
      <PageIntroBanner
        title="Sales"
        description="Make product sales and track sales performance here"
        actionButton={
          <div className="flex items-center gap-5">
            <Button
              className="rounded"
              size="large"
              onClick={() => navigate('/pos/sales/pause')}
            >
              Paused Sales
            </Button>

            <Button
              type="primary"
              className="rounded"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/pos/sales/create')}
            >
              New Sales
            </Button>
          </div>
        }
      />

      <div className="px-5 bg-white">
        <Tabs defaultActiveKey="all-sales" onChange={onChange} items={items} />
      </div>

      <ConfirmModal
        open={pauseSalesOpened}
        onCancel={() => setPauseSalesOpened(false)}
        onConfirm={() => console.log('confirm')}
      />
    </div>
  );
};

export default SalesHome;
