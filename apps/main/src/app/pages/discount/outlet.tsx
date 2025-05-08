
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const DiscountOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default DiscountOutlet;
