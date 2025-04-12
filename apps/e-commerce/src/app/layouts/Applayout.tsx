import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
interface AppLayoutProps {
    children?: React.ReactNode;
  }

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-grow bg-gray-50 py-6">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;