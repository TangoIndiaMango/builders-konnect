import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import MainLayoutHeader from '../components/MainlayoutHeader';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const isAuthPage = location.pathname.includes('/auth/');
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isSell = location.pathname === '/sell';
  const isAdvertise = location.pathname === '/advertise';
  const isTilingAndFlooring = location.pathname === '/tilingAndFlooring';



  return (
    <Layout className="min-h-screen bg-white">
      <Header />
      {!isAuthPage && <MainLayoutHeader />}
      <Content className="">
      <div className={`${!isHome && !isAbout && !isSell && !isAdvertise && !isTilingAndFlooring ? 'container mx-auto px-4' : ''}`}>
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
