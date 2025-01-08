import { THistoricalDataSocketParams } from './types';

export const connectToBinanceHistoricalDataSocket = ({
  symbol,
  interval,
  onMessageHandler,
}: THistoricalDataSocketParams): WebSocket => {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${symbol}@kline_${interval}`,
  );

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data) as Parameters<
      typeof onMessageHandler
    >[0];
    console.log('parsedData', parsedData);
    onMessageHandler(parsedData);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = (event) => {
    console.log(`WebSocket closed: ${event.code}, ${event.reason}`);
  };

  return ws;
};
