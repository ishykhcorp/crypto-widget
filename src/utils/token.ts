import { allowedCssTokens } from "../constants/cssTokens";
import type { ECryptoWidgetTokens } from "../types/widget"

export const isCssTokenExist = (token: any): token is ECryptoWidgetTokens[] => {
    return allowedCssTokens.indexOf(token) !== -1;
}