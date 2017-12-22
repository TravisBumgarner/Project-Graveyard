import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Compass from '../Compass';

import uiActions from '../../store/ui/actions';

export class App extends Component {
  static propTypes = {
    setWindowSize: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

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
    return (
      <Compass />
    );
  }
}

export default connect(() => ({
}), {
  setWindowSize: uiActions.setWindowSize,
})(App);
