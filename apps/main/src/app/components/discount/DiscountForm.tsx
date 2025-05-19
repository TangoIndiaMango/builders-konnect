// components/discount/DiscountForm.tsx
import { DeleteOutlined } from '@ant-design/icons';
import {
  Collapse,
  DatePicker,
  Form,
  FormInstance,
  Input,
  List,
  Modal,
  Radio,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { DiscountFormValues } from '../../pages/discount/types';
import { ProductType } from '../../pages/sales/types';
import SingleProductItem from '../product/SingleProductItem';
import ProductSearchModal from './DiscountProductSearchModal';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { parseDate } from '../../../utils/helper';

const { Option } = Select;

interface SingleDiscountData {
  id: number;
  name: string;
  code: string;
  category: string;
  start_date: string;
  end_date: string;
  percent: string;
  amount: number;
  redemption: number;
  status: string;
  products: ProductType[];
}
interface DiscountFormProps {
  initialValues?: Partial<SingleDiscountData> | any;
  onFinish: (values: DiscountFormValues) => void;
  loading?: boolean;
  form: FormInstance<DiscountFormValues>;
  allProductsValue: boolean;
  categoryValue: string;
}

const { Panel } = Collapse;
const DiscountForm: React.FC<DiscountFormProps> = ({
  initialValues,
  onFinish,
  loading,
  form,
  allProductsValue,
  categoryValue,
}) => {
  const discountedProducts =
    initialValues?.products?.map((product: ProductType) => product.id) || [];
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] =
    useState<string[]>(discountedProducts);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null
  );
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const typeValue = Form.useWatch('type', form);
  useEffect(() => {
    if (initialValues?.products) {
      const discountedProducts = initialValues.products.map(
        (product: ProductType) => product.id
      );
      setSelectedProducts(discountedProducts);
      const startDate = initialValues?.start_date;
      const endDate = initialValues?.end_date;
      form.setFieldsValue({
        category: initialValues?.category,
        name: initialValues?.name,
        code: initialValues?.code,
        start_date: startDate,
        end_date: endDate,
        type: initialValues?.type ?? 'percentage',
        value:
          typeValue === 'percentage'
            ? Number(initialValues?.percent)
            : Number(initialValues?.amount),
        all_products:
          initialValues?.category?.toLowerCase() === 'products' ? true : false,
        discounted_products: discountedProducts,
      });
      setSearchedProducts(initialValues.products);
    }
  }, [initialValues, form]);

  const handleProductSelect = (ids: string[], products: ProductType[]) => {
    setSelectedProducts(ids);
    setSearchedProducts(products);
    form.setFieldValue('discounted_products', ids);
    setShowProductModal(false);
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
    setSearchedProducts((prev) => prev.filter((p) => p.id !== id));
    form.setFieldValue('discounted_products', selectedProducts);
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  // console.log(searchedProducts);
  if (loading) {
    return <SkeletonLoader active type="form" rows={6} />;
  }

  return (
    <div className="min-h-screen">
      <Form
        form={form}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={(values) => {
          onFinish({
            ...values,
            discounted_products: values.all_products
              ? undefined
              : selectedProducts,
          });
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="Discount Application"
          name="category"
          rules={[
            { required: true, message: 'Please select discount application' },
          ]}
        >
          <Radio.Group>
            <Radio value="products">Discount per product</Radio>
            <Radio value="sales-orders">Discount on total order</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter discount name' }]}
        >
          <Input placeholder="Enter discount name" />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: 'Please enter code' }]}
        >
          <Input placeholder="Enter code" />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="start_date"
          rules={[{ required: true, message: 'Please select start date' }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value, 'YYYY-MM-DD HH:mm:ss') : null,
          })}
        >
          <DatePicker
            format="YYYY-MM-DD"
            minDate={dayjs(new Date())}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="end_date"
          rules={[{ required: true, message: 'Please select end date' }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value, 'YYYY-MM-DD HH:mm:ss') : null,
          })}
        >
          <DatePicker
            format="YYYY-MM-DD"
            minDate={dayjs(new Date())}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Discount Type"
          name="type"
          rules={[{ required: true, message: 'Please select discount type' }]}
        >
          <Select placeholder="Select discount type">
            <Option value="amount">Amount</Option>
            <Option value="percentage">Percentage</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[
            { required: true, message: 'Please enter value' },
            {
              validator: (_, value) => {
                if (
                  value &&
                  typeValue === 'percentage' &&
                  (value < 0 || value > 100)
                ) {
                  return Promise.reject('Percentage must be between 0 and 100');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type="number"
            prefix={typeValue === 'percentage' ? '%' : '₦'}
            placeholder="Enter value"
          />
        </Form.Item>

        {categoryValue === 'products' && (
          <Form.Item
            label="Is the discount for all products"
            name="all_products"
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        {/* Only show product selection if not for all products */}
        {allProductsValue === false && (
          <Form.Item label="Select Discounted Products">
            <Input
              readOnly
              value={
                selectedProducts.length
                  ? `${selectedProducts.length} products selected`
                  : ''
              }
              onClick={() => setShowProductModal(true)}
              placeholder="Click to select products"
            />
          </Form.Item>
        )}

        <Form.Item name="discounted_products" noStyle>
          <Input type="hidden" />
        </Form.Item>

        <div className="max-w-2xl mx-auto">
          {/* Selected products collpasable here */}
          {searchedProducts.length > 0 && (
            <Collapse
              defaultActiveKey={['selected-products']}
              expandIconPosition="end"
              className="rounded-lg bg-[#F5F5F5]"
            >
              <Panel
                header={
                  <div className="font-semibold">
                    Selected Products ({searchedProducts.length})
                  </div>
                }
                key="selected-products"
              >
                <List
                  dataSource={searchedProducts}
                  className="max-h-[300px] xl:max-h-[400px] overflow-y-auto custom-scrollbar bg-white"
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <span
                          key="delete"
                          className="text-red-500 cursor-pointer flex items-center justify-end"
                          onClick={() => {
                            setProductToDelete(item);
                            setShowDeleteModal(true);
                          }}
                        >
                          <DeleteOutlined />
                        </span>,
                      ]}
                    >
                      <SingleProductItem item={item} />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          )}
        </div>
      </Form>

      {/* Delete Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => productToDelete && handleRemoveProduct(productToDelete.id)}
        okText="Yes"
        cancelText="No"
        centered
        title={
          <span>
            <DeleteOutlined className="mr-2 text-red-500" />
            Remove Product
          </span>
        }
      >
        Are you sure you want to remove this product from the list?
      </Modal>

      <ProductSearchModal
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSelect={handleProductSelect}
        selected={selectedProducts}
      />
    </div>
  );
};

export default DiscountForm;
