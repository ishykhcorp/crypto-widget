import { SetStateAction, Dispatch } from 'react';

export enum ECryptoWidgetType {
  COMPACT = 'compact',
  FULL = 'full',
}

export type TCryptoWidgetConfig = {
  type: ECryptoWidgetType;
  containerId: string;
  shouldCreateContainerIfNotExist?: boolean;
  mode?: 'light' | 'dark';
};

export interface ICryptoWidget {
  init: (config: TCryptoWidgetConfig) => void;
}

export type TWidgetContext = {
  containerId: string;
} | null;

export type TColorMode = 'light' | 'dark' | undefined;

export type TColorModeContext = {
  colorMode: TColorMode;
  setColorMode: Dispatch<SetStateAction<TColorMode>>;
};
