import React, { memo, use } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ContrastIcon from '@mui/icons-material/Contrast';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Clock from '../../../../common/components/Clock/Clock';
import Header from '../../../../common/components/Header/Header';
import { ColorModeContext } from '../../../../contexts/colorMode';

type TCustomHeaderProps = {
  handleAddNewCoin: () => void;
};

const CustomHeader = ({ handleAddNewCoin }: TCustomHeaderProps) => {
  const { setColorMode } = use(ColorModeContext);

  return (
    <Header>
      <Grid container width="100%" justifyContent="space-between">
        <Grid>
          <IconButton
            color="primary"
            onClick={handleAddNewCoin}
            aria-label="Add new coin"
          >
            <AddBoxIcon />
          </IconButton>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center" gap={0.5}>
          <Clock />
        </Grid>
        <Grid>
          <IconButton
            color="primary"
            onClick={() =>
              setColorMode((mode) => (mode === 'light' ? 'dark' : 'light'))
            }
            aria-label="Switch theme"
          >
            <ContrastIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Header>
  );
};

export default memo(CustomHeader);
