import type { TitleValuePair } from '@/models/common';
import type { TodoTableData } from '@/models/todo';

export const applyFilters = (
  originalList: TodoTableData[],
  selectedStatus: TitleValuePair[]
): TodoTableData[] => {
  const matchFilter = (filters: TitleValuePair[], property: string): boolean => {
    return filters.length === 0 || filters.some((filter) => filter.value === property);
  };

  return originalList.filter((list) => matchFilter(selectedStatus, list.status));
};
