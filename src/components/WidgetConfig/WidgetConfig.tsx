import React, { lazy, memo, Suspense, useMemo, useEffect } from 'react';

import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  useColorScheme,
} from '@mui/material';

import { ECryptoWidgetType } from '../../types/widget';
import type { TCryptoWidgetConfig } from '../../types/widget';
import ErrorBoundary from '../ErrorBoundary';

const CompactWidget = lazy(() => import('../CompactWidget'));
const FullWidget = lazy(() => import('../FullWidget'));

const WidgetConfig = ({
  mode,
  type,
}: Pick<TCryptoWidgetConfig, 'mode' | 'type'>) => {
  let widget = null;
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(mode || 'light');
  }, [setMode, mode]);

  switch (type) {
    case ECryptoWidgetType.COMPACT: {
      widget = <CompactWidget />;
      break;
    }
    case ECryptoWidgetType.FULL: {
      widget = <FullWidget />;
      break;
    }
    default: {
      throw new Error(`Unknown type of widget: ${type}`);
    }
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>{widget}</Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default memo(WidgetConfig);
