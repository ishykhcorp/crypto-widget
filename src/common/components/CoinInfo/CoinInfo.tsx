import React, { memo } from 'react';

import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

type TCoinInfoProps = {
  coinImageUrl?: string;
  coinName: string;
};

const CoinInfo = ({ coinImageUrl, coinName }: TCoinInfoProps) => {
  return (
    <Grid container spacing={2} alignItems="center">
      {coinImageUrl && (
        <Grid>
          <Avatar sx={{ width: 50, height: 50 }} src={coinImageUrl} />
        </Grid>
      )}
      <Grid>
        <Typography variant="h5" component="span">
          {coinName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(CoinInfo);
