import axios from 'axios';

import {
  TExchangeInfoResponse,
  THistoricalDataReqParams,
  THistoricalDataResponseItem,
} from './types';

const binanceApi = {
  fetchSymbols: () =>
    axios.get<TExchangeInfoResponse>(
      'https://api.binance.com/api/v3/exchangeInfo',
    ),

  fetchHistoricalData: (params: THistoricalDataReqParams) =>
    axios.get<THistoricalDataResponseItem[]>(
      'https://api.binance.com/api/v3/klines',
      {
        params,
      },
    ),
};

export default binanceApi;
