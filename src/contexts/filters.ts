import { createContext } from 'react';

import { TFiltersContext } from '../types/filters';

export const FiltersContext = createContext<TFiltersContext>({
  values: {},
  updateFilter: () => {},
});
