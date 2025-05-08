import { Tag, Button, Dropdown, Menu } from "antd";
import { DataType, PaginatedTable } from "../common/Table/Table";
import { useSelection } from "../../../hooks/useSelection";
import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export interface ProductData extends DataType {
  id: string;
  image: string;
  name: string;
  description: string;
  sku: string;
  dateAdded: string;
  time: string;
  price: number;
  stockLevel: number;
  status: 'Active' | 'Not Active' |'Unpublished';
}



export const InventoryTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
}) => {
  const { rowSelection, selectedRowKeys, resetSelection } = useSelection({
    data,
  });

const navigate = useNavigate();
  const columns = [
    {
      title: 'Product',
      key: 'product',
      render: (record: ProductData) => (
        <div className="flex items-center gap-2">
          <img
            src={record.image}
            alt={record.name}
            className="object-cover w-10 h-10 rounded-lg"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Date Added',
      key: 'dateAdded',
      render: (record: ProductData) => (
        <div>
          <div>{record.dateAdded}</div>
          <div className="text-sm text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      render: (record: ProductData) => (
        <span>₦ {record.price.toLocaleString()}</span>
      ),
    },
    {
      title: 'Stock Level',
      key: 'stockLevel',
      render: (record: ProductData) => (
        <p>
          <span
            className={`${
              record.stockLevel <= 0 ? 'text-red-500' : 'text-[#003399]'
            } font-bold`}
          >
            {record.stockLevel}
          </span>{' '}
          Left
        </p>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: ProductData) => {
        const statusColors = {
          Active: 'success',
          'Not Active': 'error',
          Unpublished: 'default',
        };
        return <Tag color={statusColors[record.status]}>{record.status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            className="flex items-center justify-center w-8 h-8 bg-white rounded-lg hover:opacity-80"
            onClick={() => {
              // Go to Edit page
              window.location.href = `/pos/inventory/edit/${record.id}`;
            }}
          >
            <EditOutlined className="text-black" />
          </Button>

          <Button
            type="text"
            className="w-8 h-8 flex items-center justify-center bg-[#E6F7FF] hover:opacity-80 rounded-lg"
            onClick={() => {
           navigate(`/pos/inventory/product-preview`, { state: record }); // record holds your product details
            }}
          >
            <EyeOutlined className="text-[#1890FF]" />
          </Button>
        </div>
      ),
    },
  ];



  return (
    <div>
         <PaginatedTable
           data={data}
           columns={columns}
           currentPage={currentPage}
           onPageChange={onPageChange}
           loading={loading}
           total={total}
           showCheckbox={showCheckbox}
           striped={true}
           pageSize={10}
           rowSelection={rowSelection as any}
           selectedRowKeys={selectedRowKeys}
           resetSelection={resetSelection}
           scroll={{ x: '1000px' }}
         />
       </div>
  );
};
