import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerLayout>
      <SpinnerBox></SpinnerBox>
    </SpinnerLayout>
  );
};

export default Spinner;

const SpinnerLayout = styled.section`
  margin: 0 auto;
  width: 100%;
`;

const SpinnerBox = styled.div`
  width: 6rem;
  height: 6rem;
  margin: 2rem auto;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
