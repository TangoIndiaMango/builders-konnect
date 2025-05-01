import { Upload, Button, message, Table } from 'antd';
import { InboxOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { useState } from 'react';
import { Typography } from 'antd';

const { Dragger } = Upload;
const { Title, Text } = Typography;

export default function AddBulkProductPage() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const handleCSVUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];

        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key,
          }));
          setColumns(cols);
        }

        setParsedData(data);
        message.success('File parsed successfully!');
      },
      error: () => message.error('Failed to parse CSV'),
    });

    return false;
  };
   const handleCancel = () => {
     window.history.back();
   };

  const handleFinish = () => {
    console.log('Submitting data:', parsedData);
    message.success('Products added successfully!');
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
          />
          <Title level={4} className="!m-0">
            Add Bulk Product
          </Title>
        </div>
        <div className="space-x-2">
          <Button onClick={() => message.info('Cancelled')}>Cancel</Button>
          <Button type="primary" onClick={handleFinish}>
            Finish
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Form pages are used to collect or verify information to users, and basic
        forms are common in scenarios where there are fewer data items.
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-700">
            Instructions For Adding Bulk Products
          </h3>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1 text-gray-700">
            <li>Download the product template CSV file</li>
            <li>Modify your CSV’s content to your needs</li>
            <li>Upload the CSV file here</li>
          </ol>
          <Button
            icon={<DownloadOutlined />}
            className="mt-4"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/templates/product-template.csv';
              link.download = 'product-template.csv';
              link.click();
            }}
          >
            Download Template
          </Button>
        </div>

        <Dragger
          name="file"
          multiple={false}
          beforeUpload={handleCSVUpload}
          showUploadList={false}
          accept=".csv"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="text-lg">Click or drag file to this area to upload</p>
          <p className="text-sm text-gray-500">
            Support for a single .csv upload. Strictly products from a matching
            template.
          </p>
        </Dragger>
      </div>

      {parsedData.length > 0 && (
        <Table
          dataSource={parsedData}
          columns={columns}
          rowKey={(_, idx) =>
            idx !== undefined ? idx.toString() : Math.random().toString()
          }
          scroll={{ x: true }}
        />
      )}
    </div>
  );
}
