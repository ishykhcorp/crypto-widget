import React, { memo, useEffect, useMemo, useState } from 'react';

import { Typography } from '@mui/material';

import { format } from 'date-fns';

type TClockProps = {
  timeFormat?: string;
  dateFormat?: string;
};

const Clock = ({
  timeFormat = 'HH:mm:ss',
  dateFormat = 'd/M/yyyy',
}: TClockProps) => {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const clockParts = useMemo(
    () =>
      time
        ? {
            timezone: format(time, 'zzzz'),
            date: format(time, dateFormat),
            time: format(time, timeFormat),
          }
        : {
            timezone: '----',
            date: '--/--/----',
            time: '--:--:--',
          },
    [time, dateFormat, timeFormat],
  );

  return (
    <>
      <Typography variant="subtitle2" color="primary" component="span">
        {clockParts.timezone}
      </Typography>
      <Typography variant="subtitle2" color="primary" component="span">
        {clockParts.date}
      </Typography>
      <Typography variant="subtitle2" color="primary" component="span">
        {clockParts.time}
      </Typography>
    </>
  );
};

export default memo(Clock);
