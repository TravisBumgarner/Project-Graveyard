import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './views/App/App';
import store from './store';
import { muiTheme } from "./theme";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <MuiThemeProvider muiTheme={muiTheme}>
            <App />
          </MuiThemeProvider>
      </BrowserRouter>

  </Provider>,
  document.getElementById('root'),
);
