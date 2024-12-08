export enum ECryptoWidgetType {
    COMPACT = 'compact',
    FULL = 'full'
};

export enum ECryptoWidgetTokens {
    BG_COLOR = '--bg-color',
    TEXT_COLOR = '--text-color'
}


export type TCryptoWidgetConfig = {
    type: ECryptoWidgetType;
    containerId: string;
    shouldCreateContainerIfNotExist?: boolean;
    cssTokens?: Record<ECryptoWidgetTokens, string>;
}

export interface ICryptoWidget {
    init: (config: TCryptoWidgetConfig) => void;
}