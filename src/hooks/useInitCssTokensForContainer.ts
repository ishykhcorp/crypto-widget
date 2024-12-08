import { useEffect } from "react";
import type { TCryptoWidgetConfig } from "../types/widget";
import { allowedCssTokens } from "../constants/cssTokens";
import { isCssTokenExist } from "../utils/token";

type TUseCssTokensForContainer = Pick<TCryptoWidgetConfig, 'cssTokens' | 'containerId'>

export function useInitCssTokensForContainer({containerId, cssTokens}: TUseCssTokensForContainer) {
    useEffect(() => {
        const container = document.getElementById(containerId);

        if (container) {
            allowedCssTokens.forEach(tokenName => {
                container.style.removeProperty(tokenName);
            });

            if (cssTokens && typeof cssTokens === 'object') {
                Object.entries(cssTokens).filter(
                    ([tokenName]) => isCssTokenExist(tokenName)
                ).forEach(([tokenName, tokenValue]) => {
                    container.style.setProperty(tokenName, tokenValue);
                });
            }
        }
    }, [cssTokens, containerId]);
}