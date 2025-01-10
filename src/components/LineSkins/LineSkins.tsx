import React, { memo, useMemo } from 'react';

import { visuallyHidden } from '@mui/utils';

type TSkinProps = {
  colorStops: string[];
  name: string;
};

const LineSkins = ({ name, colorStops }: TSkinProps) => {
  const offsetWithColorStops = useMemo(
    () =>
      colorStops.length === 1
        ? [
            {
              offset: '0%',
              color: colorStops[0],
            },
            {
              offset: '100%',
              color: colorStops[0],
            },
          ]
        : colorStops.map((color, index, { length }) => ({
            offset:
              index === length - 1 ? `100%` : `${(100 / length) * index}%`,
            color,
          })),
    [colorStops],
  );

  return (
    <svg style={visuallyHidden}>
      <defs>
        <linearGradient id={name} x1="0%" y1="100%" x2="0%" y2="0%">
          {offsetWithColorStops.map(({ color, offset }) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(LineSkins);
