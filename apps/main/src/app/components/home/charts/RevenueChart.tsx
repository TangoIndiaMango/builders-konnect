import type { LineConfig } from '@ant-design/charts';
import { Line as RawLine } from '@ant-design/charts';
import useResizeContainer from '../../../../hooks/useResizeContainer';

const Line = RawLine as unknown as React.FC<LineConfig>;

const RevenueChart = ({ data }: { data: any }) => {
  const { containerRef, containerWidth } = useResizeContainer();

  const newData = data?.map((item: any) => {
    return {
      ...item,
      value: Number(item?.value?.replace(/[^\d.]/g, '')) || 0,
    };
  });
  // console.log('newData', newData);
  const config: LineConfig = {
    data: newData,
    autoFit: true,
    height: 400,

    width: containerWidth,
    xField: 'month',
    yField: 'value',
    axis: {
      y: { labelFormatter: (v) => `₦${v.toLocaleString()}`, title: 'Revenue' },
      x: { title: 'Month' },
    },

    color: '#303F9E',
    style: {
      lineWidth: 2,
    },
    line: {
      style: {
        stroke: '#303F9E',
        strokeWidth: 12,
      },
    },
    area: {
      style: {
        fill: 'l(90) 0:#003399 1:#00339900',
      },
    },
    tooltip: { channel: 'y', valueFormatter: (v) => `₦${v.toLocaleString()}` },
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px]"
      style={{
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {containerWidth > 0 && <Line {...config} />}
    </div>
  );
};

export default RevenueChart;
