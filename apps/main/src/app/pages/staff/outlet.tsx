
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const StaffOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default StaffOutlet;
