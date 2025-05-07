import { ReactNode } from "react";
import { Review } from "../pages/customers/types";

export interface Product {
  weight: ReactNode;
  id: string;
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
  channel: string;
  address: string | null;
  date_joined: string;
  customerID: string | null;
  credit_note_balance: number;
  referral_source: string;
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

export const customersData: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    source: 'Online',
    address: '123 Main St, City, Country',
    date_joined: '2023-01-01',
  },
  {
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+9876543210',
    source: 'Offline',
    address: '456 Elm St, Town, Country',
    date_joined: '2023-02-15',
  },
  {
    id: 'CUST003',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1122334455',
    source: 'Online',
    address: '789 Oak Ave, Village, Country',
    date_joined: '2023-03-20',
  },
  {
    id: 'CUST004',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    phone: '+5566778899',
    source: 'Offline',
    address: '321 Pine Rd, Hamlet, Country',
    date_joined: '2023-04-10',
  },
  {
    id: 'CUST005',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    phone: '+1234567890',
    source: 'Online',
    address: '654 Cedar Blvd, Metropolis, Country',
    date_joined: '2023-05-05',
  },
];

export const customersTableStatsData = [
  {
    label: 'Total Customers',
    value: '400,000',
    valueBgColor: '#E6F7FF',
    valueColor: '#003399',
  },
  {
    label: 'Online',
    value: '250',
    valueBgColor: '#F9F0FF',
    valueColor: '#722ED1',
  },
  {
    label: 'Offline',
    value: '100',
    valueBgColor: '#FFFBE6',
    valueColor: '#D48806',
  },
];

export const productReviews = [
  {
    id: 'prod_001',
    name: 'Wireless Bluetooth Headphones',
    SKU: 'WBH-12345',
    ean: '1234567890123',
    category: 'Electronics',
    subcategory: 'Audio',
    product_type: 'Headphones',
    retail_price: '99.99',
    cost_price: '55.00',
    metadata: { brand: 'SoundPro', warranty: '2 years' },
    description: 'Noise-cancelling wireless headphones with long battery life.',
    tags: ['wireless', 'bluetooth', 'audio'],
    quantity: 150,
    measurement_unit: 'pcs',
    reorder_value: 20,
    primary_media_url: 'https://example.com/images/headphones.jpg',
    media: [
      'https://example.com/images/headphones.jpg',
      'https://example.com/images/headphones-side.jpg'
    ],
    total_reviews: 248,
    ratings: 4.5,
  },
  {
    id: 'prod_002',
    name: 'Smart LED TV 50"',
    SKU: 'TV-LED-50X',
    ean: '9876543210987',
    category: 'Electronics',
    subcategory: 'Television',
    product_type: 'LED TV',
    retail_price: '499.99',
    cost_price: '350.00',
    metadata: { brand: 'ViewSharp', resolution: '4K UHD' },
    description: '50-inch 4K Ultra HD Smart LED TV with built-in apps.',
    tags: ['smart', 'tv', '4K'],
    quantity: 80,
    measurement_unit: 'pcs',
    reorder_value: 10,
    primary_media_url: 'https://example.com/images/tv.jpg',
    media: ['https://example.com/images/tv.jpg'],
    total_reviews: 110,
    ratings: 4.3,
  },
  {
    id: 'prod_003',
    name: 'Eco-Friendly Notebook',
    SKU: 'NOTE-ECO-001',
    ean: '4567890123456',
    category: 'Stationery',
    subcategory: 'Notebooks',
    product_type: 'Notebook',
    retail_price: '4.99',
    cost_price: '1.50',
    metadata: { pages: 120, paperType: 'Recycled' },
    description: 'Notebook made from 100% recycled paper.',
    tags: ['eco', 'recycled', 'paper'],
    quantity: 300,
    measurement_unit: 'pcs',
    reorder_value: 50,
    primary_media_url: 'https://example.com/images/notebook.jpg',
    media: ['https://example.com/images/notebook.jpg'],
    total_reviews: 32,
    ratings: 4.8,
  },
  {
    id: 'prod_004',
    name: 'Organic Green Tea (100g)',
    SKU: 'GT-ORG-100',
    ean: '3210987654321',
    category: 'Groceries',
    subcategory: 'Beverages',
    product_type: 'Tea',
    retail_price: '7.99',
    cost_price: '3.50',
    metadata: { origin: 'Sri Lanka', type: 'Loose Leaf' },
    description: 'Pure organic green tea for a healthy lifestyle.',
    tags: ['organic', 'tea', 'beverage'],
    quantity: 120,
    measurement_unit: 'packs',
    reorder_value: 25,
    primary_media_url: 'https://example.com/images/greentea.jpg',
    media: ['https://example.com/images/greentea.jpg'],
    total_reviews: 57,
    ratings: 4.6,
  },
  {
    id: 'prod_005',
    name: 'Portable Power Bank 10000mAh',
    SKU: 'PB-10000-BLK',
    ean: '1122334455667',
    category: 'Electronics',
    subcategory: 'Accessories',
    product_type: 'Power Bank',
    retail_price: '24.99',
    cost_price: '12.00',
    metadata: { capacity: '10000mAh', output: '2.1A' },
    description: 'Compact power bank for charging on the go.',
    tags: ['power bank', 'portable', 'charging'],
    quantity: 200,
    measurement_unit: 'pcs',
    reorder_value: 30,
    primary_media_url: 'https://example.com/images/powerbank.jpg',
    media: ['https://example.com/images/powerbank.jpg'],
    total_reviews: 140,
    ratings: 4.2,
  }
];


export const customerFeedbackList: Review[] = [
  {
    id: 2,
    customerID: 'C-0038',
    customer_name: 'Mr. Lena Gottlieb',
    feedback: 'Officiis aliquam voluptates iusto qui.',
    ratings: '3',
    feedback_date: '2025-04-13 17:11:25',
    response: 'Reiciendis placeat tenetur est ea.',
  },
  {
    id: 3,
    customerID: 'C-0042',
    customer_name: 'Mrs. Clara Hills',
    feedback: 'Doloremque dolores minus natus in.',
    ratings: '4',
    feedback_date: '2025-04-15 09:34:12',
    response: 'Natus perferendis tempora accusamus et.',
  },
  {
    id: 4,
    customerID: 'C-0051',
    customer_name: 'Mr. Emilio Weissnat',
    feedback: 'Quos ducimus nesciunt autem vitae.',
    ratings: '5',
    feedback_date: '2025-04-16 13:50:01',
    response: 'Facere iste beatae nihil rem.',
  },
  {
    id: 5,
    customerID: 'C-0063',
    customer_name: 'Ms. Daphne Lubowitz',
    feedback: 'Tempora et sint libero maiores.',
    ratings: '2',
    feedback_date: '2025-04-17 11:21:07',
    response: 'Aut exercitationem deleniti quidem eos.',
  },
  {
    id: 6,
    customerID: 'C-0070',
    customer_name: 'Dr. Ian Langosh',
    feedback: 'Rerum sint accusantium deserunt quod.',
    ratings: '4',
    feedback_date: '2025-04-18 08:45:33',
    response: 'Nemo aliquid tenetur similique officiis.',
  }
];
