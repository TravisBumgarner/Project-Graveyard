import { RADIAL_DRECTIONS, CENTER_DIRECTION } from '../../../../utilities/constants';

const defaultData = RADIAL_DRECTIONS.reduce((obj, direction) => {
  obj[direction] = { //eslint-disable-line
    lat: '',
    lon: '',
    src: '',
    isLoading: false,
  };
  return obj;
}, {});

defaultData[CENTER_DIRECTION] = {
  lat: '',
  lon: '',
  src: '',
  isLoading: false,
};


const allTiles = (state = defaultData, action) => {
  switch (action.type) {
    case 'SET_CENTER_TILE_START':
      return {
        ...defaultData,
      };

    case 'SET_CENTER_TILE_SUCCESS':
      return {
        ...state,
        [CENTER_DIRECTION]: {
          ...state[CENTER_DIRECTION],
          ...action.tileDetails,
        },
      };

    case 'SET_RADIAL_TILE_SUCCESS':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          ...action.tileDetails,
        },
      };

    case 'FLICKR_REQUEST_START':
    case 'FLICKR_REQUEST_SUCCESS':
    case 'FLICKR_REQUEST_FAILURE':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          ...action.tileDetails,
        },
      };

    default:
      return state;
  }
};

export default allTiles;
