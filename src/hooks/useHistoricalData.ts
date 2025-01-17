import { useCallback, useMemo } from 'react';

import { TUseFetchData, useFetchData } from '../common/hooks/useFetchData';
import { useWatchHistoricalData } from '../common/hooks/useWatchHistoricalData';
import { parseHistoricalDataResponseToChartData } from '../components/FullWidget/helpers/parsers';
import { TChartDataItem } from '../components/FullWidget/types';
import { chartPointsLimit } from '../constants/kline';
import binanceApi from '../services/binance/API';
import {
  THistoricalDataReqParams,
  THistoricalDataResponseItem,
} from '../services/binance/API/types';
import { THistoricalDataSocketParams } from '../services/binance/ws/types';

type TUseHistoricalData = {
  symbol: string;
  interval: string;
};

export function useHistoricalData({ symbol, interval }: TUseHistoricalData) {
  const historicalFetchConfig = useMemo(
    (): TUseFetchData<
      TChartDataItem[],
      THistoricalDataResponseItem[],
      THistoricalDataReqParams
    > => ({
      defaultErrorMsg: 'Failed to fetch historical data.',
      reqPayload: {
        limit: chartPointsLimit,
        symbol: symbol,
        interval: interval,
      },
      parseResponseData: (data) => parseHistoricalDataResponseToChartData(data),
      fetchFn: binanceApi.fetchHistoricalData,
      enable: Boolean(symbol && interval),
    }),
    [symbol, interval],
  );

  const { setData, error, isLoading, data } = useFetchData(
    historicalFetchConfig,
  );

  const newHistoricalDataHandler = useCallback<
    THistoricalDataSocketParams['onMessageHandler']
  >(
    (message) => {
      if (message.data.e === 'kline') {
        const { k } = message.data;

        const newPoint = {
          price: parseFloat(k.c),
          time: k.t,
        };

        setData((prevState) => {
          const newData = [...(prevState || []), newPoint];

          return newData.length > chartPointsLimit
            ? newData.slice(newData.length - chartPointsLimit)
            : newData;
        });
      }
    },
    [setData],
  );

  const watchHistoricalDataPayload = useMemo(
    (): THistoricalDataSocketParams => ({
      symbol: symbol.toLowerCase(),
      onMessageHandler: newHistoricalDataHandler,
      interval,
    }),
    [symbol, newHistoricalDataHandler, interval],
  );

  useWatchHistoricalData(true, watchHistoricalDataPayload);

  return {
    data,
    error,
    isLoading,
  };
}
