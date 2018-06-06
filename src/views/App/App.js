import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from '../Home';
import NotFound from '../NotFound';
import Categories from '../Categories';

import Nav from '../../containers/Nav';

import requestActions from '../../store/requests/actions';

import { AppWrapper } from './App.styles';

export class App extends Component {
  componentWillMount() {
    const {
      getRequest,
    } = this.props;

    getRequest('snippets/');
    getRequest('authors/');
    getRequest('categories/');
  }

  render() {

    return (
      <AppWrapper>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Categories} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}

App.propTypes = {
};

export default withRouter(connect(state => ({
}), {
  getRequest: requestActions.getRequest,
})(App));

