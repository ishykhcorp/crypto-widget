import React from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import WidgetConfig from './components/WidgetConfig';
import { ICryptoWidget } from './types/widget';

export const cryptoWidget: ICryptoWidget = {
  init(config) {
    if (!config.containerId) {
      console.error('Missing containerId');
      return;
    }

    let container = document.getElementById(config.containerId);

    if (!container) {
      if (!config.shouldCreateContainerIfNotExist) {
        console.error(`Container with id: ${config.containerId} does not exist.
                    Create container with id in your html page or pass shouldCreateContainerIfNotExist true`);
        return;
      } else {
        const div = document.createElement('div');
        div.id = config.containerId;

        document.body.appendChild(div);
        container = div;
      }
    }

    createRoot(container).render(<WidgetConfig {...config} />);
  },
};

export default cryptoWidget;
