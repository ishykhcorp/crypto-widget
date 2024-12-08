import React, { memo } from "react";
import type { TCryptoWidgetConfig } from "../../types/widget";
import { useInitCssTokensForContainer } from "../../hooks/useInitCssTokensForContainer";

type TCompactWidgetProps = Pick<TCryptoWidgetConfig, 'cssTokens' | 'containerId'>;

import * as style from "./style.module.css";

const CompactWidget = ({ cssTokens, containerId }: TCompactWidgetProps) => {
    useInitCssTokensForContainer({
        containerId,
        cssTokens,
    });

    return <div className={style.container}>
        <p className={style.text}>Compact widget for container: {containerId}</p>
    </div>;
};

export default memo(CompactWidget);