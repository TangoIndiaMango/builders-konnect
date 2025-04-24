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

  // For configurable options
  periodOptions: FilterOption[];
  customFilterOptions: FilterOption[]; // store/order options
  customFilterLabel?: string; // "Store" or "Order" etc
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
  periodOptions: [
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Year', value: 'this_year' },
    { label: 'Custom Range', value: 'custom' },
  ],
  customFilterOptions: [],
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

  // ... other specific atoms

  return {
    tableState: tableStateAtom,
    search: searchAtom,
    periodFilter: periodFilterAtom,
    // ... other atoms
  };
};