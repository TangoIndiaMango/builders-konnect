import { Avatar } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import ActionIcon from '../common/ActionIcon';

interface ProductListItemProps {
  name: string;
  SKU: string;
  primary_media_url: string;
  onClick?: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  name,
  SKU,
  primary_media_url,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-2 md:gap-5">
        <Avatar
          src={primary_media_url || `https://placehold.co/40x40/C7B9DA/black?text=${name?.split(' ').map((word) => word[0]?.toUpperCase()).join('')}`}
          size="large"
          style={{ backgroundColor: '#C7B9DA' }}
        />

        <div className="flex flex-col">
          <h4 className="text-sm font-medium md:text-lg">{name}</h4>
          <p className="text-xs text-gray-500 sm:text-sm md:text-base">
            {SKU}
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

export default ProductListItem;
