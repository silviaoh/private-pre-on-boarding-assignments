import React, { createContext, useReducer } from 'react';

import { getIssueAPI } from '../api';
import reducer from '../acitons/issue';
import state from './state';
const { initialState } = state;

export const IssueStateContext = createContext([]);
export const IssueDispatchContext = createContext(null);

export const IssueContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IssueDispatchContext.Provider value={dispatch}>
      <IssueStateContext.Provider value={state}>
        {children}
      </IssueStateContext.Provider>
    </IssueDispatchContext.Provider>
  );
};

export const getIssue = async (id, dispatch) => {
  try {
    dispatch({ type: 'GET_ISSUE_LOADING' });
    const issueAPIData = await getIssueAPI(id, dispatch);

    dispatch({
      type: 'GET_ISSUE_SUCCESS',
      data: issueAPIData,
    });
  } catch (e) {
    console.log('e', e);
    dispatch({ type: 'GET_ISSUE_ERROR', error: e });
  }
};
