import useResizeContainer from '../../../../hooks/useResizeContainer';
import { ColumnConfig, Column as RawColumn } from '@ant-design/plots';
import React from 'react';

const Column = RawColumn as unknown as React.FC<ColumnConfig>;

const CustomerTrafficChart = ({ data }: { data: any }) => {
  const { containerRef, containerWidth } = useResizeContainer();
  const cleanedData = data.map(item => ({
    ...item,
    value: item.value == null ? 0 : Number(item.value),
  }));
  const config: ColumnConfig = {
    data: cleanedData,
    xField: 'month',
    yField: 'value',
    colorField: 'month',

  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {containerWidth > 0 && <Column {...config} />}
    </div>
  );
};

export default CustomerTrafficChart;
