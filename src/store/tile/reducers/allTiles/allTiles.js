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
    default:
      return state;
  }
};

export default allTiles;
