import type { TimeRangePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';

const { RangePicker } = DatePicker;
export type DateRange = null | (Dayjs | null)[]
const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  // { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];
interface DatePickerCompProps {
  onRangeChange: (
    dates: DateRange,
    dateStrings: string[]
  ) => void;
  value?: any;
}
const DatePickerComp = ({ onRangeChange, value }: DatePickerCompProps) => (
  <RangePicker presets={rangePresets} onChange={onRangeChange} placeholder={['From', 'To']} value={value}/>
);

export default DatePickerComp;
