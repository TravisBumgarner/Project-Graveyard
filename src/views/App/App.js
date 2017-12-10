import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import Compass from '../Compass';
import History from '../../containers/RecentHistory'
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
      <Switch>
        <Route exact path='/' component={Compass}/>
        <Route path='/history' component={History}/>
      </Switch>
    );
  }
}

export default connect(state => ({
}), {
  setWindowSize: uiActions.setWindowSize,
})(App);
