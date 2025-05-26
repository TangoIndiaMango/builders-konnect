import React, { useState } from 'react';
import CardWithFilter from '../../common/CardWithFilter';
import FilterDropdown from '../../common/filters/FilterDropdown';
import ReturnRateChart from './chart/ReturnRate';
import { useFetchData } from '../../../../hooks/useApis';
import DatePickerComp, { DateRange } from '../../date/DatePickerrComp';
import { Button } from 'antd';
import { useTableState } from '../../../../hooks/useTable';

interface ReturnRateProps {
  // reset: () => void;
  // onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  // dateRange: string | null;
  [key: string]: any;
} 
const ReturnRate = () => {
  const {reset, setCustomDateRange, customDateRange} = useTableState("sales-analytics")


  const returnRate = useFetchData(
    `merchants/sales-orders/analytics/returns-rate`
  );
  const returnRateStats = returnRate?.data?.data as ReturnRateProps;


  return (
    <CardWithFilter
      title="Return Rate"
      description="View order return rates."
      rightSection={
        <div className="flex items-center gap-2 justify-end flex-wrap">
        <Button onClick={reset}>Clear</Button>
        {/* <Select
          placeholder="Select store"
          // mode="multiple"
          allowClear
          size="large"
          className="rounded w-[200px]"
          showSearch
          value={selectedStore || undefined}
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={storeList?.map((store) => ({
            value: store.id,
            label: store.name,
          }))}
          onChange={(value) => {
            setSelectedStore(value);
            console.log(value, 'value');
          }}
        /> */}

        <DatePickerComp onRangeChange={setCustomDateRange} value={customDateRange} />
      </div>
      }
    >
      <div>
        <ReturnRateChart returnRateStats={returnRateStats} isLoading={returnRate?.isLoading} />
      </div>
    </CardWithFilter>
  );
};

export default ReturnRate;
