export type TCoinsInfoReqParams = {
  query: string;
};

export type TCoinResponseItem = {
  symbol: string;
  thumb: string;
  large: string;
};

export type TCoinsResponse = {
  coins: Array<TCoinResponseItem>;
};
