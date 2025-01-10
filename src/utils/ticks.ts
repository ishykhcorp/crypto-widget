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

export function formatTicks(value: number, interval: string) {
  switch (interval) {
    case EKlineIntervalNames['1MIN']:
    case EKlineIntervalNames['3MIN']:
    case EKlineIntervalNames['5MIN']:
    case EKlineIntervalNames['15MIN']:
    case EKlineIntervalNames['30MIN']: {
      if (isSameHour(value, Date.now())) {
        return format(value, 'mm:ss');
      }

      return format(value, 'HH:mm:ss');
    }
    case EKlineIntervalNames['1HOUR']:
    case EKlineIntervalNames['2HOURS']:
    case EKlineIntervalNames['4HOURS']:
    case EKlineIntervalNames['6HOURS']:
    case EKlineIntervalNames['8HOURS']:
    case EKlineIntervalNames['12HOURS']: {
      if (isSameDay(value, Date.now())) {
        return format(value, 'HH:mm');
      }

      return format(value, 'EEEEEE HH:mm');
    }
    case EKlineIntervalNames['1DAY']:
    case EKlineIntervalNames['3DAYS']:
    case EKlineIntervalNames['1WEEK']: {
      if (isSameWeek(value, Date.now())) {
        return format(value, 'EEEEEE');
      }

      if (isSameMonth(value, Date.now())) {
        return format(value, 'do EEEEEE');
      }

      return format(value, 'MMM do EEEEEE');
    }
    default: {
      if (isSameYear(value, Date.now())) {
        return format(value, 'MMM');
      }

      return format(value, 'yyyy MMM');
    }
  }
}
