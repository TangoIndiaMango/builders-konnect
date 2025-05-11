import useResizeContainer from '../../../../hooks/useResizeContainer';
import { ColumnConfig, Column as RawColumn } from '@ant-design/plots';
import React from 'react';

const Column = RawColumn as unknown as React.FC<ColumnConfig>;

const CustomerTrafficChart = ({ data }: { data: any }) => {
  const { containerRef, containerWidth } = useResizeContainer();
  const config: ColumnConfig = {
    data,
    xField: 'month',
    yField: 'value',
    colorField: 'type',
    // color: ({ type }: { type: string }) => {
    //   const colorMap: Record<string, string> = {
    //     'Lon': '#003399',
    //     'Bor': '#2E8AFA',
    //     'Man': '#8ACCFF',
    //   };
    //   return colorMap[type] || '#003399'; // default color if type not found
    // },
    color: ['#8ACCFF'],
    stack: true,
    tooltip: {
      customContent: (title: any, items: any) => {
        return (
          <div className="p-2">
            <h4 className="mb-2 text-sm font-medium">{title}</h4>
            {items?.map((item: any, index: number) => {
              const { name, value, color } = item;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm">{name}</span>
                  </div>
                  <span className="font-medium">{value}</span>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };
  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {containerWidth > 0 && <Column {...config} />}
    </div>
  );
};

export default CustomerTrafficChart;
