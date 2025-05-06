import { useMemo, useState } from 'react';
import { Button, Tabs, TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import AllSales from '../../components/sales/AllSales';
import OnlineSales from '../../components/sales/OnlineSales';
import InstoreSales from '../../components/sales/InstoreSales';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useGetSales } from '../../../service/sales/salesFN';
import { useTableState } from '../../../hooks/useTable';

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

  const handleReset = () => {
    setSearchQuery('');
    setDateFilter('');
    setSortBy('');
    setStatus('');
  };

  const [tab, setTab] = useState<string>('pos');

  const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: 10,
    sales_type: tab === 'all' ? '' : tab,
    q: searchQuery,
    date_filter: dateFilter,
    sort_by: sortBy,
    payment_status: status,
  });

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
            setSearchTerm={handleSearch}
            periodFilter={dateFilter}
            setPeriodFilter={handleDateFilterChange}
            reset={handleReset}
            periodOptions={filterOptions}
            title={tab.title}
            description={tab.description}
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
