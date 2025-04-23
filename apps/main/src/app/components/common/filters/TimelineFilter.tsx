import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown';

const TimelineFilter = () => {
const [selectedPeriod, setSelectedPeriod] = useState("last_seven_days")

  const periodOptions = [
    { label: 'Last 7 days', value: 'last_seven_days' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ];


  return (
    <FilterDropdown
        // label="Store"
        options={periodOptions}
        value={selectedPeriod}
        onChange={setSelectedPeriod}
      />
  )
}

export default TimelineFilter
