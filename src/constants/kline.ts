import {
  EKlineIntervalNames,
  TKlineIntervalNamesYearIndependent,
} from '../types/kline';

export const klineIntervalValueLabelMap: Record<EKlineIntervalNames, string> = {
  [EKlineIntervalNames['1MIN']]: '1 Minute',
  [EKlineIntervalNames['3MIN']]: '3 Minutes',
  [EKlineIntervalNames['5MIN']]: '5 Minutes',
  [EKlineIntervalNames['15MIN']]: '15 Minutes',
  [EKlineIntervalNames['30MIN']]: '30 Minutes',
  [EKlineIntervalNames['1HOUR']]: '1 Hour',
  [EKlineIntervalNames['2HOURS']]: '2 Hours',
  [EKlineIntervalNames['4HOURS']]: '4 Hours',
  [EKlineIntervalNames['6HOURS']]: '6 Hours',
  [EKlineIntervalNames['8HOURS']]: '8 Hours',
  [EKlineIntervalNames['12HOURS']]: '12 Hours',
  [EKlineIntervalNames['1DAY']]: '1 Day',
  [EKlineIntervalNames['3DAYS']]: '3 Days',
  [EKlineIntervalNames['1WEEK']]: '1 Week',
  [EKlineIntervalNames['1MONTH']]: '1 Month',
};

export const klineIntervalInMillisecondsYearIndependent: Record<
  TKlineIntervalNamesYearIndependent,
  number
> = {
  [EKlineIntervalNames['1MIN']]: 60 * 1000,
  [EKlineIntervalNames['3MIN']]: 3 * 60 * 1000,
  [EKlineIntervalNames['5MIN']]: 5 * 60 * 1000,
  [EKlineIntervalNames['15MIN']]: 15 * 60 * 1000,
  [EKlineIntervalNames['30MIN']]: 30 * 60 * 1000,
  [EKlineIntervalNames['1HOUR']]: 60 * 60 * 1000,
  [EKlineIntervalNames['2HOURS']]: 2 * 60 * 60 * 1000,
  [EKlineIntervalNames['4HOURS']]: 4 * 60 * 60 * 1000,
  [EKlineIntervalNames['6HOURS']]: 6 * 60 * 60 * 1000,
  [EKlineIntervalNames['8HOURS']]: 8 * 60 * 60 * 1000,
  [EKlineIntervalNames['12HOURS']]: 12 * 60 * 60 * 1000,
  [EKlineIntervalNames['1DAY']]: 24 * 60 * 60 * 1000,
  [EKlineIntervalNames['3DAYS']]: 3 * 24 * 60 * 60 * 1000,
  [EKlineIntervalNames['1WEEK']]: 7 * 24 * 60 * 60 * 1000,
};

export const chartPointsLimit = 200;
