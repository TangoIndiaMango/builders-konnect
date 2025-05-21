
import { Button, Select, Typography, Divider, Image, Spin, message } from 'antd';
import Hero from '../components/ProductDetails/Hero';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useGetCart } from '../../hooks/useApis';
import { axiosInstance, baseUrl } from '../../utils/axios-instance';


const { Option } = Select;
const { Text } = Typography;

const CartPage = () => {
  const { data: cartData, isLoading, error, refetch } = useGetCart();

  const handleDeleteItem = async (itemId: string) => {
    try {
      await axiosInstance.delete(`${baseUrl}customers/carts/${itemId}`);
      message.success('Item removed from cart');
      refetch();
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err?.response?.data?.message || 'Failed to remove item from cart');
    }
  };

  const handleQuantityChange = async (_productId: string, _value: number) => {
    // TODO: Implement update quantity functionality
    message.info('Quantity update coming soon');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load cart</p>
      </div>
    );
  }

  const cartItems = cartData?.data || [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.total_price),
    0
  );

  return (
    <div>
      <Hero title="Your Cart" />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="block text-right text-base text-[#003399] underline cursor-pointer mb-8">
          CONTINUE SHOPPING
        </Link>

        <div className="hidden md:grid grid-cols-3 text-base text-[#000000] font-medium mb-10">
          <span>PRODUCT</span>
          <span className="text-center">QUANTITY</span>
          <span className="text-right">TOTAL</span>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-6 gap-6"
          >
            <div className="flex gap-4">
              <Image
                src={item.metadata?.primary_media_url || '/placeholder.png'}
                alt={item.product_name}
                width={120}
                preview={false}
              />
              <div>
                <Text strong>{item.product_name}</Text>
                <br />
                <Text type="secondary">₦ {parseFloat(item.price).toLocaleString()}</Text>
              </div>
            </div>

            <div className="flex flex-col md:items-center gap-2">
              <p className="text-sm text-[#000000D9] md:text-left">
                Quantity :
              </p>
              <div className="flex gap-4 items-center">
                <Select
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item.id, value)}
                  style={{ width: 80 }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <Option key={idx + 1} value={idx + 1}>
                      {idx + 1}
                    </Option>
                  ))}
                </Select>
                <RiDeleteBinLine 
                  className="text-2xl text-[#00000073] cursor-pointer" 
                  onClick={() => handleDeleteItem(item.id)}
                />
              </div>
            </div>

            <div className="text-right text-[#4E4E4E] text-base md:text-xl font-medium">
              ₦ {parseFloat(item.total_price).toLocaleString()}
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
