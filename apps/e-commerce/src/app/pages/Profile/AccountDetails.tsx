import React from 'react';
import { Button } from 'antd';
import { getAuthUser } from '../../../utils/auth';

const AccountDetails: React.FC = () => {
  const user = getAuthUser();

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold">Name</p>
        <p>{user?.user?.name || 'N/A'}</p>
      </div>
      <div>
        <p className="font-semibold">Email</p>
        <p>{user?.user?.email || 'N/A'}</p>
      </div>
      <div>
        <Button type="primary" className="bg-[#003399]">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
