import { TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { DataType } from '../app/components/common/Table/Table';

export const useSelection = <T extends DataType>({ data }: { data: T[] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle row selection changes
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('Selected rows:', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Row selection configuration
  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          const allKeys = data?.map((item) => item.key);
          setSelectedRowKeys(allKeys);
        },
      },
      {
        key: 'clear-all',
        text: 'Clear All',
        onSelect: () => {
          setSelectedRowKeys([]);
        },
      },
    ],
  };

  const resetSelection = () => {
    setSelectedRowKeys([]);
  };

  return { rowSelection, selectedRowKeys, resetSelection };
};
