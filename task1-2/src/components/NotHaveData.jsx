import React from 'react';
import styled from 'styled-components';
import { FlexStyle } from '../styles/common';

const NotHaveData = () => {
  return (
    <NoDataSection justifyContent="center" alignItems="center">
      ❌ 데이터를 찾을 수 없습니다.
    </NoDataSection>
  );
};

export default NotHaveData;

const NoDataSection = styled.section`
  ${FlexStyle}
  height: 30rem;
  font-weight: 600;
  font-size: 2rem;
`;
