import { Typography, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface DocumentsSectionProps {
  documents: {
    cac: {
      number: string;
      document: string;
    };
    tin: {
      number: string;
      document: string;
    };
    proofOfAddress: string;
  };
}

const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">DOCUMENTS</h3>

      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="block mb-1 text-gray-500">CAC no.</Text>
          <Text className="text-gray-900">{documents.cac.number}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">CAC document</Text>
          <a href={documents.cac.document} className="flex items-center gap-2 text-blue-600">
            buildershub CAC.pdf <ArrowRightOutlined />
          </a>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">TIN no.</Text>
          <Text className="text-gray-900">{documents.tin.number}</Text>
        </div>
        <div>
          <Text className="block mb-1 text-gray-500">TIN document</Text>
          <a href={documents.tin.document} className="flex items-center gap-2 text-blue-600">
            buildershub TIN.pdf <ArrowRightOutlined />
          </a>
        </div>
        <div className="col-span-2">
          <Text className="block mb-1 text-gray-500">Proof of address</Text>
          <a href={documents.proofOfAddress} className="flex items-center gap-2 text-blue-600">
            buildershub TIN.pdf <ArrowRightOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;