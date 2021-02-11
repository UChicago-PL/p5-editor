import * as ActionTypes from '../../../constants';

const repos = (state = { loadState: 'not-loaded', repos: [] }, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_GH_REPOS:
      return { repos: action.payload, loadState: 'loaded' };
    case ActionTypes.RECEIVE_GH_REPOS_ERROR:
      return { ...state, loadState: 'error' };
    case ActionTypes.LOADING_GH_REPOS:
      return { ...state, loadState: 'loading' };
    default:
      return state;
  }
};

export default repos;
