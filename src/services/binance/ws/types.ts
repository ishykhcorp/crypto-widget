export type THistoricalDataSocketParams = {
  symbol: string;
  interval: string;
  onMessageHandler: (message: {
    data: {
      e: string;
      k: {
        o: string;
        t: number;
        c: string;
      };
    };
    stream: string;
  }) => void;
};
