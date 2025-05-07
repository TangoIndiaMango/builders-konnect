import React from 'react';

const ProfileInfoSection = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 border">
      <div className="grid grid-cols-6 gap-6 text-sm text-gray-700">
        {/* Left label only */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold text-black">PROFILE INFORMATION</h3>
        </div>

        {/* Right content */}
        <div className="col-span-5 grid grid-cols-2 gap-y-5">
          {/* Left Sub-Column */}
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-medium">Olugbenga Daniel</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone number</p>
              <p className="font-medium">(+234) 80 2424 24212</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <p className="font-medium">Customer Service Rep</p>
            </div>
          </div>

          {/* Right Sub-Column */}
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="font-medium">buildershub@gmail.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">User ID</p>
              <p className="font-medium flex items-center space-x-1">
                <span className="text-blue-500">🔵</span> <span>689937</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Store Assigned</p>
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                Mainland store
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
