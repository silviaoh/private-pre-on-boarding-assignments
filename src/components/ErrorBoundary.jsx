import React from 'react';
import styled from 'styled-components';
import { FlexStyle } from '../styles/common';

const ErrorBoundary = () => {
  return (
    <ErrorBoundaryLayout justifyContent="center" alignItems="center" gap="1rem">
      <ErrorH1>Error</ErrorH1>
      <ContentH1>에러가 발생했습니다. 잠시 후에 다시 시도해주세요.</ContentH1>
    </ErrorBoundaryLayout>
  );
};

export default ErrorBoundary;

const ErrorBoundaryLayout = styled.section`
  ${FlexStyle}
  margin: 0 auto;
  width: 70%;

  @media screen and (max-width: 340px) {
    width: 100%;
  }
`;

const ErrorH1 = styled.h1`
  color: red;
  font-weight: 600;
  font-size: 2rem;
`;

const ContentH1 = styled.h1`
  font-weight: 600;
  font-size: 1.6rem;
`;
