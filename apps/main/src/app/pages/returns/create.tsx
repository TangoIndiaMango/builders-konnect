import {
  Button,
  Form,
  Modal,
  notification,
  Select,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { useGetCustomers } from '../../../service/customer/customerFN';
import Container from '../../components/common/Container';
import NavigationBack from '../../components/common/NavigationBack';
import { CustomerSection } from '../../components/sales/CustomerSection';
import OrderSection from '../../components/returns/OrderSection';
import { UploadOutlined, WarningOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { CustomerType } from '../sales/types';

interface LineItem {
  line_item_id: string;
  product: string;
  quantity: number; 
  originalQuantity?: number; // Add this to track original ordered quantity
  unit_cost: string; 
  discounted_amount: string;
  total_cost: string; 
}

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [returnReason, setReturnReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedLineItems, setSelectedLineItems] = useState<LineItem[]>([]);
  const [refundType, setRefundType] = useState<string>('');

  const { data: customers } = useGetCustomers();
  const customerData = customers?.data as CustomerType[];

  const { data: orderData } = useFetchData(
    `merchants/sales-orders?paginate=0&sales_type=pos&customer_id=${selectedCustomer?.id}`
  );

  const { mutate: createReturn, isPending: isCreatingReturn } =
    useCreateData('merchants/returns');
  
  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleLineItemsSelect = useCallback((lineItems: LineItem[]) => {
    const itemsWithOriginalQuantity = lineItems.map(item => ({
      ...item,
      originalQuantity: item.quantity,
      quantity: 1
    }));
    setSelectedLineItems(itemsWithOriginalQuantity); 
  }, []);

  const handleQuantityChange = useCallback(
    (newQuantity: string, record: LineItem) => {
      const parsedQuantity = parseInt(newQuantity, 10);
      const quantity = isNaN(parsedQuantity) ? 0 : parsedQuantity;

      const originalQuantity = record.originalQuantity || record.quantity;
      if (quantity > originalQuantity) {
        notification.error({
          message: 'Quantity returned cannot be greater than quantity ordered',
        });
        return;
      }

      setSelectedLineItems((prevSelectedItems) =>
        prevSelectedItems.map((item) =>
          item.line_item_id === record.line_item_id
            ? { ...item, quantity: quantity } 
            : item
        )
      );
    },
    []
  );

  const handleConfirm = async () => {
    try {
      if (!selectedCustomer || !selectedOrder || selectedLineItems.length === 0) {
        notification.error({
          message: 'Please select a customer, order, and at least one product for return.',
        });
        return;
      }


      const hasInvalidQuantities = selectedLineItems.some(item => {
        const returnQuantity = item.quantity;
        const orderedQuantity = item.originalQuantity || 0;
        console.log(`Item ${item.line_item_id}: returning ${returnQuantity}, ordered ${orderedQuantity}`);
        return returnQuantity > orderedQuantity || returnQuantity <= 0;
      });
      
      if (hasInvalidQuantities) {
        notification.error({
          message: 'Invalid quantities detected',
          description: 'One or more items have invalid quantities. Return quantity must be greater than 0 and not exceed the ordered amount.',
        });
        return;
      }

      const invalidItems = selectedLineItems.filter(item => 
        item.quantity <= 0 || item.quantity > (item.originalQuantity || 0)
      );
      
      if (invalidItems.length > 0) {
        console.log('Invalid items found:', invalidItems);
        notification.error({
          message: 'Invalid return quantities',
          description: 'Please check the return quantities for all selected items.',
        });
        return;
      }

      const formattedLineItemsForReturn = selectedLineItems.map((item) => ({
        line_item_id: item.line_item_id,
        quantity: item.quantity,
        total_cost: parseFloat(item.total_cost.replace(/[^0-9.-]+/g, "")),
      }));

      const returnData: any = {
        user_id: selectedCustomer?.id,
        order_id: selectedOrder?.id,
        order_line_item_id: formattedLineItemsForReturn[0]?.line_item_id || '',
        refund_type: refundType,
        return_reason: returnReason,
        description: description,
        total_amount_refunded: formattedLineItemsForReturn.reduce((sum, item) => sum + item.total_cost, 0),
        quantity: formattedLineItemsForReturn[0]?.quantity,
        images: fileList.map((file) => file?.thumbUrl),
      };
      console.log('returnData', returnData);
      await createReturn(returnData, {
        onSuccess: () => {
          notification.success({
            message: 'Return created successfully',
          });
          setIsConfirmModalVisible(false);
          navigate(-1);
        },
        onError: (error: any) => {
          notification.error({
            message: 'Failed to create return',
            description: error.message || 'An unexpected error occurred.',
          });
          setIsConfirmModalVisible(false);
        },
      });
    } catch (error) {
      console.error('Error during return confirmation:', error);
      notification.error({
        message: 'An error occurred',
        description: 'Could not process the return request.',
      });
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
    setSelectedOrder(null); 
    setSelectedLineItems([]); 
  };

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
    setSelectedLineItems([]); 
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
              disabled={
                selectedCustomer === null ||
                selectedOrder === null ||
                selectedLineItems.length === 0 || 
                !refundType ||
                !returnReason
              }
              onClick={showConfirmModal}
            >
              Next
            </Button>
          </div>
        }
      />

      <div className="p-5 space-y-3">
        <Container>
          <CustomerSection
            onCustomerSelect={handleCustomerSelect}
            onCustomerRemove={handleCustomerRemove}
            showCustomer={true}
            showAddNew={true}
            customerData={customerData}
          />
        </Container>

        <Container>
          <OrderSection
            orderData={orderData}
            onOrderSelect={handleOrderSelect}
            customerId={selectedCustomerId as string}
            onLineItemsSelect={handleLineItemsSelect}
            showText={true}
            showCheckbox={true}
            handleQuantityChange={handleQuantityChange} 
          />
        </Container>

        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5} className="font-normal">
                Reason for return
              </Typography.Title>
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
                value={returnReason} 
              />
            </div>
          </div>
        </Container>
        
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5} className="font-normal">
                Refund Type
              </Typography.Title>
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
              <Typography.Title level={5} className="font-normal">
                Upload images
              </Typography.Title>
              <Typography.Text
                type="secondary"
                className="flex items-center gap-2"
              >
                <WarningOutlined
                  style={{ color: '#FAAD14' }}
                  className="text-lg"
                />
                Upload image evidence of damage product(s)
              </Typography.Text>
            </div>
            <div className="flex flex-col gap-2">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                maxCount={5}
                action="/upload.do" 
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Add Photos</div>
                </div>
              </Upload>
              <p className="text-sm text-gray-500">
                Recommended file is less than 2MB(File supports .jpg, .jpeg,
                .png)
              </p>
            </div>
          </div>
        </Container>
        
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Typography.Title level={5}>Description</Typography.Title>
            </div>

            <div className="w-full md:w-[500px]">
              <TextArea
                placeholder="Enter description about the return"
                className=""
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                value={description} 
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