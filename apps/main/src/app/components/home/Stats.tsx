import { Stores } from '../../pages/staff/types';
import { useTableState } from '../../../hooks/useTable';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Select, Skeleton } from 'antd';
import { useState } from 'react';
import { useFetchData, useFetchSingleData } from '../../../hooks/useApis';
import CardWithFilter from '../common/CardWithFilter';
import StatsCard from '../common/StatsCard';
import DatePickerComp, { DateRange } from '../date/DatePickerrComp';
import { formatBalance } from '../../../utils/helper';

interface Stats {
  total_products: string;
  revenue_generated: string;
  total_sales_orders: string;
  total_customers: number;
}

interface StatsProps {
  statsData: any;
  storeList: Stores[];
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  reset: () => void;
  setSelectedStore: (value: string) => void;
}

const Stats = ({
  statsData,
  storeList,
  onRangeChange,
  reset,
  setSelectedStore,
}: StatsProps) => {
  const statsListData = [
    {
      title: 'Total Products',
      value: statsData?.data?.data?.total_products ?? 0,
      color: 'blue' as const,
      icon: <ShoppingCartOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Revenue Generated',
      value: formatBalance(statsData?.data?.data?.revenue_generated ?? 0),
      color: 'pink' as const,
      icon: <DollarOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Total Sales Order',
      value: formatBalance(statsData?.data?.data?.total_sales_orders ?? 0),
      color: 'purple' as const,
      icon: <ShoppingOutlined style={{ fontSize: 16 }} />,
    },
    {
      title: 'Total Customers',
      value: statsData?.data?.data?.total_customers ?? 0,
      color: 'yellow' as const,
      icon: <TeamOutlined style={{ fontSize: 16 }} />,
    },
  ];

  return (
    <CardWithFilter
      title="Dashboard Overview"
      description="An overview of your sales performance"
      rightSection={
        <div className="flex items-center gap-2 justify-end flex-wrap">
          <Button onClick={reset}>Clear</Button>
          <Select
            placeholder="Select store"
            // mode="multiple"
            allowClear
            size="large"
            className="rounded w-[200px]"
            showSearch
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={storeList?.map((store) => ({
              value: store.id,
              label: store.name,
            }))}
            onChange={(value) => setSelectedStore(value)}
          />

          <DatePickerComp onRangeChange={onRangeChange} />
        </div>
      }
    >
      {statsData.isLoading ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton.Node key={i} active style={{ width: 150, height: 140 }} />
          ))}
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {statsListData?.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
      )}
    </CardWithFilter>
  );
};

export default Stats;
