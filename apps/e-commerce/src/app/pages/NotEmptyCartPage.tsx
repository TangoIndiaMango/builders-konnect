import { Button, Card} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ceramic } from '../lib/assets/images';
import { Link } from 'react-router-dom';


const cartItems = [
  {
    id: 1,
    name: 'Ceramic Tiles (30)',
    quantity: '1 Item',
    price: 3900,
    image: ceramic,
  },
  {
    id: 2,
    name: 'Ceramic Tiles (30)',
    quantity: '1 Item',
    price: 3900,
    image:ceramic,
  },
];

const CartNotEmptyPage = () => {
  return (
    <div className="max-w-3xl mx-auto pb-20 px-6 md:px-8 pt-16">
      <div className="flex justify-between mt-6 items-center mb-8">
        <h2 className="!mb-0 text-base md:text-xl text-[#00000073] font-medium">
          My Cart
        </h2>
        <Link to="/">
          <CloseOutlined className="text-[#00000073] text-base md:text-xl" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16  object-cover"
                />
                <div>
                  <h4 className="text-[#00000073] ">{item.name}</h4>
                  <div className="text-[#00000073] text-base">
                    {item.quantity}
                  </div>
                </div>
              </div>
              <p className="text-[#00000073]">
                N {item.price.toLocaleString()}
              </p>
                </div>
                <Link to="/order-summary"> 
            <Button
              type="primary"
              block
              className="mt-3 bg-[#002F87] py-4 rounded-md hover:bg-[#001f5e]"
            >
              Checkout
            </Button>
                </Link>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <h4 className="md:text-2xl mb-4 text-lg text-[#000000D9]">
          Have an Account?
        </h4>
        <p className="text-[#000000D9]">Log In to check out faster.</p>
      </div>
    </div>
  );
};

export default CartNotEmptyPage;
