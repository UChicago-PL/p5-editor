import apiClient from '../../../utils/apiClient';
import * as ActionTypes from '../../../constants';
import { startLoader, stopLoader } from './loader';
/* eslint-disable import/prefer-default-export */
export function getSubmissions() {
  return (dispatch) => {
    dispatch(startLoader());

    apiClient.get('/get-all-submissions').then((response) => {
      dispatch(stopLoader());
      dispatch({
        type: ActionTypes.RECEIVE_SUBMISSIONS,
        submissions: response.data
      });
    });
  };
}
