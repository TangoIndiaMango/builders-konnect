import { Dayjs } from 'dayjs';
/**
 * This is the table atom/store.
 * We have some atoms destructured because we want to be able to call them independently in components without getting the whole table state.
 */

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableStateData {
  searchTerm: string;
  periodFilter: string;
  customFilter: string; // for store/order/etc
  startDate: Date | null;
  endDate: Date | null;
  page: number;
  pageSize: number;
  // For configurable options
  periodOptions: FilterOption[];
  customFilterOptions: FilterOption[]; // store/order options
  customFilterLabel?: string; // "Store" or "Order" etc

  // Need to add
  filterKey?: string;
  filterValue?: string;
  sortBy?: string;
  sortOrder?: string;
  limitSize?: number;
  exportType?: string;
  customDateRange?: string;

  // Year picker
  year?: Dayjs | null;

}

// atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const defaultTableState: TableStateData = {
  searchTerm: '',
  periodFilter: 'this_month',
  customFilter: 'all',
  startDate: null,
  endDate: null,
  page: 1,
  pageSize: 10,
  filterKey: '',
  filterValue: '',
  sortBy: '',
  sortOrder: '',
  limitSize: 10,
  exportType: '',
  customDateRange: '',
  periodOptions: [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ],
  customFilterOptions: [],
  year: null,
};

// Main atom storing all table states
export const tablesAtom = atom<Record<string, TableStateData>>({});

// Utility function to create table-specific atoms
export const createTableAtoms = (tableName: string) => {
  // Get specific table state
  const tableStateAtom = atom(
    (get) => get(tablesAtom)[tableName] || defaultTableState,
    (get, set, newState: Partial<TableStateData>) => {
      const current = get(tablesAtom);
      set(tablesAtom, {
        ...current,
        [tableName]: {
          ...current[tableName],
          ...newState,
        },
      });
    }
  );

  // Create focused atoms for specific properties
  const searchAtom = atom(
    (get) => get(tableStateAtom).searchTerm,
    (get, set, newValue: string) => {
      set(tableStateAtom, { searchTerm: newValue });
    }
  );

  const periodFilterAtom = atom(
    (get) => get(tableStateAtom).periodFilter,
    (get, set, newValue: string) => {
      set(tableStateAtom, { periodFilter: newValue });
    }
  );

  const filterKeyAtom = atom(
    (get) => get(tableStateAtom).filterKey,
    (get, set, newValue: string) => {
      set(tableStateAtom, { filterKey: newValue });
    }
  );

  const filterValueAtom = atom(
    (get) => get(tableStateAtom).filterValue,
    (get, set, newValue: string) => {
      set(tableStateAtom, { filterValue: newValue });
    }
  );

  const exportTypeAtom = atom(
    (get) => get(tableStateAtom).exportType,
    (get, set, newValue: string) => {
      set(tableStateAtom, { exportType: newValue });
    }
  );

  const customDateRangeAtom = atom(
    (get) => get(tableStateAtom).customDateRange,
    (get, set, newValue: string) => {
      set(tableStateAtom, { customDateRange: newValue });
    }
  );

  const yearAtom = atom(
    (get) => get(tableStateAtom).year,
    (get, set, newValue: Dayjs | null) => {
      set(tableStateAtom, { year: newValue });
    }
  );


  return {
    tableState: tableStateAtom,
    search: searchAtom,
    periodFilter: periodFilterAtom,
    filterKey: filterKeyAtom,
    filterValue: filterValueAtom,
    exportType: exportTypeAtom,
    customDateRange: customDateRangeAtom,
    year: yearAtom,

    // ... other atoms
  };
};