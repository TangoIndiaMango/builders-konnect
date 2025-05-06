import React from 'react';
import { BarConfig, Bar as BarChart } from '@ant-design/plots';
import useResizeContainer from '../../../../../hooks/useResizeContainer';

interface ReturnRateProps {
  [key: string]: number;
}

const Bar = BarChart as unknown as React.FC<BarConfig>;

const ReturnRateChart = ({ returnRateStats }: { returnRateStats: ReturnRateProps }) => {

  const data = Object?.entries(returnRateStats)?.map(([month, returns]) => ({
    month,
    returns,
  }));
  const { containerRef, containerWidth } = useResizeContainer();

  const config = {
    data,
    xField: 'month',
    yField: 'returns',
    color: '#2A9D90',
    label: {
      position: 'right',
      style: {
        fill: '#ffffff',
      },
    },
    title: {
      text: 'Showing total return request for the last 6 months',
      style: {
        fontSize: 16,
        color: '#2A9D90',
      },
    },
    xAxis: {
      label: {
        style: {
          fill: '#595959',
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#595959',
        },
      },
    },
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {containerWidth > 0 && <Bar {...config} />}
    </div>
  );
};

export default ReturnRateChart;
