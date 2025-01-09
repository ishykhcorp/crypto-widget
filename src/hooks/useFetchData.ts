import { useCallback, useEffect, useState } from 'react';

import type { AxiosResponse } from 'axios';

export type TUseFetchData<D, T, P> = {
  reqPayload: P;
  fetchFn: (reqPayload: P) => Promise<AxiosResponse<T>>;
  defaultErrorMsg: string;
  enable: boolean;
  parseResponseData: (data: T) => D;
};

export function useFetchData<D, T, P>({
  reqPayload,
  defaultErrorMsg,
  fetchFn,
  enable,
  parseResponseData,
}: TUseFetchData<D, T, P>) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<D>();

  const fetchData = useCallback(() => {
    setLoading(true);
    fetchFn(reqPayload)
      .then((response) => setData(parseResponseData(response.data)))
      .catch((err: Error) => {
        if (err && 'message' in Error) {
          setError(err.message);
        } else {
          setError(defaultErrorMsg);
        }
      })
      .finally(() => setLoading(false));
  }, [reqPayload, fetchFn, parseResponseData, defaultErrorMsg]);

  useEffect(() => {
    if (enable) {
      fetchData();
    }
  }, [fetchData, enable]);

  return { data, isLoading, error, setData };
}
