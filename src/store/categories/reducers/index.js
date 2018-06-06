import { combineReducers } from 'redux';

import all from './all';
import byId from './byId';

export default combineReducers({
  byId,
  all,
});