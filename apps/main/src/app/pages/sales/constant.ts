
export const SalesTabConfigs = [
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

export const SalesFilterOptions = [
  {
    label: 'Payment Status',
    key: 'payment_status',
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Unpaid', value: 'unpaid' },
      { label: 'Refunded', value: 'refunded' },
    ],
  },
  {
    label: 'Order Status',
    key: 'order_status',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Processing', value: 'processing' },
      { label: 'Completed', value: 'completed' },
      { label: 'Cancelled', value: 'cancelled' },
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