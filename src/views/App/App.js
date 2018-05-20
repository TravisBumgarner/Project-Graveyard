import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from '../Home';
import NotFound from '../NotFound';

import {
  AppWrapper,
} from './App.styles';

export class App extends Component {
  static propTypes = {
  };

  constructor(props){
    super(props);
    this.state = {
      shouldErrorMsg: false,
    };
  }
  render() {
    const {
    } = this.props;

    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}

export default withRouter(connect((state) => ({
}), {
})(App));
