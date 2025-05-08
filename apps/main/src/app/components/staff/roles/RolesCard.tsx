import { Avatar, Button, Switch } from 'antd';
import { Card } from 'antd';
import React from 'react';
import { Role } from '../../../pages/staff';
import { EditOutlined } from '@ant-design/icons';

interface RolesCardProps {
  role: Role;
  handleToggleRole: (id: string, checked: boolean) => void;
  isLoading: boolean;
  onClick: () => void;
}

const RolesCard = ({ role, handleToggleRole, isLoading, onClick }: RolesCardProps) => {
  return (
    <Card
      key={role.id}
      className="transition-shadow rounded-lg shadow-sm hover:shadow-md border-[#D9D9D9] min-h-[180px]"
      bodyStyle={{ padding: '24px' }}
    >
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <Avatar
              shape="square"
              size="small"
              className="bg-[#E6F7FF] border-[#003399] text-[#003399] text-sm"
            >
              {role?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <h3 className="m-0 text-lg font-semibold capitalize">
              {role?.name}
            </h3>
          </div>

            <Button type="link" onClick={onClick}>
              <EditOutlined />
            </Button>
          </div>

          <p className="text-gray-500 line-clamp-3 min-h-[60px]">
            {role?.description}
          </p>
        </div>

        <div className="">
          <Switch
            checked={role.is_active}
            onChange={(checked) => handleToggleRole(role.id.toString(), checked)}
            loading={isLoading}
            className={role.is_active ? 'bg-blue-600' : ''}
          />
        </div>
      </div>
    </Card>
  );
};

export default RolesCard;
