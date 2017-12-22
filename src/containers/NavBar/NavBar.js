import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import uiActions from '../../store/ui/actions';

class NavBar extends Component {
  static propTypes = {
    toggleSideMenu: PropTypes.func.isRequired,
  };

  render() {
    const { toggleSideMenu } = this.props;

    const RightMenu = () => (
      <div>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <IconButton onClick={toggleSideMenu}><ActionFlightTakeoff /></IconButton>

      </div>
    );

    return (
      <AppBar
        title="PhotoVentures"
        iconElementRight={<RightMenu />}
        showMenuIconButton={false}
      />
    );
  }
}

export default connect(() => ({
}), {
  toggleSideMenu: uiActions.toggleSideMenu,
})(NavBar);
