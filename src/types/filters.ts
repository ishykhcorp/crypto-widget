export type TFiltersContext = {
  values: Record<string, string>;
  updateFilter: (key: string, value: string) => void;
};

export type TOption = { id: string; label: string };
