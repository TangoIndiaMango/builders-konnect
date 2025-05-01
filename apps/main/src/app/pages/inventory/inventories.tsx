import { Button, Divider, Menu } from 'antd';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import { InventoryTable } from '../../components/inventory/inventoryTable';
import {
  productData,
  productNumbersData,
} from '../../lib/mockData/productData';
import TableWrapper from '../../components/common/Table/Inventory';
import { useState } from 'react';
import TableStats from '../../components/common/TableStats';
import DisplayHeader from '../../components/common/DisplayHeader';
import DateFilter from '../../components/common/filters/DateFilter';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Add Products',
          onClick: () => {
            console.log('Add Products clicked');
          },
        },
        {
          key: '2',
          label: 'Add Bulk Products',
          onClick: () => {
            console.log('Add Bulk Products clicked');
          },
        },
      ]}
    />
  );

  return (
    <div className="h-full">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white mb-2 p-4 sm:p-6">
        {/* Title & Description */}
        <div>
          <div className="flex items-center gap-3">
            <div onClick={() => navigate(-1)} className="cursor-pointer">
              <ArrowLeftOutlined className="text-xl mt-1 text-black font-medium" />
            </div>
            <h1 className="text-2xl font-semibold">Inventory</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Track and measure stock levels here
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <Button
            className="rounded !bg-[#CF1322] text-white"
            size="large"
            onClick={() => navigate('/pos/inventory/trigger-reorder')}
          >
            Trigger Reorder
          </Button>
          <Button
            onClick={() => navigate('/pos/inventory/edit')}
            type="primary"
            className="rounded"
            size="large"
          >
            Edit Inventory
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="space-y-3 bg-white p-4 sm:p-10">
        {/* Header + Filter */}
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={<DateFilter />}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productNumbersData?.map((item, index) => (
            <TableStats
              key={index}
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>

        <Divider />

        {/* Table or Empty State */}
        {productData.length === 0 ? (
          <EmptyInventoryState />
        ) : (
          <TableWrapper onSearch={handleSearch}>
            <InventoryTable
              data={productData}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              loading={loading}
              showCheckbox={true}
              total={productData.length}
            />
          </TableWrapper>
        )}
      </div>
    </div>
  );
};

export default Inventory;
