import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const AppLayout = () => {
  const isHome = location.pathname === '/';

  return (
    <Layout className="min-h-screen bg-white">
      <Header />
      <Content className="flex-grow py-6">
      <div className={`${!isHome ? 'container mx-auto px-4' : ''}`}>
      <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;