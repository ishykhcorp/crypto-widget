export type TRateLimit = {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
};

export type TSymbol = {
  symbol: string;
  [key: string]: unknown;
};

export type TExchangeInfoResponse = {
  symbols: TSymbol[];
};

export type THistoricalDataReqParams = {
  interval: string;
  limit: number;
  symbol: string;
};

export type THistoricalDataResponseItem = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];
