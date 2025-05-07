import { Table as AntTable, Button, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableSkeleton from './TableLoader';

export interface DataType {
  key: string;
  [key: string]: any;
}

export interface CustomTableProps<T> extends TableProps<T> {
  // Extend TableProps
  data: T[];
  columns: ColumnsType<T>;
  currentPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  showCheckbox?: boolean;
  striped?: boolean;
  showPagination?: boolean;
  loading?: boolean;
  rowSelection?: TableProps<T>['rowSelection'];
  selectedRowKeys?: React.Key[];
  resetSelection?: () => void;
  updateLimitSize?: (page: number, pageSize: number) => void;
}

export const PaginatedTable = <T extends DataType>({
  data,
  columns,
  currentPage = 1,
  pageSize = 10,
  total,
  onPageChange,
  showCheckbox = false,
  striped = true,
  showPagination = true,
  loading = false,
  rowSelection,
  selectedRowKeys,
  resetSelection,
  updateLimitSize,
  ...rest // Spread remaining props for further customization (including scroll)
}: CustomTableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto">
      {selectedRowKeys && selectedRowKeys.length > 0 && (
        <div className="p-4 mb-4 rounded-lg bg-blue-50">
          <span className="text-blue-600">
            Selected {selectedRowKeys.length} items
          </span>
          <Button type="link" onClick={resetSelection} className="ml-2">
            Clear Selection
          </Button>
        </div>
      )}

      {loading ? (
        <TableSkeleton columns={columns.length} />
      ) : (
        <AntTable
          columns={columns}
          dataSource={data}
          loading={false} // We handle loading with our skeleton
          rowSelection={showCheckbox ? rowSelection : undefined}
          pagination={
            showPagination
              ? {
                  current: currentPage,
                  pageSize: pageSize,
                  total: total,
                  onChange: onPageChange,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
                  onShowSizeChange: updateLimitSize,
                }
              : false
          }
          className={`custom-table ${striped ? 'table-striped' : ''}`}
          scroll={{ x: 'max-content', y: 'auto' }} // Updated to better handle overflow
          {...rest} // Pass any other props such as scroll
        />
      )}
    </div>
  );
};
