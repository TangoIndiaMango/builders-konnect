// layouts/FooterOnlyLayout.jsx
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const FooterOnlyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FooterOnlyLayout;
