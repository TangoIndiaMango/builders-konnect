import { atom, useAtom } from 'jotai';
import { BillingInterval, SubscriptionPlan } from '../app/types/subscription';


interface SubscriptionState {
  selectedPlan: SubscriptionPlan['price_items'][0] | null;
  planName: string;
  billingInterval: BillingInterval;
  isFreeTrial: boolean;
}

const initialState: SubscriptionState = {
  selectedPlan: null,
  planName: '',
  billingInterval: 'monthly',
  isFreeTrial: false,
};

export const subscriptionAtom = atom<SubscriptionState>(initialState);


export const useSubscription = () => {
  const [subscription, setSubscription] = useAtom(subscriptionAtom);

  const setPlanDetails = (
    plan: SubscriptionPlan['price_items'][0],
    name: string,
    interval: BillingInterval,
    freeTrial: boolean
  ) => {
    setSubscription({
      selectedPlan: plan,
      planName: name,
      billingInterval: interval,
      isFreeTrial: freeTrial,
    });
  };

  const resetSubscription = () => {
    setSubscription(initialState);
  };

  return {
    subscription,
    setPlanDetails,
    resetSubscription,
  };
};