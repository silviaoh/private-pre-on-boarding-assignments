import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexStyle } from '../styles/common';

const Error404Page = () => {
  return (
    <ErrorsPageBox>
      <img src="/images/error.png" alt="error" />
      <ErrorH1>에러입니다.</ErrorH1>
      <ErrorP></ErrorP>
      <Link to="/">돌아가기</Link>
    </ErrorsPageBox>
  );
};

export default Error404Page;

const ErrorsPageBox = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  text-align: center;
  background-color: white;
  padding: 150px 0;
  img {
    width: 100%;
    max-width: 300px;
  }
  > a {
    margin-top: 50px;
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 10px 20px;
    background-color: #0e0f0f;
    border-radius: 5px;
  }
`;
const ErrorH1 = styled.h1`
  font-size: 50px;
  font-weight: 700;
  line-height: 100px;
`;
const ErrorP = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
`;
