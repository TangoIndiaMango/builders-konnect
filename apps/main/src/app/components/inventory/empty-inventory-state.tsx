import { Button } from 'antd';
import { emptyStateIllustration } from '../../lib/assets/images';

interface EmptyInventoryStateProps {
  onAddProduct?: () => void;
}

export const EmptyInventoryState = ({ onAddProduct }: EmptyInventoryStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm">
      <div className="text-center max-w-md">
        <img
          src={emptyStateIllustration}
          alt="Empty inventory illustration"
          className="w-48 h-48 mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Nothing here yet</h2>
        <p className="text-gray-500 mb-6">To view products details and inventory levels, add products to your store.</p>
        <Button type="primary" size="large" onClick={onAddProduct}>
          Add Products
        </Button>
      </div>
    </div>
  );
};
