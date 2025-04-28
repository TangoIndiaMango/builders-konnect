import { Button, Divider, Dropdown, Menu } from 'antd';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import { InventoryTable } from '../../components/inventory/inventoryTable';
import {
  numbersData,
  productData,
  productNumbersData,
} from '../../lib/mockData/productData';
import TableWrapper from '../../components/common/Table/Inventory';
import { useState } from 'react';
import TableStats from '../../components/common/TableStats';
import DisplayHeader from '../../components/common/DisplayHeader';
import DateFilter from '../../components/common/filters/DateFilter';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };

  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center bg-white mb-2 p-6">
        <div>
          <div className="flex items-center gap-3">
            <div onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="text-xl mt-1 text-black font-medium" />
            </div>
            <h1 className="text-2xl font-semibold">Inventory</h1>
          </div>

          <p className="text-gray-500 text-sm">
            Track and measure stock levels here
          </p>
        </div>

        <div className="flex items-center gap-5">
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

      <div className="space-y-3 bg-white p-10">
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={<DateFilter />}
        />

        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {productNumbersData?.map((item) => (
            <TableStats
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
        <Divider />
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
