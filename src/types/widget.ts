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
