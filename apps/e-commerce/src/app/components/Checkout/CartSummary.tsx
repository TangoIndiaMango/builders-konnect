import React from 'react';
import CartitemCard from './CartitemCard';
import { CartItem } from '../../../store/cartStore';
import { Button, Divider, Input } from 'antd';
import { useAtomValue } from 'jotai';
import { purchaseBreakdownAtom } from '../../../store/purchaseBreakdown';

interface CartSummaryProps {
  cartItemsStore: CartItem[];
  discountCode: string;
  setDiscountCode: (code: string) => void;
  handlePurchaseAmountBreakdown?: (code: string) => void;
  subtotal?: number;
}

const CartSummary = ({
  cartItemsStore,
  discountCode,
  setDiscountCode,
  handlePurchaseAmountBreakdown,
}: CartSummaryProps) => {
  const breakdown = useAtomValue(purchaseBreakdownAtom);
  return (
    <div className="w-full xl:w-1/3 bg-[#F9F9F9] px-6 xl:px-8 py-24">
      <div className="space-y-4">
        {cartItemsStore.map((item) => (
          <CartitemCard key={item.id} product={item} />
        ))}

        <div className="flex gap-6">
          <Input
            placeholder="Gift Card or Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          {handlePurchaseAmountBreakdown && (
            <Button
              className="bg-[#A4A4A4] text-white font-bold py-5 rounded-md px-6"
              onClick={() => handlePurchaseAmountBreakdown(discountCode)}
            >
              APPLY
            </Button>
          )}
        </div>

        <Divider className="my-4" />

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#4E4E4E]">Subtotal</span>
            <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
              ₦ {breakdown?.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span className="text-sm text-[#4E4E4E]">Shipping</span>
            <span className=" text-base  text-[#4E4E4E] ">
              Calculated at the next step
            </span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2">
            <span className="text-sm text-[#1E1E1E]">Total</span>
            <span className=" text-base font-medium md:text-lg text-[#4E4E4E] ">
              ₦ {breakdown?.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
