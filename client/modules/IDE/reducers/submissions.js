import * as ActionTypes from '../../../constants';

const Submissions = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_SUBMISSIONS:
      return action.submissions;
    default:
      return state;
  }
};

export default Submissions;
