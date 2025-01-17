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

import { useSelectState } from '../../common/hooks/useSelectState';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { useSymbolsFilter } from '../../hooks/useSymbolsFilter';
import { EKlineIntervalNames } from '../../types/kline';
import { formatTicks, generateTicks } from '../../utils/ticks';
import CustomTooltip from '../CustomTooltip';
import LineSkins from '../LineSkins';
import FullFilters from './components/FullFilters';
import { TFullFiltersProps } from './components/FullFilters/FullFilters';

const colorStopsForLine = [
  '#f69c3d',
  '#497493',
  '#1b95ca',
  '#2ea07b',
  '#f5922f',
];

const FullWidget = () => {
  const intervalState = useSelectState();
  const symbols = useSymbolsFilter();
  const { filter: symbolFilter } = symbols;

  const historicalData = useHistoricalData({
    symbol: symbolFilter.value,
    interval: intervalState.value,
  });

  const errors = useMemo(
    () => [historicalData.error, symbols.error].filter(Boolean),
    [historicalData.error, symbols.error],
  );

  const timeTicks = useMemo(
    () => generateTicks(historicalData.data || [], intervalState.value),
    [historicalData.data, intervalState.value],
  );

  const tickFormatter = useCallback(
    (value: number): string =>
      formatTicks(value, intervalState.value as EKlineIntervalNames),
    [intervalState.value],
  );

  const theme = useTheme();

  const axisColor = theme.palette.text.primary;

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
