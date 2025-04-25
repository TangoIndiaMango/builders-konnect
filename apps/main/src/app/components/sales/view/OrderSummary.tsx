import { formatBalance } from '../../../../utils/helper';

interface OrderSummaryProps {
  subtotal: number;
  itemCount: number;
  discount?: number;
  tax: number;
  serviceFee: number;
  total: number;
}

export const OrderSummary = ({
  subtotal,
  itemCount,
  discount = 0,
  tax,
  serviceFee,
  total
}: OrderSummaryProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal ({itemCount} item)</span>
        <span>{formatBalance(subtotal)}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Discount</span>
        <span>{discount ? formatBalance(discount) : '-'}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Tax (7.5%VAT)</span>
        <span>{formatBalance(tax)}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span className="flex items-center gap-1">
          Service fee
          <span className="text-blue-500 cursor-help" title="Additional service charge">
            ⓘ
          </span>
        </span>
        <span>{formatBalance(serviceFee)}</span>
      </div>

      <div className="flex justify-between pt-3 text-lg font-semibold border-t">
        <span>TOTAL</span>
        <span>{formatBalance(total)}</span>
      </div>
    </div>
  );
};
