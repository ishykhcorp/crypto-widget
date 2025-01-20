import React, { memo, useContext, useMemo } from 'react';

import { intervalOptions } from '../../../constants/kline';
import { FiltersContext } from '../../../contexts/filters';
import binanceApi from '../../../services/binance/API';
import {
  TExchangeInfoResponse,
  TSymbol,
} from '../../../services/binance/API/types';
import { TUseFetchData, useFetchData } from '../../hooks/useFetchData';
import Filters from '../Filters';
import { TFilter } from '../Filters/Filters';

type TFiltersContainerProps = {
  stacked?: boolean;
};

const FiltersContainer = ({ stacked = true }: TFiltersContainerProps) => {
  const symbolsFetchConfig = useMemo(
    (): TUseFetchData<TSymbol[], TExchangeInfoResponse, undefined> => ({
      defaultErrorMsg: 'Failed to fetch symbols.',
      parseResponseData: (data) => data.symbols,
      reqPayload: undefined,
      fetchFn: binanceApi.fetchSymbols,
      enable: true,
    }),
    [],
  );

  const symbols = useFetchData(symbolsFetchConfig);

  const filtersContext = useContext(FiltersContext);

  if (!filtersContext) {
    throw new Error('Component required FiltersContext');
  }

  const { values, updateFilter } = filtersContext;

  const symbolsOptions = useMemo(() => {
    return (symbols.data || []).map((item) => ({
      id: `${item.symbol}-${item.baseAsset}-${item.quoteAsset}`,
      label: item.symbol,
    }));
  }, [symbols.data]);

  const filters: TFilter[] = [
    {
      id: 'symbol',
      label: 'Coin',
      loading: symbols.isLoading,
      value: values.symbol,
      update: (event) => updateFilter('symbol', event.target.value),
      options: symbolsOptions,
    },
    {
      id: 'interval',
      label: 'Interval',
      update: (event) => updateFilter('interval', event.target.value),
      value: values.interval,
      options: intervalOptions,
    },
  ];

  return <Filters stacked={stacked} filters={filters} />;
};

export default memo(FiltersContainer);
