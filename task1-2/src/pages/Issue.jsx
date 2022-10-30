import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import IssueItem from '../components/IssueItem';
import {
  IssueDispatchContext,
  IssueStateContext,
  getIssue,
} from '../context/IssueContext';
import useGetContextState from '../hooks/useGetContextState';
import { FlexStyle } from '../styles/common';
import withCheckPageState from '../hoc/withCheckPageState';

const Issue = () => {
  const { pathId } = useParams();
  const issueState = useGetContextState(IssueStateContext);
  const dispatch = useGetContextState(IssueDispatchContext);

  useEffect(() => {
    getIssue(Number(pathId), dispatch);
  }, [pathId, dispatch]);
  console.log(issueState);
  return withCheckPageState(
    <IssueLayout flexDirection="column" alignItems="center" gap="0.8rem">
      <React.Fragment>
        <IssueTitleSection gap="0.8rem">
          <ImageBox>
            <img src={issueState.data?.user?.avatar_url || ''} alt="profile" />
          </ImageBox>
          <ul>
            <IssueItem issue={issueState.data} />
          </ul>
        </IssueTitleSection>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issueState.data?.body}
          </ReactMarkdown>
        </div>
      </React.Fragment>
    </IssueLayout>,
    {
      isLoading: issueState.isLoading,
      isError:
        issueState.isError && issueState.error?.data?.message !== 'Not Found',
      isNotHaveData: issueState.error?.data?.message === 'Not Found',
    }
  );
};

export default Issue;

const IssueLayout = styled.main`
  ${FlexStyle}
  padding: 2rem 2.1rem;
  min-height: 45rem;
`;

const IssueTitleSection = styled.section`
  ${FlexStyle}
  width: 70%;

  > ul {
    width: 100%;
  }

  @media screen and (max-width: 340px) {
    width: 100%;
  }
`;

const ImageBox = styled.div`
  width: 6rem;
  height: 6rem;
  min-width: 6rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
