import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FlexBox, FlexStyle } from '../styles/common';

const IssueItem = ({ issue }) => {
  const getCreateDate = useCallback(() => {
    const date = new Date(issue?.created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }, [issue?.created_at]);

  const createdAt = getCreateDate();
  return (
    <SingleIssueItem justifyContent="space-between" gap="0.4rem">
      <FlexBox
        flexDirection="column"
        justifyContent="space-between"
        gap="1.2rem"
      >
        <FlexBox gap="0.4rem">
          <TitleH2>#{issue?.number}</TitleH2>
          <TitleH2>{issue?.title}</TitleH2>
        </FlexBox>
        <span>
          작성자: {issue?.user?.login}, 작성일: {createdAt}
        </span>
      </FlexBox>
      <span>코멘트: {issue?.comments}</span>
    </SingleIssueItem>
  );
};

export default IssueItem;

const SingleIssueItem = styled.li`
  ${FlexStyle}
  width: 100%;
  padding: 1rem 0;

  & {
    border-bottom: 1px solid #000;
  }

  span {
    font-size: 1.2rem;
    white-space: nowrap;
  }
`;

const TitleH2 = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
`;
