export const SET_WINDOW_SIZE_START = 'SET_WINDOW_SIZE_START';
export const SET_WINDOW_SIZE_SUCCESS = 'SET_WINDOW_SIZE_SUCCESS';
export const SET_WINDOW_SIZE_FAILURE = 'SET_WINDOW_SIZE_FAILURE';

export const setWindowSizeStart = () => ({
  type: SET_WINDOW_SIZE_START,
});

export const setWindowSizeSuccess = (width, height) => ({
  type: SET_WINDOW_SIZE_SUCCESS,
  width,
  height,
});

export const setWindowSizeFailure = error => ({
  type: SET_WINDOW_SIZE_FAILURE,
  error,
});

export const setWindowSize = (width, height) => (dispatch) => {
  dispatch(setWindowSizeSuccess(width, height));
};
