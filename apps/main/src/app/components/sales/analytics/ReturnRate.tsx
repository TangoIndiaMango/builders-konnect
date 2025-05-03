import React, { useState } from 'react';
import CardWithFilter from '../../common/CardWithFilter';
import FilterDropdown from '../../common/filters/FilterDropdown';
import ReturnRateChart from './chart/ReturnRate';
import { useFetchData } from '../../../../hooks/useApis';


const ReturnRate = () => {
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');

  const returnRate = useFetchData(`merchants/sales-orders/analytics/returns-rate`)
  const returnRateStats = returnRate?.data?.data

  const storeOptions = [
    { label: 'All orders', value: 'all' },
    { label: 'Order 1', value: 'order_1' },
    { label: 'Order 2', value: 'order_2' },
  ];

  const periodOptions = [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];

  return (
    <CardWithFilter
      title="Return Rate"
      description="View order return rates."
      rightSection={
        <div className="flex flex-wrap items-center justify-end gap-2 ">
          <FilterDropdown
            // label="Store"
            options={storeOptions}
            value={selectedStore}
            onChange={setSelectedStore}
          />

          <FilterDropdown
            // label="Period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      }
    >
      <div>
        <ReturnRateChart />
      </div>
    </CardWithFilter>
  );
};

export default ReturnRate;
