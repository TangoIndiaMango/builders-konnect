import { useState } from "react";
import { Badge, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";

interface Notification {
  id: string;
  name: string;
  email: string;
  time: string;
}

export default function NotificationPanel() {
  const [notifications] = useState<Notification[]>([
    { id: "1", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
    { id: "2", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
    { id: "3", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
    { id: "4", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
    { id: "5", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
  ]);

  const renderNotificationList = () => (
    <div className="bg-white rounded-lg shadow-lg w-80 border border-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#f8fcff]">
        <h3 className="text-sm font-semibold text-blue-700">NOTIFICATION</h3>
        <BellOutlined className="text-gray-400" />
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-normal text-gray-900">{notification.name}</p>
                  <p className="text-xs text-gray-500">{notification.email}</p>
                </div>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No new notifications</div>
        )}
      </div>
      <div className="p-4 text-center border-t border-gray-100 bg-[#f8fcff]">
        <button className="text-base text-blue-700 hover:text-blue-900 font-medium">See all</button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <Dropdown
        trigger={["click"]}
        placement="top"
        dropdownRender={renderNotificationList}
        arrow
      >
        <Badge count={notifications.length} size="small">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellOutlined style={{ fontSize: "20px" }} />
          </button>
        </Badge>
      </Dropdown>
    </div>
  );
}
