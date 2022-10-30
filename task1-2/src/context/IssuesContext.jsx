import React, { createContext, useReducer } from 'react';
import reducer from '../acitons/issues';
import { getIssuesAPI } from '../api';
import state from './state';

const { initialState } = state;
export const IssuesStateContext = createContext([]);
export const IssuesDispatchContext = createContext(null);

export const IssuesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IssuesDispatchContext.Provider value={dispatch}>
      <IssuesStateContext.Provider value={state}>
        {children}
      </IssuesStateContext.Provider>
    </IssuesDispatchContext.Provider>
  );
};

export const getIssues = async (page = 0, dispatch) => {
  try {
    dispatch({ type: 'GET_ISSUES_LOADING', nextPage: page });
    const issuesAPIData = await getIssuesAPI(page);
    console.log(issuesAPIData);
    dispatch({
      type:
        page === 0
          ? 'GET_ISSUES_INITIAL_SUCCESS'
          : 'GET_ISSUES_NEXT_PAGE_SUCCESS',
      data: issuesAPIData,
      nextPage: page + 1,
    });

    if (issuesAPIData?.data?.length === 0) {
      dispatch({ type: 'CHECK_IS_END_PAGE', data: issuesAPIData });
      return;
    }
  } catch (e) {
    dispatch({ type: 'GET_ISSUES_ERROR', error: e });
  }
};
