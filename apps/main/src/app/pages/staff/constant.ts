

export const StaffFilterOptions = [
  {
    label: 'Status',
    key: 'status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  {
    label: 'Sort by',
    key: 'sort_by',
    options: [
      { label: 'Alphabetically', value: 'alphabetically' },
      { label: 'Date (Ascending)', value: 'date_ascending' },
      { label: 'Date (Descending)', value: 'date_descending' },
    ],
  },
];