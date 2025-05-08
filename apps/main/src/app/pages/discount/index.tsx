import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useFetchData,
  useGetExportData
} from '../../../hooks/useApis';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import DiscountList from '../../components/discount/DiscountList';
import { DiscountListResponse } from './types';
import { exportCsvFromString } from '../../../utils/helper';
import { useTableState } from '../../../hooks/useTable';
import { StaffFilterOptions } from '../staff/constant';
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
  } = useTableState('discount');
  const exportDiscount = useGetExportData(`merchants/discounts?export=${exportType}`);

  const handleExport = () => {
    exportDiscount.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Discounts');
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


  const filterOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];


  const [tab, setTab] = useState('staff');
  const discount = useFetchData(
    `merchants/discounts?paginate=1&page=${currentPage}&status=${
      filterKey === 'status' ? filterValue : ''
    }&date_filter=${customDateRange ?? ''}&sort_by=${
      filterKey === 'sort_by' ? filterValue : ''
    }&q=${searchValue ?? ''}&limit=${limitSize ?? 10}`
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
          setPage={setPage}
          setSearchValue={setSearch}
          handleFilterChange={handleFilterChange}
          filterOptions={StaffFilterOptions}
          onExport={handleExport}
          filterValue={filterValue ?? ''}
          setCustomDateRange={setCustomDateRange}
          pageSize={pageSize}
          reset={reset}
          updateLimitSize={setLimitSize}
          searchValue={searchValue}
        />
      </div>


    </div>
  );
};

export default DiscountHome;
