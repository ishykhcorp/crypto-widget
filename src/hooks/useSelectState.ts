import { useCallback, useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

export function useSelectState(initialValue?: string) {
  const [value, setValue] = useState<string>(initialValue || '');

  const updateValue = useCallback((event: SelectChangeEvent) => {
    setValue(event.target.value);
  }, []);

  return { value, updateValue };
}
