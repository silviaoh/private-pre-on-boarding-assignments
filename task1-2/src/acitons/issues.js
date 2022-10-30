import state from '../context/state';
import {
  CHECK_IS_END_PAGE,
  GET_ISSUES_ERROR,
  GET_ISSUES_INITIAL_SUCCESS,
  GET_ISSUES_LOADING,
  GET_ISSUES_NEXT_PAGE_SUCCESS,
} from './types';

const { initialState, loadingState, successState, errorState, endPageState } =
  state;

/**
 * 현재 상태와 액션 객체를 받아 새로운 상태를 반환해주는 함수
 * @param {*} state 현재 상태
 * @param {*} action 액션 객체
 * @returns
 */

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ISSUES_LOADING:
      return {
        ...state,
        ...loadingState(state.data, action.nextPage),
      };
    case GET_ISSUES_INITIAL_SUCCESS:
      return {
        ...state,
        ...successState(action.data, action.nextPage),
      };
    case GET_ISSUES_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        ...successState([...state.data, ...action.data], action.nextPage),
      };
    case GET_ISSUES_ERROR:
      return {
        ...state,
        ...errorState(action.error),
      };
    case CHECK_IS_END_PAGE:
      return {
        ...state,
        ...endPageState(state.data),
      };
    default:
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
};

export default reducer;
