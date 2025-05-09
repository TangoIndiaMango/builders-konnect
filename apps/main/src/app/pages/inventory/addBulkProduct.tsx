import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Table, Typography, Upload } from 'antd';
import Papa from 'papaparse';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetExportData, useUploadData } from '../../../hooks/useApis';
import { beforeUpload } from '../../../utils/helper';
import NavigationBack from '../../components/common/NavigationBack';

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
  const downloadTemplate = useGetExportData(
    'merchants/inventory-products/download/template'
  );

  // Upload mutation
  const uploadMutation = useUploadData(
    'merchants/inventory-products/upload/bulk'
  );

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
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to download template';
      message.error(errorMessage);
    }
  };

  // Handle CSV upload and parsing
  const handleCSVUpload = (info: any) => {
    if (!info.file) return false;
    Papa.parse(info.file as File, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data as ProductData[];
        console.log(data);
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            title: key?.charAt(0)?.toUpperCase() + key?.slice(1),
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
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFinish = async () => {
    if (parsedData.length === 0) {
      message.error('Please upload a CSV file first');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append(
        'file',
        new Blob([Papa.unparse(parsedData)], { type: 'text/csv' })
      );

      await uploadMutation.mutateAsync(formData);
      message.success('Products uploaded successfully!');
      navigate('/pos/inventory');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to upload products';
      message.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <NavigationBack
        title="Add Bulk Product"
        description="Form pages are used to collect or verify information from users.
            Basic forms are common in scenarios with fewer data items."
        actionButton={
          <div className="flex gap-3">
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
        }
      />

      <div className="p-5">
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#E6F7FF] p-4 rounded space-y-4">
              <h3 className="font-semibold text-[#003399]">
                Instructions For Adding Bulk Products
              </h3>
              <p>Follow the instructions below</p>
              <ol className="list-decimal list-inside text-sm mt-2 space-y-1 text-gray-700">
                <li>Download the product template CSV file</li>
                <li>Match your CSV's columns to the attributes</li>
                <li>Preview your CSV before you upload</li>
                <li>Upload your product CSV file</li>
                <li>Submit</li>
              </ol>
              <Button
                type="primary"
                onClick={handleDownloadTemplate}

                loading={downloadTemplate.isPending}
              >
                Download Template
              </Button>
            </div>

            <Dragger
              name="file"
              multiple={false}
              beforeUpload={beforeUpload}
              showUploadList={false}
              accept=".csv"
              onChange={handleCSVUpload}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="text-lg">
                Click or drag file to this area to upload
              </p>
              <p className="text-sm text-gray-500">
                Support for a single .csv upload. Strictly products from a
                matching template.
              </p>
            </Dragger>
          </div>
          {/* <div className="relative w-[800px] h-[250px]">
            <Image src={addBulkProduct} alt="add bulk product" />
          </div> */}

          {parsedData.length > 0 && (
            <Table
              dataSource={parsedData}
              columns={columns}
              scroll={{ x: true }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
