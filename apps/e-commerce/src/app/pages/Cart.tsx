import {
  Button,
  Select,
  Typography,
  Divider,
  Image,
  Spin,
  message,
  InputNumber,
} from 'antd';
import Hero from '../components/ProductDetails/Hero';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useCart } from '../../store/cartStore';
import { useEffect, useState } from 'react';
import EmptyCart from '../components/EmptyCart';

const { Option } = Select;
const { Text } = Typography;

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { cart, isLoading, error, fetchCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      message.success('Item removed from cart');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || 'Failed to remove item from cart'
      );
    }
  };

  const handleQuantityChange = async (itemId: string, value: number) => {
    // TODO: Implement quantity change

    console.log('Quantity changed:', value, 'for item:', itemId);
    try {
      // await updateCartItem(itemId, { quantity: value });
      setQuantity(value);
      // message.success('Quantity updated');
    } catch (error) {
      message.error('Failed to update quantity');
    }
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

  const cartItems = cart || [];

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.total_price),
    0
  );

  return (
    <div>
      <Hero title="Your Cart" />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="block text-right text-base text-[#003399] underline cursor-pointer mb-8"
        >
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
            <div className="flex gap-4 items-center">
              <Image
                src={
                  item?.metadata?.primary_media_url ??
                  `https://placehold.co/60x60/E6F7FF/black?fontSize=10&text=${item?.product_name
                    ?.charAt(0)
                    ?.toUpperCase()}`
                }
                alt={item?.product_name}
                width={120}
                height={120}
                preview={false}
              />
              <div>
                <p className="text-base font-medium capitalize max-w-[130px] line-clamp-1 hover:line-clamp-3">
                  {item?.product_name}
                </p>
                <p className="text-sm text-[#4E4E4E]">
                  ₦ {parseFloat(item?.price).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <div className=''>
                <h1 className="text-sm text-[#4E4E4E]">Quantity:</h1>
                <InputNumber
                  min={1}
                  max={1000}
                  value={item.quantity}
                  onChange={(value) =>
                    handleQuantityChange(item?.id, value ?? 1)
                  }
                  style={{ width: 80 }}
                  controls={true}
                  size="middle"
                />
              </div>

              <RiDeleteBinLine
                className="text-2xl text-[#00000073] cursor-pointer"
                onClick={() => handleDeleteItem(item?.id)}
              />
            </div>

            <div className="text-right text-[#4E4E4E] font-medium">
              ₦ {parseFloat(item?.total_price).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-10">
          <div className="w-full max-w-md text-right">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-[#4E4E4E] text-base">Subtotal</Text>
              <Text className="">
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
