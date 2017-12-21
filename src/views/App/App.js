import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom'

import Compass from '../Compass';
import RecentHistory from '../../containers/RecentHistory'
import NavBar from '../../containers/NavBar';

import uiActions from '../../store/ui/actions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  };

  static propTypes = {
    setWindowSize: PropTypes.func,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const { setWindowSize } = this.props;
    setWindowSize(window.innerWidth, window.innerHeight);
  }

  render() {
    // TODO fix browsing urls.
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Compass}/>
          <Route path='/history' component={RecentHistory}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
}), {
  setWindowSize: uiActions.setWindowSize,
})(App));
