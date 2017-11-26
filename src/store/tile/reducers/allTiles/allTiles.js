import { DIRECTIONS, CENTER_DIRECTION } from '../../../../utilities/constants';

let defaultData = DIRECTIONS.reduce((obj, direction) => {
  obj[direction] = {
    lat: '',
    lon: '',
    src: '',
    isLoading: false,
  };
  return obj;
}, {});

const allTiles = (state = defaultData, action) => {
  switch (action.type) {
    case 'SET_CENTER_TILE_SUCCESS':
      return {
        ...defaultData,
        [CENTER_DIRECTION]: {
          ...state[CENTER_DIRECTION],
          ...action.tileDetails
        }
      };

    case 'SET_RADIAL_TILE_SUCCESS':
      console.log("direction reducer action.tileDetails", action.direction, action.tileDetails);
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          ...action.tileDetails
        }
      };

    case 'FLICKR_REQUEST_START':
    case 'FLICKR_REQUEST_SUCCESS':
    case 'FLICKR_REQUEST_FAILURE':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          ...action.tileDetails
        }
      };

    default:
      return state;
  }
};

export default allTiles;
