import React, {
  lazy,
  memo,
  Suspense,
  useMemo,
  useEffect,
  useState,
} from 'react';

import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';

import { ColorModeContext } from '../../contexts/colorMode';
import { WidgetContext } from '../../contexts/widget';
import {
  ECryptoWidgetType,
  TColorMode,
  TColorModeContext,
} from '../../types/widget';
import type { TCryptoWidgetConfig } from '../../types/widget';
import ErrorBoundary from '../ErrorBoundary';

const SmallWidget = lazy(() => import('../SmallWidget'));
const LargeWidget = lazy(() => import('../LargeWidget'));

const WidgetConfig = ({
  mode,
  type,
  containerId,
}: Pick<TCryptoWidgetConfig, 'mode' | 'type' | 'containerId'>) => {
  let widget = null;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useState<TColorMode>(mode);

  const colorModeContextValue = useMemo(
    (): TColorModeContext => ({
      colorMode,
      setColorMode,
    }),
    [colorMode],
  );

  useEffect(() => {
    setColorMode((prevMode) => {
      if (!prevMode) {
        return prefersDarkMode ? 'dark' : 'light';
      }

      return prevMode;
    });
  }, [prefersDarkMode]);

  switch (type) {
    case ECryptoWidgetType.COMPACT: {
      widget = <SmallWidget />;
      break;
    }
    case ECryptoWidgetType.FULL: {
      widget = <LargeWidget />;
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
          mode: colorMode,
        },
      }),
    [colorMode],
  );

  return (
    <ColorModeContext value={colorModeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <WidgetContext
              value={{
                containerId,
              }}
            >
              {widget}
            </WidgetContext>
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </ColorModeContext>
  );
};

export default memo(WidgetConfig);
