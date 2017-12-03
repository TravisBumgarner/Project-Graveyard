import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Theme from '../../theme'

import Compass from '../Compass';

import store from '../../store';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={Theme}>
          <Compass />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({ items: state.items });

export default App;
