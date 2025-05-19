import { Avatar } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import ActionIcon from '../../common/ActionIcon';

interface CustomerListItemProps {
  avatar: string;
  name: string;
  email: string;
  onClick?: () => void;
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({
  avatar,
  name,
  email,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full py-2  min-w-0">
      <div className="flex items-center gap-2 md:gap-5 flex-1 min-w-0">
        <Avatar
          src={avatar || `https://placehold.co/40x40/C7B9DA/black?text=${name?.split(' ').map((word) => word[0]?.toUpperCase()).join('')}`}
          size="large"
          style={{ backgroundColor: '#C7B9DA' }}
        />

        <div className="flex flex-col min-w-0">
          <h4 className="text-sm font-medium md:text-lg truncate">{name}</h4>
          <p className="text-xs text-gray-500 sm:text-sm md:text-base truncate">
            {email}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end flex-shrink-0">
        <ActionIcon
          icon={<ArrowRightOutlined rotate={-45} />}
          variant="subtle"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default CustomerListItem;
