
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const SalesOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default SalesOutlet;
