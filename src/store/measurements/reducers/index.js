import { combineReducers } from 'redux';

import all from './all';
import meta from './meta';

export default combineReducers({
  all,
  meta,
});
