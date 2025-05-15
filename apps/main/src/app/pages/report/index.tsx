import React, { useState } from 'react';
import { Select, DatePicker, Button, Form } from 'antd';
import dayjs from 'dayjs';
import PageIntroBanner from '../../components/common/PageIntroBanner';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleReportTypeChange = (value: string) => {
    setReportType(value);
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setEndDate(date);
  };

  const handleGenerate = () => {
    // Add generate logic here
    console.log('Generating report:', { reportType, startDate, endDate });
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
          >
            <Select
              placeholder="Select Report Type"
              onChange={handleReportTypeChange}
              options={[
                { value: 'product', label: 'Products' },
                { value: 'orders', label: 'Orders' },
                { value: 'inventory', label: 'Inventory' },
                { value: 'customers', label: 'Customers' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select a start date!' }]}
          >
            <DatePicker
              onChange={handleStartDateChange}
              style={{ width: '100%' }}
              placeholder="Start Date"
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select an end date!' }]}
          >
            <DatePicker
              onChange={handleEndDateChange}
              style={{ width: '100%' }}
              placeholder="End Date"
            />
          </Form.Item>
          <div className="ml-[120px] w-full">
            <Button type="primary" onClick={handleGenerate} style={{ width: 200 }}>
              Generate
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
