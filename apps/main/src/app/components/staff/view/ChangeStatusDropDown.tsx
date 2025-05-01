
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface ChangeStatusDropdownProps {
  currentStatus: 'Active' | 'Inactive';
  onChange: (status: 'Active' | 'Inactive') => void;
  loading?: boolean;
}

const ChangeStatusDropdown: React.FC<ChangeStatusDropdownProps> = ({
  currentStatus,
  onChange,
  loading
}) => {
  const items: MenuProps['items'] = [
    {
      key: 'Active',
      label: 'Active',
      disabled: currentStatus === 'Active'
    },
    {
      key: 'Inactive',
      label: 'Inactive',
      disabled: currentStatus === 'Inactive'
    }
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onChange(e.key as 'Active' | 'Inactive');
  };

  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  return (
    <Dropdown menu={menuProps} trigger={['click']} className="w-full">
      <Button loading={loading} className="flex items-center gap-2">
        Change status <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ChangeStatusDropdown;