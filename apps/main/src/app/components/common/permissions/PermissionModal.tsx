import { Modal, Button } from 'antd';
import { useState } from 'react';
import { getPermission } from '../../../../utils/permission';
import { usePermission } from '../../../store/permission';

export const PermissionModalButton: React.FC<{
  permissionName: string;
  modalText?: string;
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ permissionName, modalText, onClick, children, ...rest }) => {
  const { permission } = usePermission();
  const level = getPermission(permission.permissions, permissionName);
  const [open, setOpen] = useState(false);

  if (level === 'none') return null;
  if (level === 'partial') {
    return (
      <>
        <Button {...rest} onClick={() => setOpen(true)} disabled>
          {children}
        </Button>
        <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
          {modalText || 'You do not have permission to perform this action.'}
        </Modal>
      </>
    );
  }
  return (
    <Button {...rest} onClick={onClick}>
      {children}
    </Button>
  );
};
