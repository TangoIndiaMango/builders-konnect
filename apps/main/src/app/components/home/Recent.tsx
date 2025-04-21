import CardWithFilter from '../common/CardWithFilter';
import EmptyState from '../common/EmptyState';
import MonthDateRange from '../common/filters/MonthDateRange';
const data = [];
const Recent = () => {
  return (
    <CardWithFilter
      title="Recent Sales"
      rightSection={<MonthDateRange />}
      description="Create sales order and track order sales and performance here"
    >
      {data?.length > 0 ? (
        <div>Hello World</div>
      ) : (
        <EmptyState description="You have no data here yet." />
      )}
    </CardWithFilter>
  );
};

export default Recent;
