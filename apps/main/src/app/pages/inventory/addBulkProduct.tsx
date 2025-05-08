import { Upload, Button, message, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { useState } from 'react';
import { useGetExportData, useUploadData } from '../../../hooks/useApis';
import type { UploadFile } from 'antd/es/upload/interface';

interface ProductData {
  [key: string]: string | number;
}

interface Column {
  title: string;
  dataIndex: string;
  key: string;
}

const { Dragger } = Upload;
const { Title, Text } = Typography;

export default function AddBulkProductPage() {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = useState<ProductData[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [uploading, setUploading] = useState(false);

  // Download template mutation
  const downloadTemplate = useGetExportData('merchants/inventory-products/download/template');

  // Upload mutation
  const uploadMutation = useUploadData('merchants/inventory-products/upload/bulk');

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadTemplate.mutateAsync();
      if (!response) {
        throw new Error('No response received');
      }
      
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      message.success('Template downloaded successfully!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to download template';
      message.error(errorMessage);
    }
  };

  // Handle CSV upload and parsing
  const handleCSVUpload = (file: UploadFile) => {
    if (!file) return false;
    Papa.parse(file.originFileObj as File, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data as ProductData[];

        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key,
          }));
          setColumns(cols);
          setParsedData(data);
          message.success('File parsed successfully!');
        } else {
          message.warning('CSV file is empty.');
        }
      },
      error: () => message.error('Failed to parse CSV'),
    });

    return false; // prevent default upload behavior
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleFinish = async () => {
    if (parsedData.length === 0) {
      message.error('Please upload a CSV file first');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', new Blob([Papa.unparse(parsedData)], { type: 'text/csv' }));
      
      await uploadMutation.mutateAsync(formData);
      message.success('Products uploaded successfully!');
      navigate('/pos/inventory');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload products';
      message.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel} />
          <Title level={4} className="!m-0">Add Bulk Product</Title>
        </div>
        <div className="space-x-2">
          <Button 
            icon={<DownloadOutlined />} 
            onClick={handleDownloadTemplate}
            loading={downloadTemplate.isLoading}
          >
            Download Template
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button 
            type="primary" 
            onClick={handleFinish} 
            loading={uploading}
            disabled={parsedData.length === 0}
          >
            {uploading ? 'Uploading...' : 'Save'}
          </Button>
        </div>
      </div>

      <Text type="secondary" className="block mb-6">
        Form pages are used to collect or verify information from users.
        Basic forms are common in scenarios with fewer data items.
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-700">Instructions For Adding Bulk Products</h3>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1 text-gray-700">
            <li>Download the product template CSV file</li>
            <li>Modify your CSV’s content as needed</li>
            <li>Upload the CSV file here</li>
          </ol>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownloadTemplate}
            className="mt-4"
            loading={downloadTemplate.isLoading}
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
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="text-lg">Click or drag file to this area to upload</p>
          <p className="text-sm text-gray-500">
            Support for a single .csv upload. Strictly products from a matching template.
          </p>
        </Dragger>
      </div>

      {parsedData.length > 0 && (
        <Table
          dataSource={parsedData}
          columns={columns}
          rowKey={(_, idx) => idx?.toString() ?? Math.random().toString()}
          scroll={{ x: true }}
        />
      )}
    </div>
  );
}
