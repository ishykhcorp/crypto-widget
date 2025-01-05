export type THistoricalDataSocketParams = {
  symbol: string;
  onMessageHandler: (price: string) => void;
};

export type THistoricalDataSocketEventData = {
  p: string;
};
