import { FilterCategory } from "../components/common/filters/MultiOptionsFilter";
import { DateRange } from "../components/date/DatePickerrComp";

export interface FilterState {
  currentPage: number;
  pageSize?: number;
  setPage: (page: number) => void;
  setCustomDateRange: (dates: DateRange, dateStrings: string[]) => void;
  handleFilterChange: (filterKey: string, value: string) => void;
  filterValue: string;
  onExport: (value: string) => void;
  updateLimitSize: (page: number, pageSize: number) => void;
  filterOptions: FilterCategory[];
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  reset: () => void;
}

export interface DataTableProps {
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
  total: number;
  perPage: number;
  showCheckbox?: boolean;
  updateLimitSize?: (page: number, pageSize: number) => void;
}