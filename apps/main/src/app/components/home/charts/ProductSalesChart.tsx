import { Pie as PieChart, PieConfig } from '@ant-design/plots';
import React from 'react';
import useResizeContainer from '../../../../hooks/useResizeContainer';
import { formatBalance } from '../../../../utils/helper';
import { TopCategories } from '../Product';

const Pie = PieChart as unknown as React.FC<PieConfig>;

// Define an expanded color palette
const COLORS = [
  '#4318FF', // Purple
  '#6AD2FF', // Light Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#FF6384', // Pink
  '#36A2EB', // Blue
  '#FFCE56', // Gold
  '#4BC0C0', // Aqua
  '#9966FF', // Lavender
  '#FF9F40', // Dark Orange
  '#C9CBCF'  // Grey for fallback
];

const ProductSalesChart = ({ data }: { data: TopCategories[] }) => {
  const { containerRef, containerWidth } = useResizeContainer();

  // Calculate total revenue for the statistic
  const totalRevenueSum = data?.reduce(
    (sum, item) => sum + parseFloat(item.total_revenue),
    0
  );

  const numericData = data?.map(item => ({
    ...item,
    total_orders: Number(item.total_orders),
  }));
  // console.log(numericData, 'numericData');
  const config: PieConfig = {
    data: numericData,
    angleField: 'total_orders',
    colorField: 'category_name',

    radius: 1,
    innerRadius: 0.6,


    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="grid grid-cols-1 2xl:grid-cols-2 overflow-auto">
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
              <div>Category</div> {/* Changed from Product to Category for consistency */}
              <div>Orders</div>   {/* Changed from Sales to Orders */}
              <div>Revenue</div>  {/* Changed from Amount to Revenue */}
            </div>

            {data?.map((item: TopCategories, index: number) => (
              <div
                key={item.id} // Use stable item.id as key
                className="grid grid-cols-[24px_1fr_100px_100px] gap-4 items-center"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <p className="text-sm font-medium text-gray-700 truncate" title={item?.category_name}>
                  {item?.category_name}
                </p>
                <p className="text-xs text-gray-500">
                  {item?.total_orders} sold
                </p>
                <p className="text-sm font-semibold">
                  {formatBalance(item.total_revenue)}
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
