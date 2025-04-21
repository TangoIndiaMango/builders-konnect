import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import FilterGroup from '../common/filters/FilterGroup';
import RevenueChart from './charts/RevenueChart';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1992 Q2', value: 4.3 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const Revenue = () => {
  return (
    <CardWithFilter
      title="Revenue Analytics"
      description="Create sales orders and track order sales and performance here"
      rightSection={<FilterGroup />}
    >
      {data?.length > 0 ? (
        <div className="w-full h-full min-h-[400px] max-w-[1200px] mx-auto">
          <RevenueChart data={data} />
        </div>
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default Revenue;
