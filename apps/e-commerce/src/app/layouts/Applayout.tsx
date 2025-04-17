import { App as AntApp, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const AppLayout = () => {
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isSell = location.pathname === '/sell';
  const isAdvertise = location.pathname === '/advertise';

  return (
    <AntApp>
      <Layout className="min-h-screen bg-white">
        <Header />
        <Content className="flex-grow">
          <div className={`${!isHome && !isAbout && !isSell && !isAdvertise ? 'container mx-auto px-4' : ''}`}>
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </AntApp>
  );
};

export default AppLayout;