import { ICryptoWidget } from "./widget";

declare global {
    interface Window {
        CryptoWidget: ICryptoWidget;
    }
}

declare module "*.module.css";