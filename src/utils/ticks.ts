import {
  format,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameWeek,
  isSameYear,
} from 'date-fns';

import {
  daysIntervals,
  hoursIntervals,
  minuteIntervals,
} from '../constants/ticks';
import { EKlineIntervalNames } from '../types/kline';

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
