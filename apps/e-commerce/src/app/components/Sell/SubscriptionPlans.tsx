import { useFetchData } from '../../../hooks/useApis';
import { useNavigate } from 'react-router-dom';
import { Radio, Segmented, Skeleton } from 'antd';
import { useState } from 'react';
import { useSubscription } from '../../../store/subscription';
import { SubscriptionPlan } from '../onboarding/types';
import { BillingInterval } from '../../types/subscription';
import SubscriptionPlanCard from '../onboarding/SubscriptionCard';

const plans = [
  {
    name: 'Free Trial',
    price: 30000,
    features: ['List up to 20 products', '1 User Seat', 'Standard Support'],
    id: 'free',
    buttonType: 'default',
    buttonText: 'Start Free Trial',
    buttonGhost: true,
  },
  {
    name: 'Basic Plan',
    price: 30000,
    features: ['List up to 20 products', '1 User Seat', 'Standard Support'],
    id: 'basic',
    popular: true,
    buttonType: 'primary',
    buttonText: 'Get Started',
    buttonGhost: false,
  },
  {
    name: 'Premium Plan',
    price: 30000,
    features: ['List up to 20 products', '1 User Seat', 'Standard Support'],
    id: 'premium',
    buttonType: 'default',
    buttonText: 'Get Started',
    buttonGhost: true,
  },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const plansApi = useFetchData('shared/subscription-plans');
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('monthly');
  const { setPlanDetails } = useSubscription();
  const plansData = plansApi?.data?.data as SubscriptionPlan[];
  console.log(billingInterval, 'billingInterval');

  const handleSelectPlan = (plan: SubscriptionPlan, isFreeTrial: boolean) => {
    const selectedPriceItem = plan?.price_items?.find(
      (item) => item.interval === billingInterval
    );
    console.log(selectedPriceItem, 'selectedPriceItem');
    setPlanDetails(
      selectedPriceItem as SubscriptionPlan['price_items'][0],
      plan.name,
      billingInterval,
      isFreeTrial
    );

    navigate('/subscribe/checkout');
  };

  return (
    <div className="min-h-screen bg-[#003399] py-10">
      <h2 className="text-white text-center mb-8 text-3xl font-bold">
        Pricing Plans
      </h2>

      {/* Billing Interval Toggle */}
      {/* <div className="flex justify-center mb-8">
        <Radio.Group
          value={billingInterval}
          onChange={(e) => setBillingInterval(e.target.value)}
          buttonStyle="solid"
          className="bg-white p-1 rounded-lg"
        >
          <Radio.Button value="monthly">Monthly</Radio.Button>
          <Radio.Button value="annually">Yearly</Radio.Button>
        </Radio.Group>
      </div> */}

      <div className="flex justify-center mb-8">
        <Segmented<string>
          options={[
            {
              label: 'Monthly',
              value: 'monthly',
            },
            {
              label: 'Yearly',
              value: 'annually',
            },
          ]}
          value={billingInterval}
          size="large"
          shape="round"
          onChange={(value) => setBillingInterval(value as BillingInterval)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {plansApi?.isFetching ? (
          [1, 2, 3].map((item) => (
            <div className="w-full px-5" key={item}>
              <div
                key={item}
                className="w-full h-[420px] bg-white rounded-lg px-5"
              >
                <Skeleton.Node active className="w-full h-full" />
              </div>
            </div>
          ))
        ) : (
          <>
            {plansData?.map((plan, index) => (
              <SubscriptionPlanCard
                key={plan.id}
                index={index}
                plan={plan}
                billingInterval={billingInterval}
                onSelect={(plan, isFreeTrial) =>
                  handleSelectPlan(plan, isFreeTrial)
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
