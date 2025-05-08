import { Button, Modal, Select } from 'antd';
import { DiscountType } from '../../pages/sales/types';
import Title from 'antd/es/typography/Title';

interface DiscountModalAddProps {
  onDiscountSelect: (discount: string, option: any) => void;
  selectedDiscount: string | null;
  discountData: DiscountType[];
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleApplyDiscount: () => void;
}

const DiscountModalAdd = ({
  open,
  onClose,
  onDiscountSelect,
  selectedDiscount,
  discountData,
  isLoading,
  handleApplyDiscount,
}: DiscountModalAddProps) => {
  // Find the selected discount object
  // const selectedDiscountObj = discountsList.find(
  //   (d) => d.value === selectedDiscount
  // );

  const discountOptions = discountData?.length > 0 ? discountData?.map((discount) => ({
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
  })) : [];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={
        <div className="flex items-center gap-2">
          <span>Discount Per Product</span>
        </div>
      }
      width={500}
    >
      <Title level={5} className="mb-2 !font-normal text-gray-500">
        Discount
      </Title>
      <Select
        showSearch
        className="w-full"
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

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          loading={isLoading}
          onClick={handleApplyDiscount}
          disabled={!selectedDiscount || isLoading}
        >
          Apply Discount
        </Button>
      </div>
    </Modal>
  );
};

export default DiscountModalAdd;
