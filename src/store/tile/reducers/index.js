import { combineReducers } from 'redux';
import meta from './meta';
import allTiles from './allTiles';

export default combineReducers({
  meta,
  allTiles,
});
