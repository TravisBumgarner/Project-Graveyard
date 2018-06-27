import axios from 'axios';

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

export const performNewSearch = (params) => {
  return (dispatch) => {
    dispatch(performNewStart(params));
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/search/all`, { params }
      ).then((response) => {
        dispatch(performNewSuccess(response.data));
        resolve();
      }).catch((error) => {
        dispatch(performNewFailure(error));
        reject();
      });
    });
  };
};