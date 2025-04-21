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
        <span>₦ {subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Discount</span>
        <span>{discount ? `₦ ${discount.toLocaleString()}` : '-'}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Tax (7.5%VAT)</span>
        <span>₦ {tax.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span className="flex items-center gap-1">
          Service fee
          <span className="text-blue-500 cursor-help" title="Additional service charge">
            ⓘ
          </span>
        </span>
        <span>₦ {serviceFee.toLocaleString()}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg pt-3 border-t">
        <span>TOTAL</span>
        <span>₦{total.toLocaleString()}</span>
      </div>
    </div>
  );
};
