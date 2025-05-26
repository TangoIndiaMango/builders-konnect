
export const SalesTabConfigs = [
  {
    key: 'all',
    label: 'All Sales',
    title: 'All Sales',
    description: "You're viewing all sales order below.",
  },
  {
    key: 'omp',
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

export const SalesFilterOptions = [
  {
    label: 'Payment Status',
    key: 'payment_status',
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Pending', value: 'pending' },
      { label: 'Failed', value: 'failed' },
    ],
  },
  {
    label: 'Order Status',
    key: 'order_status',
    options: [
      { label: 'Shipped', value: 'shipped' },
      { label: 'Completed', value: 'completed' },
      { label: 'Failed', value: 'failed' },
      { label: 'Draft', value: 'draft' },
    ],
  },
  {
    label: 'Sort by',
    key: 'sort_by',
    options: [
      { label: 'Alphabetically', value: 'alphabetically' },
      { label: 'Date (Ascending)', value: 'date_ascending' },
      { label: 'Date (Descending)', value: 'date_descending' },
      { label: 'Amount (Ascending)', value: 'amount_ascending' },
      { label: 'Amount (Descending)', value: 'amount_descending' },
    ],
  },
];