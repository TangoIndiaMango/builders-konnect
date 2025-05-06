import { Button, Divider, Dropdown, Menu } from 'antd';
import { useEffect } from 'react';
import { getInventoryProducts } from '../../../service/inventory/inventory';
import { ProductStats } from '../../../service/inventory/inventory.types';
import { ProductTableData } from '../../components/inventory/product-table';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import { ProductTable } from '../../components/inventory/product-table';

import TableWrapper from '../../components/common/Table/TableWrapper';
import { useState } from 'react';
import TableStats from '../../components/common/TableStats';
import DisplayHeader from '../../components/common/DisplayHeader';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FilterGroup from '../../components/common/filters/FilterGroup';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductTableData[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('7 days');
  const [perPage, setPerPage] = useState(10);
  const menu = (
    <Menu
      items={[
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
      ]}
    />
  );

  const fetchProducts = async (page = 1, search?: string, exportType?: 'csv' | 'pdf') => {
    try {
      setLoading(true);
      const response = await getInventoryProducts({
        paginate: page,
        q: search,
        date_filter: dateFilter,
        export: exportType
      });
      const productsWithKey = response.data.data.data.map(product => ({ ...product, key: product.id })) as ProductTableData[];
      setProducts(productsWithKey);
      setStats(response.data.stats);
      setTotal(parseInt(response.data.stats.total_products));
      setPerPage(response.data.data.per_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage, searchQuery);
  }, [currentPage, searchQuery, dateFilter]);

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

          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
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
          actionButton={<FilterGroup className="space-x-3" />}
        />

        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {stats && [
            { label: 'Total Products', value: stats.total_products, valueBgColor: 'bg-[#E6F7FF]', valueColor: 'text-[#003399]' },
            { label: 'Total Value', value: `₦${stats.total_products_value}`, valueBgColor: 'bg-[#E6FFFB]', valueColor: 'text-[#08979C]' },
            { label: 'Total Sales', value: stats.total_sales.toString(), valueBgColor: 'bg-[#F9F0FF]', valueColor: 'text-[#722ED1]' }
          ].map((item) => (
            <TableStats
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
        <Divider />
        <TableWrapper onSearch={handleSearch}>
          {products.length === 0 ? (
            <EmptyInventoryState />
          ) : (
            <ProductTable
              data={products}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              loading={loading}
              showCheckbox={true}
              total={total}
              per_page={perPage}
            />
          )}
        </TableWrapper>
      </div>
    </div>
  );
};

export default ProductsPage;
