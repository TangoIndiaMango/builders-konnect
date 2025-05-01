import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown';

const TimelineFilter = () => {
const [selectedPeriod, setSelectedPeriod] = useState("today")

  const periodOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Last Seven Days', value: 'last_seven_days' },
    { label: 'Last 30 Days', value: 'last_30_days' },
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
