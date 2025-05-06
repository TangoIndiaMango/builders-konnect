import { Role } from '@/app/pages/staff';
import { PaginatedResponse } from '@/app/types/paginatedData';
import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePutData } from '../../../hooks/useApis';
import DisplayHeader from '../common/DisplayHeader';
import { SearchInput } from '../common/SearchInput';
import { SkeletonLoader } from '../common/SkeletonLoader';
import RolesCard from './roles/RolesCard';

interface RolesAndPermissionProps {
  rolesData: PaginatedResponse<Role>;
  isLoading: boolean;
  refetch: () => void;
}

const RolesAndPermission = ({
  rolesData,
  isLoading,
  refetch,
}: RolesAndPermissionProps) => {
  const [search, setSearch] = useState('');
  const updateRole = usePutData('merchants/roles');
  const navigate = useNavigate();

  const handleToggleRole = async (roleId: string, newStatus: boolean) => {
    try {
      await updateRole.mutateAsync({
        id: roleId,
        data: { isActive: newStatus },
      });
      message.success('Role status updated successfully');
      refetch(); // Refresh roles data
    } catch (error) {
      message.error('Failed to update role status');
    }
  };

  return (
    <div className="min-h-screen space-y-5">
      <DisplayHeader
        title="All Roles"
        description="You're viewing all roles below."
        actionButton={<></>}
      />
      <div className="w-full md:max-w-sm">
        <SearchInput onSearch={setSearch} placeholder="Search" />
      </div>
      <SkeletonLoader active={isLoading} type="card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rolesData?.data?.map((role: Role) => (
            <RolesCard
              key={role.id}
              role={role}
              handleToggleRole={handleToggleRole}
              isLoading={updateRole.isLoading}
              onClick={() => navigate(`/pos/staff/role/${role.id}`)}
            />
          ))}
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default RolesAndPermission;
