import React, { memo, useCallback, useMemo, useState } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

import FiltersContainer from '../../../../common/components/FiltersContainer';
import { FiltersContext } from '../../../../contexts/filters';
import { TFiltersContext } from '../../../../types/filters';
import PriceInfoContainer from '../PriceInfoContainer';

type TItemBoxProps = {
  handleRemove: (id: string) => void;
  id: string;
};

const ItemBox = ({ handleRemove, id }: TItemBoxProps) => {
  const onRemoveBtnClick = useCallback(() => {
    handleRemove(id);
  }, [handleRemove, id]);
  const [filters, setFilters] = useState<TFiltersContext['values']>({
    symbol: '',
    interval: '',
  });

  const filtersContextValue = useMemo(
    (): TFiltersContext => ({
      values: filters,
      updateFilter: (key, value) =>
        setFilters((prev) => ({
          ...prev,
          [key]: value,
        })),
    }),
    [filters],
  );

  return (
    <Paper
      sx={{
        minHeight: 160,
        borderRadius: 4,
        padding: 2,
      }}
      elevation={8}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <FiltersContext value={filtersContextValue}>
          <Grid size={6}>
            <FiltersContainer />
          </Grid>
          <Grid size={4}>
            <PriceInfoContainer />
          </Grid>
        </FiltersContext>
        <Grid size={1}>
          <IconButton
            color="error"
            onClick={onRemoveBtnClick}
            aria-label="remove item"
          >
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(ItemBox);
