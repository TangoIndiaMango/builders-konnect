interface PaymentOptionCardProps {
  method: {
    id: string;
    label: string;
    icon: string;
  };
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

const PaymentOptionCard = ({
  method,
  selectedMethod,
  setSelectedMethod,
}: PaymentOptionCardProps) => {
  return (
    <div
      key={method.id}
      onClick={() => setSelectedMethod(method.id)}
      className={`flex items-center justify-between border rounded-md p-4 cursor-pointer ${
        selectedMethod === method.id ? 'border-black' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={method.icon} alt="images" className="w-[20px]" />
        <span className="font-medium text-black">{method.label}</span>
      </div>
      <div
        className={`w-5 h-5 border-2 rounded-full ${
          selectedMethod === method.id ? 'border-black' : 'border-gray-400'
        } flex items-center justify-center`}
      >
        {selectedMethod === method.id && (
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
        )}
      </div>
    </div>
  );
};

export default PaymentOptionCard;
