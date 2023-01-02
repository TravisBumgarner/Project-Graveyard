import { combineReducers } from 'redux';

import stats from './stats';
import meta from './meta';

export default combineReducers({
  stats,
  meta,
});
