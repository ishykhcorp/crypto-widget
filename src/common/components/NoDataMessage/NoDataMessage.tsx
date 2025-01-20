import React, { memo } from 'react';

import FolderOffIcon from '@mui/icons-material/FolderOff';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const NoDataMessage = () => (
  <Grid
    container
    justifyContent="center"
    direction="column"
    alignItems="center"
    textAlign="center"
    spacing={2}
    padding={2}
    bgcolor="background.default"
  >
    <Grid size={6}>
      <FolderOffIcon color="info" fontSize="large" />
    </Grid>
    <Grid size={6}>
      <Typography variant="h5" color="info" component="p">
        No data to show
      </Typography>
    </Grid>
  </Grid>
);

export default memo(NoDataMessage);
