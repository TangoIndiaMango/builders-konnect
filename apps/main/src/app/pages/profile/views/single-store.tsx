import React, { useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { SkeletonLoader } from '../../../components/common/SkeletonLoader';
import { exportCsvFromString, getStatusColor } from '../../../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import SalesOverview from '../../../components/profile/store/OrderDetails';
import { useFetchData, useGetExportData } from '../../../../hooks/useApis';
import StoreDetailsnfo from '../../../components/profile/store/StoreDetailsnfo';
import { SingleStoreResponse } from '../types';
import { useTableState } from '../../../../hooks/useTable';
import { SalesFilterOptions } from '../../sales/constant';

const SingleStoreDetails = () => {
  const { id } = useParams();

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
  } = useTableState('staff');
  const exportStaff = useGetExportData(`merchants/staff?export=${exportType}`);

  const handleExport = () => {
    exportStaff.mutate(null as any, {
      onSuccess: (data) => {
        exportCsvFromString(data, 'Staff');
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

  const getSalesOrder =
    useFetchData(`merchants/locations/${id}?with_sales_overview=true
`);
  const singleSalesOrder = getSalesOrder?.data?.data as SingleStoreResponse;
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View order
          </Typography.Title>
        </div>

        <div className="flex items-center justify-end gap-3">
          {/* <Select
            placeholder="Select order status"
            options={orderStatusOptions}
          /> */}

          <Button>Edit</Button>
        </div>
      </div>

      <div className="p-5 ">
        <div className="p-5 space-y-5 bg-white">
          <Typography.Title level={4}>
            {singleSalesOrder?.name} store
          </Typography.Title>
          <StoreDetailsnfo
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
          />
          <SalesOverview
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
            currentPage={currentPage}
            setPage={setPage}
            setSearchValue={setSearch}
            handleFilterChange={handleFilterChange}
            filterOptions={SalesFilterOptions}
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
    </div>
  );
};

export default SingleStoreDetails;
