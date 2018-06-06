import { combineReducers } from 'redux';

import all from './all';
import byId from './byId';
import selectedId from './selectedId';

export default combineReducers({
  byId,
  all,
  selectedId,
});
