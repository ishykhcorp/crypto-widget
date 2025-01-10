import React, { memo, useCallback, useMemo } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useTheme,
} from '@mui/material';
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

import { chartPointsLimit } from '../../constants/kline';
import { TUseFetchData, useFetchData } from '../../hooks/useFetchData';
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
import { formatTicks, generateTicks } from '../../utils/ticks';
import CustomTooltip from '../CustomTooltip';
import LineSkins from '../LineSkins';
import FullFilters from './components/FullFilters';
import { TFullFiltersProps } from './components/FullFilters/FullFilters';
import { parseHistoricalDataResponseToChartData } from './helpers/parsers';
import { TChartDataItem } from './types';

const colorStopsForLine = [
  '#f69c3d',
  '#497493',
  '#1b95ca',
  '#2ea07b',
  '#f5922f',
];

const FullWidget = () => {
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
          price: parseFloat(k.c),
          time: k.t,
        };

        setHistoricalData((prevState) => {
          const newData = [...(prevState || []), newPoint];

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

  const timeTicks = useMemo(
    () => generateTicks(historicalData.data || [], intervalState.value),
    [historicalData.data, intervalState.value],
  );

  const tickFormatter = useCallback(
    (value: number): string => formatTicks(value, intervalState.value),
    [intervalState.value],
  );

  const theme = useTheme();

  const axisColor = theme.palette.text.primary;

  const symbolFilter = useMemo(
    (): TFullFiltersProps['symbolConfig'] => ({
      value: symbolState.value,
      update: symbolState.updateValue,
      options: symbols.data || [],
    }),
    [symbols.data, symbolState.value, symbolState.updateValue],
  );

  const intervalFilter = useMemo(
    (): TFullFiltersProps['intervalConfig'] => ({
      value: intervalState.value,
      update: intervalState.updateValue,
    }),
    [intervalState.value, intervalState.updateValue],
  );

  if (symbols.isLoading || historicalData.isLoading) {
    return <Skeleton height={100} animation="wave" />;
  }

  return (
    <Paper sx={{ flexGrow: 1 }}>
      {errors.length ? (
        <Grid container spacing={2} padding={2}>
          {errors.map((error, index) => (
            <Grid key={index} size={12}>
              {error}
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <FullFilters
                intervalConfig={intervalFilter}
                symbolConfig={symbolFilter}
              />
            </AccordionSummary>
            <AccordionDetails>
              {!!historicalData.data?.length && (
                <Grid
                  size={12}
                  width="100%"
                  container
                  justifyContent="center"
                  padding={2}
                >
                  <LineSkins
                    name="binance-skin"
                    colorStops={colorStopsForLine}
                  />
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
                      <XAxis
                        dataKey="time"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={tickFormatter}
                        ticks={timeTicks}
                        interval={'preserveStartEnd'}
                        type="number"
                        stroke={axisColor}
                      />
                      <YAxis
                        domain={['dataMin', 'dataMax']}
                        stroke={axisColor}
                      />
                      <Tooltip
                        content={(tooltipProps) => (
                          <CustomTooltip
                            {...tooltipProps}
                            interval={intervalState.value}
                          />
                        )}
                      />
                      <CartesianGrid stroke="#ccc" />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="url(#binance-skin)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Paper>
  );
};

export default memo(FullWidget);
