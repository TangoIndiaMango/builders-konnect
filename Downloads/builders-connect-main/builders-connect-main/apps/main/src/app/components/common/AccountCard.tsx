import { businessLogo } from '../../lib/assets/icons';
import { Radio } from 'antd';

interface Store {
  id: number;
  name: string;
  email: string;
}

interface AccountCardProps {
  id: number;
  name: string;
  logo?: string;
  role: string;
  stores: number;
  selected?: boolean;
  onSelect: (id: number) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  name,
  logo = businessLogo,
  role,
  stores,
  selected = false,
  onSelect,
}) => {
  return (
    <button
      className={`p-5 rounded-md border w-full ${
        selected
          ? 'border-[#003399] bg-[#E6F7FF] shadow-lg shadow-[#38476824]'
          : 'border-gray-200 shadow-sm'
      } cursor-pointer hover:border-[#003399] transition-colors`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-start gap-4">
        <Radio checked={selected} />

        <div className="flex items-center flex-1 gap-4">
          <img
            src={logo}
            alt={name}
            className="object-contain w-10 h-10 rounded-md"
          />

          <div className="flex-1">
            <div className="">
              <h3
                className={`${
                  selected ? 'text-[#003399]' : 'text-gray-500'
                } text-lg font-bold`}
              >
                {name}
              </h3>
              <p className="text-sm">
                {stores} {stores === 1 ? 'store' : 'stores'}
              </p>
            </div>
          </div>
          <div className="text-sm text-right text-gray-500">
            Role
            <p className=" text-[#1A2564] font-semibold text-md">{role}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AccountCard;
