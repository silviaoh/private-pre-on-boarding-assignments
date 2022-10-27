import React from 'react';
import styled from 'styled-components';

const Input = ({ label = '', ...range }) => {
  return (
    <React.Fragment>
      {label && <Label>{label}</Label>}
      <Text {...range} />
    </React.Fragment>
  );
};

export default Input;

const Label = styled.label`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1rem;
  padding-bottom: 0.3rem;
  padding-left: 0.4rem;
  font-size: 0.8rem;
`;

const Text = styled.input`
  width: 100%;
  padding: 0.7rem;
  border-radius: 3px;
  background: transparent;
  border: none;
  border-left: 1px solid $white;
  border-top: 1px solid $white;
  backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
`;
