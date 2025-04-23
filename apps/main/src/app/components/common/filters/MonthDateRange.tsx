import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const MonthDateRange = () => {
  const handleChange = (dates: any) => {
    console.log(dates);
  };
  return (
    <div>
      <RangePicker
        picker="month"
        placement="bottomLeft"
        format="MMM YYYY"
        onChange={handleChange}
      />
    </div>
  );
};

export default MonthDateRange;
