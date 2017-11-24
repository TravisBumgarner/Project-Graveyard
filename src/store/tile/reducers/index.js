import { combineReducers } from 'redux';
import meta from './meta';
import allTiles from './allTiles';
import newPhoto from './newPhoto';

export default combineReducers({
  meta,
  allTiles,
  newPhoto,
});
