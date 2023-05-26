import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface IState {
  error: boolean;
}

class ErrorBoundary extends Component<Props, IState> {
  public static getDerivedStateFromError(err: IState['error']): IState {
    return { error: err };
  }

  public state: IState = {
    error: false,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error');
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    return (
      <>
        {this.state.error && <div>Error</div>}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
