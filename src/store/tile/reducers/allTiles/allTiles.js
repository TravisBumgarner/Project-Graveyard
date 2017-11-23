import { DIRECTIONS, CENTER_DIRECTION } from '../../../../utilities/constants';

var defaultData = DIRECTIONS.reduce((obj, direction) => {
  obj[direction] = {
    lat: '',
    lon: '',
    src: '',
    foo: Math.random().toFixed(2),
  };
  return obj;
}, {});

const allTiles = (state = defaultData, action) => {
  switch (action.type) {
    case 'SET_CENTER_TILE_SUCCESS':
      return {
        ...state,
        [CENTER_DIRECTION]: action.centerTile,
      };
    default:
      return state;
  }
};

export default allTiles;
