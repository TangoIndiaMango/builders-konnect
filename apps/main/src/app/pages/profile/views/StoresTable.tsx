import React from 'react';
import { Table, Input, Button, Tag, Pagination } from 'antd';
import { SearchOutlined, EyeOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Store {
  key: string;
  name: string;
  id: string;
  totalProducts: number;
  totalSales: string;
  totalStaff: number;
  dateCreated: string;
  status: 'Active' | 'Deactivated';
}

const storeData: Store[] = [
  {
    key: '1',
    name: 'Mainland Store 01',
    id: '#2826492',
    totalProducts: 2050,
    totalSales: '₦25,000.00',
    totalStaff: 12,
    dateCreated: '25 Jan, 2025\n04:00 AM',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Island Store 01',
    id: '#2826492',
    totalProducts: 12300,
    totalSales: '₦25,000.00',
    totalStaff: 10,
    dateCreated: '27 Jan, 2025\n05:14 AM',
    status: 'Deactivated',
  },
];

const columns: ColumnsType<Store> = [
  {
    title: 'Store ID',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="flex flex-col">
        <span className="font-medium">{text}</span>
        <span className="text-blue-600 text-xs">{`ID: ${record.id}`}</span>
      </div>
    ),
  },
  {
    title: 'Total Products',
    dataIndex: 'totalProducts',
    key: 'totalProducts',
  },
  {
    title: 'Total Sales',
    dataIndex: 'totalSales',
    key: 'totalSales',
  },
  {
    title: 'Total Staff',
    dataIndex: 'totalStaff',
    key: 'totalStaff',
  },
  {
    title: 'Date Created',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
    render: (date) => (
      <div className="whitespace-pre-line">{date}</div> 
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button type="link" icon={<EyeOutlined />} />
    ),
  },
];

const StoresTable: React.FC = () => {
  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">All Stores</h1>
          <p className="text-gray-500 text-sm">You're viewing sales from the online marketplace below.</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          New Store
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">4</span>
          <span className="text-gray-500 text-sm">Total Stores</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">3</span>
          <span className="text-gray-500 text-sm">Active</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-red-500">1</span>
          <span className="text-gray-500 text-sm">Deactivated</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Input
            placeholder="Search with order no..."
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={storeData}
        pagination={{ pageSize: 10 }}
        bordered
        className="mt-4"
      />
    </div>
  );
};

export default StoresTable;
