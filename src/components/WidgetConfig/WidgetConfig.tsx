import React, { lazy, memo, Suspense } from "react";
import { ECryptoWidgetType } from "../../types/widget";
import type { TCryptoWidgetConfig } from "../../types/widget";
import ErrorBoundary from "../ErrorBoundary";

const CompactWidget = lazy(() => import('../CompactWidget'));
const FullWidget = lazy(() => import('../FullWidget'));

const WidgetConfig = (props: TCryptoWidgetConfig) => {
    let widget = null;

    switch (props.type) {
        case ECryptoWidgetType.COMPACT: {
            widget = <CompactWidget containerId={props.containerId} cssTokens={props.cssTokens} />
            break;
        }
        case ECryptoWidgetType.FULL: {
            widget = <FullWidget containerId={props.containerId} cssTokens={props.cssTokens} />
            break;
        }
        default: {
            throw new Error(`Unknown type of widget: ${props.type}`);
        }
    }

    return <ErrorBoundary>
        <Suspense fallback="Loading...">{widget}</Suspense>
    </ErrorBoundary>;
}

export default memo(WidgetConfig);