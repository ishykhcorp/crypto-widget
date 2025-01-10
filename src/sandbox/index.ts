import { cryptoWidget } from '..';

cryptoWidget.init({
  containerId: 'root',
  // @ts-expect-error test for dev
  type: 'compact',
  cssTokens: {
    '--bg-color': '#d3d3d3',
    '--text-color': '#363636',
  },
});

cryptoWidget.init({
  containerId: 'root1',
  // @ts-expect-error test for dev
  type: 'compact',
  mode: 'dark',
  shouldCreateContainerIfNotExist: true,
});

cryptoWidget.init({
  containerId: 'root2',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  mode: 'light',
});

cryptoWidget.init({
  containerId: 'root3',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  mode: 'dark',
});

cryptoWidget.init({
  containerId: 'root4',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  mode: 'dark',
});
