import React, { memo, useCallback, useContext, useMemo } from 'react';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import PriceChart from '../../../../common/components/PriceChart';
import PriceInfo from '../../../../common/components/PriceInfo/PriceInfo';
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
import { TChartItem, TPriceInfo } from '../../../../types/kline';

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
      | (TPriceInfo & {
          chartData: TChartItem[];
        })
      | undefined,
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
              chartData: data.map(([time, _open, _high, _low, close]) => ({
                time,
                price: parseFloat(close),
              })),
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

        const newDataItem: TChartItem = {
          time: k.t,
          price: parseFloat(k.c),
        };

        setData((prevState) => {
          const newData = [...(prevState?.chartData || []), newDataItem];

          return {
            chartData:
              newData.length > chartPointsLimit
                ? newData.slice(newData.length - chartPointsLimit)
                : newData,
            currency: '$',
            openPrice: parseFloat(k.o),
            currentPrice: parseFloat(k.c),
          };
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
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Grid flexGrow={2}>
        <Skeleton height={200} width="100%" />
      </Grid>
      <Grid flexGrow={1} container spacing={2} justifyContent="flex-end">
        <Skeleton variant="rounded" width="100%" height={56} />
        <Skeleton variant="rounded" width="70%" height={56} />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2}>
      <PriceChart data={data.chartData} />
      <PriceInfo
        openPrice={data.openPrice}
        currency={data.currency}
        currentPrice={data.currentPrice}
      />
    </Grid>
  );
};

export default memo(PriceInfoContainer);
