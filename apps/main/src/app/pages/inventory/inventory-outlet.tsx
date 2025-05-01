import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const InventoryOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default InventoryOutlet;