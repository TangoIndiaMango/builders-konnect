import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MainLayoutHeader from '../components/MainlayoutHeader';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/auth/');

  return (
    <Layout className="min-h-screen">
      <Header />
      {!isAuthPage && <MainLayoutHeader />}
      <Content className="py-6">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
