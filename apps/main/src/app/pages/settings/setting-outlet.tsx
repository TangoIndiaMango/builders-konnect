import { Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';

const SettingOutlet = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  )
}

export default SettingOutlet;
