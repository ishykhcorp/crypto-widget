import React, { memo, useCallback, useContext, useMemo } from 'react';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import PriceInfo from '../../../../common/components/PriceInfo';
import {
  TUseFetchData,
  useFetchData,
} from '../../../../common/hooks/useFetchData';
import { useWatchHistoricalData } from '../../../../common/hooks/useWatchHistoricalData';
import { chartPointsLimit } from '../../../../constants/kline';
import { FiltersContext } from '../../../../contexts/filters';
import binanceApi from '../../../../services/binance/API';
import {
  THistoricalDataReqParams,
  THistoricalDataResponseItem,
} from '../../../../services/binance/API/types';
import { THistoricalDataSocketParams } from '../../../../services/binance/ws/types';
import { TPriceInfo } from '../../../../types/kline';

const PriceInfoContainer = () => {
  const filtersContext = useContext(FiltersContext);

  if (!filtersContext) {
    throw new Error('Component required FiltersContext');
  }

  const { values } = filtersContext;
  const { symbol, interval } = values;

  const enableDataFetching = Boolean(symbol && interval);

  const historicalFetchConfig = useMemo(
    (): TUseFetchData<
      TPriceInfo | undefined,
      THistoricalDataResponseItem[],
      THistoricalDataReqParams
    > => ({
      defaultErrorMsg: 'Failed to fetch historical data.',
      reqPayload: {
        limit: chartPointsLimit,
        symbol: symbol.split('-')[0],
        interval: interval,
      },
      parseResponseData: (data) => {
        return data.length
          ? {
              currency: '$',
              openPrice: parseFloat(data[data.length - 1][1]),
              currentPrice: parseFloat(data[data.length - 1][4]),
            }
          : undefined;
      },
      fetchFn: binanceApi.fetchHistoricalData,
      enable: enableDataFetching,
    }),
    [symbol, interval, enableDataFetching],
  );

  const { setData, error, isLoading, data } = useFetchData(
    historicalFetchConfig,
  );

  const newHistoricalDataHandler = useCallback<
    THistoricalDataSocketParams['onMessageHandler']
  >(
    (message) => {
      if (message.data.e === 'kline') {
        const { k } = message.data;

        setData({
          currency: '$',
          openPrice: parseFloat(k.o),
          currentPrice: parseFloat(k.c),
        });
      }
    },
    [setData],
  );

  const watchHistoricalDataPayload = useMemo(
    (): THistoricalDataSocketParams => ({
      symbol: symbol.split('-')[0].toLowerCase(),
      onMessageHandler: newHistoricalDataHandler,
      interval,
    }),
    [symbol, newHistoricalDataHandler, interval],
  );

  useWatchHistoricalData(enableDataFetching, watchHistoricalDataPayload);

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
    <Grid container spacing={2} justifyContent="flex-end">
      <Skeleton variant="rounded" width="100%" height={56} />
      <Skeleton variant="rounded" width="70%" height={56} />
    </Grid>
  ) : (
    <PriceInfo
      openPrice={data.openPrice}
      currency={data.currency}
      currentPrice={data.currentPrice}
    />
  );
};

export default memo(PriceInfoContainer);
