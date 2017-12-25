export const SET_TILE_START = 'SET_TILE_START';
export const SET_TILE_SUCCESS = 'SET_TILE_SUCCESS';
export const SET_TILE_FAILURE = 'SET_TILE_FAILURE';

export const setTileStart = () => ({
  type: SET_TILE_START,
});

export const setTileSuccess = tile => ({
  type: SET_TILE_SUCCESS,
  tile,
});

export const setTileFailure = result => ({
  type: SET_TILE_FAILURE,
  result,
});

export const setTile = tile => (dispatch) => {
  dispatch(setTileSuccess(tile));
};
