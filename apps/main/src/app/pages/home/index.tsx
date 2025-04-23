import { Button } from 'antd';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import Banner from '../../components/home/Banner';
import Customer from '../../components/home/Customer';
import Product from '../../components/home/Product';
import Recent from '../../components/home/Recent';
import Revenue from '../../components/home/Revenue';
import Stats from '../../components/home/Stats';
import { PlusOutlined } from '@ant-design/icons';
const DashboardHome = () => {
  return (
    <>
      <PageIntroBanner
        actionButton={
          <Button
            icon={<PlusOutlined />}
            className="px-4 py-2 transition-colors border border-gray-300 rounded h-fit hover:bg-gray-50"
          >
            Add Product
          </Button>
        }
      />
      <div className="container space-y-5 bg-gray-50">
        <Banner />
        <Stats />
        <Revenue />
        <Customer />
        <Product />
        <Recent />
      </div>
    </>
  );
};

export default DashboardHome;
