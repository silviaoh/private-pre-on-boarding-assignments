import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IssueItem from '../components/IssueItem';
import useGetContextState from '../hooks/useGetContextState';
import {
  IssuesStateContext,
  IssuesDispatchContext,
  getIssues,
} from '../context/IssuesContext';
import Spinner from '../components/Spinner';
import withCheckPageState from '../hoc/withCheckPageState';
import { FlexStyle } from '../styles/common';

const Issues = () => {
  const observerRef = useRef(null);
  const dispatch = useGetContextState(IssuesDispatchContext);
  const issuesState = useGetContextState(IssuesStateContext);

  useEffect(() => {
    const isEnabledAPICall = !issuesState.data;
    if (isEnabledAPICall) getIssues(0, dispatch);
  }, []);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await getIssues(issuesState.nextPage, dispatch);
        observer.observe(entry.target);
      }
    },
    [issuesState.nextPage, dispatch]
  );

  useEffect(() => {
    const isNotEndPage = issuesState.nextPage !== 0;
    const isEnabledObserver =
      observerRef?.current && isNotEndPage && !issuesState.isLoading;

    let io;
    const observerBoundary = observerRef?.current;

    if (isEnabledObserver) {
      io = new IntersectionObserver(onIntersect, { threshold: 1 });
      io.observe(observerBoundary);
    }

    return () => io && io.disconnect();
  }, [issuesState.isLoading, issuesState.nextPage, onIntersect]);

  return withCheckPageState(
    <IssuesLayout flexDirection="column" alignItems="center" gap="0.8rem">
      <IssuesList>
        {issuesState.data?.map((issue, issueIdx) => (
          <React.Fragment key={`${issue.id}${issueIdx}`}>
            <Link to={`/issue/${issue.number}`}>
              <IssueItem issue={issue} />
            </Link>
            {issueIdx === 4 && (
              <>
                <a href="https://www.wanted.co.kr" target="_blank">
                  <ImageBox>
                    <img
                      src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                      alt="banner"
                    />
                  </ImageBox>
                </a>
              </>
            )}
          </React.Fragment>
        ))}
        {issuesState.isLoading ? (
          <Spinner />
        ) : (
          <ObserverBox ref={observerRef} />
        )}
      </IssuesList>
    </IssuesLayout>,
    {
      isLoading: issuesState.isLoading && issuesState.nextPage === 0,
      isError: issuesState.isError,
      isNotHaveData: !issuesState.isError && issuesState.data?.length === 0,
    }
  );
};

export default Issues;

const IssuesLayout = styled.main`
  ${FlexStyle}
  padding: 2rem 2.1rem;
  border-top: 1px solid #989898;
`;

const IssuesList = styled.ul`
  width: 70%;

  @media screen and (max-width: 340px) {
    width: 100%;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 20rem;
  margin: 2rem 0;
  > img {
    margin-left: 10%;
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
`;

const ObserverBox = styled.div``;
