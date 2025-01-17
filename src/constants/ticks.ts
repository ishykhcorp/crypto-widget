import { EKlineIntervalNames } from '../types/kline';

export const minuteIntervals = new Set<EKlineIntervalNames>([
  EKlineIntervalNames['1MIN'],
  EKlineIntervalNames['3MIN'],
  EKlineIntervalNames['5MIN'],
  EKlineIntervalNames['15MIN'],
  EKlineIntervalNames['30MIN'],
]);

export const hoursIntervals = new Set<EKlineIntervalNames>([
  EKlineIntervalNames['1HOUR'],
  EKlineIntervalNames['2HOURS'],
  EKlineIntervalNames['4HOURS'],
  EKlineIntervalNames['6HOURS'],
  EKlineIntervalNames['8HOURS'],
  EKlineIntervalNames['12HOURS'],
]);

export const daysIntervals = new Set<EKlineIntervalNames>([
  EKlineIntervalNames['1DAY'],
  EKlineIntervalNames['3DAYS'],
  EKlineIntervalNames['1WEEK'],
]);
