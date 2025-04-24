import { Modal, Button } from 'antd';
import { paymentMethodInterface } from '../../pages/sales/create';
import { formatBalance } from '../../../utils/helper';

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  paymentMethods: paymentMethodInterface[];
  onSelectPaymentMethod: (method: paymentMethodInterface) => void;
  totalAmount: number;
  customerBalance?: number;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  open,
  onClose,
  paymentMethods,
  onSelectPaymentMethod,
  totalAmount,
  customerBalance = 0,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title="Select Payment Method"
      width={500}
    >
      <div className="mt-4 space-y-4">
        {paymentMethods?.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelectPaymentMethod(method)}
            className="flex items-center justify-between p-4 border rounded-sm cursor-pointer hover:border-blue-600"
          >
            <span>{method?.name}</span>
            {method?.is_balance === '1' && (
              <span className="text-gray-500">
                Balance: {formatBalance(customerBalance)}
              </span>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;