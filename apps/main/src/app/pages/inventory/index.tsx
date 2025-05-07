import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchData, useGetExportData } from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { ProductStats } from '../../../service/inventory/inventory.types';
import { exportCsvFromString, formatBalance } from '../../../utils/helper';
import DisplayHeader from '../../components/common/DisplayHeader';
import TimelineFilter from '../../components/common/filters/DateFilter';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import TableStats from '../../components/common/TableStats';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import {
  ProductTable,
  ProductTableData,
} from '../../components/inventory/product-table';
import { PaginatedResponse } from '../../types/paginatedData';
import TableWrapper from '../../components/common/Table/TableWrapper';
import { filterOptions } from '../../lib/constant';
import DatePickerComp from '../../components/date/DatePickerrComp';

const ProductsPage = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  // const [products, setProducts] = useState<ProductTableData[]>([]);
  // const [stats, setStats] = useState<ProductStats | null>(null);
  // const [total, setTotal] = useState(0);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [dateFilter, setDateFilter] = useState('7 days');
  // const [perPage, setPerPage] = useState(10);

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

  const stats = products?.data?.stats as ProductStats;
  const productsData = products?.data?.data
    ?.data as PaginatedResponse<ProductTableData>;
  // console.log(productsData);
  // const fetchProducts = async (
  //   page = 1,
  //   search?: string,
  //   exportType?: 'csv' | 'pdf'
  // ) => {
  //   try {
  //     const response = await getInventoryProducts({
  //       paginate: 1,
  //       q: searchValue,
  //       date_filter: customDateRange,
  //       sort_by: filterKey === 'sort_by' ? filterValue : '',
  //       status: filterKey === 'status' ? filterValue : '',
  //       limit: limitSize,
  //       page: currentPage,
  //       // export: exportType,
  //     });
  //     const productsWithKey = response.data.data.data.map((product) => ({
  //       ...product,
  //       key: product.id,
  //     })) as ProductTableData[];
  //     setProducts(productsWithKey);
  //     setStats(response.data.stats);
  //     setTotal(parseInt(response.data.stats.total_products));
  //     setPerPage(response.data.data.per_page);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handlePageChange = (page: number, pageSize: number) => {
  //   setCurrentPage(page);
  //   setPerPage(pageSize);
  // };

  // const handleSearch = (value: string) => {
  //   setSearchQuery(value);
  // };

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchProducts(currentPage, searchQuery);
  // }, [currentPage, searchQuery, dateFilter]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 mb-2 bg-white">
        <div>
          <h1 className="text-2xl font-semibold">Products and Inventory</h1>
          <p className="text-sm text-gray-500">
            Add products, track product performance and inventory here
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Button
            className="rounded"
            size="large"
            onClick={() => navigate('/pos/inventory/inventories')}
          >
            View Inventory
          </Button>

          <Dropdown menu={menu} trigger={['click']} placement="bottom">
            <Button
              type="primary"
              className="rounded"
              size="large"
              icon={<PlusOutlined />}
            >
              Add Product
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="p-10 space-y-3 bg-white">
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button onClick={reset}>Clear</Button>
              <DatePickerComp onRangeChange={setCustomDateRange} />
            </div>
          }
        />

        <SkeletonLoader
          active={products?.isLoading}
          type="table"
          columns={4}
          rows={1}
        >
          <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
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

        <TableWrapper
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          selectedFilter={filterValue}
          searchValue={searchValue}
          setSearchValue={setSearch}
          onExport={handleExport}
        >
          <ProductTable
            data={productsData?.data}
            currentPage={currentPage}
            onPageChange={setPage}
            loading={products?.isLoading}
            showCheckbox={true}
            total={productsData?.total}
            perPage={productsData?.per_page}
            updateLimitSize={setLimitSize}
          />
        </TableWrapper>
      </div>
    </div>
  );
};

export default ProductsPage;
