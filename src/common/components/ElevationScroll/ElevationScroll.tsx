import React, { memo, use } from 'react';

import { useScrollTrigger } from '@mui/material';

import { WidgetContext } from '../../../contexts/widget';

type TElevationScrollProps = {
  children?: React.ReactElement<{ elevation?: number }>;
};

const ElevationScroll = ({ children }: TElevationScrollProps) => {
  const ctx = use(WidgetContext);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: ctx?.containerId
      ? document.getElementById(ctx?.containerId) || undefined
      : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
};

export default memo(ElevationScroll);
