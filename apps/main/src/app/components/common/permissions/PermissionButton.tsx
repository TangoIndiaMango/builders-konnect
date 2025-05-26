import { Tooltip, Button } from 'antd';
import { getPermission } from '../../../../utils/permission';
import { usePermission } from '../../../store/permission';

export const PermissionButton: React.FC<{
  permissionName: string;
  tooltip?: string;
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ permissionName, tooltip, onClick, children, ...rest }) => {
  const { permission } = usePermission();
  const level = getPermission(permission?.permissions || [], permissionName);

  if (level === 'none') return null;
  if (level === 'partial') {
    return (
      <Tooltip
        title={tooltip || 'You do not have permission to perform this action'}
      >
        <Button {...rest} disabled>
          {children}
        </Button>
      </Tooltip>
    );
  }
  return (
    <Button {...rest} onClick={onClick}>
      {children}
    </Button>
  );
};
