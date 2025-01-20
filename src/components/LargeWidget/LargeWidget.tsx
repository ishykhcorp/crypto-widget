import React, { memo, useCallback } from 'react';

import Grid from '@mui/material/Grid2';

import NoDataMessage from '../../common/components/NoDataMessage/NoDataMessage';
import { useArray } from '../../common/hooks/useArray';
import { getUniqueId } from '../../utils/ids';
import CustomHeader from './components/CustomHeader';
import ItemBox from './components/ItemBox';

const LargeWidget = () => {
  const { items, pushItem, removeItem } = useArray<string>();

  const handleAddNewCoin = useCallback(
    () => pushItem(getUniqueId()),
    [pushItem],
  );

  return (
    <>
      <CustomHeader handleAddNewCoin={handleAddNewCoin} />
      {items.length ? (
        <Grid container bgcolor="background.default" padding={2} spacing={2}>
          {items.map((id) => (
            <Grid
              key={id}
              size={{
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
              }}
            >
              <ItemBox id={id} handleRemove={removeItem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoDataMessage />
      )}
    </>
  );
};

export default memo(LargeWidget);
