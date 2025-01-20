import React, { memo } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import { TOption } from '../../../types/filters';

export type TFilter = {
  update: (event: SelectChangeEvent) => void;
  options: TOption[];
  value: string;
  id: string;
  label: string;
  loading?: boolean;
};

type TFiltersProps = {
  stacked?: boolean;
  filters?: TFilter[];
};

const Filters = ({ stacked, filters = [] }: TFiltersProps) => {
  return (
    <Grid
      container
      width="100%"
      wrap={stacked ? 'wrap' : 'nowrap'}
      direction={stacked ? 'column' : 'row'}
      spacing={2}
    >
      {filters.map((filter) => (
        <Grid flexGrow={1} key={filter.id}>
          {filter.loading ? (
            <Skeleton variant="rounded" height={56} width="100%" />
          ) : (
            <FormControl fullWidth>
              <InputLabel id={filter.id}>{filter.label}</InputLabel>
              <Select
                labelId={filter.id}
                value={filter.value}
                onChange={filter.update}
                id="symbol"
              >
                {filter.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Filters);
