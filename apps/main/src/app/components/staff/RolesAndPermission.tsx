import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePutData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { Role } from '../../pages/staff';
import { PaginatedResponse } from '../../types/paginatedData';
import DisplayHeader from '../common/DisplayHeader';
import { SearchInput } from '../common/SearchInput';
import { SkeletonLoader } from '../common/SkeletonLoader';
import RolesCard from './roles/RolesCard';
import { useState } from 'react';

interface RolesAndPermissionProps {
  rolesData: PaginatedResponse<Role>;
  isLoading: boolean;
  refetch: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const RolesAndPermission = ({
  rolesData,
  isLoading,
  refetch,
  searchValue,
  setSearchValue,
}: RolesAndPermissionProps) => {
  const [roleId, setRoleId] = useState<string>('');
  const updateRole = usePutData(`merchants/roles/${roleId}`);
  const navigate = useNavigate();

  const handleToggleRole = async (roleId: string, newStatus: boolean) => {
    setRoleId(roleId);
    try {
      await updateRole.mutateAsync({ is_active: newStatus });
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
        <SearchInput
          onChange={setSearchValue}
          value={searchValue}
          placeholder="Search"
        />
      </div>
      <SkeletonLoader active={isLoading} type="card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rolesData?.data?.map((role: Role) => (
            <RolesCard
              key={role.id}
              role={role}
              handleToggleRole={handleToggleRole}
              isLoading={updateRole.isPending}
              onClick={() => navigate(`/pos/staff/role/${role.id}`)}
            />
          ))}
        </div>
      </SkeletonLoader>
    </div>
  );
};

export default RolesAndPermission;
