import { Pie as PieChart } from '@ant-design/plots';
import React from 'react';
import { PieConfig } from '@ant-design/plots';
import useResizeContainer from '../../../../hooks/useResizeContainer';
import { Divider } from 'antd';

const Pie = PieChart as unknown as React.FC<PieConfig>;

const ProductSalesChart = ({ data }: { data: any }) => {
  const { containerRef, containerWidth } = useResizeContainer();

  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.7,
    label: false,
    legend: false,
    color: ['#4318FF', '#6AD2FF', '#EFF4FB', '#FFB547', '#FF5252', '#8E96A6'],
    statistic: {
      title: {
        style: {
          color: '#4A5568',
          fontSize: '14px',
          lineHeight: '1',
        },
        content: 'Sales',
      },
      content: {
        style: {
          color: '#1A202C',
          fontSize: '24px',
          lineHeight: '1',
          fontWeight: '600',
        },
        content: '1,125',
      },
    },
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="" ref={containerRef}>
          {containerWidth > 0 && (
            <div className="h-[300px]">
              <Pie {...config} />
            </div>
          )}
        </div>
        {/* <Divider type="vertical" className="h-80 text-[#D9D9D9] bg-[#D9D9D9]" /> */}
        <div className="">
          <div className="space-y-4 ">
            {/* Header row for alignment reference */}
            <div className="grid grid-cols-[24px_1fr_100px_100px] gap-4 text-sm text-gray-500">
              <div></div> {/* Space for color dot */}
              <div>Product</div>
              <div>Sales</div>
              <div>Amount</div>
            </div>

            {data.map((item: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-[24px_1fr_100px_100px] gap-4 items-center"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: config.color?.[index],
                  }}
                />
                <p className="text-sm font-medium text-gray-700">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.sales} sold
                </p>
                <p className="text-sm font-semibold">
                  $ {item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSalesChart;
