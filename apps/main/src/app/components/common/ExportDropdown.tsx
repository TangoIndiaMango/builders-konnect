import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';

interface ExportOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface ExportDropdownProps {
  options?: ExportOption[];
  onExport?: (value: string) => void;
}

const exportOptions: ExportOption[] = [
  {
    label: 'Export as CSV',
    value: 'csv',
    icon: <FileTextOutlined size={16} />,
  },
  // {
  //   label: 'Export as PDF',
  //   value: 'pdf',
  //   icon: <FilePdfOutlined size={16} />,
  // },
];

export const ExportDropdown = ({
  options = exportOptions,
  onExport,
}: ExportDropdownProps) => {
  const [open, setOpen] = useState(false);

  // Default handler if none is provided
  const handleExport = (value: string) => {
    if (onExport) {
      onExport(value);
    } else {
      // Default actions
      if (value === 'csv') {
        console.log('Exporting as CSV');
      } else if (value === 'pdf') {
        console.log('Exporting as PDF');
      }
    }
    setOpen(false);
  };

  const content = (
    <div className="w-40 py-1">
      {options?.map((option) => (
        <div
          key={option.value}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50"
          onClick={() => {
            handleExport(option.value.toString());
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
