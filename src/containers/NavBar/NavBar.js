import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import uiActions from '../../store/ui/actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  static propTypes = {
    toggleSideMenu: PropTypes.func,
  };

  render() {
    const {toggleSideMenu} = this.props;

    const RightMenu = (props) => (
      <div>
        <IconButton onClick={ toggleSideMenu }><ActionFlightTakeoff /></IconButton>
      </div>
    );

      return (
          <AppBar
            title="PhotoVentures"
            iconElementRight={ <RightMenu /> }
          />
      );
    }
}

export default connect(state => ({
}), {
  toggleSideMenu: uiActions.toggleSideMenu,
})(NavBar);
