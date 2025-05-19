// components/SubscriptionPlanCard.tsx
import { Button, Card, Tag, Avatar, Divider } from 'antd';
import { UserOutlined, StarOutlined, CrownOutlined } from '@ant-design/icons';
import { SubscribCheckIcon } from '../../lib/CustomIcon';
import {
  SubscriptionPlan,
  BillingInterval,
} from '../../pages/onboarding/types';

const icons = {
  0: (
    <Avatar
      size={40}
      icon={<UserOutlined />}
      className="bg-gray-200 text-gray-400"
    />
  ),
  1: (
    <Avatar
      size={40}
      icon={<StarOutlined />}
      className="bg-blue-100 text-blue-600"
    />
  ),
  2: (
    <Avatar
      size={40}
      icon={<CrownOutlined />}
      className="bg-red-100 text-red-500"
    />
  ),
};

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  index?: number;
  billingInterval: BillingInterval;
  onSelect: (plan: SubscriptionPlan) => void;
}

export default function SubscriptionPlanCard({
  plan,
  billingInterval,
  index,
  onSelect,
}: SubscriptionPlanCardProps) {
  const selectedPrice = plan.price_items.find(
    (item) => item.interval === billingInterval
  );
  const hasFreeTrial = Number(selectedPrice?.free_days) > 0;

  return (
    <div className="relative w-full max-w-xs min-h-[420px]">
      {plan?.popular && (
        <Tag
          color="blue"
          className="absolute -top-4 left-1/2 -translate-x-1/2 rounded px-4 py-1 font-semibold"
        >
          Most Popular
        </Tag>
      )}
      <div className="bg-white rounded-xl border border-[#E6F7FF] shadow min-h-[420px] space-y-5">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E6F7FF]">
          <div className="">{icons[index ?? 0]}</div>
          <div className="font-semibold text-lg">{plan.name}</div>
        </div>
        <div className="text-2xl font-bold p-3">
          ₦ {Number(selectedPrice?.amount).toLocaleString()}
          <span className="text-base font-normal text-gray-500">
            {' '}
            / per {billingInterval === 'monthly' ? 'month' : 'year'}
          </span>
          <div className="text-gray-500 font-normal text-sm">
            {plan.description}
          </div>
        </div>

        <div className="px-4 py-2">
          {/* Free Trial Button */}
          {hasFreeTrial && (
            <Button
              type="default"
              className="mb-2 font-semibold w-full"
              onClick={() => onSelect(plan)}
            >
              Start {selectedPrice?.free_days} Days Trial
            </Button>
          )}

          {/* Main Subscribe Button */}
          <Button
            type="primary"
            className="mb-4 font-semibold w-full"
            onClick={() => onSelect(plan)}
          >
            Get Started
          </Button>
        </div>
        <div className="px-4">
          <ul className="w-full pl-0 list-none m-0 grid grid-cols-2 gap-2">
            {plan.features.map((feature) => (
              <li key={feature.id} className="flex items-center text-base">
                <SubscribCheckIcon className="text-[#003399] mr-2" />{' '}
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
