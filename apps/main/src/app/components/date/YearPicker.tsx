import { DatePicker, DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import React from 'react';

const YearPicker = ({
  onChange,
  value,
}: {
  onChange: DatePickerProps['onChange'];
  value: Dayjs | null;
}) => {
  return (
    <div>
      <DatePicker
        size="large"
        className="rounded w-[200px]"
        onChange={onChange}
        picker="year"
        value={value}
      />
    </div>
  );
};

export default YearPicker;
