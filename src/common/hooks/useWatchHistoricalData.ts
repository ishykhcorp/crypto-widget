import { useEffect } from 'react';

import { connectToBinanceHistoricalDataSocket } from '../../services/binance/ws';
import { THistoricalDataSocketParams } from '../../services/binance/ws/types';

export function useWatchHistoricalData(
  enable: boolean,
  payload: THistoricalDataSocketParams,
) {
  useEffect(() => {
    if (!enable || !Object.values(payload).every(Boolean)) {
      return;
    }

    const ws = connectToBinanceHistoricalDataSocket(payload);

    return () => {
      ws.close();
    };
  }, [enable, payload]);
}
