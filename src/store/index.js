import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import snippets from './snippets/reducers';

const rootReducer = combineReducers({
  snippets,
});

const middleware = [
  ReduxThunk,
];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });
  middleware.push(logger);
}

// logger must be the last middleware in chain, otherwise
// it will log thunk and promise, not actual actions
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

export default store;
