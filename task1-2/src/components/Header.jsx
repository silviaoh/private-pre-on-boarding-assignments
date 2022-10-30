import React from 'react';
import styled from 'styled-components';
import { FlexStyle } from '../styles/common';

const Header = () => {
  return (
    <HeaderLayout justifyContent="center" alignItems="center">
      <HeaderH1>Angular/Angular-cli</HeaderH1>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.header`
  ${FlexStyle}
  width: 100%;
  padding: 1.2rem 0;
`;

const HeaderH1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
