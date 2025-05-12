import { Card } from "antd";
import { RightOutlined } from "@ant-design/icons";

export default function ProfileCard() {
  return (
    <Card className="w-full p-0 overflow-hidden rounded-lg border-0 shadow-none">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-4 px-2">
        <div className="bg-sky-200 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden mb-3">
          <img
            src="/Avatar.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h4 className="text-sm font-semibold mb-0">Olugbenga Daniels</h4>
        <p className="text-xs text-gray-500 mb-1">daniels@buildershub.com</p>
        <div className="bg-gray-100 rounded-full px-3 py-0.5 text-xs">
          <span className="text-gray-600">Finance Manager</span>
        </div>
      </div>

      {/* Current Account Section */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center mb-1">
          <span className="text-xs text-gray-500">Current account</span>
          <span className="ml-2 w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
        </div>
        <h5 className="text-sm font-medium mb-1">Builder's Hub Constructions</h5>
        <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-sky-100 text-sky-600">Egbeda Store</span>
      </div>

      {/* Switch Account Section */}
      <div className="px-4 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-500 block mb-2">Switch account/store</span>

        <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50">
          <span className="text-sm font-medium">Builder's Hub Constructions</span>
          <RightOutlined className="text-gray-400 text-xs" />
        </div>

        <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 border-t border-gray-100">
          <span className="text-sm font-medium">Builder's Hub Tools and Machinery</span>
          <RightOutlined className="text-gray-400 text-xs" />
        </div>
      </div>
    </Card>
  );
}
