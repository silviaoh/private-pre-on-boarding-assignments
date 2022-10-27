import React from 'react';
import styled from 'styled-components';

const Button = props => {
  const {
    type = 'button',
    onClick = undefined,
    disabled = false,
    children,
    styles,
  } = props;
  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      disabled={disabled}
      styles={styles}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button`
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.blue};

  &:disabled {
    opacity: 0.3;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
