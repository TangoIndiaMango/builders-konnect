import { useState } from 'react';
import { Button, Select, Typography, Divider, Image } from 'antd';
import { products } from '../lib/Constants';
import Hero from '../components/ProductDetails/Hero';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const { Option } = Select;
const { Text } = Typography;

const CartPage = () => {
  const [quantities, setQuantities] = useState([1, 1]);

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const subtotal = products.reduce(
    (sum, product, i) => sum + product.price * quantities[i],
    0
  );

  return (
    <div>
      <Hero title="Your Cart" />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-right text-base text-[#003399] underline cursor-pointer mb-8">
          CONTINUE SHOPPING
        </div>

        <div className="hidden md:grid grid-cols-3 text-base text-[#000000] font-medium mb-10">
          <span>PRODUCT</span>
          <span className="text-center">QUANTITY</span>
          <span className="text-right">TOTAL</span>
        </div>

        {products.map((product, i) => (
          <div
            key={product.id}
            className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-6 gap-6"
          >
            <div className="flex gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={120}
                preview={false}
              />
              <div>
                <Text strong>{product.name}</Text>
                <br />
                <Text type="secondary">₦ {product.price.toLocaleString()}</Text>
              </div>
            </div>

            <div className="flex flex-col md:items-center gap-2">
              <p className="text-sm text-[#000000D9] md:text-left">
                Quantity :
              </p>
              <div className="flex gap-4 items-center">
                <Select
                  value={quantities[i]}
                  onChange={(value) => handleQuantityChange(i, value)}
                  style={{ width: 80 }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <Option key={idx + 1} value={idx + 1}>
                      {idx + 1}
                    </Option>
                  ))}
                </Select>
                <RiDeleteBinLine className="text-2xl text-[#00000073] cursor-pointer" />
              </div>
            </div>

            <div className="text-right text-[#4E4E4E] text-base md:text-xl font-medium">
              ₦ {(product.price * quantities[i]).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-10">
          <div className="w-full max-w-md text-right">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-[#4E4E4E] text-base">Subtotal</Text>
              <Text className="text-base text-[#4E4E4E] md:text-xl">
                ₦ {subtotal.toLocaleString()}
              </Text>
            </div>
            <Text
              type="secondary"
              className="block text-base text-[#4E4E4E] mb-4"
            >
              Taxes and Shipping will be calculated at checkout
            </Text>
            <Link to="/checkout">       
            <Button
              type="primary"
              size="large"
              block
              style={{ backgroundColor: '#003399' }}
            >
              Check Out
            </Button>
            </Link>
          </div>
        </div>

        <Divider />

        <Text
          type="secondary"
          className="text-base block text-center max-w-3xl mx-auto leading-5"
        >
          Please note there is a 3–5 business day processing window for all
          orders. During sales and the holiday season, that period extends to 7
          to 10 business days. Excludes weekends and all U.S. bank holidays.
          Lastly, the pre-order period does not include shipping time.
        </Text>
      </div>
    </div>
  );
};

export default CartPage;
