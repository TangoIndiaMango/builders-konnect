import { message, Upload } from 'antd';
import dayjs from 'dayjs';
export const acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.png,.jpeg';
export const maxFileSize = 10 * 1024 * 1024; // 10MB
export const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    paid: 'blue',
    failed: 'red',
    processing: 'gold',
    completed: 'green',
    cancelled: 'red',
    Unpublished: 'gray',
    pending: 'orange',
  };
  return colorMap[status] || 'default';
};

export const getStatus = (status: string) => {
  const colorMap: Record<string, string> = {
    active: 'green',
    inactive: 'red',
    expired: 'purple',
  };
  return colorMap[status] || 'default';
};

export const parseDate = (date: any) => {
  if (!date) return null;
  if (dayjs.isDayjs(date)) return date;
  return dayjs(date);
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


export const beforeUpload = (file: File) => {
  const isAccepted = acceptedFileTypes
    .split(',')
    .some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()));

  if (!isAccepted) {
    message.error(`You can only upload ${acceptedFileTypes} files!`);
  }

  const isLt10M = file.size < maxFileSize;
  if (!isLt10M) {
    message.error(`File must be smaller than ${maxFileSize}MB!`);
  }

  return isAccepted && isLt10M ? false : Upload.LIST_IGNORE;
};