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
  cssTokens: {
    '--bg-color': '#92dedc',
    '--text-color': '#de7e7c',
  },
  shouldCreateContainerIfNotExist: true,
});

cryptoWidget.init({
  containerId: 'root2',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  cssTokens: {
    '--bg-color': '#81daca',
    '--text-color': '#005451',
  },
});

cryptoWidget.init({
  containerId: 'root3',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  cssTokens: {
    '--bg-color': '#ebbe4d',
    '--text-color': '#453306',
  },
});

cryptoWidget.init({
  containerId: 'root4',
  // @ts-expect-error test for dev
  type: 'full',
  shouldCreateContainerIfNotExist: true,
  cssTokens: {
    '--bg-color': '#dea193',
    '--text-color': '#401f18',
  },
});
