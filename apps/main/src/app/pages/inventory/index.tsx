import { Button, Divider, Dropdown, Menu } from 'antd';
import { EmptyInventoryState } from '../../components/inventory/empty-inventory-state';
import { ProductTable } from '../../components/inventory/product-table';
import { numbersData, productData } from '../../lib/mockData/productData';
import TableWrapper from '../../components/common/Table/TableWrapper';
import { useState } from 'react';
import TableStats from '../../components/common/TableStats';
import DisplayHeader from '../../components/common/DisplayHeader';
import TimelineFilter from '../../components/common/filters/TimelineFilter';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
  };

  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center bg-white mb-2 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Products and Inventory</h1>
          <p className="text-gray-500 text-sm">
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

      <div className="space-y-3 bg-white p-10">
        <DisplayHeader
          title="All Products"
          description="You're viewing all products below."
          actionButton={<TimelineFilter />}
        />

        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {numbersData?.map((item) => (
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
            <ProductTable
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

export default ProductsPage;
