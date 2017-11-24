export const SET_CENTER_TILE_START = 'SET_CENTER_TILE_START';
export const SET_CENTER_TILE_SUCCESS = 'SET_CENTER_TILE_SUCCESS';
export const SET_CENTER_TILE_FAILURE = 'SET_CENTER_TILE_FAILURE';

export const setCenterTileStart = () => ({
  type: SET_CENTER_TILE_START,
});

export const setCenterTileSuccess = tileDetails => ({
  type: SET_CENTER_TILE_SUCCESS,
  tileDetails,
});

export const setCenterTileFailure = error => ({
  type: SET_CENTER_TILE_FAILURE,
  error,
});

export const setCenterTile = tileDetails => (dispatch) => {
  dispatch(setCenterTileSuccess(tileDetails));
};
