import React, { memo, useContext, useMemo } from 'react';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import CoinInfo from '../../../../common/components/CoinInfo';
import {
  TUseFetchData,
  useFetchData,
} from '../../../../common/hooks/useFetchData';
import { FiltersContext } from '../../../../contexts/filters';
import coingeckoApi from '../../../../services/coingecko/API';
import {
  TCoinsInfoReqParams,
  TCoinsResponse,
} from '../../../../services/coingecko/API/types';

const CoinInfoContainer = () => {
  const filtersContext = useContext(FiltersContext);

  if (!filtersContext) {
    throw new Error('Component required FiltersContext');
  }

  const { values } = filtersContext;
  const { symbol } = values;

  const enableDataFetching = Boolean(symbol);

  const [_, baseAsset] = symbol.split('-');

  const coinsInfoConfig = useMemo(
    (): TUseFetchData<
      string | undefined,
      TCoinsResponse,
      TCoinsInfoReqParams
    > => ({
      defaultErrorMsg: 'Failed to fetch historical data.',
      reqPayload: {
        query: baseAsset,
      },
      parseResponseData: (data) => {
        const coin = data.coins.find((coin) => coin.symbol === baseAsset);
        return coin ? coin.thumb : undefined;
      },
      fetchFn: coingeckoApi.fetchCoinsInfo,
      enable: enableDataFetching,
    }),
    [baseAsset, enableDataFetching],
  );

  const { error, isLoading, data } = useFetchData(coinsInfoConfig);

  if (error) {
    return (
      <Grid container spacing={2} alignItems="center">
        <ReportProblemIcon color="error" />
        <Typography variant="body2" color="error" component="span">
          {error}
        </Typography>
      </Grid>
    );
  }

  return !data || isLoading ? (
    <Grid container spacing={2} wrap="nowrap" alignItems="center">
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={150} height={56} />
    </Grid>
  ) : (
    <CoinInfo coinImageUrl={data} coinName={baseAsset} />
  );
};

export default memo(CoinInfoContainer);
