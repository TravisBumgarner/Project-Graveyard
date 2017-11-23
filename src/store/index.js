import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import tile from './tile/reducers';

const rootReducer = combineReducers({
  tile,
});

const logger = createLogger({
  collapsed: true,
  duration: true,
});

// logger must be the last middleware in chain, otherwise
// it will log thunk and promise, not actual actions
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(ReduxThunk, logger));

export default store;
