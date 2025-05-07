
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const ReturnsOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default ReturnsOutlet;
