import { useState } from 'react';
import { Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CartNotEmptyPage from './NotEmptyCartPage';

const {Text} = Typography;

const EmptyCart = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  return isCartEmpty ? (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative max-w-md w-full text-center space-y-6 p-6">
        <div className="absolute -top-28 -right-10 cursor-pointer text-gray-500 hover:text-black">
          <Link to="/">
          <CloseOutlined />
          </Link>
        </div>

        <div>
          <h5 className="text-[#1E1E1E] md:text-2xl mb-6 text-lg">
            Your Cart Is Empty
          </h5>
        </div>
        <Link to="/">
          <Button
            type="primary"
            className="bg-[#003399] rounded-md py-5 w-full"
          >
            Go To Shop
          </Button>
        </Link>

        <div className="mt-10">
          <h4 className="md:text-2xl mb-4 text-lg text-[#000000D9]">
            Have an Account?
          </h4>
          <p className="text-[#000000D9]">Log In to check out faster.</p>
        </div>

        <Text
          type="secondary"
          className="block text-base text-[#00000073] leading-relaxed"
        >
          Please note there is a 3-5 business day processing period for all
          orders. During sales and the holiday season, that period extends to
          7-10 business days. Excludes weekends as we are closed. Lastly, the
          processing period does not include shipping transit times.
        </Text>
      </div>
    </div>
  ) : (
    <div>
      <CartNotEmptyPage />
    </div>
  );
};

export default EmptyCart;
