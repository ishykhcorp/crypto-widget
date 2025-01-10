import React, { memo } from 'react';

import * as style from './style.module.css';

const CompactWidget = () => {
  return (
    <div className={style.container}>
      <p className={style.text}>Compact widget for container</p>
    </div>
  );
};

export default memo(CompactWidget);
