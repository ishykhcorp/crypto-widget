export enum EKlineIntervalNames {
  '1MIN' = '1m',
  '3MIN' = '3m',
  '5MIN' = '5m',
  '15MIN' = '15m',
  '30MIN' = '30m',
  '1HOUR' = '1h',
  '2HOURS' = '2h',
  '4HOURS' = '4h',
  '6HOURS' = '6h',
  '8HOURS' = '8h',
  '12HOURS' = '12h',
  '1DAY' = '1d',
  '3DAYS' = '3d',
  '1WEEK' = '1w',
  '1MONTH' = '1M',
}

export type TPriceInfo = {
  currency: string;
  openPrice: number;
  currentPrice: number;
};

export type TChartItem = {
  time: number;
  price: number;
};
