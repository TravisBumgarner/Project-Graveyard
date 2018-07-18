import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import NotFound from '../NotFound';

import {
  AppWrapper,
} from "./App.styles";

export default class App extends Component {
  render() {

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



