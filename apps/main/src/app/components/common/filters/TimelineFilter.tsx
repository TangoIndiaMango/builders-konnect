import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown';

const TimelineFilter = () => {
const [selectedPeriod, setSelectedPeriod] = useState("last_seven_days")

  const periodOptions = [
    { label: 'Today', value: 'Today' },
    { label: '3 Days', value: '3 days' },
    { label: '7 Days', value: '7 days' },
    { label: '14 Days', value: '14 days' },
    { label: 'This Month', value: 'this month' },
    { label: '3 Months', value: '3 months' },
    { label: 'This Year', value: 'this year' },
    { label: '2025', value: '2025' },
    { label: 'Custom Date', value: '2025-03-01|2025-03-31' }
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
