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
        [CENTER_DIRECTION]: action.centerTile,
      };

    case 'FLICKR_REQUEST_START':
    case 'FLICKR_REQUEST_SUCCESS':
    case 'FLICKR_REQUEST_FAIL':
      return {
        ...defaultData, //TODO replace this with state.
        [action.direction]: {
          ...defaultData[action.direction],
          ...action.tileData
        }
      };

    default:
      return state;
  }
};

export default allTiles;
