import React, { memo, useCallback, useMemo } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  chartPointsLimit,
  klineIntervalValueLabelMap,
} from '../../constants/kline';
import { TUseFetchData, useFetchData } from '../../hooks/useFetchData';
import { useInitCssTokensForContainer } from '../../hooks/useInitCssTokensForContainer';
import { useSelectState } from '../../hooks/useSelectState';
import { useWatchHistoricalData } from '../../hooks/useWatchHistoricalData';
import binanceApi from '../../services/binance/API';
import {
  TExchangeInfoResponse,
  THistoricalDataReqParams,
  THistoricalDataResponseItem,
  TSymbol,
} from '../../services/binance/API/types';
import { THistoricalDataSocketParams } from '../../services/binance/ws/types';
import { EKlineIntervalNames } from '../../types/kline';
import type { TCryptoWidgetConfig } from '../../types/widget';
import { parseHistoricalDataResponseToChartData } from './helpers/parsers';
import { TChartDataItem } from './types';

type TFullWidgetProps = Pick<TCryptoWidgetConfig, 'cssTokens' | 'containerId'>;

const FullWidget = ({ containerId, cssTokens }: TFullWidgetProps) => {
  useInitCssTokensForContainer({
    containerId,
    cssTokens,
  });

  const symbolState = useSelectState();
  const intervalState = useSelectState();

  const symbolsFetchConfig = useMemo(
    (): TUseFetchData<TSymbol[], TExchangeInfoResponse, undefined> => ({
      defaultErrorMsg: 'Failed to fetch symbols.',
      parseResponseData: (data) => data.symbols,
      reqPayload: undefined,
      fetchFn: binanceApi.fetchSymbols,
      enable: true,
    }),
    [],
  );

  const symbols = useFetchData(symbolsFetchConfig);

  const historicalFetchConfig = useMemo(
    (): TUseFetchData<
      TChartDataItem[],
      THistoricalDataResponseItem[],
      THistoricalDataReqParams
    > => ({
      defaultErrorMsg: 'Failed to fetch historical data.',
      reqPayload: {
        limit: chartPointsLimit,
        symbol: symbolState.value,
        interval: intervalState.value,
      },
      parseResponseData: (data) => parseHistoricalDataResponseToChartData(data),
      fetchFn: binanceApi.fetchHistoricalData,
      enable: Boolean(symbolState.value && intervalState.value),
    }),
    [symbolState.value, intervalState.value],
  );

  const historicalData = useFetchData(historicalFetchConfig);

  const { setData: setHistoricalData } = historicalData;

  const newHistoricalDataHandler = useCallback<
    THistoricalDataSocketParams['onMessageHandler']
  >(
    (message) => {
      if (message.data.e === 'kline') {
        const { k } = message.data;

        const newPoint = {
          time: new Date(k.t).toLocaleTimeString(),
          price: parseFloat(k.c),
        };

        setHistoricalData((prevState) => {
          const newData = [...(prevState || []), newPoint];
          console.log('newData', newData);

          return newData.length > chartPointsLimit
            ? newData.slice(newData.length - chartPointsLimit)
            : newData;
        });
      }
    },
    [setHistoricalData],
  );

  const watchHistoricalDataPayload = useMemo(
    (): THistoricalDataSocketParams => ({
      symbol: symbolState.value.toLowerCase(),
      onMessageHandler: newHistoricalDataHandler,
      interval: intervalState.value,
    }),
    [symbolState.value, newHistoricalDataHandler, intervalState.value],
  );

  useWatchHistoricalData(true, watchHistoricalDataPayload);

  const errors = useMemo(
    () => [historicalData.error, symbols.error].filter(Boolean),
    [historicalData.error, symbols.error],
  );

  if (symbols.isLoading || historicalData.isLoading) {
    return <Skeleton height={100} animation="wave" />;
  }

  return (
    <Paper sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={2}>
        {errors.length ? (
          errors.map((error, index) => (
            <Grid key={index} size={12}>
              {error}
            </Grid>
          ))
        ) : (
          <>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id="symbol-label">Coin</InputLabel>
                <Select
                  labelId="symbol-label"
                  value={symbolState.value}
                  onChange={symbolState.updateValue}
                  id="symbol"
                >
                  {symbols.data?.map((item) => (
                    <MenuItem key={item.symbol} value={item.symbol}>
                      {item.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id="kline-interval-label">Interval</InputLabel>
                <Select
                  labelId="kline-interval-label"
                  value={intervalState.value}
                  onChange={intervalState.updateValue}
                  id="kline-interval"
                >
                  {Object.keys(klineIntervalValueLabelMap).map(
                    (intervalValue) => (
                      <MenuItem key={intervalValue} value={intervalValue}>
                        {
                          klineIntervalValueLabelMap[
                            intervalValue as EKlineIntervalNames
                          ]
                        }
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </Grid>
            {!!historicalData.data?.length && (
              <Grid size={12} container justifyContent="center" padding={2}>
                <ResponsiveContainer width="90%" height={250}>
                  <LineChart
                    data={historicalData.data}
                    margin={{
                      top: 40,
                      left: 40,
                      right: 40,
                      bottom: 40,
                    }}
                  >
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#8884d8"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default memo(FullWidget);
