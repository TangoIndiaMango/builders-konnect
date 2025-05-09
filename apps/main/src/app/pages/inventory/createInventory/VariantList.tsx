import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface VariantListProps {
  variants: Array<{
    values: Record<string, string>;
    labels: Record<string, string>;
  }>;
  handleEditVariant: (index: number) => void;
  handleDeleteVariant: (index: number) => void;
}

const VariantList = ({
  variants,
  handleEditVariant,
  handleDeleteVariant,
}: VariantListProps) => {
  console.log(variants)
  return (
    <div className="">
      {variants.map((variant, index) => (
        <React.Fragment key={index}>
          <div key={index} className="p-4 mb-4 border bg-[#FAFAFA]">
            <div className="grid grid-cols-2 gap-4">
              {variant.values &&
                Object.entries(variant.values).filter(([_, value]) => value !== undefined && value !== "").map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-2">
                    <span className="font-medium">
                      {variant?.labels?.[key] || key}:
                    </span>
                    <span className=" text-sm p-1 rounded border border-[#91D5FF] bg-[#E6F7FF] text-[#003399]">
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <Button
              type="link"
              className="flex items-center gap-1 text-blue-600"
              onClick={() => handleEditVariant(index)}
              icon={<EditOutlined />}
            >
              <span className="text-sm">Edit product variant</span>
            </Button>
            <Button
              type="link"
              danger
              className="flex items-center gap-1"
              onClick={() => handleDeleteVariant(index)}
              icon={<DeleteOutlined />}
            >
              <span className="text-sm">Delete product variant</span>
            </Button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default VariantList;
