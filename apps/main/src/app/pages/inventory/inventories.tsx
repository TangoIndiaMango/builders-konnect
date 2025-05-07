import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTableState } from '../../../hooks/useTable';
import DisplayHeader from '../../components/common/DisplayHeader';
import DateFilter from '../../components/common/filters/DateFilter';
import TableWrapper from '../../components/common/Table/TableWrapper';
import TableStats from '../../components/common/TableStats';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import { InventoryTable } from '../../components/inventory/inventoryTable';
import {
  productData,
  productNumbersData,
} from '../../lib/mockData/productData';
import { filterOptions } from '../../lib/constant';

const Inventory = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    searchValue,
    setSearch,
    filterValue,
    handleFilterChange,
    currentPage,
    setPage,
  } = useTableState('products');

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
      <div className="flex flex-col gap-4 p-4 mb-2 bg-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
        {/* Title & Description */}
        <div>
          <div className="flex items-center gap-3">
            <div onClick={() => navigate(-1)} className="cursor-pointer">
              <ArrowLeftOutlined className="mt-1 text-xl font-medium text-black" />
            </div>
            <h1 className="text-2xl font-semibold">Inventory</h1>
          </div>
          <p className="text-sm text-gray-500">
            Track and measure stock levels here
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
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
      <div className="p-4 space-y-3 bg-white sm:p-10">
        {/* Header + Filter */}
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={<DateFilter />}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <TableWrapper
            searchValue={searchValue}
            setSearchValue={setSearch}
            filterOptions={filterOptions}
            selectedFilter={filterValue}
            onFilterChange={handleFilterChange}
          >
            <InventoryTable
              data={productData}
              currentPage={currentPage}
              onPageChange={setPage}
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
