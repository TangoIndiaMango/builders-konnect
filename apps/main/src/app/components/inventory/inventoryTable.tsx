import { Tag, Button, Dropdown, Menu, Avatar } from "antd";
import { DataType, PaginatedTable } from "../common/Table/Table";
import { useSelection } from "../../../hooks/useSelection";
import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ProductData as APIProductData } from '../../../service/inventory/inventory.types';
import { DataTableProps } from '../../types/table';
import { formatBalance } from "../../../utils/helper";
import dayjs from 'dayjs';

export type ProductTableData = APIProductData & { key: string };

interface ProductTableProps extends DataTableProps {
  data: ProductTableData[];
  onEdit?: (record: ProductTableData) => void;
  onDelete?: (record: ProductTableData) => void;
  onViewDetails?: (record: ProductTableData) => void;
}




export const InventoryTable = ({
  data,
  currentPage,
  onPageChange,
  loading,
  total,
  showCheckbox = true,
  perPage,
  updateLimitSize,
  onEdit,
  onDelete,
  onViewDetails,
}: ProductTableProps) => {
  const { rowSelection, selectedRowKeys, resetSelection } =
    useSelection<ProductTableData>({
      data,
    });

const navigate = useNavigate();
  const columns = [
    // {
    //   title: 'Product',
    //   key: 'product',
    //   render: (record: ProductData) => (
    //     <div className="flex items-center gap-2">
    //       <img
    //         src={record.image}
    //         alt={record.name}
    //         className="object-cover w-10 h-10 rounded-lg"
    //       />
    //       <div>
    //         <div className="font-medium">{record.name}</div>
    //         <div className="text-sm text-gray-500">{record.description}</div>
    //       </div>
    //     </div>
    //   ),
    // },

    {
      title: 'Product',
      key: 'product',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            shape="square"
            src={
              record.primary_media_url
                ? record.primary_media_url
                : `https://placehold.co/150x150/E6F7FF/black?text=${record.name
                    ?.split(' ')
                    .map((word) => word[0]?.toUpperCase())
                    .join('')}`
            }
            alt={record.name}
            className="object-cover w-10 h-10 rounded-lg"
          />
          <div>
            <div className="font-medium truncate max-w-[150px]">
              {record.name}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-[150px]">
              {record.description || 'No description'}
            </div>
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
         key: 'date_added',
         width: 180,
         render: (_, record) => (
           <div>
             <div>{dayjs(record.date_added).format('DD MMM YYYY')}</div>
             <div className="text-xs text-gray-500">
               {dayjs(record.date_added).format('hh:mm A')}
             </div>
           </div>
         ),
       },
    {
         title: 'Price',
         key: 'price',
         width: 120,
         render: (_, record) => <span>{formatBalance(record.retail_price)}</span>,
       },
       {
        title: 'Stock Level',
        key: 'quantity',
        width: 140,
        render: (_, record) => (
          <p>
            <span
              className={`${
                record.quantity <= 0 ? 'text-red-500' : 'text-[#003399]'
              } font-bold`}
            >
              {record.quantity}
            </span>{' '}
            left
          </p>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        width: 130,
        render: (_, record) => {
          return (
            <Tag
              color={record.status === 'active' ? 'green' : 'red'}
              className="capitalize"
            >
              {record.status || 'No status'}
            </Tag>
          );
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
           navigate(`/pos/inventory/product-preview/${record.id}`, { state: record }); // record holds your product details
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
           updateLimitSize={updateLimitSize}
           scroll={{ x: '1000px' }}
         />
       </div>
  );
};
