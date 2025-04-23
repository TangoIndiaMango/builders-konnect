
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const VendorProfileOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default VendorProfileOutlet;
