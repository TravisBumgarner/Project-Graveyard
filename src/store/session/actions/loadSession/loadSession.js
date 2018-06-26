import axios from 'axios';

export const LOAD_SESSION_START = 'LOAD_SESSION_START';
export const LOAD_SESSION_SUCCESS = 'LOAD_SESSION_SUCCESS';
export const LOAD_SESSION_FAILURE = 'LOAD_SESSION_FAILURE';

export const loadSessionStart = () => ({
  type: LOAD_SESSION_START,
});

export const loadSessionSuccess = (data) => ({
  type: LOAD_SESSION_SUCCESS,
  data,
});

export const loadSessionFailure = error => ({
  type: LOAD_SESSION_FAILURE,
  error,
});

export const loadSession = () => { //eslint-disable-line
  return (dispatch) => {
    dispatch(loadSessionStart());
    return new Promise((resolve, reject) => {
     axios.get("http://localhost:5000/stats").then((response) => {
          dispatch(loadSessionSuccess(response.data));
          resolve();
        }).catch((e) => {
          dispatch(loadSessionFailure(e));
          reject();
        });
    });
  };
}
