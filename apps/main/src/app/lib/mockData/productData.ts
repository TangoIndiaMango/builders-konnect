import { productImage } from "../assets/images";


export interface ProductData {
  id: string;
  image: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  dateAdded: string;
  time: string;
  price: number;
  stockLevel: number;
  status: 'Active' | 'Not Active' | 'Unpublished';
  key: string;
}


export const numbersData = [
  {
    label: 'Total Products',
    value: '400,000',
    valueBgColor: '#FEF3F2',
    valueColor: '#F04438',
  },
  {
    label: 'Total Products Value',
    value: '792,000.00',
    valueBgColor: '#E6F7FF',
    valueColor: '#003399',
  },
  {
    label: 'Total Sales',
    value: '381,000.00',
    valueBgColor: '#E6FFFB',
    valueColor: '#08979C',
  },
  
];
export const productNumbersData = [
  {
    label: 'Total Products',
    value: '2846',
    valueBgColor: '#E6F7FF',
    valueColor: '#003399',
  },
  {
    label: 'Soldout Products',
    value: '45',
    valueBgColor: '#FFF1F0',
    valueColor: '#CF1322',
  },
  {
    label: 'Low Stock Products',
    value: '300',
    valueBgColor: '#FFFBE6',
    valueColor: '#D48806',
  },
  {
    label: 'Available',
    value: '2501',
    valueBgColor: '#E6FFFB',
    valueColor: '#12B76A',
  },
  
];

export const productData: ProductData[] = [
  {
    id: '1',
    image: productImage,
    name: 'Premium Cement',
    description: '10kg Smooth',
    sku: '#BM128901',
    category: 'Category 1', 
    dateAdded: '25 Jan, 2025',
    time: '04:00 AM',
    price: 25000.00,
    stockLevel: 20,
    status: 'Unpublished',
    key: '1', 
  },
  {
    id: '2',
    image: productImage,
    name: 'Premium Cement',
    description: '10 kg Coarse',
    category: 'Category 2',
    sku: '#BM002363',
    dateAdded: '27 Jan, 2025',
    time: '05:14 AM',
    price: 25000.00,
    stockLevel: 0,
    status: 'Not Active',
    key: '2',
  },
  {
    id: '3',
    image: productImage,
    name: 'Driller machine',
    description: 'Heavy Duty 24/7',
    sku: '#BM002569',
    dateAdded: '01 Feb, 2025',
    category: 'Category 3',
    time: '06:17 PM',
    price: 25000.00,
    stockLevel: 300,
    status: 'Unpublished',
    key: '3',
  },
  {
    id: '4',
    image: productImage,
    name: 'Coza Silk Paint',
    description: '20 kg',
    sku: '#BM002363',
    dateAdded: '14 Feb, 2025',
    category: 'Category 4',
    time: '12:00 PM',
    price: 62800.00,
    stockLevel: 2809,
    status: 'Active',
    key: '4',
  },
  {
    id: '5',
    image: productImage,
    name: 'Top Grade Metal Roof',
    description: 'Aluminum, Steel',
    sku: '#BM108901',
    category: 'Category 5',
    dateAdded: '14 Feb, 2025',
    time: '02:17 PM',
    price: 5000.00,
    stockLevel: 4000,
    status: 'Active',
    key: '5',
  },
  {
    id: '6',
    image: productImage,
    name: 'Premium Cement',
    description: '10kg Smooth',
    sku: '#BM128901',
    dateAdded: '25 Jan, 2025',
    time: '04:00 AM',
    category: 'Category 6',	
    key: "6",
    price: 25000.00,
    stockLevel: 20,
    status: 'Unpublished',
  },
  {
    id: '7',
    image: productImage,
    name: 'Premium Cement',
    description: '10 kg Coarse',
    sku: '#BM002363',
    dateAdded: '27 Jan, 2025',
    time: '05:14 AM',
    category: "Category 7",
    key: "7",
    price: 25000.00,
    stockLevel: 0,
    status: 'Not Active',
  },
  {
    id: '8',
    image: productImage,
    name: 'Driller machine',
    description: 'Heavy Duty 24/7',
    sku: '#BM002569',
    category: 'Category 8',
    key: "8",
    dateAdded: '01 Feb, 2025',
    time: '06:17 PM',
    price: 25000.00,
    stockLevel: 300,
    status: 'Unpublished',
  },
  {
    id: '9',
    image: productImage,
    name: 'Coza Silk Paint',
    description: '20 kg',
    category: 'Category 9',
    key: "9",
    sku: '#BM002363',
    dateAdded: '14 Feb, 2025',
    time: '12:00 PM',
    price: 62800.00,
    stockLevel: 2809,
    status: 'Active',
  },
  {
    id: '10',
    image: productImage,
    name: 'Top Grade Metal Roof',
    description: 'Aluminum, Steel',
    category: 'Category 10',
    key: "10",
    sku: '#BM108901',
    dateAdded: '14 Feb, 2025',
    time: '02:17 PM',
    price: 5000.00,
    stockLevel: 4000,
    status: 'Active',
  },
  {
    id: '11',
    image: productImage,
    name: 'Premium Cement',
    category: 'Category 11',
    key: "11",
    description: '10kg Smooth',
    sku: '#BM128901',
    dateAdded: '25 Jan, 2025',
    time: '04:00 AM',
    price: 25000.00,
    stockLevel: 20,
    status: 'Unpublished',
  },
  {
    id: '12',
    image: productImage,
    name: 'Premium Cement',
    description: '10 kg Coarse',
    category: 'Category 12',
    key: "12",
    sku: '#BM002363',
    dateAdded: '27 Jan, 2025',
    time: '05:14 AM',
    price: 25000.00,
    stockLevel: 0,
    status: 'Not Active',
  },
  {
    id: '13',
    image: productImage,
    name: 'Driller machine',
    description: 'Heavy Duty 24/7',
    sku: '#BM002569',
    category: 'Category 13',
    key: "13",
    dateAdded: '01 Feb, 2025',
    time: '06:17 PM',
    price: 25000.00,
    stockLevel: 300,
    status: 'Unpublished',
  },
  {
    id: '14',
    image: productImage,
    name: 'Coza Silk Paint',
    description: '20 kg',
    sku: '#BM002363',
    category: 'Category 14',
    key: "14",
    dateAdded: '14 Feb, 2025',
    time: '12:00 PM',
    price: 62800.00,
    stockLevel: 2809,
    status: 'Active',
  },
  {
    id: '15',
    image: productImage,
    name: 'Top Grade Metal Roof',
    description: 'Aluminum, Steel',
    category: 'Category 15',
    key: "15",
    sku: '#BM108901',
    dateAdded: '14 Feb, 2025',
    time: '02:17 PM',
    price: 5000.00,
    stockLevel: 4000,
    status: 'Active',
  },
];
