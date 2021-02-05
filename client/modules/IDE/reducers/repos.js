import * as ActionTypes from '../../../constants';

const repos = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_GH_REPOS:
      return action.payload;
    default:
      return state;
  }
};

export default repos;
