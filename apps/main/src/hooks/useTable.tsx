/**
 * This hook is used to manage various states. But you can also use the atom directly.
 * e.g you want only search
 * const {searchValue, setSearch} = useTableState('tableName')
 * pass it into the SearchInput component
 * <SearchInput value={searchValue} onChange={setSearch} />
 * =====******======
 * using the atom directly
 * const [search, setSearch] = useAtom(atoms.search);
 * <Input value={search} onChange={(e) => setSearch(e.target.value)} />
 */


import { useAtom } from 'jotai';
import { createTableAtoms, defaultTableState } from '../app/store/table';
import useDebounce from './useDebounce';
import { useCallback, useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';

export const useTableState = (tableName: string) => {
  const atoms = useMemo(() => createTableAtoms(tableName), [tableName]);
  const [tableState, setTableState] = useAtom(atoms.tableState);
  const [searchTerm, setSearchTerm] = useAtom(atoms.search);
  const [status, setStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [customFilter, setCustomFilter] = useState('');
  const [customFilterLabel, setCustomFilterLabel] = useState('');
  const [dateRange, setDateRange] = useAtom(atoms.customDateRange);
  const [filterKey, setFilterKey] = useAtom(atoms.filterKey);
  const [filterValue, setFilterValue] = useAtom(atoms.filterValue);
  const [exportType, setExportType] = useAtom(atoms.exportType);

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setDateRange(dateStrings[0] + '|' + dateStrings[1]);
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
    (page: number) => {
      setTableState({ ...tableState, page });
    },
    [setTableState]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setTableState({ ...tableState, sortBy: value });
    },
    [setTableState]
  );

  const handleSortOrderChange = useCallback(
    (value: string) => {
      setTableState({ ...tableState, sortOrder: value });
    },
    [setTableState]
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

  const handleLimitSizeChange = useCallback(
    (page: number, pageSize: number) => {
      setTableState({ ...tableState, page, pageSize });
    },
    [setTableState]
  );

  const handleReset = () => {
    setTableState(defaultTableState);
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
    currentPage: tableState.page,
    pageSize: tableState.pageSize,
    setPage: handlePageChange,

    // Sorting
    sortBy: tableState.sortBy,
    setSortBy: handleSortChange,
    sortOrder: tableState.sortOrder,
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

    // Limit Size
    limitSize: tableState.limitSize,
    setLimitSize: handleLimitSizeChange,
  };
};
