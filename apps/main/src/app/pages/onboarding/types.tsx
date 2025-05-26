export interface PlanFeature {
  id: string;
  name: string;
}

export type BillingInterval = 'monthly' | 'annually';

export interface PriceItem {
  id: string;
  amount: string;
  interval: BillingInterval;
  free_days: number;
  vat: string;
  discount: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  description: string;
  features: PlanFeature[];
  price_items: PriceItem[];
  popular?: boolean
}
