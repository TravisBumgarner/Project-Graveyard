import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import Home from '../Home';
import NotFound from '../NotFound';
import Categories from '../Categories';
import CreateEditCategory from '../CreateEditCategory';
import CreateEditSnippet from '../CreateEditSnippet';
import Snippets from '../Snippets';

import MainNav from '../../components/MainNav';
import Header from '../../components/Header';

import sessionActions from '../../store/session/actions';

import { AppWrapper } from './App.styles';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainNavOpen: false,
    };
  }

  componentWillMount() {
    const {
      loadSession,
    } = this.props;

    loadSession();
  }

  toggleMainNav = () => {
    this.setState({ isMainNavOpen: !this.state.isMainNavOpen });
  };

  render() {
    const {
      loaded,
    } = this.props;

    const {
      isMainNavOpen,
    } = this.state;

    return (
      loaded ? (
        <AppWrapper>
          <Header toggleMainNav={this.toggleMainNav} />
          <MainNav isOpen={isMainNavOpen} toggleOpen={this.toggleMainNav} />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/categories" component={Categories} exact />
            <Route path="/categories/create" component={CreateEditCategory} />
            <Route path="/categories/edit/:id" component={CreateEditCategory} />

            <Route path="/snippets" component={Snippets} exact />
            <Route path="/snippets/create" component={CreateEditSnippet} />
            <Route path="/snippets/edit/:id" component={CreateEditSnippet} />

            <Route component={NotFound} />
          </Switch>
        </AppWrapper>
      ) : (
        <CircularProgress />
      )

    );
  }
}

App.propTypes = {
  loaded: PropTypes.bool.isRequired,
  loadSession: PropTypes.func.isRequired,
};

export default withRouter(connect(state => ({
  loaded: state.session.meta.loaded,
}), {
  loadSession: sessionActions.loadSession,
})(App));

