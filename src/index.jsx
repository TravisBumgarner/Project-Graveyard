import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './views/App/App';

import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app'),
)