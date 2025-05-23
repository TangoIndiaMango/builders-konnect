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