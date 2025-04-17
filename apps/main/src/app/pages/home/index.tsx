import Banner from '../../components/home/Banner';
import FilterGroup from '../../components/common/filters/FilterGroup';
import Stats from '../../components/home/Stats';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import Revenue from '../../components/home/Revenue';
import Customer from '../../components/home/Customer';
import Product from '../../components/home/Product';
import Recent from '../../components/home/Recent';
const DashboardHome = () => {
  return (
    <>
      <PageIntroBanner />
      <div className=" space-y-5 bg-gray-50">
        <Banner />
        <div className="flex items-center justify-end">
          <FilterGroup />
        </div>
        <Stats />
        <Revenue/>
        <Customer/>
        <Product/>
        <Recent/>
      </div>
    </>
  );
};

export default DashboardHome;
