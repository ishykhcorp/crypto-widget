import React, { memo } from 'react';

import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

type TPriceInfoProps = {
  currentPrice: number;
  openPrice: number;
  currency: string;
};

const PriceInfo = ({ currentPrice, openPrice, currency }: TPriceInfoProps) => {
  const percentageChange = ((currentPrice - openPrice) / openPrice) * 100;
  const isUp = percentageChange > 0;

  return (
    <Grid container spacing={2} direction="column">
      <Grid>
        <Typography variant="h6" component="span">
          {currentPrice}
          {currency}
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        {isUp ? (
          <NorthEastIcon color="success" />
        ) : (
          <SouthWestIcon color="error" />
        )}
        <Typography
          variant="button"
          component="span"
          color={isUp ? 'success' : 'error'}
        >
          {`${isUp ? '+' : '-'}${Math.abs(percentageChange).toFixed(2)}%`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(PriceInfo);
