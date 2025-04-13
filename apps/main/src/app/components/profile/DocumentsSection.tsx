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
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">DOCUMENTS</h3>

      <div className="grid grid-cols-2 gap-x-24 gap-y-6">
        <div>
          <Text className="text-gray-500 block mb-1">CAC no.</Text>
          <Text className="text-gray-900">{documents.cac.number}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">CAC document</Text>
          <a href={documents.cac.document} className="text-blue-600 flex items-center gap-2">
            buildershub CAC.pdf <ArrowRightOutlined />
          </a>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">TIN no.</Text>
          <Text className="text-gray-900">{documents.tin.number}</Text>
        </div>
        <div>
          <Text className="text-gray-500 block mb-1">TIN document</Text>
          <a href={documents.tin.document} className="text-blue-600 flex items-center gap-2">
            buildershub TIN.pdf <ArrowRightOutlined />
          </a>
        </div>
        <div className="col-span-2">
          <Text className="text-gray-500 block mb-1">Proof of address</Text>
          <a href={documents.proofOfAddress} className="text-blue-600 flex items-center gap-2">
            buildershub TIN.pdf <ArrowRightOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;