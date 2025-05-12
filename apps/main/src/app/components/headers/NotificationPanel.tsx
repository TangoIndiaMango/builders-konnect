interface Notification {
    id: string;
    name: string;
    email: string;
    time: string;
  }
  
  export default function NotificationPanel() {
    const notifications: Notification[] = [
      { id: "1", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
      { id: "2", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
      { id: "3", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
      { id: "4", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
      { id: "5", name: "Olivia Rhye", email: "olivia@untitledui.com", time: "3 mins ago" },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-lg w-80 border border-gray-100">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-blue-700">NOTIFICATIONS</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.name}</p>
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
        <div className="p-3 text-center border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">See all</button>
        </div>
      </div>
    );
  }
  