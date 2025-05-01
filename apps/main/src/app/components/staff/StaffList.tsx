import { useState } from "react";
import { StaffListResponse } from "../../pages/staff/types";
import DisplayHeader from "../common/DisplayHeader";
import TimelineFilter from "../common/filters/TimelineFilter";
import { SkeletonLoader } from "../common/SkeletonLoader";
import TableWrapper from "../common/Table/TableWrapper";
import TableStats from "../common/TableStats";
import { StaffTable } from "./table/salesTable";

interface StaffListProps {
  data: StaffListResponse;
  isLoading: boolean;
}
const StaffList = ({ data, isLoading }: StaffListProps) => {
  console.log(isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Handle pagination logic here
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setSearchQuery(value);
    // Implement your search logic here
  };
  const tableStatsData = [
    {
      label: 'Total Staff',
      value: `${data?.stats?.total}`,
      valueBgColor: '#E6F7FF',
      valueColor: '#003399',
    },
    {
      label: 'Active',
      value: `${data?.stats?.active}`,
      valueBgColor: '#E6FFFB',
      valueColor: '#08979C',
    },
    {
      label: 'Deactivated',
      value: `${data?.stats?.inactive}`,
      valueBgColor: '#F9F0FF',
      valueColor: '#722ED1',
    },
  ];

  return (
    <div className="space-y-3">
      <DisplayHeader
        title="All Staff"
        description="You're viewing all staff below."
        actionButton={<TimelineFilter />}
      />

      <SkeletonLoader active={isLoading} type="table" columns={4} rows={1}>
        <div className="flex flex-wrap items-start w-full gap-3 mx-auto divide-x-2">
          {tableStatsData?.map((item, index) => (
            <TableStats
              key={index}
              label={item?.label}
              value={item?.value}
              valueBgColor={item?.valueBgColor}
              valueColor={item?.valueColor}
            />
          ))}
        </div>
      </SkeletonLoader>

      <TableWrapper onSearch={handleSearch}>
        <StaffTable
          data={data?.data?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
          showCheckbox={true}
          total={data?.data?.total}
        />
      </TableWrapper>
    </div>
  );
};

export default StaffList;