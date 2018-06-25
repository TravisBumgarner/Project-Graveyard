import axios from 'axios';

import { DEFAULT_PAGINATION } from "../../../../constants";

const API_URL = 'http://localhost:5000/search/all';

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

export const getMoreResults = (query, page) => {
  return (dispatch) => {
    dispatch(getMoreResultsStart());
    return new Promise((resolve, reject) => {
      axios.request({
        method: 'GET',
        url: `${API_URL}?start_from=${page * DEFAULT_PAGINATION}`,
      }).then((response) => {
        const { data } = response;
        if (data.is_submit_error){
          dispatch(getMoreResultsFailure(data));
          reject();
        } else {
        dispatch(getMoreResultsSuccess(data, page));
        resolve();
        }
      }).catch((error) => {
        dispatch(getMoreResultsFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};