import React, { memo } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Paper from '@mui/material/Paper';

import type { TooltipProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import { formatTicks } from '../../utils/ticks';

const CustomTooltip = (
  props: TooltipProps<ValueType, NameType> & { interval: string },
) =>
  props.active && props.payload?.length ? (
    <Paper elevation={3}>
      <List>
        <ListItem>
          <ListItemIcon>
            <PriceChangeIcon />
          </ListItemIcon>
          <ListItemText primary={props.payload[0].payload.price} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText
            primary={formatTicks(props.payload[0].payload.time, props.interval)}
          />
        </ListItem>
      </List>
    </Paper>
  ) : null;

export default memo(CustomTooltip);
