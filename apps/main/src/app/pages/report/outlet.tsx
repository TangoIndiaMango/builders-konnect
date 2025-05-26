import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

export default function ReportsOutlet() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}
