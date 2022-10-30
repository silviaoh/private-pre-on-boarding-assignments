import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import NotHaveData from '../components/NotHaveData';
import Spinner from '../components/Spinner';

const withCheckPageState = (DisplayComponent, state) => {
  if (state.isLoading) {
    return <Spinner />;
  }

  if (state.isError) {
    return <ErrorBoundary />;
  } else if (state.isNotHaveData) {
    return <NotHaveData />;
  } else {
    return DisplayComponent;
  }
};

export default withCheckPageState;
