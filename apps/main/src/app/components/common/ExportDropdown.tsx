import {
  DownloadOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { Download, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';

interface ExportOption {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ExportDropdown = () => {
  const [open, setOpen] = useState(false);

  const exportOptions: ExportOption[] = [
    {
      label: 'Export as CSV',
      value: 'csv',
      icon: <FileTextOutlined size={16} />,
      onClick: () => {
        console.log('Exporting as CSV');
      },
    },
    {
      label: 'Export as PDF',
      value: 'pdf',
      icon: <FilePdfOutlined size={16} />,
      onClick: () => {
        console.log('Exporting as PDF');
      },
    },
  ];

  const content = (
    <div className="w-40 py-1">
      {exportOptions.map((option) => (
        <div
          key={option.value}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50"
          onClick={() => {
            option.onClick();
            setOpen(false);
          }}
        >
          {option.icon}
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottom"

    >
      <Button icon={<DownloadOutlined size={18} />} size="large">
        Export
      </Button>
    </Popover>
  );
};
