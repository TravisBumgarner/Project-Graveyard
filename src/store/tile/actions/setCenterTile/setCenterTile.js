export const SET_CENTER_TILE_START = 'SET_CENTER_TILE_START';
export const SET_CENTER_TILE_SUCCESS = 'SET_CENTER_TILE_SUCCESS';
export const SET_CENTER_TILE_FAILURE = 'SET_CENTER_TILE_FAILURE';
export const SET_RADIAL_TILE_SUCCESS = 'SET_RADIAL_TILE_SUCCESS';

import { flickrRequest } from '../flickrRequest';

import { RADIAL_DRECTIONS } from "../../../../utilities/constants";
import { getTileCoords } from "../../../../utilities/functions";

export const setCenterTileStart = () => ({
  type: SET_CENTER_TILE_START,
});

export const setRadialTileSuccess = (direction, tileDetails) => ({
  type: SET_RADIAL_TILE_SUCCESS,
  direction,
  tileDetails,
});

export const setCenterTileSuccess = tileDetails => ({
  type: SET_CENTER_TILE_SUCCESS,
  tileDetails,
});

export const setCenterTileFailure = error => ({
  type: SET_CENTER_TILE_FAILURE,
  error,
});

export const setCenterTile = (lat, lon, radius) => (dispatch) => {
  dispatch(flickrRequest(lat, lon)).then(src => {
    const tileDetails = {lat, lon, src};
    dispatch(setCenterTileSuccess(tileDetails))
  });

  RADIAL_DRECTIONS.forEach( direction => {
    const coords = getTileCoords(direction, lat, lon, radius);
    dispatch(flickrRequest(coords.lat, coords.lon)).then(src => {
      const tileDetails = {lat: coords.lat, lon: coords.lon, src};
      dispatch(setRadialTileSuccess(direction, tileDetails));
    })
  });

};
