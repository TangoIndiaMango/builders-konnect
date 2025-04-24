import { useAtom } from 'jotai';
import { createTableAtoms, defaultTableState } from '../app/store/table';
import { FilterOption } from '../app/store/table';
import { useEffect } from 'react';

export const useTableState = (
  tableName: string,
  config?: {
    customFilterOptions?: FilterOption[];
    customFilterLabel?: string;
  }
) => {
  const atoms = createTableAtoms(tableName);
  const [tableState, setTableState] = useAtom(atoms.tableState);
  const [searchTerm, setSearchTerm] = useAtom(atoms.search);
  // ... other atoms

  // Initialize with config if provided
  useEffect(() => {
    if (config) {
      setTableState({
        ...tableState,
        customFilterOptions: config.customFilterOptions || [],
        customFilterLabel: config.customFilterLabel,
      });
    }
  }, [config]);

  return {
    // Full state
    tableState,

    // Individual controls
    searchTerm,
    setSearchTerm,
    periodFilter: tableState.periodFilter,
    setPeriodFilter: (value: string) =>
      setTableState({ ...tableState, periodFilter: value }),
    // ... other controls

    // Options
    periodOptions: tableState.periodOptions,
    customFilterOptions: tableState.customFilterOptions,

    // Reset
    reset: () => setTableState(defaultTableState),
  };
};
