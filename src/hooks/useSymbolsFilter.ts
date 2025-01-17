import { useMemo } from 'react';

import { TUseFetchData, useFetchData } from '../common/hooks/useFetchData';
import { useSelectState } from '../common/hooks/useSelectState';
import { TFullFiltersProps } from '../components/FullWidget/components/FullFilters/FullFilters';
import binanceApi from '../services/binance/API';
import { TExchangeInfoResponse, TSymbol } from '../services/binance/API/types';

export function useSymbolsFilter() {
  const { value, updateValue } = useSelectState();
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

  const { error, isLoading, data } = useFetchData(symbolsFetchConfig);

  const filter = useMemo(
    (): TFullFiltersProps['symbolConfig'] => ({
      value,
      update: updateValue,
      options: data || [],
    }),
    [data, value, updateValue],
  );

  return {
    filter,
    error,
    isLoading,
  };
}
