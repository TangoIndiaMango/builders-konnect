import EmptyState from '../../../components/common/EmptyState';
import {
  CalendarOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, message, Pagination, Image } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import {
  useCreateData,
  useDeleteData,
  useFetchData,
  useFetchDataSeperateLoading,
  usePutData,
} from '../../../../hooks/useApis';
import { emptyStateIllustration } from '../../../lib/assets/images';
// Add relative time plugin to dayjs
dayjs.extend(relativeTime);

// const notifications = [
//   {
//     title: 'Email notification',
//     message: 'Request for product refunds.',
//     time: '10:30',
//     ago: '2 minutes ago',
//   },
//   {
//     title: 'Email notification',
//     message: 'Request for product refunds.',
//     time: '10:30',
//     ago: '2 minutes ago',
//   },
//   {
//     title: 'Email notification',
//     message: 'Request for product refunds.',
//     time: '10:30',
//     ago: '2 minutes ago',
//   },
//   {
//     title: 'Email notification',
//     message: 'Request for product refunds.',
//     time: '10:30',
//     ago: '2 minutes ago',
//   },
//   {
//     title: 'Email notification',
//     message: 'Request for product refunds.',
//     time: '10:30',
//     ago: '2 minutes ago',
//   },
// ];

interface NotificationDataProps {
  id: string;
  subject: string;
  message: string;
  created_at: string;
  read_at: string | null;
  date_string: string;
  metadata: {
    order_id: number;
    order_number: string;
    status: string;
    tracking_number: string;
    estimated_delivery: string;
    shipping_address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
}

interface NotificationGroup {
  group: string;
  items: NotificationDataProps[];
}

interface NotificationListProps {
  notifications: NotificationGroup[];
  unread_count: number;
}

const NotificationList = () => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const notificationData = useFetchDataSeperateLoading(
    `merchants/notifications?&grouped=true&limit=&paginate=true&page=${currentPage}&per_page=${pageSize}`
  );
  const notificationResponse = notificationData?.data?.data;
  const notifications = notificationResponse?.notifications;

  const markAsRead = usePutData(`merchants/notifications/:id/mark-as-read`);
  const markAllAsRead = useFetchData(
    `merchants/notifications/mark-all-as-read`
  );
  const deleteNotification = useDeleteData(`merchants/notifications/:id`);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync({ id });
      message.success('Marked as read');
    } catch (error) {
      message.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate(null, {
      onSuccess: () => {
        message.success('All marked as read');
      },
      onError: () => {
        message.error('Failed to mark all as read');
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteNotification.mutate(id as any, {
      onSuccess: () => {
        message.success('Notification deleted');
      },
      onError: () => {
        message.error('Failed to delete notification');
      },
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(
        notifications.flatMap((group) => group.items.map((item) => item.id))
      );
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedNotifications([...selectedNotifications, id]);
    } else {
      setSelectedNotifications(selectedNotifications.filter((n) => n !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-50">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 text-gray-400 text-xs">
          <CalendarOutlined className="text-gray-400 text-lg" />
          <span>NOTIFICATIONS</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={
              selectedNotifications.length ===
              notifications.reduce((acc, group) => acc + group.items.length, 0)
            }
          >
            Select All
          </Checkbox>
          <Button
            icon={<CheckOutlined />}
            onClick={handleMarkAllAsRead}
            disabled={selectedNotifications.length === 0}
          >
            Mark as Read
          </Button>
        </div>
      </div>

      {/* Notification groups */}
      {notifications.map((group) => (
        <div key={group.group} className="mb-6">
          {/* Group header */}
          <div className="flex items-center space-x-2 text-gray-400 text-xs mb-4">
            {/* <CalendarOutlined className="text-gray-400 text-lg" /> */}
            <span>{group.group}</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Group items */}
          {group.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start py-3 border-b border-gray-100"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedNotifications.includes(item.id)}
                  onChange={(e) =>
                    handleSelectNotification(item.id, e.target.checked)
                  }
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {item.subject}
                  </p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400 text-right whitespace-nowrap flex flex-col items-end">
                  <span className="flex items-center gap-1">
                    <span>{dayjs(item.created_at).format('HH:mm')}</span>
                    <span>({item.date_string})</span>
                  </span>
                </div>
                {!item.read_at && (
                  <Button
                    type="text"
                    size="small"
                    onClick={() => handleMarkAsRead(item.id)}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
