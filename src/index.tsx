import React from 'react';

import { createRoot } from 'react-dom/client';
import WidgetConfig from './components/WidgetConfig';
import {ICryptoWidget} from './types/widget';

const cryptoWidget: ICryptoWidget = {
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

        createRoot(container).render(<WidgetConfig {...config} />)
    },
}


window.CryptoWidget = cryptoWidget;

