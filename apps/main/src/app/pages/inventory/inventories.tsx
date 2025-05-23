import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Menu, MenuProps, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
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
import { PaginatedResponse } from '../../types/paginatedData';
import { ProductTableData } from '../../components/inventory/product-table';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { exportCsvFromString, formatBalance } from '../../../utils/helper';
import { useGetExportData, useFetchData } from '../../../hooks/useApis';
import { ProductStats } from '../../../service/inventory/inventory.types';
import DatePickerComp from '../../components/date/DatePickerrComp';

const Inventory = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const {
    searchValue,
    setSearch,
    currentPage,
    pageSize,
    setPage,
    reset,
    customDateRange,
    setCustomDateRange,
    filterKey,
    filterValue,
    handleFilterChange,
    exportType,
    setExportType,
    limitSize,
    setLimitSize,
  } = useTableState('products');

 const menu: MenuProps = {
     items: [
       {
         key: '1',
         label: 'Add Products',
         onClick: () => {
           navigate('/pos/inventory/create-product-by-search');
         },
       },
       {
         key: '2',
         label: 'Add Bulk Products',
         onClick: () => {
           navigate('/pos/inventory/add-bulk-product');
         },
       },
     ],
   };

const exportProducts = useGetExportData(
    `merchants/products?export=${exportType}`
  );

  const handleExport = () => {
    exportProducts.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Products');
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setExportType('');
      },
    });
  };

  useEffect(() => {
    if (exportType) {
      handleExport();
    }
  }, [exportType]);

  const products = useFetchData(
    `merchants/inventory-products?paginate=1&page=${
      currentPage ?? 1
    }&date_filter=${customDateRange ?? ''}&q=${searchValue ?? ''}&limit=${
      limitSize ?? 10
    }&sort_by=${filterKey === 'sort_by' ? filterValue : ''}&status=${
      filterKey === 'status' ? filterValue : ''
    }`
  );

  const stats = products?.data?.data?.stats as ProductStats;
  const productsData = products?.data?.data
    ?.data as PaginatedResponse<ProductTableData>;

     const navigate = useNavigate();

      const handleEdit = (record: ProductTableData) => {
        navigate(`/pos/inventory/edit-product/${record.id}`, { state: record });
      };



      const handleViewDetails = (record: ProductTableData) => {
        navigate(`/pos/inventory/preview-product/${record.id}`, { state: record });
      };

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
            type="primary"
            danger
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
          actionButton={ <div className="flex flex-wrap items-center justify-end gap-3">
            <Button onClick={reset}>Clear</Button>
            <DatePickerComp
              onRangeChange={setCustomDateRange}
              value={customDateRange}
            />
          </div>}
        />

        {/* Stats */}
        <SkeletonLoader
                 active={products?.isLoading}
                 type="table"
                 columns={4}
                 rows={1}
               >
                 <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x divide-gray-300">
                   {stats &&
                     [
                       {
                         label: 'Total Products',
                         value: stats.total_products?.toString(),
                         valueBgColor: '#FEF3F2',
                         valueColor: '#F04438',
                       },
                       {
                         label: 'Total Value',
                         value: formatBalance(stats.total_products_value),
                         valueBgColor: '#F8F9FC',
                         valueColor: '#003399',
                       },
                       {
                         label: 'Total Sales',
                         value: formatBalance(stats.total_sales),
                         valueBgColor: '#ECFDF3',
                         valueColor: '#12B76A',
                       },
                     ].map((item, key) => (
                       <TableStats
                         key={key}
                         label={item?.label}
                         value={item?.value}
                         valueBgColor={item?.valueBgColor}
                         valueColor={item?.valueColor}
                       />
                     ))}
                 </div>
               </SkeletonLoader>
               <Divider />

        {/* Table or Empty State */}

        <TableWrapper
                  filterOptions={filterOptions}
                  onFilterChange={handleFilterChange}
                  selectedFilter={filterValue}
                  searchValue={searchValue}
                  setSearchValue={setSearch}
                  onExport={handleExport}
                >
            <InventoryTable
             data={productsData?.data}
             currentPage={currentPage}
             onPageChange={setPage}
             loading={products?.isLoading}
             showCheckbox={true}
             total={productsData?.total}
             perPage={productsData?.per_page}
             updateLimitSize={setLimitSize}
             onEdit={handleEdit}
             onViewDetails={handleViewDetails}
            />
          </TableWrapper>

      </div>
    </div>
  );
};

export default Inventory;
