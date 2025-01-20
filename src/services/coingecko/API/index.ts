import axios from 'axios';

import { TCoinsInfoReqParams, TCoinsResponse } from './types';

const coingeckoApi = {
  fetchCoinsInfo: (params: TCoinsInfoReqParams) =>
    axios.get<TCoinsResponse>('https://api.coingecko.com/api/v3/search', {
      params,
    }),
};

export default coingeckoApi;
