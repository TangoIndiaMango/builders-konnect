import { Typography, Button } from 'antd';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { ceramic } from '../lib/assets/images';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const CartSummary = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Ceramic Tiles (30 x 40)',
      price: 3900,
      quantity: 1,
      image: ceramic,
    },
    {
      id: 2,
      name: 'Vitamous Hibiscus Tea Wellness',
      price: 3900,
      quantity: 1,
      image: ceramic,
    },
    {
      id: 3,
      name: 'Vitamous Hibiscus Tea Wellness',
      price: 3900,
      quantity: 1,
      image: ceramic,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 pt-12 pb-16 container mx-auto relative">
      <Link to="/">
        <div className="absolute text-lg md:text-xl top-6 right-4 cursor-pointer text-gray-500 hover:text-black">
          <CloseOutlined />
        </div>
      </Link>

      <h2 className="font-semibold text-lg md:text-2xl text-[#00000073] lg:text-4xl">
        My Cart
      </h2>

      <div className="space-y-6 mt-10">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start border-b border-[#A4A4A4] pb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-40 h-auto object-cover"
            />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                <Text className="block text-base">{item.name}</Text>
                <Text strong className="block mt-2 sm:mt-0 text-base">
                  ₦ {item.price.toLocaleString()}
                </Text>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button className="bg-[#EBEBEB]" size="small">
                  -
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button className="bg-[#EBEBEB]" size="small">
                  +
                </Button>
                <DeleteOutlined className="text-gray-500 hover:text-red-500 ml-3 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-b border-[#A4A4A4] pb-3 items-center mt-6">
        <Text className="text-base font-semibold">SUBTOTAL</Text>
        <Text className="text-[#000000D9]">₦ {subtotal.toLocaleString()}</Text>
      </div>

      <Text className="flex justify-center items-center mt-8 text-sm sm:text-base text-[#00000073] text-center">
        Taxes and Shipping will be calculated at checkout
      </Text>

      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <Link to="/cart" className="w-full">
          <Button type="default" className="w-full py-5">
            View Cart
          </Button>
        </Link>
        <Link to="/checkout" className="w-full">
          <Button
            type="primary"
            className="bg-[#003399] w-full py-5 text-white"
          >
            Check Out
          </Button>
        </Link>
      </div>

      <div className="mt-14 flex justify-center flex-col items-center text-center">
        <h4 className="text-lg sm:text-xl md:text-2xl mb-2 text-[#000000D9]">
          Have an Account?
        </h4>
        <p className="text-sm sm:text-base text-[#000000D9]">
          Log In to check out faster.
        </p>
      </div>

      <p className="block text-center text-sm sm:text-base max-w-xl mx-auto mt-8 text-[#00000073] leading-relaxed">
        Please note there is a 3-5 business day processing period for all
        orders. During sales and the holiday season, that period extends to 7-10
        business days. Excludes weekends as we are closed. Lastly, the
        processing period does not include shipping transit times.
      </p>
    </div>
  );
};

export default CartSummary;
