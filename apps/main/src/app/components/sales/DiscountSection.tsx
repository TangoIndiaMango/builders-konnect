import { Select } from 'antd';
import { discountsList, Discount } from './mockData';

interface DiscountSectionProps {
  onDiscountSelect: (discount: string, option: any) => void;
  selectedDiscount: string | null;
}

export const DiscountSection = ({
  onDiscountSelect,
  selectedDiscount,
}: DiscountSectionProps) => {
  // Find the selected discount object
  const selectedDiscountObj = discountsList.find(
    (d) => d.value === selectedDiscount
  );

  const discountOptions = discountsList.map((discount) => ({
    label: (
      <div className="flex flex-col py-1">
        <p className="font-medium">{discount.label}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Code:</span>
          <span className="text-sm text-[#003399]">{discount.value}</span>
        </div>
      </div>
    ),
    value: discount.value,
    discount: discount,
  }));

  return (
    <Select
      showSearch
      className="w-full md:w-[300px]"
      placeholder="Select or search discount"
      optionFilterProp="children"
      filterSort={(optionA, optionB) =>
        (optionA?.discount?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.discount?.label ?? '').toLowerCase())
      }
      options={discountOptions}
      optionLabelProp='value'
      value={selectedDiscount}
      onChange={onDiscountSelect}
      popupMatchSelectWidth={false}
      listHeight={250}
      dropdownStyle={{
        minWidth: '200px',
        width: 'auto',
        maxWidth: '300px'
      }}
    />
  );
};
