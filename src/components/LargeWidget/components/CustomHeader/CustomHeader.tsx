import React, { memo, use, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ContrastIcon from '@mui/icons-material/Contrast';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Clock from '../../../../common/components/Clock/Clock';
import Header from '../../../../common/components/Header/Header';
import { ColorModeContext } from '../../../../contexts/colorMode';

type TCustomHeaderProps = {
  handleAddNewCoin: () => void;
};

const CustomHeader = ({ handleAddNewCoin }: TCustomHeaderProps) => {
  const { setColorMode } = use(ColorModeContext);
  const [groupName, setGroupName] = useState<string>('');

  return (
    <Header>
      <Grid
        container
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid container spacing={2} padding={2}>
          <TextField
            label="Coins group title"
            type="text"
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddNewCoin}
            startIcon={<AddBoxIcon />}
          >
            Add new coin
          </Button>
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
