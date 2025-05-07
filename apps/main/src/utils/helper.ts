import { message, Upload } from 'antd';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';

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


export const exportCsvFromString = (csvData: string, fileName: string) => {
  console.log(csvData, "CSV Data looks like this");

  try {
    // Check if the CSV data is valid (not empty or null)
    if (!csvData || typeof csvData !== "string") {
      console.error("Invalid CSV content.");
      return;
    }

    // Create a Blob object from the CSV string
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger a click to download the file
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting CSV from string:", error);
  }
};

export const downloadAsPdf = (data: any[], fileName: string) => {
  console.log(data, "PDF DATA LOOKS LIKE THIS");

  if (!Array.isArray(data) || !data.length || typeof data[0] !== "object") {
    console.error("Data should be an array of objects.");
    return;
  }

  const headers = Object.keys(data[0]).join(", ");
  const rows = data.map(item =>
    Object.values(item)
      .map(value => (value !== null ? value : ""))
      .join(", ")
  );

  const pdfContent = `${headers}\n${rows.join("\n")}`;

  console.log({ pdfContent });

  const blob = new Blob([pdfContent], { type: "application/pdf" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `${fileName}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};


export const exportToExcel = (data: BlobPart, prefix: string) => {
  const filename = `${prefix}_${new Date().toISOString()}.xlsx`;
  const mimeType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  const blob = new Blob([data], { type: mimeType });
  saveAs(blob, filename);
};

export const handleCopy = (val: string, successTitle: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(val)
      .then(() =>
        message.success(successTitle)
      )
      .catch((err) =>
        message.error('Failed to copy')
      );
  }
};