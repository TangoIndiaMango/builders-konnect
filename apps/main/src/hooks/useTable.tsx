import { useAtom } from 'jotai';
import { createTableAtoms, defaultTableState } from '../app/store/table';
import useDebounce from './useDebounce';
import { useCallback, useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
export const useTableState = (tableName: string) => {
  const atoms = useMemo(() => createTableAtoms(tableName), [tableName]);
  const [tableState, setTableState] = useAtom(atoms.tableState);
  const [searchTerm, setSearchTerm] = useAtom(atoms.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [status, setStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [customFilter, setCustomFilter] = useState('');
  const [customFilterLabel, setCustomFilterLabel] = useState('');
  const [dateRange, setDateRange] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [exportType, setExportType] = useState<string>('');

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setDateRange(dateStrings[0]+'|'+dateStrings[1]);
    } else {
      setDateRange('');
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = useCallback(
    (val: string) => {
      setSearchTerm(val);
    },
    [setSearchTerm]
  );

  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    [setCurrentPage, setPageSize]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSortBy(value);
    },
    [setSortBy]
  );

  const handleSortOrderChange = useCallback(
    (value: string) => {
      setSortOrder(value);
    },
    [setSortOrder]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      setStatus(value);
    },
    [setStatus]
  );

  const handleDateFilterChange = useCallback(
    (value: string) => {
      setDateFilter(value);
    },
    [setDateFilter]
  );

  const handleCustomFilterChange = useCallback(
    (value: string) => {
      setCustomFilter(value);
    },
    [setCustomFilter]
  );

  const handleCustomFilterLabelChange = useCallback(
    (value: string) => {
      setCustomFilterLabel(value);
    },
    [setCustomFilterLabel]
  );

  const handleFilterChange = useCallback(
    (filterKey: string, value: string) => {
      setFilterKey(filterKey);
      setFilterValue(value);
    },
    [setFilterKey, setFilterValue]
  );

  const handleExportChange = useCallback(
    (value: string) => {
      setExportType(value);
    },
    [setExportType]
  );


  const handleReset = () => {
    setTableState(defaultTableState);
    setCurrentPage(1);
    setPageSize(10);
    setSortBy('');
    setSortOrder('');
    setStatus('');
    setDateFilter('');
    setCustomFilter('');
    setDateRange('');
    setFilterKey('');
    setFilterValue('');
    setExportType('');
  };

  return {
    // Full state
    tableState,

    // Individual controls
    // searchTerm,
    searchValue: debouncedSearchTerm,
    setSearch: handleSearch,
    periodFilter: tableState.periodFilter,
    setPeriodFilter: (value: string) =>
      setTableState({ ...tableState, periodFilter: value }),
    // ... other controls

    // Options
    periodOptions: tableState.periodOptions,
    customFilterOptions: tableState.customFilterOptions,

    // Pagination
    currentPage,
    pageSize,
    setPage: handlePageChange,

    // Sorting
    sortBy,
    setSortBy: handleSortChange,
    sortOrder,
    setSortOrder: handleSortOrderChange,
    // Status
    status,
    setStatus: handleStatusChange,

    // Date Filter
    dateFilter,
    setDateFilter: handleDateFilterChange,


    // Filter
    filterKey,
    filterValue,
    handleFilterChange,
    // Custom Filter
    customFilter,
    customFilterLabel,
    setCustomFilter: handleCustomFilterChange,
    setCustomFilterLabel: handleCustomFilterLabelChange,
    customDateRange: dateRange,
    setCustomDateRange: onRangeChange,
    // Reset
    reset: handleReset,

    // Export
    exportType,
    setExportType: handleExportChange,
  };
};
