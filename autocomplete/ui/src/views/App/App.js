import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Search,
  NotFound
} from '../../views'

import {
  AppWrapper,
} from "./App.styles";

export default class App extends Component {
  render() {

    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}



