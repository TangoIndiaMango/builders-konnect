import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetchData, useFetchSingleData } from '../../../hooks/useApis';

const stores = [
  { id: '1', name: "Builder's Hub Constructions" },
  { id: '2', name: "Builder's Hub Tools and Machinery" },
  // ...add more stores as needed
];

const ProfileDropdown = ({
  user,
  visibleTab,
  businessProfile,
  notificationsAPI,
  handleLogout,
  isMobile,
  navigate,
}: {
  user: any;
  visibleTab: string;
  businessProfile: any;
  notificationsAPI: any;
  handleLogout: () => void;
  isMobile: boolean;
  navigate: (path: string) => void;
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const storeData = useFetchSingleData(
    `merchants/locations/switch/${selectedStoreId}`,
    !!selectedStoreId
  );

  // Handler for switching store
  const handleSwitchStore = async (storeId) => {
    setSelectedStoreId(storeId);
    storeData.refetch();
  };

  // console.log('user', user);

  return (
    <div className="bg-white shadow-lg rounded-md border border-gray-100 w-72 max-w-full">
      <div>
        <>
          {/* Profile Section */}
          <div className="flex flex-col items-center py-4 px-2">
            <div className="bg-sky-200 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden mb-3">
              <img
                src={
                  user?.avatar ??
                  `https://placehold.co/160x160/e0e0e0/e0e0e0?text=${user?.name
                    ?.charAt(0)
                    .toUpperCase()}`
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="text-sm font-semibold mb-0">
              {user?.name ?? 'N/A'}
            </h4>
            <p className="text-xs text-gray-500 mb-1 text-center break-all">
              {user?.email ?? 'N/A'}
            </p>
            <div className="bg-gray-100 rounded-full px-3 py-0.5 text-xs">
              <span className="text-gray-600">{user?.role ?? 'N/A'}</span>
            </div>
          </div>

          {/* Current Account Section */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center mb-1">
              <span className="text-xs text-gray-500">Current account</span>
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
            </div>
            <h5 className="text-sm font-medium mb-1">
              {businessProfile?.business?.name ?? `N/A`}
            </h5>
            <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-sky-100 text-sky-600">
              {businessProfile?.business?.type ?? `N/A`}
            </span>
          </div>

          {/* Switch Account Section */}
          <div className="px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 block mb-2">
              Switch store
            </span>
            {user?.store?.map((store) => (
              <div
                key={store.id}
                className={`flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 border-gray-100 ${
                  selectedStoreId === store.id ? 'bg-blue-50 font-semibold' : ''
                }`}
                onClick={() => handleSwitchStore(store.id)}
              >
                <span className="text-sm font-medium truncate">
                  {store?.name}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Toggle for mobile */}

          <div className="px-4 py-3 border-t border-gray-100">
            {/* Footer Toggle for mobile */}
            {isMobile && (
              <div className="border-t border-gray-200">
                <button
                  onClick={() => {
                    if (visibleTab === 'profile') {
                      navigate('/pos/settings?tab=notifications');
                    } else {
                      navigate('/pos/settings?tab=profile');
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700"
                >
                  {visibleTab === 'profile'
                    ? '🔔 View Notifications'
                    : '👤 Back to Profile'}
                </button>
              </div>
            )}

            {/* Logout Button */}
            <Button
              className="  focus:bg-gray-100 transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutOutlined className="text-gray-400 text-base" />
              <span className="text-gray-700">Logout</span>
            </Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProfileDropdown;
