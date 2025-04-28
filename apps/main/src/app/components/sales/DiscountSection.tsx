import { Select } from 'antd';
import { discountsList, Discount } from '../../lib/mockData';
import { DiscountType } from '../../pages/sales/types';

interface DiscountSectionProps {
  onDiscountSelect: (discount: string, option: any) => void;
  selectedDiscount: string | null;
  discountData: DiscountType[];
}

export const DiscountSection = ({
  onDiscountSelect,
  selectedDiscount,
  discountData,
}: DiscountSectionProps) => {
  // Find the selected discount object
  // const selectedDiscountObj = discountsList.find(
  //   (d) => d.value === selectedDiscount
  // );

  const discountOptions = discountData?.map((discount) => ({
    label: (
      <div className="flex flex-col py-1">
        <p className="font-medium">{discount?.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Code:</span>
          <span className="text-sm text-[#003399]">{discount?.code}</span>
        </div>
      </div>
    ),
    value: discount?.id,
    discount: discount,
    name: discount?.name,
  }));

  return (
    <Select
      showSearch
      className="w-full md:w-[300px]"
      placeholder="Select or search discount"
      optionFilterProp="children"
      filterSort={(optionA, optionB) =>
        (optionA?.discount?.name ?? '')
          .toLowerCase()
          .localeCompare((optionB?.discount?.name ?? '').toLowerCase())
      }
      options={discountOptions}
      optionLabelProp="name"
      value={selectedDiscount}
      onChange={onDiscountSelect}
      popupMatchSelectWidth={false}
      listHeight={250}
      dropdownStyle={{
        minWidth: '200px',
        width: 'auto',
        maxWidth: '300px',
      }}
    />
  );
};
