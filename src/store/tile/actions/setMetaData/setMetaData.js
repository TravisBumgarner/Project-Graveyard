export const SET_META_DATA_START = 'SET_META_DATA_START';
export const SET_META_DATA_SUCCESS = 'SET_META_DATA_SUCCESS';
export const SET_META_DATA_FAILURE = 'SET_META_DATA_FAILURE';

export const setMetaDataStart = () => ({
  type: SET_META_DATA_START,
});

export const setMetaDataSuccess = radius => ({
  type: SET_META_DATA_SUCCESS,
  radius,
});

export const setMetaDataFailure = error => ({
  type: SET_META_DATA_FAILURE,
  error,
});

export const setMetaData = radius => (dispatch) => {
  dispatch(setMetaDataSuccess(radius));
};
