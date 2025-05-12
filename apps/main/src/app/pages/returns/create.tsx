import { Button, Form, Modal, notification, Select, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { useGetCustomers } from '../../../service/customer/customerFN';
import Container from '../../components/common/Container';
import NavigationBack from '../../components/common/NavigationBack';
import { CustomerSection } from '../../components/sales/CustomerSection';
import OrderSection from '../../components/returns/OrderSection';
import { WarningOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { CustomerType } from '../sales/types';

export interface calculateAmountInterface {
  line_items: {
    product_id: string;
    quantity: number;
    discount_id: string;
  }[];
  discount_id: string;
}

export interface paymentMethodInterface {
  id: string;
  name: string;
  slug: string;
  is_balance: string;
  is_active: string | boolean;
  created_at: string;
  updated_at: string;
  amount?: number;
}
/**
 *
 * @returns [
    {
        "id": "pm_9cxAy5WmxEx9KZqPxoqYp",
        "name": "Credit Card",
        "slug": "credit-card",
        "is_balance": 0,
        "is_active": true,
        "created_at": "2025-04-23T16:38:07.000000Z",
        "updated_at": "2025-04-23T16:38:07.000000Z"
    },
    {
        "id": "pm_Ua7A67U8oK0HM8RliUMOM",
        "name": "Bank Transfer",
        "slug": "bank-transfer",
        "is_balance": 0,
        "is_active": true,
        "created_at": "2025-04-23T16:38:07.000000Z",
        "updated_at": "2025-04-23T16:38:07.000000Z"
    },
    {
        "id": "pm_WDoEYvS37Ufw4pb0NDbfe",
        "name": "Credit Note",
        "slug": "credit-note",
        "is_balance": 1,
        "is_active": true,
        "created_at": "2025-04-23T16:38:07.000000Z",
        "updated_at": "2025-04-23T16:38:07.000000Z"
    },
    {
        "id": "pm_XA2HTbgjBYQMybMMFwHdB",
        "name": "Cash",
        "slug": "cash",
        "is_balance": 0,
        "is_active": true,
        "created_at": "2025-04-23T16:38:07.000000Z",
        "updated_at": "2025-04-23T16:38:07.000000Z"
    }
]
 */

const NewReturnLog = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [returnReason, setReturnReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedLineItemIds, setSelectedLineItemIds] = useState<
    Array<{
      id: string;
      line_items: Array<{
        line_item_id: string;
        total_cost: number;
        quantity: number;
      }>;
    }>
  >([]);
  const [refundType, setRefundType] = useState<string>('full');

  const { data: customers } = useGetCustomers();
  const customerData = customers?.data as CustomerType[];

  const { data: orderData } = useFetchData(
    `merchants/sales-orders?paginate=0&sales_type=pos&customer_id=${selectedCustomer?.id}`
  );

  const { mutate: createReturn, isLoading: isCreatingReturn } =
    useCreateData('merchants/returns');
  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleLineItemsSelect = (lineItemIds: any) => {
    setSelectedLineItemIds(lineItemIds);
  };

  const handleConfirm = async () => {
    try {
      if (!selectedCustomer || !selectedOrder) return;

      const returnData: any = {
        user_id: selectedCustomer.id,
        order_id: selectedOrder.id,
        order_line_item_id: selectedLineItemIds?.line_items[0]?.line_item_id,
        refund_type: refundType,
        return_reason: returnReason,
        description: description,
        total_amount_refunded: selectedLineItemIds.line_items[0]?.total_cost,
        quantity: selectedLineItemIds.line_items[0]?.quantity,
      };

      await createReturn(returnData, {
        onSuccess: () => {
          notification.success({
            message: 'Return created successfully',
          });
          setIsConfirmModalVisible(false);
        },
        onError: () => {
          notification.error({
            message: 'Failed to create return',
          });
          setIsConfirmModalVisible(false);
        },
      });
    } catch (error) {
      // Optionally handle unexpected errors here
      setIsConfirmModalVisible(false);
    }
  };
  const handleCustomerSelect = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setSelectedCustomerId(String(customer.id));
  };

  const handleCustomerRemove = () => {
    setSelectedCustomer(null);
    setSelectedCustomerId(null);
  };

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <div className="space-y-5">
      <NavigationBack
        title="New Return Log"
        actionButton={
          <div className="flex items-center justify-end gap-3">
            <Button
              size="large"
              className="rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              className="rounded"
              disabled={selectedCustomer === null || orderData?.length === 0}
              onClick={showConfirmModal}
            >
              Next
            </Button>
          </div>
        }
      />

      <div className="p-5 space-y-3">
        <Container>
          {/* {!selectedCustomer ? ( */}
          <CustomerSection
            onCustomerSelect={handleCustomerSelect}
            onCustomerRemove={handleCustomerRemove}
            showCustomer={true}
            customerData={customerData}
          />
        </Container>

        <Container>
          <OrderSection
            orderData={orderData}
            onOrderSelect={handleOrderSelect}
            customerId={selectedCustomerId as string}
            onLineItemsSelect={handleLineItemsSelect}
          />
        </Container>

        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5}>Reason for return</Typography.Title>
            </div>

            <div className="flex gap-2">
              <Select
                placeholder="Select reason for return"
                className="w-full md:w-[300px]"
                options={[
                  { value: 'wrong item', label: 'Wrong Item' },
                  { value: 'damaged', label: 'Damaged Items' },
                  { value: 'service', label: 'Poor Customer Service' },
                  {
                    value: 'difficulty',
                    label: 'Difficulty using the product',
                  },
                ]}
                onChange={(value) => setReturnReason(value)}
              />
            </div>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5}>Refund Type</Typography.Title>
            </div>
            <div className="flex gap-2">
              <Select
                placeholder="Select refund type"
                className="w-full md:w-[300px]"
                options={[
                  { value: 'credit-note', label: 'Credit Note' },
                  { value: 'cashback', label: 'Cashback' },
                ]}
                value={refundType}
                onChange={(value) => setRefundType(value)}
              />
            </div>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5}>Description</Typography.Title>
            </div>

            <div className="flex gap-2">
              <TextArea
                placeholder="Enter description about the return"
                className="w-full md:w-[300px]"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </Container>
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2">
            <WarningOutlined style={{ color: '#faad14' }} />
            <span>Return log</span>
          </div>
        }
        open={isConfirmModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okButtonProps={{
          loading: isCreatingReturn,
        }}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to enter this return request?</p>
      </Modal>
    </div>
  );
};

export const LabelValue = ({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full gap-8 text-gray-500 ${className}`}
    >
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
};

export default NewReturnLog;
