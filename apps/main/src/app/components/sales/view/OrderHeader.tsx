import { Avatar } from "antd";

interface OrderHeaderProps {
  orderId: string;
  orderType: string;
}

export const OrderHeader = ({ orderId, orderType }: OrderHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">ORDER ID - {orderType}</p>
        <h1 className="text-2xl font-semibold">#{orderId}</h1>
      </div>
      <div>
      <Avatar
          shape="circle"
          size={64}
          className="bg-gray-200"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </div>
    </div>
  );
};
