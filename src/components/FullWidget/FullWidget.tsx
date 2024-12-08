import React, { memo } from "react";
import type { TCryptoWidgetConfig } from "../../types/widget";
import { useInitCssTokensForContainer } from "../../hooks/useInitCssTokensForContainer";

import * as style from "./style.module.css";

type TFullWidgetProps = Pick<TCryptoWidgetConfig, 'cssTokens' | 'containerId'>;


const FullWidget = ({containerId, cssTokens}: TFullWidgetProps) => {
    useInitCssTokensForContainer({
        containerId,
        cssTokens,
    });

    return <div className={style.container}>
        <p className={style.text}>Full widget for container: {containerId}</p>
        <p className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Consequuntur, rerum iusto voluptates placeat qui temporibus magnam perferendis commodi! 
            Voluptatem error expedita neque cupiditate non in? In eos est dolorum aspernatur.</p>
    </div>
};

export default memo(FullWidget);