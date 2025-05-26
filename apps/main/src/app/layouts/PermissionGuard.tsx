import React from 'react';
import { usePermission } from '../store/permission';
import { getPermission } from '@/utils/permission';

interface PermissionGuardProps {
  permissionName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGuard = ({
  permissionName,
  children,
  fallback,
}: PermissionGuardProps) => {
  const { permission } = usePermission();
  const level = getPermission(permission?.permissions || [], permissionName);

  if (level === 'none') {
    return fallback || <div>You are not authorized to access this page</div>;
  }

  return <div>{children}</div>;
};

export default PermissionGuard;
