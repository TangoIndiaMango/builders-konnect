import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const CustomersOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default CustomersOutlet;