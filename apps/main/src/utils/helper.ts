import { localeToCurrency } from "./data";

export const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    Paid: 'blue',
    Failed: 'red',
    Processing: 'gold',
    Completed: 'green',
    Cancelled: 'red',
    Unpublished: 'gray',
  };
  return colorMap[status] || 'default';
};

//To generate a currency format for a balance based on the user's locale
export function formatBalance(balance: number | string, decimals = 2, fallbackCurrency = 'NGN') {
  const balanceNumber = typeof balance === 'string' ? parseFloat(balance) : balance;

  // const userLocale = navigator.language || 'en-NG';
  const userLocale = 'en-NG';

  // const currency = localeToCurrency[userLocale] || fallbackCurrency;

  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency: fallbackCurrency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(balanceNumber);
}
