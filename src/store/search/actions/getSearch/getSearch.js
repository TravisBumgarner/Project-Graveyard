import axios from 'axios';

const API_URL = 'http://localhost:5000/search/all/';

export const GET_SEARCH_START = 'GET_SEARCH';
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE';
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';

export const getSearchStart = () => ({
  type: GET_SEARCH_START,
});

export const getSearchSuccess = data => ({
  type: GET_SEARCH_SUCCESS,
  data,
});

export const getSearchFailure = data => ({
  type: GET_SEARCH_FAILURE,
  data,
});

export const getSearch = (data = {}) => {
  return (dispatch) => {
    dispatch(getSearchStart());
    return new Promise((resolve, reject) => {
      axios.request({
        method: 'GET',
        url: `${API_URL}`,
        data,
      }).then((response) => {
        const { data } = response;
        if (data.is_submit_error){
          dispatch(getSearchFailure(data));
          reject();
        } else {
        dispatch(getSearchSuccess(data));
        resolve();
        }
      }).catch((error) => {
        dispatch(getSearchFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};