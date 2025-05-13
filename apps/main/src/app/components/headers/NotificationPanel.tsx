import { useNavigate } from 'react-router-dom';
import { useFetchDataSeperateLoading } from '../../../hooks/useApis';
interface Notification {
  id: string;
  name: string;
  email: string;
  time: string;
}

interface NotificationMetadata {
  payment_id: number;
  amount: number;
  currency: string;
  payment_method: string;
  transaction_id: string;
  order_id: number;
  payment_date: string; // You could use `Date` if this is parsed elsewhere
}

export interface NotificationAPI {
  id: string;
  subject: string;
  message: string;
  created_at: string; // ISO string, could be Date if parsed
  read_at: string; // ISO string, could be Date if parsed
  date_string: string;
  metadata: NotificationMetadata;
}
const notifications: Notification[] = [
  {
    id: '1',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    time: '3 mins ago',
  },
  {
    id: '2',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    time: '3 mins ago',
  },
  {
    id: '3',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    time: '3 mins ago',
  },
  {
    id: '4',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    time: '3 mins ago',
  },
  {
    id: '5',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    time: '3 mins ago',
  },
];

export default function NotificationPanel({
  notificationsAPI,
}: {
  notificationsAPI: NotificationAPI[];
}) {
  const navigate = useNavigate();

  // console.log(notificationsAPI, 'notificationsAPI');
  return (
    <div className="bg-white relative rounded-lg shadow-lg w-80 border border-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
        <h3 className="text-sm font-semibold text-blue-700">NOTIFICATIONS</h3>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notificationsAPI?.length > 0 ? (
          notificationsAPI?.slice(0, 5)?.map((notification) => (
            <div
              key={notification.id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="w-1/2">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {notification.subject}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {notification.date_string}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No new notifications
          </div>
        )}
      </div>
      <div className="p-3 text-center bg-white border-t border-gray-100 sticky bottom-0 w-full">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => navigate('/pos/settings?tab=notifications')}
        >
          See all
        </button>
      </div>
    </div>
  );
}
