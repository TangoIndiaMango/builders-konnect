export interface Product {
  key: string;
  image: string;
  name: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export const productsList = [
  {
    key: '1',
    image: '/product-images/cement.png', // You'll need to add these images
    name: 'Premium Cement',
    variant: '10kg Smooth',
    unitPrice: 25000.00,
    quantity: 1,
    totalPrice: 25000.00,
  },
  {
    key: '2',
    image: '/product-images/cement.png',
    name: 'Premium Cement',
    variant: '10 kg Coarse',
    unitPrice: 25000.00,
    quantity: 1,
    totalPrice: 25000.00,
  },
  {
    key: '3',
    image: '/product-images/driller.png',
    name: 'Driller machine',
    variant: 'Heavy Duty 24/7',
    unitPrice: 150000.00,
    quantity: 1,
    totalPrice: 150000.00,
  },
];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
}

export const customersList = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '08012345678',
    source: 'Website'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '08087654321',
    source: 'Referral'
  },
  // Add more mock customers...
];

export interface Discount {
  label: string;
  value: string;
  discount: string;
}


export const discountsList = [
  { label: 'Discount 1', value: 'DISC1ASDF' },
  { label: 'Discount 2', value: 'DISC2' },
  { label: 'Discount 3', value: 'DISC3' }
];



export const tableStatsData = [
  {
    label: 'Total Sales',
    value: '400,000',
    valueBgColor: '#E6F7FF',
    valueColor: '#003399',
  },
  {
    label: 'Total Sales Value',
    value: '700,000',
    valueBgColor: '#E6FFFB',
    valueColor: '#08979C',
  },
  {
    label: 'Online Sales',
    value: '250',
    valueBgColor: '#F9F0FF',
    valueColor: '#722ED1',
  },
  {
    label: 'Offline Saless',
    value: '100',
    valueBgColor: '#FFFBE6',
    valueColor: '#D48806',
  },
];

export const ordersData = [
  {
    key: '1',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Super Ventures',
      email: 'superventures@gmail.com',
    },
    orderDate: '25 Jan, 2025',
    timeStamp: '04:00 AM',
    amount: 25000.0,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    totalItems: 2,
  },
  {
    key: '2',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Abdul Moshood',
      email: 'moshoodabdul@yahoo.com',
    },
    orderDate: '27 Jan, 2025',
    timeStamp: '05:14 AM',
    amount: 25000.0,
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    totalItems: 2,
  },
  {
    key: '3',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Stanley Constructions',
      email: 'stanleycon@gmail.com',
    },
    orderDate: '01 Feb, 2025',
    timeStamp: '06:17 PM',
    amount: 25000.0,
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    totalItems: 2,
  },
  {
    key: '4',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Thomas Adebayo',
      email: 'thomas2345@gmail.com',
    },
    orderDate: '14 Feb, 2025',
    timeStamp: '12:00 PM',
    amount: 62800.0,
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    totalItems: 2,
  },
  {
    key: '5',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Emmanuel Chudi',
      email: 'emmachudiboy@gmail.com',
    },
    orderDate: '14 Feb, 2025',
    timeStamp: '02:17 PM',
    amount: 5000.0,
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    totalItems: 2,
  },
  {
    key: '6',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Esther Bisola',
      email: 'estherbisola@gmail.com',
    },
    orderDate: '14 Feb, 2025',
    timeStamp: '01:17 PM',
    amount: 198000.0,
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    totalItems: 2,
  },
  {
    key: '7',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Customer 001',
      email: 'customer001@gmail.com',
    },
    orderDate: '14 Feb, 2025',
    timeStamp: '07:17 PM',
    amount: 25000.0,
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    totalItems: 2,
  },
  {
    key: '8',
    orderNumber: '#12746398',
    customerDetails: {
      name: 'Customer 002',
      email: 'customer002@gmail.com',
    },
    orderDate: '14 Feb, 2025',
    timeStamp: 'text',
    amount: 200.0,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    totalItems: 2,
  },
];