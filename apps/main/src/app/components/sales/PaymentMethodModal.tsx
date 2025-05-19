import { Modal, Button } from 'antd';
import { paymentMethodInterface } from '../../pages/sales/create';
import { formatBalance } from '../../../utils/helper';

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  paymentMethods: paymentMethodInterface[];
  onSelectPaymentMethod: (method: paymentMethodInterface[]) => void;
  totalAmount: number;
  customerBalance?: number;
  selectedMethods: paymentMethodInterface[]; // Add this to track selected methods
  onContinue: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  open,
  onClose,
  paymentMethods,
  onSelectPaymentMethod,
  totalAmount,
  customerBalance = 0,
  selectedMethods,
  onContinue,
}) => {
  const isMethodSelected = (method: paymentMethodInterface) => {
    return selectedMethods.some((selected) => selected.id === method.id);
  };

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
            onClick={() => onSelectPaymentMethod([method])}
            className={`flex items-center justify-between p-4 border border-gray-200 rounded-sm cursor-pointer hover:border-blue-600 ${
              isMethodSelected(method) ? 'border-blue-600 bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
                isMethodSelected(method) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {isMethodSelected(method) && (
                  <span className="text-sm text-white">✓</span>
                )}
              </div>
              <span>{method?.name}</span>
            </div>
            {method?.is_balance === '1' && (
              <span className="text-gray-500">
                Balance: {formatBalance(customerBalance)}
              </span>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={onContinue}
            disabled={selectedMethods.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;