import { CheckOutlined } from '@ant-design/icons';
import { Button} from 'antd';
import { Link } from 'react-router';


const OrderSuccess = () => {
    return (
      <div className="h-screen pb-48">
        <div className="min-h-[500px] flex items-center justify-center bg-white px-4">
          <div className="text-center space-y-6 max-w-md w-full">
            <h2 className="font-medium text-[#000000D9]  text-lg md:text-2xl">
              Congratulations
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-[#0033A1] rounded-full flex items-center justify-center">
                <CheckOutlined style={{ fontSize: 44, color: 'white' }} />
              </div>
            </div>
            <div>
              <h4
                className="mb-3 text-base md:text-xl font-medium text-[#1E1E1E]"
              >
                Order Successful
              </h4>
              <p className="text-base mt-3 w-96 mx-auto text-[#00000073]">
                Your order number is{' '}
                <span className="">#OR-12468</span>. You
                will get a confirmation mail from Builder’s Konnect soon.
              </p>
                    </div>
                    <Link to="/">          
            <Button type="primary" className="bg-[#0033A1] rounded-md w-80">
              Continue Shopping
            </Button>
                    </Link>
          </div>
        </div>
      </div>
    );
};

export default OrderSuccess;
