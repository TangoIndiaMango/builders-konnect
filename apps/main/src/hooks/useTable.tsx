import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { createTableAtoms, defaultTableState, FilterOption } from '../app/store/table';

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

  useEffect(() => {
    if (config) {
      if (
        tableState.customFilterOptions !== config.customFilterOptions ||
        tableState.customFilterLabel !== config.customFilterLabel
      ) {
        setTableState({
          ...tableState,
          customFilterOptions: config.customFilterOptions || [],
          customFilterLabel: config.customFilterLabel,
        });
      }
    }
  }, [config, setTableState, tableState]);

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
