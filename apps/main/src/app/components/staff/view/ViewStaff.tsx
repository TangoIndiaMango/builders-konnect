// apps/main/src/app/pages/staff/view-staff.tsx
import { Avatar, Tag, Typography } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { handleCopy } from '../../../../utils/helper';
import { CopyIcon } from '../../../lib/CustomIcon';

const { Text } = Typography;
interface StaffDetailsProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  subsidiary: string;
  houseAddress: string;
  lastActive: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  staffID: string;
  store: string;
}

export const StaffProfileHeader: React.FC<{ staff: StaffDetailsProps }> = ({
  staff,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-start gap-6">
        {/* Avatar and Status */}
        <div className="relative">
          <Avatar
            src={
              staff?.avatar || 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
            }
            alt={staff?.name}
            size="large"
            className="object-cover w-24 h-24 rounded-full"
          />
          <div className="absolute -top-2 -right-2"></div>
        </div>

        {/* Staff Info */}
        <div className="flex-1">
          <Tag
            color={
              staff.status.toLowerCase() === 'active' ? 'success' : 'error'
            }
            className="capitalize"
          >
            {staff.status}
          </Tag>
          <div className="flex items-center gap-3">
            <h2 className="m-0 text-2xl font-semibold capitalize">
              {staff.name}
            </h2>
            <Tag
              onClick={() => handleCopy(staff?.staffID, 'Staff ID copied!')}
              className="flex gap-3 !hover:text-blue-600 !cursor-pointer !rounded-full !bg-[#E6F7FF] !border-none"
            >
              <CopyIcon color="#003399" />
              <Text className="hover:text-blue-600 cursor-pointer !text-[#003399]">
                #{staff?.staffID}
              </Text>
            </Tag>
          </div>

          {/* Contact Details */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MailOutlined />
              <a href={`mailto:${staff.email}`} className="text-blue-600">
                {staff.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneOutlined />
              <span>{staff.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StaffInformation: React.FC<{ staff: StaffDetailsProps }> = ({
  staff,
}) => {
  const infoItems = [
    {
      label: 'Role',
      value: staff.role,
    },
    {
      label: 'Store',
      value: staff.store,
    },
    // {
    //   label: 'House address',
    //   value: staff.houseAddress,
    // },
    {
      label: 'Last Active',
      value: staff.lastActive
        ? dayjs(staff.lastActive).format('DD MMM, YYYY | HH:mm A')
        : '--',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">OTHER INFORMATION</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {infoItems.map((item, index) => (
          <div key={index}>
            <div className="mb-1 text-sm text-gray-500">{item.label}</div>
            <div className="font-medium capitalize">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
