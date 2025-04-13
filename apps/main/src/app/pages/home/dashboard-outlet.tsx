
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const VendorHomeOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default VendorHomeOutlet;
