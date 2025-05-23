import  { useState } from 'react';
import { Select, Button, Form, message } from 'antd';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import { useGetExportData } from '../../../hooks/useApis';
import { exportCsvFromString } from '../../../utils/helper';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const handleReportTypeChange = (value: string) => {
    setReportType(value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const { isPending, mutate } = useGetExportData(
    `merchants/reporting?name=${reportType}&date_filter=${dateFilter}&export=csv`
  );

  const todayWithTime = new Date()?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleGenerate = () => {
    mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, `${reportType}-${todayWithTime}-Report`);
        message.success('Report generated successfully');
      },
      onError: (error) => {
        message.error(error?.message || 'Failed to generate report');
      },
      // onSettled: () => {
      //   setReportType('');
      //   setDateFilter('');
      // }
    });
  };



  return (
    <div className="w-full">
      <PageIntroBanner
        title="Reports"
        description="Generate reports for your business"
      />

      <div className="flex flex-col h-full items-center justify-center gap-4 p-24 bg-white mx-4 my-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Generate Report</h1>
          <p className="text-sm text-gray-500">Fill the information below to generate a report</p>
        </div>
        <Form
          layout="horizontal"
          style={{ width: 350 }}
        >
          <Form.Item
            label="Report Type"
            name="reportType"
            rules={[{ required: true, message: 'Please select a report type' }]}
          >
            <Select
              placeholder="Select Report Type"
              onChange={handleReportTypeChange}
              options={[
                { value: 'sales-orders', label: 'Sales Orders' },
                { value: 'products', label: 'Products' },
                // { value: 'orders', label: 'Orders' },
                // { value: 'inventory', label: 'Inventory' },
                { value: 'customers', label: 'Customers' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Date Filter"
            name="dateFilter"
            rules={[{ required: true, message: 'Please select a date filter' }]}
          >
            <Select
              placeholder="Select Date Filter"
              onChange={handleDateFilterChange}
              options={[
                { value: 'Today', label: 'Today' },
                { value: '3 days', label: '3 Days' },
                { value: '7 days', label: '7 Days' },
                { value: '14 days', label: '14 Days' },
                { value: 'this month', label: 'This Month' },
                { value: '3 months', label: '3 Months' },
                { value: 'this year', label: 'This Year' },
                { value: '2025', label: '2025' },
                { value: '2025-03-01|2025-03-31', label: 'March 2025' }
              ]}
            />
          </Form.Item>
          <div className="ml-[120px] w-full">
            <Button type="primary" onClick={handleGenerate} style={{ width: 200 }} loading={isPending}>
              Generate
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
