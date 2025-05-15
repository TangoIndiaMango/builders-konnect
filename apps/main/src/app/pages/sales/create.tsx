import { Button, Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateData, useFetchData } from '../../../hooks/useApis';
import { useProductDiscounts } from '../../../hooks/useProductDiscount';
import { useGetCustomers } from '../../../service/customer/customerFN';
import { useCheckOut } from '../../../service/sales/salesFN';
import { formatBalance } from '../../../utils/helper';
import Container from '../../components/common/Container';
import NavigationBack from '../../components/common/NavigationBack';
import SuccessModal from '../../components/common/SuccessModal';
import { CustomerSection } from '../../components/sales/CustomerSection';
import { DiscountSection } from '../../components/sales/DiscountSection';
import PaymentAmountModal from '../../components/sales/PaymentAmountModal';
import PaymentMethodModal from '../../components/sales/PaymentMethodModal';
import { ProductSearch } from '../../components/sales/ProductSearch';
import { ProductTable } from '../../components/sales/ProductTable';
import { CustomerType, DiscountType, OrderSummary, ProductType } from './types';

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

const CreateSales = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    paymentMethodInterface[]
  >([]);
  const [selectedProductDiscount, setSelectedProductDiscount] = useState<
    string | null
  >(null);
  const [paymentAmount, setPaymentAmount] = useState<
    { methodId: string; amount: number; balance: number }[]
  >([]);

  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();
  const { data: customers, isLoading: isLoadingCustomers } = useGetCustomers();
  const discounts = useFetchData(
    'merchants/discounts?paginate=0&category=sales-orders'
  );
  const productDiscounts = useFetchData(
    'merchants/discounts?paginate=0&category=products'
  );
  const products = useFetchData('merchants/inventory-products');
  const calculateAmount = useCreateData(
    'merchants/sales-orders/amount-breakdown'
  );
  const paymentMethods = useFetchData('shared/sales-payment-methods');

  // console.log(paymentMethods?.data);

  // console.log(customers);
  // console.log(form.getFieldsValue());

  const discountData = discounts?.data?.data as DiscountType[];
  const productDiscountData = productDiscounts?.data?.data as DiscountType[];
  const productData = products?.data?.data as ProductType[];

  const customerData = customers?.data as CustomerType[];

  const paymentMethodData = paymentMethods?.data
    ?.data as paymentMethodInterface[];

  const { discountedPrices, applyDiscount, removeDiscount } =
    useProductDiscounts(productDiscountData);

  const handleProductSelect = (product: ProductType) => {
    // Check if product already exists
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...product,
          quantity: 1,
          totalPrice: Number(product.retail_price),
        },
      ]);
    }
  };

  const handleQuantityChange = (key: string, quantity: number) => {
    setSelectedProducts((products) =>
      products.map((p) =>
        p.id === key
          ? {
              ...p,
              quantity,
              totalPrice: Number(p.retail_price) * quantity,
            }
          : p
      )
    );
  };

  const handleRemoveProduct = (key: string) => {
    setSelectedProducts((products) => products.filter((p) => p.id !== key));
  };

  const handleCustomerSelect = (customer: CustomerType) => {
    setSelectedCustomer(customer);
  };

  const handleDiscountSelect = (value: string, option: any) => {
    console.log(value);
    setSelectedDiscount(value);
  };

  const handleRemoveDiscount = () => {
    setSelectedDiscount(null);
    setSelectedProductDiscount(null);
  };

  const handleApplyDiscount = () => {
    console.log(selectedProducts);
    console.log(selectedProductDiscount);
    if (selectedProducts.length > 0 && selectedProductDiscount) {
      applyDiscount(selectedProducts[0], selectedProductDiscount);
      setSelectedProductDiscount(null);
    }
  };

  useEffect(() => {
    calculateAmount.mutate(
      {
        line_items: selectedProducts.map((product) => ({
          product_id: product?.id,
          quantity: product?.quantity,
          discount_id: discountedPrices[product.id]?.discountId || '',
        })),
        discount_id: selectedDiscount,
      },
      {
        onSuccess: (data) => {
          setOrderSummary(data?.data as OrderSummary);
        },
      }
    );
  }, [selectedProducts, selectedDiscount]);

  const handlePaymentMethodSelect = (methods: paymentMethodInterface[]) => {
    setSelectedPaymentMethods((prev) => {
      const method = methods[0]
      const alreadySelected = prev.find((p) => p.id === method.id)
      if(alreadySelected){
        return prev.filter((p) => p.id !== method.id)
      }
      return [...prev, method]
    });
  };

  const handlePaymentConfirm = (
    payments: { methodId: string; amount: number; balance: number }[]
  ) => {
    setPaymentAmount(payments);

    // Determine customer payload based on whether it's an existing customer or new
    const customerPayload = selectedCustomer?.id
      ? {
          id: selectedCustomer.id,
        }
      : {
          name: selectedCustomer?.name || '',
          email: selectedCustomer?.email || '',
          phone: selectedCustomer?.phone || '',
          referral_source: selectedCustomer?.source || '',
        };

    const payload = {
      customer: customerPayload,
      status: 'completed',
      sales_type: 'pos',
      line_items: selectedProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        discount_id: discountedPrices[product.id]?.discountId || '',
      })),
      payment_methods: selectedPaymentMethods.map((method) => ({
        id: method.id,
        amount: Number(form.getFieldValue([method.id, 'amount'])),
      })),
      discount_id: selectedDiscount || '',
    };

    checkOut(
      {
        orders: [payload as any],
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setShowAmountModal(false);
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          notification.error({
            message: 'Error',
            description: error?.response?.data?.message || 'An error occurred',
          });
        },
      }
    );
  };

  const handleCheckOut = () => {
    setShowPaymentModal(true);
  };

  // console.log(orderSummary);
  // const isLoading =
  //   isLoadingCustomers || isLoadingDiscounts || paymentMethods?.isLoading;

  const handleClose = () => {
    // setSelectedProducts([]);
    // setSelectedCustomer(null);
    // setSelectedDiscount(null);
    // setOrderSummary(null);
    setShowSuccessModal(false);
    setShowPaymentModal(false);
    setShowAmountModal(false);
  };

  const isLoading =
    isCheckingOut ||
    isLoadingCustomers ||
    discounts?.isLoading ||
    paymentMethods?.isLoading ||
    products?.isLoading ||
    calculateAmount?.isPending;

  return (
    <div className="space-y-5">
      <NavigationBack
        title="Create Sales"
        actionButton={
          <div className="flex items-center justify-end gap-3">
            {/* <Button size="large" className="rounded">
              Pause Sales
            </Button> */}
            <Button
              type="primary"
              size="large"
              className="rounded"
              disabled={
                selectedProducts.length === 0 || selectedCustomer === null
              }
              loading={isCheckingOut}
              onClick={handleCheckOut}
            >
              Next
            </Button>
          </div>
        }
      />

      <div className="p-5 space-y-3">
        {/* {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        )} */}
        <Container className="space-y-5">
          <div className="flex flex-wrap items-center justify-between w-full gap-5">
            <div>
              <h3 className="font-medium md:text-lg">
                Search Product or{' '}
                <a className="underline text-[#003399]">Scan Product</a>
              </h3>
            </div>

            <div className="justify-end w-full md:w-1/2">
              <ProductSearch
                onSelect={handleProductSelect}
                data={productData}
                isLoading={isLoading}
              />
            </div>
          </div>
          {selectedProducts.length > 0 && (
            <ProductTable
              products={selectedProducts}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveProduct}
              handleApplyDiscount={handleApplyDiscount}
              discountedPrices={discountedPrices}
              productDiscountData={productDiscountData}
              isLoading={productDiscounts?.isLoading}
              selectedProductDiscount={selectedProductDiscount}
              setSelectedProductDiscount={setSelectedProductDiscount}
              removeDiscount={removeDiscount}
            />
          )}
        </Container>

        <Container>
          <CustomerSection
            onCustomerSelect={handleCustomerSelect}
            customerData={customerData}
          />
        </Container>

        <Container>
          <div className="flex flex-col justify-between w-full gap-3 md:flex-row md:items-center md:gap-5">
            <div>
              <h3 className="font-medium md:text-lg">Discount</h3>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-5">
              <DiscountSection
                onDiscountSelect={handleDiscountSelect}
                discountData={discountData}
                selectedDiscount={selectedDiscount}
              />
              {selectedDiscount ? (
                <Button
                  className="text-red-500 "
                  onClick={handleRemoveDiscount}
                >
                  Remove Discount
                </Button>
              ) : (
                <Button
                  type="primary"
                  className=""
                  onClick={handleApplyDiscount}
                >
                  Apply
                </Button>
              )}
            </div>
          </div>
        </Container>

        <Container>
          <div className="space-y-3">
            <h3 className="font-medium md:text-lg">Order Summary</h3>
            <div className="bg-[#F8F9FC] w-full p-3">
              <LabelValue
                label={`Subtotal (${selectedProducts.length} Items)`}
                value={`${formatBalance(orderSummary?.subtotal as number)}`}
              />
              <LabelValue
                label="Tax (7.5% VAT)"
                value={`${formatBalance(orderSummary?.fees.tax as number)}`}
              />
              <LabelValue
                label="Service fee"
                value={`${formatBalance(
                  orderSummary?.fees.service_fee as number
                )}`}
              />
              <LabelValue
                label="Total"
                value={`${formatBalance(orderSummary?.total as number)}`}
                className="font-semibold text-black"
              />
            </div>
          </div>
        </Container>
      </div>

      <PaymentMethodModal
        open={showPaymentModal}
        onClose={handleClose}
        paymentMethods={paymentMethodData || []}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        totalAmount={orderSummary?.total || 0}
        customerBalance={2}
        selectedMethods={selectedPaymentMethods}
        onContinue={() => {
          setShowPaymentModal(false);
          setShowAmountModal(true);
        }}
      />

      <PaymentAmountModal
        open={showAmountModal}
        onClose={handleClose}
        onBack={() => {
          setShowAmountModal(false);
          setShowPaymentModal(true);
        }}
        selectedMethods={selectedPaymentMethods}
        totalAmount={orderSummary?.total || 0}
        onConfirmPayments={handlePaymentConfirm}
        isLoading={isCheckingOut}
        form={form}
      />

      <SuccessModal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/pos/sales');
        }}
        title="Payment Successful"
        message="The payment has been processed successfully."
        buttonText="Done"
      />
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

export default CreateSales;
