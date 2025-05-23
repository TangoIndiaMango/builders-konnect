import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useFetchData,
  useGetExportData
} from '../../../hooks/useApis';
import { useTableState } from '../../../hooks/useTable';
import { ProductStats } from '../../../service/inventory/inventory.types';
import { useDeleteProduct } from '../../../service/inventory/inventoryFN';
import { exportCsvFromString, formatBalance } from '../../../utils/helper';
import DisplayHeader from '../../components/common/DisplayHeader';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import TableWrapper from '../../components/common/Table/TableWrapper';
import TableStats from '../../components/common/TableStats';
import DatePickerComp from '../../components/date/DatePickerrComp';
import {
  ProductTable,
  ProductTableData,
} from '../../components/inventory/product-table';
import { filterOptions } from '../../lib/constant';
import { PaginatedResponse } from '../../types/paginatedData';

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
      // {
      //   key: '2',
      //   label: 'Add Bulk Products',
      //   onClick: () => {
      //     navigate('/pos/inventory/add-bulk-product');
      //   },
      // },
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

  const [productId, setProductId] = useState();

  const deleteProduct = useDeleteProduct();

  const stats = products?.data?.data?.stats as ProductStats;
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

  const handleEdit = (record: ProductTableData) => {
    navigate(`/pos/inventory/product-edit/${record.id}`, { state: record });
  };

  const handleDelete = (record: ProductTableData) => {
    Modal.confirm({
      title: 'Delete Product',
      content: `Are you sure you want to delete ${record.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      okButtonProps: {
        loading: deleteProduct.isPending,
        disabled: deleteProduct.isPending,
      },
      centered: true,
      styles: {
        content: {
          minWidth: 400,
          borderRadius: '0px',
        },
      },
      onOk: async () => {
        try {
          await deleteProduct.mutateAsync(record.id, {
            onSuccess: () => {
              message.success('Product deleted successfully');
              products.refetch();
            },
            onError: (error) => {
              // console.log(error);
              message.error(error?.message || 'Failed to delete product');
            },
          });
        } catch (err) {
          console.error('Failed to delete product:', err);
          // message.error('Failed to delete product');
        }
      },
    });
  };

  const handleViewDetails = (record: ProductTableData) => {
    navigate(`/pos/inventory/preview-product/${record.id}`, { state: record });
  };

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

     <div className='p-5'>
     <div className="p-5 space-y-3 bg-white">
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button onClick={reset}>Clear</Button>
              <DatePickerComp
                onRangeChange={setCustomDateRange}
                value={customDateRange}
              />
            </div>
          }
        />

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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        </TableWrapper>
      </div>
     </div>
    </div>
  );
};

export default ProductsPage;
