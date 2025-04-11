import Banner from '../../components/home/Banner';
import FilterGroup from '../../components/common/filters/FilterGroup';
import Stats from '../../components/home/Stats';
import PageIntroBanner from '../../components/common/PageIntroBanner';
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
      </div>
    </>
  );
};

export default DashboardHome;
