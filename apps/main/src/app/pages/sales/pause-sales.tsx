import { Button, Divider } from 'antd';
import { useTableState } from '../../../hooks/useTable';
import { useGetSales } from '../../../service/sales/salesFN';
import DisplayHeader from '../../components/common/DisplayHeader';
import NavigationBack from '../../components/common/NavigationBack';
import TableWrapper from '../../components/common/Table/TableWrapper';
import DatePickerComp from '../../components/date/DatePickerrComp';
import { OrdersTable } from '../../components/sales/table/salesTable';
import { SalesFilterOptions } from './constant';

const PausedSales = () => {
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
  } = useTableState('sales');
  const { data: sales, isLoading } = useGetSales({
    paginate: 1,
    limit: limitSize,
    sales_type: '',
    status: 'draft',
    q: searchValue,
    sort_by: filterKey === 'sort_by' ? filterValue : '',
    payment_status: filterKey === 'payment_status' ? filterValue : '',
    order_status: filterKey === 'order_status' ? filterValue : '',
    date_filter: customDateRange || '',
    page: currentPage,
  });

  return (
    <div className="space-y-5">
      <NavigationBack
        title="Pause Sales"
        description="Make product sales and track sales performance here"
      />
      <div className="p-5">
        <div className="p-5 space-y-3 bg-white rounded shadow-sm">
          <DisplayHeader
            title="All Paused Sales"
            description="You're viewing orders from the online marketplace below."
            actionButton={
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={reset}>Clear</Button>

                <DatePickerComp
                  onRangeChange={setCustomDateRange}
                  value={customDateRange}
                />
              </div>
            }
          />

          <Divider />

          <div>
            <TableWrapper
              searchValue={searchValue}
              setSearchValue={setSearch}
              onFilterChange={handleFilterChange}
              selectedFilter={filterValue}
              onExport={setExportType}
              filterOptions={SalesFilterOptions}
              isDashboard={false}
            >
              <OrdersTable
                data={sales?.data?.data}
                currentPage={currentPage}
                onPageChange={setPage}
                loading={isLoading}
                showCheckbox={true}
                perPage={sales?.data?.per_page}
                total={sales?.data?.total}
                updateLimitSize={setLimitSize}
                withPagination={true}
              />
            </TableWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PausedSales;
