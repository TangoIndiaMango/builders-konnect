import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useState } from 'react';
import Container from '../../components/common/Container';
import { SearchInput } from '../../components/common/SearchInput';
import { CustomerSection } from '../../components/sales/CustomerSection';
import { ProductSearch } from '../../components/sales/ProductSearch';
import { ProductTable } from '../../components/sales/ProductTable';
import { Customer, Product } from '../../lib/mockData';
import { DiscountSection } from '../../components/sales/DiscountSection';
import { useNavigate } from 'react-router';
import NavigationBack from '../../components/common/NavigationBack';

const CreateSales = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);

  const handleProductSelect = (product: Product) => {
    // Check if product already exists
    if (!selectedProducts.find((p) => p.key === product.key)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleQuantityChange = (key: string, quantity: number) => {
    setSelectedProducts((products) =>
      products.map((p) =>
        p.key === key
          ? { ...p, quantity, totalPrice: p.unitPrice * quantity }
          : p
      )
    );
  };

  const handleRemoveProduct = (key: string) => {
    setSelectedProducts((products) => products.filter((p) => p.key !== key));
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleDiscountSelect = (value: string, option: any) => {
    console.log(value);
    setSelectedDiscount(value);
  };

  const handleRemoveDiscount = () => {
    setSelectedDiscount(null);
  };

  const handleApplyDiscount = () => {
    // Implementation for applying discount
  };

  // Calculate totals
  const subtotal = selectedProducts.reduce((sum, p) => sum + p.totalPrice, 0);
  const tax = subtotal * 0.075; // 7.5% VAT
  const serviceFee = 1000; // Example service fee
  const total = subtotal + tax + serviceFee;

  return (
    <div className="space-y-5">
      <NavigationBack
        title="Create Sales"
        actionButton={
          <div className="flex items-center justify-end gap-3">
            <Button size="large" className="rounded">
              Pause Sales
            </Button>
            <Button
              type="primary"
              size="large"
              className="rounded"
              onClick={() => navigate('/pos/sales/view/1')}
            >
              Next
            </Button>
          </div>
        }
      />

      <div className="p-5 space-y-3">
        <Container className="space-y-5">
          <div className="flex flex-wrap items-center justify-between w-full gap-5">
            <div>
              <h3 className="font-medium md:text-lg">
                Search Product or{' '}
                <a className="underline text-[#003399]">Scan Product</a>
              </h3>
            </div>

            <div className="justify-end w-full md:w-1/2">
              <ProductSearch onSelect={handleProductSelect} />
            </div>
          </div>
          {selectedProducts.length > 0 && (
            <ProductTable
              products={selectedProducts}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveProduct}
            />
          )}
        </Container>

        <Container>
          <CustomerSection onCustomerSelect={handleCustomerSelect} />
        </Container>

        <Container>
          <div className="flex flex-col justify-between w-full gap-3 md:flex-row md:items-center md:gap-5">
            <div>
              <h3 className="font-medium md:text-lg">Discount</h3>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-5">
              <DiscountSection
                onDiscountSelect={handleDiscountSelect}
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
                value={`₦ ${subtotal.toLocaleString()}`}
              />
              <LabelValue
                label="Tax (7.5% VAT)"
                value={`₦ ${tax.toLocaleString()}`}
              />
              <LabelValue
                label="Service fee"
                value={`₦ ${serviceFee.toLocaleString()}`}
              />
              <LabelValue
                label="Total"
                value={`₦ ${total.toLocaleString()}`}
                className="font-semibold text-black"
              />
            </div>
          </div>
        </Container>
      </div>
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
