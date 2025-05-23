import type { TimeRangePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

const { RangePicker } = DatePicker;
export type DateRange = null | (Dayjs | null)[];
const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  // { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];
interface DatePickerCompProps {
  onRangeChange: (dates: DateRange, dateStrings: string[]) => void;
  value?: string | null;
}
const DatePickerComp = ({ onRangeChange, value }: DatePickerCompProps) => {
  const parsedValue = useMemo(() => {
    if (!value) return null;

    try {
      const [startDate, endDate] = value.split('|');
      return [dayjs(startDate), dayjs(endDate)];
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  }, [value]);

  const handleChange = React.useCallback(
    (dates: DateRange, dateStrings: string[]) => {
      if (dates) {
        onRangeChange(dates, dateStrings);
      }
    },
    [onRangeChange]
  );

  return (
    <RangePicker
      size="large"
      presets={rangePresets}
      onChange={handleChange}
      placeholder={['From', 'To']}
      value={parsedValue as any}
    />
  );
};

export default React.memo(DatePickerComp);
