import { getRequest } from '../../../requests/actions/getRequest';

export const LOAD_SESSION_START = 'LOAD_SESSION_START';
export const LOAD_SESSION_SUCCESS = 'LOAD_SESSION_SUCCESS';
export const LOAD_SESSION_FAILURE = 'LOAD_SESSION_FAILURE';

export const loadSessionStart = () => ({
  type: LOAD_SESSION_START,
});

export const loadSessionSuccess = () => ({
  type: LOAD_SESSION_SUCCESS,
});

export const loadSessionFailure = error => ({
  type: LOAD_SESSION_FAILURE,
  error,
});

export const loadSession = () => {
  return (dispatch) => {
    dispatch(loadSessionStart());
    return new Promise((resolve, reject) => {
      return Promise.all([
        dispatch(getRequest('snippets/')),
        dispatch(getRequest('authors/')),
        dispatch(getRequest('categories/')),
      ]).then(() => {
        dispatch(loadSessionSuccess());
        resolve();
      }).catch((error) => {
        dispatch(loadSessionFailure(error));
        reject();
      });
    });
  };
};
