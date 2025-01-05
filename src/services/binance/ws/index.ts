import {
  THistoricalDataSocketEventData,
  THistoricalDataSocketParams,
} from './types';

export const connectToBinanceHistoricalDataSocket = ({
  symbol,
  onMessageHandler,
}: THistoricalDataSocketParams): WebSocket => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event: MessageEvent<THistoricalDataSocketEventData>) => {
    onMessageHandler(JSON.parse(event.data).p);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = (event) => {
    console.log(`WebSocket closed: ${event.code}, ${event.reason}`);
  };

  return ws;
};
