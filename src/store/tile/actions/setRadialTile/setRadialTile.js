export const SET_RADIAL_TILE_START = 'SET_RADIAL_TILE_START';
export const SET_RADIAL_TILE_SUCCESS = 'SET_RADIAL_TILE_SUCCESS';
export const SET_RADIAL_TILE_FAILURE = 'SET_RADIAL_TILE_FAILURE';

export const setRadialTileStart = () => ({
  type: SET_RADIAL_TILE_START,
});

export const setRadialTileSuccess = (direction, lat, lon) => ({
  type: SET_RADIAL_TILE_SUCCESS,
  direction,
  tileDetails: {
    lat,
    lon,
  },
});

export const setRadialTileFailure = error => ({
  type: SET_RADIAL_TILE_FAILURE,
  error,
});

export const setRadialTile = (direction, lat, lon) => (dispatch) => {
  dispatch(setRadialTileSuccess(direction, lat, lon));
};
