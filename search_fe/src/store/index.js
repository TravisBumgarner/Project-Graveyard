import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import search from './search/reducers';
import session from './session/reducers';

const rootReducer = combineReducers({
  search,
  session,
});

const client = axios.create({ //stats axios can be used, shown in axios documentation
  baseURL:'http://localhost:8000',
  responseType: 'json'
});


let middleware = [
  ReduxThunk,
  axiosMiddleware(client)
];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });
  middleware.push(logger)
}

// logger must be the last middleware in chain, otherwise
// it will log thunk and promise, not actual actions
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

export default store;
