import tileActions from '../../actions';

const centerTile = (state = [], action) => {
  switch (action.type) {
    case 'SET_CENTER_TILE_SUCCESS':
      return [action.result];
    default:
      return state;
  }
};

export default centerTile;
