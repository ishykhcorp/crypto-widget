import { THistoricalDataResponseItem } from '../../../services/binance/API/types';
import { TChartDataItem } from '../types';

export const parseHistoricalDataResponseToChartData = (
  responseData: THistoricalDataResponseItem[],
): TChartDataItem[] =>
  responseData.map(([time, _open, _high, _low, close]) => ({
    time: new Date(time).toLocaleTimeString(),
    price: parseFloat(close),
  }));
