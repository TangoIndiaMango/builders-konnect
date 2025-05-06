import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const periodOptions = [
  { label: 'Today', value: 'today' },
  { label: '3 days', value: '3 days' },
  { label: '7 days', value: '7 days' },
  { label: '14 days', value: '14 days' },
  { label: 'This Month', value: 'this month' },
  { label: '3 Months', value: '3 months' },
  { label: 'This Year', value: 'this year' },
  { label: 'Custom', value: 'custom' },
];
interface TimelineFilterProps {
  onChange?: (value: string) => void;
  value?: string;
  options?: { label: string; value: string }[];
}
const TimelineFilter = ({
  onChange,
  value,
  options = periodOptions,
}: TimelineFilterProps) => {
  return (
    <>
    <FilterDropdown
      // label="Store"
      options={options}
      value={value || 'Select Period'}
      onChange={onChange || (() => {console.log('no change')})}
    />

    {/* <RangePicker
      value={value}
      onChange={onChange}
    /> */}

</>
  );
};

export default TimelineFilter;
