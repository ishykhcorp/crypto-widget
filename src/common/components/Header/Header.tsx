import React, { memo, PropsWithChildren } from 'react';

import { AppBar, Toolbar } from '@mui/material';

import ElevationScroll from '../ElevationScroll';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
        })}
      >
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default memo(Header);
