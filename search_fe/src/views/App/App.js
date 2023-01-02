import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Home from '../Home';
import NotFound from '../NotFound';
import Nav from '../../containers/Nav';

import sessionActions from '../../store/session/actions';

import {
  AppWrapper,
} from "./App.styles";

export class App extends Component {
  componentWillMount(){
    const {
      loadSession,
    } = this.props;

    loadSession();
  }


  render() {
    const {
      loaded,

    } = this.props;

    return (
      loaded ? (
        <AppWrapper>
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AppWrapper>
      ) : (
        <AppWrapper>
          <CircularProgress />
        </AppWrapper>
        )

    )
  }
}

export default withRouter(connect((state) => ({
  loaded: state.session.meta.loaded,
}), {
  loadSession: sessionActions.loadSession,
})(App));


