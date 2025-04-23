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
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 md:gap-5">
        <Avatar
          src={avatar}
          size="large"
          style={{ backgroundColor: '#C7B9DA' }}
        />

        <div className="flex flex-col">
          <h4 className="text-sm font-medium md:text-lg">{name}</h4>
          <p className="text-xs text-gray-500 sm:text-sm md:text-base">
            {email}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
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
