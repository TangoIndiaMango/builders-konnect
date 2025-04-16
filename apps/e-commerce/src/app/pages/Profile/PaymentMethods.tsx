import React, { useState } from 'react';
import { Button } from 'antd';

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const [paymentMethods] = useState<PaymentMethod[]>([]);

  return (
    <div>
      {paymentMethods.length === 0 ? (
        <div>
          <p className="mb-4">You do not have any payment method yet</p>
          <Button type="primary" className="bg-[#003399]">
            Add Payment Method
          </Button>
        </div>
      ) : (
        <div>
          <Button type="primary" className="mb-4 bg-[#003399]">
            Add Payment Method
          </Button>
          <div className="space-y-4">
            {paymentMethods.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.type}</p>
                    <p>**** **** **** {item.last4}</p>
                    {item.isDefault && (
                      <span className="text-[#003399] text-sm">Default Payment Method</span>
                    )}
                  </div>
                  <div>
                    <Button type="link">Edit</Button>
                    <Button type="link" danger>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
