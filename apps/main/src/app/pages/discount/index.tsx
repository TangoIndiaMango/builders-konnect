import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useFetchData
} from '../../../hooks/useApis';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import DiscountList from '../../components/discount/DiscountList';
import { DiscountListResponse } from './types';
/**
 * paginate
1

limit
status
active, inactive

date_filter
Today, 3 days, 7 days, 14 days, this month, 3 months, this year, 2025, 2025-03-01|2025-03-31

sort_by
alphabetically, date_ascending, date_descending

export
csv
 */
export interface Role {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
const DiscountHome = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filterOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value: string) => {
    setStatus(value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const [tab, setTab] = useState('staff');
  const discount = useFetchData(
    `merchants/discounts?paginate=1&page=${currentPage}&status=${status}&date_filter=${dateFilter}&sort_by=${sortBy}&q=${searchQuery}`
  );

  const discountListResponse: DiscountListResponse = discount?.data?.data;


  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);



  const onChange = (key: string) => {
    setTab(key);
  };



  // const handleEditClick = (staffMember: Staff) => {
  //   setModalMode('edit');
  //   setSelectedStaff(staffMember);
  //   setIsStaffModalOpen(true);
  // };

  return (
    <div>
      <PageIntroBanner
        title="Discount Management"
        description="Add discount to your business and control discount status"
        actionButton={

              <Button
                type="primary"
                className="rounded"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => navigate('/pos/discounts/create')}
              >
                Add Discount
              </Button>

        }
      />

      <div className="px-5 bg-white">
        <DiscountList
          data={discountListResponse}
          isLoading={discount?.isLoading}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleSearch={handleSearch}
          handleFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          selectedFilter={status}
          handleDateFilterChange={handleDateFilterChange}
          selectedDateFilter={dateFilter}
        />
      </div>


    </div>
  );
};

export default DiscountHome;
