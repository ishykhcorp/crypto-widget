export type TSymbol = {
  symbol: string;
  quoteAsset: string;
  baseAsset: string;
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
