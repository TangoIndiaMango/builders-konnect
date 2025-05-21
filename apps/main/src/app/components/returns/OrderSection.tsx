import  { useEffect } from 'react';
import {
  Typography,
  Avatar,
  AutoComplete,
} from 'antd';
import { useState } from 'react';
import { formatBalance } from '../../../utils/helper';
import { useFetchData } from '../../../hooks/useApis';
import { PaginatedTable } from '../common/Table/Table';
import { WarningOutlined } from '@ant-design/icons';

interface OrderSectionProps {
  onOrderSelect?: (order: any) => void;
  orderData?: any;
  showOrder?: boolean;
 customerId?: string;
 onLineItemsSelect?: (lineItemIds: string[]) => void;
 showText?: boolean;
}

export default function OrderSection({
  onOrderSelect,
  orderData,
  showOrder = true,
  customerId,
  onLineItemsSelect,
  showText = false,
}: OrderSectionProps) {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [options, setOptions] = useState<any[]>([]);

  const { data: products, isLoading: isLoadingProducts } = useFetchData(
    selectedOrder?.id ? `merchants/sales-orders/${selectedOrder.id}` : ''
  );

 
  useEffect(() => {
    if (customerId === null) {
      setSelectedOrder(null);
      onLineItemsSelect?.([]);
    }
  }, [customerId]);

  useEffect(() => {
    if (products?.data?.line_items && onLineItemsSelect) {
      const lineItemIds = products.data;
      onLineItemsSelect(lineItemIds);
    }
  }, [products, onLineItemsSelect]);

  const handleRemoveOrder = () => {
    setSelectedOrder(null);
    if (onOrderSelect) {
      onOrderSelect(null);
    }
    if (onLineItemsSelect) {
      onLineItemsSelect([]);
    }
  };

  
  useEffect(() => {
    if (orderData && orderData?.data && Array.isArray(orderData?.data)) {
      const formattedOptions = orderData?.data.map((order: any) => ({
        label: (
          <div className="flex flex-col py-1">
            <span className="font-medium">
              {order.order_number || 'No Order Number'}
            </span>
            <span className="text-sm text-gray-500">
              {order.customer?.name || 'No Customer'} -{' '}
              {order.receipt_no || 'No Receipt'}
            </span>
          </div>
        ),
        value: order.order_number || order.id,
        order: order,
      }));
      //   console.log("Formatted options:", formattedOptions);
      setOptions(formattedOptions);
    } else {
    //   console.log('No valid orderData.data array found');
      setOptions([]);
    }
  }, [orderData]);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      render: (_: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            className="bg-gray-200"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
          />
          <div>
            <div className="font-medium">{record.product}</div>
            {/* <div className="text-sm text-gray-500">{record}</div> */}
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_cost',
      render: (price: number) => <span>{formatBalance(price)}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (quantity: number) => <span>{quantity}</span>,
    },
    {
      title: 'Total Price',
      dataIndex: 'total_cost',
      render: (price: number) => <span>{formatBalance(price)}</span>,
    },
  ];

  const handleSearch = (searchText: string) => {
    let filteredOptions = options;
    
    if (customerId) {
      filteredOptions = filteredOptions.filter(
        option => option.order?.customer?.id === customerId
      );
    }

    if (searchText) {
      filteredOptions = filteredOptions.filter((option) => {
        const orderNumber = option.order?.order_number?.toLowerCase() || '';
        const customerName = option.order?.customer?.name?.toLowerCase() || '';
        const receiptNo = option.order?.receipt_no?.toLowerCase() || '';
        const searchLower = searchText.toLowerCase();

        return (
          orderNumber.includes(searchLower) ||
          customerName.includes(searchLower) ||
          receiptNo.includes(searchLower)
        );
      });
    }

    return filteredOptions;
  };

  const handleOrderSelect = (_: string, option: any) => {
    const order = option.order;
    setSelectedOrder(order);
    if (onOrderSelect) {
      onOrderSelect(order);
    }
  };



  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between w-full gap-5">
        <div className="flex flex-col gap-2">
        <h3 className="font-medium md:text-lg">Order Information</h3>
        {showText &&<div className="flex items-center gap-2">
          <WarningOutlined style={{ color: '#FAAD14' }} className="text-lg" />
          <p className="text-sm text-gray-500">Select the products to be returned in the order list</p>
        </div>}
        </div>

        {!selectedOrder ? (
          <div className="flex flex-wrap items-center justify-end w-full gap-3">
            <AutoComplete
              className="w-full md:w-[300px]"
              placeholder="Search order"
              options={options}
              onSearch={(text) => handleSearch(text)}
              onSelect={handleOrderSelect}
              filterOption={false}
              notFoundContent="No orders found"
            />
          </div>
        ) : (
          <button 
            onClick={handleRemoveOrder}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove Order
          </button>
        )}
      </div>

      {showOrder && selectedOrder && (
        <div className="bg-[#F8F9FC] p-4 rounded">
          <Typography.Text className="block mb-3 font-medium">
            Products in Order
          </Typography.Text>

          <PaginatedTable
            data={products?.data?.line_items || []}
            columns={columns}
            showPagination={false}
            showCheckbox={true}
            loading={isLoadingProducts}
          />
        </div>
      )}
    </div>
  );
}
