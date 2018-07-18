import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from '../Home';
import NotFound from '../NotFound';
import Nav from '../../containers/Nav';

import sessionActions from '../../store/session/actions';

import {
  AppWrapper,
} from "./App.styles";

export default class App extends Component {
  render() {

    return (
      <AppWrapper>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}



