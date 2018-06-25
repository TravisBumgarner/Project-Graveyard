import axios from 'axios';

const API_URL = 'http://localhost:5000/search/all';

export const PERFORM_NEW_SEARCH_START = 'PERFORM_NEW_SEARCH_START';
export const PERFORM_NEW_SEARCH_FAILURE = 'PERFORM_NEW_SEARCH_FAILURE';
export const PERFORM_NEW_SEARCH_SUCCESS = 'PERFORM_NEW_SEARCH_SUCCESS';

export const performNewStart = (query) => ({
  type: PERFORM_NEW_SEARCH_START,
  query,
});

export const performNewSuccess = data => ({
  type: PERFORM_NEW_SEARCH_SUCCESS,
  data,
});

export const performNewFailure = data => ({
  type: PERFORM_NEW_SEARCH_FAILURE,
  data,
});

export const performNewSearch = (query) => {
  return (dispatch) => {
    dispatch(performNewStart(query));
    return new Promise((resolve, reject) => {
      axios.request({
        method: 'GET',
        url: `${API_URL}`,
        data: {query},
      }).then((response) => {
        const { data } = response;
        if (data.is_submit_error){
          dispatch(performNewFailure(data));
          reject();
        } else {
        dispatch(performNewSuccess(data));
        resolve();
        }
      }).catch((error) => {
        dispatch(performNewFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};