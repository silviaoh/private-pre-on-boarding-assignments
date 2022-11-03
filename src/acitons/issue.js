import state from '../context/state';
import { GET_ISSUE_ERROR, GET_ISSUE_LOADING, GET_ISSUE_SUCCESS } from './types';

const { initialState, loadingState, successState, errorState } = state;

/**
 * 현재 상태와 액션 객체를 받아 새로운 상태를 반환해주는 함수
 * @param {*} state 현재 상태
 * @param {*} action 액션 객체
 * @returns
 */
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ISSUE_LOADING:
      return {
        ...state,
        ...loadingState(state.data, action.nextPage),
      };
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        ...successState(action.data, action.nextPage),
      };
    case GET_ISSUE_ERROR:
      return {
        ...state,
        ...errorState(action.error),
      };
    default:
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
};
export default reducer;
