import React, { memo, useCallback, useState, useEffect } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useInitCssTokensForContainer } from '../../hooks/useInitCssTokensForContainer';
import binanceApi from '../../services/binance/API';
import { TExchangeInfoResponse } from '../../services/binance/API/types';
import { connectToBinanceHistoricalDataSocket } from '../../services/binance/ws';
import type { TCryptoWidgetConfig } from '../../types/widget';
import { parseHistoricalDataResponseToChartData } from './helpers/parsers';
import { TChartDataItem } from './types';

type TFullWidgetProps = Pick<TCryptoWidgetConfig, 'cssTokens' | 'containerId'>;

const FullWidget = ({ containerId, cssTokens }: TFullWidgetProps) => {
  useInitCssTokensForContainer({
    containerId,
    cssTokens,
  });

  const [exchangeInfo, setExchangeInfo] =
    useState<TExchangeInfoResponse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [data, setData] = useState<TChartDataItem[]>([]);

  useEffect(() => {
    setLoading(true);
    binanceApi
      .fetchSymbols()
      .then((response) => setExchangeInfo(response.data))
      .catch((err: Error) => {
        if (err && 'message' in Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch symbols.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchHistoricalData = useCallback(() => {
    if (!selectedSymbol) return;

    setLoading(true);
    binanceApi
      .fetchHistoricalData({
        symbol: selectedSymbol,
        limit: 100,
        interval: '5m',
      })
      .then((response) =>
        setData(parseHistoricalDataResponseToChartData(response.data)),
      )
      .catch((err: Error) => {
        if (err && 'message' in Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch historical data.');
        }
      })
      .finally(() => setLoading(false));
  }, [selectedSymbol]);

  useEffect(() => {
    if (!selectedSymbol) return;

    fetchHistoricalData();

    const ws = connectToBinanceHistoricalDataSocket({
      symbol: selectedSymbol.toLowerCase(),
      onMessageHandler: (price) =>
        setData((prevState) => [
          ...prevState.slice(-99),
          { time: new Date().toLocaleTimeString(), price: parseFloat(price) },
        ]),
    });

    return () => {
      ws.close();
    };
  }, [selectedSymbol, fetchHistoricalData]);

  const handleSelectSymbol = useCallback((e: SelectChangeEvent) => {
    setSelectedSymbol(e.target.value);
  }, []);

  if (isLoading) {
    return <Skeleton animation="wave" />;
  }

  return (
    <Paper sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={2}>
        {error ? (
          <Grid size={12}>{error}</Grid>
        ) : (
          <>
            <Grid size={2}>
              <Paper>
                <FormControl fullWidth>
                  <InputLabel id="symbol-label">Coin</InputLabel>
                  <Select
                    labelId="symbol-label"
                    value={selectedSymbol}
                    onChange={handleSelectSymbol}
                    id="symbol"
                  >
                    {exchangeInfo?.symbols.map((item) => (
                      <MenuItem key={item.symbol} value={item.symbol}>
                        {item.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            {!!data.length && (
              <Grid size={12} container justifyContent="center" padding={2}>
                <ResponsiveContainer width="90%" height={250}>
                  <LineChart
                    data={data}
                    margin={{
                      top: 40,
                      left: 40,
                      right: 40,
                      bottom: 40,
                    }}
                  >
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#8884d8"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Paper>

    // <div className={style.container}>
    //   <p className={style.text}>Full widget for container: {containerId}</p>
    //   <p className={style.text}>
    //     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur,
    //     rerum iusto voluptates placeat qui temporibus magnam perferendis
    //     commodi! Voluptatem error expedita neque cupiditate non in? In eos est
    //     dolorum aspernatur.
    //   </p>
    // </div>
  );
};

export default memo(FullWidget);
