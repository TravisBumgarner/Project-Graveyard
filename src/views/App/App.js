import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Home from '../Home';
import NotFound from '../NotFound';
import Admin from '../Admin';
import Nav from '../../containers/Nav';

import measurementActions from '../../store/measurements/actions';

import {
  AppWrapper,
} from "./App.styles";

export class App extends Component {
  componentWillMount(){
    const {
      getMeasurements,
    } = this.props;

    // As project grows, this could be replaced with a loadSession() that would
    // be responsible for fetching all the data from the backend.
    getMeasurements();
  }

  render() {
    const {
      isLoading,
    } = this.props;

    return (
      !isLoading ? (
        <AppWrapper>
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/" component={Admin} />
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
  isLoading: state.measurements.meta.isLoading,
}), {
  getMeasurements: measurementActions.getMeasurements,
})(App));


