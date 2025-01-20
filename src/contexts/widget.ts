import { createContext } from 'react';

import { TWidgetContext } from '../types/widget';

export const WidgetContext = createContext<TWidgetContext>(null);
