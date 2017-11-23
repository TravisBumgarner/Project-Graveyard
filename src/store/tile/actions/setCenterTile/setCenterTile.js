export const SET_CENTER_TILE_START = 'SET_CENTER_TILE_START';
export const SET_CENTER_TILE_SUCCESS = 'SET_CENTER_TILE_SUCCESS';
export const SET_CENTER_TILE_FAILURE = 'SET_CENTER_TILE_FAILURE';

export const setCenterTileStart = () => ({
  type: SET_CENTER_TILE_START,
});

export const setCenterTileSuccess = centerTile => ({
  type: SET_CENTER_TILE_SUCCESS,
  centerTile,
});

export const setCenterTileFailure = result => ({
  type: SET_CENTER_TILE_FAILURE,
  result,
});

export const setCenterTile = centerTile => (dispatch) => {
  dispatch(setCenterTileSuccess(centerTile));
};
