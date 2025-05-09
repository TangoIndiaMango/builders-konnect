import React from 'react';

const notifications = [
  {
    title: 'Email notification',
    message: 'Request for product refunds.',
    time: '10:30',
    ago: '2 minutes ago',
  },
  {
    title: 'Email notification',
    message: 'Request for product refunds.',
    time: '10:30',
    ago: '2 minutes ago',
  },
  {
    title: 'Email notification',
    message: 'Request for product refunds.',
    time: '10:30',
    ago: '2 minutes ago',
  },
  {
    title: 'Email notification',
    message: 'Request for product refunds.',
    time: '10:30',
    ago: '2 minutes ago',
  },
  {
    title: 'Email notification',
    message: 'Request for product refunds.',
    time: '10:30',
    ago: '2 minutes ago',
  },
];

const NotificationList = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm border">
      {/* TODAY heading with line */}
      <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold mb-4">
        <span>📅</span>
        <span>TODAY</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Notification items */}
      {notifications.map((item, index) => (
        <div key={index} className="flex justify-between items-start py-3">
          <div>
            <p className="font-semibold text-sm text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.message}</p>
          </div>
          <div className="text-xs text-gray-400 text-right whitespace-nowrap flex flex-col items-end">
            <span className="flex items-center gap-1">
              <span>{item.time}</span>
              <span>({item.ago})</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
