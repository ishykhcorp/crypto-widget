import React, { memo, useCallback, useMemo, useState } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import FiltersContainer from '../../../../common/components/FiltersContainer/FiltersContainer';
import { FiltersContext } from '../../../../contexts/filters';
import { TFiltersContext } from '../../../../types/filters';
import CoinInfoContainer from '../CoinInfoContainer';
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
        minHeight: 330,
        borderRadius: 4,
        padding: 2,
      }}
      elevation={8}
    >
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <FiltersContext value={filtersContextValue}>
          <Grid size={5}>
            <Grid container spacing={2} direction="column">
              <CoinInfoContainer />
              <FiltersContainer stacked={false} />
            </Grid>
          </Grid>
          <Grid size={6}>
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
