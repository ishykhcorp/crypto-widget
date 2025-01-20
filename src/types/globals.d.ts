import { ICryptoWidget } from './widget';

declare global {
  interface Window {
    cryptoWidget: ICryptoWidget;
  }
}

declare module '*.module.css';
