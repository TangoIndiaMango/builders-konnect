// apps/e-commerce/src/app/components/Cart/EmptyCart.tsx
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
      <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
      <Button
        type="primary"
        size="large"
        className="w-38"
        onClick={() => navigate('/')}
        style={{ backgroundColor: '#003399' }}
      >
        Go To Shop
      </Button>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Have an Account?</h3>
        <p className="mb-2">Log In to check out faster.</p>
        <Button
          type="default"
          onClick={() => navigate('/auth/login')}
          className="w-48"
        >
          Login
        </Button>
      </div>
      <p className="text-gray-500 text-sm max-w-xl mt-10">
        Please note there is a 3–5 business day processing period for all
        orders. During sales and the holiday season, that period extends to 7–10
        business days. Excludes weekends as we are closed. Lastly, the
        processing period does not include shipping transit times.
      </p>
    </div>
  );
};

export default EmptyCart;
