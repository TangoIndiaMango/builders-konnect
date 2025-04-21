import type { LineConfig } from '@ant-design/charts';
import { Line as RawLine } from '@ant-design/charts';
import useResizeContainer from '../../../../hooks/useResizeContainer';

const Line = RawLine as unknown as React.FC<LineConfig>;

const RevenueChart = ({ data }: { data: any }) => {
  const { containerRef, containerWidth } = useResizeContainer();

  const config: LineConfig = {
    data,
    autoFit: true,
    height: 400,

    width: containerWidth || undefined, // Use container width
    padding: [40, 20, 40, 40], // [top, right, bottom, left]
    xField: 'year',
    yField: 'value',
    smooth: true,
    xAxis: {
      tickCount: 10,
      type: 'linear',
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
