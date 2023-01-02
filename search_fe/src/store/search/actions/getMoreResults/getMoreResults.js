import axios from 'axios';

import { DEFAULT_PAGINATION } from "../../../../constants";

export const GET_MORE_RESULTS_START = 'GET_MORE_RESULTS_START';
export const GET_MORE_RESULTS_FAILURE = 'GET_MORE_RESULTS_FAILURE';
export const GET_MORE_RESULTS_SUCCESS = 'GET_MORE_RESULTS_SUCCESS';

export const getMoreResultsStart = () => ({
  type: GET_MORE_RESULTS_START,
});

export const getMoreResultsSuccess = (data, page) => ({
  type: GET_MORE_RESULTS_SUCCESS,
  data,
  page,
});

export const getMoreResultsFailure = data => ({
  type: GET_MORE_RESULTS_FAILURE,
  data,
});

export const getMoreResults = (params, nextPage) => {
  return (dispatch) => {
    dispatch(getMoreResultsStart());
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/search/all`, { params }
      ).then((response) => {
        dispatch(getMoreResultsSuccess(response.data, nextPage));
        resolve();
      }).catch((error) => {
        dispatch(getMoreResultsFailure(error));
        reject();
      });
    });
  };
};