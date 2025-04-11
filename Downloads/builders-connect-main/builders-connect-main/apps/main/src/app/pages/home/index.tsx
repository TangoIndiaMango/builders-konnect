
import Banner from '../../components/home/Banner';
import FilterGroup from '../../components/common/filters/FilterGroup';
import Stats from '../../components/home/Stats';
const DashboardHome = () => {
  return (
    <div className='max-w-6xl p-5 mx-auto space-y-5'>
      <Banner />
      <div className="flex items-center justify-end">
        <FilterGroup />
      </div>
      <Stats />
    </div>
  );
};

export default DashboardHome;
