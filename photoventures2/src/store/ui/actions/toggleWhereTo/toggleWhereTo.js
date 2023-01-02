export const TOGGLE_WHERE_TO_START = 'TOGGLE_WHERE_TO_START';
export const TOGGLE_WHERE_TO_SUCCESS = 'TOGGLE_WHERE_TO_SUCCESS';
export const TOGGLE_WHERE_TO_FAILURE = 'TOGGLE_WHERE_TO_FAILURE';

export const toggleWhereToStart = () => ({
  type: TOGGLE_WHERE_TO_START,
});

export const toggleWhereToSuccess = () => ({
  type: TOGGLE_WHERE_TO_SUCCESS,
});

export const toggleWhereToFailure = error => ({
  type: TOGGLE_WHERE_TO_FAILURE,
  error,
});

export const toggleWhereTo = () => (dispatch) => {
  dispatch(toggleWhereToSuccess());
};
