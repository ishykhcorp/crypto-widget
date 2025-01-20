import type { PropsWithChildren } from 'react';
import React, { Component } from 'react';

import { Typography } from '@mui/material';

type TState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<PropsWithChildren, TState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): TState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('From ErrorBoundary: ', error);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Typography color="error">
          {error?.message || 'Smth went wrong'}
        </Typography>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
