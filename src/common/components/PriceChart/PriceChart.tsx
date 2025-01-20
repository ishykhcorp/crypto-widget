import React, { memo, use } from 'react';

import { green } from '@mui/material/colors';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ColorModeContext } from '../../../contexts/colorMode';
import { FiltersContext } from '../../../contexts/filters';
import { TChartItem } from '../../../types/kline';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

type TPriceChartProps = {
  data: TChartItem[];
};

const PriceChart = ({ data }: TPriceChartProps) => {
  const filtersContext = use(FiltersContext);
  const { colorMode } = use(ColorModeContext);

  if (!filtersContext) {
    throw new Error('Component required FiltersContext');
  }

  const { values } = filtersContext;
  const { interval } = values;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <XAxis hide dataKey="time" />
        <Tooltip
          content={(tooltipProps) => (
            <CustomTooltip {...tooltipProps} interval={interval} />
          )}
        />
        <YAxis hide />
        <Area
          type="monotone"
          dataKey="price"
          stroke={colorMode === 'light' ? green['900'] : green['A400']}
          strokeWidth={2}
          opacity={0.2}
          fill={colorMode === 'light' ? green['600'] : green['A200']}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(PriceChart);
