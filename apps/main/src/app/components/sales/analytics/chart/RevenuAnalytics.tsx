import React from 'react';
import { Column as RawColumn, ColumnConfig } from '@ant-design/plots';
import { Divider, Typography } from 'antd';
import useResizeContainer from '../../../../../hooks/useResizeContainer';

const Column = RawColumn as unknown as React.FC<ColumnConfig>;
const { Text } = Typography;

interface SalesData {
  date: string;
  value: number;
  type: 'Online Sales' | 'Offline Sales';
}

const RevenueAnalyticsChart = () => {
  const { containerRef, containerWidth } = useResizeContainer();

  const data: SalesData[] = [
    // April
    { date: 'Apr 4', type: 'Online Sales', value: 800 },
    { date: 'Apr 4', type: 'Offline Sales', value: 1200 },
    { date: 'Apr 9', type: 'Online Sales', value: 1000 },
    { date: 'Apr 9', type: 'Offline Sales', value: 1500 },
    { date: 'Apr 15', type: 'Online Sales', value: 600 },
    { date: 'Apr 15', type: 'Offline Sales', value: 900 },
    { date: 'Apr 21', type: 'Online Sales', value: 1200 },
    { date: 'Apr 21', type: 'Offline Sales', value: 800 },
    { date: 'Apr 27', type: 'Online Sales', value: 900 },
    { date: 'Apr 27', type: 'Offline Sales', value: 1100 },
    // May
    { date: 'May 3', type: 'Online Sales', value: 1400 },
    { date: 'May 3', type: 'Offline Sales', value: 1600 },
    { date: 'May 9', type: 'Online Sales', value: 1300 },
    { date: 'May 9', type: 'Offline Sales', value: 1500 },
    { date: 'May 15', type: 'Online Sales', value: 1200 },
    { date: 'May 15', type: 'Offline Sales', value: 900 },
    { date: 'May 21', type: 'Online Sales', value: 800 },
    { date: 'May 21', type: 'Offline Sales', value: 1000 },
    { date: 'May 27', type: 'Online Sales', value: 1000 },
    { date: 'May 27', type: 'Offline Sales', value: 1200 },
    // June
    { date: 'Jun 2', type: 'Online Sales', value: 1100 },
    { date: 'Jun 2', type: 'Offline Sales', value: 900 },
    { date: 'Jun 7', type: 'Online Sales', value: 1300 },
    { date: 'Jun 7', type: 'Offline Sales', value: 1100 },
    { date: 'Jun 12', type: 'Online Sales', value: 1200 },
    { date: 'Jun 12', type: 'Offline Sales', value: 1400 },
    { date: 'Jun 18', type: 'Online Sales', value: 1100 },
    { date: 'Jun 18', type: 'Offline Sales', value: 1300 },
    { date: 'Jun 24', type: 'Online Sales', value: 1200 },
    { date: 'Jun 24', type: 'Offline Sales', value: 1000 },
    { date: 'Jun 30', type: 'Online Sales', value: 1100 },
    { date: 'Jun 30', type: 'Offline Sales', value: 1200 },
    //July
    { date: 'Jul 6', type: 'Online Sales', value: 1100 },
    { date: 'Jul 6', type: 'Offline Sales', value: 900 },
    { date: 'Jul 12', type: 'Online Sales', value: 1300 },
    { date: 'Jul 12', type: 'Offline Sales', value: 1100 },
    { date: 'Jul 18', type: 'Online Sales', value: 1200 },
    { date: 'Jul 18', type: 'Offline Sales', value: 1400 },
    { date: 'Jul 24', type: 'Online Sales', value: 1100 },
    { date: 'Jul 24', type: 'Offline Sales', value: 1300 },
    { date: 'Jul 30', type: 'Online Sales', value: 1200 },
    { date: 'Jul 30', type: 'Offline Sales', value: 1000 },
    { date: 'Aug 5', type: 'Online Sales', value: 1100 },
    { date: 'Aug 5', type: 'Offline Sales', value: 1200 },
  ];

  const config: ColumnConfig = {
    data,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    stack: true,
    height: 400,
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: ['#1D4ED8', '#93C5FD'],
    xAxis: {
      label: {
        style: {
          fontSize: 12,
          fill: '#6B7280',
        },
      },
    },
    yAxis: {
      max: 3000,
      label: {
        style: {
          fontSize: 12,
          fill: '#6B7280',
        },
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => {
        return (
          <div className="p-2">
            <h4 className="mb-2 text-sm font-medium">{title}</h4>
            {items?.map((item, index) => {
              const { name, value, color } = item;
              return (
                <div key={index} className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm">{name}</span>
                  </div>
                  <span className="font-medium">{value}</span>
                </div>
              );
            })}
          </div>
        );
      }
    },
    interactions: [
      {
        type: 'active-region',
        enable: true,
      },
    ],
    legend: {
      position: 'top',
      marker: {
        symbol: 'circle',
      },
      itemName: {
        style: {
          fill: '#6B7280',
        },
      },
    },
    padding: [30, 20, 30, 40],
    maxColumnWidth: 35,
    columnWidthRatio: 0.7,
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
        <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-blue-800 rounded-full"></div>
                <Text type="secondary" className="text-sm">
                  Online Sales
                </Text>
              </div>
              <div className="text-2xl font-semibold">24,828</div>
            </div>
            <Divider type="vertical" className="h-20" />
            <div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-blue-200 rounded-full"></div>
                <Text type="secondary" className="text-sm">
                  Offline Sales
                </Text>
              </div>
              <div className="text-2xl font-semibold">25,010</div>
            </div>
          </div>
        </div>
      </div>
      <div ref={containerRef} className="w-full h-[400px]">
        {containerWidth > 0 && <Column {...config} />}
      </div>
    </div>
  );
};

export default RevenueAnalyticsChart;