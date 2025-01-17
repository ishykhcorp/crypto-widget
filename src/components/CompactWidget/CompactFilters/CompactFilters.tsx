import React, { memo } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { klineIntervalValueLabelMap } from '../../../constants/kline';
import { TSymbol } from '../../../services/binance/API/types';
import { EKlineIntervalNames } from '../../../types/kline';

export type TFullFiltersProps = {
  symbolConfig: {
    value: string;
    options: TSymbol[];
    update: (event: SelectChangeEvent) => void;
  };
  intervalConfig: {
    value: string;
    update: (event: SelectChangeEvent) => void;
  };
};

const compactIntervals = [
  EKlineIntervalNames['15MIN'],
  EKlineIntervalNames['1HOUR'],
  EKlineIntervalNames['1DAY'],
  EKlineIntervalNames['3DAYS'],
];

const compactIntervalValueLabelMap = Object.keys(
  klineIntervalValueLabelMap,
).filter((intervalName) =>
  compactIntervals.includes(intervalName as EKlineIntervalNames),
);

const CompactFilters = ({
  symbolConfig,
  intervalConfig,
}: TFullFiltersProps) => (
  <Grid container width="100%" spacing={2} padding={2}>
    <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="symbol-label">Coin</InputLabel>
        <Select
          labelId="symbol-label"
          value={symbolConfig.value}
          onChange={symbolConfig.update}
          id="symbol"
        >
          {symbolConfig.options.map((item) => (
            <MenuItem key={item.symbol} value={item.symbol}>
              {item.symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="kline-interval-label">Interval</InputLabel>
        <Select
          labelId="kline-interval-label"
          value={intervalConfig.value}
          onChange={intervalConfig.update}
          id="kline-interval"
        >
          {compactIntervalValueLabelMap.map((intervalValue) => (
            <MenuItem key={intervalValue} value={intervalValue}>
              {klineIntervalValueLabelMap[intervalValue as EKlineIntervalNames]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default memo(CompactFilters);
