import {
  addMilliseconds,
  addMonths,
  format,
  isBefore,
  isEqual,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameWeek,
  isSameYear,
  startOfMonth,
} from 'date-fns';

import type { TChartDataItem } from '../components/FullWidget/types';
import { klineIntervalInMillisecondsYearIndependent } from '../constants/kline';
import {
  daysIntervals,
  hoursIntervals,
  minuteIntervals,
} from '../constants/ticks';
import {
  EKlineIntervalNames,
  TKlineIntervalNamesYearIndependent,
} from '../types/kline';

export function generateTicks(
  chartData: TChartDataItem[],
  interval: TKlineIntervalNamesYearIndependent,
) {
  if (!chartData.length) return [];

  const ticks = [];

  if (interval === EKlineIntervalNames['1MONTH']) {
    let currentDate = startOfMonth(new Date(chartData[0].time));
    const endDate = startOfMonth(
      new Date(chartData[chartData.length - 1].time),
    );

    while (
      isBefore(currentDate, endDate) ||
      currentDate.getTime() === endDate.getTime()
    ) {
      ticks.push(currentDate.getTime());
      currentDate = addMonths(currentDate, 1);
    }
  } else {
    const startTime = new Date(chartData[0].time);
    const endTime = new Date(chartData[chartData.length - 1].time);

    const step = klineIntervalInMillisecondsYearIndependent[interval];

    let currentTime = startTime;

    while (isBefore(currentTime, endTime) || isEqual(currentTime, endTime)) {
      ticks.push(currentTime.getTime());
      currentTime = addMilliseconds(currentTime, step);
    }
  }

  return ticks;
}

export function formatTicks(value: number, interval: EKlineIntervalNames) {
  const now = Date.now();

  if (minuteIntervals.has(interval)) {
    return isSameHour(value, now)
      ? format(value, 'mm:ss')
      : format(value, 'HH:mm:ss');
  }

  if (hoursIntervals.has(interval)) {
    return isSameDay(value, now)
      ? format(value, 'HH:mm')
      : format(value, 'EEEEEE HH:mm');
  }

  if (daysIntervals.has(interval)) {
    if (isSameWeek(value, now)) {
      return format(value, 'EEEEEE');
    }

    return isSameMonth(value, now)
      ? format(value, 'do EEEEEE')
      : format(value, 'MMM do EEEEEE');
  }

  return isSameYear(value, now)
    ? format(value, 'MMM')
    : format(value, 'yyyy MMM');
}
