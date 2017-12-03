import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './views/App/App';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);